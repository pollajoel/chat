import {gql} from 'apollo-server-express';
import userSchema from './user.schema';
import channelSchema from './channel.schema';
import messagesSchema from './messages.schema';

const linkSchema = gql `
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`
export default [linkSchema, userSchema, channelSchema, messagesSchema];