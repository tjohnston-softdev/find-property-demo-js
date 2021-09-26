# Find Property Assessment

### Problem

Using Node JS, implement a function called 'find' that takes two string arguments: 'dictionary' and 'targetKey'.

'dictionary' is a string representing a list of key-value pairs where each pair is separated by a semicolon and a space ("; "). Properties and values are separated by the equals symbol ("=")

'targetKey' is an alphanumeric sequence of characters representing a property name that may or may not exist in 'dictionary'.

If the 'targetKey' property is found in 'dictionary', return the corresponding value. Otherwise, return null.

#### Example 1

```javascript
find("firstName=john; lastName=smith; year=1882", "year");
// Output: "1882"
```

#### Example 2

```javascript
find("project=sub2pdf; ver=V3; id=45678", "ver");
// Output: "V3"
```

#### Example 3

```javascript
find("just=one", "one");
// Output: null
```

### Notes

* Do not use any 3rd-party libraries.
* Use comments as needed to explain your solution.
* If you choose to copy significant amounts of code from an online source, put a comment in your code citing the original URL.
* You will not be penalised if your function throws an error due to incorrect argument types. (eg. Numbers instead of strings)

---

# Implementation Details

* Input validation rules:
	* Both arguments must be non-empty strings with 300 characters or less.
	* Both keys and values can only contain: [a-z A-Z 0-9 - _ . $]
	* Keys and values are separated by the equals sign, and are case-sensitive.
	* Keys with empty values are not allowed.
	* Individual key-value properties are separated with a semicolon, the final being optional.
	* Whitespace is ignored but it still counts against the character limit.
	* Duplicate keys are allowed but they are ignored. The first one takes priority.
* Custom errors are thrown for different invalid input cases.
* Although the submission does not use any 3rd-party libraries, installing [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) was necessary to implement unit testing for the public release.
