# E-Commerce site using Neurelo

This project is a simple online shopping site similar to Amazon, allowing users to view products, add them to a cart, and purchase items. It fulfills the given requirements and includes some bonus features such as storing products in Firebase and having a clean UI.

## Features

- **Product Grid**: Display all available products on a single page with key details such as image, name, and price.
- **Product Detail Pages**: Clicking on a product card opens an individual page displaying detailed information about the product including image, name, price, and description.
- **Add to Cart Functionality**: Users can add products to their cart by clicking the "Add to Cart" button on the product detail page.
- **Cart System**: A simple cart system keeps track of the items added by the user. The number of items in the cart is displayed in the site header. Clicking on the cart icon opens a popup displaying the products in the cart and the total price.
- **Checkout**: Users can purchase items by clicking the "Checkout" button in the cart popup. This clears the cart and displays an alert confirming the order. Additionally, it makes a request to the backend to reduce the available quantity of each purchased product.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (NextJS)
- **Backend**: Python (Flask), Neurelo
- **Database**: MongoDB

## Getting Started

1. Clone the repository: `git clone https://github.com/sanketwadekar/neurelo-e-commerce-app.git`
2. Install frontend dependencies: `cd shopping-cart-frontend && npm install`
3. Start the frontend: `npm run dev`
4. Install Python dependencies: `pip install -r requirements.txt`
4. Start the backend (if applicable): `cd shopping-cart-backend && python app.py`
5. Open your browser and navigate to `http://localhost:3000/login`

## Screenshots

![Login Page](https://raw.githubusercontent.com/sanketwadekar/neurelo-e-commerce-app/main/assets/login.png)

![Product Grid](https://raw.githubusercontent.com/sanketwadekar/neurelo-e-commerce-app/main/assets/list.png)
*Product Grid displaying available products.*

![Product Detail Page](https://raw.githubusercontent.com/sanketwadekar/neurelo-e-commerce-app/main/assets/details.png)
*Product Detail Page showing detailed information about a product.*

![Cart Popup](https://raw.githubusercontent.com/sanketwadekar/neurelo-e-commerce-app/main/assets/cart.png)
*Cart Popup displaying the items added to the cart and the total price.*

![Orders](https://raw.githubusercontent.com/sanketwadekar/neurelo-e-commerce-app/main/assets/orders.png)
*Orders page displays the items ordered by the user.*

## Demo

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
