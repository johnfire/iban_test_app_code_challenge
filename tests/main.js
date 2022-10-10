import assert from "assert";

import {checkIbanNumber} from'../server/IbanNumberValidator'

// these are automatically created by meteor, but it cannot hurt to leave them here.

describe("vatapp", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "vatapp");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});

// test for the iban function

describe("Check Iban Function", function (){
  it('works for valid data ', function (){
    const returnValues  = checkIbanNumber({number:"LI2101234012345678901"})
    assert.equal(returnValues.isCountryCodeValid, true)
    assert.equal(returnValues.isTwoDigitIdentifierValid, true)
    assert.equal(returnValues.isBankCodeValid, true)
    assert.equal(returnValues.isAccountCodeValid, true)
  })
  it('detects bad country code ', function (){
    const returnValues  = checkIbanNumber({number:"Li2101234012345678901"})
    assert.equal(returnValues.isCountryCodeValid, false)
   
  })
  it('detects bad 2 digit validation ID', function (){
    const returnValues  = checkIbanNumber({number:"LI2a01234012345678901"})
    assert.equal(returnValues.isTwoDigitIdentifierValid, false)
    
  })
  it('detects bad bank number ', function (){
    const returnValues  = checkIbanNumber({number:"LI2101a34012345678901"})
    assert.equal(returnValues.isBankCodeValid, false)
  })
  it('detects bad account number ', function (){
    const returnValues  = checkIbanNumber({number:"LI210123401234#678901"})
    assert.equal(returnValues.isAccountCodeValid, false)
  })

  it("detects a failure of length",function (){
    const returnValues  = checkIbanNumber({number:"LI2101901"})
    assert.equal(returnValues.isAccountCodeValid, false)
  })

})
