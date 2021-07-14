import { gql } from 'apollo-server-express';
export default gql `
    type Channel{
        id: ID!
        name: String
        message:[Message]
		user: User
    }
 
    extend type Query{
        channels : [Channel] 
        channel(id: ID!): Channel
    }
	
	type DeletedInput {
		n : String
		ok: String
	}

    extend type Mutation {
        createChannel( name: String, userid: ID): Channel 
        sendMessage( messagetos: ID, channelid: ID): Channel 
		deleteChannel( channelid: ID!): DeletedInput
        
    }
`