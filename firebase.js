var firebaseConfig = {
    apiKey: "AIzaSyC6t_PX4FlgP7aZC3pgyK1NN8Lifyi6q10",
    authDomain: "estate-data.firebaseapp.com",
    databaseURL: "https://estate-data.firebaseio.com",
    projectId: "estate-data",
    storageBucket: "estate-data.appspot.com",
    messagingSenderId: "447725464010",
    appId: "1:447725464010:web:509766248870a310b54733",
    measurementId: "G-1TC4M578R5"
  };
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();