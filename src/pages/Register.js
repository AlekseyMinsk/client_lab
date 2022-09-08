import { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  //const [result, setResult] = useState('');

  function redirectLogin() {
    window.location = '/login';
  }


  async function registerUser(event) {
    event.preventDefault();
    // const data = JSON.stringify({
    //   "username": name,
    //   "password": password
    // });

    // var config = {
    //   method: 'post',
    //   url: 'http://localhost:5000/auth/registration',
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };

    // axios(config)
    // .then(function (response) {
    //   debugger;
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
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
      if(data.message) {
        window.location = '/dashboard';
      }
      console.log(res);
    } catch (error) {
      console.log(error);
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
      <span onClick={redirectLogin}>If you already have account, please login.</span>
    </>
  );
}

export default Register;
