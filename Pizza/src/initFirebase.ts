import * as admin from "firebase-admin";
import * as AWS from 'aws-sdk';

const serviceAcc = require('../database_secret.json');

AWS.config.getCredentials((err) => {
    if(err) console.log(err.stack);
    else{
        console.log("👉S3 Connected");
    }
})


admin.initializeApp({
    credential : admin.credential.cert(serviceAcc)
})

console.log("👉Database connected");
admin.firestore().settings({host : "http://localhost:8080", ssl : false})
const db = admin.firestore();



export default db;
