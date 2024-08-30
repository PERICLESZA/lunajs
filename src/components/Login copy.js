import React, { useState, useEffect} from 'react';
import '../App.css';
import authService from '../services/authService';


function Login () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const menu = [
    "Exchange", "Bank", "City", "Class", "Country", "Customer",
    "Identification", "Login", "Parameter", "PercentCheck", "Status", "StoreIP", "Report", "Logout"
  ];

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ username, password });
      if (response.success) {
        setLoggedIn(true);
        setIsAdmin(username==='admin' || username==='Admin');
        showMessage('Login successful!', 'success');
      } else {
        showMessage('Invalid credentials', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showMessage('An error occurred. Please try again.', 'error');
    }
  };

const handleMenuChange = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "Logout") {
      setLoggedIn(false);
      setUsername('');
      setPassword('');
      showMessage('You have been logged out.', 'success');
    } else {
      console.log("Selected menu option:", selectedOption);
      // Execute other components based on the selected option
    }
};

// Função para fazer o logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    showMessage('You have been logged out.', 'success');
  };

// Monitora a inatividade do usuário
  useEffect(() => {
    let timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      if (loggedIn) {
        timeout = setTimeout(handleLogout, 600000); // 10 minutos de inatividade
      }
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

    events.forEach(event => {
      window.addEventListener(event, resetTimeout);
    });

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      events.forEach(event => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, [loggedIn]);

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="header-title">Luna Travel</div>
        {loggedIn && isAdmin && (
          <>
            <select onChange={handleMenuChange} className="header-menu">
              <option value="">Select an option</option>
              {menu.map(option => (
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
      <div className="login-container">
        {!loggedIn && (
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div><br/>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div><br/>
              <button type="submit" className="btn btn-primary btn-block">Entrar</button>
            </form>
          </div>
        )}
      </div>
      <div className="footer">© 2024 Agência de Câmbio</div>
    </div>
  );
}

export default Login;
