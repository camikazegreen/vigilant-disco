/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var $ = require("jquery");

module.exports = {
	restricted: function(req,res){
		return res.ok("If you can see this you are authenticated.")
	},
	open: function(req,res){
		return res.ok("This action is open.")
	},
	new: function(req,res){
				return res.view('client/new')
	},
	create: function(req,res){
		console.log(req.body);
		var d = req.body;
		var startdate = "";
		if(d.startdate){
			startdate = new Date(d.startdate);
		}
		var enddate = "";
		if(d.enddate){
			enddate = new Date(d.enddate);
		}
		var controlled = 0;
		if(d.controlled){controlled = d.controlled}
		var syncapproval = 0;
		if(d.syncapproval){syncapproval = d.syncapproval}
		var managerok = 0;
		if(d.managerok){managerok = d.managerok}
		var cc =[];
		if(d.CCemail){
			var i=0;
			for (var i = d.CCemail.length - 1; i >= 0; i--) {
				var ccString = '{"name":'+d.CCname[i]+',"email":'+d.CCemail[i]+'}';
				cc.push(ccString);
			};
		}

		var address;
		Address.create({
			line1:d.address1,
			line2:d.address2,
			city:d.city,
			state:d.state,
			zip:d.zip,
			country:d.country
		},function(err,record){
			console.log("Address is ",record)
			address = record;
		Client.create({
			firstname:d.firstname,
			lastname:d.lastname,
			entityname:d.entityname,
			pka:d.pka,
			email:d.email,
			phone:d.phone,
			address:address.id,
			company:d.company,
			clientrep:d.clientrep,
			startdate:startdate,
			enddate:enddate,
			controlled:controlled,
			syncrights:syncapproval,
			managerok:managerok,
			fullcatalog:d.fullcatalog,
			digitalstatements:d.digitalstatements,
			cc:cc
		},function(err,record){
			if(err){
				console.log(err);
			}
			console.log("Client is ",record)
		return res.view('client/edit/'+record.id)
		})//closing Client.create
		})//closing Address.create
	},
	import: function(req,res){
		return res.view('client/import');
	},
	upload: function(req,res){
		// var recordToCreate = {};
		function notifyUpdate(a, b){
			// console.log("a = ",a);
			// console.log("b = ",b);
		}
		function lookUp(line){
			var recordToCreate = {};
			if(line.firstname){recordToCreate.firstname = line.firstname};
			if(line.lastname){recordToCreate.lastname = line.lastname};
			if(line.mmid){recordToCreate.mmid = line.mmid};
			if(line.qbid){recordToCreate.qbid = line.qbid};
			if(line.entityname){recordToCreate.entityname = line.entityname};
			if(line.pka){recordToCreate.pka = line.pka};
			if(line.email){recordToCreate.email = line.email};
			if(line.phone){recordToCreate.phone = line.phone};
			if(line.company){recordToCreate.company = line.company};
			if(line.clientrep){recordToCreate.clientrep = line.clientrep};
			if(line.startdate){recordToCreate.startdate = line.startdate};
			if(line.enddate){recordToCreate.enddate = line.enddate};
			if(line.controlled){recordToCreate.controlled = line.controlled};
			if(line.syncrights){recordToCreate.syncrights = line.syncrights};
			if(line.managerok){recordToCreate.managerok = line.managerok};
			if(line.fullcatalog){recordToCreate.fullcatalog = line.fullcatalog};
			if(line.digitalstatements){recordToCreate.digitalstatements = line.digitalstatements};
			if(line.cc){recordToCreate.cc = line.cc};
			//if mmid, lookup by mmid
			if(line.mmid){
				if(line.mmid == 96){console.log("Why isn't this working ",recordToCreate)};
				Client.updateOrCreate({mmid:line.mmid},recordToCreate,notifyUpdate)
			}else if(line.qbid){
				Client.updateOrCreate({qbid:line.qbid},recordToCreate)
				Client.updateOrCreate({qbid:line.qbid},recordToCreate)
			}
		}
		for (var i = req.body.length - 1; i >= 0; i--) {
			var line = req.body[i];
			lookUp(line);
		};
		Client.find().exec(function(err,results){
			return res.view("client/manage",{clients:results});
		})
		
	},
	manage: function(req,res){
		Client.find().populateAll().exec(function(err,results){
			for (var i = results.length - 1; i >= 0; i--) {
				if(results[i].pka){
					client = "<a href='/client/edit/"+results[i].id+"'>"+results[i].pka+"</a>"
					results[i].client = client;
				} else if(results[i].firstname){
					client = "<a href='/client/edit/"+results[i].id+"'>"+results[i].firstname+" "+results[i].lastname+"</a>"
					results[i].client = client;
				} else if(results[i].entityname){
					client = "<a href='/client/edit/"+results[i].id+"'>"+results[i].entityname+"</a>"
					results[i].client = client;
				};
				results[i].checkbox = "<input type='checkbox' class='selectable' id="+results[i].id+">"
			};
			// console.log(results[0])
			return res.view('client/manage',{clients:results});
		})
	},
	edit: function(req,res){
		// console.log(req.params.id);
		Client.find({id:req.params.id}).populateAll().exec(function(err,results){
		return res.view('client/edit',{client:results});

		})
	},
	update: function(req,res){
		var answer = req.body;
		// console.log(answer);
		Client.find({id:answer.client.id}).exec(function(err,results){
			if(err){console.log(err)}
				console.log("results of find = ",results[0].paymentinfo)
			doAllUpdates(results[0].address,results[0].paymentinfo,results[0].taxinfo);
		})
		function doAllUpdates(addressID,paymentID,taxID){
		if(answer){
		var address = new Promise(function(resolve, reject){
			if(answer.address){
				// console.log("There is an address");
				if(addressID){
					Address.update({id:addressID},answer.address,function(){
						console.log("addressID = ",addressID)
						resolve(addressID)
					});
				} else {
					Address.create(answer.address,function(err,record){
						if(err){console.log(err)};
						resolve(record.id)
					})
				}
			} else {resolve("")}
		})
 		var payment = new Promise(function(resolve, reject){
			if(answer.payment){
				console.log("There is a payment");
				if(paymentID){
					PaymentInfo.update({id:paymentID},answer.payment,function(){
						console.log("paymentID = ",paymentID)
						resolve(paymentID)
					});
				} else {
					PaymentInfo.create(answer.payment,function(err,record){
						if(err){console.log(err)};
						console.log("The new record is ",record)
						resolve(record.id)
					})
				}
			} else {resolve("")}
		})
		var tax = new Promise(function(resolve, reject){
			if(answer.tax){
				// console.log("There is tax info");
				if(taxID){
					TaxInfo.update({id:taxID},answer.tax,function(){
						console.log("taxID = ",taxID);
						resolve(taxID)
					});
				} else {
					TaxInfo.create(answer.tax,function(err,record){
						if(err){console.log(err)};
						resolve(record.id)
					})
				}
			} else {resolve("")}
		})
		Promise.all([address, payment, tax]).then(function(result) {
    	//do work. result is an array contains the values of the three fulfilled promises.
    	if(result[0]>0){answer.client.address = result[0];}
    	if(result[1]>0){answer.client.paymentinfo = result[1];}
    	if(result[2]>0){answer.client.taxinfo = result[2];}
    	console.log(answer.client)
    	Client.update({id:answer.client.id},answer.client,function(record){console.log(record)})
		}).catch(function(error) {
   		 //handle the error. At least one of the promises rejected.
   		 console.log(error);
		});
	}
}
		return res.ok("You hit the right controller")
	}
};

