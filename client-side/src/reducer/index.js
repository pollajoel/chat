import { combineReducers } from "redux";
import channel from "./channel";
import user from "./user";

export default combineReducers({channel, user});