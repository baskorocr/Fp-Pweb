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

let get = firebase.database().ref('user');
function simpanData() {
  alert('dsadsa');
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var user = firebase.auth().currentUser;
      get.on('value', (snap) => {
        var json = snap.val();
        var id = Object.keys(json);
        var chats = Object.values(json);
        var temp = false;

        for (let i = 0; i < id.length; i++) {
          if (user.uid == chats[i]['uid']) {
            temp = i;
            update(temp);
            break;
          }
        }
      });
    }
  });
}

function update(x) {
  var temp = x;

  get.on('value', (snap) => {
    var json = snap.val();
    var id = Object.keys(json);
    var chats = Object.values(json);
    var Nama = document.getElementById('nama').value;
    var Notelp = document.getElementById('nomertelp').value;
    var Alamat = document.getElementById('alamat').value;
    var Jeniskelamin = document.getElementById('jk').value;
    firebase
      .database()
      .ref('user/' + id[x])
      .update({
        nama: Nama,
        nomerhp: Notelp,
        alamat: Alamat,
        jk: Jeniskelamin,
      });
  });
  console.log(x);
}
