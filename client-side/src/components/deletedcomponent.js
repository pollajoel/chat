import React from 'react';
import deleteIcon from '../static/delete.png';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { DELETECHANNEL, DELETEMSG, DELETEUSER } from '../grapql/mutation';

const Icon = styled.img `
    margin-left: 6px;
    cursor: pointer;
`

const Deleted = (props) =>{
    const [DeletedChannel] = useMutation(DELETECHANNEL,{ errorPolicy: 'all' });
    const [DeletedUser] = useMutation(DELETEUSER,{ errorPolicy: 'all' });
    const [DeletedMessageById] = useMutation(DELETEMSG,{ errorPolicy: 'all' });
    const deletedMessage = async(e)=>{
        
        e.preventDefault();
        const id = props.data.id;
        const arrayNew = props.datastate.filter(ch=>ch.id!==props.data.id);
        props.setdata( arrayNew );

        switch (props.deleteType) {
            case "CHANNELDELETE":
                try{
                    const deletedData = await DeletedChannel({variables:{
                        channelid: id
                    }
                });

                return deletedData;

                }catch(error){}

                break;
                
            case "USERDELETE":
                {
                try{
                    const deletedData = await DeletedUser({variables:{
                        userid: id
                    }});
                    return deletedData;
                }catch(error){}
                break;
            }
            case "MSGDELETE":
                try{
                    const deletedData = await DeletedMessageById({variables:{
                        msgId: id
                    }});
                    return deletedData;
                }catch(error){}
            break;
            

            default: break;
        }


    }
    return(
        <Icon src={deleteIcon} onClick={(e)=>deletedMessage(e)}></Icon>
    )
}

export default Deleted;