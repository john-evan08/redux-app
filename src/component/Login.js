import React, {Component} from "react";
import {authenticateUser} from "../services/authenticateService";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: "", error: null};
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    // pour que le this soit bien l'objet login et pas le input
  }

  componentWillMount() {
    document.body.style.backgroundImage =
      "url('https://www.capcampus.com/img/u/1/nouveau-campus-centrale-supelec-saclay.jpg')";
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
  }

  fillLocalStorage(data) {
    localStorage.clear();
    localStorage.setItem("token", data.token);
  }

  login(e) {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      authenticateUser(this.state.username, this.state.password)
        .then(resp => {
          if (resp.data) {
            this.fillLocalStorage(resp.data);
          }
        })
        .then(() => {
          this.props.history.push("./userlist");
        })
        .catch(err => {
          if (err.response.status === 403 || err.response.status === 401) {
            this.setState({
              error: "Le username ou le mot de passe est incorrecte"
            });
          } else {
            this.setState({
              error: "Le serveur ne marche pas"
            });
          }
        });
    } else {
      console.log("please enter your username and password");
      this.setState({error: "Veuillez renseignez les champs"});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  renderError(error) {
    if (error) {
      return <div className="alert alert-danger text-center">{error}</div>;
    }
  }

  render() {
    const error = this.state.error;
    return (
      <div className="login-container">
        <div className="login-form fadeInDown">
          {this.renderError(error)}
          <form onSubmit={this.login}>
            <h2 className="text-center">Login</h2>
            <div className="form-group">
              <label>UserName</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group ">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={this.onChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block custom-btn-cs"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
