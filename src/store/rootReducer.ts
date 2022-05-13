import { combineReducers } from "redux";
import flightReducer from "../reducers/flightReducer";

const rootReducer = combineReducers({
  flights: flightReducer,
});

export default rootReducer;
