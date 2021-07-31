import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name ,setName] = useState('');
  const [age, setAge] = useState('');
  const [listOfFriends, setListOfFriends] = useState([]);
  const [reverseList, setReverseList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8000/read')
      .then(async (response) => {
          // put read data into array listOfFriends
          setListOfFriends(response.data);
      }).catch(() => {
        console.log("ERROR");
      });
  }, [])

  // addFriend button function
  const addFriend = () => {
    // push data into url
    Axios.post('http://localhost:8000/addfriend', {name: name, age: age})
      .then((response) => {
        alert("yes it did work")
        setListOfFriends([...listOfFriends], {_id: response.data._id, name:name, age:age})
      })
      /*
      .catch(() => {
        alert("aww, it didn't work")
      });
      */
  }

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");
    Axios.put('http://localhost:8000/update', {newAge: newAge, id: id}).then(()=> {
      setListOfFriends(listOfFriends.map((val) => {
        return val._id === id ? {_id:id, name:val.name, age:newAge} : val
      }))
    })

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:8000/delete/${id}`).then(()=> {
      setListOfFriends(listOfFriends.filter((val) => {
        return val._id !== id;
      }))
    })
  }

  return (
    <div className="App">
      <div className='inputs'>
        <input type='text' className='' placeholder='Friend name is ..' onChange={(e) => setName(e.target.value)}/>
        <input type='number' className='' placeholder='Friend age ..' onChange={(e) => setAge(e.target.value)}/>
        <button onClick={addFriend}>Add Friend</button>
      </div>

      {/* mapping data from db */}
      <div className='listOfFriends'>
        {listOfFriends.map((val) => {
          return (
            <div className='friendContainer'>
              <div className='friend'>
                <h3>Name: {val.name}</h3>
                <h3>| Age: {val.age}</h3>
              </div>
              <button onClick={() => {updateFriend(val._id)}}>Update</button>
              <button onClick={()=> {deleteFriend(val._id)}}>Delete</button>
            </div>
            )
        })}
      </div>
    </div>
  );
}
}

export default App;
