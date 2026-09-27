# 3D Print Shop

This is a simple starter website for learning how a shop page works.

The live site is on GitHub Pages. Changes show online after you push to GitHub.

## Which File Do I Edit?

Use this guide:

```text
index.html       = page words and layout
styles.css       = colors, spacing, and design
products.py      = product names, descriptions, prices, and image paths
images/          = product pictures
generate_site.py = updates product cards after editing products.py
products-data.js = generated file; do not edit by hand
script.js        = cart behavior; skip this at first
```

## If You Change Page Words or Layout

Edit `index.html`.

Examples:

- Big title
- Subtitle
- Section names
- Summary text
- Tabs
- Checkout wording

After changing only `index.html`, you do **not** need to run Python.

Publish with:

```powershell
git add .
git commit -m "Update page"
git push origin main
```

## If You Change Colors or Design

Edit `styles.css`.

Examples:

- Background color
- Button color
- Text size
- Spacing
- Card design

After changing only `styles.css`, you do **not** need to run Python.

Publish with:

```powershell
git add .
git commit -m "Update design"
git push origin main
```

## If You Change Products

Edit `products.py`.

Examples:

- Product name
- Product description
- Price
- Product image file path

After changing `products.py`, run:

```powershell
python generate_site.py
```

That updates `products-data.js`, which the product cards use.

Then publish:

```powershell
git add .
git commit -m "Update products"
git push origin main
```

## If You Add Product Pictures

Put pictures in the `images` folder.

Example:

```text
images/dragon.jpg
```

Then make the product in `products.py` point to it:

```python
"image": "images/dragon.jpg",
```

Then run:

```powershell
python generate_site.py
git add .
git commit -m "Add product picture"
git push origin main
```

## Important Rule

Do not rename these `id="..."` values in `index.html` yet:

```text
productGrid
cartItems
subtotal
orderForm
copyButton
copyStatus
customerName
contact
notes
```

The cart script uses those names.

Changing the words between tags is fine:

```html
<h1 id="bigTitle">My 3D Print Shop</h1>
```

Changing the id name is not safe yet:

```html
<h1 id="newTitle">My 3D Print Shop</h1>
```

## Easy Way to Remember

```text
HTML = what is on the page
CSS = how it looks
Python = product list helper
Git push = sends it to the internet
```

Start simple first. Add payment links and delivery rules later.
