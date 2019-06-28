import React from 'react';
import './App.css';
import db from './firebase';
import Routes from './Routes';
import NavigationBar from './Components/NavigationBar';

// db.collection('Users')
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       console.log(`${doc.id} => ${doc.data()}`);
//       console.log(doc.data())
//     });
//   });

async function users() {
  let usersAll = await db.collection('Users').get();
  let users = await db
    .collection('Users')
    .doc('oXLPsIdgUTNcph63Xeew')
    .collection('friends')
    .get();
  users.forEach(friend => {
    // console.log(friend.data());
  });
  // console.log(users);

  usersAll.forEach(async doc => {
    // console.log(doc.id);
    // console.log(
    //   await db
    //     .collection('Users')
    //     .doc('oXLPsIdgUTNcph63Xeew')
    //     .collection('friends')
    //     .get().docs
    // );
    //console.log(doc.get(doc.id).collection("friends").data())
  });
  // console.log(usersAll.docs)
  // console.log(typeof usersAll.docs)
  // console.log(usersAll.docs.get('trips'))
  db.collection('Users')
    .get()
    .then(users => {
      users.forEach(doc => {
        // console.log(doc.data())
        // console.log(doc.get('friends'))
      });
    });
  // console.log('current Data', doc.data);
  // console.log(usersAll);
}

users();

function App() {
  return (
    <div className="App">
      <h1>Trekk</h1>
      <NavigationBar />
      <Routes />
    </div>
  );
}

export default App;
