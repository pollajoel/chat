import { SETCHANNEL } from "../actions/channel.actions";
const initchannelstate = { id:""};

const Fn = (state=initchannelstate, action) => {

    switch (action.type) {
        case SETCHANNEL:
            return {...state,id:action.payload}
        default:
            return state;
    }
}

export default Fn;