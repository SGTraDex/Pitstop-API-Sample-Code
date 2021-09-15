import { NextFunction, Request, Response } from "express";
import { INotifyRequest, IBillofLading } from './payload_query.interface';
import { IConfig } from '../utilities/config';
import { getConfigFunc } from '../data/callToPitstop.controller';
import sampleData from './sampleData';


export async function handleNotifications(req: INotifyRequest, res: Response, next: NextFunction) {
    try {

        switch (req.notify_message) {
            // Handle notifications as required. (Notifies CONFIG_REFRESH, PUSH_SUCCESS, PUSH_FAIL, PULL_FAIL)
            case 'CONFIG_REFRESH':
                // Get the config from pitstop and update the local variable 
                const configResult: IConfig = await getConfigFunc() as IConfig;
                break;
        }

        res.json({ message: 'OK!' });
    } catch (error) {
        next();
    }
};

export async function receiveData(req: Request, res: Response, next: NextFunction) {
    try {
        // Get the dataElementId from the path parameters
        const { dataElementId } = req.params;
        // Depending on the dataElementId, handle differently.
        switch (dataElementId) {
            case 'bill_of_lading':
                const data: IBillofLading = req.body.payload;
                // You have received the bill_of_lading data from other participants.
                break;
            // ... and for any other Data Elements that you need to receive from other participants.
        }

        res.json({ message: "OK!" });
    } catch (error) {
        next();
    }
};

export async function provideData(req: Request, res: Response, next: NextFunction) {
    try {
        // Get the dataElementId from the path parameters
        const { dataElementId } = req.params;
        const query = req.body.parameters;
        let data;
        // Depending on the dataElementId, handle differently.
        switch (dataElementId) {
            case 'bill_of_lading':
                //Fetch and return bill_of_lading data.
                data = sampleData.payload as IBillofLading[];
                break;
            // ... and for any other Data Elements that you need to provide to other participants.
        }

        res.json(data);
    } catch (error) {
        next();
    }
};