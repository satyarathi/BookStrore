import User from '../models/user.model';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';

//create new registration

export const newUser = async function (body) {
  const userExist = await User.findOne({ email: body.email });
  if (userExist == null) {
    const bcryptpassword = await bcrypt.hash(body.password, 10);
    body.password = bcryptpassword;
    const data = await User.create(body);
    return data;
  }
};

export const login = async function (body) {
  const data = await User.findOne({ email: body.email });
  console.log(data);
  if (data) {
    const checkPassword = await bcrypt.compare(body.password, data.password);
    console.log(checkPassword);
    if (checkPassword) {
      var token = jwt.sign(
        { email: data.email, id: data._id },
        process.env.TOKEN_KEY
      );
      data.token = token;
      return data;
    }
  }
};