#!/usr/bin/env python3
"""
Generates a small, valid placeholder CV PDF at public/cv/Nepes-Sopyyev-CV.pdf
so the "Download CV" button is demonstrably functional out of the box.
Replace this file with your real CV (same filename) to ship the real document.
"""
import os
import zlib

OUT = os.path.join("public", "cv", "Nepes-Sopyyev-CV.pdf")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

LINES = [
    ("F1", 20, 720, "Nepes Sopyyev"),
    ("F2", 11, 700, "Full Stack Developer  |  Ashgabat, Turkmenistan"),
    ("F2", 11, 686, "Vue 3 - TypeScript - Node.js - Express - Prisma - Kotlin - AI / RAG"),
    ("F3", 10, 650, "PLACEHOLDER FILE"),
    ("F1", 10, 632, "This is a placeholder PDF that ships with the portfolio template."),
    ("F1", 10, 616, "Replace public/cv/Nepes-Sopyyev-CV.pdf with your real CV -"),
    ("F1", 10, 600, "the Download CV button reads that exact path from src/config/site.ts"),
    ("F1", 10, 584, "and stays disabled automatically if the file is missing."),
    ("F2", 10, 540, "Projects"),
    ("F1", 10, 522, "- Melhem AI - AI-powered digital healthcare platform (Vue 3, Express, Prisma, RAG)"),
    ("F1", 10, 506, "- Oba Hojalyk AI - agriculture platform for plant disease recognition (Vue 3, Flask, OpenCV)"),
    ("F1", 10, 490, "- AIVA Food Delivery - full stack delivery platform with admin panel and Kotlin app"),
    ("F1", 10, 474, "- Sanly Bilim - digital learning platform for Oguz Han University"),
    ("F1", 10, 458, "- Gorogly - 2D fighting game built in Unity with C#"),
]


def esc(text: str) -> str:
    return text.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")


content_parts = ["BT"]
for font, size, y, text in LINES:
    content_parts.append(f"/{font} {size} Tf 1 0 0 1 56 {y} Tm ({esc(text)}) Tj")
content_parts.append("ET")
content = "\n".join(content_parts).encode("latin-1")

objects: list[bytes] = []

objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
objects.append(
    b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] "
    b"/Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>"
)
objects.append(
    b"<< /Length " + str(len(content)).encode() + b" >>\nstream\n" + content + b"\nendstream"
)
objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")
objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>")

pdf = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
offsets = [0]
for index, body in enumerate(objects, start=1):
    offsets.append(len(pdf))
    pdf += f"{index} 0 obj\n".encode() + body + b"\nendobj\n"

xref_offset = len(pdf)
pdf += f"xref\n0 {len(objects) + 1}\n".encode()
pdf += b"0000000000 65535 f \n"
for offset in offsets[1:]:
    pdf += f"{offset:010d} 00000 n \n".encode()
pdf += (
    f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R /Info << /Title (Nepes Sopyyev - CV) "
    f"/Author (Nepes Sopyyev) /Producer (portfolio-template) >> >>\n"
    f"startxref\n{xref_offset}\n%%EOF\n"
).encode()

with open(OUT, "wb") as handle:
    handle.write(bytes(pdf))

# zlib is imported only to guarantee the module is available in the runtime.
_ = zlib.crc32(b"ok")

print(f"Wrote {OUT} ({len(pdf)} bytes)")
