import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { DateTimePicker } from "@material-ui/pickers";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";

import { searchValidation } from "../../schema/validationSchema";
import { airPorts } from "../../mocks/flightData";
import { getFlights } from "../../actions/flights";
import { navigation } from "../../constants/constants";
import "./SearchFlights.css";

const SearchFlights = () => {
  const today = new Date();
  const history = useHistory();
  const sourceAirports = Object.values(airPorts);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        source: "",
        destination: "",
        return: null,
        departure: today,
      }}
      validationSchema={searchValidation}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { validateForm }) => {
        validateForm(values).then(() => {
          dispatch(getFlights(values));
          history.push(navigation.schedule);
        });
      }}
    >
      {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
        <Grid
          className="search-container"
          container
          alignItems="center"
          justifyContent="center"
          spacing={3}
        >
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Form>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} lg={5}>
                      <Autocomplete
                        options={sourceAirports}
                        renderInput={(props) => (
                          <Field
                            {...props}
                            component={TextField}
                            fullWidth
                            placeholder="Source city"
                            name="source"
                            id="source"
                            label="From"
                            variant="outlined"
                            onSelect={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldValue("source", e.target.value);
                              setFieldTouched("source", true);
                            }}
                            error={!!errors?.source && touched["source"]}
                            helperText={errors?.source}
                            InputProps={{
                              ...props.InputProps,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FlightTakeoffIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <ArrowForwardIcon className="arrow" />
                    <Grid item xs={12} lg={5}>
                      <Autocomplete
                        options={sourceAirports.filter(
                          (airport) => airport !== values.source
                        )}
                        renderInput={(props) => (
                          <Field
                            {...props}
                            component={TextField}
                            fullWidth
                            placeholder="Destination city"
                            name="destination"
                            id="destination"
                            label="To"
                            variant="outlined"
                            onSelect={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldValue("destination", e.target.value);
                              setFieldTouched("destination", true);
                            }}
                            error={
                              !!errors?.destination && touched["destination"]
                            }
                            helperText={errors?.destination}
                            InputProps={{
                              ...props.InputProps,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FlightLandIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} lg={5}>
                      <Field
                        margin="normal"
                        id="departure"
                        name="departure"
                        label="Departure Time"
                        component={DateTimePicker}
                        value={values?.departure}
                        onChange={(date: Date) => {
                          setFieldValue("departure", date, true);
                          setFieldTouched("departure", true);
                        }}
                        minDate={today}
                        error={!!errors?.departure && touched["departure"]}
                        helperText={errors?.departure}
                        InputLabelProps={{
                          shrink: !!values?.departure,
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} lg={5}>
                      <Field
                        margin="normal"
                        id="return"
                        name="return"
                        label="Return date (optional)"
                        value={values?.return}
                        component={DateTimePicker}
                        onChange={(date: Date) => {
                          setFieldValue("return", date, true);
                          setFieldTouched("return", true);
                        }}
                        minDate={today}
                        InputLabelProps={{
                          shrink: !!values?.return,
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <CardActions>
                    <Button variant="contained" color="primary" type="submit">
                      Search
                    </Button>
                  </CardActions>
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default SearchFlights;
