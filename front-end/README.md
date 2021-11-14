# Development Guide

1. `npm install` to fetch dependencys

2. `npm run start` to start the dev sever

3. `firebase emulators:start` to run firebase emulators, see firebase section for info if this fails

# Firebase

This application uses https://firebase.google.com as its backend. Firebase allows us to quickly itterate
by letting google handle backend hosting for us. This lets us focus on delivering a crisp user experience
using only java script.

### How do i develop locally with firebase?

Google provides a emulator suite for many of their firebase cloud items. This allows you to develop without
having to hit a production database. See https://firebase.google.com/docs/emulator-suite for more info.

In order to start the emulator there are two pre-requirments

1. You must java installed on your machine, see https://java.com/en/.

2. you must have the firebase cli installed, `npm install -g fiebase-cli`.

# General dev patterns

## Adding a new page

1. Define your page in routes.ts
2. If your page is going ot have nested routing, define a `routes.ts` at the root module of your new page. Import nested route into roote `routes.ts`
3. App.tsx is setup to automatically render new routes as long as they are defined in the above way.

## Adding new redux state

We are using Redux toolkit for simplicity and consistency of code. https://redux-toolkit.js.org/api/createslice

The `createSlice` utility should be enough to do most things. It is recommend you use that instead of defining a custom reducer/action structure.

If you need to define custom reducer/action structure, just make sure it can cleanly build into the root reducer in store.ts

## Adding new API interactions

All api code should be scoped to the `/api` module. It is structure as follows

-   firebase.ts - defines setup code for interacting with firebase. Anything that is specifically firebase related should go in here.

-   api.ts - this provides app-level abstraction. Here we define the interfaces for what our app is doing (ex CRUD methods). These methods most likely will delegate to constructs defined in `firebase.ts`. However they are decoupled, allowing for easily introducing custom backend providers if needed.

-   types.ts - This provides the object defenitions. These should map to objects that are stored in our firebase collections.

## Component/View layer

We have chosen to use https://tailwindcss.com/ for developing components in this app. This was kind of a arbrirary choice, and may be subject to change as the app evolves. Tailwind provides CSS utilites for easily writing responsive view code.

https://chakra-ui.com/ is another consideration. I am open to switching to this if tailwind proves to be cumbersome. CSS-in-js philiosophy of chakra is more "reacty". However taildwind does provide a ton of nice looking refrences components on sites like https://tailwindcomponents.com/

Action item here would be to make a decision before the app becomes to big to refactor.
