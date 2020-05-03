import * as React from "react";
import styled from "styled-components";
import { authCall } from "../containers/authContainer";
import { withRouter, RouteComponentProps, Route } from "react-router-dom";

const Title = styled.h1`
  font-size: 1.5em;
  color: #747676;
`;

const ErrorText = styled.h5`
  color: red;
`;

const CenterDiv = styled.div`
  top: 50%;
  left: 50%;
  width: 30%;
  position: absolute;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  padding: 20px;
`;

export interface LoginProps {
  username: string;
  password: string;
}

export interface LoginState {
  username: string;
  password: string;
  active: boolean;
}

export class Login extends React.Component<
  LoginProps & RouteComponentProps,
  LoginState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      active: false
    };
  }
  handleSubmit = async (e: any) => {
    e.preventDefault();
    if (await authCall(this.state.username, this.state.password)) {
      this.props.history.push({
        pathname: "/welcome",
        state: { username: this.state.username }
      });
    } else {
      this.setState({ active: true });
    }
  };
  handleUserChange = (e: any) => {
    this.setState({ username: e.target.value });
  };
  handlePassChange = (e: any) => {
    this.setState({ password: e.target.value });
  };
  handleRegistration = (e: any) => {
    this.props.history.push({
      pathname: "/register"
    });
  };
  render() {
    return (
      <>
        <CenterDiv>
          {this.state.active && (
            <ErrorText>Incorrect Username or password</ErrorText>
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                required
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                onChange={this.handleUserChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                required
                type="password"
                className="form-control"
                onChange={this.handlePassChange}
                placeholder="Enter password"
                name="pswd"
              />
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
            <button type="submit" value="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <button
            type="submit"
            value="register"
            className="btn btn-primary"
            onClick={this.handleRegistration}
          >
            Register
          </button>
        </CenterDiv>
      </>
    );
  }
}
