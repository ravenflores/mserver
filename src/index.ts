import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import config from './config';
import { parseServer } from './parseServer';
// @ts-ignore
import ParseServer from 'parse-server';
import http from 'http';
import https from 'https';
import ngrok from 'ngrok';
import { streamsSync } from '@moralisweb3/parse-server';
import fs from 'fs';



// // Load SSL certificate and private key
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/vps-076307fc.vps.ovh.ca/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/vps-076307fc.vps.ovh.ca/fullchain.pem', 'utf8');





export const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

// const corsOptions = {
//   origin: ['https://mater-dei-exam-sytem.netlify.app'],
//   methods: 'GET,POST', // Allow only specific HTTP methods
// };


// app.use(cors(corsOptions));

const allowedOrigins = ['https://mater-dei-exam-sytem.netlify.app']

app.use(cors({
  origin: allowedOrigins,
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(`/server`, parseServer.app);

// const httpServer = https.createServer({
//       key: privateKey,
//       cert: certificate
//   },app);
const httpServer = http.createServer({},app);
httpServer.listen(config.PORT, async () => {
  console.log(`Moralis Server is running on port ${config.PORT}.`);
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
