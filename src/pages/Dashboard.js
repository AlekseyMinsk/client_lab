import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    //const history = useHistory();
    const [showPasswordInput, setpasswordInput] = useState(false);
    const [showItemUpdate, setUpfateItemInput] = useState(false);
    const [newPassword, setnewPassword] = useState('');
    const [itemsArr, setItemsArr] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [userName, setuserName] = useState('');

    const showupdatePassword = ()=> {
      setpasswordInput(showPasswordInput ? false  : true);
    }
    const showupdateItem = () => {

    }

    async function logout(event) {
        event.preventDefault();
        try {
          const res = await fetch('https://dep-server-lab.herokuapp.com/auth/logout', {
            method: "post",
            credentials: 'include',
            headers: { "Content-Type": "application/json" }
          });
          const data = await res.json();
          if (data.message) {
            window.location = '/login';
          } else {
            console.log("Logout error")
          }
        } catch (error) {
          console.log(error);
        }
    }
    async function deleteUser(event) {
      event.preventDefault();
      const postData = {
        "username": userName
      }
      try {
        const res = await fetch('https://dep-server-lab.herokuapp.com/auth/removeuser', {
          method: "post",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData),
        });
        const data = await res.json();
        if(data.message) {
          window.location = '/login';
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function updatePassword(event) {
        event.preventDefault();
        const postData = {
          "username": userName,
          "newpassword": newPassword
        }
        try {
          const res = await fetch('https://dep-server-lab.herokuapp.com/auth/updatepassword', {
            method: "post",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
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
    }
    async function addNewItem(event) {
      event.preventDefault();
      const postData = {
        'newItem': newItem
      }
      try {
        const res = await fetch('https://dep-server-lab.herokuapp.com/auth/additem', {
          method: "post",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData),
        });
        const data = await res.json();
        console.log(data)
        setNewItem('');
        populateQuote(false)
      } catch (error) {
        console.log(error);
      }
  }
  async function removeItem(event) {
    event.preventDefault();
    const itemToRemove = event.target.getAttribute('data-value');
    const postData = {
      'itemToRemove': itemToRemove
    }
    try {
      const res = await fetch('https://dep-server-lab.herokuapp.com/auth/removeitem', {
        method: "post",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      console.log(data)
      populateQuote(false)
    } catch (error) {
      console.log(error);
    }
}
async function updateItem(event) {
  event.preventDefault();
  const postData = {
    'newItem': newItem
  }
  try {
    const res = await fetch('https://dep-server-lab.herokuapp.com/auth/additem', {
      method: "post",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    console.log(data)
    populateQuote(false)
  } catch (error) {
    console.log(error);
  }
}

    async function populateQuote(fullUpdate) {
      try {
        const res = await fetch('https://dep-server-lab.herokuapp.com/auth/getitems', {
          method: 'get',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        if(data.message === "Not authorized") {
          window.location = '/login'
        }
        if(fullUpdate) {
          setuserName(data.user.userName);
        }
        setItemsArr(data.user.items); //...oldArray,
      } catch (error) {
        console.log(error);
      }
    }

    const listItems = itemsArr.map((item, index) =>
      <li key={index} className='App-li-style'>
        <span>{item}</span>
        <div>
        <input 
            type="button" 
            value='Delete Item' 
            data-value={item}
            onClick={removeItem}
        />
        </div>
      </li>
    );

    useEffect(() => {
      populateQuote(true)
    },[])

    return (
    <>
        <h3>Hello {userName}!</h3>
        <form onSubmit={logout}>
          <input 
            className='App-text-input'
            type="submit" 
            value="Logout" 
          />
        </form>
        <input 
            className='App-text-input'
            type="submit" 
            value="Update Password" 
            onClick={showupdatePassword}
        />
        <form onSubmit={deleteUser}>
          <input 
            className='App-text-input'
            type="submit" 
            value="Delete User" 
          />
        </form>  
        
        { (showPasswordInput) ? 
          <>
            <form onSubmit={updatePassword}>
            <input 
              className='App-text-input'
              value={newPassword}
              onChange={e => setnewPassword(e.target.value)}
              type='text'
              placeholder='Enter new password'
            /> 
            <input 
              className='App-text-input'
              type="submit" 
              value="Update" 
            />
            <br />
            </form>
          </>
          :
          <br /> 
        }
        <h3>Quote list</h3>
        <form onSubmit={addNewItem} >
            <input 
              className='App-text-input'
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              type='text'
              placeholder='Add new Item'
            /> 
            <input 
              className='App-text-input'
              type="submit" 
              value="Add Item" 
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