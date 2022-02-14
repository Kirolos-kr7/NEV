import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import { store } from './store'

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
export const batch = firebase.firestore().batch()

export const isRegistered = new Promise((reslove, reject) => {
  auth.onAuthStateChanged((user) => {
    store.commit('setUser', { user })
    user ? reslove(user) : reslove(null)
  })
})
