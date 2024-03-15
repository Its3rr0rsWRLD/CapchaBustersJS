// lib/index.js
const request = require('request');

const BASE_URL = 'https://captchabusters.com/api';

function createTask(apiKey, task) {
    return new Promise((resolve, reject) => {
        request.post(`${BASE_URL}/createTask`, {
            json: {
                clientKey: apiKey,
                task: task
            }
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

function getTaskResult(apiKey, taskId) {
    return new Promise((resolve, reject) => {
        request.post(`${BASE_URL}/getTaskResult`, {
            json: {
                clientKey: apiKey,
                taskId: taskId
            }
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

function getBalance(apiKey) {
    return new Promise((resolve, reject) => {
        request.post(`${BASE_URL}/getBalance`, {
            json: {
                clientKey: apiKey
            }
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

module.exports = {
    createTask,
    getTaskResult,
    getBalance
};