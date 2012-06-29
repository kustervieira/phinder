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
<<<<<<< HEAD

FB.init({ appId: '380411611996628', status: true, cookie: true, xfbml: true });
    FB.Event.subscribe('auth.login', function (response) {
        window.location.reload();
    });
=======
>>>>>>> d9123e31efe4f5130a56653357f81a2d6c9c2b32
