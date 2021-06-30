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

      get.on('value', (snap) => {
        var json = snap.val();
        var userId = Object.keys(json);
        var userVal = Object.values(json);
        var nama = document.getElementById('nama');
        var alamat = document.getElementById('alamat');
        var notelp = document.getElementById('notelp');
        for (let i = 0; i < userId.length; i++) {
          if (user.uid == userVal[i]['uid']) {
            console.log(userId[i]);
            nama.value = userVal[i]['nama'];
            alamat.value = userVal[i]['alamat'];
            notelp.value = userVal[i]['nomerhp'];
          }
        }
      });
    }
  });
}

function sendTransaksi() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var user = firebase.auth().currentUser;
      var keranjang = firebase.database().ref('keranjang/' + user.uid + '/');
      keranjang.on('value', (snap) => {
        var json = snap.val();
        var idKeranjang = Object.keys(json);
        var dataKeranjang = Object.values(json);
        for (let y = 0; y < idKeranjang.length; y++) {
          var pesanan = dataKeranjang[y]['Pesanan'];
          var harga = dataKeranjang[y]['harga'];
          var link = dataKeranjang[y]['link'];
          Transaksi(pesanan, harga, link);
        }

        keranjang.remove();
        swal({
          title: 'Cek Whatsapp anda!',
          icon: 'info',
          text: 'kami akan mengirim notifikasi pembayaran',
          button: false,
        });
        setTimeout(function () {
          window.location.href = 'index.html';
        }, 4000);
      });
    }
  });
}

function Transaksi(x, y, z) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var e = document.getElementById('kurir');
      var kurir = e.options[e.selectedIndex].value;
      var d = document.getElementById('payment');
      var transaksi = d.options[d.selectedIndex].value;
      var catatan = document.getElementById('catatan').value;
      var nama = document.getElementById('nama').value;
      var alamat = document.getElementById('alamat').value;
      var nomer = document.getElementById('notelp').value;
      var user = firebase.auth().currentUser;
      var sendTransaksi = firebase
        .database()
        .ref('transaksi/' + user.uid + '/')
        .push();

      sendTransaksi.set({
        nama: nama,
        alamat: alamat,
        nomertelp: nomer,
        pesanan: x,
        harga: y,
        kurir: kurir,
        catatan: catatan,
        link: z,
        payment: transaksi,
      });
    }
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
