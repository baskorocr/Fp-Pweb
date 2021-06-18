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

function keluar() {
  auth
    .signOut()
    .then(() => {
      alert('keluar berhasil');
      window.location.href = 'Login.html';
    })
    .catch((error) => {
      // An error happened.
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
        }
      });

      window.location.href = 'Dashboard_P.html';

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
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
function aksescard() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = 'keranjang.html';
    } else {
      window.location.href = 'Login.html';
    }
  });
}

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
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;
    document.getElementById('email').innerHTML;

    if (user) {
      document.getElementById('email').value = user.email;
      get.on('value', (snap) => {
        var json = snap.val();
        var id = Object.keys(json);
        var data = Object.values(json);
        var temp = false;

        for (let i = 0; i < id.length; i++) {
          if (user.uid == data[i]['uid']) {
            document.getElementById('nama').value = data[i]['nama'];
            document.getElementById('nomertelp').value = data[i]['nomerhp'];
            document.getElementById('alamat').value = data[i]['alamat'];
            document.getElementById('jk').value = data[i]['jk'];
            break;
          }
        }
      });
    }
  }
});

/*let get = firebase.database().ref('user');
function delok() {
  // on() method
  get.on('value', (snap) => {
    var json = snap.val();
    var id = Object.keys(json);
    var chats = Object.values(json);

    for (let i = 0; i < id.length; i++) {
      console.log(chats[i]['email']);
      console.log(chats[i]['password']);
    }
  });
}*/
