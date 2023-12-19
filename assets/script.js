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
// You can store the generatedPassword as a string and concat each character OR
// !as an array and push each character, then join once you have enough characters

// Function to prompt user for password options
function getPasswordOptions() {

  // !Prompt for password length
  // !At least 8 characters, no more than 128 characters
  // !Conditional to check that the number that was entered is in range
  // !Prompts store data as strings, so need to parse into a number
  // !If the user's input is out of range, either return out of the function or call the function again

  // !Confirm which character sets to use
  // !If the user answers false for all, either return out of the function or call the function again
  
  // !Once they select a character set:
  // !Generate a random character for each selected character set
  // !Either push selected character sets to a mega-array of all selected characters
  // OR you can keep the arrays separate and generate a random number to select the array and another to select the index
  
  // !Once character sets are selected, move on to generating random characters

  possibleChar = []; // Reset array to empty
  guaranteedChar = [];

  pwdLength = parseInt(prompt("How many characters would you like your password to be? (Must be between 8 and 128)"));
  
  if (pwdLength < 8 || pwdLength > 128) { // Checks number entered is between 8 and 128
    alert("Invalid password length. Please enter a number between 8 and 128");
    return getPasswordOptions();
  }
  console.log(`Password length: ${pwdLength}`);

  if (isNaN(pwdLength)=== true) { // Checks that the input is a number
    alert("Please enter a number");
    return getPasswordOptions(); 
  }
  
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

  console.log(`Password length: ${pwdLength} and password options: 
  special char: ${pwOptions.special}
  numbers: ${pwOptions.number}
  uppercase: ${pwOptions.upper}
  lowercase: ${pwOptions.lower}`);
   
  // If a character set is selected, concatenate that charset array to mega-array called possibleChar.
  //Also generate a random character and push to an array called guaranteedChar
  if (pwOptions.special) { 
    possibleChar = possibleChar.concat(specialCharacters); 
    const guaranteedSpecial = getRandomItem(specialCharacters);
    console.log(`Random guaranteed special character: ${guaranteedSpecial}`)
    guaranteedChar.push(guaranteedSpecial);
  }

  if (pwOptions.number) {
    possibleChar = possibleChar.concat(numericCharacters);
    const guaranteedNumeric = getRandomItem(numericCharacters);
    console.log(`Random guaranteed numeric character: ${guaranteedNumeric}`)
    guaranteedChar.push(guaranteedNumeric);
  }

  if (pwOptions.upper) {
    possibleChar = possibleChar.concat(upperCasedCharacters);
    const guaranteedUpper = getRandomItem(upperCasedCharacters);
    console.log(`Random guaranteed uppercase character: ${guaranteedUpper}`)
    guaranteedChar.push(guaranteedUpper);
  }

  if (pwOptions.lower) {
    possibleChar = possibleChar.concat(lowerCasedCharacters);
    const guaranteedLower = getRandomItem(lowerCasedCharacters);
    console.log(`Random guaranteed lower character: ${guaranteedLower}`)
    guaranteedChar.push(guaranteedLower);
  }
  
  console.log(`Possible characters: ${possibleChar}`);
  console.log(`Guaranteed characters: ${guaranteedChar}`);
  
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

 // Add a for loop here
 // Need a variable to hold the password as it's being generated
  // Need a variable to hold the index that's being generated

  // For loop that loops the number of times that matches the length the user chose
  // Generate a random number
  // That number is the index for a character in the mega-array
  // So then, mega-array[generated-index] is the actual character
  // Add that character to the password

  // Once we finish the for loop, return the generated password
  
  for (let i = 0; i < pwdLength; i++) {
    let element = getRandomItem(possibleChar);
    generatedPwdArr.push(element);  
  }
  console.log(generatedPwdArr);
  generatedPwd = generatedPwdArr.join('');
  console.log(`Generated password: ${generatedPwd}`);

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