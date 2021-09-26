const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const find = require("../submission");

/* Begin unit tests */

describe("Example Input", function()
{
	it("Example 1", function()
	{
		var retVal = find("firstName=john; lastName=smith; year=1882", "year");
		expect(retVal).to.equal("1882");
	});
	
	it("Example 2", function()
	{
		var retVal = find("project=sub2pdf; ver=V3; id=45678", "ver")
		expect(retVal).to.equal("V3")
	});
	
	it("Example 3", function()
	{
		var retVal = find("just=one", "one")
		expect(retVal).to.be.null;
	});
	
});


describe("Valid Rules", function()
{
	it("Leading Whitespace", function()
	{
		var retVal = find("     whitespace=true;     ", "trim");
		expect(retVal).to.be.null;
	});
	
	it("Content Whitespace", function()
	{
		var retVal = find("Full Name = John Smith; included=true;", "FullName");
		expect(retVal).to.equal("JohnSmith");
	});
	
	it("Optional Space Between Properties", function()
	{
		var spaceIncluded = find("id=123; firstName=Bret;", "id");
		var spaceIgnored = find("lastName=Foucar;gender=M;", "gender");
		
		expect(spaceIncluded).to.equal("123");
		expect(spaceIgnored).to.equal("M");
	});
	
	it("Last Semicolon Optional", function()
	{
		var semicolonIncluded = find("user=bfoucar2; age=28", "age");
		var semicolonIgnored = find("user=cglyne0; age=34;", "user");
		
		expect(semicolonIncluded).to.equal("28");
		expect(semicolonIgnored).to.equal("cglyne0");
	});
	
	it("Missing Property", function()
	{
		var retVal = find("animal=cat; noise=meow", "speed");
		expect(retVal).to.be.null;
	});
	
	it("Duplicate Keys", function()
	{
		var retVal = find("data=one; data=two; data=three", "data");
		expect(retVal).to.equal("one");
	});
	
});



describe("Invalid Arguments", function()
{
	it("Type", function()
	{
		handleInvalidTest(null, "xyz", "dictionary must be a valid, non-empty string.", true);
	});
	
	it("Empty", function()
	{
		handleInvalidTest("xyz", "", "targetKey must be a valid, non-empty string.", true);
	});
	
	it("Length", function()
	{
		var longString = writeLongString();
		handleInvalidTest(longString, null, "dictionary string is too long.", true);
	});
	
});


describe("Invalid Contents", function()
{
	var commonErr = "Invalid 'dictionary' contents.";
	
	it("Whitespace Only", function()
	{
		handleInvalidTest("      ", "xyz", commonErr, false);
	});
	
	it("Invalid characters", function()
	{
		handleInvalidTest("correct=text;", "!@#$%^&*", "Invalid 'targetKey' contents.", false);
	});
	
	it("Missing Property", function()
	{
		handleInvalidTest("=noprop;included=true;", "xyz", commonErr, false);
	});
	
	it("Missing Value", function()
	{
		handleInvalidTest("novalue=;included=true;", "xyz", commonErr, false);
	});
	
	it("Missing Equals", function()
	{
		handleInvalidTest("name:john;included=true;", "xyz", commonErr, false);
	});
	
	it("Missing Semicolon", function()
	{
		handleInvalidTest("semicolons=bad:included=true;", "xyz", commonErr, false);
	});
	
});


/* End unit tests */



// Performs unit test for invalid function call.
function handleInvalidTest(dictArg, keyArg, desiredText, useExactQuote)
{
	var correctString = false;
	var resultFlag = -1;
	var flaggedText = "";
	
	try
	{
		// Attempt function - Must not be successful.
		find(dictArg, keyArg);
		resultFlag = -1;
	}
	catch(findErr)
	{
		// Caught error safely - Check if messages match.
		correctString = findErr.message.startsWith(desiredText);
		resultFlag = Number(correctString);
		flaggedText = findErr.message;
	}
	
	if (resultFlag > 0)
	{
		// Error string valid.
		expect(true).to.be.true;
	}
	else if (resultFlag === 0)
	{
		// Wrong error caught.
		displayWrongError(desiredText, flaggedText, useExactQuote);
	}
	else
	{
		// No error caught.
		throw new Error("Function call was not supposed to be successful. An error should had been thrown.");
	}
	
}


// Writes failure text for incorrect error caught.
function displayWrongError(expectMsg, actualMsg, exactQuote)
{
	var prepText = "";
	var ellipsis = "";
	
	// Add ellipsis dots to expected error message if need be.
	if (exactQuote !== true)
	{
		ellipsis = " [...]";
	}
	
	// Write text line-by-line.
	prepText += "Incorrect error message.\r\n";
	prepText += ["Expected: '", expectMsg, "'", ellipsis, "\r\n"].join("");
	prepText += ["Actual: '", actualMsg, "'"].join("");
	
	// Display.
	throw new Error(prepText);
}



// Writes really long string for character limit unit test.
function writeLongString()
{
	var longRes = "";
	
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	longRes += "the quick brown fox jumps over the lazy dog";
	
	return longRes;
}