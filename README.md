# Nexus Bite Purnea — Restaurant Website

A responsive static website made with HTML, CSS and vanilla JavaScript.

## Included
- Responsive landing page and mobile navigation
- Menu categories and sample menu cards
- Add-to-cart, quantity controls, and subtotal calculation
- Checkout form that creates an order summary and sends it to WhatsApp
- WhatsApp order shortcut
- Restaurant details section and setup notes

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser. For best results, use VS Code with the Live Server extension.

## Important setup before publishing
1. Open `script.js` and set `RESTAURANT_WHATSAPP` to your WhatsApp number in international format, digits only. For an Indian number use `91` followed by the 10-digit mobile number.
2. Update the sample menu items, prices, descriptions, and image URLs in the `menuItems` array in `script.js`.
3. Replace the sample restaurant address, phone number and opening hours in `index.html`.
4. Check that the food images you choose are appropriate and that you have permission to use them.

## Checkout limitation
This is a front-end demo. It does not charge payments, store orders in a database, calculate delivery fees, or validate stock. Checkout sends the order summary to WhatsApp so the restaurant can confirm it. For real online payments and order management, connect a trusted payment provider and a backend before launch.
