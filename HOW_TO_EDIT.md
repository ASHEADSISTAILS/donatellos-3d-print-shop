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

## Way 2: Change Words in Python

At the top of `products.py`, you will see `SITE`.

Most lines are blank:

```python
SITE = {
    "big_title": "",
    "subtitle": "",
}
```

Blank means: use the words already in `index.html`.

If you fill one in, Python changes that part:

```python
SITE = {
    "big_title": "Calvin's 3D Prints",
    "subtitle": "Cool prints made by me.",
}
```

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

## Update the Website Files

After changing `products.py`, run this:

```powershell
python generate_site.py
```

That creates `products-data.js`.

The website reads `products-data.js`.

## Step 4: Publish It

When the website looks right:

```powershell
git add .
git commit -m "Update products"
git push origin main
```

## Easy Way to Remember

```text
index.html       = practice HTML and page layout
products.py      = easy product edits
generate_site.py = updates website data
git push         = sends it to the internet
```
