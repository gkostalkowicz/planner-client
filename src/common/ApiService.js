import axios from 'axios';
import authService from '../auth/AuthService';

const baseUrl = process.env.REACT_APP_API_URL;

export function get(url) {
    return sendRequest('get', url);
}

export function post(url, data) {
    return sendRequest('post', url, data);
}

export function put(url, data) {
    return sendRequest('put', url, data);
}

export function delete_(url) {
    return sendRequest('delete', url);
}

function sendRequest(method, url, data) {
    const config = {
        method: method,
        url: getUrl(url),
        data: data,
        headers: {'X-Username': authService.getUsername()}
    };
    return axios(config)
        .then(response => {return {data: response.data}})
        .catch(error => handleError(error, url));
}

function getUrl(url) {
    return baseUrl + url;
}

function handleError(error, url) {
    console.error('Error sending request to', url, ':', error)
}