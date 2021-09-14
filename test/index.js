const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const find = require("../submission");

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





function handleInvalidTest(dictArg, keyArg, desiredText, useExactQuote)
{
	var correctString = false;
	var resultFlag = -1;
	var flaggedText = "";
	
	try
	{
		find(dictArg, keyArg);
		resultFlag = -1;
	}
	catch(findErr)
	{
		correctString = findErr.message.startsWith(desiredText);
		resultFlag = Number(correctString);
		flaggedText = findErr.message;
	}
	
	if (resultFlag > 0)
	{
		expect(true).to.be.true;
	}
	else if (resultFlag === 0)
	{
		displayWrongError(desiredText, flaggedText, useExactQuote);
	}
	else
	{
		throw new Error("Function call was not supposed to be successful. An error should had been thrown.");
	}
	
}


function displayWrongError(expectMsg, actualMsg, exactQuote)
{
	var prepText = "";
	var ellipsis = "";
	
	if (exactQuote === true)
	{
		ellipsis = " [...]";
	}
	
	prepText += "Incorrect error message.\r\n";
	prepText = ["Expected: '", expectMsg, "'", ellipsis, "\r\n"].join("");
	prepText = ["Actual: '", actualMsg, "'"].join("");
	
	throw new Error(prepText);
}



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