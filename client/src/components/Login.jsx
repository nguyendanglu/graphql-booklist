import { useState, useContext } from 'react';
import { useMutation, gql } from 'urql';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, executeMutation] = useMutation(LOGIN_MUTATION);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await executeMutation({ username, password });
    
    if (result.error) {
      setError(result.error.message.replace('[GraphQL] ', ''));
      return;
    }

    if (result.data && result.data.login) {
      login(result.data.login.token, result.data.login.user);
      navigate('/books');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to GraphQL Bookstore</h2>
      {error && <p className="error" style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
