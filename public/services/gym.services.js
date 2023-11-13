class GymsService {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: '/api/gyms'
        })
    }
    getAllGyms() {
        return this.axiosApp.get('/')
    }

}

const gymService = new GymsService()