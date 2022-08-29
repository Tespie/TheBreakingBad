
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import Validation from '../utils/Validation';
// import { ApiList, keyPref } from './ApiList';
// const qs = require('query-string');


export var BASE_URL = 'https://www.breakingbadapi.com/api/'; //BETA server Base URL
var APP_JSON = 'application/json';

export const getServiceCall = async (endpoint, params) => {

    console.log('URL & endpoint :-', BASE_URL + endpoint);
    console.log('Param&& :-', JSON.stringify(params));

    // var headers = {
    //     'Accept': APP_JSON,
    //     // 'Authorization': AUTH,
    //     // 'appversion': appVersion,
    //     'Content-Type': APP_JSON,
        
    // }
    // console.log('HEADERS :-', JSON.stringify(headers));
    return axios
        .get(BASE_URL + endpoint, params)
        .then(response => response)
        .catch(error => {
            throw error;
        });
};
