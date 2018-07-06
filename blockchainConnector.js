exports.makeGetClaims = (fetchTransactions) => {

    const getClaims = async function (address) {

        const allTransactions = await fetchTransactions(address);

        const claims = exports.mapTransactions(allTransactions);

        return claims;
    }

    return getClaims;
}

exports.mapTransactions = (allTransactions) => {

    return allTransactions
        .filter(x => x.type === "ClaimTransaction")
        .map(claimTransaction => {
            return {
                gas: claimTransaction.vouts[0].value,
                date: new Date(claimTransaction.time * 1000)
            }
        })
}

exports.makeFetchTransactions = (fetch) => {

    const fetchTransactions = async (address) => {
        let page = 1;
        const allTransactions = []

        while (true) {
            const response = await fetch("https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/" + address + "/" + page);
            const allTransactionsForPage = await response.json();
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
