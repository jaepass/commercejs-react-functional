# 🛍️ 1: Build An E-Commerce App

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/7z6sdqivj25wexx4djym.png)

| **Project Goal**              | Build an e-commerce web store with a products listing and cart functionalities
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn** | Setting up your React app, API basics, React components basics, fetch and display products data from an external API                                                      |
| **Tools you’ll need**         | A modern browser like Chrome to access [CodeSandbox](https://codesandbox.io) - be sure to create an account in CodeSandbox to keep the versions of your work intact. |
| **Time needed to complete**           | 1 hour                                                                                                                                                                 |
| **Just want to try the app?**        | [CodeSandbox link](https://evjno.csb.app/)   


The main objective here is to learn **React** fundamentals in conjunction with working with an **API** to build an e-commerce application! We're going to create a real-world app fetching data from an external API to list products in a product catalogue page as well as add cart functionalities! We're really excited so let's get right to it!

**Here is a summary of what we will achieve!**

- Go over React basics
- Create function components in React and use React hooks
- Fetch data from an external API data source called Chec
- Use an axios-based library, Commerce.js, to add eCommerce logic
- List products on a products catalogue page
- Add cart functionalities

Check out this [live demo](https://evjno.csb.app/) sneakpeek to have a look at what we're building today! 

### Prerequisites

**This project assumes you have some knowledge of the below concepts before starting:**

- Some basic knowledge of JavaScript fundamentals
- Some basic knowledge of JavaScript frameworks
- An idea of the JAMstack architecture and how APIs work

## 1. Getting Started

We mentioned you needing **Code Sandbox** above, so what exactly is it? Codesandbox is an online IDE (Integrated Development Environment) playground that allows you to develop your project easily in the browser without having to set up your development environment.

So that's exactly what we're going to do: 
1. Head on over to [CodeSandbox](http://codesandbox.io) and create your account if you haven't already.
2. Create a CodeSandbox account
3. Scaffold a starter React template by clicking [here](https://codesandbox.io/s/new).

Choosing a React template in codesandbox or downloading it as a dependency is the same idea as installing [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html) and getting a starting boilerplate of a single page application. You can read more about Create React App [here](https://github.com/facebook/create-react-app).


### Basic React App Structure:

In most cases when you scaffold a React project, a typical project structure would look like this.

- my-app/
  - README.md
  - node_modules/
  - package.json
  - public/
    - index.html
    - favicon.ico
  - src/
    - App.css
    - App.js
    - App.test.js
    - index.css
    - index.js
    - logo.svg

The `public` folder contains our assets, html static files and custom client side javascript files. `package.json` is used by npm (Node package manager) to save all the packages needed to deploy our app, but we don't have to worry about this because CodeSandbox installs and updates this file for us.

In our `public` folder, we have a standard html file called `index.html`. This is our point of entry file where we have our root element, which is named by convention. If you scroll down to line 30 in the body element, you will see `<div id="root"></div>`. This is the root element where we will be injecting our application.

The `src` folder contains all our React code and houses our `index.js`, `app.js` and later on our components when we start to create them. In `index.js`, you will see something like this:

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
```

Here we import the React library and we use the ReactDOM `render()` method in order to print the contents of our App component into the root div in our `index.html` that we specified above. Our main app component `App.js` has to be imported as well to be included in the render.  The `App.js` component is passed in as the first argument in the render function and the `rootElement` as the second argument. That will tell React to render the app component and transform it into an element using the `React.createElement` method at build time to the index page. We will be stripping out all the scaffolded code in the component `App.js` and rebuilding it later on.

```js
import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```

The App function in `App.js` represents a React function component. In React, components can be defined as class components or function components. We will get into explaining more about these components later in the tutorial. You can create your components as a individual files (Single File Component - SFC). In React, html-like tags which are what we call JSX can be passed in the return statement to be returned. The JSX inside the return function is what the `App.js` will render out. JSX stands for JavaScript XML and is a syntax extension to JavaScript that allows you to write markup inside a React component.

> 💡 **Tip** 

> What are **Components**?

> Components sections of your application that you extract out into separate files so that you can make them reusable. There are two types of components, functional components and class components. We will be using functional components in this application and will get into explaining more about functional components later in the guide.

Now that we've walked through the starting structure in a React application, this is where the real fun begins. As you know we will be building a real-world e-commerce application sourcing data from an API data source. In order to do that, we will need to install a package dependency. So let's get right to it!

### 1.1 Install our commerce API

We will be using a commerce API platform to source our products data. The commerce backend we will be using is called [Chec](https://commercejs.com/) and it comes with the handy [Commerce.js](https://github.com/chec/commerce.js) SDK packed with helper functions to handle our commerce logic in the frontend seamlessly. 

> 💡 **Tip**

> What are **API**s and **SDK**s?

> **API** stands for Application Programming Interface and acts as a "contract" between client and server. The client which is a browser or any front-facing layer makes a request to a server to receive a response or initiate a defined action. When a platform has an API, it allows a software or front-facing client to interact with its data. **SDK** stands for Software Development Kit and is a installable package of development tools that typically comes with a library, a debugger, and other common tooling.

In a standard local development environment, the Chec/Commerce.js SDK can be installed in two ways:

1. Install the package via package manager either with npm `npm install @chec/commerce.js` or yarn `yarn @chec/commerce.js`

2. Install via CDN by included this script `<script type="text/javascript" src="https://cdn.chec.io/v2/commerce.js"></script>` in the `index.html` file.

Since we are using Codesandbox, we can conveniently add a dependency on the left sidebar. So let's go ahead and do that! Click on **Add dependency** and in the search field type in `@chec/commerce.js` and select the first option which is the latest version.

> 💡 **Tip**

> The Commerce.js SDK is using the axios library under the hood. Axios is a promise-based HTTP client that works both in the browser and in other node.js environments.


### 1.2 Link up our Commerce instance

The Commerce.js SDK comes packed with all the frontend oriented functionality to get a customer-facing web-store up and running. In order to utilize all the features of this commerce platform's SDK, we are going to import the module into a folder called `lib` so that we can have access to our Commerce object instance throughout our application.

Let's go ahead and do that right now! In your `src` directory, we'll create a new folder called `lib`, create a file `commerce.js` and copy and paste the below code in it. Typically a lib folder in a project stores files that abstracts functions or some form of data.

```js
// src/lib/Commerce.js

import Commerce from '@chec/commerce.js';

export const commerce = new Commerce('pk_184625ed86f36703d7d233bcf6d519a4f9398f20048ec');
```

Ok so what have we done here? First we import in the Commerce.js module which we will be using to communicate with the API platform, then we export an instance of `Commerce` and pass in a public key. The public key is needed to give us access to data in the Chec API.

> 💡 **Tip

> Please note that for the purpose of getting you up and running with an account with products data, a public key is provided from a demo merchant account. A token key access is what gives the API an authentication scope. A public key will give us access to Chec's core API resources such as your products and cart data.

Now that we've installed our commerce SDK and created our Commerce instance, we now have access to the Commerce object throughout our application!

## 2. Fetch products data from the Chec API

Commerce.js was built with all the frontend functionalities you would need to build a complete eCommerce store. All you need to do is make requests to various Chec API endpoints, receive successful responses, then you have your raw data to output beautifully onto your web store.

One of the main resources in Chec is the [Products](https://commercejs.com/docs/sdk/products) endpoint. Commerce.js
makes it seamless to fetch product data with its promise-based [method](https://commercejs.com/docs/sdk/products#list-products) `commerce.products.list()`. This request would make a call to the `GET v1/products` API endpoint and return a list of product data. Open up your `App.js` file and delete the code that came with creating a new React app and we will write this file from scratch.

Let's get to writing out our first functional component in `App.js`. Import `commerce` as well as a new module, `useState` which is the first React hook we'll be using to make our function component stateful. The first two API endpoint we will want to work with is the **Products** and **Merchant** endpoint. The **Products** endpoint will allow us to work with data such as the product name, product price, product description etc. The **Merchant** endpoint will contain information such as the e-commerce business name and contact details.

```js
// src/App.js
import React, { useState } from 'react';
import { commerce } from './lib/Commerce';

import './styles/scss/styles.scss'

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className="app">
    </div>
  )
};

export default App;
```

After the opening of our `App` function, we need to destructure and return `products` and a method `setProducts` from the function `useState`. `useState` returns a tuple, which is an array with two items, in this case an initial value and a function that will update that value. The argument we will pass in to `useState` is the initial value of an empty array to be able to store the product data in it when we fetch the data. We follow the same pattern for the Merchant value, but instead we will pass in an empty object as an argument to `useState`.

> 💡 **Tip**

`useState` allows us to make function components stateful. This means that the components has the ability to keep track of changing data. You might ask why would be want to keep track of changing data. Any commerce store needs to have the ability to update its products listing in real-time. Be it new products being added, products being sold out, or products being taken off. The API data constantly will get updated, therefore the UI has to be reactive.

You can now make your first Commerce.js request! Create a function called `fetchProducts()` in the component and make a request to the products endpoint using the Commerce.js method `commerce.products.list()`.

```js
/**
 * Fetch products data from Chec and stores in the products data object.
 * https://commercejs.com/docs/sdk/products
 */
const fetchProducts = () => {
    commerce.products.list().then((products) => {
        setProducts(products.data);
    }).catch((error) => {
        console.log('There was an error fetching the products', error)
    });
}
```

Inside the function, we use the `commerce` object to access the `products.list()` method for access to product data. [`commerce.products.list()`](https://commercejs.com/docs/sdk/products#list-products) is a promise-based function call that will resolve the request and `then()` sets the response data with `setProducts` into the `products` state key created earlier. In Chec, product is returned in an object called `data`, which is why we set the response as `product.data`. The `catch()` method catches any errors in the case that the request to the server fails.

Of course simply creating the functions do not do anything as you have yet to call them. When the app component mounts to the DOM, we will use our next React hook `useEffect()` to call the fetching of data. It is a React lifecycle hook also known as side effects, that helps to call functions after the component first renders to the DOM and also anytime the DOM updates. Since we are loading data from a remote endpoint, we want to invoke the `fetchProducts()` function to update the state with the returned products so that we can render our updated data.

First import `useEffect` from React in our import statement at the very top `import React, { useState, useEffect } from 'react';`.

Then we can use the function like so:

```jsx
useEffect(() => {
    fetchProducts();
}, []);
```

Above, we pass in our effect as a function `fetchProducts()` and also by leaving the second argument array empty, this method will run once before the initial render.

Below is the expected returned products data (abbreviated):

```json
[
  {
    "id": "prod_NqKE50BR4wdgBL",
    "created": 1594075580,
    "last_updated": 1599691862,
    "active": true,
    "permalink": "TSUTww",
    "name": "Kettle",
    "description": "<p>Black stove-top kettle</p>",
    "price": {
      "raw": 45.5,
      "formatted": "45.50",
      "formatted_with_symbol": "$45.50",
      "formatted_with_code": "45.50 USD"
    },
    "quantity": 0,
    "media": {
      "type": "image",
      "source": "https://cdn.chec.io/merchants/18462/images/676785cedc85f69ab27c42c307af5dec30120ab75f03a9889ab29|u9 1.png"
    },
    "sku": null,
    "meta": null,
    "conditionals": {
      "is_active": true,
      "is_free": false,
      "is_tax_exempt": false,
      "is_pay_what_you_want": false,
      "is_quantity_limited": false,
      "is_sold_out": false,
      "has_digital_delivery": false,
      "has_physical_delivery": false,
      "has_images": true,
      "has_video": false,
      "has_rich_embed": false,
      "collects_fullname": false,
      "collects_shipping_address": false,
      "collects_billing_address": false,
      "collects_extrafields": false
    },
    "is": {
      "active": true,
      "free": false,
      "tax_exempt": false,
      "pay_what_you_want": false,
      "quantity_limited": false,
      "sold_out": false
    },
    "has": {
      "digital_delivery": false,
      "physical_delivery": false,
      "images": true,
      "video": false,
      "rich_embed": false
    },
    "collects": {
      "fullname": false,
      "shipping_address": false,
      "billing_address": false,
      "extrafields": false
    },
    "checkout_url": {
      "checkout": "https://checkout.chec.io/TSUTww?checkout=true",
      "display": "https://checkout.chec.io/TSUTww"
    },
    "extrafields": [],
    "variants": [],
    "categories": [
      {
        "id": "cat_3zkK6oLvVlXn0Q",
        "slug": "office",
        "name": "Home office"
      }
    ],
    "assets": [
      {
        "id": "ast_7ZAMo1Mp7oNJ4x",
        "url": "https://cdn.chec.io/merchants/18462/images/676785cedc85f69ab27c42c307af5dec30120ab75f03a9889ab29|u9 1.png",
        "is_image": true,
        "data": [],
        "meta": [],
        "created_at": 1594075541,
        "merchant_id": 18462
      }
    ]
  },
]
```

The data object contains all the property endpoints such as the product name, the product description, product price or any uploaded variants or assets. This data is exposed when you make a request to the API. As mentioned above, Commerce.js is a Software Development Kit(SDK) that comes with abstracted axios promise-based function calls that will help to fetch data from the endpoints. The public key access that we briefed over above is a public token key from a merchant store. This account already has products and products information uploaded to the Chec dashboard for us to run a demo store with. 

## 3. Create our product components

Before we go any further, let's start to port in some styles so we can start to make our UI look slick! We will be using SCSS, a CSS style compiler to style our application. Please note that we will not be going into styling details but will only go over the high-level of porting in the styles. First install `node-sass` by adding it as a dependency in the left sidebar or alternatively in a local environment by running the command below.

```bash
yarn add node-sass
# OR
npm install node-sass
```

Next, let's go ahead and create a `styles` folder with a `scss` folder inside. Inside of the `scss` folder, create two other folders named `components` and `global`. Lastly, still in the `scss` folder, create a file and name it `styles.scss`. This file is where we will import in all our components and global styles. Your styles structure should look like the below tree.

- src/
  - styles/
    -scss/
      - components/
      - global/
      - styles.scss

In the components folder, create a file named `_products.scss` and copy in the below code.

```css
/* _products.scss */
.products {
    display: block;
    margin: 3rem;

    @include md {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin: 10rem;
    }

    .product {
        width: 55%;
        margin: auto;
        margin-top: 0;
        margin-bottom: 0;
        padding-bottom: 2rem;


        &__image {
            border: 2px solid $text-primary;
            width: 100%;
        }
    
        &__name {
            color: $text-primary;
            padding-top: 1rem;
            padding-bottom: 0.25rem;
        }
    
        &__details {
            display: flex;
            justify-content: space-between;
            margin-top: 0.75rem;
        }
    
        &__price {
            align-self: center;
            margin: 0;
            color: $text-grey;
        }
    
    
        &__details {
            display: flex;
            justify-content: space-between;
        }
    
        &__btn {
            background: $color-accent;
            color: white;
            font-size: 0.75rem;
            text-transform: uppercase;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease-in-out;
            margin-top: 1rem;
            border: none;
    
            &:hover {
                background-color: lighten(#EF4E42, 5);
            }

            @include sm {
                margin-top: 0;
            }
        }
    }
}
```

Now in the global folder, create `_base.scss`, `_body.scss` and `_mixins.scss` and copy in the respective code below.

```css
/* _base.scss */
// Font styles
$font-primary: 'Amiko', sans-serif;
$font-secondary: 'Adamina', serif;

// Colors
$bg-color: #E8E2D7;

$text-primary: #292B83;
$text-grey: rgb(67, 67, 67);

$color-accent: #EF4E42;

// Media query sizes
$sm-width: 576px;
$md-width: 768px;
$lg-width: 992px;
$xl-width: 1200px
```

```css
/* _body.scss */
body {
  font-family: $font-primary;
  background-color: $bg-color;
}
```

```css
/* _mixins.scss */
@mixin small-xs {
  @media (max-width: #{$sm-width}) {
    @content;
  }
}

@mixin sm {
  @media (min-width: #{$sm-width}) {
    @content;
  }
}

@mixin md {
  @media (min-width: #{$md-width}) {
    @content;
  }
}

@mixin lg {
  @media (min-width: #{$lg-width}) {
    @content;
  }
}

@mixin xl {
  @media (min-width: #{$xl-width}) {
    @content;
  }
}

@mixin md-max {
  @media (max-width: #{$lg-width}) {
    @content;
  }
}
```

Lastly as mentioned, you'll need to now import those created files in the style index `styles.scss`.

```scss
@import "global/base";
@import "global/body";
@import "global/mixins";
@import "components/products";
```

After importing the base styles, let's also import in the fonts we'll be using from Google Fonts in `public/index.html`.

```html
<!-- Load Google fonts -->
<link href="https://fonts.googleapis.com/css?family=Amiko:400,600,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Adamina&display=swap" rel="stylesheet">
```

Now that all the styles are written and imported, you should start to see the styles pull through when you create and render your components later.

The nature of React and most modern JavaScript frameworks is to separate your code into components. Components are a way to encapsulate a group of elements for reuse throughout your application. You'll be creating two components for products, one will be for the single product item and another for the list of product items. In your components, we will also start to deal with props. Props are used to pass data from parent components down to the child components.
As your app grows, it is generally good practice to validate your props for type checking and debugging. We will install the `prop-types` library to do so.

```bash
yarn add prop-types
# OR
npm install prop-types
```

### 3.1 Create our product item component

Going back to our created `ProductItem.js`, start by creating a function component and name it `ProductItem`. This component will render the individual product card. We then pass in the `product` parameter which the parent component will parse out as each individual product item. You will reference this property to access each product's image, name, description, and price via `.media.source`, `.name`, `.description` and `.price` in the return statement.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {

  const description = {__html: product.description};

  return (
    <div className="product">
      <img className="product__image" src={product.media.source} alt={`Image of ${product.name}`} />
      <div className="product__info">
        <h4 className="product__name">{product.name}</h4>
        <p className="product__description" dangerouslySetInnerHTML={description}></p>
        <div className="product__details">
          <p className="product__price">
            {product.price.formatted_with_symbol}
          </p>
        </div>
      </div>
    </div> 
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
```

In Chec, product descriptions return HTML which means if we were to render out `product.description`, we would get a string that returns the html tags along with the description. In general, setting HTML from code is risky because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack. You can set HTML directly from React, but you have to type out `dangerouslySetInnerHTML` and pass an object with a `__html` key, to remind yourself that it might be dangerous. But because we know we can trust the API responses, this is the best approach to take to render out our product description.

As you saw earlier in the abbreviated JSON, the returned product data object comes with all the information that you need to build a product listing view. In the code snippet above, your `product` prop is being used to access the various properties. First, render an image tag with the `src` value of `product.media.source` as the values inside the curly braces dynamically binds to the attributes followed by the `product.name`, `product.description`, and `product.price`.

---

## ******************************* [ BREAKOUT SESSION ] *******************************

---

### 3.2 Create our products list component

It's now time to create a `ProductsList.js` component inside `src/components`. The `ProductsList` component will be another function component which will loop through and render a list of `ProductItem` components.

First, import in the `ProductItem` component. Next, define a `products` prop. This will be provided by the parent component.

In your return statement you need to use the `map` function to render a `ProductItem` component for each product in your `products` prop. You also need to pass in a unique identifier (`product.id`) as the `key` attribute - React will use it to determine which items in a list have changed and which parts of your application need to be re-rendered.

```js
import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

const ProductsList = ({ products }) => {

    return (
        <div className="products" id="products">
            { products.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array,
};

export default ProductsList;
```

This component will be a bit bare-boned for just with mapping through the component `ProductItem` for each item.

With both your product item and list components created, go back to `App.js` to render the `<ProductsList />` and pass in the `products` prop with the returned product data as the value. This means that the value of the `ProductsList` component's prop `products` will be resolved from the parent (`App`) component's state, and will update automatically whenever it changes.

```js
import React, { useState, useEffect } from "react";
import { commerce } from './lib/Commerce';

import './styles/scss/styles.scss';

import ProductsList from './components/ProductsList';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetch products data from Chec and stores in the products data object.
   * https://commercejs.com/docs/sdk/products
   */
  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    }).catch((error) => {
      console.log('There was an error fetching the products', error)
    });
  }

  return (
    <div className="app">
      <ProductsList 
        products={products}
      />
    </div>
  )
};

export default App;
```

Awesome you've now got a full products listing page pulling in data from an external API! Next, we can start to add some cart functionalities!

## 4. Add cart functionality

In the app component, follow the same logic to fetch and retrieve your cart data after the component renders, the same as fetching your products. First let's add a cart state to store the cart data that will be returned under the products state.

```js
const [cart, setCart] = useState({});
```

Next, we will use another Commerce method to retrieve the current cart in session with `cart.retrieve()`. Commerce.js automatically creates a cart for you if one does not exist in the current browser session. Commerce.js tracks the current cart ID with a cookie, and stores the entire cart and its contents for 30 days. This means that users returning to your website will still have their cart contents available for up to 30 days.

With the Cart API and cart methods in Commerce.js, the otherwise complex cart logic can be easily implemented. Now let's add a new cart method underneath `fetchProducts()`.

```js
/**
 * Retrieve the current cart or create one if one does not exist
 * https://commercejs.com/docs/sdk/cart
 */
const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => {
        setCart(cart);
    }).catch((error) => {
        console.log('There was an error fetching the cart', error);
    });
}
```

Above, you created a new helper function called `fetchCart()` that will call the `cart.retrieve()` method to retrieve the cart in session or create a new one if one does not exist. When this method resolves, use `setCart` to set the returned cart data object to the cart state. Otherwise, handle a failed request with an error message. And again, we'll want to execute this method in the `useEffect` React hook to always make sure our most up to date cart data is returned.

```js
useEffect(() => {
    fetchProducts();
    fetchCart();
}, []);
```

The `cart.retrieve()` method will run, resolve, and the returned data will be stored in the cart state. Fire up your page, and the result should be similar to the cart object response below:

```json
{
  "id": "cart_Mo11bJPOKW9xXo",
  "created": 1599850065,
  "last_updated": 1599850065,
  "expires": 1602442065,
  "total_items": 0,
  "total_unique_items": 0,
  "subtotal": {
    "raw": 0,
    "formatted": "0.00",
    "formatted_with_symbol": "$0.00",
    "formatted_with_code": "0.00 USD"
  },
  "currency": {
    "code": "USD",
    "symbol": "$"
  },
  "discount_code": [],
  "hosted_checkout_url": "https://checkout.chec.io/cart/cart_Mo11bJPOKW9xXo",
  "line_items": []
}
```

### 4.1 Add to cart

The next functionality we will want to add is the ability to add products to a cart. We will be using the method `cart.add.` which calls the `POST v1/carts/{cart_id}` Cart API endpoint. With the cart object response, we can start to interact with and add the necessary event handlers to handle cart functionalities. Similar to how you can pass props as custom attributes, you can do that with native and custom events via callbacks. Because we will need to display a button to handle the add to cart functionality, let's go back to the `ProductItem.js` component to add that in the product card under the price element. Create a button tag and pass a function `handleAddToCart` to the React native `onClick` attribute which will be the function handler we will create to handle the event.

```jsx
<button
    name="Add to cart"
    className="product__btn"
    onClick={handleAddToCart}
>
    Quick add
</button>
```

To review, in React, data being passed down from a parent component to a child component is called props. In order to pass prop definitions to handle the events, we need to pass callback functions. After attaching a click event in the 'Quick add' button to call the `handleAddToCart` event handler, now create the handler function in the App component.

```js
/**
 * Adds a product to the current cart in session
 * https://commercejs.com/docs/sdk/cart/#add-to-cart
 *
 * @param {string} productId The ID of the product being added
 * @param {number} quantity The quantity of the product being added
 */
const handleAddToCart = (productId, quantity) => {
    commerce.cart.add(productId, quantity).then((item) => {
        setCart(item.cart);
    }).catch((error) => {
        console.error('There was an error adding the item to the cart', error);
    });
}
```

The above helper handle makes a call to the `commerce.cart.add` method. You will also need to pass in parameters `productId` and `quantity` as variables for. When the promise resolves, we set the state again by updating the cart with the new cart data.

Next, we need to define out callback as props and pass down the handler in the `ProductsListing` component instance. We attach the `handleAddToCart()` method in order make the "add to cart" request to the Chec API.

```jsx
<ProductsList 
    products={products}
    onAddToCart={handleAddToCart}
/>
```

We'll need to make sure we continue to pass the add to cart method down to the `ProductsList` component as well as pass `onAddToCart` prop.

```jsx
<ProductItem
    key={product.id}
    product={product}
    onAddToCart={onAddToCart}
/>
```

Now going back to `ProductItem.js` is where this function will be called.

```js
const handleAddToCart = () => {
    onAddToCart(product.id, 1);
}
```

Inside the handler function `handleAddToCart()`, we execute the callback function which is passed in from the `App.js` component via the props we created - `onAddToCart`. A callback can receive any arguments, and the `App.js` component will have access to them. In this case, pass `product.id` and the quantity `1` as these are the request parameters for using the `commerce.cart.add()` method. Next, be sure to pass in `onAddToCart` as an argument to this component.

```js
const ProductItem = ({ product, onAddToCart })
```

The data `product.id` and the quantity `1` that were passed in to the callback function in `ProductItem` component will be received in the handling method.

Upon a successful post request to add a new product to cart, you should see the below example abbreviated response with a new line item in the cart object:

```json
{
  "success": true,
  "event": "Cart.Item.Added",
  "line_item_id": "item_dKvg9l6vl1bB76",
  "product_id": "prod_8XO3wpDrOwYAzQ",
  "product_name": "Coffee",
  "media": {
    "type": "image",
    "source": "https://cdn.chec.io/merchants/18462/images/2f67eabc1f63ab67377d28ba34e4f8808c7f82555f03a9d7d0148|u11 1.png"
  },
  "quantity": 1,
  "line_total": {
    "raw": 7.5,
    "formatted": "7.50",
    "formatted_with_symbol": "$7.50",
    "formatted_with_code": "7.50 USD"
  },
  "_event": "Cart.Item.Added",
  "cart": {
    "id": "cart_Ll2DPVQaGrPGEo",
    "created": 1599854326,
    "last_updated": 1599856885,
    "expires": 1602446326,
    "total_items": 3,
    "total_unique_items": 3,
    "subtotal": {
      "raw": 66.5,
      "formatted": "66.50",
      "formatted_with_symbol": "$66.50",
      "formatted_with_code": "66.50 USD"
    },
    "hosted_checkout_url": "https://checkout.chec.io/cart/cart_Ll2DPVQaGrPGEo",
    "line_items": [
      {
        "id": "item_7RyWOwmK5nEa2V",
        "product_id": "prod_NqKE50BR4wdgBL",
        "name": "Kettle",
        "media": {
          "type": "image",
          "source": "https://cdn.chec.io/merchants/18462/images/676785cedc85f69ab27c42c307af5dec30120ab75f03a9889ab29|u9 1.png"
        },
        "quantity": 1,
        "price": {
          "raw": 45.5,
          "formatted": "45.50",
          "formatted_with_symbol": "$45.50",
          "formatted_with_code": "45.50 USD"
        },
        "line_total": {
          "raw": 45.5,
          "formatted": "45.50",
          "formatted_with_symbol": "$45.50",
          "formatted_with_code": "45.50 USD"
        },
        "variants": []
      }
    ]
  }
}
```

In the JSON response, you can note that the added product is now given associated `line_items` details such as its `line_item_id`, and `line_total`. With this data, we are now able to create the cart component and render out cart details like a list of added items.

---

## ******************************* [ BREAKOUT SESSION ] *******************************

---

### 4.2. Create a cart component

Let's first add our cart styles as we did with our products styles.

Create a `_cart.scss` in `src/styles/components`, copy in the following and import the component in `styles.scss`:

```css
.cart {
    width: 350px;
    background-color: white;
    border: 2px solid $text-primary;
    display: fixed;
    z-index: 1;
    top: 1.25rem;
    right: 1.25rem;
    height: auto;
    position: fixed;

    &__heading {
        padding: 0.95rem 1rem;
        font-weight: bold;
        border-bottom: 2px solid $text-primary;
        color: $text-primary;
        font-size: 1.25rem;
    }

    &__inner {
        padding: 1.25rem;
    }

    &__total {
        display: flex;
        padding: 1rem 1.25rem 0;
        border-top: 2px solid $text-primary;
        justify-content: space-between;
    }

    &__total-title {
        color: $text-primary;
        font-weight: bold;
    }

    &__none {
        padding: 1.25rem;
        color: $text-primary;
        text-align: center;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
    }

    &__btn-empty {
        align-self: flex-start;
        background-color: white;
        border: 2px solid $text-primary;
        padding-left: 1.25rem;
        padding: 0.5rem 0.75rem;
        margin: 0 1.25rem 1.25rem;
        text-transform: uppercase;
        color: $text-primary;
        font-weight: bold;
        font-size: 0.75rem;
    }

    &__btn-checkout {
        background-color: $text-primary;
        border: 2px solid $text-primary;
        padding-left: 1.25rem;
        padding: 0.5rem 0.75rem;
        margin: 0 1.25rem 1.25rem;
        text-transform: uppercase;
        color: white;
        font-weight: bold;
        font-size: 0.75rem;

        &:hover {
            background-color: lighten(#292B83, 10);
        }
    }

    .cart-item {
        display: flex;
        padding: 1.25rem;
    
        &__image {
            width: 4rem;
            height: 4rem;
            object-fit: cover;
            border: 2px solid $color-accent;
            margin-right: 0.75rem;
        }

        &__details-name {
            font-size: 0.98rem;
            color: $text-primary;
            font-weight: bold;
            margin-bottom: 0.25rem;
        }

        &__details-qty {
            display: flex;
            margin: 0 auto;
            margin-bottom: 0;
            font-size: 1rem;

            button {
                border: none;
                background: none;
                font-size: 1.25rem;
            }

            p {
                margin-bottom: 0;
                margin-top: 3px;
            }
        }

        &__details-price {
            font-size: 0.875rem;
        }
    
        &__remove {
            background-color: white;
            border: 2px solid $text-primary;
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
            text-transform: uppercase; 
            color: $text-primary;
            font-weight: bold;
            margin-left: auto;
            align-self: flex-start;
        }
    }
}
```

Next, we will create our cart component in the components folder. Here you will want to follow the same pattern to try to encapsulate and break down smaller components to be consumable by parent components. This way, we can continue to keep your application DRY as well and keep your logic separated.

In your components folder, let's create a `Cart.js`, this will render the main cart container.

```jsx
import React from 'react';
import CartItem from './CartItem';
import PropTypes from 'prop-types';

const Cart = ({ cart }) => {

    const renderEmptyMessage = () => {
        if (cart.total_unique_items > 0) {
          return;
        }
    
        return (
          <p className="cart__none">
            You have no items in your shopping cart, start adding some!
          </p>
        );
    }

    const renderItems = () => (
        cart.line_items.map((lineItem) => (
            <CartItem
              item={lineItem}
              key={lineItem.id}
              className="cart__inner"
            />
        ))
    )

    const renderTotal = () => (
        <div className="cart__total">
            <p className="cart__total-title">Subtotal:</p>
            <p className="cart__total-price">{cart.subtotal.formatted_with_symbol}</p>
        </div>
    )

    return (
        <div className="cart">
            <h4 className="cart__heading">Your Shopping Cart</h4>
            { renderEmptyMessage() }
            { renderItems() }
            { renderTotal() }
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.object,
};

export default Cart;
```

In `Cart.js`, import in a `CartItem` component which we will get to creating next. In the above component, we've split up the rendering of our cart elements to different render methods:

- Render a message when the cart is empty
- Render the contents of the cart when it is not empty
- Render the cart total

This keeps our components clean and in line with the conventions of function components in React. To render an empty cart message, we first check that the cart is empty and return early if it isn't. We use the `cart.total_unique_items` property to determine this and teturn a simple paragraph tag with a message in it.

When rendering the cart items, we do the opposite check from `renderEmptyMessage()` by checking that the cart does indeed have items in it, and returning early if not. Next, we render out the individual line items that exists in the cart object when items are added to cart. We're rendering a `CartItem` component for each line item, providing the line item object as the item prop, and assigning it a unique key with the line item's id property.

Lastly, we render our cart subtotal. We use the `cart.subtotal.formatted_with_symbol` property to get the cart's subtotal with the currency symbol (e.g. $19.95). This property will be updated whenever the cart object changes in the state, so your cart updates in real time!

Next, we will create the `CartItem.vue` component which will render each line item details such as the item image, name, price, and quantity.

### 4.3. Create the cart item component

```js
import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {

    return (
        <div className="cart-item">
            <img className="cart-item__image" src={item.media.source} alt={item.name} />
            <div className="cart-item__details">
                <h4 className="cart-item__details-name">{item.name}</h4>
                <div className="cart-item__details-qty">
                    <p>{item.quantity}</p>
                </div>
                <div className="cart-item__details-price">{item.line_total.formatted_with_symbol}</div>
            </div>
            <button
                type="button"
                className="cart-item__remove"
            >
                Remove
            </button>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;
```

For now, build out the JSX template with the item prop to parse `item.media.source` as the `src` value, the `item.name`, the `item.quanity` and the `item.line_total.formatted_with_symbol`. Later on, we will be adding events to the buttons above to have the functionality to remove each line item.

### 4.4 Add header for cart

We need a header to be able to interact with our cart element so let's start to add the UI for a cart navigation. First let's port in some styles for that. Create a `_nav.scss` in `styles/components` and be sure to import that file in the styles index file.

```css
.nav {
    position: fixed;
    top: 1rem;
    right: 1.25rem;
    z-index: 999;

    &__cart {
        span {
            font-size: 14px;
            font-style: bold;
            background-color: $color-accent;
            color: white;
            padding: 0 0.25rem;
            margin-left: -0.5rem;
            border-radius: 50%;
            vertical-align: top;
        }
    }

    &__cart-btn {
        &--open {
            border: none;
        }

        &--close {
            background-color: $text-primary;
            padding: 0 0.25rem;
            color: white;
            margin-left: -1.6rem;
            margin-top: -0.25rem;
            border-radius: 50%;
            vertical-align: top;
            width: 2.25rem;
            height: 2.25rem;
            border: none;
            z-index: 999;
            position: absolute;

            svg {
                margin-top: 0.375rem;
            }
        }
    }
}
```

Next, we are going to install some handy icons we'll need for our cart graphics. Let's install the font awesome library, there are three packages:

```bash
@fortawesome/react-fontawesome
@fortawesome/fontawesome-svg-core
@fortawesome/free-solid-svg-icons
```

Let's then to creating a component for the cart header navigation. Name the file `CartNav.js`.

```js
import React, { useState } from 'react';
import Cart from './Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingBag, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faShoppingBag, faTimes);

const CartNav = ({ cart, onRemoveFromCart }) => {
    const [isCartVisible, setCartVisible] = useState(false);

    const renderOpenButton = () => (
        <button className="nav__cart-btn--open">
            <FontAwesomeIcon size="2x" icon="shopping-bag" color="#292B83"/>
            {cart !== null ? <span>{cart.total_items}</span> : ''}
        </button>
    )

    const renderCloseButton = () => (
        <button className="nav__cart-btn--close">
            <FontAwesomeIcon size="1x" icon="times" color="white"/>
        </button>
    )

    return (
        <div className="nav">
            <div className="nav__cart" onClick={() => setCartVisible(!isCartVisible)}>
                { !isCartVisible ? renderOpenButton() : renderCloseButton() }
            </div>
            { isCartVisible &&
                <Cart
                    cart={cart}
                    onRemoveFromCart={onRemoveFromCart}
                />
            }  
        </div>
    );
};

export default CartNav;
```

Going back to our `App.js`, we can now import our `CartNav.js` then render out our cart header and pass in our cart object.

```js
import CartNav from './components/CartNav';
```

```jsx
return (
    <div className="app">
      <CartNav 
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
      />
      <ProductsList 
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
);
```

### 4.5. Add remove from cart

Let's go back to `App.js` to add the remove from cart functionality. We will create the event handler to make the request to the `commerce.cart.remove()` method. This is the event handler you pass to your `CartItem` in the a prop definition `onRemoveFromCart`.

```js
/**
 * Removes line item from cart
 * https://commercejs.com/docs/sdk/cart/#remove-from-cart
 *
 * @param {string} lineItemId ID of the line item being removed
 */
const handleRemoveFromCart = (lineItemId) => {
    commerce.cart.remove(lineItemId).then((resp) => {
        setCart(resp.cart);
    }).catch((error) => {
        console.error('There was an error removing the item from the cart', error);
    });
}
```

The `commerce.cart.remove()` method takes an `lineItemId` argument and once the promise resolves, the new cart object has one less of the removed line item (or the item removed entirely if you decrease down to a quantity of zero).

We will need to keep passing down our callback function so let's head into `Cart.js` to pass the method down. Pass in the callback `onRemoveCart` in our `Cart.js` function parameter. As well as into the component instance of `<CartItem>` in the looping of each cart item render function. The final component should look like the below:

```js
import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart, onRemoveFromCart }) => {

    const renderEmptyMessage = () => {
        if (cart.total_unique_items > 0) {
          return;
        }
    
        return (
          <p className="cart__none">
            You have no items in your shopping cart, start adding some!
          </p>
        );
    }

    const renderItems = () => (
        cart.line_items.map((lineItem) => (
            <CartItem
              item={lineItem}
              onRemoveFromCart={onRemoveFromCart}
              key={lineItem.id}
              className="cart__inner"
            />
        ))
    )

    const renderTotal = () => (
        <div className="cart__total">
            <p className="cart__total-title">Subtotal:</p>
            <p className="cart__total-price">{cart.subtotal.formatted_with_symbol}</p>
        </div>
    )

    return (
        <div className="cart">
            <h4 className="cart__heading">Your Shopping Cart</h4>
            { renderEmptyMessage() }
            { renderItems() }
            { renderTotal() }
        </div>
    );
};

export default Cart;
```

Next, in the `CartItem.vue` component, we will create a handler to call the callback function the first cart line item action using the Commerce.js method `commerce.cart.remove()`. Let's add a `handleRemoveFromCart` function handler:

```js
const handleRemoveFromCart = () => {
    onRemoveFromCart(item.id);
}
```

Once again, this handler method will be the one to call a `onRemoveFromCart() `callback function which takes in the `item.id` for which the line item is being removed. Next, let's attach the `handleRemoveFromCart()` method to an isolated Remove button as well. When this click handler fires, the associated line item will be removed from the cart object. Don't forget to pass the `onRemoveFromCart` as a callback function to this component as well. The component should look like this:

```js
import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, onRemoveFromCart }) => {

    const handleRemoveFromCart = () => {
        onRemoveFromCart(item.id);
    }

    return (
        <div className="cart-item">
            <img className="cart-item__image" src={item.media.source} alt={item.name} />
            <div className="cart-item__details">
                <h4 className="cart-item__details-name">{item.name}</h4>
                <div className="cart-item__details-qty">
                    <p>{item.quantity}</p>
                </div>
                <div className="cart-item__details-price">{item.line_total.formatted_with_symbol}</div>
            </div>
            <button
                type="button"
                className="cart-item__remove"
                onClick={handleRemoveFromCart}
            >
                Remove
            </button>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;
```

## Conclusion
Awesome, there you have it! You have just created an e-commerce React application listing products with cart functionalities using an API backend!
