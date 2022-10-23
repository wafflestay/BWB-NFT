export function formatWalletAddress(walletAddress) {
    if (walletAddress === undefined || walletAddress === null || walletAddress.length === 0) {
        return "";
    }
    walletAddress = walletAddress.toLowerCase()
    var firstPart = walletAddress.substr(0, 6);
    var secondPart = walletAddress.substr(-6);
    return firstPart + "...." + secondPart;
}

export function isConnectedAccount(accounts) {
    const isConnected = window.localStorage.getItem("isConnected");
    return accounts !== undefined && accounts !== null && accounts.length > 0 && isConnected === 'YES';
}

export async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}


export function getNetworkName(network) {
    if (Number.parseInt(network) === 1001 || Number.parseInt(network) === 8217) {
        return "Klaytn";
    } else {
        return "Ethereum";
    }
}

export function getWalletName(network) {
    if (Number.parseInt(network) === 1001 || Number.parseInt(network) === 8217) {
        return "Kaikas";
    } else {
        return "Metamask";
    }
}

export const truncateAddress = (address) => {
    if (!address) return 'No Account';
    const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};




export const WALLET_TYPE = {
    METAMASK: 'Metamask',
    KAIKAS: 'Kaikas',
    KLIP: 'Klip'
}

export const NETWORK_TYPE = {
    POLYGON : 'polygon',
    ETHEREUM : 'ethereum',
    KLAYTN : 'klaytn'
}