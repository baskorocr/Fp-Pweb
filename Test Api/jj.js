// untuk ambil nilai pada input
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

  for (let p = 0; p < 5; p++) {
    var cell = newRow.insertCell(p);

    // tambah nilai ke dalam cell
    cell.innerHTML =
      '<div class="col"> <div class="card" style="width: 18rem"> <img id="imgP' +
      p +
      '" src="Asset/Img/download.png" class="card-img-top foto" alt="..." /> <div class="card-body"> <div class="row"> <div class="col r"> <h5 id="textP0"></h5> </div> </div> <div class="row"> <div class="col p">Rp.<h8 id="hargaP0"></h8></div> <div class="col t"> <p class="text-end"> <a href="#" ><i class="fas fa-shopping-cart fa-2x" style="color: #269fd2" ></i ></a> </p> </div> </div> </div> </div> </div>';
  }
  // tambah cell pada baris baru
}
