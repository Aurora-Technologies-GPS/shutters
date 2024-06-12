import axios from 'axios';

const api = process.env.VUE_APP_API;

export async function placeList(hash) {
    let data = []
    await axios.get(api+'/v1/place/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function auth(params) {
    let data = []
    await axios.post(api+'/v1/auth/login', params).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
        return data = false
    });
    return data
}

export async function logout(hash) {
    let data = []
    await axios.get(api+'/v1/auth/logout/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function tracker(hash) {
    let data = []
    await axios.get(api+'/v1/tracker/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function findShuttle(hash) {
    let data = []
    await axios.get(api+'/v1/shuttle/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function find_Service_Shuttle(hash) {
    let data = []
    await axios.get(api+'/v1/shuttle_service/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function deleteShuttle(hash, id) {
    let data = []
    const ids=`?ids=${id}`

    await axios.delete(api+`/v1/shuttle/delete/${hash}${ids}`).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function saveShuttle(params) {

    let data = []

    await axios.post(api+'/v1/shuttle/create',params).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function saveShuttleService(params) {

    let data
    console.log(params)

    await axios.post(api+'/v1/shuttle_service/create',params).then(response => {

        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

