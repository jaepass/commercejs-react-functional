# Commerce.js React Product Listing

This is a guide on creating a product listing page using Commerce.js and React. The Commerce.js SDK v2 will be used in
this project.

[See live demo](https://commercejs-react-products.netlify.app/)

## Overview

The goal of this guide is to walk you through creating a simple storefront displaying a list of products with
Commerce.js and React. Throughout this guide you will learn how to:

1. Set up a React project,
2. Install Commerce.js, and
3. Create a products listing page

## Requirements

What you will need to start this project:

- An IDE or code editor
- NodeJS, at least v8
- npm or yarn
- React devtools (recommended)

## Prerequisites

This guide assumes you have some knowledge of the below concepts before starting:

- Basic knowledge of JavaScript
- Some knowledge of React
- An idea of the JAMstack architecture and how APIs work

## Some things to note:

- We will only cover high level concepts of React.
- To ensure you have some product data to work with for this guide, we will provide you with a demo merchant [public key](https://commercejs.com/docs/sdk/concepts#authentication).
- We will not be going over account or dashboard setup. Have a read
  [here](https://commercejs.com/docs/sdk/getting-started#account-setup) if you'd like to learn more about setting up a
  Chec account.
- This application is using Sass for styling and because the main goal of this guide is to learn how to list products
  with Commerce.js, we will not be going over any styling details.

## Initial setup

### 1. Install and set up React

The simplest and quickest way to get started with a React project is to use the
[`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html) command. To create a project, run:

```bash
yarn create react-app your-project-name
# OR
npx create-react-app your-project-name
```

Change directory into your project folder:

```bash
cd your-project-name
```

### 2. Store the public key in an environment variable file

Copy the `.env` file template `.env.example` at the root of your project, and call it `.env`.

```bash
cp .env.example .env
```

Open up your the `.env` file and input in the environment variable key and value:

```bash
# Public key from Chec's demo merchant account
REACT_APP_CHEC_PUBLIC_KEY=pk_184625ed86f36703d7d233bcf6d519a4f9398f20048ec
```

### 3. Start your local HTTP server and run your development environment:
```bash
yarn start
# OR
npm start
```

## Add Commerce.js to the application

### 1. Install Commerce.js

In order to communicate with the Chec API and fetch data from the backend, we need to install the Commerce.js SDK. The
Commerce.js SDK can be installed via CDN by including `<script type="text/javascript"
src="https://cdn.chec.io/v2/commerce.js"></script>` in your `index.html` file, or installed with a package manager
(recommended):

```bash
yarn add @chec/commerce.js
# OR
npm install @chec/commerce.js
```

### 2. Create a Commerce.js instance

The Commerce.js SDK comes packed with all the frontend oriented functionality to get a customer-facing web-store up and running. In order to utilize all the features of this commerce platform's SDK, we are going to import the module into a folder called `lib` so that we can have access to our Commerce object instance throughout our application.

Let's go ahead and do that right now! In your `src` directory, we'll create a new folder called `lib`, create a file `commerce.js` and copy and paste the below code in it. Typically a lib folder in a project stores files that abstracts functions or some form of data.

```js
// src/lib/Commerce.js

import Commerce from '@chec/commerce.js';

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
```

What we have done above is we first imported the `Commerce` object, then we export the instance with our environment variable `REACT_APP_CHEC_PUBLIC_KEY` passed in as an argument. The public key is needed to give us access to data in the Chec API.

You might want to throw an error if the public key isn't available, since it will probably make your application
unusable.

### 3. The commerce object

In order to have access to our `commerce` instance exported in `/lib/Commerce.js`, we'll need to import it to every component needing to make requests to the Chec API. For example by importing the object like so in your `App.js`:

```js
import { commerce } from './lib/Commerce';
```

The `commerce` object will then be available to make Commerce.js requests against.


## Build application

Commerce.js was built with all the frontend functionalities you would need to build a complete eCommerce store. All you need to do is make requests to various Chec API endpoints, receive successful responses, then you have your raw data to output beautifully onto your web store.

Now, lets start to make requests to fetch data from Chec to list our products data.

### 1. Fetch our products data

One of the main resources in Chec is the [Products](https://commercejs.com/docs/sdk/products) endpoint. Commerce.js
makes it seamless to fetch product data with its promise-based
[method](https://commercejs.com/docs/sdk/products#list-products) `commerce.products.list()`. This request would make a
call to the `GET v1/products` API endpoint and return a list of product data upon a successful call. Let's open up the
`App.js` file and start making our first Commerce.js request.

First, you'll want to delete the code that came with creating a new React app and write this file from scratch with a class component. Import in `commerce` as well as a `ProductsList` component that you will get to creating in the next section. Let's also initialize an empty array `products` state in your constructor.

```js
import React, { Component } from "react";
import { commerce } from './lib/Commerce';
import ProductsList from "./components/ProductsList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        products: [],
    }
  }

  render() {
    return (
      <div className="app">
      </div>
    );
  }
};

export default App;
```

In React, when the component class is created, the constructor is the first method called, so initializing your state in the constructor will allow you to set properties to the component when its created. You declare `products` as an empty array in your app to be able to store the returned data later on.

Now, lets get to making your first Commerce.js request. Create a function called `fetchProducts()` in the component and make a request to the products endpoint using `commerce.products.list()` Commerce.js method.

```js
/**
 * Fetch products data from Chec and stores in the products data object.
 * https://commercejs.com/docs/sdk/products
 */
fetchProducts() {
  commerce.products.list().then((products) => {
    this.setState({ products: products.data });
  }).catch((error) => {
    console.log('There was an error fetching the products', error);
  });
```

Inside the function, you use the `commerce` object to access the `products` endpoint and the `list()` method to output the products data. [`commerce.products.list()`](https://commercejs.com/docs/sdk/products#list-products) is a promise-based function call that will resolve the request and `then()` sets the responded data with `this.setState` into the `products` array created earlier in the component's state. The `catch()` method is meant to catch any errors in the case that the request to the server fails.

Of course simply creating the function does not do anything as you have yet to call this function. When the app component
mounts to the DOM by using the lifecycle `componentDidMount()` hook to call the `fetchProducts()` function.

```js
componentDidMount() {
  this.fetchProducts();
}
```

Since you are loading data from a remote endpoint, the `fetchProducts()` function needs to be invoked to update the state with the returned products in order to then use that data to render out the products listing. Speaking of render, you are going to need one of the core React functions `render()`. Without `render()` and a `return` statement, nothing would get logged onto your frontend. Let's first have a look at the expected returned data (abbreviated):

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

With the above rendered data, you will be able to use the various property endpoints such as `product.name` to render out a products detail card which you will get to in the next section. Now let's first add the the empty `<ProductsList />` component instance in the render function:

```js
render() {
  const { products } = this.state;

  return (
    <div className="app">
      <ProductsList
      />
    </div>
  );
}
```

Destructure `products` from state to make it cleaner to reference in the JSX. You need to then bind the products data to a `products` property we will be providing to the `ProductsList` component. What this means is the value of the prop `products` will be resolved from the parent component's state.

### 2. Create our product item component

Because of the nature of React and most modern JavaScript frameworks, components are a way to encapsulate a group of
elements to reuse as custom components throughout your application. We will be creating two components for products,
one will be for the single product item and another for the list of product items.

Start by creating a class component and name it `ProductItem.js` in `src/components`. This component will render the individual product card. In your render function define and deconstruct a `product` prop. We will reference this property to access each product's image, name, description, and price via `.media.source`, `.name`, `.description` and `.price` in the return statement. Note the regular expression - this helps to parse the description data without html tags. Reason being that the description input field in the Chec dashboard is a WYSIWIG editor that produces HTML output instead of plain text.

```js
import React, { Component } from "react";

class ProductItem extends Component {

  render() {
    const { product } = this.props
    const reg = /(<([^>]+)>)/gi;
  
    return (
      <div className="product__card">
        <img className="product__image" src={product.media.source} alt={product.name} />
        <div className="product__info">
          <h4 className="product__name">{product.name}</h4>
          <p className="product__description">
          {(product.description || "").replace(reg, "")}
          </p>
          <div className="product__details">
            <p className="product__price">
            {product.price.formatted_with_symbol}
            </p>
          </div>
        </div>
      </div>
    );
  }
};
export default ProductItem;
```

As you saw earlier in the abbreviated JSON, the returned product data object comes with all the information that you
need to build a product listing view. In the code snippet above, we use our `product` prop to access the various
properties. First, you render an image tag with the `src` value of `product.media.source` as the values inside the curly braces dynamically binds to the attributes.

### 3. Create our products list component

Let's now create a `ProductsList.js` component inside `src/components`. The `ProductsList` component will be another class component which will loop
through and render a list of product items from the `ProductItem` component.

Inside the script tag, first import in the `ProductItem` component. Next, define a `products` prop which its value is assigned and passed down by the parent component `App.js`. In your return statement, you need to use the `map` function to return each of the product item with the `product` prop passed in to each instance of `<ProductItem />`. You also need to pass in a unique identifier like the `product.id` to the `key` attribute as React will use it to determine which items in a list have changed and whether it needs to be rerendered.

```js
import React, { Component } from 'react';
import ProductItem from './ProductItem';

class ProductsList extends Component {

    render() {
        const { products } = this.props;

        return (
            <>
                <div className="products">
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </>
        )
    }
}

export default ProductsList;
```

This component will be a bit bare-boned for now except for looping through a `ProductItem` component.

With both our product item and list components created and encapsulated, let's now go back to `App.js` to render the `<ProductsList />` and pass in the `products` prop with the returned product data as the value.

```js
import React, { Component } from "react";
import { commerce } from './lib/Commerce';
import ProductsList from "./components/ProductsList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        products: [],
    }
  }

  componentDidMount() {
    this.fetchProducts();
  };

  /**
   * Fetch products data from Chec and stores in the products data object.
   * https://commercejs.com/docs/sdk/products
   */
  fetchProducts() {
      commerce.products.list().then((products) => {
        this.setState({ products: products.data });
      }).catch((error) => {
        console.log('There was an error fetching the products', error);
      });
  }

  render() {
    const { products } = this.state;

    return (
      <div className="app">
        <ProductsList 
          products={products}
        />
      </div>
    );
  }
};

export default App;
```

Your final `App.js` component should look like the above code block.

## That wraps it up!

Awesome, you've just wrapped up on creating a products listing page using Commerce.js and React! This guide is the
first part in a full React series. The next guide will walk you through on how to add cart functionalities to your
application.

To view the final code up until this point go [here](https://github.com/jaepass/commercejs-react-products).
