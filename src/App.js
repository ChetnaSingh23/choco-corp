<<<<<<< HEAD
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import SignUpPage from './components/SignUpPage';
import './assets/styles/main.css';




function App() {
  return (
    <Router>
      <div>
        <AuthButton />
        <Route path="/" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <div>
         <section id="header">
          <header className="site-header">
            <div className="container">
              <div className="header-right">
                <div className="user-greeting">
                  <div>Hola</div>
                  <p>You are not logged in.</p>
                </div>
                <div className="logout">
                  <a href="#/logout" className="logout-button"><i className="fa fa-sign-out"></i></a>
                  <div>Log In</div>
                </div>
              </div>
            </div>
          </header>
          </section>

      </div>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function Public() {
  return <div><SignUpPage/></div>;
}

function Protected() {
  return <h3>Protected</h3>;
}

class Login extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>

      </div>
    );
  }
}

export default App;
