let symbols = '~!@#$%^&*()_+{}|:<>?-=[];,./';
let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const similarChars = [0, 1, 9, 'g', 'i', 'I', 'l', 'o', 'O', 'q', '|'];
let generatedPassword = '';
let counter = 0;

function ascii(a) {
  return a.charCodeAt(0);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomCharacter(sameChar, seq) { //This function get char from chars array only (Notice chars array can be change) 
  if (chars.length == 0){
    if(symbols.length !=0){
      return getRandomSymbol(sameChar, seq);
    }
    else if (numbers.length !=0){
      return getRandomNumber(sameChar, seq);
    }
    else{

      return false;
    }
  }
  let charIndex = getRandomInt(chars.length);
  let char = chars[charIndex];
  if(seq && generatedPassword.charAt(generatedPassword.length - 1) == String.fromCharCode(ascii(char) - 1)){
    if(counter == 1)
    {
      const arr = [...generatedPassword]
      const prev = arr.splice(generatedPassword.indexOf(generatedPassword.length),1);  
      arr.push(char)
      return prev
    }

    if(chars.length == 1)
    return getRandomSymbol(sameChar, seq)
  else
    return getRandomCharacter(sameChar, seq)
  }
  if(sameChar){
    chars.splice(chars.indexOf(char),1);  
  }
  return char;
}

function getRandomSymbol(sameChar, seq) {
  if (symbols.length == 0){
    if(numbers.length !=0){
      return getRandomNumber(sameChar, seq);
    }
    else if (chars.length !=0){
      return getRandomCharacter(sameChar, seq);
    }
    else{
      return false;
    }

  }
  let index = getRandomInt(symbols.length);
  let symbol = symbols[index]

  if(sameChar){
    let array = [...symbols];
    array.splice(array.indexOf(symbol),1); 
    symbols = array.join(''); 
  }

  return symbol;
}

function getRandomNumber(sameChar, seq) {
  // if we are outer of numbers, call either of the other two functions
  if (numbers.length == 0){
    if(chars.length !=0){
      return getRandomCharacter(sameChar, seq);
    }
    else if (symbols.length !=0){
      return getRandomSymbol(sameChar, seq);
    }
    else{
      return false;
    }
  }
  // generate number
  let numIndex = getRandomInt(numbers.length);
  let num = numbers[numIndex];
  const prev = generatedPassword.charAt(generatedPassword.length - 1);
  if(seq && generatedPassword.charAt(generatedPassword.length - 1) == String.fromCharCode(ascii(num) - 1)){
    if(counter == 1)
    {
      const arr = [...generatedPassword]
      const prev = arr.splice(generatedPassword.indexOf(generatedPassword.length),1);  
      arr.push(num)
      return prev
    }
    if(numbers.length == 1)
      return getRandomCharacter(sameChar, seq)
    else
      return getRandomNumber(sameChar, seq)
  }
  if(sameChar){
    numbers.splice(numbers.indexOf(num),1);
  }
  return num;
}

function generateRandomPassword(
  noOfPasswords, // number of passwords to generate
  passwordLength, // length of password
  symbols_ = '~!@#$%^&*()_+{}|:<>?-=[];,./', // symbols to include
  similar, // 1, i, l, g, 9, 0 , o, O etc
  sameChar, //eq a55212a
  seq, //eq abc or 123
  begin,
  dontIncludeNumbers,
  dontIncludeLC,
  dontIncludeUC
) {
  symbols = symbols_;
  let funcs = [getRandomCharacter, getRandomNumber, getRandomSymbol];
  let generatedPasswords = [];
  let cnt = symbols.length + chars.length + numbers.length;

  if(dontIncludeLC && dontIncludeUC){
    funcs.splice(funcs.indexOf(getRandomCharacter),1);
    cnt -=chars.length;
  }
  else if (dontIncludeLC || dontIncludeUC){
    cnt -=(chars.length)/2;
  }
  if (dontIncludeNumbers){
    funcs.splice(funcs.indexOf(getRandomNumber),1);
    cnt -=numbers.length;  
  }
  
  
  if(symbols.length == 0){
    funcs.splice(funcs.indexOf(getRandomSymbol),1); 
  }

  if(funcs.length == 0){
    return ["Error: No Enough Sets Selected To Generate A Password"];
  }

  if(similar){
    cnt -= similarChars.length;
  }
  
  if(sameChar){
    if (cnt< passwordLength){
      return ["Error: No Enough Sets Selected To Generate A Password"];
    }
  }
  for (let i = 0; i < noOfPasswords; i++) {
    counter = cnt;
    if (dontIncludeLC){
      chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];  
    }
    else if (dontIncludeUC){
      chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];  
    }
    else if (dontIncludeLC && dontIncludeUC){
      chars =[];
    }
    else{
      chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    }
    symbols = symbols_;
    if(dontIncludeNumbers){
      numbers =[];
    }else{
      numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    }
    if(similar)
    {
      for(let ch = 0; ch < similarChars.length; ch++ )
      {
        const c = chars.indexOf(similarChars[ch])
        const n = numbers.indexOf(similarChars[ch]) 
        const s = symbols.indexOf(similarChars[ch]) 
        if(c != -1){
          chars.splice(c,1); 
        } 
        else if(n != -1){
          numbers.splice(n,1);
        }  
        else if(s != -1){
          const arr = [...symbols]
            arr.splice(s,1);  
            symbols = arr.join('')
          }
      }    
 
    }
    for (let j = 0; j < passwordLength; j++) {
      let char = '';
      if(j == 0 && begin && (!dontIncludeLC || !dontIncludeUC)){
        char = getRandomCharacter(sameChar, seq)
      }
      else{
      let func = funcs[getRandomInt(funcs.length)];
      char = func(sameChar, seq);
      }
      counter--;
      generatedPassword += char;

    }
    generatedPasswords.push(generatedPassword);
    generatedPassword = '';
  }  
  return generatedPasswords;
}
  // console.log(generateRandomPassword(
  //   150, // noOf Password
  //   90, // length of password
  //   "~!@#$%^&*()_+{}|:<>?-=[];,./", // symbols
  //   false, // similar
  //   true, // same char
  //   true, // seq
  //   true, // begin
  //   false, // dontIncludeNumber
  //   false, // dontIncludeLC
  //   false  // dontIncludeUC
  // ))