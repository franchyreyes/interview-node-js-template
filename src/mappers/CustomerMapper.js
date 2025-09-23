export const mapToCustomer = (customer) => ({
    name: customer.name,
    age: customer.age,
    email: customer.email
  });

export const maptoListCustomer = (customers) => {
  return customers.map(mapToCustomer)
}