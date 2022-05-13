import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";
import SearchFlight from "./components/SearchFlight/SearchFlights";
import ListFlights from "./components/ListFlights/ListFlights";
import { navigation } from "./constants/constants";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <Switch>
              <Route path="/" exact>
                <SearchFlight />
              </Route>
              <Route path={navigation.schedule} exact>
                <ListFlights />
              </Route>
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </Provider>
    );
  }
}

export default App;
