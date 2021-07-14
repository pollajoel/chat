import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { LOGINUSER } from '../grapql/mutation';
import { useMutation } from '@apollo/client';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { set_user } from '../actions/user.actions';


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
    width: 40%;
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
const ErrorDisplay = styled.div `
    color: red;
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
    input{
        cursor:pointer;
        background-color: #5dade2 ;
        color: #fff;
        text-transform: uppercase;
        font-size: 16px;
    };
`


const LoginComponent = ()=>{


    const dispatch = useDispatch()
    const history = useHistory();
    const [formState, Setformstate] = useState({
        login:"",
        password:""
    });
    const [errorMessage, SetError] = useState({});
    const [LoginStart] = useMutation(LOGINUSER,{ errorPolicy: 'all' });
   
    const Login = async(e)=>{

        e.preventDefault();
        const isLogin = await LoginStart({variables:{
            email: formState.login,
            password: formState.password
        }});

        if(  isLogin.errors !== undefined){
            const isLogData = isLogin.errors[0];
            SetError({...isLogData});
            console.log(isLogData )
            

        }else{
           // store the token and redirect to login page...
           const Token = isLogin.data.LoginUser.token;
           localStorage.setItem("Token",Token);
           const decoded = jwt_decode(Token);
           dispatch( set_user(decoded) );
           history.push("/");
        }



        //history.push("/")
        //alert( "hello to you ........")

    }


    return(
        <Loginlayout>
            <LoginContainer>
           <Loginform onSubmit ={ (e)=>Login(e)}>
               <Title><h1>Veuillez vous connecter.</h1></Title>
               <FormLayout>
                   <Forminput type="text" placeholder="email" onChange={(e)=> Setformstate({...formState,login:e.target.value})}></Forminput>
               </FormLayout>
               <FormLayout>
                   <Forminput type="password" placeholder="mot de passe" onChange={(e) => Setformstate({...formState, password:e.target.value})}/>
               </FormLayout>
               <ButtonSubmit>
                   <Forminput type="submit" value="connexion"/>
               </ButtonSubmit>
               <div>
                   <Link to="">Mot de passe oublié ?</Link>   <b><Link to="/register">Inscription?</Link></b>
               </div>
               <ErrorDisplay>{ errorMessage.message }</ErrorDisplay>
           </Loginform>
           </LoginContainer>
        </Loginlayout>
    )
} 

export default LoginComponent;