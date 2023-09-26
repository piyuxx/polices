import { DynamoDBClient } from 'aws-sdk';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client and document client
const dynamoDBClient = new DynamoDBClient({
    endpoint: 'https://8000-piyuxx-polices-76urbtswtpr.ws-us104.gitpod.io'
});
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);

// Define your DynamoDB table name
const tableName = 'MyTable';

// Lambda function to create a new item
export const handler = async (event) => {
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body);

    // Create a new item in DynamoDB
    const params = {
      TableName: tableName,
      Item: {
        id: requestBody.id,
        name: requestBody.name,
        address: requestBody.address,
        contact: requestBody.contact,
      },
    };
    await documentClient.send(new PutCommand(params));

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item created successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

