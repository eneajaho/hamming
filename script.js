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
    "</strong> control bits, <br>because it proves the equation: " +
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

  selectControlBits(bits, totalBitNr);
  console.log(bits);
}

function selectControlBits(bits, totalBitNr) {
  bitCounter = 0;
  for (i = 0; i <= totalBitNr; i++) {
    // check if bit is x
    if (bits[i] == "x") {
      changedBit = changeControlBit(i, bits, totalBitNr, bitCounter);
      if (changedBit == 0) {
        bits[i] = 0;
      } else if (changedBit == 1) {
        bits[i] = 1;
      }
      bitCounter++;
    }
  }
}

function changeControlBit(controlBitIndex, bits, totalBitNr, bitCounter) {
  console.log("ControlBit Counter" + bitCounter);

  let k = 0; // the number of ones
  let d = 0; // used to loop through the array

  for (c = controlBitIndex; c < totalBitNr; c++) {
    if (controlBitIndex == 0) {
      if (d % 2 == 0) {
        console.log(d + " " + bits[c]);
        console.log("");
        if (bits[c] == 1) {
          k++;
        }
      }
      d++;
    } else {
      if (d % (2 ** bitCounter * 2) < 2 ** bitCounter) {
        console.log(d + " " + bits[c]);
        console.log("");

        if (bits[c] == 1) {
          k++;
        }
      }
      d++;
    }
  }

  if (k % 2 != 0) {
    return 1;
  } else {
    return 0;
  }

  // console.log(bits);
}

function powerOfTwo(x) {
  return Math.log2(x) % 1 === 0;
}
// source : https://stackoverflow.com/questions/30924280/what-is-the-best-way-to-determine-if-a-given-number-is-a-power-of-two

//accepts the code length to find the hamming code length
function controlBitsNr(length) {
  for (k = 0; k <= length; k++) {
    // 2 ^ k >= m + k + 1
    if (2 ** k >= length + k + 1) {
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
        binaryCode[n] +
        "' . Please remove it!" +
        "</div>";
      document.getElementById("error").innerHTML = warning;
    }
  }
}