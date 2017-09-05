'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const ref = admin.database().ref();
exports.createdUserAccount = functions.auth.user().onCreate(event => {
    const uid = event.data.uid;
    const email = event.data.email;
    const photoURL = event.data.photoURL || 'https://pickaface.net/assets/images/slides/slide2.png';
    const newUserRef = ref.child(`/users/${uid}`);
    return newUserRef.set({
        photoURL: photoURL,
        email: email
    });
});
exports.deleteUserAccount = functions.auth.user().onDelete(event => {
    const uid = event.data.uid;
    const userRef = ref.child(`/users/${uid}`);
    return userRef.set({
        isDeleted: true
    });
});
//# sourceMappingURL=user.js.map