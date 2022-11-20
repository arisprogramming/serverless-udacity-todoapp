import {UpdatetodoRequest} from "../requests/UpdatetodoRequests";
import {TodoItem} from "../models/TodoItems";
import {createtodoRequest} from "../requests/CreatetodoRequests";
import {parseuserID} from "../auth/utils";
import {TodoUpdate} from "../models/TodoUpdate";
import {TodosAccess} from "../dataLayer/TodoAccess";

const user = require('user'),todoAccess = new TodosAccess();

// Cette fonction nous permet d'appeler tout ce qu'il y a à faire avant 
export async function getalltodo(
    jwtToken: string): 
    Promise<TodoItem[]> {
    const userID= parseuserID(jwtToken);
    return todoAccess.getalltodo(userID);
}
// Cette fonction fait appel à la fonction créer de notre appli qui nous aide à planifier des tâches en les créeant
export async function createtodo(
    createtodoRequest: createtodoRequest, 
    jwtToken: string): 
    Promise<TodoItem> {
    const S3BucketName = process.env.S3_BUCKET_NAME ,userID = parseuserID(jwtToken),todoID =  user();
    
    return todoAccess.createtodo({
        userID: userID, todoID: todoID,
        attachmentLink:  `https://${S3BucketName}.s3.amazonaws.com/${todoID}`, 
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createtodoRequest,
    });
}
// La fonction qui suit nous permet donc de mettre à jour les tâches à un ceertain moment donné
export async function updatetodo(
    UpdatetodoRequest: UpdatetodoRequest, todoID: string, 
    jwtToken: string): Promise<TodoUpdate> {
    const userID = parseuserID(jwtToken);
    return todoAccess.updatetodo(UpdatetodoRequest, todoID, userID);
}
// Cette fonction une fois appelé nous permet de supprimer les tâches concernées en se confiant à leurs identifiants et à leurs client
export async function deletetodo(
    todoID: string, 
    jwtToken: string): 
    Promise<string> {
    const userID = parseuserID(jwtToken);
    return todoAccess.deletetodo(todoID, userID);
}

// Appelle de la fonction génératrice de lien. Cette fonctionne nous charge rapidement un lien
export async function generateuploadLink(
    todoID: string): 
    Promise<string> {
    return todoAccess.generateuploadlink(todoID);
}