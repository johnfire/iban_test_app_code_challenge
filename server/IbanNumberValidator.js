import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
  console.log("is ibanhumber running ont he server ???? ")
  WebApp.connectHandlers.use('/checkIbanNumber', (req, res, next) => {
    console.log("!!!!!!here is the server trying to do something ", req)
    res.writeHead(200);
    res.end(`Hello world from: the server`);
    // req.on(
    //   'data',
    //   Meteor.bindEnvironment((data) => {
    //     console.log('here is the data ', data);
    //     let string = data.toString();
    //     const stringArray = string.split('application/json');
    //     const correctStringArray = stringArray[1].split('------');
    //     const possibleIbanNumber= JSON.parse(correctStringArray[0]);

    //     //  do something with the newDataObject;
    //     console.log("here is the possible iban number ", possibleIbanNumber)
    //   }),
    // );

    // req.on(
    //   'end',
    //   Meteor.bindEnvironment(() => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.writeHead(200);
    //     res.end(JSON.stringify({ status: 'ok' }));
    //   }),
    // );
  });
});