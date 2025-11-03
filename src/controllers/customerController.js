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
  },

  // get a single customer by id
  
  async getById(req, res, next) {
    try {
      const customer = await customerService.getCustomerById(req.params.id);
      const customerDTO = mapToCustomer(customer)
      const response = apiResponse(true,"custumer by id successfull", customerDTO)
      res.status(codeStatus.SUCCESSFULL).json(response);
    } catch (error) {
      next(error);
    }
  },
  
  // delete a customer by id
  async deleteById(req, res, next) {
    try {
      const deletedCustomer = await customerService.deleteCustomerById(req.params.id);
      const customerDTO = mapToCustomer(deletedCustomer)
      const response = apiResponse(true,"deleted custumer successfull", customerDTO)
      res.status(codeStatus.DELETE_SUCCESSFULL).json(response);
    } catch (error) {
      next(error);
    }
  }
};

export default customerController;