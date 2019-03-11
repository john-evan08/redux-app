import React, {Component} from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import UserList from "./component/UserList";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";

const store = configureStore(); // You can also pass in an initialState here

class App extends Component {
  constructor(props) {
    super(props);
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      this.state = {isAuthenticated: true};
    } else {
      this.state = {isAuthenticated: false};
    }
  }

  render() {
    // const {isAuthenticated} = this.state;
    return (
      <div className="App">
        <Provider store={store}>
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/userlist" component={UserList} />
          </Switch>
        </Provider>
      </div>
    );
  }
}

export default App;
