var express     = require('express'),
    path        = require('path'),
    app         = express(),
    http        = require('http'),
    HTTP_PORT   = process.env.PORT || 3003;
    const axios = require('axios');
const usernames = require('./data/usernames.json');
const ports = require('./data/ports.json');

const generateRandom = (min,max) => {
  return parseInt(Math.random() * (max - min) + min);
}

const username = (min=0, max=usernames.length) => {
  return usernames[generateRandom(min, max)];
}


const port_generator = (min=0,max=ports.length) => {
  return ports[generateRandom(max, min)];
}

const create_hosts = (n) => {
  let hosts = [];

  for(let i=0; i<n; i++){
    let port = port_generator();
      hosts = [
        ...hosts,
        {
          "id" : i,
          "name" : `host${i + 1}`,
          "hostname" : `nessus-${port.name}.lab.com`,
          "port" : port.number,
          "username" : username()
        }
      ];
    }

  return hosts;
}



app.set('port', HTTP_PORT);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.get('/download/request?:host',(req,res) => res.json(
  {
    "configurations": create_hosts(req.query.host)
  }
));


const API_URL = 'https://www.tesla.com/inventory/api/v1/';

const query = {
  query: {
    model: 'ms',
    condition: 'new',
    options: {},
    arrangeby: 'Relevance',
    order: 'desc',
    market: 'US',
    language: 'en',
    super_region: 'north america'
  },
  offset: 0,
  count: 50,
  outsideOffset: 0,
  outsideSearch: true
}

const getInventory = (qr = JSON.stringify(query) ) =>
  axios.get(`${API_URL}inventory-results?query=${qr}`)

app.get('/inventory/*', async(req,res) => {
    let response = await getInventory(req.query.query || undefined);
    console.log('inventory API called - ', new Date())
    res.json(response.data);
});

http.createServer(app).listen(HTTP_PORT, function(){
    console.log('Server running on port '+ HTTP_PORT);
});
