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
 //aqui vou chamar o face detect enviando a foto ou url
 console.log('INICIOU O FACE CODE');
var data = canvas.toDataURL('image/jpeg', 1.0);
newblob = dataURItoBlob(data);
var formdata = new FormData();
formdata.append("635d01087f121344f80857f479853d05", faceKey);
formdata.append("33ea94ef35a1571e910d738b79c1cec4", faceSecret);
formdata.append("filename","temp.jpg");
formdata.append("file",newblob);
$.ajax({
                 url: 'http://api.face.com/faces/detect.json',
                 data: formdata,
                 cache: false,
                 contentType: false,
                 processData: false,
                 dataType:"json",
                 type: 'POST',
                 success: function (data) {
                     handleResult(data.photos[0]);
                 }
 });
//credit http://stackoverflow.com/a/8782422/52160

function dataURItoBlob(dataURI, callback) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs
        var byteString;
        if (dataURI.split(",")[0].indexOf("base64") >= 0) {
            byteString = atob(dataURI.split(",")[1]);
        } else {
            byteString = unescape(dataURI.split(",")[1]);
        }
        // separate out the mime component
        var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        // write the ArrayBuffer to a blob, and you're done
        var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        var bb = new BlobBuilder();
        bb.append(ab);
        return bb.getBlob(mimeString);
}
 
  });
});
