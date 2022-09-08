import { useState } from 'react';

function Login() {
  const [loginName, setloginName] = useState('');
  const [loginPassword, setloginassword] = useState('');
  const [userName, setuserName] = useState('');

  function redirectRegister() {
    window.location = '/register';
  }

  async function checkAlreadyLogin(event) {
    event.preventDefault();

    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/logout', {
        method: "post",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept" : "*/*"
        }
      });

       const data = await res.json();
       console.log(data);
      // if (data.user) {
      //   localStorage.setItem('token', data.user);
      //   console.log("Login success");
      //   window.location = '/dashboard';
      // } else {
      //  console.log("Password or email is incorrect")
      // }
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
    // const requestOptions = {
    //   method: 'POST',
    //   redirect: 'follow'
    // };

    
    // fetch("http://localhost:5000/auth/logout", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  }

  async function login(event) {
    event.preventDefault();
    const postData = {
      "username": loginName,
      "password": loginPassword
    }
    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/login', {
        method: "post",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept" : "*/*"
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();

      if (data.user) {
        console.log("Login success");
        window.location = '/dashboard';
      } else {
        console.log("Password or email is incorrect")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Login form</h1>
      <form onSubmit={login}>
        <input 
          className='App-text-input'
          value={loginName}
          onChange={e => setloginName(e.target.value)}
          type='text'
          placeholder='Enter your name'
        />
        <br />
        <input 
          className='App-text-input'
          value={loginPassword}
          onChange={e => setloginassword(e.target.value)}
          type='password'
          placeholder='Enter your password'
        />
        <br />
        <input 
          className='App-text-input'
          type="submit" 
          value="Login" 
        />
      </form> 
      {/* <form onSubmit={checkAlreadyLogin}>
        <input 
          type="submit" 
          value="IsLogged" 
        />
      </form> */}
      <span  onClick={redirectRegister}>If you do not have a account, please register.</span>
    </>
  );
}
export default Login;