import json
from pathlib import Path

from products import PRODUCTS


data = {
    "products": PRODUCTS,
}

output = "window.STORE_CONFIG = "
output += json.dumps(data, indent=2)
output += ";\n"

Path("products-data.js").write_text(output, encoding="utf-8")
print("Done. The website product data was updated.")
