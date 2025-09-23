import customerRepository from '../repository/customerRepository';
import {customerDomainLogic} from '../models/customerModel'

const customerService = {
  async getAllCustomers() {
    const customers = await customerRepository.getAll();
    // Aquí podrías aplicar lógica como filtrar, ordenar, etc.
    return customers;
  },

  async getCustomerAdults() {
    const customers = await customerRepository.getAll();  
    return customers.filter(customerDomainLogic.validAge);
  },

  async createCustomer(data) {
    // Validaciones básicas
    if (!customerDomainLogic.validName(data)) {
      throw new Error('Name must be >= 3 required');
    }

    if (!customerDomainLogic.validAge(data)) {
      throw new Error('Age must be >=18 required');
    }
    // Lógica de negocio: por ejemplo, activar por defecto
    const customer = customerDomainLogic.validateActiveCustomer(data)

    return await customerRepository.create(customer);
  }
};

export default customerService;