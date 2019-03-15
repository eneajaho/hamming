// encrypting

function encrypt() {
  var binary = document.getElementById("binary").value;
  // console.log(binary[1]);

  codeLength = binary.length;
  errors = 0;
  for (n = 0; n < codeLength; n++) {
    if (binary[n] == 0 || binary[n] == 1) {
      errors++;
    }
    if (binary[n] != 0 || binary[n] != 1) {
      let warning =
        "<div class='alert alert-warning' role='alert'>" +
        "The script can't convert: '" +
        binary.charAt(n) +
        "' . Please remove it!" +
        "</div>";
      document.getElementById("error").innerHTML = warning;
    }

  }

  // check how control bits should be included
  controlBits = 0;
  for (k = 0; k < codeLength; k++) {
    // 2 ^ k >= m + k + 1
    if (Math.pow(2, k) >= codeLength + k + 1) {
      controlBits = k;
      break;
    }
  }

  let explain = "  <div class='alert alert-info' role='alert'> There are <strong>" + codeLength + "</strong> bits, so we will have <strong>" + controlBits + "</strong> control bits. Because the number <strong>" + controlBits + "</strong> proves the equation " + " <br> 2^k >= m+k+1 </div>";

  document.getElementById("explain").innerHTML = explain;


  console.log(controlBits);




}




// function getWord() {
//   var word = document.getElementById("word").value;
//   word = word.toUpperCase();

//   // define a word array
//   let wordS = [];
//   //   console.log(word);
//   wordLength = word.length;
//   //   console.log(wordLength);

//   for (i = 0; i < wordLength; i++) {
//     // console.log(word.charAt(i));
//     let errorChar = 0;
//     for (j = 0; j < 29; j++) {
//       if (word.charAt(i) == char[j]) {
//         wordS.push(Binary[j]);
//         errorChar++;
//       }
//     }
// if (errorChar == 0) {
//   let warning =
//     "<div class='alert alert-warning' role='alert'>" +
//     "The script can't convert: '" +
//     word.charAt(i) +
//     "' for the moment! Please remove it!" +
//     "</div>";
//   document.getElementById("error").innerHTML = warning;
// }
// }

//   let coded = [];
//   for (m = 0; m < wordLength; m++) {
//     for (n = 0; n < 5; n++) {
//       coded.push(wordS[m][n]);
//       //   console.log(wordS[m][n]);
//     }
//   }
//   // console.log(coded);
//   codedText = "<code>";
//   for (l = 0; l < wordLength * 5; l++) {
//     if (l % 5 == 4 && l != 0) {
//       codedText += " " + coded[l] + "&ensp;";
//       continue;
//     }
//     codedText += " " + coded[l];
//   }
//   codedText += "</code>";

//   document.getElementById("coded").innerHTML = codedText;
// }

// let decoded = "";

// // get the word
// function turnBack() {
//   var code = document.getElementById("code").value;
//   code = code.toUpperCase();
//   code = code.replace(/\s+/g, "");

//   //   console.log(code);
//   codeLength = code.length;

//   if (codeLength % 5 != 0) {
//     document.getElementById("code").value = "Your code isn't correct";
//   } else {
//     // console.log(codeLength);
//     let karaktere = codeLength / 5;

//     let codeS = [];

//     for (i = 0; i < 29; i++) {
//       // k to count if 5 bits are the same if yes add to array
//       let k = 0;
//       for (j = 0; j < 5; j++) {
//         if (code[j] == Binary[i][j]) {
//           k++;
//         }
//       }
//       if (k == 5) {
//         codeS.push(i);
//         // console.log("We got sth");
//       }
//     }
//     // console.log(codeS);

//     decodedText = "<code>";
//     for (m = 0; m < codeLength / 5; m++) {
//       decodedText += " " + char[codeS[m]];
//       decoded += " " + char[codeS[m]];
//       //   console.log(char[codeS[m]]);
//     }
//     decodedText += "</code>";

//     document.getElementById("decoded").innerHTML = decoded;
//   }
// }