import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, RouteProps } from "react-router-dom";
import { History } from "history";
import axios from "axios";
const Title = styled.h1`
  font-size: 1.5em;
  color: #747676;
  text-align: center;
  padding: 10px;
`;

const TableTitle = styled.div`
  font-size: 1.3rem;
  color: #000;
  border: 1px solid #000;
`;

const TableContent = styled.div`
  font-size: 1.2rem;
  color: #000;
  border: 1px solid #000;
`;

const GiveKudos = styled.div`
  display: inherit;
  & > div {
    margin: 5px;
    width: 50%;
  }
`;

const CenterDiv = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 70%;
  height: 50%;
  overflow-y: scroll;
`;

type user = {
  user: string;
  userName: string;
  emailId: string;
  kudosGivenTo: string[];
  kudosReceivedFrom: string[];
  numberOfKudosRemaining: number;
};

export interface DashBoardProps {
  userName: string;
  password: string;
  history: History;
}

export interface DashBoardState {
  users: [];
  loggedInUser: user;
}

export class DashBoard extends React.Component<
  DashBoardProps & RouteProps,
  DashBoardState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      loggedInUser: {
        user: "",
        userName: "",
        emailId: "",
        kudosGivenTo: [],
        kudosReceivedFrom: [],
        numberOfKudosRemaining: 0
      }
    };
  }
  async componentDidMount() {
    let stateobj: { username?: string } | null | undefined = this.props.history
      .location.state;
    let loginUser = stateobj && stateobj.username;
    try {
      const resp: any = await axios.get("http://localhost:3000/users", {
        headers: {
          emailId: stateobj && stateobj.username
        }
      });
      let usersOfSameDomain = resp.data.users.filter((user: any) => {
        return user.emailId !== loginUser;
      });
      let loggedInUser = resp.data.users.filter((user: any) => {
        return user.emailId === loginUser;
      });
      this.setState({ users: usersOfSameDomain });
      this.setState({ loggedInUser: loggedInUser[0] });
    } catch (error) {
      console.error(error);
    }
  }
  handleGiveKudos = async (user: user) => {
    let loggedInUser = this.state.loggedInUser;
    if (loggedInUser.numberOfKudosRemaining > 0) {
      if (confirm("Confirm give kudos to" + user.emailId)) {
        try {
          const resp: any = await axios.post(
            "http://localhost:3000/giveKudos",
            {
              loggedInUser: this.state.loggedInUser,
              giveKudos: user
            }
          );
          console.log(resp);
          let updatedLoggedInUser = resp.data.filter((user: any) => {
            return user.emailId === loggedInUser.emailId;
          });
          console.log(updatedLoggedInUser);
          this.setState({ loggedInUser: updatedLoggedInUser[0] });
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      this.setState({});
    }
  };

  redirectLogin = () => {
    this.props.history.push({
      pathname: "/"
    });
  };
  render() {
    let stateobj: { username?: string } | null | undefined = this.props.history
      .location.state;
    console.log(this.state.loggedInUser.kudosGivenTo);
    return (
      <>
        <Title>
          {this.state.loggedInUser && this.state.loggedInUser.emailId} you have
          logged in successfully !!!
          <div>
            {this.state.loggedInUser.kudosGivenTo.length > 0
              ? "You have given kudos to " +
                this.state.loggedInUser.kudosGivenTo
              : "You have not given kudos to anyone for this week "}
          </div>
          <div>
            Kudos Remaining to be given this week is{" "}
            {this.state.loggedInUser?.numberOfKudosRemaining}
          </div>
          <div>
            {this.state.loggedInUser.kudosReceivedFrom.length > 0
              ? "You have received Kudos for this week from " +
                this.state.loggedInUser.kudosReceivedFrom
              : "You are yet to receive Kudos for this week "}
          </div>
        </Title>
        <CenterDiv>
          <div className="container">
            <div className="row">
              <TableTitle className="col-lg-4">Users In Domain</TableTitle>
              <TableTitle className="col-lg-4">Email ID</TableTitle>
              <TableTitle className="col-lg-4">Give Kudos</TableTitle>
            </div>
            <div className="row">
              {this.state.users &&
                this.state.users.map((userObj: user) => (
                  <>
                    <TableContent className="col-lg-4">
                      {userObj.userName}
                    </TableContent>
                    <TableContent className="col-lg-4">
                      {userObj.emailId}
                    </TableContent>
                    <GiveKudos className="col-lg-4">
                      <button
                        className="btn btn-primary"
                        onClick={() => this.handleGiveKudos(userObj)}
                      >
                        Give Kudos
                      </button>
                    </GiveKudos>
                  </>
                ))}
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.redirectLogin}>
            LogOut
          </button>
        </CenterDiv>
      </>
    );
  }
}
