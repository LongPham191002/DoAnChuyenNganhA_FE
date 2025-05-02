export const BASE_URL = 'http://localhost:3000'
const GET_PROFILE = BASE_URL + '/users/profile'
const ADD_FAVORITE = BASE_URL + '/users/favorite';
const REMOVE_FAVORITE = BASE_URL + '/users/favorite';

const ADD_TO_CART = BASE_URL + 'orders';
const UPDATE_CART = BASE_URL + 'orders';

/// export to using global app
export const PROFILE_API = {
    GET_PROFILE, ADD_FAVORITE, REMOVE_FAVORITE
}

export const CART_API = {
    ADD_TO_CART,
    UPDATE_CART,
}

