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
    apiKey: "AIzaSyDiqE-wH9D4Nuo3UNYMsERCiAFFekAZl7M",
    authDomain: "moto-lovers.firebaseapp.com",
    databaseURL: "https://moto-lovers.firebaseio.com",
    projectId: "moto-lovers",
    storageBucket: "moto-lovers.appspot.com",
    messagingSenderId: "489391068765"
  }
};
