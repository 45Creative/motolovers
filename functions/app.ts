const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();

const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !req.cookies.__session) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  }
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  });
};

app.use(cors);
app.use(cookieParser);
//app.use(validateFirebaseIdToken);
app.get('/hello', validateFirebaseIdToken, (req, res) => {
  res.send(`Hello ${req.user.email}`);
});

exports.app = functions.https.onRequest(app);


cons ref = admin.database().ref();

exports.createdUserAccount = functions.auth.user().onCreate(event => {
  const uid = event.data.uid;
  const email = event.data.email;
  const photoUrl = event.data.photoUrl || 'https://pickaface.net/assets/images/slides/slide2.png';

  const newUserRef = ref.child(`/users/${uid}`);
  return newUserRef.set({
    photoUrl = photoUrl,
    email = email
  });

}

exports.deleteUserAccount = functions.auth.user().onDelete(event => {
  const uid = event.data.uid;
  const userRef = ref.child(`/users/${uid}`);
  return userRef.set({
    isDeleted: true
  });

}
