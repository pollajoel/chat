import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALLUSERS } from '../grapql/query';
import Deleted from './deletedcomponent';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Userlayout =  styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    border: 1px solid #000;
    padding: 40px;
    flex-wrap: wrap;
`

const TitleContainer = styled.div `

    display: flex;
    width: 100%;
    div{
        width: 35%;
    }
`

const Container = styled.div `
    width: 100%;
    padding: 25px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    font-weight: lighter;
`

const BackHome = styled.div `
    width: 100%;
    a{
        text-decoration: none;
        color: #000;
    }

`




const UserComponent = ()=>{

    const { loading, data } = useQuery(ALLUSERS);
    const[datastate, setdata] = useState([]);
    useEffect(()=>{
        if( !loading ){ setdata( data.users ); }
    },[data, loading])
   

    return(<Container>
        {
            loading?(<div>Is Loading...</div>):
            (<Userlayout>
                <TitleContainer>
                    <div><b>Nom</b></div>
                    <div><b>email</b></div>
                    <div><b>supprimer</b></div>
                </TitleContainer>
              {
                  datastate.map( user => <TitleContainer key={user.id}>
                     <div>{user.name}</div>
                     <div>{user.email}</div>
                      <div>
                        <Deleted  datastate = {datastate} setdata={setdata}deleteType="USERDELETE" id={user.id} data={user}></Deleted>
                     </div>
                  </TitleContainer>)
              }
              
            </Userlayout>)
        }

        <BackHome><Link to="/">Retour à l'accueil</Link></BackHome>

    </Container>)
}

export default UserComponent;