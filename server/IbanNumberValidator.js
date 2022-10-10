import { WebApp } from 'meteor/webapp';

// this could be put in a seperate file, called service or something, 
// given how small this program is I dont think its a good idea to do that
// readablity is better like this.

 export function checkIbanNumber(possibleIban){
  let isCountryCodeValid = false;
  let isTwoDigitIdentifierValid = false ;
  let isBankCodeValid = false;
  let isAccountCodeValid = false ;

  const countryCode = possibleIban.number.slice(0,2);
  const twoDigitIdentifier = possibleIban.number.slice(2,4);
  const bankCode = possibleIban.number.slice(4,9);
  const accountNumber = possibleIban.number.slice(9);

  if(countryCode ==="LI" ) isCountryCodeValid = true;
  if(!isNaN(twoDigitIdentifier)) isTwoDigitIdentifierValid = true;
  if(!isNaN(bankCode)) isBankCodeValid = true;
  if (accountNumber.match(/^[0-9a-z]+$/) && accountNumber.length === 12) isAccountCodeValid = true;

  return ({
    isCountryCodeValid,
    isTwoDigitIdentifierValid,
    isBankCodeValid,
    isAccountCodeValid
  });
}

Meteor.startup(() => {
  WebApp.connectHandlers.use('/checkIbanNumber', ( req, res ) => {
    let dataToReturn = {};
    req.on(
      'data',
      Meteor.bindEnvironment((data) => {
        let string = data.toString();
        const possibleIbanNumber= JSON.parse(string);
        dataToReturn = checkIbanNumber(possibleIbanNumber);
      })
    );

    req.on(
      'end',
      Meteor.bindEnvironment(() => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({ 
          status: 'ok', 
          bankData: dataToReturn
        }));
      })
    );
  });
});