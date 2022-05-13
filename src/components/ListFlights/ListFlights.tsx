import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import { IFlightState, IColumns, IFlightData } from "../../types/flight";
import FlightDetailsRow from "./FlightDetailsRow/FlightDetailsRow";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const ListFlights = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const flights = useSelector((state: IFlightState) => state.flights);

  const iMobile: boolean = window.innerWidth <= 768;

  const columns: IColumns[] = iMobile
    ? []
    : [
        { id: "number", label: "Flight Number", minWidth: 50 },
        { id: "name", label: "Airline Name", minWidth: 170 },
        { id: "source", label: "Departure Time", minWidth: 100 },
        { id: "duration", label: "Duration", minWidth: 100 },
        { id: "numberOfStops", label: "Number of Stops", minWidth: 100 },
        { id: "arrival", label: "Arrival Time", minWidth: 100 },
        { id: "price", label: "Price", minWidth: 100 },
      ];

  const count =
    (flights?.departureFlights?.length ?? 0) +
    (flights?.returnFlights?.length ?? 0);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getPaginatedRecords = (records: IFlightData[]): IFlightData[] => {
    return rowsPerPage > 0
      ? records?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : records;
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getPaginatedRecords(flights?.departureFlights)?.map((row) => (
              <FlightDetailsRow
                key={row.flightNo}
                data={row}
                iMobile={iMobile}
              />
            ))}
            {getPaginatedRecords(flights?.returnFlights)?.map((row) => (
              <FlightDetailsRow
                key={row.flightNo}
                data={row}
                iMobile={iMobile}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ListFlights;
