import customerService from '../services/customerService'
import {apiResponse} from '../utils/apiResponse'
import {mapToCustomer, maptoListCustomer} from '../mappers/CustomerMapper'
import {codeStatus} from '../config/codeStatus'

const customerController = {
  async getAll(req, res, next) {
    try {
      const customers = await customerService.getAllCustomers();
      const customersDTO = maptoListCustomer(customers)
      const response = apiResponse(true,"custumer successfull", customersDTO)
      res.status(codeStatus.SUCCESSFULL).json(response);
    } catch (error) {
      next(error);
    }
  },

  async getCustomerAdults(req, res, next) {
    try {
      const customers = await customerService.getCustomerAdults();
      const customersDTO = maptoListCustomer(customers)
      const response = apiResponse(true,"custumer adults successfull", customersDTO)
      res.status(codeStatus.SUCCESSFULL).json(response);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const newCustomer = await customerService.createCustomer(req.body);
      const customersDTO = mapToCustomer(newCustomer)
      const response = apiResponse(true,"new added custumer successfull", customersDTO)
      res.status(codeStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }
};

export default customerController;