/**
* PaymentInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	hold:{
  		type:'boolean'
  	},
  	holdDetails:{
  		type:'string'
  	},
  	paymentType:{
  		type:'string',
  		enum:['directDeposit','check','intlWire']
  	},
  	payeeName:{
  		type:'string'
  	},
  	routing:{
  		type:'string'
  	},
  	account:{
  		type:'string'
  	},
  	bankName:{
  		type:'string'
  	},
  	accountType:{
  		type:'string',
  		enum:['checking','savings']
  	},
  	directDepositUrl:{
  		type:'string'
  	},
  	directDepositFd:{
  		type:'string'
  	},
  	payeeAddress:{
  		model:'address'
  	},
  	iban:{
  		type:'string'
  	},
  	bankAddress:{
  		model:'address'
  	},
  	swift:{
  		type:'string'
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

