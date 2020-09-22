const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
//const { response } = require('express')
const dotenv = require('dotenv');
const Twitter = require('./api/helpers/twitter');
twitter = new Twitter();
dotenv.config();

//middelware
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", '*');
  next();
});
app.use(express.json());

app.get('/tweets', (req, res) => {
  //console.log(req.query)
  const query = req.query.q; //parse data from request
  const count = req.query.count; //req.query contains the parameter to fectch data
  //console.log(process.env.TWITTER_API_TOKEN)
  //const url = "https://api.twitter.com/1.1/search/tweets.json"
  twitter.get(query,count).then((response)=>{
    res.status(200).send(response.data);
  }).catch((error)=>{
    res.status(400).send(error);
  });
  //res.send('Hello World!');
})

  app.listen(port, () => console.log(`Twitter API listening at http://localhost:${port}`))


