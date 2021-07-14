import { gql } from '@apollo/client';

 export const LISTALLCHANNEL =  gql `
    query{channels{name,id,message{id,contain}}}
    `

    export const CHANNELBYID = gql`
      query channel($id: ID!){
         channel(id:$id){id,name,message{id,contain,user{name,id}}}
      }

    `

    export const ALLUSERS = gql `
      query {users{id,name,password, email}}
    `