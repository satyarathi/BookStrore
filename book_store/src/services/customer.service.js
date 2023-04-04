import Customer from '../models/customer.model';

  //get single customer
  export const getCustomerDetails = async (userId) => {
    const data = await Customer.find({userId:userId});
    return data;
  };

  export const addDetails = async (body, userId) => {
    let data = await Customer.findOne({userId: userId})
    if(!data){
      data = await Customer.create({
        userId: body.userId,
        address: [{
          fullName: body.fullName,
          phoneNumber: body.phoneNumber,
          type: body.type,
          address: body.address,
          pinCode: body.pinCode,
          city: body.city,
          state: body.state,
        }]
      });
      return data;
    }
    let newCustomer;
    if(body.addressId >= 0){
      const updateExistingDetails = {};
      updateExistingDetails[`address.${body.addressIdx}.fullName`] = body.fullName;
    updateExistingDetails[`address.${body.addressIdx}.phoneNumber`] = body.phoneNumber;
    updateExistingDetails[`address.${body.addressIdx}.type`] = body.type;
    updateExistingDetails[`address.${body.addressIdx}.address`] = body.address;
    updateExistingDetails[`address.${body.addressIdx}.pinCode`] = body.pinCode;
    updateExistingDetails[`address.${body.addressIdx}.city`] = body.city;
    updateExistingDetails[`address.${body.addressIdx}.state`] = body.state;


      newCustomer = await Customer.findByIdAndUpdate( { _id: data._id }, {
          $set: updateExistingDetails
        });
    }else{
      newCustomer = await Customer.findByIdAndUpdate({_id: data._id},{
          $push: {
            address: {
              fullName: body.fullName,
              phoneNumber: body.phoneNumber,
              type: body.type,
              address: body.address, 
              pinCode: body.pinCode,
              city: body.city,
              state: body.state,
            }
          }
        }
      );
    }
    return newCustomer;
  };


