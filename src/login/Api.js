
import axios from "axios"
// const axios = require('axios');

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyDv8Adtc_H8rNI6-2WSN9NchneTYCEToRI"
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;


export const RegisterApi = (inputs) => {
    let data = { displayName: inputs.name, email: inputs.email, password: inputs.password }
    return axios.post(REGISTER_URL, data) //{data:data}
}

export const LoginApi = (inputs) => {
    let data = { email: inputs.email, password: inputs.password }
    return axios.post(LOGIN_URL, data) //{data:data}
}

export const UserDetailsApi = (inputs) => {
    let id = localStorage.getItem('idToken')
    let data = { idToken: id }
    return axios.post(USER_DETAILS_URL, data) //{data:data}
}