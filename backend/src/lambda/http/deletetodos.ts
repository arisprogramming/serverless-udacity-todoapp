

// Ceci est le scrpit de suppressiond des tâches
import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {deletetodo} from "../../businessLogics/Todo";



export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent): 
    Promise<APIGatewayProxyResult> => {
    
    console.log("Processing of an Event ", event);
    const authorization = event.headers.Authorization, authSplit = authorization.split(' '),Token = authSplit[1], todoId = event.pathParameters.todoId, dataDelete = await deletetodo(todoId, Token);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: dataDelete,
    }
};
