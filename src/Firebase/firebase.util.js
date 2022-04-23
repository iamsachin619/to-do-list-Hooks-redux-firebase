import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAnQYi_Y-9OQgVxoUJw7ZK4Mvy1-3lProc",
  authDomain: "portfolio-c4ba1.firebaseapp.com",
  projectId: "portfolio-c4ba1",
  storageBucket: "portfolio-c4ba1.appspot.com",
  messagingSenderId: "449890551975",
  appId: "1:449890551975:web:0768e398144b5c1f183382",
  measurementId: "G-FHJRJEX9HX"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export const addTask = async (data) => {
  const dataRef = await firestore
    .collection("/plato-assignment/page1/tasks")
    .add(data);
  console.log(dataRef.id);
  return dataRef.id;
};

export const getTasks = async () => {
  let arr = [];
  const dataRef = await firestore
    .collection("/plato-assignment/page1/tasks")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        arr.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((error) => {
      return "error!";
    });
  return arr;
};

export const updateTask = async (checkValue, taskToUpdate) => {
  await firestore
    .doc(`/plato-assignment/page1/tasks/${taskToUpdate.id}`)
    .update({
      completed: checkValue
    });
};

export const delTask = async (taskToDel) => {
  await firestore.doc(`/plato-assignment/page1/tasks/${taskToDel.id}`).delete();
};
