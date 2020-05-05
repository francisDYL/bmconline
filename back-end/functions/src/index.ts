import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

admin.initializeApp();

exports.createUserProfil = functions.auth.user().onCreate((user: UserRecord) => {
    admin.firestore().collection('/users').doc(user.uid).set(
        {
            uid: user.uid,
            email: user.email,
            displayName: user.email?.split('@')[0],
            photoURL: '',
            emailVerified: false,
            phoneNumber: '',
            isAnonymous: false,
            role: ''
        }
    ).then(data => console.log(data))
        .catch(error => console.error(error));
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
