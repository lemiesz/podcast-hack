import * as functions from 'firebase-functions/v1'
import * as admin from 'firebase-admin'
admin.initializeApp()

export const createUserInFireStore = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        name: user.displayName,
        podcasts: [],
        id: user.uid,
    })
})
