/**
* Address.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    line1:{
      type:'string'
    },
    line2:{
      type:'string'
    },
    city:{
      type:'string'
    },
    state:{
      type:'string'
    },
    zip:{
      type:'string'
    },
    country:{
      type:'string',
      defaultsTo: 'USA'
    }	
  }
};

