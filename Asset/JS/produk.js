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
var barang = firebase.database().ref('barang');
var storage = firebase.storage();
let get = firebase.database().ref('user');
barang.on('value', (snap) => {
  var json = snap.val();
  var getIdBarang = Object.keys(json);
  var getValBarang = Object.values(json);

  for (let i = 0; i < getIdBarang.length; i++) {
    if (getValBarang[i]['katagori'] == 'pria') {
      var temp = i;
      pria(temp, getValBarang);
    }
  }
});

function pria(x, y) {
  document.getElementById('textP' + x).innerHTML = y[x]['barang'];
  document.getElementById('hargaP' + x).innerHTML = y[x]['harga'];
  var p = x;
  p = p + 1;
  var storageRef = storage.ref('barang/pria/' + x + '.jpg');
  storageRef.getDownloadURL().then((imgUrl) => {
    document.getElementById('imgP' + x).src = imgUrl;
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

//get order

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var addToCartButtons = document.getElementsByClassName('cekout');
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem =
    button.parentElement.parentElement.parentElement.parentElement
      .parentElement;
  var title = shopItem.getElementsByClassName('text')[0].innerText;
  var harga = shopItem.getElementsByClassName('harga')[0].innerText;
  var srcImg = shopItem.getElementsByClassName('foto')[0].src;
  alert('Pesanan anda sudah masuk dikeranjang');

  console.log(title, harga, srcImg);
  sendOrder(title, harga, srcImg);
}

function sendOrder(x, y, z) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var user = firebase.auth().currentUser;
      barang.on('value', (snap) => {
        var json = snap.val();
        var getIdBarang = Object.keys(json);
        var getValBarang = Object.values(json);

        for (let i = 0; i < getIdBarang.length; i++) {
          if (x == getValBarang[i]['barang']) {
            saveTransaksi(x, y, z, user.uid, localStorage.clickcount);
          }
        }
      });
    } else {
      alert('anda belum login');
      window.location.href = 'Login.html';
    }
  });
}

let keranjang = firebase.database();
function saveTransaksi(x, y, z, d, c) {
  let save = keranjang.ref('keranjang/' + d + '/').push();
  save.set({
    Pesanan: x,
    harga: y,
    link: z,
  });
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
