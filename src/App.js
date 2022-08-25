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
import { storage } from "./firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: parseInt(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
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
            <button o onClick={() => {
              updateUser(user.id, user.age);
            }}>Increase age</button>
            <button onClick={() => deleteUser(user.id)}>delete</button>
          </div>
        );
      })}
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload Image</button>
      {imageList.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
}

export default App;
