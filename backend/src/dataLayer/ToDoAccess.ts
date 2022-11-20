import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { TodoItem } from "../models/TodoItems";
import { TodoUpdate } from "../models/TodoUpdate";
import * as AWS from "aws-sdk";
import { Types } from 'aws-sdk/clients/s3';


export class TodosAccess{
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly s3Client: Types = new AWS.S3({ signatureVersion: 'v4' }),
        private readonly todoTable = process.env.TODOS_TABLE,
        private readonly s3BucketName = process.env.S3_BUCKET_NAME) {
    }

    async getalltodo(
        userID: string):
        Promise<TodoItem[]> {
        console.log("Avoir accès à toutes les tâches requises");

        const pParameters = {
            TableName: this.todoTable,
            KeyConditionExpression: "#userID = :userID",
            ExpressionAttributeNames: {
                "#userID": "userID"
            },
            ExpressionAttributeValues: {
                ":userID": userID
            }
        };

        const output = await this.docClient.query(pParameters).promise();
        console.log(output);
        const item = output.Items;

        return item as TodoItem[];
    }

    async createtodo(
        todoItem: TodoItem): 
        Promise<TodoItem> {
        console.log("Cette fonction appelée à permis de créer une nouvelle tâche");

        const pParameters = {
            TableName: this.todoTable,
            Item: todoItem,
        };

        const output = await this.docClient.put(pParameters).promise();
        console.log(output);

        return todoItem as TodoItem;
    }

    async updatetodo(
        todoUpdate: TodoUpdate, 
        todoID: string, 
        userID: string): 
        Promise<TodoUpdate> {
        console.log("Nous mettons à jour la tâche ici ");

        const pParameters = {
            TableName: this.todoTable,
            Key: {
                "userID": userID, "todoID": todoID
            },
            UpdateExpression: "set #a = :a, #b = :b, #c = :c",
            ExpressionAttributeNames: {
                "#a": "name","#b": "dueDate","#c": "done"
            },
            ExpressionAttributeValues: {
                ":a": todoUpdate['name'],":b": todoUpdate['dueDate'], ":c": todoUpdate['done']
            },
            ReturnValues: "ALL_NEW"
        };

        const output = await this.docClient.update(pParameters).promise();
        console.log(output);
        const attributes = output.Attributes;

        return attributes as TodoUpdate;
    }
    // Cette fonction ici présente permet de supprimer une tâche donnée. Elle tient en compte 
    // l'identifiant de l'utilisateur en question, ainsi le numéro de la tâche qu'il vient de créer 
    async deletetodo(
        todoID: string, 
        userID: string): 
        Promise<string> {
        console.log("Deleting todo");

        const pParameters = {
            TableName: this.todoTable,
            Key: {
                "userID": userID,"todoID": todoID
            },
        };
    // déclaration de la sortie encore appelée output. C'est donc le résultat. La sortie que voit l'utilsateur
// C'est un résultat qui sera affiché à l'écran
        const output = await this.docClient.delete(pParameters).promise();
        console.log(output);

        return "" as string;
    }
    // Ceci est la fonction qui permet de générer un lien d'une tâche donnée. Ce lien permet d'accéder à la tâche.
    async generateuploadlink(
        todoID: string): 
        Promise<string> {
        console.log("Generating URL");

        const url = this.s3Client.getSignedUrl('putObject', {
            Bucket: this.s3BucketName,
            Key: todoID,
            Expires: 1500,
        });
        console.log(url);
// Nous avons besoin ici de retourner l'url comme une chaîne de caractère car c'est le type qui le représente le mieux.
// Nous sommes ici à la fin de l'exécution de ces lignes de codes.
        return url as string;
    }
}