

function reformat(headers, data, society){
	if(society == "Music Reports"){
		//take data[0][sourceIncome] and save as check number
		//delete Source of Income column
		//change name of Licensee to Source of Income
		var mapList =[["Member Reference"],["member_name","Member Name"],["work_number","Work Number"],["song_title","Song Title"],["composers","Song Composer(s)"],["Catalog No"],["units","Units"],["source_of_income","Source of Income"],["publisher_share","Percentage Received"],["income_type","Income Type"],["amount","Amount"],["date_from","Date From (MM/YYYY)"],["date_to","Date To (MM/YYYY)"],["territory","Territory"],["service_name","Licensee"]];
		for (var i = headers.length - 1; i >= 0; i--) {
			for (var j = mapList.length - 1; j >= 0; j--) {
				if(headers[i] == mapList[j][0]){
					data[0][i] = mapList[j][1];
				}
			};
		};
		var amountIndex;
		var memberNameIndex;
		var incomeTypeIndex;
		var licenseeIndex;
		var percentIndex;
		var sourceIndex;
		var unitIndex;
		for (var i = headers.length - 1; i >= 0; i--) {
			if (headers[i] == "Member Name"){memberNameIndex = i};
			if(headers[i] == "Income Type"){incomeTypeIndex = i};
			if(headers[i] == "Amount"){amountIndex = i};
			if(headers[i] == "Licensee"){licenseeIndex = i};
			if(headers[i] == "Percentage Received"){percentIndex = i};
			if(headers[i] == "Source of Income"){sourceIndex = i};
			if(headers[i] ==  "Units"){unitIndex = i};
		};
		//add an extra column of Extra Info
		extraInfoIndex = headers.length;
		headers[extraInfoIndex] = "Extra Info";
		//move the info from Member Name in to Extra Info
		var checkNumber = data[1][sourceIndex];
		var details = data[1][licenseeIndex];
		for (var i = data.length - 1; i >= 1; i--) {
			if(data[i][amountIndex] == "0.00"){
				data.splice(i,1);
				continue;
			}
			data[i][extraInfoIndex] = data[i][memberNameIndex];
			data[i][memberNameIndex] = "";
			data[i][incomeTypeIndex] = "Mechanical";
			data[i][sourceIndex] = data[i][licenseeIndex]+" (Music Reports)";
			data[i][percentIndex] = Math.round(data[i][percentIndex] * 10000) / 100;
			data[i][unitIndex] = Math.round(data[i][unitIndex]*1);
			data[i].splice(licenseeIndex,1);
		};
	}
	//Because headers is mapped to data[0], changing this here will change the headers.
	data[0].splice(licenseeIndex,1);
	//Then remove the header row from data so that it won't show up on the chart.
	data.shift();
	var extraDetails = [checkNumber,details]
	data.push(extraDetails)
	return data;
}