import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CREATECHANNEL } from '../grapql/mutation';
import { useMutation} from '@apollo/client';



const ChannelFor = styled.div `
   visibility:${props=>props.disp ? "visible" : "hidden" };
   text-transform: lowercase;
   
    `
const MessageLayout = styled.div `
    color: red;
`


const ChannelForm = (props) =>{

    const [formState, SetformState] = useState({channelName:""});
    const [messageState,  SetMessagestate] = useState("");
    const [ErrormessageState,  SetErrorMessagestate] = useState("");

    const [addChannel,{ loading: mutationLoading, error: mutationError },data] = useMutation(CREATECHANNEL,{ errorPolicy: 'all' });

    const Submitform = async(e)=> {
        e.preventDefault();
       
       if(formState.channelName.length > 0 ){
                const result = await addChannel({variables:{name:formState.channelName,userid:props.currentuser}})
            if(mutationError)
                SetErrorMessagestate("canal existant...");
             else{
                SetMessagestate("Canal ajouté...");
                SetErrorMessagestate("");

                const Newarray = [...props.datastate];
                Newarray.push(result.data.createChannel);
                props.setdata(Newarray);
               
                
                e.target.reset();
             }               
       }else
            SetErrorMessagestate("Champs vides obligatoire...");
    }

    useEffect(()=>{
        //props.setdata(data);
    },[formState, data]);
 
    return(
        <ChannelFor disp = {props.disp}>
            <form onSubmit={(e)=>Submitform(e)}>
                <input type="text" placeholder="nouveau canal" 
                    onChange ={(e)=>{
                        SetMessagestate("");
                        SetErrorMessagestate("");
                        SetformState({...formState,channelName:e.target.value})}}
                />
                
                {
                    mutationError?(<MessageLayout>{ErrormessageState}</MessageLayout>):(<MessageLayout>{messageState}</MessageLayout>)
                }
                <MessageLayout>
                {mutationLoading && <p>Ajout en cours...</p>}
                </MessageLayout>
            </form>
        </ChannelFor>
    )

}

export default ChannelForm;