import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  TableCell,
  TableRow,
} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { IFlightData } from "../../../types/flight";
import "./FlightDetailsRow.css";

interface IProps {
  data: IFlightData;
  iMobile?: boolean;
}

const FlightDetailsRow = ({ data, iMobile }: IProps) => {
  return iMobile ? (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <TableCell className="plain-table-cell">
          <strong>{data.departureTime}</strong> {data.origin}
        </TableCell>
        <TableCell className="plain-table-cell">
          <strong>{data.arrivalTime}</strong> {data.destination}
        </TableCell>
        <TableCell className="plain-table-cell">
          <b>₹{data.price}</b>
        </TableCell>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12} className="details-row">
            Flight No. : {data.flightNo}
          </Grid>
          <Grid item xs={12} className="details-row">
            Name : {data.name}
          </Grid>
          <Grid item xs={12} className="details-row">
            Departure Time:
            <strong>{data.departureTime}</strong>
          </Grid>
          <Grid item xs={12} className="details-row">
            Source: {data.origin}
          </Grid>
          <Grid item xs={12} className="details-row">
            Duration : {data.duration}
          </Grid>
          <Grid item xs={12} className="details-row">
            No. Of Stops :
            {data.noOfStops ? `${data.noOfStops} Stops` : "No Stop"}
          </Grid>
          <Grid item xs={12} className="details-row">
            Arrival Time: <strong>{data.arrivalTime}</strong>
          </Grid>
          <Grid item xs={12} className="details-row">
            Destination : {data.destination}
          </Grid>
          <Grid item xs={12} className="details-row">
            Price: <b>₹{data.price}</b>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  ) : (
    <TableRow hover tabIndex={-1}>
      <TableCell>{data.flightNo}</TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>
        <strong>{data.departureTime}</strong> {data.origin}
      </TableCell>
      <TableCell>{data.duration}</TableCell>
      <TableCell>
        {data.noOfStops ? ` ${data.noOfStops} Stops` : "No Stop"}
      </TableCell>
      <TableCell>
        <strong>{data.arrivalTime}</strong> {data.destination}
      </TableCell>
      <TableCell>
        <b>₹{data.price}</b>
      </TableCell>
    </TableRow>
  );
};
export default FlightDetailsRow;
