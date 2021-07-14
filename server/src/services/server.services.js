import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "../apollo/resolvers";
import bodyParser from "body-parser";
import schema from "../apollo/schema";
import  cors from 'cors';
import express from 'express';
import socketIo from 'socket.io'
const PORT = 3001 || process.env.PORT;
const app = express();

app.use(cors());
app.use( bodyParser.json());
const graphQlServer = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs:schema, resolvers,
    context :({ req }) => {
        const auth = req.headers.authorization || '';
        return { auth }
    }
});

graphQlServer.applyMiddleware({ app, path: "/graphql" });
export const start = ()=>{
   const server = app.listen(PORT,err=>{
        console.log( `SERVER LISTEN AT PORT ${PORT}`);
    });

    const io = socketIo(server);
    io.on('connection', (socket)=>{
      
      console.log( socket.id);

      socket.on('join_room', (data)=>{
        socket.join(data);
        console.log("user joined room...")

      });


      socket.on('disconnect',()=>{
        console.log("USER DISCONNECTED...");
      });


    })


}




