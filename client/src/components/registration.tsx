import * as React from "react";
import styled from "styled-components";
import { authCall, registerCall } from "../containers/authContainer";
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

export interface RegisterUserProps {
  username: string;
  password: string;
}

export interface RegisterUserState {
  userName: string;
  passWord: string;
  emailId: string;
  active: boolean;
}

export class RegisterUser extends React.Component<
  RegisterUserProps & RouteComponentProps,
  RegisterUserState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      emailId: "",
      active: false
    };
  }
  handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      await registerCall(
        this.state.emailId,
        this.state.userName,
        this.state.passWord
      )
    ) {
      this.props.history.push({
        pathname: "/"
      });
    } else {
      this.setState({ active: true });
    }
  };
  handleEmailChange = (e: any) => {
    this.setState({ emailId: e.target.value, active: false });
  };
  handleUserChange = (e: any) => {
    this.setState({ userName: e.target.value, active: false });
  };
  handlePassChange = (e: any) => {
    this.setState({ passWord: e.target.value, active: false });
  };
  render() {
    return (
      <>
        <CenterDiv>
          {this.state.active && (
            <ErrorText>
              Some Error has occured. Please try again sometime later
            </ErrorText>
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
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label>UserName:</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Enter UserName"
                name="user"
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
            <button type="submit" value="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </CenterDiv>
      </>
    );
  }
}
