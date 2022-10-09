import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { WebApp } from 'meteor/webapp';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {

  console.log("this is starting up on the server")
  
  WebApp.connectHandlers.use('/checkIbanNumber', (req, res) => {
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
  // If the Links collection is empty, add some data.
  })

  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
})
