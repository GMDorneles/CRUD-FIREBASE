import { useState, useEffect } from 'react';
import './App.css';
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { async } from '@firebase/util';

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      <input placeholder='Name...' onChange={(e) => { setNewName(e.target.value); }} />
      <input type="number" placeholder='age...' onChange={(e) => { setNewAge(e.target.value); }} />
      <button onClick={createUser}>Criate user</button>
      {users.map((user) => {
        return (
          <div>
            {""}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
