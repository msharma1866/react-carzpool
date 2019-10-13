import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    state = {
        loginUser: '',
        loginPassword: '',
        isLoginSuccess: null
    }

    loginHander = (event) => {
        switch (event.target.id) {
            case 'userName':
                this.setState({ loginUser: event.target.value });
                break;
            case 'password':
                this.setState({ loginPassword: event.target.value });
                break;
            default:
                //this.setState({ loginUser: '', loginPassword: '' });
                break;
        }
    }

    loginClick = (event) => {
        event.preventDefault();
        var loginJson = {};
        loginJson.userName = this.state.loginUser;
        loginJson.password = this.state.loginPassword;

        axios.post(
            'http://localhost:3001/login', loginJson
        ).then(response => {
            if (response.data.status == 200) {
                this.setState({ isLoginSuccess: true });
                //this.redirect = <Route to={'/book-ride'} push />
            }
            else {
                this.setState({ isLoginSuccess: false })
            }
            // this.props.showLogOffhandler(this.state.isLoginSuccess);
        });

    }

    renderSuccessErrorMessage = () => {
        if (this.state.isLoginSuccess === null) return null;
        return this.state.isLoginSuccess ? <span className="label label-success">Login Successful!</span> :
            <span className="label label-danger">Login failed!</span>
    }

    render() {
        var redirect = null;
        if (this.state.isLoginSuccess) {
            redirect = <Redirect to={'/book-ride/'} push />           
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="panel panel-primary" style={{ alignSelf: 'center' }}>
                        <div className="panel-heading"> Login </div>
                        <div className="panel-body">
                            <form>
                                <div className="form-group input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" /> </span>
                                    <input type="text" id="userName" autoComplete="off" className="form-control"
                                        onChange={this.loginHander}
                                        value={this.state.loginUser} />
                                </div>
                                <div className="form-group input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /> </span>
                                    <input type="password" id="password" className="form-control"
                                        onChange={this.loginHander}
                                        value={this.state.loginPassword} />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary" onClick={this.loginClick}>Login</button>
                                </div>
                                <div className="form-group">
                                    {this.renderSuccessErrorMessage()}
                                </div>
                            </form>
                        </div>
                    </div>
                    {redirect}
                </div>
            </div>
        );
    }
}

export default Login;