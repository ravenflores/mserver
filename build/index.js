"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const moralis_1 = __importDefault(require("moralis"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const parseServer_1 = require("./parseServer");
// @ts-ignore
const parse_server_1 = __importDefault(require("parse-server"));
const http_1 = __importDefault(require("http"));
// // Load SSL certificate and private key
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/vps-076307fc.vps.ovh.ca/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/vps-076307fc.vps.ovh.ca/fullchain.pem', 'utf8');
exports.app = (0, express_1.default)();
moralis_1.default.start({
    apiKey: config_1.default.MORALIS_API_KEY,
});
// const corsOptions = {
//   origin: ['https://mater-dei-exam-sytem.netlify.app'],
//   methods: 'GET,POST', // Allow only specific HTTP methods
// };
// app.use(cors(corsOptions));
const allowedOrigins = ['https://mater-dei-exam-sytem.netlify.app', "http://localhost:19006"];
exports.app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: 'GET,POST',
}));
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use(`/server`, parseServer_1.parseServer.app);
// const httpServer = https.createServer({
//       key: privateKey,
//       cert: certificate
//   },app);
const httpServer = http_1.default.createServer({}, exports.app);
httpServer.listen(config_1.default.PORT, async () => {
    console.log(`Moralis Server is running on port ${config_1.default.PORT}.`);
});
// This will enable the Live Query real-time server
parse_server_1.default.createLiveQueryServer(httpServer);
//# sourceMappingURL=index.js.map