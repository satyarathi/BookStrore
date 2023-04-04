import Customer from '../models/customer.model';


//get single customer
export const getCustomer = async (userID) => {
    const data = await Customer.findOne({userId:userID});
    return data;
  };


