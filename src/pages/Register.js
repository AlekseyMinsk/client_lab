import { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function redirectLogin() {
    window.location = '/login';
  }

  async function registerUser(event) {
    event.preventDefault();
    const postData = {
      "username": name,
      "password": password
    }
    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/registration', {
        method: "post",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept" : "*/*"
        },
        body: JSON.stringify(postData), 
      });
      const data = await res.json();
      if(data.message === 'User registered successfully') {
        localStorage.setItem('custom_token', data.token);
        window.location = '/dashboard';
      } else {
        setName('');
        setPassword('');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1>Registration From</h1>
      <form onSubmit={registerUser}>
        <input 
          className='App-text-input'
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Enter your name'
        />
        <br />
        <input 
          className='App-text-input'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Enter your password'
        />
        <br />
        <input 
          className='App-text-input'
          type="submit" 
          value="Register" 
        />
      </form>  
      <span className='App-cursor-button' onClick={redirectLogin}>If you already have account, please click and login.</span>
    </>
  );
}

export default Register;
