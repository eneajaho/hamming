// encrypting
var encryptBtn = document.getElementById('encrypt');

encryptBtn.addEventListener('click', function encrypt() {
  // gets the binary number from website
  var binary = document.getElementById("binary").value;

  // gets the parity
  if (document.getElementById("oddparity").checked) {
    parity = "odd";
  } else if (document.getElementById("evenparity").checked) {
    parity = "even";
  }

  // declares the length of the binary number
  codeLength = binary.length;

  // checks if the user has entered sth != 0 || 1
  checkInput(binary, codeLength);

  // checks how control bits should be included
  controlBits = controlBitsNr(codeLength);

  // declares the total encrypted bits number
  let totalBitNr = codeLength + controlBits;
  // // a simple alert to show how much bits we will have
  // let explain =
  //   "  <div class=' pl-5 pr-5 alert alert-info' role='alert'> We will have <strong>" +
  //   controlBits +
  //   "</strong> control bits, <br>and the encrypted code will have: <strong>" +
  //   totalBitNr +
  //   "</strong> bits! </div>";

  // // shows the alert
  // showText("explain", explain);

  // creates an array of bits
  let bits = [];
  // a - starts from 1 so we can use the powers of 2.
  // b - to add our bits, if we add bit, we increase b
  for (a = 1, b = 0; a <= totalBitNr; a++) {
    // if a it's 0 or power of two add x to array else add binary bit and increase b
    if (powerOfTwo(a) || a == 0) {
      bits.push("x");
    } else {
      bits.push(binary[b]);
      b++;
    }
  }

  selectControlBits(bits, totalBitNr);

  // creates a new array and starts the bits array from 1 so we can use the powers of 2
  newBits = [null];
  for (a = 0; a < totalBitNr; a++) {
    newBits.push(bits[a]);
  }

  // shows the number in the the webpage
  let coded = "<code> ";
  for (let a = 1; a <= totalBitNr; a++) {
    if (Math.log2(a) % 1 === 0 || a == 0) {
      element = "<div class='control-bit'> " + newBits[a] + " </div>";
    } else {
      element = newBits[a];
    }
    coded += element;
  }
  coded += "</code>";

  showText("coded", coded);
});

// selects control bits, so if bits[i] is x than we do the calculations and change the bit
function selectControlBits(bits, totalBitNr) {
  // bitcounter is used to count the control bits
  bitCounter = 0;
  for (i = 0; i <= totalBitNr; i++) {
    // a variable to store our info
    Info = "";
    // check if bit is x
    if (bits[i] == "x") {
      changedBit = changeControlBit(i, bits, totalBitNr, bitCounter);
      if (changedBit == 0) {
        bits[i] = 0;
      } else if (changedBit == 1) {
        bits[i] = 1;
      }
      // after we do the calculations we increase the bitcounter
      bitCounter++;
    }
  }
}

function changeControlBit(controlBitIndex, bits, totalBitNr, bitCounter) {
  let k = 0; // the number of ones
  let d = 0; // used to loop through the array

  for (c = controlBitIndex; c < totalBitNr; c++) {
    if (controlBitIndex == 0) {
      if (d % 2 == 0) {
        if (bits[c] == 1) {
          k++;
        }
      }
      d++;
    } else {
      if (d % (2 ** bitCounter * 2) < 2 ** bitCounter) {
        if (bits[c] == 1) {
          k++;
        }
      }
      d++;
    }
  }

  // if even parity is checked in UI than we will have even parity and the function wil return respective 1 and 0
  if (parity == "even") {
    if (k % 2 != 0) {
      return 1;
    } else {
      return 0;
    }
  }
  // if odd parity is checked in UI than we will have even parity and the function wil return respective 1 and 0
  if (parity == "odd") {
    if (k % 2 != 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
// source : https://stackoverflow.com/questions/30924280/what-is-the-best-way-to-determine-if-a-given-number-is-a-power-of-two

function powerOfTwo(x) {
  return Math.log2(x) % 1 === 0;
}

//accepts the code length to find the hamming code length
function controlBitsNr(length) {
  let a = 0;
  for (k = 0; k <= length; k++) {
    // 2 ^ k >= m + k + 1
    if (2 ** k >= length + k + 1) {
      a = k;
      break;
    }
  }
  if (a == 0) {
    let warning =
      "<div class='alert alert-warning alert-dismissible fade show' role='alert'>The script can't convert this number because it's too short. It should be 3 or more bits! Please fix it!<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button >" +
      "</div>";
    document.getElementById("error").innerHTML = warning;
  }
  return a;
}

function checkInput(binaryCode, length) {
  for (n = 0; n < length; n++) {
    if (binaryCode[n] != 0 && binaryCode[n] != 1) {
      let warning =
        "<div class='alert alert-warning' role='alert'>" +
        "The script can't convert: '" +
        binaryCode[n] +
        "' . Please remove it!" +
        "</div>";
      showText("error", warning);
    }
  }
}

// a function that accepts an id and text and
function showText(id, text) {
  id = String(id);
  document.getElementById(id).innerHTML = text;
}