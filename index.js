import express from "express";
import {router} from "./src/route/customerRoute"
import { errorHandler } from "./src/middlewares/errorHandler";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';



const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer API',
      version: '1.0.0',
    },
  },
  apis: ['src/route/*.js'], // Path to your route files
};


const app = new express();
const PORT = 3000;

// Middleware convert to Json all the request
app.use(express.json());

app.use('/customers', router);

app.listen(PORT, ()=> {

    console.log(`Listening port ${PORT}`)
})


const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);
