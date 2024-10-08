import React, { Component } from 'react';
import '../App.css';
import authService from '../services/authService';
import CadLogin from './CadLogin';
import Bank from './Bank';
import City from './City';
import Class from './Class';
import Country from './Country';
import Customer from './Customer';
import Id from './Id';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: 'admin', 
      password: '@senha*', 
      loggedIn: false, 
      profile: '', 
      message: '', 
      messageType: '', 
      selectedMenu: '' 
    };
    this.adminMenu = [
      "Exchange", "Bank", "City", "Class", "Country", "Customer",
      "Identification", "Login", "Parameter", "PercentCheck", "Status", "StoreIP", "Report", "Logout"
    ];
    this.userMenu = [
      "Exchange", "City", "Country", "Customer", "Logout"
    ];
  }

  showMessage = (msg, type) => {
    this.setState({ message: msg, messageType: type });
    setTimeout(() => {
      this.setState({ message: '', messageType: '' });
    }, 3000);
  };

  handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = this.state;
      const response = await authService.login({ username, password });
      if (response.success) {
        const userProfile = response.profile; // Obtém o perfil do usuário
        this.setState({
          loggedIn: true,
          profile: userProfile
        });
        this.showMessage('Login successful!', 'success');
      } else {
        this.showMessage('Invalid credentials', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      this.showMessage('An error occurred. Please try again.', 'error');
    }
  };

  handleMenuChange = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "Logout") {
      this.setState({
        loggedIn: false, username: '', password: '', selectedMenu: '' });
      this.showMessage('You have been logged out.', 'success');
    } else {
      this.setState({ selectedMenu: selectedOption });
    }
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      username: '',
      password: '',
      selectedMenu: ''
    });
    this.showMessage('You have been logged out.', 'success');
  };

  componentDidMount() {
    this.resetTimeout = this.resetTimeout.bind(this);
    this.events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

    this.events.forEach(event => {
      window.addEventListener(event, this.resetTimeout);
    });

    this.resetTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.events.forEach(event => {
      window.removeEventListener(event, this.resetTimeout);
    });
  }

  resetTimeout() {
    clearTimeout(this.timeout);
    if (this.state.loggedIn) {
      this.timeout = setTimeout(this.handleLogout, 600000); // 10 minutos de inatividade
    }
  }

  render() {
    const { username, password, loggedIn, profile, message, messageType, selectedMenu } = this.state;
    return (
      <div className="container-fluid">
        <div className="header">
          <div className="header-title">Luna Travel</div>
          {loggedIn && (
            <>
              <select onChange={this.handleMenuChange} className="header-menu">
                <option value="">Select an option</option>
                
                {(profile === 'A' ? this.adminMenu : this.userMenu).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="header-username">{username}</div>
            </>
          )}
        </div>
        
        {message && (
          <div className={`notification ${messageType}`}>
            {message}
          </div>
        )}
        <div className="loginAuth-container">
          {!loggedIn && (
            <div className="login-box">
              <h2>Login</h2>
              <form onSubmit={this.handleLogin}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User"
                    value={username}
                    onChange={(e) => this.setState({ username: e.target.value })}
                    required
                  />
                </div><br/>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    required
                  />
                </div><br/>
                <button type="submit" className="btn btn-primary btn-block">Entrar</button>
              </form>
            </div>
          )}
          {loggedIn && selectedMenu === 'Bank' && (<Bank />)}
          {loggedIn && selectedMenu === 'Login' && (<CadLogin />)}
          {loggedIn && selectedMenu === 'City' && (<City />)}
          {loggedIn && selectedMenu === 'Class' && (<Class />)}
          {loggedIn && selectedMenu === 'Country' && (<Country />)}
          {loggedIn && selectedMenu === 'Customer' && (<Customer />)}
          {loggedIn && selectedMenu === 'Identification' && (<Id />)}
        </div>
        <div className="footer">© 2024 Agência de Câmbio</div>
      </div>
    );
  }
}

export default Login;
