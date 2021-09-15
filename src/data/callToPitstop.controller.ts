import { Request, Response } from "express";
import { IBillofLading, IBillofLadingQuery, IPushData, IPullData } from './payload_query.interface';
import sampleData from './sampleData';
import { IConfig } from '../utilities/config';
import axios from 'axios';

const PITSTOP_BASE_URL = "<YOUR_PITSTOP_BASE_URL>";
const PARTICIPANT_ID = "<PARTICIPANT_ID>"
const PARTICIPANT_NAME = "<PARTICIPANT_NAME>"

const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "Authorization": "<AUTHORIZATION - TOKEN>"
};

// Getting the configuration to see what data elements can the system provide and consume with the participant ids.

export async function getConfigFunc() {
    try {
        const response = await axios.get(`${PITSTOP_BASE_URL}/api/v1/config`, {
            headers: DEFAULT_HEADERS
        });

        // Process the config to get the data elements you have consented to provide / consume, the participants to send to, etc.
        const config: IConfig = response.data;
        return config;
    } catch (error) {
        return;
    }
}

// Push the data to other participants 
export async function pushData(req: Request, res: Response) {
    //Calling the pushDataToPitstop with the payload
    const payload: IBillofLading[] = sampleData.payload;
    const response = pushDataToPitstop({
        participants: [{
            "id": `${PARTICIPANT_ID}`, "name": `${PARTICIPANT_NAME}`
        }],
        payload, dataElementId: 'bill_of_lading'
    });
    // You will receive the response with the reques_id to reconcile later.
    res.json({});
}

export async function pushDataToPitstop(body: IPushData) {
    const result = await axios.post(`${PITSTOP_BASE_URL}/api/v1/data/push/${body.dataElementId}`, body, {
        headers: DEFAULT_HEADERS
    });


    return result;
}

// Pull the data from other recipients
export async function pullData(req: Request, res: Response) {
    // Calling the pullDataToPitstop with the query
    const query: IBillofLadingQuery = sampleData.query;
    const response = pullDataToPitstop({ participants: [{ "id": `${PARTICIPANT_ID}` }], parameters: query, dataElementId: 'bill_of_lading' });
    // You will receive the response with the requestId to reconcile later.
    res.json({});
}



export async function pullDataToPitstop(body: IPullData) {
    const result = await axios.post(`${PITSTOP_BASE_URL}/api/v1/data/pull/${body.dataElementId}`, body, {
        headers: DEFAULT_HEADERS
    });

    return result;
}



