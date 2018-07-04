const fetch = require("node-fetch");


DoIt("your address");

async function DoIt(address) {

    let page = 1;
    const allClaims = []
    while (true) {
        const response = await fetch("https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/" + address + "/" + page);
        const results = await response.json();
        const claims = results
            .filter(x => x.type === "ClaimTransaction")
            .map(claimTransaction => {
                return {
                    gas: claimTransaction.vouts[0].value,
                    date: new Date(claimTransaction.time * 1000)
                }
            })
        page++
        if (claims.length === 0){
            break;
        } else{
            claims.forEach(claim => allClaims.push(claim))
        }
    }
    //const allClaimedGas= allClaims.reduce((prev, current) => prev + current.gas, 0);
    //console.log(allClaimedGas);

    allClaims.forEach(claim => {
        console.log(claim.gas + "           " + claim.date.toISOString().replace("T", " ").split(".")[0])
    })
}