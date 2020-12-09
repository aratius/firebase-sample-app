const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express');
const engines = require('consolidate');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
)

// function getFacts() {
//   const ref = firebaseApp.database().ref('facts')
//   return ref.once('value').then(snap => snap.val())
// }

const facts = [
  {text: "hello"},
  {text: "hi"},
  {text: "good"}
]

const app =  express()
app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    response.render('index', { facts })
})
exports.app = functions.https.onRequest(app);
