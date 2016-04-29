/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	firstname:{
  		type:'string'
  	},
  	lastname:{
  		type:'string'
  	},
  	entityname:{
  		type:'string'
  	},
  	pka:{
  		type:'string'
  	},
  	email:{
  		type:'string',
  		email:true
  	},
  	phone:{
  		type:'string'
  	},
  	address:{
  		model:'address'
  	},
  	company:{
  		type:'string',
  		enum:['1630','ArtistShare','Crowded Air','Fanatic','Gallops','Goodnight Records','Light In The Attic','A Side Music','Second Floor Music','Shlomo Diego','Superior Music','TRIBO Music','United For Opportunity','other']
  	},
  	clientrep:{
  		type:'string'
  	},
  	startdate:{
  		type:'string'
  	},
  	enddate:{
  		type:'string'
  	},
  	controlled:{
  		type:'boolean'
  	},
  	syncrights:{
  		type:'boolean'
  	},
  	managerok:{
  		type:'boolean'
  	},
  	fullcatalog:{
  		type:'boolean'
  	},
  	digitalstatements:{
  		type:'boolean'
  	},
  	cc:{
  		type:'json'
  	},
  	inband:{
  		type:'boolean'
  	},
  	band:{
  		collection:'band',
  		via:'members'
  	},
  	notes:{
  		model:'notes'
  	},
  	mmid:{
  		type:'string'
  	},
  	qbid:{
  		type:'string'
  	},
  	musicbrainzid:{
  		type:'string'
  	},
  	echonestid:{
  		type:'string'
  	},
  	songkickid:{
  		type:'string'
  	},
  	taxinfo:{
  		model:'taxInfo'
  	},
  	paymentinfo:{
  		model:'paymentInfo'
  	}
  },
  updateOrCreate: function(criteria, values, cb){
      var self = this; // reference for use by callbacks
      // If no values were specified, use criteria
      if (!values) values = criteria.where ? criteria.where : criteria;

      this.findOne(criteria, function (err, result){
        if(err) return cb(err, false);

        if(result){
          self.update(criteria, values, cb);
        }else{
          self.create(values, cb);
        }
      });
    }
};

