const collRegex = /^([a-z0-9-_.$]+=[a-z0-9-_.$]+;)*([a-z0-9-_.$]+=[a-z0-9-_.$]+(;?))$/gi;
const targetRegex = /^[a-z0-9-_.$]+$/gi;
const maxLength = 300;
const allowedChars = "[a-z A-Z 0-9 - _ . $]";

/*
var example1 = find("firstName=john; lastName=smith; year=1882", "year");
var example2 = find("project=sub2pdf; ver=V3; id=45678", "ver");
var example3 = find("just=one", "one");
*/

// Main function.
function find(dictionary, targetKey)
{
	var prepDict = "";
	var prepTarget = "";
	var retrievedValue = null;
	
	// Read arguments and validate types.
	prepDict = readArgument(dictionary, "dictionary");
	prepTarget = readArgument(targetKey, "targetKey");
	
	// Validate input text.
	validateFormat(prepDict, collRegex, 0);
	validateFormat(prepTarget, targetRegex, 1);
	
	// Search for 'targetKey' and return corresponding value.
	retrievedValue = searchProperty(prepDict, prepTarget);
	return retrievedValue;
}


// Read argument and validate type.
function readArgument(argValue, argName)
{
	var strType = (typeof argValue === "string");
	var flagMsg = "";
	var readRes = "";
	
	if (strType === true && argValue.length > 0 && argValue.length <= maxLength)
	{
		// String valid - Remove all whitespace.
		readRes = argValue.replace(/\s+/g, "");
	}
	else if (strType === true && argValue.length > maxLength)
	{
		// String too long.
		flagMsg = argName + " string is too long.";
		throw new Error(flagMsg);
	}
	else
	{
		// Incorrect type.
		flagMsg = argName + " must be a valid, non-empty string.";
		throw new Error(flagMsg);
	}
	
	return readRes;
}


// Validate string format via RegEx.
function validateFormat(inpStr, regexObj, argIndex)
{
	var syntaxFlag = -1;
	
	if (inpStr.length > 0)
	{
		// String is not empty - compare to RegEx.
		syntaxFlag = inpStr.search(regexObj);
	}
	
	if (syntaxFlag !== 0)
	{
		// Invalid format
		flagMsg = writeFormatError(argIndex);
		throw new Error(flagMsg);
	}
}


// Search for target property in the dictionary and return it's value.
function searchProperty(dictString, tgtKey)
{
	var searchStr = "";
	var keyIndex = -1;
	var valStart = -1;
	var valEnd = -1;
	var canExtract = false;
	
	var searchRes = null;
	
	// Search for target key.
	searchStr = tgtKey + "=";
	keyIndex = dictString.indexOf(searchStr);
	
	
	if (keyIndex >= 0 && keyIndex < dictString.length)
	{
		// Key found - calculate value begin and end positions.
		valStart = keyIndex + searchStr.length;
		valEnd = dictString.indexOf(";", valStart);
		canExtract = true;
	}
	
	// Extract target value.
	if (canExtract === true && valEnd >= 0)
	{
		// Value ends with semicolon.
		searchRes = dictString.substring(valStart, valEnd);
	}
	else if (canExtract === true)
	{
		// Last value does not end with semicolon.
		searchRes = dictString.substring(valStart);
	}
	
	return searchRes;
}


// Write string format error text.
function writeFormatError(errType)
{
	var writeRes = "";
	
	if (errType === 0)
	{
		// dictionary
		writeRes += "Invalid 'dictionary' contents.\r\n";
		writeRes += "* Correct Format: 'firstName=john; lastName=smith; year=1882'\r\n";
		writeRes += "* Allowed characters: ";
		writeRes += allowedChars;
	}
	else if (errType === 1)
	{
		// targetKey
		writeRes += "Invalid 'targetKey' contents.\r\n";
		writeRes += "Must only use characters: ";
		writeRes += allowedChars;
	}
	
	return writeRes;
}