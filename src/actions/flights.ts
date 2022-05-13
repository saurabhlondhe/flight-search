import { GET_FLIGHTS } from "../constants/constants";
import { data as flightData } from "../mocks/flightData";
import { IFlightData, ISearchedFlights, TFlightParams } from "../types/flight";

export const getFlights = ({
  source,
  destination,
  return: arrival,
  departure,
}: TFlightParams) => {
  const filteredFlights: ISearchedFlights = {
    departureFlights: [],
    returnFlights: [],
  };

  // FIXME: skipped date checks due to lack for relevant data
  if (arrival) {
    const returnFlights = flightData.filter((flight) => {
      return flight.origin === destination && flight.destination === source;
    });
    filteredFlights.returnFlights = returnFlights as IFlightData[];
  }
  const departureFlights = flightData.filter((flight) => {
    return flight.origin === source && flight.destination === destination;
  });

  filteredFlights.departureFlights = departureFlights as IFlightData[];

  return {
    type: GET_FLIGHTS,
    payload: filteredFlights,
  };
};
