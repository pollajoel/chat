import {gql} from 'apollo-server-express';

export default gql`
    type Message {
        id:ID!
        contain:String
        user: User
    }
    extend type Query{
        messages:[Message]
        message(id:ID!):Message
        }
    extend type Mutation {
        createMessage(contain: String, userid: ID): Message
		deleteMessage( msgId: ID!): DeletedInput
    } 
`