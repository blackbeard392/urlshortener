require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let dns = require('dns')
let valid = require('validator')

// Basic Configuration
const port = process.env.PORT || 5000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Your first API endpoint


let websites = []
app.post('/api/shorturl', function(req, res) {
  let url =
  valid.isURL(req.body.url,{
  protocols:['http','https'],
  require_protocol:true,
  require_host:true})

  if(url === true){
    let number = Math.floor(Math.random() * 1000)
   websites[number] = req.body.url
    res.json({
      original_url:req.body.url,
      short_url: number
    })
  }else if(url === false){
    res.json({error:'invalid url'})
  }
});

app.get('/api/shorturl/:id',(req,res)=>{
  res.redirect(websites[req.params.id])
  
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
