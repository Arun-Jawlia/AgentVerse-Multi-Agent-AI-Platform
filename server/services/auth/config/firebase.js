import admin, { cert, initializeApp } from "firebase-admin"
import serviceAccount from "../serviceAccountKey.json" with {type:'json'}

export const firebaseApp = initializeApp({
  credential: cert(serviceAccount)
});