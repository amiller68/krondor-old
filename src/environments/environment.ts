// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    domain: "dev-7--1a-5y.us.auth0.com",
    clientId: "GzISNA2vFZmZzP8sbZ6g0nKdhc5vNt0f",
    redirect_uri: window.location.origin,
    audience: 'http://localhost:3000/api/',
  },
  apiEndpoint: 'http://localhost:3000/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
