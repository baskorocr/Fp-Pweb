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
      var user = firebase.auth().currentUser;

      if (user) {
        window.location.href = 'Dashboard_P.html';
      }
    } else {
      window.location.href = 'Login.html';
    }
  });
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
