# Changelog

**./test/index.js**
* New function 'handleInvalidTest'
	* Used to coordinate invalid unit tests of function.
	* Calls function using a `try-catch` structure, in order to catch the error.
	* Displays custom errors for when the desired results are not met.
* New function 'displayWrongError'
	* Fails the invalid unit test if the caught error does not match the expected.
	* Failure text is written on multiple lines.
	* Includes both the expected and actual error text.
