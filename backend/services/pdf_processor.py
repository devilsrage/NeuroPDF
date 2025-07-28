import fitz  # PyMuPDF

def pdf_to_markdown_and_outline(file_path):
    doc = fitz.open(file_path)
    markdown = ""
    outline = []
    id_counter = 1

    for page_num, page in enumerate(doc, start=1):
        blocks = page.get_text("dict")["blocks"]
        markdown += f"\n\n---\n### Page {page_num}\n\n"

        for block in blocks:
            if block["type"] == 0:  # Text block
                for line in block["lines"]:
                    line_text = " ".join([span["text"] for span in line["spans"]]).strip()
                    if not line_text:
                        continue

                    font_sizes = [span["size"] for span in line["spans"]]
                    avg_size = sum(font_sizes) / len(font_sizes)

                    if avg_size >= 18:
                        markdown += f"\n# {line_text}\n"
                        outline.append({
                            "id": str(id_counter),
                            "text": line_text,
                            "level": "H1",
                            "page": page_num,
                        })
                        id_counter += 1
                    elif avg_size >= 14:
                        markdown += f"\n## {line_text}\n"
                        outline.append({
                            "id": str(id_counter),
                            "text": line_text,
                            "level": "H2",
                            "page": page_num,
                        })
                        id_counter += 1
                    elif avg_size >= 12:
                        markdown += f"\n### {line_text}\n"
                        outline.append({
                            "id": str(id_counter),
                            "text": line_text,
                            "level": "H3",
                            "page": page_num,
                        })
                        id_counter += 1
                    else:
                        markdown += f"\n{line_text}\n"

    return {
        "markdown": markdown.strip(),
        "outline": outline
    }
