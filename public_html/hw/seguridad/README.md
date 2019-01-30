
# Affine cipher
Class to cipher text using the affine

## How to use it?
```js
var  c = new  AffineCipher();

c.setKeys(3, 5);
c.cipher("Una papa empapada");
c.decipher("nsfyfyfrpyfyfof");
```
## Class description
<dl>
<dt><a  href="#cipher">cipher(text)</a> ⇒ <code>string</code></dt>
<dd><p>Ciphers text using the affine cipher algorithm.</p>
</dd>
<dt><a  href="#decipher">decipher(text)</a> ⇒ <code>string</code></dt>
<dd><p>Deciphers text using the affine cipher algorithm.</p>
</dd>
<dt><a  href="#setKeys">setKeys(akey, bkey)</a> ⇒ <code>boolean</code></dt>
<dd><p>Set the keys to decipher the text.</p>
</dd>
</dl>

<a  name="cipher"></a>
## cipher(text) ⇒ <code>string</code>

Ciphers text using the affine cipher algorithm.

  

**Kind**: class member function
**Returns**: <code>string</code> - Returns the ciphered text, without spaces.

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text to cipher. |

<a  name="decipher"></a>
## decipher(text) ⇒ <code>string</code>

Deciphers text using the affine cipher algorithm.

**Kind**: class member function
**Returns**: <code>string</code> - Returns the deciphered text, without spaces.

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text to be deciphered. |

<a  name="setKeys"></a>
## setKeys(akey, bkey) ⇒ <code>boolean</code>

Set the keys to decipher the text.

**Kind**: global function
**Returns**: <code>boolean</code> - [true] if worked, throws an error if not.

| Param | Type |
| --- | --- |
| akey | <code>number</code> |
| bkey | <code>number</code> |