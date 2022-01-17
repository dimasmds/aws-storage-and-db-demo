const AWS = require('aws-sdk');

const createDynamoDBClient = () => new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });

const client = createDynamoDBClient();

module.exports = client;
