import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBLu5gf5ecgfdjEr295iXzEVOvVs4wCTYI',
  authDomain: 'bloxy-x.firebaseapp.com',
  projectId: 'bloxy-x',
  storageBucket: 'bloxy-x.appspot.com',
  messagingSenderId: '765062888509',
  appId: '1:765062888509:web:c98c1374e9d96f40007e54',
}
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp
export const auth = firebase.auth()
export const storage = firebase.storage()

export const user = auth.currentUser
