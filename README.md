# CaptchaBusters Node.js Package

This Node.js package provides a convenient way to interact with the CaptchaBusters API for solving captcha types.

## Installation

To use this package, install it via npm:

```bash
npm install captchabusters-nodejs
```

## Usage

```javascript
const CaptchaBusters = require('captchabusters-nodejs');

const apiKey = 'YOUR_API_KEY';

(async () => {
    try {
        // Create a task
        const task = {
            type: 'FunCaptchaTask',
            websiteURL: 'https://www.roblox.com',
            websitePublicKey: 'A2A14B1D-1AF3-C791-9BBC-EE33CC7A0A6F',
            websiteSubdomain: 'roblox-api.arkoselabs.com',
            proxy: 'username:password@ip:port',
            data: JSON.stringify({ blob: 'data_exchange_blob' })
        };
        const taskResponse = await CaptchaBusters.createTask(apiKey, task);
        console.log('Task created:', taskResponse);

        // Poll for task result
        let taskResult;
        do {
            taskResult = await CaptchaBusters.getTaskResult(apiKey, taskResponse.taskId);
            console.log('Task result:', taskResult);
            // Add delay before polling again if the task is not completed
            if (!taskResult.solution) await new Promise(resolve => setTimeout(resolve, 5000));
        } while (!taskResult.solution);

        // Get solved token
        const solvedToken = taskResult.solution.data;
        console.log('Solved token:', solvedToken);

        // Get account balance
        const balance = await CaptchaBusters.getBalance(apiKey);
        console.log('Account balance:', balance);
    } catch (error) {
        console.error('Error:', error);
    }
})();
```

Replace `'YOUR_API_KEY'`, `'username:password@ip:port'`, and other placeholders with your actual credentials and configurations.

## API

### `createTask(apiKey, task)`

Creates a task for solving the selected captcha type.

- `apiKey`: Your CaptchaBusters API key.
- `task`: Task object containing details of the captcha to solve.

### `getTaskResult(apiKey, taskId)`

Retrieves the result of a task.

- `apiKey`: Your CaptchaBusters API key.
- `taskId`: ID of the task to retrieve the result for.

### `getBalance(apiKey)`

Retrieves the account balance using the provided account key.

- `apiKey`: Your CaptchaBusters API key.