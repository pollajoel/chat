import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState} from 'react';
import {useMutation, useQuery } from '@apollo/client';
import { CHANNELBYID, LISTALLCHANNEL} from '../grapql/query';
import ChannelForm from '../components/channelcomponent';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectChannel } from '../actions/channel.actions';
import { CREATEMESSAGE, SENDMESSAGE } from '../grapql/mutation';
import Deleted from './deletedcomponent';
import { Link } from 'react-router-dom';
import editIcon from '../static/edit.png';




const Container = styled.div `
    display: flex;
    width: 100%;
`

const Dashboard = styled.div `

    width: 15%;
    background-color: #212529;
    padding: 0 5% 0 5%;
`

const Messages = styled.div `
    height: 550px;
    background-color: #fff;
    overflow-y: ${props=>props.display>=6 ? "scroll":"hidden" };
    padding-left: 20px;
`

const Listchannel = styled.div `
    display: flex;
    flex-direction: column;
`
const ChannelButton = styled.button`
    cursor: pointer;
    background: #212529;
    color:#fff;
    border: none;
    text-align: left;
    height: 23px;
`

const Title = styled.div`
    color: #6c757d;
    text-transform: uppercase;
    margin: 40px 0px 20px -2px;
`

const DasboardContainer = styled.div ``

const MessageContain = styled.div`

        width: 100%;
        margin-bottom: 5px;
    p{
        padding: 0px;
        margin: 0px;
        font-size: 14px;
        color: #6c757d
    }
`

const MessageLayout = styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 0px 2px 10px;
    flex-wrap: wrap;

`

const FormLayout = styled.div `
    border: 1px solid #dee2e6;
    background-color: #dee2e6;
    margin-left: -9px;
    padding: 18px;
`

const InputTextarea = styled.textarea `
    color: #8f8f8f;
    opacity: 0.5;
    height: 28px;
    resize: none;
    border: 0px;
    &:focus{
        outline: none;
    }
`
const ArrayLayout = styled.div `
    background-color: #fff;
    border: 1px solid #dee2e6;
    padding: 5px;
`

const ChatForm = styled.form`
    display: flex;
`

const Submitbutton = styled.input `
    border: 0px;
    width: 100px;
    font-size: 16px;
    font-weight: lighter;
    cursor: pointer;
`
const ActiveChannel = styled.div`
    margin-bottom: 13px;
    font-size: 16px;
    font-weight: bold;
`

const AddChannelButton = styled.button `
    border: none;
    color:#fff;
    background-color: #212529;
    font-weight: bolder;
    font-size: 17px;
    cursor: pointer;
`

const ChannelBlockLayout = styled.div `
    display: flex;
    flex-wrap: wrap;
`

const Loader = styled.p `
    color: #fff;
`

const DashboardMenu = styled.ul`
    width: 100%;
    position: absolute;
    top: -13px;
    left: 3px;
    color:#fff;
    list-style:none;
    cursor:pointer;
    font-size: medium;
    font-weight: lighter;
    a{
        text-decoration: none;
        color: #000;
    }
    li{
        ul{ 
            display:none;
            color: #000;
            background-color: #fff;
            width: 200px;
            padding: 10px 0px 10px 0px;
        }
        &:hover{
           ul{
               display: block;
           }
        }
    }
    li:first-child{
        display:block;
    }
`
const IconButton = styled.button `
 background-color: #212529;
 border: none;
 border: 1px solid;
 border-radius: 1px;
 cursor: pointer;
 margin-right: 7px;

`


const Chatboot = () =>{

    
    // Selected channel data..

    const currentChannel = useSelector(state=>state.channel)
    const currentUser = useSelector(state=>state.user)
    const Dispatch = useDispatch();



    const { loading, data } = useQuery(LISTALLCHANNEL);
    const [displayvalue, Setdisplayvalue] = useState(false);

    
    const getChById = useQuery(CHANNELBYID, 
        {
            variables:{id:currentChannel.id}
        }
        );
  
    //messages fields
    const [messaformState, setmessageForm] = useState({
        contain:""
    });

    const [addmessage] =useMutation(CREATEMESSAGE,{ errorPolicy: 'all' });
    const [sendmessagetochat] =useMutation(SENDMESSAGE,{ errorPolicy: 'all' });
    


    useEffect(()=>{

        if( data!== undefined ){
            SetChannelState(data.channels);
            setActiveChannel(data.channels[0]);
            setMessages(data?.channels[0].message);
           

            //set current channel to first element of tab
            Dispatch(setSelectChannel(data?.channels[0].id));
            //console.log(currentChannel);
        }
        
    },[data, Dispatch])

    const [ChannelState, SetChannelState] = useState([
]);
    const [activeChannelState, setActiveChannel] = useState({});
    const [ messagesState, setMessages] = useState([]);
    const val = 100;


    // function to selected channel
    const SelectChannel = (e, channelobject)=>{
        

        e.preventDefault();
        Dispatch(setSelectChannel(channelobject.id));
        //getChById.refetch({variables:{id:channelobject.id}});
        setActiveChannel(channelobject);
        setMessages(channelobject.message);

    }

    // function to redirect on page to add new channel

    const AddNewchannel = (e)=>{

        if(displayvalue)
        Setdisplayvalue(false)
        else
        Setdisplayvalue(true);

    }

    const SendMessage = async(e)=>{
        e.preventDefault();
        
        //messagesState, setMessages
        const result = await addmessage({variables:{contain:messaformState.contain,userid:currentUser.id}})

       if( result)
       {
           
           let data = result.data.createMessage;
           let messageId = data.id;
           const messagesenddata = await sendmessagetochat({variables:{messagetos:messageId ,channelid:currentChannel.id}});
           
           const messageNew = [...messagesState];
           messageNew.push( data ) 
           setMessages( messageNew )
           
          
          
       }

        e.target.reset();
    }



    return(
        <Container>
            <Dashboard>
                <DasboardContainer>
                    <ChannelBlockLayout>
                        <DashboardMenu>
                            <li>+ Paramètres
                                <ul>
                                <li><Link to ="/users">+ Gestion des utilisateurs</Link></li>
                                </ul>
                            </li>
                        </DashboardMenu>
                        <Title>Canaux 
                        <AddChannelButton onClick={(e)=>AddNewchannel(e)}>+</AddChannelButton>
                        {

                        !loading?(<ChannelForm name="" disp={displayvalue} Setdisplayvalue ={Setdisplayvalue} currentuser={currentUser.id}
                         setdata ={SetChannelState} datastate = {ChannelState}
                        ></ChannelForm>):(<div></div>)
                       
                       }
                        </Title>
                    </ChannelBlockLayout>
                     {
                        loading ?(<Loader>Is loading ...</Loader>):
                         (<Listchannel>{ ChannelState.map(channel =><ChannelButton key={channel.id} value={channel.name} onClick={(e)=>SelectChannel(e,channel)}>#{channel.name}
                         <Deleted data={channel} deleteType="CHANNELDELETE"
                         setdata ={SetChannelState} datastate = {ChannelState}
                         ></Deleted>
                         </ChannelButton>)}</Listchannel>)
                    }
                </DasboardContainer>
            </Dashboard>
            <MessageLayout>
                


                <ActiveChannel>{ activeChannelState.name}</ActiveChannel>
            <Messages display={val}>
              {
            getChById.loading?(<div>Is loading...</div>):(<div>
                { 
                  
                    messagesState.map(msg=><MessageContain key={msg.id}>
                    Arthur 
                    <p>{msg.contain}</p><br></br>
                    <Deleted data={msg} deleteType="MSGDELETE"
                         setdata ={setMessages} datastate = {messagesState}
                         ></Deleted>


                    <IconButton><img src={editIcon}/></IconButton>
                
                
                </MessageContain>)
                }</div>)
                    }
            
            </Messages>


            <FormLayout>
                <ChatForm onSubmit={(e)=>SendMessage(e)}>
                    <ArrayLayout> 
                        <InputTextarea placeholder="Ecrivez quelque chose ..." 
                         cols={val} onChange = {(e)=>setmessageForm({...messaformState,contain:e.target.value})}
                        ></InputTextarea>
                    </ArrayLayout>
                        <Submitbutton type="submit" value="Envoyer"></Submitbutton>
                    
                </ChatForm>
            </FormLayout>
            </MessageLayout>
            
        </Container>
    )
}


export default Chatboot;



