const blockchainConnector = require("../blockchainConnector");
const assert = require('assert');
const fetch = require("node-fetch");

describe("blockchainConnector", () => {
    describe("getClaims", () => {
        it('should return 10 claims', async function () {

            const pages = 5;
            const transactionsPerPage = 4;
            const mod = 3;

            const fetchTransactions = blockchainConnector.makeFetchTransactions(createMockFetchTransactionsForPage(pages, transactionsPerPage));
            const getClaims = blockchainConnector.makeGetClaims(fetchTransactions);

            const claims = await getClaims("ThisDoesNotMatterHere")
            assert.equal(claims.length, pages * transactionsPerPage / 2);
        })
    })
    describe("fetchTransactions", () => {
        it('should return 10 transactions', async function () {

            const pages = 5;
            const transactionsPerPage = 4;
            const mod = 3;


            const fetchTransactions = blockchainConnector.makeFetchTransactions(createMockFetchTransactionsForPage(pages, transactionsPerPage));
            const transactions = await fetchTransactions("MyNeoAddress");
            assert.equal(transactions.length, pages * transactionsPerPage);

        });
    })
})

function createMockFetchTransactionsForPage(maxPages, transactionsPerPage) {

    return (address, page) => {
        if (page <= maxPages) {
            transactions = [];
            for (let i = 0; i < transactionsPerPage; i++) {
                transactions.push(createTransaction(i % 2 === 0))
            }
            return transactions
        } else {
            return [];
        }
    };
}

function createTransaction(isClaim) {
    return {
        vouts: [{ value: 150 }],
        time: 1530954129 + 157,
        type: isClaim === true ? "ClaimTransaction" : "NoClaim"
    }
}