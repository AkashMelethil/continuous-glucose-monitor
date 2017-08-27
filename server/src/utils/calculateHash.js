import crypto from 'crypto'

function calculateSH1Hash(strVal) {
    let shasum = crypto.createHash('sha1')
    shasum.update(strVal)
    return shasum.digest('hex')
}

export {calculateSH1Hash} 