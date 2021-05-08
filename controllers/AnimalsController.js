import axios from 'axios';

export const AnimalController = {
    register(animal) {
        return axios({
            url: `animals`,
            baseURL: process.env.API,
            data: animal,
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    list() {
        return axios({
            method: 'GET',
            baseURL: process.env.API,
            url: 'animals'
        });
    },
    delete(animal) {
        return axios({
            method: 'DELETE',
            baseURL: process.env.API,
            url: `animals/${animal}`
        });
    }
}

