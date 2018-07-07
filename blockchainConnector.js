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

    const fetchTransactions = async (address) => {
        let page = 1;
        const allTransactions = []

        while (true) {
            const allTransactionsForPage = await fetchTransactionsForPage(address, page);
            page++
            if (allTransactionsForPage.length === 0) {
                break;
            } else {
                allTransactionsForPage.forEach(transaction => allTransactions.push(transaction))
            }
        }

        return allTransactions;
    }
    return fetchTransactions;
}

exports.makeFetchTransactionsForPage = (fetch) => {

    const fetchTransactionsForPage = async (address, page) => {
        const response = await fetch("https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/" + address + "/" + page);
        const allTransactionsForPage = await response.json();
        return allTransactionsForPage;
    }
    return fetchTransactionsForPage
}
