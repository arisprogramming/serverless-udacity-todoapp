import 'source-map-support/register'
import {createtodo} from "../../businessLogics/Todo";
import {createtodoRequest} from '../../requests/CreatetodoRequests';
import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'





export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   
    
    console.log("Event of Processing ", event);
    const authorization = event.headers.Authorization, authSplit = authorization.split(' '),jwtToken = authSplit[1];

    const newtodo: createtodoRequest = JSON.parse(event.body),todoItem = await createtodo(newtodo, jwtToken);

    return {
        statusCode: 201, // Ce code permet de confirmer l'état de la requête comme qquelque chose de nouveau vient d'être crée
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": todoItem
        }),
    }
};
