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

//getting data keranjang

function ready() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var user = firebase.auth().currentUser;
      var keranjang = firebase.database().ref('keranjang/' + user.uid + '/');
      keranjang.on('value', (snap) => {
        var json = snap.val();
        if (json != null) {
          var idKeranjang = Object.keys(json);
          var dataKeranjang = Object.values(json);
          var item = document.getElementById('item');

          for (let y = 0; y < idKeranjang.length; y++) {
            item.innerHTML +=
              '<div class="row " id="t"> <div class="col-4"><img src="asset/Img/download.png" alt="" style="height: 100px;" class="img"></div> <div class="col"><div class="row "> <div class="col "><p class="namabarang">dsad</p> <p class="hargabarang">dadsa</p></div> </div></div> </div>';
          }

          var getImg = document.getElementsByClassName('img');
          var getNama = document.getElementsByClassName('namabarang');
          var getHarga = document.getElementsByClassName('hargabarang');
          for (var i = 0; i < getImg.length; i += 1) {
            getImg[i].src = dataKeranjang[i]['link'];
            getNama[i].innerHTML = dataKeranjang[i]['Pesanan'];
            getHarga[i].innerHTML = dataKeranjang[i]['harga'];
          }

          document.getElementById('jml').innerHTML =
            idKeranjang.length + ' ' + 'Produk';
          let total = 0;
          for (let p = 0; p < idKeranjang.length; p++) {
            var temp = parseInt(dataKeranjang[p]['harga']);
            total = total + temp;
          }
          document.getElementById('gratis').innerHTML = 'Gratis';
          document.getElementById('total').innerHTML = 'Rp. ' + total;
        }
      });
    } else {
      window.location.href = 'Login.html';
    }
  });
}

//hapus data keranjang

function hapusKeranjang() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var user = firebase.auth().currentUser;
      var keranjang = firebase.database().ref('keranjang/' + user.uid + '/');
      keranjang.remove();
      window.location.href = 'keranjang.html';
    }
  });
}

//next cekOut
function cekoutNext(x) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      if (document.getElementById('total').textContent == '') {
        alert('maaf keranjang anda masih kosong');
      } else {
        window.location.href = 'Checkout.html';
      }
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

function aksesKeranjang() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = 'keranjang.html';
    } else {
      window.location.href = 'Login.html';
    }
  });
}
