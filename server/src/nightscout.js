import request from 'request'
import url from 'url'

import { calculateSH1Hash } from './utils/calculateHash'
import { NS_BASE_URL, NS_API_SECRET } from '../constants'

/*
This function posts data of the following structure to the url defined by NS_BASE_URL
[{"sgv": i}]
*/
function uploadEntry(data) {
    const payload = [data]
    request({
        url: url.resolve(NS_BASE_URL, 'api/v1/entries/'),
        method: 'POST',
        json: true,   
        body: payload,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'api-secret': calculateSH1Hash(NS_API_SECRET)
        }
    }, function (error, response, body){
        if (error) console.error(error)
    })
}

export {uploadEntry}