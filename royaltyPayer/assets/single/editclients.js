var clientChanges = {id:window.location.pathname.split("/")[3]};
var addressChanges = {};
var taxChanges = {};
var paymentChanges = {};

$(document).ready(function(){
	$(".clientDetails").on("change",function(){
		for (var i = clientChanges.length - 1; i >= 0; i--) {
			console.log(clientChanges[i].name,this.name)
			if(clientChanges[i].name == this.name){
				clientChanges.splice(i,1)
			}
		};
		clientChanges[this.name] = this.value;
		$("#updateClient").removeClass('disabled');
	});
	$(".addressDetails").on("change",function(){
		for (var i = addressChanges.length - 1; i >= 0; i--) {
			console.log(addressChanges[i].name,this.name)
			if(addressChanges[i].name == this.name){
				addressChanges.splice(i,1)
			}
		};
		addressChanges[this.name] = this.value;
		clientChanges.addressID = document.getElementById('addressID').value;
		$("#updateClient").removeClass('disabled');
	});
	$(".taxDetails").on("change",function(){
		for (var i = taxChanges.length - 1; i >= 0; i--) {
			console.log(taxChanges[i].name,this.name)
			if(taxChanges[i].name == this.name){
				taxChanges.splice(i,1)
			}
		};
		taxChanges[this.name] = this.value;
		clientChanges.taxInfoID = document.getElementById('taxInfoID').value;
		$("#updateClient").removeClass('disabled');
	});
	$(".paymentDetails").on("change",function(){
		for (var i = paymentChanges.length - 1; i >= 0; i--) {
			console.log(paymentChanges[i].name,this.name)
			if(paymentChanges[i].name == this.name){
				paymentChanges.splice(i,1)
			}
		};
		paymentChanges[this.name] = this.value;
		clientChanges.paymentInfoID = document.getElementById('paymentInfoID').value;
		$("#updateClient").removeClass('disabled');
	});
	$('#updateClient').click(function(){
	//go through changes and move all tax info into the tax changes box
	var data = {
		client:clientChanges,
		address:addressChanges,
		tax:taxChanges,
		payment:paymentChanges
	};
	console.log(data);
		jQuery.ajax({
  			type: "POST",
  			url: '/client/update',
  			data: data,
  			success: function (data) {
	   	 		console.log(data);
 		 }
	});
})
})

$(function(){
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab('show');

  $('.nav-tabs a').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop() || $('html').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});
