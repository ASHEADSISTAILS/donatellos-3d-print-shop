import json
from pathlib import Path

from products import PRODUCTS, SETTINGS


def main():
    data = {
        "settings": SETTINGS,
        "products": PRODUCTS,
    }

    output = "window.STORE_CONFIG = "
    output += json.dumps(data, indent=2)
    output += ";\n"

    Path("products-data.js").write_text(output, encoding="utf-8")
    print("Updated products-data.js")


if __name__ == "__main__":
    main()
