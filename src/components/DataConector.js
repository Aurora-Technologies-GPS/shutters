import axios from 'axios';

const api = process.env.VUE_APP_API;

export async function placeList(hash) {
    let data = []
    await axios.get(api + '/v1/place/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function auth(params) {
    let data = []
    await axios.post(api + '/v1/auth/login', params).then(response => {
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
    await axios.get(api + '/v1/tracker/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}



export async function findTemplates(hash) {
    let data = []
    await axios.get(api + '/v1/shuttle_template/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}



export async function find_Service_Shuttle(hash) {
    let data = []
    await axios.get(api + '/v1/shuttle_service/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function deleteTemplate(hash, id) {
    let data = []
    const ids = `?ids=${id}`
    await axios.delete(api + `/v1/shuttle_template/delete/${hash}${ids}`).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}
export async function crearTemplate(params) {
    let data = []
    await axios.post(api + '/v1/shuttle_template/create', params).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}
export async function crearServiceShuttle(params) {
    let data
    console.log(params)
    await axios.post(api + '/v1/shuttle_service/create', params).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function deleteShutter(hash, id) {
    let data = []
    await axios.patch(api + `/v1/shuttle_service/cancel/${hash}/${id}`).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}