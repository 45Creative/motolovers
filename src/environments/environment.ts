// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { IConfig } from './iconfig';

export const environment = {
  production: false,
  googleApi: ''
};

export const CONFIG: IConfig = {
  "firebaseConfig" : {
    apiKey: "AIzaSyBG1Ezs1ZWHjDX04q7cG1VBMQBCmtsmkEE",
    authDomain: "generics-343f9.firebaseapp.com",
    databaseURL: "https://generics-343f9.firebaseio.com",
    projectId: "generics-343f9",
    storageBucket: "generics-343f9.appspot.com",
    messagingSenderId: "1079932467747"
  }
};
