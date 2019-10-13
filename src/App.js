import React from 'react';
import './App.css';
import Login from './components/Login/login';
import BookRide from './components/Ride/bookRide';
import { Route, Switch, Link } from 'react-router-dom';


class App extends React.Component {
  state = {
    showlogoff: null
  }

  showHideLogoffHandler = (isLoginSuccess) => {
    console.log('handler called in parent', isLoginSuccess);
    this.setState({ showlogoff: isLoginSuccess });
  }

  render() {
    return (
      // make nav bar here
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">PoolzCar</a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-link navbar-right"> <a href="#">
                  {this.state.showlogoff ? <span> Logoff </span> : null}
                </a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '420px' }} >
          {/* <Login showLogOffhandler={this.showHideLogoffHandler} /> */}
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/book-ride" exact component={BookRide} />
          </Switch>
        </div>

        {/* <Switch>
          <Route path="/" exact component={Card} />
          <Route path="/addemployee" exact component={AddEmployee}/>
          <Route path="/edit/:id" exact component={EditEmployee} />
        </Switch> */}
      </div>
    );
  }
}

export default App;
