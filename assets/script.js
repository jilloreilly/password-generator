// Array of special characters to be included in password
const specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Set variables
let pwdLength;
let possibleChar = [];
let guaranteedChar = [];

// Function to prompt user for password options
function getPasswordOptions() {

  possibleChar = []; // Reset array to empty
  guaranteedChar = [];

  pwdLength = parseInt(prompt("How many characters would you like your password to be? (Must be between 8 and 128)"));
  
  if (pwdLength < 8 || pwdLength > 128) { // Checks number entered is between 8 and 128
    alert("Invalid password length. Please enter a number between 8 and 128");
    return getPasswordOptions();
  }
  
  if (isNaN(pwdLength)=== true) { // Checks that the input is a number
    alert("Please enter a number");
    return getPasswordOptions(); 
  }
  
  // Ask user to select character sets
  let specialChar = confirm("Would you like special characters in your password?");
  let numericChar = confirm("Would you like numeric characters in your password?");
  let upperCaseChar = confirm("Would you like upper case characters in your password?");
  let lowerCaseChar = confirm("Would you like lower case characters in your password?");

  if (specialChar === false && numericChar === false && upperCaseChar === false && lowerCaseChar === false) { // If all options are false
    alert("Please ensure you have selected at least 1 character set");
    return getPasswordOptions();  
  }

  // Store password options in an object
  let pwOptions = {
    length: pwdLength,
    special: specialChar,
    number: numericChar,
    upper: upperCaseChar,
    lower: lowerCaseChar  
  }
   
  // If a character set is selected, concatenate that charset array to mega-array called possibleChar.
  //Also generate a random character and push to an array called guaranteedChar
  if (pwOptions.special) { 
    possibleChar = possibleChar.concat(specialCharacters); 
    const guaranteedSpecial = getRandomItem(specialCharacters);
    guaranteedChar.push(guaranteedSpecial);
  }

  if (pwOptions.number) {
    possibleChar = possibleChar.concat(numericCharacters);
    const guaranteedNumeric = getRandomItem(numericCharacters);
    guaranteedChar.push(guaranteedNumeric);
  }

  if (pwOptions.upper) {
    possibleChar = possibleChar.concat(upperCasedCharacters);
    const guaranteedUpper = getRandomItem(upperCasedCharacters);
    guaranteedChar.push(guaranteedUpper);
  }

  if (pwOptions.lower) {
    possibleChar = possibleChar.concat(lowerCasedCharacters);
    const guaranteedLower = getRandomItem(lowerCasedCharacters);
    guaranteedChar.push(guaranteedLower);
  }
    
  return pwOptions;
}

// Function for getting a random element from an array
function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex]; 
}

// Function to generate password with user input
function generatePassword() {
  const generatedPwdArr = []; // Declare variables inside function to prevent passwords appending when button is clicked again
  let generatedPwd = '';
  let options = getPasswordOptions();
  
  for (let i = 0; i < pwdLength; i++) {
    let element = getRandomItem(possibleChar);
    generatedPwdArr.push(element);  
  }
  
  generatedPwd = generatedPwdArr.join('');
  
  return generatedPwd;

}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);