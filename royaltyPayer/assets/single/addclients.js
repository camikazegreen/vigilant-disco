$(document).ready(function(){
  var pkaCounter = 1;
  var bandCounter = 1;
  var CcCounter = 2;
    var perform = document.getElementById('pkaName1');
    var legal = document.getElementById('legalName');
    var payee = document.getElementById('payeeName');
    var checkName = document.getElementById('checkPayeeName');
    var intlName = document.getElementById('intlPayeeName')
    var first = document.getElementById('firstName1');
    var last = document.getElementById('lastName1');
    var username = document.getElementById('username');
    var userEmail = document.getElementById('userEmail');
    var inputEmail = document.getElementById('inputEmail1');
    var userEmail = document.getElementById('userEmail');

    function fillPerform(){
      first = document.getElementById('firstName1');
      last = document.getElementById('lastName1');
      perform.value=first.value+" "+last.value;
      legal.value=first.value+" "+last.value;
      payee.value=first.value+" "+last.value;
      checkName.value=first.value+" "+last.value;
      intlName.value=first.value+" "+last.value;
      username.value=first.value+"."+last.value;
    }
    first.addEventListener('input',fillPerform);
    last.addEventListener('input',fillPerform);
    inputEmail.addEventListener('input',function(){userEmail.value=inputEmail.value});

    $("#morePka").click(function(){
      pkaCounter++;
      var morePka = document.getElementById('morePka');
      var lessPka = document.getElementById('lessPka');
      var newInput = document.createElement("input");
      newInput.setAttribute("type","text");
      newInput.setAttribute("class","form-control");
      newInput.setAttribute("id","pkaName"+pkaCounter);
      newInput.setAttribute("name","pka");
      newInput.setAttribute("placeholder","Enter name");
      var pkaDiv = document.getElementById("pkaDiv");
      pkaDiv.appendChild(newInput);
      pkaDiv.appendChild(morePka);
      pkaDiv.appendChild(lessPka);
    });
    $("#lessPka").click(function(){
      var toRemove = document.getElementById("pkaName"+pkaCounter);
      toRemove.parentNode.removeChild(toRemove);
      pkaCounter--;
    });
//when it is selected
    $("#stateoriginal").change(function(){
      var state = $("#stateoriginal option:selected").val();
      if(state =="FC"){
        $('<input type="text" placeholder="State" class="form-control" id="stateforeign" name="state">').replaceAll("#stateoriginal");
      }
    })

    $("#moreBand").click(function(){
      bandCounter++;
      var moreBand = document.getElementById('moreBand');
      var lessBand = document.getElementById('lessBand');
      var newInput = document.createElement("input");
      newInput.setAttribute("type","text");
      newInput.setAttribute("class","form-control");
      newInput.setAttribute("id","bandName"+bandCounter);
      newInput.setAttribute("name","bandname");
      newInput.setAttribute("placeholder","Band name");
      var bandDiv = document.getElementById("bandDiv");
      bandDiv.appendChild(newInput);
      bandDiv.appendChild(moreBand);
      bandDiv.appendChild(lessBand);
    });
    $("#lessBand").click(function(){
      var toRemove = document.getElementById("bandName"+bandCounter);
      toRemove.parentNode.removeChild(toRemove);
      bandCounter--;
    });

    $("#moreCC").click(function(){
      CcCounter++;
      var moreCC = document.getElementById('moreCC');
      var lessCC = document.getElementById('lessCC');
      var newInputCCname = document.createElement("input");
      newInputCCname.setAttribute("type","text");
      newInputCCname.setAttribute("class","form-control");
      newInputCCname.setAttribute("id","CCName"+CcCounter);
      newInputCCname.setAttribute("name","CCname");
      newInputCCname.setAttribute("placeholder","Name");
      var newInputCCemail = document.createElement("input");
      newInputCCemail.setAttribute("type","text");
      newInputCCemail.setAttribute("class","form-control");
      newInputCCemail.setAttribute("id","CCemail"+CcCounter);
      newInputCCemail.setAttribute("name","CCemail");
      newInputCCemail.setAttribute("placeholder","CarbonCopy@example.com");
      var CCDiv = document.getElementById("CCDiv");
      CCDiv.appendChild(newInputCCname);
      CCDiv.appendChild(newInputCCemail);
      CCDiv.appendChild(moreCC);
      CCDiv.appendChild(lessCC);
    });
    $("#lessCC").click(function(){
      var toRemove = document.getElementById("CCName"+CcCounter);
      toRemove.parentNode.removeChild(toRemove);
      var toRemove = document.getElementById("CCemail"+CcCounter);
      toRemove.parentNode.removeChild(toRemove);
      CcCounter--;
    });
    var sameAddressCheck = document.getElementById('addressChecker');

    function fillAddress(){
      console.log("calling fillAddress");
      if(sameAddressCheck.checked){
        console.log("the box is checked");
    var line1original = document.getElementById('line1original').value;
    var line2original = document.getElementById('line2original').value;
    var cityoriginal = document.getElementById('cityoriginal').value;
    var stateoriginal = document.getElementById('stateoriginal').value;
    var ziporiginal = document.getElementById('ziporiginal').value;
    var countryoriginal = document.getElementById('countryoriginal').value;

    var line1tax = document.getElementById('line1tax');
    var line2tax = document.getElementById('line2tax');
    var citytax = document.getElementById('citytax');
    var statetax = document.getElementById('statetax');
    var ziptax = document.getElementById('ziptax');
    var countrytax = document.getElementById('countrytax');

    line1tax.value = line1original;
    line2tax.value = line2original;
    citytax.value = cityoriginal;
    statetax.value = stateoriginal;
    ziptax.value = ziporiginal;
    countrytax.value = countryoriginal;

    }
  }
    sameAddressCheck.addEventListener('change',fillAddress);

    $('input:radio[name=entity]').change(function(){
      if($('input:radio[name=entity]')[0].checked){
        //W9 active
        $('#w9').removeClass('hidden');
        $('#w8ben').addClass('hidden');
        $('#w8benE').addClass('hidden');
      } else if($('input:radio[name=entity]')[1].checked){
      //W-8Ben active
        $('#w9').addClass('hidden');
        $('#w8ben').removeClass('hidden');
        $('#w8benE').addClass('hidden');
    } else if($('input:radio[name=entity]')[2].checked){
      //W-8Ben-E active
        $('#w9').addClass('hidden');
        $('#w8ben').addClass('hidden');
        $('#w8benE').removeClass('hidden');
}

    }) //close toggle tax forms function

    $('input:radio[name=directDeposits]').change(function(){
      if($('input:radio[name=directDeposits]')[0].checked){
        //Direct Deposit active
        $('#directDepositDiv').removeClass('hidden');
        $('#checkDetailsDiv').addClass('hidden');
        $('#INTLDetailsDiv').addClass('hidden');
      } else if($('input:radio[name=directDeposits]')[1].checked){
      //Check active
        $('#directDepositDiv').addClass('hidden');
        $('#checkDetailsDiv').removeClass('hidden');
        $('#INTLDetailsDiv').addClass('hidden');
    } else if($('input:radio[name=directDeposits]')[2].checked){
      //International Wire active
        $('#directDepositDiv').addClass('hidden');
        $('#checkDetailsDiv').addClass('hidden');
        $('#INTLDetailsDiv').removeClass('hidden');
}
    })

    function toggleTID(){
    if($('#businessName').val()){
      document.getElementById('taxID').placeholder = "XX-XXXXXXX";
    } else {

      document.getElementById('taxID').placeholder = "XXX-XX-XXXX";
    }
  }
    document.getElementById('businessName').addEventListener('input',toggleTID);


    var sameAddressCheck2 = document.getElementById('addressChecker2');

    function fillAddress2(){
      console.log("calling fillAddress2");
      if(sameAddressCheck2.checked){
        console.log("the box2 is checked");
    var line1original = document.getElementById('line1original').value;
    var line2original = document.getElementById('line2original').value;
    var cityoriginal = document.getElementById('cityoriginal').value;
    var stateoriginal = document.getElementById('stateoriginal').value;
    var ziporiginal = document.getElementById('ziporiginal').value;
    var countryoriginal = document.getElementById('countryoriginal').value;

    var line1payee = document.getElementById('line1payee');
    var line2payee = document.getElementById('line2payee');
    var citypayee = document.getElementById('citypayee');
    var statepayee = document.getElementById('statepayee');
    var zippayee = document.getElementById('zippayee');
    var countrypayee = document.getElementById('countrypayee');

    line1payee.value = line1original;
    line2payee.value = line2original;
    citypayee.value = cityoriginal;
    statepayee.value = stateoriginal;
    zippayee.value = ziporiginal;
    countrypayee.value = countryoriginal;

    }
  }
    sameAddressCheck2.addEventListener('change',fillAddress2);

    // $('#submitClient').click(function(){
    //   var clientData = {};
      //get values

      //submit all of the bits that use outside models: band,publisher,address,etc.
      //add the id's from those values to the data
      //submit the client to the database
    // })
  }) // close document.ready