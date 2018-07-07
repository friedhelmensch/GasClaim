const blockchainConnector = require("../blockchainConnector");
const assert = require('assert');
const fetch = require("node-fetch");

describe("blockchainConnector", () => {
    describe("getClaims", () => {
        it('should return 10 claims', async function () {

            const fetchTransactions = blockchainConnector.makeFetchTransactions(createMockFetchTransactionsForPage());
            const getClaims = blockchainConnector.makeGetClaims(fetchTransactions);

            const claims = await getClaims("ThisDoesNotMatterHere")
            assert.equal(claims.length, 10);
        })
    })
    describe("fetchTransactions", () => {
        it('should return 10 transactions', async function () {

            const fetchTransactions = blockchainConnector.makeFetchTransactions(createMockFetchTransactionsForPage());
            const transactions = await fetchTransactions("MyNeoAddress");
            assert.equal(transactions.length, 10);

        });
    })
})


function createMockFetchTransactionsForPage(){

    return (address, page) => {
        if (page < 5) {
            transactions = [];
            for (let i = 0; i < page; i++) {
                transactions.push(createTransaction(page * (i + 1)))
            }
            return transactions
        } else {
            return [];
        }
    };
}

function createTransaction(value) {
    //this is just nonsense to get semi random numbers
    return {
        vouts: [{ value: value }],
        time: 1530954129 + value,
        type : "ClaimTransaction"
    }
}