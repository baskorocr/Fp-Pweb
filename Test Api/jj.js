var firebaseConfig = {
  apiKey: 'AIzaSyDTVvI39LuOhSjS1M13JADzXcZlA0oBTtE',
  authDomain: 'pwebproject-10e10.firebaseapp.com',
  databaseURL: 'https://pwebproject-10e10-default-rtdb.firebaseio.com',
  projectId: 'pwebproject-10e10',
  storageBucket: 'pwebproject-10e10.appspot.com',
  messagingSenderId: '791233794188',
  appId: '1:791233794188:web:bcf5031842311c13e4eba9',
  measurementId: 'G-GZKD8SMMJ2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var bts = firebase.database().ref('BTS/BtsAlmbum');
bts.on('value', (snap) => {
  var json = snap.val();
  var idBts = Object.keys(json);
  var valBts = Object.values(json);
  var text = document.getElementById('coba');
  var text2 = document.getElementById('coba2');

  text.innerHTML = valBts[0]['JudulLagu'];
  text2.innerHTML = valBts[0]['Harga'];
});
