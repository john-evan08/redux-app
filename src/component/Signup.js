import React, {Component} from "react";
import {createUser} from "../services/authenticateService";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {first: "", last: "", email: "", password: "", error: null};
    this.signup = this.signup.bind(this);
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

  signup(e) {
    e.preventDefault();
    if (
      this.state.first &&
      this.state.last &&
      this.state.email &&
      this.state.password
    ) {
      createUser(
        this.state.first,
        this.state.last,
        this.state.email,
        this.state.password
      )
        .then(resp => {
          console.log(resp);
          if (resp.data) {
            this.fillLocalStorage(resp.data);
          }
        })
        .then(() => {
          this.props.history.push("./userlist");
        })
        .catch(err => {
          if (err.status === 403 || err.status === 401) {
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
          <form onSubmit={this.signup}>
            <h2 className="text-center">Bienvenue sur Signup</h2>
            <div className="form-group">
              <label>first</label>
              <input
                type="text"
                name="first"
                className="form-control"
                placeholder="first"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>last</label>
              <input
                type="text"
                name="last"
                className="form-control"
                placeholder="last"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="email"
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Signup;
