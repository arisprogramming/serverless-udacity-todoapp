import { APIGatewayProxyEvent } from "aws-lambda";
import { parseuserID } from "../auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization, split = authorization.split(' '), jwtToken = split[1]
  return parseuserID(jwtToken)
}