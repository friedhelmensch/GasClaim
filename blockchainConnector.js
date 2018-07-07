exports.makeGetClaims = (fetchTransactions) => {

    const getClaims = async function (address) {

        const allTransactions = await fetchTransactions(address);
        const claims = exports.extractClaimTransactions(allTransactions);

        return claims;
    }

    return getClaims;
}

exports.extractClaimTransactions = (allTransactions) => {

    return allTransactions
        .filter(x => x.type === "ClaimTransaction")
        .map(claimTransaction => {
            return {
                gas: claimTransaction.vouts[0].value,
                date: new Date(claimTransaction.time * 1000)
            }
        })
}

exports.makeFetchTransactions = (fetchTransactionsForPage) => {

    const fetchTransactionsRecursive = async (address, page, transactions) => {
        if (!transactions) transactions = [];
        if (!page) page = 1;
        const transactionsForPage = await fetchTransactionsForPage(address, page);
        if (transactionsForPage.length == 0) {
            return transactions;
        } else {
            return fetchTransactionsRecursive(address, page + 1, transactions.concat(transactionsForPage))
        }
    }
    return fetchTransactionsRecursive;
}

exports.makeFetchTransactionsForPage = (fetch) => {

    const fetchTransactionsForPage = async (address, page) => {
        const response = await fetch("https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/" + address + "/" + page);
        const allTransactionsForPage = await response.json();
        return allTransactionsForPage;
    }
    return fetchTransactionsForPage
}
