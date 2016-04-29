var noteIndex;
var country;
var company;
var rep;
var idHeaders = {};
var removed = [];

		function checkList(d,list){
			for (var i = list.length - 1; i >= 0; i--) {
				if(d == list[i]){
					return true;
				} else if(i==0){
					return false;
				}
			}	
		}
		function checkMappings(d,list){
			for (var i = list.length - 1; i >= 0; i--) {
				if (d == list[i][0]){
					company = list[i][1];
					rep = list[i][1];
					return true;
				} else if(i==0){
					return false;
				}
			}
		}
		function updateMappings(data,list){
			//This will only work when unknown can be from a dropdown of acceptable values.
				var unknown = prompt(data+" is not known, what do you want it to be?");
				if (unknown != null){
					list.push([data,unknown]);
					return unknown;
				}
			}

String.prototype.capitalize = function(){
       return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
      };

overallIDCheck = function(headers){
	var idCheck = false;
	for (var i = headers.length - 1; i >= 0; i--) {
		if(headers[i] == 'mmid'){
			idCheck=true;
			idHeaders.mmid = i;
		}
		if(headers[i] == 'qbid'){
			idCheck=true;
			idHeaders.qbid = i;
		}
		if(i == 0){
			return idCheck;
		}
	};
}

validate = function(headers, data){
	if(!overallIDCheck(headers)){
		alert("You can only import if you have either a Music Maestro Code or a QuickBooks vendor ID");
		location.reload()
	}
	for (var i = headers.length - 1; i >= 0; i--) {
		if(headers[i] == "notes"){
			noteIndex = i;
		} else if(i==0 && noteIndex === undefined){
			noteIndex = headers.length;
			headers[headers.length] = "notes";
		}
	};
	idValidator(data);

	for (var i = headers.length - 1; i >= 0; i--) {
		if(headers[i] == 'country'){
			data = countryValidator(i,data);
		}
		if(headers[i] == 'firstname'){
			data = nameValidator(i,data);
		}
		if(headers[i] == 'lastname'){
			data = nameValidator(i,data);
		}
		if(headers[i] == 'entityname'){
			data = nameValidator(i,data);
		}
		if(headers[i] == 'pka'){
			data = nameValidator(i,data);
		}
		if(headers[i] == 'email'){
			data = emailValidator(i,data);
		}
		if(headers[i] == 'phone'){
			data = phoneValidator(i,data);
		}
		if(headers[i] == 'state'){
			data = stateValidator(i,data);
		}
		if(headers[i] == 'zip'){
			data = zipValidator(i,data);
		}
		if(headers[i] == 'company'){
			data = companyValidator(i,data);
		}
		if(headers[i] == 'clientrep'){
			data = repValidator(i,data);
		}
		if(headers[i] == 'startdate'){
			data = dateValidator(i,data);
		}
		if(headers[i] == 'enddate'){
			data = dateValidator(i,data);
		}
		if(headers[i] == 'digitalstatements'){
			data = booleanValidator(i,data);
		}
		// console.log(columns);
	};

	return data;
}

nameValidator = function(index, data){
	for (var i = data.length - 1; i >= 0; i--) {
		var name = data[i][index];
		name = name.toLowerCase().capitalize();
		name = name.replace('Llc','LLC')
		name = name.replace('Iii','III')
		var openBrace = name.indexOf("[");
		var closeBrace = name.indexOf("]");
		if(openBrace != -1 && closeBrace !=-1){
			var newNote = name.slice(openBrace);
			data[i][noteIndex] += newNote;
			name = name.substring(0,openBrace);
		}
		data[i][index] = name;
	};
	return data;
}
 emailValidator = function (index, data) {
 	for (var i = data.length - 1; i >= 0; i--) {
 		var email = data[i][index];
 		function extractEmails (text){
    		return text.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/);
		}
		if(email){email = extractEmails(email);}
		data[i][index] = email;
 	};
 	return data;
 };
phoneValidator = function(index, data){
	for (var i = data.length - 1; i >= 0; i--) {
	var phone = data[i][index];
	if(phone){
		phone = phone.replace(/\D/gi,"");
		if(phone.length == 10){
			phone = "("+phone.substring(0,3)+") "+phone.substring(3,6)+"-"+phone.substring(6,10)
		}
	}
	
	data[i][index] = phone;
	};
	return data;
}
stateValidator = function(index, data){
	var stateList = [{'code':'al','state':'alabama'},{'code':'ak','state':'alaska'},{'code':'az','state':'arizona'},{'code':'ar','state':'arkansas'},{'code':'ca','state':'california'},{'code':'co','state':'colorado'},{'code':'ct','state':'connecticut'},{'code':'de','state':'delaware'},{'code':'fl','state':'florida'},{'code':'ga','state':'georgia'},{'code':'hi','state':'hawaii'},{'code':'id','state':'idaho'},{'code':'il','state':'illinois'},{'code':'in','state':'indiana'},{'code':'ia','state':'iowa'},{'code':'ks','state':'kansas'},{'code':'ky','state':'kentucky'},{'code':'la','state':'louisiana'},{'code':'me','state':'maine'},{'code':'md','state':'maryland'},{'code':'ma','state':'massachusetts'},{'code':'mi','state':'michigan'},{'code':'mn','state':'minnesota'},{'code':'ms','state':'mississippi'},{'code':'mo','state':'missouri'},{'code':'mt','state':'montana'},{'code':'ne','state':'nebraska'},{'code':'nv','state':'nevada'},{'code':'nh','state':'new hampshire'},{'code':'nj','state':'new jersey'},{'code':'nm','state':'new mexico'},{'code':'ny','state':'new york'},{'code':'nc','state':'north carolina'},{'code':'nd','state':'north dakota'},{'code':'oh','state':'ohio'},{'code':'ok','state':'oklahoma'},{'code':'or','state':'oregon'},{'code':'pa','state':'pennsylvania'},{'code':'ri','state':'rhode island'},{'code':'sc','state':'south carolina'},{'code':'sd','state':'south dakota'},{'code':'tn','state':'tennessee'},{'code':'tx','state':'texas'},{'code':'ut','state':'utah'},{'code':'vt','state':'vermont'},{'code':'va','state':'virginia'},{'code':'wa','state':'washington'},{'code':'wv','state':'west virginia'},{'code':'wi','state':'wisconsin'},{'code':'wy','state':'wyoming'},{'code':'dc','state':'district of columbia'},{'code':'as','state':'american samoa'},{'code':'gu','state':'guam'},{'code':'mp','state':'northern mariana islands'},{'code':'pr','state':'puerto rico'},{'code':'um','state':'united states minor outlying islands'},{'code':'vi','state':'virgin islands, u.s.'}]
	for (var i = data.length - 1; i >= 0; i--) {
		var state = data[i][index];
		if(state){
		state = state.toLowerCase();
		for (var j = stateList.length - 1; j >= 0; j--) {
			if(state == stateList[j].code){
				data[i][index] = state.toUpperCase();
				break
			}
				else if(state == stateList[j].state){
					state = stateList[j].code;
					data[i][index] = state.toUpperCase();
					break
				}else{
					data[i][index] = state;
				}
			};
		}
		
	};
	return data;
}
zipValidator = function(index, data){
	var regex = /^[0-9]{5}(?:-[0-9]{4})?$/
	for (var i = data.length - 1; i >= 0; i--) {
		var zip = data[i][index];
		if(zip){
			if(regex.test(zip)){
				data[i][index] = zip;
			} else {
				data[i][index] = "";
			}
		}
	};
	return data;
}
countryValidator = function(index, data){
	return data;
}
companyValidator = function(index, data){
	var companyList = ['1630','ArtistShare','Crowded Air','Fanatic','Gallops','Goodnight Records','Light In The Attic','A Side Music','Second Floor Music','Shlomo Diego','Superior Music','TRIBO Music','United for Opportunity','other'];
	var companyMap = [['SFM','Second Floor Music'],['AMP','ArtistShare'],['UFO','United For Opportunity'],['Goodnight','Goodnight Records'],['TRIBO','TRIBO Music'],['LITA','Light In The Attic'],['Bootzilla','other'],['ASM','ArtistShare'],['Modern Works','A Side Music'],['Superior','Superior Music']];//I need to set up a model to store new mappings as they are made. This will also be used for header mappings as well.
	for (var i = data.length - 1; i >= 0; i--) {
		company = data[i][index];
		if(company){
			if(checkList(company,companyList)){
				data[i][index] = company
			} else if (checkMappings(company,companyMap)){
				data[i][index] = company
			} else {			
				data[i][index] = updateMappings(company,companyMap);
				console.log(company," is not on either list, so we added it");
			}
		}
	};
	return data;
}
repValidator = function(index, data){
	var repList = ['Dan','Jenny','Melissa','Adam','Alex'];
	var repMap = [['DC','Dan'],['JJ','Jenny'],['MM','Melissa'],['AT','Adam'],['AA','Alex']]
	for (var i = data.length - 1; i >= 0; i--) {
		rep = data[i][index];
		if(rep){
			if(checkList(rep,repList)){
				data[i][index] = rep;
			} else if (checkMappings(rep,repMap)){
				data[i][index] = rep;
			} else {
				data[i][index] = updateMappings(rep,repMap);
			}
		}
	};
	return data;
}
dateValidator = function(index, data){
	for (var i = data.length - 1; i >= 0; i--) {
		var date = data[i][index];
		if(date){
			// using the jQuery DateFormat docs are here: https://github.com/phstc/jquery-dateFormat
			date = DateFormat.format.date(new Date(date), 'M/d/yyyy');
			// date = new Date(date);
			data[i][index] = date;
		}
	};
	return data;
}
booleanValidator = function(index, data){
	for (var i = data.length - 1; i >= 0; i--) {
		var bool = data[i][index];
		if(bool){
			if (bool == "true" || bool == "True" || bool == "TRUE" || bool == true || bool == 1){
				bool = true
			} else {
				bool = false
			}
			data[i][index] = bool;
		}
	};
	return data;
}
ccValidator = function(index, data){
	
}
idValidator = function(data){
	//check both the mmid and qbid header indexes for true
	console.log("idHeaders ",idHeaders);
	var mmIndex;
	if(idHeaders.mmid != undefined){
		mmIndex = idHeaders.mmid;
	}
	var qbIndex;
	if(idHeaders.qbid != undefined){
		qbIndex = idHeaders.qbid;
	}
	console.log("mmIndex = "+mmIndex);
	console.log("qbIndex = "+qbIndex);
	function hasID(data,i){
		var idCheck = false;
		if(data[i][mmIndex]){
			idCheck = true;
		}
		if(data[i][qbIndex]){
			idCheck = true;
		}
		// console.log(data[i]+", "+idCheck)
		return idCheck;
	}
	//if neither ID exists, remove that line and log it in the console
	for (var i = data.length - 1; i >= 0; i--) {
		console.log(hasID(data,i));
		if(!hasID(data,i)){
			var remove = data.splice(i,1);
			removed.push(remove);
			console.log(remove," was removed for lack of id");
		}
	}
	// alert(removed.length+1+" clients removed because they didn't have ID's")
	return data;

}
taxidValidator = function(index, data){
	function SSNregex(){

	};
	function EINregex(){

	};
	function matchregex(number){
		// if(number==""){
		// 	return true;
		// }else if(SSNregex(number)){
		// 	return true;
		// }else if(EINregex(number)){
		// 	return true;
		// }else{
		// 	number = prompt("Format the following number as either XXX-XX-XXXX or XX-XXXXXXX",number);
		// 	matchregex(number);
		// }
	}
}
payTypeValidator = function(index, data){
	
}
routingValidator = function(index, data){
	
}
accountTypeValidator = function(index, data){
	
}
