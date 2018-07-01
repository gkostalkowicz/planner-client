import axios from 'axios';

const baseUrl = 'http://localhost:3030';

export function get(url) {
    return axios.get(getUrl(url))
        .then(response => {
            return {data: response.data}
        })
        .catch(error => handleError(error, url));
}

export function post(url, data) {
    return axios.post(getUrl(url), data)
        .then(response => {
            return {data: response.data}
        })
        .catch(error => handleError(error, url));
}

export function put(url, data) {
    return axios.put(getUrl(url), data)
        .then(response => {
            return {data: response.data}
        })
        .catch(error => handleError(error, url));
}

export function delete_(url) {
    return axios.delete(getUrl(url))
        .then(response => {
            return {data: response.data}
        })
        .catch(error => handleError(error, url));
}

function getUrl(url) {
    return baseUrl + url;
}

function handleError(error, url) {
    console.error('Error sending request to', url, ':', error)
}