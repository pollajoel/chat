import jwt from 'jsonwebtoken';
import { AuthenticationError} from 'apollo-server'
import {SECRET} from '../../config'

export const getUser = async (token) => {
    if (!token) throw new AuthenticationError('you must be logged in!'); 
    const user = jwt.verify(token, SECRET, (err, decoded) => {
      if (err) throw new AuthenticationError('invalid token!');
      return decoded;
    });
    return user;
  };