# How to Edit the Shop

This site is built so a beginner can help.

## Add or Change a Product

Open `products.py`.

Each product looks like this:

```python
{
    "id": "dragon",
    "name": "Mini Flexi Dragon",
    "price": 5,
    "time": "1-2 days",
    "description": "A poseable desk toy with a smooth, flexible body.",
    "finish": "Rainbow, blue, black, or mystery color",
    "image": "images/dragon.jpg",
},
```

Change the words inside quotes. Change the price number.

To add another product, copy one whole block, paste it below, and change the values.

## Add a Product Picture

Put the picture in the `images` folder.

Use an easy file name, like:

```text
dragon.jpg
phone-stand.jpg
bookmark.jpg
```

Then update the product image line:

```python
"image": "images/phone-stand.jpg",
```

## Rebuild the Website

After editing `products.py`, run:

```powershell
python generate_site.py
```

That updates `products-data.js`, which is what the website reads.

## Publish Changes

After rebuilding, commit and push the files to GitHub. GitHub Pages will update the public website automatically.

## Good First Coding Lesson

The most important idea here is:

```python
name = "Mini Flexi Dragon"
price = 5
```

The website is just using names, prices, descriptions, and image paths to build the shop.
