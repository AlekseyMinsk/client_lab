import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [showPasswordInput, setpasswordInput] = useState(false);
  const [newPassword, setnewPassword] = useState('');
  const [itemsArr, setItemsArr] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [userName, setuserName] = useState('');

  const showupdatePassword = ()=> {
    setpasswordInput(showPasswordInput ? false  : true);
  };
  async function logout(event) {
    event.preventDefault();
    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/logout', {
        method: 'post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.message) {
        localStorage.removeItem('custom_token');
        window.location = '/login';
      } else {
        console.log('Logout error')
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteUser(event) {
    event.preventDefault();
    const token = localStorage.getItem('custom_token');
    const postData = {
      'username': userName
    }
    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/removeuser', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if(data.message) {
        localStorage.removeItem('custom_token');
        window.location = '/login';
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function updatePassword(event) {
    event.preventDefault();
    const token = localStorage.getItem('custom_token');
    const postData = {
      'username': userName,
      'newpassword': newPassword
    }
    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/updatepassword', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if(data.message) {
        setpasswordInput(showPasswordInput ? false  : true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function addNewItem(event) {
    event.preventDefault();
    const token = localStorage.getItem('custom_token');
    const postData = {
      'newItem': newItem
    }
    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/additem', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      setNewItem('');
      populateQuote(false)
    } catch (error) {
      console.log(error);
    }
  };
  async function removeItem(event) {
    event.preventDefault();
    const token = localStorage.getItem('custom_token');
    const itemToRemove = event.target.getAttribute('data-value');
    const postData = {
      'itemToRemove': itemToRemove
    }
    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/removeitem', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      populateQuote(false)
    } catch (error) {
      console.log(error);
    }
  };
  async function populateQuote(fullUpdate) {
    try {
      const token = localStorage.getItem('custom_token');
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/getitems', {
        method: 'get',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await res.json();
      if(data.message === 'Not authorized') {
        window.location = '/login'
      }
      if(fullUpdate) {
        setuserName(data.userData.username);
      }
      setItemsArr(data.userData.list);
    } catch (error) {
      console.log(error);
    }
  };
  const listItems = itemsArr.map((item, index) =>
    <li key={index} className='App-li-style'>
      <span>{item.taskCore}</span>
      <div>
        <input 
          className='App-text-input'
          type='button' 
          value='Delete Item' 
          data-value={item.id}
          onClick={removeItem}
        />
      </div>
    </li>
  );
  useEffect(() => {
    populateQuote(true)
  },[]);

  return (
    <>
      <h3>Hello {userName}!</h3>
      <form className='App-width-50' onSubmit={logout}>
        <input 
          className='App-text-input'
          type='submit' 
          value='Logout' 
        />
      </form>
      <div className='App-width-50'>
        <input 
          className='App-text-input'
          type='submit' 
          value='Update Password' 
          onClick={showupdatePassword}
        />
      </div>
      <form className='App-width-50' onSubmit={deleteUser}>
        <input 
          className='App-text-input'
          type='submit' 
          value='Delete User' 
        />
      </form>  
      
      {(showPasswordInput) ? 
        <>
          <form className='App-width-50' onSubmit={updatePassword}>
            <input 
              className='App-text-input'
              value={newPassword}
              onChange={e => setnewPassword(e.target.value)}
              type='text'
              placeholder='Enter new password'
            /> 
            <input 
              className='App-text-input'
              type='submit' 
              value='Update' 
            />
            <br />
          </form>
        </>
        :
        <br /> 
      }
      <h3>Quote list</h3>
      <form className='App-width-50' onSubmit={addNewItem} >
        <input 
          className='App-text-input'
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type='text'
          placeholder='Add new Item'
        /> 
        <input 
          className='App-text-input'
          type='submit' 
          value='Add Item' 
        />
        <br />
      </form>
      <ul className='App-ul-style'>
        {listItems}
      </ul>
    </>
    )
}

export default Dashboard;