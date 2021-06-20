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
let alamat = '';
let uid = '';
let nama = '';
let nomerhp = '';
let jk = '';

let db = firebase.database().ref('user');
function sendMessage(nama, uid, alamat, nomerhp, jk) {
  let newFormMessage = db.push();
  newFormMessage.set({
    nama: nama,
    uid: uid,
    alamat: alamat,
    nomerhp: nomerhp,
    jk: jk,
  });
}

let auth = firebase.auth();
function regis() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // harus direct ke dashboard, bila berhasil daftar
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var data = userCredential.user;

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var user = firebase.auth().currentUser;

          if (user) {
            var uid = user.uid;
            sendMessage(nama, uid, alamat, nomerhp, jk);
            // masuk ke dashboard
            window.location.href = '../FP1/Login.html';
            return false;
          } else {
            // No user is signed in.
          }
        }
      });

      alert('pendaftaran sukses');
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert('welcome');
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var user = firebase.auth().currentUser;
          var admin = 't6qBev27vyNM38TM4HQ998mfD0g1';

          if (user.uid != admin) {
            var user = firebase.auth().currentUser;
            window.location.href = 'Dashboard_P.html';
          } else;
          {
            var user = firebase.auth().currentUser;
            window.location.href = 'Dashboard_A.html';
          }
        }
      });

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

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
function akseslogin() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = 'Dashboard_P.html';
    } else {
      window.location.href = 'Login.html';
    }
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

function resetPassword() {
  var auth = firebase.auth();
  var emailAddress = document.getElementById('ResetEmail').value;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      alert('dsdsa');
    })
    .catch(function (error) {
      // An error happened.
    });
}

// bagian upload barang
var storage = firebase.storage();
var barang = firebase.database().ref('barang');
function saveBarang() {
  var namaBarang = document.getElementById('namaBarang').value;
  var harga = document.getElementById('harga').value;

  barang.on('value', (snap) => {
    var json = snap.val();
    var getIdBarang = Object.keys(json);
    Upbarang(namaBarang, harga, getIdBarang.length);
    console.log(getIdBarang.length);
    var file = document.querySelector('#uploadBarang').files[0];
    var storageRef = storage.ref('barang/' + getIdBarang + '/' + 'barang.jpg');
    storageRef.put(file);
    alert('barang berhasil ditambah');
  });
}

function Upbarang(namabarang, hargabarang, id) {
  var push = barang.push();
  push.set({
    idbarang: id,
    barang: namabarang,
    harga: hargabarang,
  });
}
