var data = [];
var dbOptions = ['Member Reference','Member Name','Work Number','Song Title','Song Composer(s)','Catalog No','Units','Source of Income','Percentage Received','Income Type','Amount','Date From (MM/YYYY)','Date To (MM/YYYY)','Territory','Extra Info']
var container = document.getElementById('dataDiv');
var dataHeaders = [];
var headers = [];
var society = "Music Reports";
var checkNumber;
var filename;
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
  console.log("File type = "+file.type)

  // read the file metadata
  var output = ''
      output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
      output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
      output += ' - FileSize: ' + file.size + ' bytes<br />\n';
      output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

  // read the file contents
  if(file.type == "application/zip"){
    console.log("This is a zip file, they will be supported soon.");
  } else if(file.type == "text/csv"){
    console.log("this is a csv file");
  mapHeaders(file);
}

  // Change the directions to handle the next step
  $('#topInstructions').html('<h3>Please map your headers</h3><button type="button" class="btn btn-primary" onclick="loadTable()">Done mapping</button>');
} //end handleFileSelect

function mapHeaders(file) { 
  var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event){
        var csv = event.target.result;
        data = $.csv.toArrays(csv);
        loadTable();
      };
      reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
} //end loadHeaders

function loadTable(){
  console.log("loading table...");
  $('#list').html("");
      container.innerHTML = "";
      headers = data[0];
      data = reformat(headers,data,society);
      checkNumber = data[data.length-1][0];
      details = data[data.length-1][1];
  var hot2 = new Handsontable(container, {
      data: data,
      rowHeaders: true,
      colHeaders: headers,
      beforeChange: function(changes,source){
        console.log(changes);
        console.log("source ",source);
      }
    })

  var instructions = '<h3>Please look over your data, then...</h3>';
  instructions += '</br>';
  instructions += '<form class="form-inline">Filename : '
  //Select list for Our Semester, 
  instructions += '<div class="form-group"><select class="form-control fileInput" id="getSemester"><option>16S1</option><option selected="selected">16S2</option><option>17S1</option></select></div>';
  //Text input for their quarter, 
  instructions += '<input type="text" class="form-control fileInput" id="getQuarter">';
  //Text Input for Society but prefilled, 
  instructions += '<input type="text" class="form-control fileInput" id="getSociety">';
  //Text Input for checknumber but prefilled, 
  instructions += '<input type="text" class="form-control fileInput" id="getCheck">';
  //Text Input for details but prefilled, 
  instructions += '<input type="text" class="form-control fileInput" id="getDetails">';
  //Text Input for deposit date
  instructions += '<input type="text" class="form-control fileInput" id="getDate" placeholder="Date">';
  instructions += '.csv';
  instructions += '</form></br>'
  instructions += '<div id="filePreview"></div>'
  instructions += '<button type="button" class="btn btn-primary" onclick="downloadData()">Download</button>'
  $('#topInstructions').html(instructions);
  document.getElementById("getQuarter").setAttribute('value','15Q2');
  document.getElementById("getSociety").setAttribute('value',society);
  document.getElementById("getCheck").setAttribute('value',checkNumber);
  document.getElementById("getDetails").setAttribute('value',details);
  updatePreview();
  function updatePreview(){
    var semester = document.getElementById('getSemester').value;
    var quarter = document.getElementById('getQuarter').value;
    var society = document.getElementById('getSociety').value;
    var checknumber = document.getElementById('getCheck').value;
    var details = document.getElementById('getDetails').value;
    var depositDate = document.getElementById('getDate').value;
    var filename = semester+" "+quarter+" "+society+"_"+checkNumber+"_"+details+"_"+depositDate+".csv";
    document.getElementById("filePreview").innerHTML = filename;
  }
  $('.fileInput').on('input',function(){
    updatePreview();
  })
} //end loadTable
function downloadData(){
  
  data.unshift(headers);
  data.pop();
  filename = document.getElementById("filePreview").innerHTML;
  console.log(filename);
  exportToCsv(filename,data);
}
function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
