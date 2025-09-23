export const customerDomainLogic = {

     validAge(customer) {
        return customer.age >= 18;
     },

     validName(customer) {
        return customer.name.length >= 3;
     },

     validateActiveCustomer(customer){
         return {
                  ...customer,
                  active: customer.active ?? true
               };
     }

};