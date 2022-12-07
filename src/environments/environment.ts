// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA2lPL21fWLnItpIaEc3dHsiQbDiMOfcu0",
    //authDomain: "project-id.firebaseapp.com",
    //authDomain: "landing-page01.web.app",
    authDomain: "landing-page01.firebaseapp.com",
    databaseURL: "https://landing-page01.firebaseio.com",
    projectId: "landing-page01",
    storageBucket: "landing-page01.appspot.com",
    messagingSenderId: "143120279339",
    appId: "1:143120279339:web:41e1fa1cb5f471063e876e"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
