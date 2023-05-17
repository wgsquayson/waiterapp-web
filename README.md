# WaiterApp - Web

Hi! Welcome to WaiterApp, a system that handles the orders at a restaurant, with real-time updates.

This system is a personal project, and has other two parts, [api](https://github.com/wgsquayson/waiterapp-api) and [mobile](https://github.com/wgsquayson/waiterapp-mobile). The web part is responsible for showing the received orders and their statuses in real-time, and also moving a order through preparation stages. This app was built using:

- [Vite](https://vitejs.dev) for bundling
- [React](https://react.dev) for interface
- [Typescript](https://www.typescriptlang.org)
- [Styled-Components](https://styled-components.com) for styling
- [Axios](https://axios-http.com/docs/intro) for api calls
- [Socket.IO Client](https://socket.io) for real-time updates
- [Intl](https://www.npmjs.com/package/intl) for currency handling
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) for toasts

## How to run this app

- Clone this repository
- Run `yarn` on the root folder to install the project dependencies
- Run `yarn dev` to start the server

## Preview

The app was built in brazilian portuguese, but it's pretty straight forward: when a order comes in, the page automatically shows the new order, and you can see the order details and move it through the preparation flow. A toast shows up when you update the order status.

<video src="https://github.com/wgsquayson/waiterapp-web/assets/43099794/e4f2f58e-e02d-4115-b6a5-677b902232de" /> 







