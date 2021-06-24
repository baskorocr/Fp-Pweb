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

firebase.initializeApp(firebaseConfig);
var barang = firebase.database().ref('barang');
var storage = firebase.storage();
let get = firebase.database().ref('user');

var k = 0;
var j = 9;

barang.on('value', (snap) => {
  var json = snap.val();
  var getIdBarang = Object.keys(json);
  var getValBarang = Object.values(json);

  for (let i = 0; i < 2; i++) {
    let p = i;
    console.log(p);
    // 0 = baris awal pada tabel
    var table = document.getElementsByTagName('table')[0];

    // tambah baris kosong pada tabel
    // 0 = dihitung dari atas
    // table.rows.length = menambahkan pada akhir baris
    // table.rows.length/2 = menambahkan data pada baris tengah tabel , urutan baris ke 2
    var newRow = table.insertRow(table.rows.length / 2);

    for (let p = 0; p < 4; p++) {
      if (getValBarang[j]['katagori'] == 'wanita') {
        var cell = newRow.insertCell(p);

        // tambah nilai ke dalam cell
        cell.innerHTML =
          '<div class="card" style="width: 18rem"> <img id="imgP' +
          k +
          '" src="Asset/Img/download.png" class="card-img-top foto" alt="..." /> <div class="card-body"> <div class="row"> <div class="col r"> <h5 id="textP' +
          k +
          '" class="text"></h5> </div> </div> <div class="row"> <div class="col p">Rp.<h8 id="hargaP' +
          k +
          '" class="harga"></h8></div> <div class="col t"> <button type="button" class="btn cekout"> <i class="fas fa-shopping-cart fa-2x" style="color: #269fd2" ></i> </button> </div> </div> </div> </div>';
        document.getElementById('textP' + k).innerHTML =
          getValBarang[j]['barang'];
        document.getElementById('hargaP' + k).innerHTML =
          getValBarang[j]['harga'];

        var storageRef = storage.ref('barang/wanita/' + j + '.jpg');
        storageRef.getDownloadURL().then((imgUrl) => {
          document.getElementById('imgP' + k).src = imgUrl;
        });
        k++;
        j++;
      }
    }
    // tambah cell pada baris baru
  }
});

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
