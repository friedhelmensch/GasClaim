var express = require('express');
var app = express();
const blockchainConnector = require('./blockchainConnector');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', async function (request, response) {
  response.send("specify an address {url}/address/{yourNeoAddressHere}");
})

app.get('/address/:address', async function (request, response) {

  response.setHeader('Content-Type', 'application/json');

  try {
    const address = request.params.address;
    const gasClaims = await blockchainConnector.DoIt(address);
    response.send(gasClaims);

  } catch (e) {
    console.log("Error fetching gas claims: " + e.message)
    response.send({
      text: "there was a problem bro"
    });
  }
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
})

