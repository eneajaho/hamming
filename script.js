// encrypting

function encrypt() {
  var binary = document.getElementById("binary").value;
  // console.log(binary[1]);

  codeLength = binary.length;

  // checks input for errors
  checkInput(binary, codeLength);

  // check how control bits should be included
  controlBits = controlBitsNr(codeLength);

  let explain =
    "  <div class='alert alert-info' role='alert'> There are <strong>" +
    codeLength +
    "</strong> bits, we will have <strong>" +
    controlBits +
    "</strong> control bits, <br>because the number <strong>" +
    controlBits +
    "</strong> proves the equation: " +
    " <br> 2^k >= m+k+1 <br> The encrypted code will have: <strong>" +
    (codeLength + controlBits) +
    "</strong> bits! </div>";

  document.getElementById("explain").innerHTML = explain;

  // creates an array of bits
  let totalBitNr = codeLength + controlBits;
  let bits = [];
  // a - starts from 1 so we can use the powers of 2.
  // b - to add our bits, if we add bit we increase b
  for (a = 1, b = 0; a <= totalBitNr; a++) {
    if (powerOfTwo(a) || a == 0) {
      bits.push("x");
    } else {
      bits.push(binary[b]);
      b++;
    }
  }

  console.log(bits);

  for (a = 0; a <= totalBitNr; a++) {
    // check if bit is x
    if (bits[a] == "x") {
      //console.log(a);

      // for the first bit of control
      if (a == 0) {
        k = 0;
        for (c = a; c <= totalBitNr; c++) {
          if (c % 2 == 0) {
            if (bits[c] == 1) {
              // console.log("c is: " + c + "  " + bits[c]);
              k++;
            }
          }
        }
        if (k % 2 != 0) {
          bits[a] = 1;
        }
        console.log(bits);
      }

      // for (c = a; c <= totalBitNr; c++) {
      //   k = 0;
      //   for (i = c; i < totalBitNr; i++) {
      //     console.log(i);

      //     // if (bits[i] == 1) {
      //     //   k++;
      //     // }
      //   }
      // }
    }
  }
}

function powerOfTwo(x) {
  return Math.log2(x) % 1 === 0;
}
// source : https://stackoverflow.com/questions/30924280/what-is-the-best-way-to-determine-if-a-given-number-is-a-power-of-two

//accepts the code length to find the hamming code length
function controlBitsNr(length) {
  for (k = 0; k <= length; k++) {
    // 2 ^ k >= m + k + 1
    if (Math.pow(2, k) >= length + k + 1) {
      a = k;
      break;
    }
  }
  return a;
}

// checks if the user has entered sth != 0 || 1
function checkInput(binaryCode, length) {
  for (n = 0; n < length; n++) {
    if (binaryCode[n] != 0 && binaryCode[n] != 1) {
      let warning =
        "<div class='alert alert-warning' role='alert'>" +
        "The script can't convert: '" +
        binaryCode.charAt(n) +
        "' . Please remove it!" +
        "</div>";
      document.getElementById("error").innerHTML = warning;
    }
  }
}
