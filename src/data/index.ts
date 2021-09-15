import express, { Router } from 'express';
const router: Router = express.Router();
import { handleNotifications, receiveData, provideData, } from './callFromPitstop.controller';

// Simple endpoint for Pitstop to do a healthcheck for your system. Simply return a 200 OK.)
// Call From Pitstop
router.get('/health', async (req, res) => res.json({ message: 'OK!' }));

// Endpoint to handle notifications from the pitstop.
// Call From Pitstop
router.post('/notify', handleNotifications);

// This endpoint to create is to receive a push request for a data element that you are consuming from another participant.
// Call From Pitstop
router.post('/data/receive/:dataElementId', receiveData);

// This endpoint to create is to provide a pull of a data element that you are producing for another participant.
// Call To Pitstop
router.post('/data/provide/:dataElementId', provideData);


export default router;