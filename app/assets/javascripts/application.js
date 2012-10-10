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
//= require jquery
//= require jquery_ujs
//= require all.js
//= require_self
//= require tagger.js
//= require api_client


$(document).ready(function () {
	
	$('#url').live('change',function(){
		var imgSrc = $('#url').val();	
		//alert(url);
		$('#image').attr('src', imgSrc);
		return false;
	});		
	
	var phinder;
	FB.init({ appId: '380411611996628', status: true, cookie: true, xfbml: true });
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
		phinder.start();			
	});
	
});

Phinder = {
	
   	init: function (data) {
	   this.api_secret = data.api_secret;
 	   this.api_key = data.api_key;
 	   this.faceUid = data.faceUid;
	   this.faceAccessToken = data.faceAccessToken;
	  
	   
	   var self = this; 
	        	   
	       var detect = function () {
			var callback = 'https://apps.facebook.com/phinder/';
			var imgSrc = $('#url').val();;
			//alert(imgSrc);
		     var url = 'http://api.face.com/faces/detect.json?api_key='+ self.api_key + 
		       '&api_secret=' + self.api_secret + '&urls=' + imgSrc + '&detector=Aggressive&attributes=all&user_auth=fb_user:' + self.faceUid +',fb_oauth_token:' + self.faceAccessToken+'';
			 
			console.log("Face detect");
			
			var a = new Face_Tagger(self.api_key);
			a.load('#image', {
				bReadOnly		:true,
				bManualTags		:true,
				bAddTagButton   :true,	
				bNamesAsLinks	:true,
				bResizable		:true,
				facebook		:false,
				bShowTagsList 	:true,
				bFadeTags		:true,
				error			: tagger_error,
				bTagsVisible	:true,
				bShowLoading	:true,
				bDetectFaces	:true,
				m_fbUser		:self.faceUid,
				m_fbAccessToken	:self.AccessToken,
				design			:'default'
			});
			
			
            function tagger_error(err)
            {
                if (err.error_code && err.error_message) {
                    $("#err").show().html("<b>" + err.error_code + "</b>: " + err.error_message);
                } else {
                    $("#err").show().html("<b>" + err + "</b>: ");
                }
            } 
					
			/*$.ajax({
				url : url,
				type : "POST",
				dataType : "jsonp",
				error : function(jqXHR, textStatus, errorThrown) {
					alert("Error!");
				},
				success : function(data, status) {
					// Codigo para depois da marcação
					console.log(data, 'FIM da marcação');
				},
				statusCode : {
					200 : function(data, textStatus, jqXHR) {
						//console.log(textStatus);
					}
				}
			});*/
   		 }
	   
	   var train = function (friends) {
	   	 console.log(friends, 'Amigos p/ treinar');
	     var uids = getUids(friends);
	     var callback = 'http://localhost:3000/callback';
		 //var uids = '100000541778094,100002346918029,100002197075243,100001239932859,100001156182765';
		 // Alessandro, , Loan, Julio, Lucas e Pamela
	     var url = 'http://api.face.com/faces/train.json?api_key=' + self.api_key 
	           + '&api_secret=' + self.api_secret + '&uids='+ uids 
	           +'&namespace=facebook.com&callback_url='+callback+'&user_auth=fb_user:' + self.faceUid + ',fb_oauth_token:' + self.faceAccessToken 
		console.log('Face Train');
		
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
					var file = $('#url').val();				
					recognize(file, uids);	
				},
				statusCode : {
					200 : function(data, textStatus, jqXHR) {
						//console.log(textStatus);
					}
				}
			});
    	}
    
	    var recognize = function (file, uids) {
		     //var uids = getFriendsUids(friends);
			var callback = 'http://localhost:3000/callback';
		     var url = 'http://api.face.com/faces/recognize.json?api_key='+ self.api_key 
		           +'&api_secret=' + self.api_secret + '&urls=' + file + '&uids=' + uids + '&namespace=facebook.com&detector=Aggressive&attributes=all&user_auth=fb_user:' + self.faceUid + ',fb_oauth_token:' + self.faceAccessToken + '&';
			
			console.log("Face recognize");
			$.ajax({
				url : url,
				type : "POST",
				dataType : "jsonp",
				error : function(jqXHR, textStatus, errorThrown) {
					alert("Error!");
				},
				success : function(data, status) {
					// Codigo para depois do reconhecimento
					console.log(data, 'FIM do reconhecimento');
				},
				statusCode : {
					200 : function(data, textStatus, jqXHR) {
						//console.log(textStatus);
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
					console.log('Amigos separados pelo genero: ', gender);				
					train(data);
					//detect();				
				},
				statusCode: {
					200: function(friends_uid, textStatus, jqXHR) {
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