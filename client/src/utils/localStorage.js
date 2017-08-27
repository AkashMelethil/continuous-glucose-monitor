import { AUTH_TOKEN } from '../constants'

function saveUserToken(token) {
    localStorage.setItem(AUTH_TOKEN, token)
}

function loadUserToken(token) {
    return localStorage.getItem(AUTH_TOKEN)
}

export {saveUserToken, loadUserToken}