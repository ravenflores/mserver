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



// var key = fs.readFileSync('/etc/letsencrypt/live/vps-ed22af65.vps.ovh.ca/privkey.pem');
// var cert = fs.readFileSync('/etc/letsencrypt/live/vps-ed22af65.vps.ovh.ca/fullchain.pem');
// var options = {
//   key: key,
//   cert: cert
// };



export const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: ['https://mater-dei-exam-sytem.netlify.app','http://localhost:19006'],
  methods: 'GET,POST', // Allow only specific HTTP methods
};

app.use(cors(corsOptions));

if (config.USE_STREAMS) {
  app.use(
    streamsSync(parseServer, {
      apiKey: config.MORALIS_API_KEY,
      webhookUrl: config.STREAMS_WEBHOOK_URL,
    }),
  );
}

app.use(`/server`, parseServer.app);

const httpServer = http.createServer(app);
httpServer.listen(config.PORT, async () => {
  if (config.USE_STREAMS) {
    const url = await ngrok.connect(config.PORT);
    // eslint-disable-next-line no-console
    console.log(
      `Moralis Server is running on port ${config.PORT} and stream webhook url ${url}${config.STREAMS_WEBHOOK_URL}`,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`Moralis Server is running on port ${config.PORT}.`);
  }
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
