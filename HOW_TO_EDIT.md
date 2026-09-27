# How to Edit the 3D Print Shop

You can edit two ways:

- Edit `index.html` to practice HTML and live changes.
- Edit `products.py` to quickly change products.

## Way 1: Change Words in HTML

If you change words in `index.html`, keep the `id="..."` parts.

Safe:

```html
<h1 id="bigTitle">My New Shop Name</h1>
```

Not safe yet:

```html
<h1 id="newName">My New Shop Name</h1>
```

The scripts look for the original id names.

## Change a Product

Open `products.py`.

You will see three example products:

```python
{
    "id": "product-1",
    "name": "Example Product 1",
    "description": "Write a short description for product 1 here.",
    "price": 1,
    "image": "images/example-product-1.jpg",
},
```

Change only these parts at first:

```python
"name": "Example Product 1",
"description": "Write a short description for product 1 here.",
"price": 1,
"image": "images/example-product-1.jpg",
```

Keep the quotes.

Keep the commas.

## Add a Picture

Put the product picture in the `images` folder.

Example:

```text
images/dragon.jpg
```

Then update the image line:

```python
"image": "images/dragon.jpg",
```

## Update Product Cards

After changing `products.py`, run this:

```powershell
python generate_site.py
```

That creates `products-data.js`, which is what the product cards read.

If you only change `index.html`, you do not need to run Python.

## Step 4: Publish It

When the website looks right:

```powershell
git add .
git commit -m "Update products"
git push origin main
```

## Easy Way to Remember

```text
index.html       = page words and layout
styles.css       = colors and design
products.py      = product cards
generate_site.py = updates product cards only
git push         = sends changes to the internet
```
