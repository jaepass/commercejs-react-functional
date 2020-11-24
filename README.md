# Commerce.js React Product Listing and Add to Cart

Product listing page with cart functionalities using Commerce.js and React.

**Note**
- This app is built using [Commerce.js](https://commercejs.com/) v2 SDK

## Requirements

What you will need to start this project:

- An IDE or code editor
- NodeJS, at least v8
- npm or yarn
- Chec CLI `yarn global add @chec/cli`
- React devtools (recommended)

## Setup

### Create a Chec account (optional). 

This section is optional and if only you prefer to set up the store with your own product data. Now that you’ve installed Chec CLI globally, you will be able to access the list of `chec [COMMANDS]`, one of which is registering for a Chec account. Let’s go ahead and get that set up!

```bash
# Open the Chec registration page in your browser
chec register
```

Follow the rest of the walk-through to set up your merchant details. Alternatively, you can go [here](https://authorize.chec.io/signup) to register for a Chec account. 

**STEP 1.** Clone the repo and install dependencies

```bash
# Clone the repository locally, optionally rename the repo, change into the directory
git clone https://github.com/chec/commercejs-react-functional.git chec-store 
# Change into the directory and install dependencies
cd chec-store && yarn
```

**STEP 2.** Set up your environment variables

Replace the sample `.env.example` dotenv file at the root of the project to store your Chec `public_key`.

```bash
# Copy from source file to destination file .env
cp .env.example .env
```

You can access your API key under in your Chec dashboard setup, then navigate to the Develop tab to copy your Public Key. Alternatively, you can use the demo public key provided in the `.env.example` template.

```js
// .env

# Fill in your public key
REACT_APP_CHEC_PUBLIC_KEY=
CHEC_API_URL=https://api.chec.io
NODE_ENV=
```

This file is meant to not be committed to source control and also will be hidden in file browsers.

**STEP 3.** Run development environment
```bash
# Run your development environment on http://localhost:3000
yarn start
```

Now head on over to http://localhost:3000 after starting your development, your site should now be populated with the sample data!

**STEP 4.** Make any necessary changes you need and push the code to a repository on Github or your choice of platform.

## 🥞 Stack

- Framework - [React.js](https://reactjs.org)
- eCommerce - [Chec/Commerce.js](https://commercejs.com)
- Styling - [SASS](https://sass-lang.com)
