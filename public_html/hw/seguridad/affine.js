/**
 * Affine cipher class. (use period)
 *
 * Class to cipher text using the affine method. (use period)
 *
 * @file   This files defines the AffineCipher class.
 * @author Teo Gonzalez Calzada [thblckjkr].
 * @since  0.0.1
 */
/**
 * Affine Cipher.
 *
 * Class made to make the affine cipher, . (use period)
 *
 * @access     private
 *
 * @class
 * @see  Function/class relied on
 * @link URL
 * @global
 *
 * @param {type}   var           Description.
 * @param {type}   [var]         Description of optional variable.
 * @param {type}   [var=default] Description of optional variable with default variable.
 * @param {Object} objectVar     Description.
 * @param {type}   objectVar.key Description of a key in the objectVar parameter.
 * 
 * @return {type} Description.
 */
var AffineCipher = function(){
   var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

   var a, b; // Where the keys will be stored. Private
   var validated = false; // Start as a non vaidated class

   this.setKeys = function(key1, key2){
      // Get the keys, check if are primes, and set if they are, throw an error if not
      if ( !isPrime(key1) || !isPrime(key2) ){
         throw new Error('Keys aren\'t coprimes');
      }
      a = parseInt(key1); b = parseInt(key2);
      validated = true;
   }

   this.cipher = function(text){
      if(!validated)
         throw new Error("Keys undefined");

      var ciphered = [];

      // Remove spaces if is required
      text = text.replace(/\s/g, '');

      // Convert the text to numbers
      let numbers = toNumbers(text);

      // Convert the numbers to text
      for(let i = 0; i < numbers.length; i++){
         // Get the index of the ciphered letter
         let ci = (a * numbers[i] + b) % alphabet.length;
         // Get the letter and push it to the final
         ciphered.push( alphabet[ci] );
      }

      // Convert the array of letters to string
      return ciphered.join("");
   }

   this.decipher = function(enc){
      if(!validated)
         throw new Error("Key undefined");

      var deciphered = [];

      // a ^-1 = modular inverse
      let a_1 = findInverse(a);
      // a_1 = (a_1 < 0) ? a_1 * -1: a_1;

      // Convert the text to numbers
      let numbers = toNumbers(enc);

      //Convert the text to numbers
      for(let i = 0; i < numbers.length; i++){
         // Get the index of the ciphered letter
         // D(y) = a^-1 * (y - b) mod 26
         
         let ci = (numbers[i] - b + alphabet.length) * a_1 % alphabet.length
         // Get the letter and push it to the final
         deciphered.push( alphabet[ci] );
      }

      return deciphered.join("");
   }

   var toNumbers = function(text){
      var numbers = [];
      let letters = text.toLowerCase().split("");
      // Convert the letters to numbers
      for(let i= 0; i < letters.length; i++){
         let num = alphabet.indexOf(letters[i]);
         if( num < 0 ){
            // Replace the unknown letters for x
            num = alphabet.indexOf("x");
         }
         numbers.push(num);
      }
      return numbers;
   }

   var findInverse = function(a){
      for (var i = 1; i <= 100; i++)
      {
         if ((26 * i + 1) % a == 0)
         {
            return (26 * i + 1) / a;
         }
      }
      return 0;
   }

   var isPrime = function(input) {
      let prime = true;
      for (let i = 2; i <= Math.sqrt(input); i++) {
         if (input % i == 0) {
            prime = false;
            break;
         }
      }
      return prime && (input > 1);
   }
}