# fortjs session authentication using passportjs

This example shows how we can integrate passportjs and do authentication with session.

# Description

1. The `passportjs` initialization occurs in the `createApp` method found in `src/index.ts`.
2. The `local` strategy is also registered within the `createApp` method in `src/index.ts`.
3. The project features two controllers - `DefaultController` and `UserController`.
4. `DefaultController` is open and includes two methods - `getLoginForm` and `doLogin`, which respectively provide a login UI and handle system login.
5. The `doLogin` method employs `auth.guard('local')` to utilize the local strategy for login and retrieve the `user` value.
6. `UserController` is protected with the shield `auth.shield('isAuthenticated')`, internally checking for the existence of the `user` object. It returns a bad request result when an unauthenticated user attempts to access it, prompting the user to log in first using routes in `DefaultController`.

The integration of `passportjs` is simplified with the assistance of the `fortjs-passport` library, which offers ready-made components and helper methods.

# How to use

*  Clone or download the repo
*  Open the folder location in a command prompt
*  run command - `npm install`
*  run command - `npm run dev`

# Commands

* `npm run dev` - Start development server
* `npm run test` - Run tests
* `npm run lint` - Run linting
* `npm run build` - Generate build
* `npm run deploy` - Generate build for production