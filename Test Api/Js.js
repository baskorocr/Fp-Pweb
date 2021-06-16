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

let email = 'xzx@gmail.com';
let password = 'a676575';
let alamat = 'dsadsad';
let uid = 0;
let nama = '';
let nomerhp = '';

let db = firebase.database().ref('user');
function sendMessage(nama, email, password, alamat, nomerhp) {
  let newFormMessage = db.push();
  newFormMessage.set({
    nama: nama,
    email: email,
    password: password,
    alamat: alamat,
    nomerhp: nomerhp,
  });
}

let auth = firebase.auth();
function myFunction() {
  // harus direct ke dashboard, bila berhasil daftar
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      sendMessage(nama, email, password, alamat, nomerhp);
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
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

let get = firebase.database().ref('user');
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
}

function login() {
  var email = document.myform.username.value;
  var password = document.myform.password.value;

  get.on('value', (snap) => {
    var json = snap.val();
    var id = Object.keys(json);
    var chats = Object.values(json);

    for (let i = 0; i < id.length; i++) {
      if (email == chats[i]['email'] && password == chats[i]['password']) {
        alert('berhasil login');
        break;
      } else {
        alert('akun anda salah');
      }
    }
  });
}
