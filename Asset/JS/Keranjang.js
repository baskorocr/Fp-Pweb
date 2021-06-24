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

var get = firebase.database().ref('user');

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var user = firebase.auth().currentUser;
      var keranjang = firebase.database().ref('keranjang/' + user.uid + '/');
      keranjang.on('value', (snap) => {
        var json = snap.val();
        var idKeranjang = Object.keys(json);
        var dataKeranjang = Object.values(json);
        document.getElementById('jml').innerHTML =
          idKeranjang.length + ' ' + 'Produk';
        let total = 0;
        for (let p = 0; p < idKeranjang.length; p++) {
          var temp = parseInt(dataKeranjang[p]['harga']);
          total = total + temp;
        }
        document.getElementById('gratis').innerHTML = 'Gratis';
        document.getElementById('total').innerHTML = 'Rp. ' + total;
      });
    } else {
      window.location.href = 'Login.html';
    }
  });
}

//next cekOut
function cekoutNext() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = 'Checkout.html';
    } else {
      window.location.href = 'Login.html';
    }
  });
}

function akseslogin() {
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
            akses(temp);
            break;
          }
        }
      });
    } else {
      window.location.href = 'Login.html';
    }
  });
}
function akses(x) {
  get.on('value', (snap) => {
    var json = snap.val();
    var id = Object.keys(json);
    var chats = Object.values(json);
    var tampung = id[x];
    console.log(tampung);
    if (tampung == '-Mcc6ghIReVfGQ44tRtq') {
      window.location.href = 'Dashboard_A.html';
    } else {
      window.location.href = 'Dashboard_P.html';
    }
  });
}
