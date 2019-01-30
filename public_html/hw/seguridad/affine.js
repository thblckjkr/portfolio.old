/**
 * Affine Cipher Class.
 *
 * Class to cipher text using the affine method.
 * 
 * @version 0.0.1
 * @file   This files defines the AffineCipher class.
 * @author Teo Gonzalez Calzada [thblckjkr].
 */

var AffineCipher = function(){
   var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

   var a, b; // Where the keys will be stored. Private
   var validated = false; // Start as a non vaidated class

   /**
    * Set the keys to decipher the text.
    * 
    * @param   {number}    akey
    * @param   {number}    bkey
    * 
    * @returns {boolean}   [true] if worked, throws an error if not.
    */
   this.setKeys = function(akey, bkey){
      // Get the keys, check if are primes, and set if they are, throw an error if not
      if ( !isPrime(akey) || !isPrime(bkey) ){
         throw new Error('Keys aren\'t coprimes');
      }
      a = parseInt(akey); b = parseInt(bkey);
      validated = true;
      return true;
   }

   /**
    * Ciphers text using the affine cipher algorithm.
    * 
    * @param   {string} text  the text to cipher.
    * 
    * @returns {string} Returns the ciphered text, without spaces.
    */
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

   /**
    * Deciphers text using the affine cipher algorithm.
    * 
    * @param   {string} text  the text to be deciphered.
    * 
    * @returns {string} Returns the deciphered text, without spaces.
    */
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

   /**
    * Convert the given string into numbers of the defined alphabet.
    * 
    * @param  {string}  text
    * 
    * @returns {array}  Returns an array of numbers.
    */
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

   /**
    * Gets the inverse of the given number.
    * 
    * @param  {number}  a
    * 
    * @returns {number} 0 if the number can't be found, or the inverse.
    */
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

   /**
    * Check if the given number is prime.
    * 
    * @param  {number}     input
    * 
    * @returns {boolean}   [true] if the number is prime.
    */
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