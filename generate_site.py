import json
import re
from html import unescape
from pathlib import Path

from products import PRODUCTS, SITE


HTML_IDS = {
    "browser_title": "browserTitle",
    "big_title": "bigTitle",
    "subtitle": "subtitle",
    "summary_label": "summaryLabel",
    "summary_title": "summaryTitle",
    "summary_text": "summaryText",
    "summary_picture_text": "summaryPictureText",
    "shop_label": "shopLabel",
    "shop_title": "shopTitle",
    "shop_text": "shopText",
    "cart_label": "cartLabel",
    "cart_title": "cartTitle",
    "checkout_label": "checkoutLabel",
    "checkout_title": "checkoutTitle",
    "checkout_text": "checkoutText",
}


def text_from_html(html, element_id):
    pattern = rf'id="{element_id}"[^>]*>(.*?)</'
    match = re.search(pattern, html, flags=re.DOTALL)
    if not match:
        return ""

    text = re.sub(r"<[^>]+>", "", match.group(1))
    text = " ".join(text.split())
    return unescape(text)


html = Path("index.html").read_text(encoding="utf-8")

site = {}
for key, element_id in HTML_IDS.items():
    python_value = SITE.get(key, "").strip()
    site[key] = python_value or text_from_html(html, element_id)

data = {
    "site": site,
    "products": PRODUCTS,
}

output = "window.STORE_CONFIG = "
output += json.dumps(data, indent=2)
output += ";\n"

Path("products-data.js").write_text(output, encoding="utf-8")
print("Done. The website product data was updated.")
