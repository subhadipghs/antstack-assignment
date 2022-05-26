There is a all in one store sells everything.
The goal is to create an api for which will generate the invoice from the purchased items

## Local Setup Guide

---

1. Clone this repository

2. Install dependencies

```sh
npm install
```

3. Copy the `.env.example` content into `.env` file in the root directory

4. Run the server

```sh
npm start
```

5. Go to the API Docs to `http://localhost:8080/docs`

## Scripts:

---

1. Start the server locally:

```sh
npm start
```

2. Run the tests:

```sh
npm test
```

## Postman

---

If you want to test the API in postman then you can import [antstack-postman-collection.json](antstack-postman-collection.json) file into your postman app

1. API

---

Create the invoice/bill for the purchased items

---

- createInvoice(purchasedItems)

  ## Input:

  purchasedItems[]: - item (item name cannot have less than 2 characters) - itemCategory (only the supported categories are valid) - quantity (quantity must be greater than 0) - price (price cannot be negative)

  ## Output:

  - timestamp (date and time of the purchase)
  - items[]: (array of all the commodities with the additional details)
    - item (name of the item)
    - taxRate (tax rate applied)
    - subTotal (sub total amount calculated by = price \* quantity)
    - tax (total applicable tax amount)
    - totalAmount (total amount payable for the item)
  - subTotal: (total amount from the purchased items)
  - discountRate: (percentage of discount applied on purchase)
  - discount: (discount amount)
  - total (total payable amount)

2. Categories (Item type)

---

- book
- music
- medicine
- cloth
- food
- imported

Each category has a predefined discounts which is given below:

1. 5% on medicine and food
2. 5% on clothes below 1000 INR and 12% on above 1000 INR
3. 3% on music CDs/DVDs
4. 18% on imported commodities
5. 0% on books
6. 5% additional discount on purchase over 2000 INR
