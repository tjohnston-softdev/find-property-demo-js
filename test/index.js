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