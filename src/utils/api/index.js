import axios from 'axios';
import {mainnet_networks, testnet_networks} from "../web3/networks";


export async function getIpfs(url) {
    if (url.startsWith('https')) {
        return await GET(url);
    } else {
        let temp_url = url
        try {
            temp_url = url.replace('ipfs://', '')
        } catch (e) {
        }

        console.log(temp_url);

        return await GET('https://ipfs.io/ipfs/' + temp_url);
    }
}

export async function getIpfsUrl(url) {
    if (url.startsWith('https')) {
        return url;
    } else {
        let temp_url = url
        try {
            temp_url = url.replace('ipfs://', '')
        } catch (e) {
        }
        return 'https://ipfs.io/ipfs/' + temp_url;
    }
}

export const isTestNet = false;

export const MAIN_URL = 'http://3.34.127.20:8080';
// export const MAIN_URL = 'http://localhost:8080'


const axiosInstance = axios.create({
    baseURL: MAIN_URL
});

export function GET(url) {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
            reject(error);
        }).finally(() => {
        });
    });
}

export function POST(url, data) {
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, data)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
            reject(error);
        }).finally(() => {
        });
    });
}
