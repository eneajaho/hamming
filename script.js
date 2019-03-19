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

  console.log(bits);

  for (i = 0; i <= totalBitNr; i++) {
    // check if bit is x
    if (bits[i] == "x") {
      changeControlBit(i, bits, totalBitNr);
    }
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
        binaryCode[n] +
        "' . Please remove it!" +
        "</div>";
      document.getElementById("error").innerHTML = warning;
    }
  }
}

function changeControlBit(controlBitIndex, bits, totalBitNr) {
  // k is the number of ones
  k = 0;

  console.log("I ||  C || D || Bits[c] ||");
  // looping through the bits[] from controlBitIndex to the last bit
  for (c = controlBitIndex; c <= totalBitNr; c++) {
    // define d=0 to use it in the while loop

    d = 0;
    // while loop will go from 0 to controlBitIndex
    // ex: bit4 - 0-4, 1-4, 2-4, 3-4
    while (d <= controlBitIndex / Math.pow(2, controlBitIndex)) {
      // we will loop from 0 to controlBitIndex in order to use a as the mod
      // for (a = 0; a < controlBitIndex / 2; a++) {
      //   // ex. bit-4 .. we need to capture 4-5-6-7-12-13-14-15
      //   // so we take 4 and leave 4 bits
      if (c % controlBitIndex == d) {
        console.log(
          controlBitIndex + " || " + c + " || " + d + " || " + bits[c]
        );

        // if bit is 1 we increase k to get the number of ones
        if (bits[c] == 1) {
          // console.log("c is: " + c + "  " + bits[c]);
          k++;
        }
        //   }
      }
      d++;
    }
  }

  // if k is odd than control bit will be 1 else 0
  if (k % 2 != 0) {
    bits[controlBitIndex] = 1;
  } else {
    bits[controlBitIndex] = 0;
  }

  console.log(bits);
}
