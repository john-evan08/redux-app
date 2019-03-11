import React, {Component} from "react";
import {usersFetch, userDelete} from "../actions/users";
import {connect} from "react-redux";

class UserList extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if (this.props.hasErrored) {
      console.log(this.props.ErrorMessage);
      return <p> {this.props.ErrorMessage}</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <ul>
        <li>Voici mes amis</li>
        {this.props.users.map(item => (
          <li key={item.id}>
            {item.first} {item.last}{" "}
            <button
              type="button"
              className=" btn btn-outline-primary"
              onClick={() => {
                this.props.userDelete(item.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    hasErrored: state.usersHasErrored,
    ErrorMessage: state.usersErrorMessage,
    isLoading: state.usersIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(usersFetch()),
    userDelete: userID => dispatch(userDelete(userID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
