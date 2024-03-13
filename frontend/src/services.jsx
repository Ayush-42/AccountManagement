import axios from 'axios'

const url ='http://localhost:3001/'

export function registerUserInfo(param){
    return axios.post(`${url}`, param)
}

export function verifyUserInfo(param){
    return axios.post(`${url}signin`, param)
}
export function fetchUserInfo(param){
    return axios.get(`${url}dashboard`, param)
}
export function fetchClaimInfo(param){
    return axios.get(`${url}dashboard/claim`, param)
}
export function postClaimInfo(param){
    return axios.post(`${url}claim`, param)
}
export function updateClaimInfo(param){
    return axios.post(`${url}claim-update`, param)
}
export function postLevelInfo(param){
    return axios.post(`${url}dashboard/level`, param)
}