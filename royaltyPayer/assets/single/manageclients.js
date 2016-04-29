console.log("Managing clients...")
var container = document.getElementById('dataDiv');
var data = document.getElementById("json-records").innerHTML;
	data = JSON.parse(data);
var selected = [];
var hot2;

$('#selectAll').on("change",function(){
  $('.selectable').prop("checked",$(this).prop("checked"))
})
var defaultHeaders = ["Select","ID","QB ID","Client","Payment Type","Hold","Statement Type","Phone","Email","Address","Client Rep"]
var defaultColumns = [
      {data:"checkbox",renderer:decodeRenderer},
      {data:"id",renderer:"html"},
      {data:"qbid"},
      {data:"client",renderer:decodeRenderer},
      {data:"paymentType",type:"dropdown",source:["","directDeposit","check","intlWire"]},
      {data:"hold",type:"checkbox"},
      {data:"digitalstatements",type:"dropdown",source:["","digital","paper"]},
      {data:"phone"},
      {data:"email",renderer:"html"},
      {data:"address",renderer:addressRenderer},
      {data:"clientrep"}
      ]
var paymentHeaders = ["Select","Client","Payment Type","Payee","Routing Number","Account Number","Bank Name", "Account Type"];
var paymentColumns = [
      {data:"checkbox",renderer:decodeRenderer},
      {data:"client",renderer:decodeRenderer},
      {data:"paymentType",type:"dropdown",source:["","directDeposit","check","intlWire"]},
      {data:"paymentinfo.payeeName"},
      {data:"paymentinfo.routing"},
      {data:"paymentinfo.account"},
      {data:"paymentinfo.bankName"},
      {data:"paymentinfo.accountType"}
]
var contactHeaders = ["Select","Client","Phone","Email","Address"]
var contactColumns = [
      {data:"checkbox",renderer:decodeRenderer},
      {data:"client",renderer:decodeRenderer},
      {data:"phone"},
      {data:"email",renderer:"html"},
      {data:"address",renderer:addressRenderer},
      ]
var taxHeaders = ["Select","Client","Legal Name","Entity Name","Tax Id","Tax Address"]
var taxColumns = [
      {data:"checkbox",renderer:decodeRenderer},
      {data:"client",renderer:decodeRenderer},
      {data:"taxinfo.legalname"},
      {data:"taxinfo.businessname"},
      {data:"taxinfo.taxid"},
      {data:"taxinfo.address",renderer:addressRenderer}
      ]
function createTable(headers,columns){
      container.innerHTML = "";
      hot2 = new Handsontable(container, {
      data: data,
      rowHeaders: false,
      colHeaders: headers,
      columns:columns,
      columnSorting: true,
      renderAllRows: true,
      afterChange: function(changes,source){
        if(changes){
        selected.push(changes[0]);
        console.log(changes);
        var selectBoxes = $('.selectable');
        for (var i = selected.length - 1; i >= 0; i--) {
          selectBoxes[selected[i][0]].checked = true;
        };
        // var rowCheck = changes[0][0]
        // selectBoxes[rowCheck].checked = true;
        }
      }
    })
}
createTable(defaultHeaders,defaultColumns);
  //client will be pka if pka, else firstname+lastname, else entity
  function decodeRenderer(instance, td, row, col, prop, value, cellProperties) {
    function htmlDecode(input){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes[0].nodeValue;
    }

    td.innerHTML = htmlDecode(Handsontable.helper.stringify(value))

    return td;
  }
  function addressRenderer(instance, td, row, col, prop, value, cellProperties) {
    function addressDecode(input){
      var address = input.line1;
      if(input.line2){address += "<br>"+input.line2};
      var e = document.createElement('div');
      e.innerHTML = "<div class='smallAddress'><div>"+address+"</div><span>"+input.city+", </span><span>"+input.state+" </span><span>"+input.zip+"</span></div"

      return e.childNodes[0].innerHTML;
    }
    if(value){
    td.innerHTML = addressDecode(value);
    }
    return td;
  }

  $("#viewSelect").on("change",function(){
    switch($("#viewSelect option:selected")[0].value){
      case "contact":
      createTable(contactHeaders,contactColumns);
    break;
      case "payment":
      createTable(paymentHeaders,paymentColumns);
    break;
      case "tax":
      createTable(taxHeaders,taxColumns);
    break;
      default:
      createTable(defaultHeaders,defaultColumns);
    break;
    }
    })

  $("#updateSelected").on("click",function(){
    console.log(selected);
    var clientOptions = [];
    var addressOptions = [];
    var taxOptions = [];
    var paymentOptions = [];
    for (var i = selected.length - 1; i >= 0; i--) {
      //selected[i][0] == row
      //selected[i][1] == data header
      //selected[i][2] == old value
      //selected[i][3] == new value
      var clientChanges = {id:data[selected[i][0]].id};
      var addressChanges = {};
      var taxChanges = {};
      var paymentChanges = {};
      if(selected[i][1].indexOf("taxinfo") > -1){
        var valueString = selected[i][1]
        var valueName = valueString.slice(8);
        taxChanges[valueName] = selected[i][3];
      } else
      if(selected[i][1].indexOf("paymentinfo") > -1){
        console.log("it's finding paymentinfo in the string");
        var valueString = selected[i][1]
        var valueName = valueString.slice(12);
        console.log("it set the valueName to ",valueName)
        paymentChanges[valueName] = selected[i][3];
        console.log(paymentChanges)
      } else {
        clientChanges[selected[i][1]] = selected[i][3]
      }
      var dataChanges = {
        client:clientChanges,
        address:addressChanges,
        tax:taxChanges,
        payment:paymentChanges
      };
      console.log(dataChanges);
      jQuery.ajax({
        type: "POST",
        url: '/client/update',
        data: dataChanges,
        success: function (data) {
          console.log(data);
        }
      });
    };
  })
