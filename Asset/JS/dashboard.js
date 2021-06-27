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
let authD = firebase.auth();
var storage = firebase.storage();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;

    if (user) {
      document.getElementById('mail').value = user.email;
      var storageRef = storage.ref('users/' + user.uid + '/' + 'profil.jpg');
      storageRef.getDownloadURL().then((imgUrl) => {
        img.src = imgUrl;
      });
      get.on('value', (snap) => {
        var json = snap.val();
        var id = Object.keys(json);
        var data = Object.values(json);
        var temp = false;
        var check = document.getElementsByClassName('cek');

        for (let i = 0; i < id.length; i++) {
          if (user.uid == data[i]['uid']) {
            document.getElementById('nama').value = data[i]['nama'];
            document.getElementById('nomertelp').value = data[i]['nomerhp'];
            document.getElementById('alamat').value = data[i]['alamat'];
            console.log(id[i]);
            if (data[i]['jk'] == check[0].value) {
              check[0].checked = true;
            }
            if (data[i]['jk'] == check[1].value) {
              check[1].checked = true;
            }

            break;
          }
        }
      });
    }
  }
});

function keluar() {
  authD
    .signOut()
    .then(() => {
      alert('keluar berhasil');
      window.location.href = 'Login.html';
    })
    .catch((error) => {
      // An error happened.
    });
}

var button = document.getElementById('upload');

function up() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var user = firebase.auth().currentUser;
      var file = document.getElementById('upload').files[0];
      var storageRef = storage.ref('users/' + user.uid + '/' + 'profil.jpg');
      storageRef.put(file);
      alert('dsadsa');
    }
  });
}

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
    var Jeniskelamin;
    var check = document.getElementsByClassName('cek');
    if (check[0].checked == true) {
      Jeniskelamin = check[0].value;
    }
    if (check[1].checked == true) {
      Jeniskelamin = check[1].value;
    }
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

function aksesKeranjang() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = 'keranjang.html';
    } else {
      window.location.href = 'Login.html';
    }
  });
}
