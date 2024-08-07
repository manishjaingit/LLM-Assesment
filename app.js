import express from "express";
import http from "http";
import './db.js';
import { errorHandler, notFoundError } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
const server = http.createServer(app);
const port = 3000

import router from './route.js';


app.use('/app', router);

//Not found handler
app.use('*', notFoundError);

// Global Error Handler
app.use(errorHandler);


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});