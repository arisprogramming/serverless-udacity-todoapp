import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import 'source-map-support/register'
import {UpdatetodoRequest} from '../../requests/UpdatetodoRequests'
import {updatetodo} from "../../businessLogics/Todo"


export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent): 
    Promise<APIGatewayProxyResult> => {
   

    console.log("Processing of a new Event ", event);
    const authorization = event.headers.Authorization,  authSplit = authorization.split(' '), x = 1,Token = authSplit[x], todoId = event.pathParameters.todoId, updatedTodo: UpdatetodoRequest = JSON.parse(event.body), todoItem = await updatetodo(updatedTodo, todoId, Token);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ "item": todoItem
        }),
    }
};
