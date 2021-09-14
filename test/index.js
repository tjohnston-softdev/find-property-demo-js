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


function handleInvalidTest(dictArg, keyArg, desiredText)
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
		displayWrongError(desiredText, flaggedText);
	}
	else
	{
		throw new Error("Function call was not supposed to be successful. An error should had been thrown.");
	}
	
}


function displayWrongError(expectMsg, actualMsg)
{
	var prepText = "";
	
	prepText += "Incorrect error message.\r\n";
	prepText = ["Expected: '", expectMsg, "'\r\n"].join("");
	prepText = ["Actual: '", actualMsg, "'"].join("");
	
	throw new Error(prepText);
}