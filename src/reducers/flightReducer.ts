import { GET_FLIGHTS } from "../constants/constants";
import { TFlightAction } from "../types/flight";

const flightReducer = (state = {}, action: TFlightAction) => {
  switch (action.type) {
    case GET_FLIGHTS:
      return action.payload;
    default:
      return state;
  }
};

export default flightReducer;
