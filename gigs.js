Companies = new Meteor.Collection("companies");

if (Meteor.isClient) {

  Template.gigs.companies = function(){
    return Companies.find({});
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {

    if (Companies.find().count() < 2){

      Companies.insert({name: "Hendrick", website: "http://www.hendrick.com", location: "Charlotte, NC"});
      Companies.insert({name: "Premier", website: "http://www.premierin.com", location: "Charlotte, NC"});

    }



  });
}
