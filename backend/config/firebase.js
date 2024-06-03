// config/firebase.js
const admin = require('firebase-admin');
require('dotenv').config();
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://board-game-cafe-a5978.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;