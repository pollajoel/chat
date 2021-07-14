import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "../apollo/resolvers";
import bodyParser from "body-parser";
import schema from "../apollo/schema";
import  cors from 'cors';
import express from 'express';
const PORT = 3000 || process.env.PORT;

const app = express();
app.use(cors());
app.use( bodyParser.json());
const graphQlServer = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs:schema,
    resolvers
});

graphQlServer.applyMiddleware({ app, path: "/graphql" });
export const start = ()=>{
    app.listen(PORT,err=>{
        console.log( `SERVER LISTEN AT PORT ${PORT}`);
    })
}



