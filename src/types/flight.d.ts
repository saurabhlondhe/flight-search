export interface IFlightData {
  arrivalTime: string;
  date: string;
  duration: string;
  departureTime: string;
  destination: string;
  flightNo: string;
  noOfStops?: number;
  name: string;
  origin: string;
  price: number;
}

export interface IColumns {
  id: string;
  label: string;
  minWidth: number;
}

export interface ISearchedFlights {
  departureFlights: IFlightData[];
  returnFlights: IFlightData[];
}

export type TFlightAction = { type: string; payload: ISearchedFlights };

export interface IFlightState {
  flights: ISearchedFlights;
}

export type TFlightParams = {
  source: string;
  destination: string;
  return: Date | null;
  departure: Date;
};
