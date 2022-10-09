import { WebApp } from 'meteor/webapp';

function checkIbanNumber(possibleIbanNumber){
  let isCountryCodeValid = false
  let isTwoDigitIdentifierValid = false 
  let isBankCodeValid = false
  let isAccountCodeValid = false 

  const countryCode = possibleIbanNumber.number.slice(0,2)
  const twoDigitIdentifier = possibleIbanNumber.number.slice(2,4)
  const bankCode = possibleIbanNumber.number.slice(4,9)
  const accountNumber = possibleIbanNumber.number.slice(9)

  console.log("here are the parts" , 
    countryCode,
    twoDigitIdentifier,
    bankCode,
    accountNumber
  )

  if(countryCode ==="LI" ) isCountryCodeValid = true
  if(!isNaN(twoDigitIdentifier)) isTwoDigitIdentifierValid = true
  if(!isNaN(bankCode)) isBankCodeValid = true
  if (accountNumber.match(/^[0-9a-z]+$/)) isAccountCodeValid = true

  console.log("here are the tf values ", 
    isCountryCodeValid,
    isTwoDigitIdentifierValid,
    isBankCodeValid,
    isAccountCodeValid)

  return ({
    isCountryCodeValid,
    isTwoDigitIdentifierValid,
    isBankCodeValid,
    isAccountCodeValid
  })
}

Meteor.startup(() => {
  WebApp.connectHandlers.use('/checkIbanNumber', (req, res, next) => {
    let dataToReturn = {};
    req.on(
      'data',
      Meteor.bindEnvironment((data) => {
        let string = data.toString();
        const possibleIbanNumber= JSON.parse(string);
        console.log("SER here is the possible iban number ", possibleIbanNumber);
        // do the check
       dataToReturn = checkIbanNumber(possibleIbanNumber);
      })
    )

    req.on(
      'end',
      Meteor.bindEnvironment(() => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({ 
          status: 'ok', 
          bankData: dataToReturn
        }));
      }),
    );
  });
});