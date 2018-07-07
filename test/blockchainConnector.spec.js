const blockchainConnector = require("../blockchainConnector");
const assert = require('assert');
const fetch = require("node-fetch");

describe("blockchainConnector", () => {
    describe("getClaims", () => {
        it('should return 10 claims', async function () {

            const transactionPages = [];
            transactionPages.push([createTransaction(true), createTransaction(true)])
            transactionPages.push([createTransaction(false), createTransaction(true)])

            const fetchTransactions = blockchainConnector.makeFetchTransactions(createMockFetchTransactionsForPage(transactionPages));
            const getClaims = blockchainConnector.makeGetClaims(fetchTransactions);

            const claims = await getClaims("ThisDoesNotMatterHere")
            assert.equal(claims.length, 3);
        })
    })
    describe("fetchTransactions", () => {
        it('should return 10 transactions', async function () {

            const transactionPages = [];
            transactionPages.push([createTransaction(true), createTransaction(true)])
            transactionPages.push([createTransaction(false), createTransaction(true)])


            const fetchTransactions = blockchainConnector.makeFetchTransactions(createMockFetchTransactionsForPage(transactionPages));
            const transactions = await fetchTransactions("MyNeoAddress");
            assert.equal(transactions.length, 4);

        });
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