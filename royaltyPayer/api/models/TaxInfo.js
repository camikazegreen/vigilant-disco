/**
* TaxInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	taxType:{
  		type:'string',
  		enum:['domestic','intPerson','intEntity']
  	},
  	formUrl:{
  		type:'string'
  	},
  	formFd:{
  		type:'string'
  	},
  	legalname:{
  		type:'string'
  	},
  	businessname:{
  		type:'string'
  	},
  	taxID:{
  		type:'string'
  	},
  	address:{
  		model:'address'
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