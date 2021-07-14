import { SETUSER } from "../actions/user.actions";
const initialstate = {id:"60ed423e91615a264c3d9101"};

const fn = (state=initialstate, action)=>{

    switch (action.type) {
        case SETUSER:
            return {...action.payload}
    
        default:
            return state;
    }
}


export default fn;