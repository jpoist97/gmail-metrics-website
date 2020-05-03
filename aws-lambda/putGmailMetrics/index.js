'use strict'
const AWS = require('aws-sdk');
const fs = require('fs');
const {google} = require('googleapis');

AWS.config.update({ region: 'us-west-1' });

const TOKEN_PATH = 'token.json';
const USER_EMAIL = 'jpoist97@gmail.com';
const GMAIL_TAG = 'gmail.com';

exports.handler = async (event, context) => {

    // Load client secrets from a local file.
    let credentials = fs.readFileSync(__dirname + '/credentials.json');
    let client = authorize(JSON.parse(credentials));
    
    // get the metrics from the past hour
    let metrics = await getMetrics(client);

    // store those metrics to the DynamoDB
    await storeMetrics(metrics);
}

async function storeMetrics(metrics){
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-1' });

    let today = new Date();
    // populate the data we want to put in Dynamo here
    const params = {
        TableName: 'gmail-metrics',
        Item:{
            'Date': `${ today.getUTCFullYear() }-${ today.getUTCMonth() }-${ today.getUTCDate() }`,
            'Hour': today.getUTCHours(),
            'from-gmail': metrics.fromGmail,
            'to-gmail': metrics.toGmail,
            'from-other': metrics.fromOther,
            'to-other': metrics.toOther
        }
    }

    // puts param into Dynamo
    try{
        await documentClient.put(params).promise();
    }catch (err){
        console.log(err);
    }
}

function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Load previously generated token
    let cred = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(cred));
    return oAuth2Client;
}

async function getMetrics(auth) {
    const gmail = google.gmail({version: 'v1', auth});

    // determine the current time in UTC for comparisons
    let currentTS = Math.trunc(Date.now()/1000);
    let lastTS = currentTS - (3600);

    // get all of the emails from the past hour
    let responsePromise = gmail.users.messages.list({
        'userId': USER_EMAIL,
        'q': `after:${ lastTS } before:${ currentTS }`
    });
    let response = await responsePromise;
    let messages = response.data.messages;

    let metrics = {
        fromGmail:0,
        toGmail:0,
        fromOther:0,
        toOther:0
    };

    // if there aren't any new emails return metrics right away
    if(messages === undefined){
        return metrics;
    }

    // loop through emails and and compute metrics
    for(let i = 0; i < messages.length; i++){
        // first get the message itself
        let msg = await gmail.users.messages.get({
            'userId': USER_EMAIL,
            'id': messages[i].id
        });

        // then get the header to check the date
        let header = msg.data.payload.headers;
        let sender = '';
        let receiver = '';

        for(let j = 0; j < header.length; j++){
            // check if from a gmail account
            if(header[j].name === 'From'){
                sender = header[j].value.substring(header[j].value.indexOf('<') + 1, header[j].value.length - 1);
            }
            else if(header[j].name === 'To'){
                receiver = header[j].value.substring(header[j].value.indexOf('<') + 1, header[j].value.length - 1);
            }
        }


        if(sender === USER_EMAIL){
            if(receiver.split('@')[1] === GMAIL_TAG){
                metrics.toGmail += 1;
            }
            else{
                metrics.toOther += 1;
            }
        }else{
            if(sender.split('@')[1] === GMAIL_TAG){
                metrics.fromGmail += 1;
            }
            else{
                metrics.fromOther += 1;
            }
        }

    }
    
    return metrics;
}

