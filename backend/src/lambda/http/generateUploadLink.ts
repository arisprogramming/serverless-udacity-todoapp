import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import {generateuploadLink} from "../../businessLogics/Todo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("Processing of an Event ", event);
    const todoId = event.pathParameters.todoId, URL = await generateuploadLink(todoId);

    return {
        statusCode: 202, // Ce code permet de confirmer qu'un lien de nouveau s'est généré.
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            uploadUrl: URL,
        })
    };
};