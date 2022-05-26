
The all in one store sells everything. 
The goal is to create an api for which will generate the invoice from the purchased items


1. API
-------
  Create the invoice/bill for the purchased items
  -----------------------------------------------
  - createInvoice(purchasedItems)

    Input:
    --------
      purchasedItems[]:
        - item (item name cannot have less than 2 characters)
        - itemCategory (only the supported categories are valid)
        - quantity (quantity must be greater than 0)
        - price (price cannot be negative)

    Output:
    ------
    - timestamp (date and time of the purchase)
    - items[]: (array of all the commodities with the additional details)
      - item (name of the item)
      - taxRate (tax rate applied)
      - subTotal (sub total amount calculated by = price * quantity)
      - tax (total applicable tax amount)
      - totalAmount (total amount payable for the item)
    - subTotal: (total amount from the purchased items)
    - discountRate: (percentage of discount applied on purchase)
    - discount: (discount amount)
    - total (total payable amount)


2. Categories (Item type)
-------------------
  - book
  - music
  - medicine
  - cloth
  - food
  - grocery
  - imported

  Each category has a predefined discounts which is given below:
  1. 5% on medicine and food
  2. 5% on clothes below 1000 INR and 12% on above 1000 INR 
  3. 3% on music CDs/DVDs
  4. 18% on imported commodities
  5. 0% on books
  6. 5% additional discount on purchase over 2000 INR


 schema
 ------
 name: string
 +getTax(): number (in percentage)

