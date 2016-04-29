var data = [];
var dbOptions = ['firstname','lastname','entityname','pka','email','phone','address1','address2','city','state','zip','country','company','clientrep','startdate','enddate','controlled','syncrights','managerok','fullcatalog','digitalstatements','cc','inband','band','notes','mmid','qbid','taxid','hold','paymentType','routing','account','accountType']
var container = document.getElementById('dataDiv');
var dataHeaders = [];
var columns = [];


//Handle the file upload
$(document).ready(function() {
  console.log("The document is ready")
  if(isAPIAvailable()) {
    $('#CSVupload').bind('change', handleFileSelect);
  }
});  //end document.ready

function isAPIAvailable() {
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      return true;
  } else {
    // source: File API availability - http://caniuse.com/#feat=fileapi
    // source: <output> availability - http://html5doctor.com/the-output-element/
    document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
    // 6.0 File API & 13.0 <output>
    document.writeln(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
    document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
    // 10.0 File API & 10.0 <output>
    document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
    // ? File API & 5.1 <output>
    document.writeln(' - Safari: Not supported<br />');
    // ? File API & 9.2 <output>
    document.writeln(' - Opera: Not supported');
    return false;
  }
} //end isAPIAvailable

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var file = files[0];

  // read the file metadata
  var output = ''
      output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
      output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
      output += ' - FileSize: ' + file.size + ' bytes<br />\n';
      output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

  // read the file contents
  loadHeaders(file);

  // Change the directions to handle the next step
  $('#topInstructions').html('<h3>Please map your headers</h3><button type="button" class="btn btn-primary" onclick="loadTable()">Done mapping</button>');
} //end handleFileSelect

function loadHeaders(file) {
  var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event){
        var csv = event.target.result;
        data = $.csv.toArrays(csv);
        var selectHeaders = []
        for (var i = data[0].length - 1; i >= 0; i--) {
          selectHeaders[i] = "";
        };
        dataHeaders.unshift(selectHeaders,data[0]);
        var html = '';

        var hot = new Handsontable(container, {
          data: dataHeaders,
          rowHeaders: true,
          colHeaders: true,
          cells: function(row, col, prop){
            if (row === 0){
              this.type = "dropdown";
              this.source = dbOptions;
            }
          },
          afterChange:function(changes,source){
            // remove selected options fromthe dropdown list
            if(changes){
              if(changes[0][0] == 0){
                var used = changes[0][3];
                for (var i = dbOptions.length - 1; i >= 0; i--) {
                  if(dbOptions[i]===used){
                    dbOptions.splice(i,1);
                  }
                };
              };
            }
          }
        });
      };
      reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
} //end loadHeaders

function loadTable(){
  console.log("loading table...");
  $('#list').html("");
  var correctHeaders = dataHeaders[0];
      container.innerHTML = "";
      data.shift();
      data = validate(correctHeaders,data);
  var hot2 = new Handsontable(container, {
      data: data,
      rowHeaders: true,
      colHeaders: correctHeaders,
      beforeChange: function(changes,source){
        console.log(changes);
        console.log("source ",source);
      }
    })
  $('#topInstructions').html('<h3>Please look over your data, then...</h3><button type="button" class="btn btn-primary" onclick="uploadData()">Upload</button>');
} //end loadTable

function uploadData(){
  console.log("Uploading Data...");
  console.log(dataHeaders);
  //convert to array of objects with dataheaders as the keys.
  // var clients =[{"mmid":"96","qbid":"505","firstname":"Aaron","lastname":"Dugan"},{"mmid":"1047","qbid":"453","firstname":"Aaron","lastname":"Goldberg"}]
  clients =[]
  
  for (var i = data.length - 1; i >= 0; i--) {
      var obj = {};
    for (var j = dataHeaders[0].length - 1; j >= 0; j--) {
      var key = dataHeaders[0][j];
      var val = data[i][j];
      obj[key] = val;
    };
    delete obj[""];
    clients[clients.length] = obj;
  };
  var clientData = JSON.stringify(clients);
  console.log(clientData);
  var bundle = {"headers":dataHeaders,"data":clients}
  $.ajax({
    url:"/client/upload",
    method: "POST",
    contentType:"text/plain",
    data:clientData
  }).done(function(results){
    console.log("results "+results)
  })
}