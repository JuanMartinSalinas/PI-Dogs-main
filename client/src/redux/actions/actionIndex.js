import axios from 'axios';
import {
    GET_DOGS,
    GET_DOGS_BY_NAME,
    GET_DOGS_BY_BREED,
    GET_DOGS_BY_TEMP,
    GET_TEMPERAMENTS_LIST,
    GET_BREEDS,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    FILTER_BY_MAX_WEIGHT,
    FILTER_BY_MIN_WEIGHT,
    FILTER_CREATED,
    GET_DETAILS,
    DELETE_DETAILS
} from './allActions.js'




export function getDogs() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        })
    }
}

export function nameDogs(name) {
    return async function (dispatch) {
        let { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: data
        });
    };
}

export function getDogsBreed(payload) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/breedGroup?breedGroup=${payload}`);
            return dispatch({
                type: GET_DOGS_BY_BREED,
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

export function filterByTemperament(payload) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/dog/?temperament=${payload}`);
            return dispatch({
                type: GET_DOGS_BY_TEMP,
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

export function namingOrder(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function weightOrder(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function filterByMaxWeight(payload) {
    return {
        type: FILTER_BY_MAX_WEIGHT,
        payload
    }
}

export function filterByMinWeight(payload) {
    return {
        type: FILTER_BY_MIN_WEIGHT,
        payload
    }
}

export function getTemperamentsList() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/temperament');
        let listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: GET_TEMPERAMENTS_LIST,
            payload: listOfTemperaments
        });
    }
}

export function postingDog(payload) {
    return async function () {
        let response = await axios.post('http://localhost:3001/dogs', payload);
        return response
    }
}

export function getAllBreeds() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/breedGroups');
        return dispatch({
            type: GET_BREEDS,
            payload: json.data
        });
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: DELETE_DETAILS
    })
}
}
