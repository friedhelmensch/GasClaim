const blockchainConnector = require("../blockchainConnector");
const assert = require('assert');
const fetch = require("node-fetch");

describe("blockchainConnector", () => {
    describe("getClaims", () => {
        it('should return 0 claims', async function () {

            const fetchTransactions = blockchainConnector.makeFetchTransactions(fetch);
            const getClaims = blockchainConnector.makeGetClaims(fetchTransactions);

            const claims = await getClaims("___")

            assert.equal(claims.length, 0);
        });
    })
})