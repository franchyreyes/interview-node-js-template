
const express = require('express');
import customerController from '../controllers/customerController'
import { validateCustomer, handleValidation } from '../middlewares/customerValidator';

const router = express.Router();


/**
 * @openapi
 * /customers:
 *   get:
 *     summary: Retrieve all customers
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: integer
 *         email:
 *           type: string
 *         active:
 *          type: boolean
 */
router.get('/', customerController.getAll);

/**
 * @openapi
 * /customers/adults:
 *   get:
 *     summary: Retrieve all adults customers
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: A list of adults customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: integer
 *         email:
 *           type: string
 *         active:
 *          type: boolean
 */
router.get('/adults/', customerController.getCustomerAdults);
/**
 * @openapi
 * /customers:
 *   post:
 *     summary: Save a customer
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Save a customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: integer
 *         email:
 *           type: string
 *         active:
 *           type: boolean
 */
router.post('/', validateCustomer, handleValidation, customerController.create);


export { router }