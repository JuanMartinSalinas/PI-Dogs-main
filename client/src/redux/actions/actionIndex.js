import axios from 'axios';
import {
    GET_DOGS,
    GET_DOGS_BY_NAME,
    GET_DOGS_BY_TEMP,
    GET_TEMPERAMENTS_LIST,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    FILTER_BY_MAX_WEIGHT,
    FILTER_BY_MIN_WEIGHT,
    FILTER_CREATED,
    GET_DETAILS,
    CLEAR_DETAILS,
} from './allActions.js'




export function getDogs() {
    return async function (dispatch) {
        let json = await axios.get("/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        });
    };
};

export function nameDogs(name) {
    return async function (dispatch) {
        try {
            let { data } = await axios.get(`/dogs?name=${name}`);
            return dispatch({
                type: GET_DOGS_BY_NAME,
                payload: data
            });
        } catch (err) {
            console.log(err, "Los perros no pudieron cargarse satisfactoriamente.")
        }
    };
};

export function filterByTemperament(payload) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`dog/?temperament=${payload}`);
            return dispatch({
                type: GET_DOGS_BY_TEMP,
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Los filtros no pudieron cargarse satisfactoriamente. Error en /actionIndex.js")
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
        try {
            let json = await axios.get("/temperament");
            let listOfTemperaments = json.data.map(el => el.name)
            return dispatch({
                type: GET_TEMPERAMENTS_LIST,
                payload: listOfTemperaments
            });
        } catch (err) {
            console.log(err, "Los temperamentos no pudieron cargarse satisfactoriamente. Error en /actionIndex.js")
        }
    }
}

export function postingDog(payload) {
    return async function () {
        try {
            let response = await axios.post("/dogs", payload);
            return response
        } catch (err) {
            console.log(err, "El perro no ha podido guardarse. Error en /actionIndex.js")
        }
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
            console.log(err, "Los detalles no pudieron cargarse satisfactoriamente. Error en /actionIndex.js")
        }
    }
}

export function clearDetails() {
    return async function (dispatch){
        return dispatch({
            type: CLEAR_DETAILS
        })
    }
}
