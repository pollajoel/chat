import {gql} from 'apollo-server-express';

export default gql`
    type User {
        id:ID!
        name:String
        password:String
        email:String
        token:String
    }
    
    input RegisterUserInput {
        name : String!
        password : String!
        email : String!
        confirmPassword : String!
    }

    extend type Query{
        users:[User]
        user(id:ID!):User
    }
    extend type Mutation {
        user(email : String, name:String, password:String): User
        LoginUser(email : String!, password : String!): User!
        RegisterUser(useri : RegisterUserInput ): User!
		deleteUser( userid: ID!): DeletedInput
    }
`