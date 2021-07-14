import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTERUSER } from '../grapql/mutation';

const Loginlayout = styled.div `
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 600px;
    font-weight: lighter;
    a{
        text-decoration: none;
        color:#000;
    }
`

const LoginContainer = styled.div `
    width: 60%;
    display: flex;
    justify-content: center;
    border: 1px solid  #ebedef ;
    padding-top: 70px;
    padding-bottom: 70px;
    border-radius: 10px;
`

const Loginform = styled.form `
`

const Forminput = styled.input`
    width: 400px;
    height: 36px;
    margin-bottom: 10px;
    &:focus{
        outline: none;
    }
`

const Title = styled.div `

    margin-bottom: 10px;
    h1{
        font-size: 21px;
    }
`

const FormLayout = styled.div `

    padding: 8px 5px 1px 5px;
    border: 1px solid   #ebedef ;
    margin-bottom: 10px;
    border-radius: 10px;
    input{
        border: none;
    }

`
const ButtonSubmit = styled(FormLayout) `
    background-color:  #5dade2 ;
    border-color:  #5dade2 ;
    text-align: center;
    input{
        cursor:pointer;
        background-color: #5dade2 ;
        color: #fff;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: lighter;
    };
`


const ErrorMessage = styled.div `
    color: red;
`





const RegisterComponent = ()=>{


    
    const [formState, Setformstate] = useState({
        login: "",
        password: "",
        email: "",
        confirmPassword: ""
    });
    const [Register] = useMutation(REGISTERUSER,{ errorPolicy: 'all' });
    const [error, setError] = useState({});
    const Login = async(e)=>{

        e.preventDefault();
        const registerdata = await Register({variables:{
            useri:{
                name: formState.login,
                email: formState.email,
                password: formState.password,
                confirmPassword: formState.confirmPassword
            }
        }});

        //console.log( registerdata.errors[0] );
        if( registerdata.errors !== undefined)
        {
            setError({...registerdata.errors[0]} );
            
        }else{
            setError({...error, message:"Utisateur enregistré..."});
            e.target.reset();
        }
            

        //history.push("/home") 
        //alert( "hello to you ........")

    }


    return(
        <Loginlayout>
            <LoginContainer>
           <Loginform onSubmit ={ (e)=>Login(e)}>
               <Title><h1>Inscription </h1></Title>
               <FormLayout>
                   <Forminput type="text" placeholder="Nom et prenom(s)" onChange={(e)=> Setformstate({...formState,login:e.target.value})}></Forminput>
               </FormLayout>
               <FormLayout>
                   <Forminput type="text" placeholder="email" onChange={(e)=> Setformstate({...formState,email:e.target.value})}></Forminput>
               </FormLayout>
               <FormLayout>
                   <Forminput type="password" placeholder="mot de passe" onChange={(e) => Setformstate({...formState, password:e.target.value})}/>
               </FormLayout>
               <FormLayout>
                   <Forminput type="password" placeholder="Confirmer le mot de passe" onChange={(e) => Setformstate({...formState, confirmPassword:e.target.value})}/>
               </FormLayout>
               <ButtonSubmit>
                   <Forminput type="submit" value="Enregistrer mes informations"/>
               </ButtonSubmit>
               <ErrorMessage>{ error.message}</ErrorMessage>
               <div>
                   <Link to="/">Retour à la page de connexion</Link>
               </div>
           </Loginform>
           </LoginContainer>
        </Loginlayout>
    )
} 

export default RegisterComponent;