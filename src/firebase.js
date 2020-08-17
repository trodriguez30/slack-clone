import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBrjp8UMpkgCVzzTh6vfbjmlEH1KZthD0c",
  authDomain: "react-slack-db-f27d1.firebaseapp.com",
  databaseURL: "https://react-slack-db-f27d1.firebaseio.com",
  projectId: "react-slack-db-f27d1",
  storageBucket: "react-slack-db-f27d1.appspot.com",
  messagingSenderId: "665952340250",
  appId: "1:665952340250:web:5b295a1c24d7ccf93104a3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
