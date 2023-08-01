import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC-Tvw14WV0i3ugWFVpX98yDrooGG407vM",
    authDomain: "restaurant-app-63e9e.firebaseapp.com",
    databaseURL: "https://restaurant-app-63e9e-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-63e9e",
    storageBucket: "restaurant-app-63e9e.appspot.com",
    messagingSenderId: "465335951714",
    appId: "1:465335951714:web:c762d206d17639f59acc3b"
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage }
