const initialState = {
    dogs: [],
    allDogs: [],
    breeds: [],
    temperaments: [],
    details: [],
    fav: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };

        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                allDogs: action.payload,
            };

        case 'GET_DOGS_BY_TEMP':
            return {
                ...state,
                allDogs: action.payload,
            };

        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload
            };

        case 'GET_TEMPERAMENTS_LIST':
            return {
                ...state,
                temperaments: action.payload
            };

        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'a' ? [...state.dogs].sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                else return 0; 
            }) : [...state.dogs].sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                else return 0;
            });
            return {
                ...state,
                allDogs: sortedArr
            };

        case 'ORDER_BY_WEIGHT':
            const sortWeight = action.payload === 'asc' ? [...state.dogs].sort(function (a, b) {
                if(a.weight_min === null) return 0;
                if (a.weight_min < b.weight_min) return 1;
                if (b.weight_min < a.weight_min) return -1;
                else return 0;
            }) : [...state.dogs].sort(function (a, b) {
                if(a.weight_min === null) return 0
                if (a.weight_min < b.weight_min) return -1;
                if (b.weight_min < a.weight_min) return 1;
                else return 0;
            });
            return {
                ...state,
                allDogs: sortWeight
            };

        case 'FILTER_BY_MIN_WEIGHT':
            const allDoggys = state.allDogs
            const filterMinWeight = action.payload === 'all' ? allDoggys : allDoggys.filter(dog => dog.weight_min >= action.payload)
            return {
                ...state,
                allDogs: filterMinWeight
            }

        case 'FILTER_BY_MAX_WEIGHT':
            const everyDog = state.allDogs
            const filterMaxWeight = action.payload === 'all' ? everyDog : everyDog.filter(dog => dog.weight_max <= action.payload)
            return {
                ...state,
                allDogs: filterMaxWeight
            }

        case 'FILTER_CREATED':
            let createdFilter = [];
            // console.log('payload: ', action.payload);
            if(action.payload === 'created') {
                createdFilter = state.dogs.filter(dog => dog.createdInDB === true);
            } else if (action.payload === 'API') {
                createdFilter = state.dogs.filter(dog => !dog.createdInDB);
            } else {
                createdFilter = state.dogs;
            };
            return {
                ...state,
                allDogs: createdFilter,
            };

        // case 'FILTER_BY_FAV': 
        //     let fav = [];
        //     if(action.payload === 'all') {
        //         fav = state.dogs.filter(dog => dog.favorite === true);
        //     } else if (action.payload === 'favs') {
        //         fav = state.dogs.filter(dog => !dog.favorite);
        //     } else {
        //         fav = state.dogs;
        //     };
        //     return {
        //         ...state,
        //         allDogs: fav,
        //     };

        case 'POST_DOG':
            return {
                ...state
            }

        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            }

        case 'CLEAR_DETAILS':
            return {
                ...state,
                details: []
            }

        default:
            return state
    }
}

export default rootReducer;