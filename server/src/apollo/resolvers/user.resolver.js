import userModel from "../../models/user.model";
import  jwt  from "jsonwebtoken";
import { ValidationError} from "apollo-server-errors";
import bcrypt from 'bcrypt'
import {SECRET} from '../../config'
import { UserInputError, AuthenticationError} from 'apollo-server'
import { getUser } from "../security/auth.security";
import validateUser from "../../middleware/validators/user.validation"



const getToken = ({ id, username, email }) => jwt.sign({id,username,email},SECRET,{ expiresIn: '1d' });
const validateLogin =(name, password) => {
    return name!== null && password!==null ? true : false;
}

class Usermatch {
    constructor(id,{email, name, password}){
        this.id    = id;
        this.email = email;
        this.name  = name;
        this.password = password;
    }
}


export default {
    Query:{
        users : async(_, args, context) => {
           
            //const user = await getUser(context.auth);
            //if( user ) 
                return userModel.find({}); 
        },
        user : (parent, args) =>{
			
            const id = args.id;
            return userModel.findById(id);
        }
    },

    Mutation:{
        user: (_, args,context) => {
			
            const userNew = new userModel({
                name: args.name,
                password: args.password,
                email: args.password
            });

            return userNew.save();
        },

        async LoginUser(parents,args){
            const valid = validateLogin(args.email, args.password);
			const validation = validateUser({email:args.email, password:args.password});
			
              if (!valid) throw new UserInputError('Error', { errors });
			  if( validation.error){
				  const errorMessage = validation.error.details[0].message ;
				  throw new AuthenticationError(errorMessage);
			  }

                    const user = await userModel.findOne({ email:args.email });
                    if (!user) throw new AuthenticationError('this user is not found!');
                    

                    const match = bcrypt.compareSync(args.password, user.password);
                    console.log( args.password + match + user.password + " " + match);
                    
                    if (!match) throw new AuthenticationError('wrong password!');
                    const token = getToken(user); 
                    return {
                        id: user._id, // set an id
                        ...user._doc, // spread the user info (email, created at, etc)
                        token
                      };
                
        },
		
		deleteUser: async(_, args) => {
			const userid =  args.userid;
			try{
				const data =  await userModel.deleteOne({_id:userid});
				//return data
			}catch(error){
				
			}
		},
		
        RegisterUser : async(parents,args)=> {
            
            const userParams =  args.useri ;
            const user = await userModel.findOne({ email:userParams.email });
			const validation = validateUser({email:userParams.email, password:userParams.password,confirmPassword:userParams.confirmPassword});
			
			
			if( validation.error){
				  const errorMessage = validation.error.details[0].message ;
				  throw new AuthenticationError(errorMessage);
			  }
			
			
            if (user) throw new ValidationError('Adresse email déjà utilisée...!');
           
            const salt = bcrypt.genSaltSync(10);
            const passwordcrypt = bcrypt.hashSync(userParams.password,salt);
            
            const newUser = new userModel({
                name:userParams.name,
                password:passwordcrypt,
                email:userParams.email,
              created: new Date().toISOString()
            });
            const res = await newUser.save();
            const token = getToken(res);
                
            return {
              id:res._id,
              token:token,
              ...res._doc
            };
          }
    }



}