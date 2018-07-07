const blockchainConnector = require("../blockchainConnector");
const assert = require('assert');
const fetch = require("node-fetch");

describe("blockchainConnector", () => {
    describe("getClaims", () => {
        it('should return 0 claims', async function () {
            /*
            const fetchTransactionsForPage = blockchainConnector.makeFetchTransactionsForPage(fetch);
            const fetchTransactions = blockchainConnector.makeFetchTransactions(fetchTransactionsForPage);

            const getClaims = blockchainConnector.makeGetClaims(fetchTransactions);

            const claims = await getClaims("AXvBajVNoPvNAcnFvW7s3vk2iu2A6H5PP4")
            assert.equal(claims.length, 0);*/
        });
    }),
        describe("fetchTransactions", () => {
            it('should return 4 transactions', async function () {

                const fetchTransactionsForPage = (address, page) => {
                    if (page < 2) {
                        return [{ TransactionNumber: page }]
                    } else {
                        return []
                    }
                };
                const fetchTransactions = blockchainConnector.makeFetchTransactions(fetchTransactionsForPage);

                const claims = await fetchTransactions("_")

                claims.map((claim) => console.log(claim));
                assert.equal(claims.length, 2);
            });
        })
})