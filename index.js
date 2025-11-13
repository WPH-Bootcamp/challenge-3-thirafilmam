"use strict";

const prompt = require("prompt-sync")({ sigint: true });

// Input Angka untuk perhitungan
function getValidNumberInput(promptMessage) {
  let number;
  while (true) {
    //while true => unlimitid looping, selama return,break tidak ke triger
    const input = prompt(promptMessage).trim(); //trim=menghindari whitespace[spasi, tab, newline dll] tanpa mengubah value
    if (input.toLowerCase() === "stop") {
      return "stop";
    }

    const number = Number(input);
    if (input === "") {
      console.log(
        "Input tidak boleh kosong atau spasi. Silakan masukkan angka yang benar."
      );
      continue;
    }
    if (!isNaN(number))
      return number; //fungsi isnan => validasi user input angka
    else {
      console.log("Input tidak Valid, Masukkan angka yang benar"); //error log n handling
    }
  }
}

// Input Operator untuk operasi perhitungan
function getValidOperatorInput(promptMessage) {
  const validOperators = ["+", "-", "*", "%", "/", "**"]; //array operator
  while (true) {
    const input = prompt(promptMessage).trim();
    if (input.toLowerCase() === "stop") {
      return "stop";
    }

    if (validOperators.includes(input)) {
      return input;
    } else {
      console.log(
        "Operator tidak valid, Pilih salah satu dari (+, -, *, /, %, **)"
      );
    }
  }
}

//Operasi perhitungan dasar
function tambah(a, b) {
  return a + b;
}
function kurang(a, b) {
  return a - b;
}
function perkalian(a, b) {
  return a * b;
}
function pembagian(a, b) {
  return b === 0
    ? "Tidak bisa dibagi 0, bagi dengan bilangan lain lah !"
    : a / b;
}
function modulus(a, b) {
  return a % b;
}
function pangkat(a, b) {
  return a ** b;
}

// Perhitungan logika kalkulator nested function
function Logickalkulator(a, operator, b) {
  switch (operator) {
    case "+":
      return tambah(a, b);
    case "-":
      return kurang(a, b);
    case "*":
      return perkalian(a, b);
    case "/":
      return pembagian(a, b);
    case "%":
      return modulus(a, b);
    case "**":
      return pangkat(a, b);

    default:
      return "Error Operator tidak valid";
  }
}

//4. Analisis Hasil
function analisishasil(hasil) {
  if (typeof hasil === "number") {
    const tanda = hasil > 0 ? "positif" : hasil < 0 ? "negatif" : "nol";
    const tipe = Number.isInteger(hasil) //saya gunakan ternary operator agar lebih simple(tanpa menggunakan kondisional if else)
      ? "Bilangan bulat"
      : "Bilangan desimal";
    const GanjilGenap = hasil % 2 === 0 ? "genap" : "ganjil";
    console.log(
      `Hasil perhitungannya adalah bilangan:
  - ${tanda}
  - ${tipe}
  - ${GanjilGenap}`
    );
  }
}

// Kalkulator Model:looping
function LoopKalkulator() {
  console.clear();

  console.log(`-------------------------------`);
  console.log(`     Model : Loop Kalkulator`);
  console.log(`-------------------------------`);
  console.log(`(ketik stop untuk menghentikan proses)`);

  let hasil = getValidNumberInput("Masukkan angka : ");
  const historyHitung = [];
  let i = 0;

  if (hasil === "stop") {
    return;
  }
  while (true) {
    const angkaKedua = getValidNumberInput("Masukkan angka berikutnya : ");
    if (angkaKedua === "stop") {
      break;
    }

    const operator = getValidOperatorInput(
      "masukkan Operator (+, -, *, /, %, **) :"
    );

    if (operator === "stop") {
      break;
    }

    const hasilSebelum = hasil;

    hasil = Logickalkulator(hasil, operator, angkaKedua);
    console.log(`Hasil sementara : ${hasil}`);

    historyHitung.push(
      `${hasilSebelum} ${operator} ${angkaKedua} = ${hasil}, perhitungan ke-${++i}`
    );
  }
  console.clear();
  console.log("Riwayat Perhitungan : ");
  console.log(historyHitung);
  console.log(`Hasil Final : ${hasil}\n`);
  analisishasil(hasil);
  console.log(`kembali ke menu utama`);
}

//kalkulator batasan
function bataskalkulator() {
  console.clear();

  console.log(`---------------------------------------`);
  console.log(` Model : batas perhitungan Kalkulator`);
  console.log(`---------------------------------------`);
  console.log(`(ketik berapa batasan perhitunganya)`);
  let a = 0;
  const count = getValidNumberInput("Berapa kali ingin menghitung ? : ");
  if (count === "stop") {
    return;
  }

  let hasil = getValidNumberInput("Masukkan angka Pertama : ");
  if (hasil === "stop") {
    return;
  }
  const historyHitung = [];

  //perulangan sesuai batas perhitungan kalkulator
  for (let i = 1; i <= count; i++) {
    const angkaKedua = getValidNumberInput(`Masukkan angka ke-${a} : `);
    if (angkaKedua === "stop") {
      break;
    }

    const operator = getValidOperatorInput("Masukkan Operator : ");
    if (operator === "stop") {
      break;
    }
    const hasilSebelum = hasil;

    hasil = Logickalkulator(hasil, operator, angkaKedua);
    console.log(`Hasil sementara : ${hasil}`);

    historyHitung.push(
      `${hasilSebelum} ${operator} ${angkaKedua} = ${hasil}, perhitungan ke-${++a}`
    );
  }
  console.clear();
  console.log("Riwayat Perhitungan :");
  console.log(historyHitung);
  console.log(`Hasil Final : ${hasil}`);
  analisishasil(hasil);
  console.log("Kembali ke menu Utama");
}

// Main fungsi
console.clear();
function mainMenu() {
  while (true) {
    console.log(`
==============================
  MENU UTAMA KALKULATOR
==============================
1. Kalkulator Looping (berjalan terus)
2. Kalkulator Batas Perhitungan
3. Keluar
==============================                   
    `);
    const pilihmenu = prompt("Pilih Menu(1/2/3) : ").trim();
    switch (pilihmenu) {
      case "1":
        LoopKalkulator();
        break;
      case "2":
        bataskalkulator();
        break;
      case "3":
        console.log("\nTerima kasih telah menggunakan kalkulator ini!\n");
        return;
      default:
        console.clear();

        console.log("Pilihan menu tidak valid");
    }
  }
}

// run disini
console.clear();
mainMenu();
