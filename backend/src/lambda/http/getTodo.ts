import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {getalltodo} from "../../businessLogics/Todo";

export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent):
     Promise<APIGatewayProxyResult> => {
    // TODO: Get all TODO items for a current user
    console.log("Processing of an Event ", event);
    const authorization = event.headers.Authorization, authSplit = authorization.split(' '), x = 1, Token = authSplit[x], todos = await getalltodo(Token);

    return {
        statusCode: 200, // permet de confirmer que la tâche est créee avec succès
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "items": todos,
        }),
    }
};
