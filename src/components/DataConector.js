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
    await axios.get(api + '/v1/shuttle/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function temp_findTemplates(hash) {
    let data = [{
        id: 1,
        clientId: 300310,
        userId: 300310,
        name: "DEIBY LORA LLEVAR JUGO A SU CASA DESPUES ",
        startPlaceId: 2117241,
        endPlaceId: 2117261,
        departureDue: "2024-06-04T02:44:57Z",
        arrivalDue: "2024-06-04T02:44:57Z",
        note: "la texteada"
    },
    {
        id: 2,
        clientId: 300310,
        userId: 300310,
        name: "NOEL LORA LLEVAR JUGO A SU CASA DESPUES ",
        startPlaceId: 2117262,
        endPlaceId: 2117263,
        departureDue: "2024-06-04T02:44:57Z",
        arrivalDue: "2024-06-04T02:44:57Z",
        note: " test2 de la texteada"
    }]

    await console.log(hash)
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

export async function temp_find_Service_Shuttle(hash) {
    let data

    await console.log(hash);

    data = [
    {
    id: 1,
    shuttleId: 1,
    clientId: 300310,
    userId: 300310,
    trackerId: 2935572,
    statusId: 1
  }

  ]
 
    return data
}

export async function deleteShuttle(hash, id) {
    let data = []
    const ids = `?ids=${id}`
    await axios.delete(api + `/v1/shuttle/delete/${hash}${ids}`).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}
export async function crearTemplate(params) {
    let data = []
    await axios.post(api + '/v1/shuttle/create', params).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}
export async function saveShuttleService(params) {
    let data
    console.log(params)
    await axios.post(api + '/v1/shuttle_service/create', params).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}