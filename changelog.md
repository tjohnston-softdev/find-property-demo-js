# Changelog

**./test/index.js**
* New function 'writeLongString'
	* Used to write a really long text string for the corresponding unit test.
	* Maximum limit is 300 characters.
	* This string has 430 characters.
* Wrote unit tests for invalid arguments.
	* Different type.
	* Empty string.
	* Long string.
* Changes to 'displayWrongError'
	* Declared 'exactQuote' parameter.
	* Declared 'ellipsis' variable.
	* If 'exactQuote' is true, add ellipsis dots to the "Expected" line.
* Changes to 'handleInvalidTest'
	* Declared 'useExactQuote' parameter.
	* 'useExactQuote' is an argument for calling 'displayWrongError'