import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import {Logger}  from '@firebase/logger';

admin.initializeApp();
const logger = new Logger(`@firebase/deleteNotesAndMessages`);
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

exports.deleteNotesAndMessages = functions.firestore.document('projects/{uid}').onDelete(
    (snap, context) => {
        const deletedValue = snap.data();
        if(deletedValue !== undefined){
            admin.firestore().collection('/notes').where('project','==',`${deletedValue.uid}`).get().then(
                (result)=>{
                    logger.log(result);
                    if (result.size > 0) {
                        result.forEach(doc=>doc.ref.delete())
                    }
                }
            ).catch(
                (error)=>{
                    logger.error(error);
                }
            );

            admin.firestore().collection('/messages').where('project','==',`${deletedValue.uid}`).get().then(
                (result)=>{
                    logger.log(result);
                    if (result.size > 0) {
                        result.forEach(doc=>doc.ref.delete())
                    }
                }
            ).catch(
                (error)=>{
                    logger.error(error);
                }
            );
        }
        
    }
);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
