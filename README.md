# Commerce.js React Product Listing

This is a guide for creating a product listing page using Commerce.js and React.

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

- We will only cover high level concepts of React
- To ensure you have some product data to work with for this guide, we will provide you with a demo merchant [public
  key](https://commercejs.com/docs/sdk/concepts#authentication)
- We will not be going over account or dashboard setup. Have a read
  [here](https://commercejs.com/docs/sdk/getting-started#account-setup) if you'd like to learn more about setting up a
  Chec account
- This application is using SASS for styling and because the main goal of this guide is to learn how to list products
  with Commerce.js, we will not be going over any styling details

## Initial setup

### 1. Install and set up React

The simplest and quickest way to get started with a React project is to use the
[`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html) command. To create a project, run:

```bash
yarn create-react-app your-project-name
# OR
npx create-react-app your-project-name
```

Change directory into your project folder:

```bash
cd your-project-name
```

### 2. Store the public key in an environment variable file

Copy the template `.env.example` at the root of your project, and call it `.env`.

```bash
cp .env.example .env
```

Open up your the `.env` file and add your Chec public key:

```bash
# Public key from Chec's demo merchant account
REACT_APP_CHEC_PUBLIC_KEY=pk_184625ed86f36703d7d233bcf6d519a4f9398f20048ec
```

### 3. Start your local HTTP server and run your development environment
```bash
yarn start
# OR
npm start
```

## Add Commerce.js to the application

### 1. Install Commerce.js

In order to communicate with the Chec API and fetch data from the backend, install the Commerce.js SDK:

```bash
yarn add @chec/commerce.js
# OR
npm install @chec/commerce.js
```

### 2. Create a Commerce.js instance

The Commerce.js SDK comes packed with all the frontend oriented functionality to get a customer-facing web-store up and
running. To use the SDK, import the module in a folder called `lib` so you have access to the Commerce object instance throughout your application.

Go ahead and do that right now! In your `src` directory, create a new folder called `lib`, create a file
`commerce.js` and copy and paste the below code in it. A lib folder in a project typically stores files that abstracts
functions or some form of data.

```js
// src/lib/commerce.js

import Commerce from '@chec/commerce.js';

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
```

Above, you've imported the `Commerce` object, then exported the instance with your Chec API key provided via an
environment variable. The public key is needed to give you access to data via the Chec API.

You might want to throw an error if the public key isn't available, since it will probably make your application
unusable.

### 3. The commerce object

In order to have access to your `commerce` instance exported in `/lib/Commerce.js`, import it to every
component needing to make requests to the Chec API:

```js
import { commerce } from './lib/commerce';
```

The `commerce` object will then be available to make Commerce.js requests with.

## Build application

Commerce.js was built with all the frontend functionality needed to build a complete eCommerce store. Simply make requests to various Chec API endpoints, receive successful responses, then use the raw data to output beautifully onto your web store.

You can now start to make requests to fetch data from Chec to list your product data.

### 1. Fetch our products data

One of the main resources in Chec is the [Products](https://commercejs.com/docs/sdk/products) endpoint. Commerce.js
makes it seamless to fetch product data with its promise-based
[method](https://commercejs.com/docs/sdk/products#list-products) `commerce.products.list()`. This request would make a
call to the `GET v1/products` API endpoint and return a list of product data. Open up your
`App.js` file and start making our first Commerce.js request.

First, delete the code that came with creating a new React app and write this file from scratch.
Import `commerce` as well as a `ProductsList` component which you'll create in the next
section. While there, initialize an empty array `products` state in your constructor.

```js
import React, { Component } from 'react';
import { commerce } from './lib/commerce';
import ProductsList from './components/ProductsList';

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

In React, when a component is created, the constructor is the first method called. Initializing your state in
the constructor will allow you to store data on the component's instance when it's created. You'll initialize `products`
as an empty array in your app to be able to store the product data later on.

You can now make your first Commerce.js request! Create a function called `fetchProducts()` in the component and
make a request to the products endpoint using the Commerce.js method `commerce.products.list()`.

```jsx
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
```

Inside the function, use the `commerce` object to access the `products.list()` method for access to product data. [`commerce.products.list()`](https://commercejs.com/docs/sdk/products#list-products) is a
promise-based function call that will resolve the request and `then()` sets the response data with `this.setState()` into
the `products` state key created earlier in the component's constructor. The `catch()` method catches any errors in the
case that the request to the server fails.

Of course simply creating the function does not do anything as you have yet to call this function. When the app
component mounts to the DOM, use the lifecycle hook `componentDidMount()` to fetch your data.

```jsx
componentDidMount() {
  this.fetchProducts();
}
```

As you are loading data from a remote API, the `fetchProducts()` function needs to be invoked to update the
state with the returned products in order to then use that data for your product list. Speaking of render,
you are going to need one of the core React functions `render()`. Without `render()` and a `return` statement, nothing
would get logged onto your frontend. Below is the expected returned data (abbreviated):

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

With the product data you will be able to use the various product properties such as `product.name` to render
a product detail component, which you'll get to in the next section. Now add the empty `<ProductsList
/>` component to your render function:

```jsx
render() {
  const { products } = this.state;

  return (
    <div className="app">
      <ProductsList />
    </div>
  );
}
```

Destructure `products` from state to make it a little cleaner. You'll need to pass the `products` property as an argument
 to your `ProductsList` component. This means that the value of the `ProductsList` component's prop
`products` will be resolved from the parent (`App`) component's state, and will update automatically whenever it changes.

### 2. Create our product item component

The nature of React and most modern JavaScript frameworks is to separate your code into components. Components are a way to encapsulate a group of
elements for reuse throughout your application. You'll be creating two components for products, one
will be for the single product item and another for the list of product items.

Start by creating a class component and name it `ProductItem.js` in `src/components`. This component will render the
individual product card. In your render function destructure `product` from your props. You will reference this
property to access each product's image, name, description, and price via `.media.source`, `.name`, `.description` and
`.price` in the return statement.

Product descriptions return HTML. To strip HTML from the product description string, using [this `string-strip-html`](https://codsen.com/os/string-strip-html/) handy library will do the trick. Install this library by running `yarn add string-strip-html` or `npm i string-strip-html`. After installing, import the module in and pass in the product description to the `stripHtml` function.

```jsx
import React, { Component } from "react";
import stripHtml from 'string-strip-html';

class ProductItem extends Component {
  render() {
    const { product } = this.props
    const { result } = stripHtml(product.description);

    return (
      <div className="product__card">
        <img className="product__image" src={product.media.source} alt={product.name} />
        <div className="product__info">
          <h4 className="product__name">{product.name}</h4>
          <p className="product__description">
            {/* product description stripped of html tags */}
            {result}
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
need to build a product listing view. In the code snippet above, your `product` prop is being used to access the various
properties. First, render an image tag with the `src` value of `product.media.source` as the values inside the curly
braces dynamically binds to the attributes.

### 3. Create our products list component

It's now time to create a `ProductsList.js` component inside `src/components`. The `ProductsList` component will be another
class component which will loop through and render a list of `ProductItem` components.

First, import in the `ProductItem` component. Next, define a `products` prop. This will be provided by the parent component.
In your return statement you need to use the `map` function
to render a `ProductItem` component for each product in your `products` prop. You also
need to pass in a unique identifier (`product.id`) as the `key` attribute - React will use it to determine which
items in a list have changed and which parts of your application need to be re-rendered.

```js
import React, { Component } from 'react';
import ProductItem from './ProductItem';

class ProductsList extends Component {
  render() {
    const { products } = this.props;

    return (
      <div className="products">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
    );
  }
}

export default ProductsList;
```

This component will be a bit bare-boned for now except for looping through a `ProductItem` component.

With both your product item and list components created, go back to `App.js` to render the
`<ProductsList />` and pass in the `products` prop with the returned product data as the value.

```js
import React, { Component } from 'react';
import { commerce } from './lib/commerce';
import ProductsList from './components/ProductsList';

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

Your final `App.js` component should look like the above code block. If you want to build in a loading state while
your products load, you could add `loading: true` to your initial state, have `fetchProducts()` change this to false
when the promise resolves, and add something like this to your render function:

```jsx
render() {
  const { products, loading } = this.state;
  if (loading) {
    return <p>Loading...</p>;
  }
}
```

## That wraps it up!

Awesome, you've just wrapped up creating a products listing page using Commerce.js and React! This guide is the first
part in a full React series. The next guide will walk you through on how to add cart functionalities to your
application.

To view the final code up until this point go [here](https://github.com/jaepass/commercejs-react-products).

For a deeper dive into building applications this way, look into server-side rendering and
static site generation. Pre-generating your product list and detail pages will be immensely useful for improving
your search engine optimization. React libraries such as Gatsby and Next.js help you to do this. Check out the
[Commerce.js Community Guides](https://commercejs.com/docs/community/) section for more guides using these tools!
