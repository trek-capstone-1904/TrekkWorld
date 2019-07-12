const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const data = require('./AussieSeed.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://trekk-fdf31.firebaseio.com',
});

data &&
  Object.keys(data).forEach(key => {
    const content = data[key];

    if (typeof content === 'object') {
      Object.keys(content).forEach(docTitle => {
        admin
          .firestore()
          .collection(key)
          .doc(docTitle)
          .set(content[docTitle])
          .then(res => {
            console.log('document seeded!');
          })
          .catch(error => {
            console.error('Error seeding:', error);
          });
      });
    }
  });

// "IunEDQMarOfwKQtyB7Wq": {
//   "placeName": "string",
//   "tagLabels": "stuff",
//   "sightseeingScore": 1,
//   "snippet": "text",
//   "coordinates": ["num", "num"],
//   "location_id": "text",
//   "type": "restaurant",
//   "imageUrl": "image",
//   }

// Documents have limits - 1 mb total in one doc, 20k fields

// limited to 1 write/s on one doc

// can't retrieve a partial document, don't put a whole novel into it. you retrieve the whole thing.

// can't put everything in little docs, because queries are shallow, if you're always putting data together

//queries can only be used to find specific documents of

//arrays are best used for keywords

//if multiple users are modifying an array, it will mess up the order, might have conflicts

// when to use map

// put data in the same document if you want to see it together

// when to use sub collections when you want to see individual pieces of that data or you want your data to grow

//map if you want to see parent data based on that id

//map if you want to put related data in a map
