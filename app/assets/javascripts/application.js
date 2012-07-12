// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

FB.init({ appId: '380411611996628', status: true, cookie: true, xfbml: true });
    
 FB.getLoginStatus(function(response) {
 	console.log(response.status); 
  if (response.status === 'connected') {
    // the user is logged in and has authenticated your
    // app, and response.authResponse supplies
    // the user's ID, a valid access token, a signed
    // request, and the time the access token 
    // and signed request each expire
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;                 
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
    var oauth_url = 'https://graph.facebook.com/oauth/access_token?';
    oauth_url += '?client_id=380411611996628';
    oauth_url += '&redirect_uri=' + encodeURIComponent('http://localhost:3000/');
    //oauth_url += '&scope=read_friendlists'
	window.top.location = oauth_url; 

  } else {
    // the user isn't logged in to Facebook.
    FB.login(function(response) {
       
     });                
  }
 }); 


jQuery(function($) {
  $("#bSubmit").click(function() {
  //alert("Handler for .click() called.");
    var accessToken;
    FB.getLoginStatus(function(response) {
      accessToken = response.authResponse.accessToken;
      var gender = $("input:radio[name=gender]")[0].checked ? "male" : "female";
      console.log(gender);
      $.ajax({
	      url: "https://graph.facebook.com/fql?q=SELECT pic FROM user WHERE sex='" + gender + "'AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())&access_token=" + accessToken,
	      async: true,
	      type: "GET",
	      dataType: "jsonp",
	      error: function(jqXHR, textStatus, errorThrown){
	        alert("Error!");
	      },
	      complete: function(jqXHR, textStatus){
	      },
	      statusCode: {
	        200: function(data, textStatus, jqXHR) {
	          console.log(data);
	          
	        }
	      }                  
	    });
   });                        
 
  });
});
