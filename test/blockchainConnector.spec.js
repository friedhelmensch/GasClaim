const blockchainConnector = require("../blockchainConnector");
const assert = require('assert');
const fetch = require("node-fetch");

describe("blockchainConnector", () => {
    
    describe("getClaims", () => {
        it('should return 3 claims', async function () {

            const transactionPages = [];
            transactionPages.push([createTransaction(true), createTransaction(true)])
            transactionPages.push([createTransaction(false), createTransaction(true)])

            const fetchTransactions = blockchainConnector.makeFetchTransactions(createMockFetchTransactionsForPage(transactionPages));
            const getClaims = blockchainConnector.makeGetClaims(fetchTransactions);

            const claims = await getClaims("ThisDoesNotMatterHere")
            assert.equal(claims.length, 3);
        })

        /*
        * Boilerplate for testing/executing with an actual address against a live system.
        * Put in your address und uncomment
        it('should return all actual claims', async function () {
            const getClaims = blockchainConnector.makeGetClaims();
            const claims = await getClaims("YourNeoAddress")
            assert.equal(claims.length, "YourNumberOfExpectedGasClaims", JSON.stringify(claims));
        })
        * */ 
        
    })


    describe("fetchTransactions", () => {
        it('should return 4 transactions', async function () {

            const transactionPages = [];
            transactionPages.push([createTransaction(true), createTransaction(true)])
            transactionPages.push([createTransaction(false), createTransaction(true)])

            const fetchTransactions = blockchainConnector.makeFetchTransactions(createMockFetchTransactionsForPage(transactionPages));
            const transactions = await fetchTransactions("MyNeoAddress");
            assert.equal(transactions.length, 4);

        });
    })

    describe("getAllGasSenders", () => {

        /*
        * Boilerplate for testing/executing with an actual address against a live system.
        * Put in your address and uncomment
         
        it('return all', async function () {

            const fetchTransactionForPage = blockchainConnector.makeFetchTransactionsForPage(fetch);
            const fetchTransactions = blockchainConnector.makeFetchTransactions(fetchTransactionForPage);
            const getAllGasSenders = blockchainConnector.makeGetAllGasSenders(fetchTransactions);

            const allGasSenders = await getAllGasSenders("YourNeoAddressHere")
            console.log(allGasSenders);
        })
        */
    })
})

function createMockFetchTransactionsForPage(pages) {

    return (address, pageNumber) => {
        if (pageNumber <= pages.length) {
            const page = pages[pageNumber - 1];
            return page;
        }
        return [];
    };
}

function createTransaction(isClaim) {
    return {
        vouts: [{ value: 150 }],
        time: 1530954129 + 157,
        type: isClaim === true ? "ClaimTransaction" : "NoClaim"
    }
}