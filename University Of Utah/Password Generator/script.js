var generateBtn = document.querySelector("#generate"); // Get reference to the #generate element
generateBtn.addEventListener("click", writePassword); // Add event listener to generate button

function generatePassword(lowercase, uppercase, numbers, special, passwordlength){
  var bank=""; // Creates empty bank of characters and adds to it based on paremeters
  if(lowercase){bank+="abcdefghijklmnopqrstuvwxyz";}
  if(uppercase){bank+="ABCDEFGHIJKLMNOPQRTSTUVWXYZ";}
  if(numbers){bank+="0123456789";}
  if(special){bank+="!@#$%^&*";}
  var password=""; //loops through entire thing 
  for(var i=0;i<passwordlength;i++){
    password+=(bank.charAt(Math.floor(Math.random()*bank.length)));}
  return(password);
}

function writePassword() { 
  var lowercase = prompt("Do you want lowercase characters? (y/n)"); lowercase=(lowercase=="y");
  var uppercase = prompt("Do you want uppercase characters? (y/n)"); uppercase=(uppercase=="y");
  var numbers = prompt("Do you want numbers included? (y/n)"); numbers=(numbers=="y");
  var special = prompt("Do you want special character? (y/n)"); special=(special=="y");
  var passwordlength = prompt("Do you want lowercase characters? (8-128)");
  if(passwordlength<8){passwordlength=8;}
  if(passwordlength>128){passwordlength=128;}
  var password = generatePassword(lowercase,uppercase,numbers,special,passwordlength);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}





