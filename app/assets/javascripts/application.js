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

//aqui vou chamar o face detect enviando a foto ou url

$(document).ready(function () {
	var phinder;
	
	FB.getLoginStatus( function(response) {
		console.log(response.status);
			
		if (response.status === 'connected') {
			 phinder = Phinder.init({
					api_secret: '33ea94ef35a1571e910d738b79c1cec4',
					api_key: '635d01087f121344f80857f479853d05',
					faceUid: response.authResponse.userID,
					faceAccessToken: response.authResponse.accessToken
			});
		} else 
			if (response.status === 'not_authorized') {
				var oauth_url = 'https://graph.facebook.com/oauth/access_token?';
			        oauth_url += '?client_id=380411611996628';
					oauth_url += '&redirect_uri=' + encodeURIComponent('http://localhost:3000/');
		 			//oauth_url += '&scope=read_friendlists'
					window.top.location = oauth_url;
			} else {
					// the user isn't logged in to Facebook.
					FB.login(function(response) {});
			}
	});	
	

	
	$("#bSubmit").click(function() {
		phinder.start()	
	});
	
});



Phinder = {
	
   	init: function (data) {
	   this.api_secret = data.api_secret;
 	   this.api_key = data.api_key;
 	   this.faceUid = data.faceUid;
	   this.faceAccessToken = data.faceAccessToken;
	   
	   var self = this;
	   
	   var train = function (friends) {
	   	 console.log(friends);
	     //var uids = getFriendsUids(friends);
		 var uids = '100000541778094,559673936, 100002346918029, 100002197075243, 100000407437736, 100002395221311, 1319214018';
	     var url = 'http://api.face.com/faces/train.json?api_key=' + self.api_key 
	           + '&api_secret=' + self.api_secret + '&uids=' + uids 
	           + '&namespace=facebook.com&user_auth=fb_user:' + self.faceUid + ',fb_oauth_token:' + self.faceAccessToken;

		$.ajax({
			url : url,
			type : "POST",
			dataType : "jsonp",
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Error!");
			},
			success : function(data, status) {
				// Codigo para depois do treinameto
				console.log(data, 'FIM do treino');
			},
			statusCode : {
				200 : function(data, textStatus, jqXHR) {
					console.log("Face Train");
					console.log(data);
					console.log(textStatus);
				}
			}
		});
    }
    
    var getUids = function (friends) {
		var uids = "";
		$(friends.data).each(function(i, el) {
			uids += el.uid + ",";
		});
		return uids.slice(0, -1);
	}
    
    var start = function (){
    	var gender = $("input:radio[name=gender]")[0].checked ? "male" : "female";
    	var url = "https://graph.facebook.com/fql?q=SELECT uid FROM user WHERE ((sex='" + gender + "')AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me()))&access_token=" + self.faceAccessToken
    	$.ajax({
			url : url,
			async: true,
			type: "GET",
			dataType : "jsonp",
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Error!");
			},
			success: function(data, status) {
				train(data);
			},
			statusCode: {
				200: function(friends_uid, textStatus, jqXHR) {
					console.log("get uid's");
					//self.friends_uid = friends_uid;
					//console.log(friends_uid);
					//console.log(textStatus);
				}
			}
		});    	
    }
    return {
    	start: start
    };
  }
};