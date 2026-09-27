# How to Edit the 3D Print Shop

Start with `products.py`.

That is the main file to practice with.

## Step 1: Change a Product

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

## Step 2: Add a Picture

Put the product picture in the `images` folder.

Example:

```text
images/dragon.jpg
```

Then update the image line:

```python
"image": "images/dragon.jpg",
```

## Step 3: Update the Website Files

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
products.py      = the easy file to edit
generate_site.py = the button that updates the website data
git push         = sends it to the internet
```
