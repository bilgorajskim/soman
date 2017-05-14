import axios from 'axios';

const ENDPOINT = '/admin/api/';

export function getOrders(options) {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINT + 'orders', {
            params: options
        })
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export function getOrder(orderId) {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINT + 'orders/' + orderId)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export function getOrderItem(itemId) {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINT + 'order-items/' + itemId)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export function deleteOrder(orderId) {
    return new Promise((resolve, reject) => {
        axios.delete(ENDPOINT + 'orders/' + orderId)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export function changeOrderStatus(orderId, newStatus) {
    return new Promise((resolve, reject) => {
        axios.post(ENDPOINT + 'orders/' + orderId + '/change-status', {
            newStatus
        })
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error);
            });
    });
}