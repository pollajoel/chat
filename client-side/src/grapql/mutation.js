import { gql } from '@apollo/client';

// mutation to create new channel.
export const CREATECHANNEL = gql`
  mutation createChannel($name:String, $userid: ID){
      createChannel(name:$name, userid:$userid){id,
        name,message{id,contain}
      }
  }
`;

export const CREATEMESSAGE = gql`
mutation createMessage($contain:String, $userid:ID)
    {
      createMessage(contain:$contain,userid:$userid){id,contain,user{name}}
    }

`
export const SENDMESSAGE = gql `
mutation sendMessage($messagetos:ID,$channelid:ID)
{
  sendMessage(messagetos:$messagetos, channelid: $channelid){
    id,name,user{name}
  }
}
`
export const REGISTERUSER = gql`
 mutation RegisterUser($useri: RegisterUserInput){
    RegisterUser(useri: $useri){token}
  }
`

export const LOGINUSER = gql`
  mutation LoginUser($email:String! ,$password: String!)
  {
    LoginUser(email:$email, password:$password){token}
  }
`

export const DELETECHANNEL = gql`
mutation deleteChannel( $channelid:ID!){
  deleteChannel(channelid: $channelid){n, ok}
}
`

export const DELETEUSER = gql`
mutation deleteUser( $userid:ID!){
  deleteUser(userid: $userid){n, ok}
}
`

export const DELETEMSG = gql`
mutation deleteMessage( $msgId:ID!){
  deleteMessage(msgId: $msgId){n, ok}
}
`