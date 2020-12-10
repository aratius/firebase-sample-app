const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const express = require('express');
const engines = require('consolidate');


const facts = [
  {text: "hello"},
  {text: "hi"},
  {text: "good"}
]

const app =  express()
app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

const WebSocket = require('ws')
let wss = new WebSocket.Server({
  port: 8086
})

app.get('/', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  response.render('index', { facts })
  console.log(wss);
})
exports.app = functions.https.onRequest(app);
