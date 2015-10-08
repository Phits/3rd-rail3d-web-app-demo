$(document).ready(function() {

var landingNav = function() {
  $('a.third-links').click(function (e){
  	console.log('Click');
	   e.preventDefault();
	   //var div_id = $('a.links').index($(this));
	   var href = $(this).attr("href");//get the href so we can navigate later
	   console.log('href is ' + href);
	   //$('.content').hide();
	   // $(href).show();
    $('.content').stop(true, true).fadeOut({ duration: 1000, queue: false }).slideUp(1000);
    $(href).stop(true, true).fadeIn({ duration: 1000, queue: false }).css('display', 'none').slideDown(1000);

	   var res = href.replace("#", "");
	   History.pushState({state:1}, res, '?' + res);
	   //console.log('div_id is ' + div_id);
	   //console.log('href is ' + res);
  });
} 

var browserBack = function(div_id) {
	   //History.pushState({state:1}, div_id, '?' + div_id);
	   //console.log('Browser Back and div_id is ' + div_id);landingNav(div_id);
	   $('.content').hide();
	   $('#' + div_id).show();
} 

// Bind to StateChange Event
History.Adapter.bind(window, 'statechange', function() {
  var State = History.getState();

  // returns { data: { params: params }, title: "Search": url: "?search" }
  //console.log(State); 
  //console.log("State ID = " + State.url);
    urlIs();
});

var urlIs = function() {
	if(window.location.href.indexOf("") > -1) {
           //console.log("Welcome!");
           browserBack('landing-welcome');
    }
	if(window.location.href.indexOf("landing-welcome") > -1) {
           //console.log("Welcome!");
           browserBack('landing-welcome');
    }
    if(window.location.href.indexOf("upload") > -1) {
           //console.log("about!");
           browserBack('upload');
           $('.upload-success').addClass('sharing-hide');
           $('.upload-submit').removeClass('sharing-hide');
    }
    if(window.location.href.indexOf("community") > -1) {
           //console.log("careers!");
           browserBack('community');
    }
    if(window.location.href.indexOf("locations") > -1) {
           //console.log("locations!");
           browserBack('locations');
    }
    if(window.location.href.indexOf("shop") > -1) {
           //console.log("advertise!");
           browserBack('shop');
    }
    if(window.location.href.indexOf("incubator") > -1) {
           //console.log("product!");
           browserBack('incubator');
    }
     if(window.location.href.indexOf("shop") > -1) {
           //console.log("product!");
           browserBack('shop');
    }
    if(window.location.href.indexOf("production") > -1) {
           //console.log("product!");
           browserBack('production');
    }
    if(window.location.href.indexOf("retail") > -1) {
           //console.log("product!");
           browserBack('retail');
    }
    if(window.location.href.indexOf("incubator") > -1) {
           //console.log("product!");
           browserBack('incubator');
    }
}

// Chat
  function showChat(whichChat) {
    if ( $('.chat-window').hasClass( "chat-hide" ) ) {
      $('.chat-window').addClass('chat-hide');
    }
    if ( $( "." + whichChat ).hasClass( "chat-hide" ) ) {
      $('.' + whichChat).removeClass('chat-hide');
    } 
  }
   $(".chat-name a").click(function(e){
    e.preventDefault();//this will prevent the link trying to navigate to another page
    var href = $(this).attr("href");//get the href so we can navigate later

    if ( $( "." + href ).hasClass( "chat-hide" ) ) {
      showChat(href);
    } else {
       $('.' + href).addClass('chat-hide');
    }
  });

// Collapse Nav bar on click for mobile
$(".third-links").click(function(event) {
    $(".navbar-collapse").collapse('hide');
});

// Toggle Sharing link 
$(".shareToggle").click(function () {
  $('.sharing').toggleClass('sharingExpand');
  $('.sharing form').toggleClass('sharing-hide');
});

// Upload 3D Print Submit 
$(".upload-btn").click(function () {
  $('.upload-success').toggleClass('sharing-hide');
  $('.upload-submit').toggleClass('sharing-hide');
});

// Upload fake file
$('.custom-upload input[type=file]').change(function(){
    $(this).next().find('input').val($(this).val());
});

$(".responsive-calendar").responsiveCalendar({
  time: '2015-03',
  events: {
    "2015-03-30": {"url": "#cal-1-c"},
    "2015-03-26": {"url": "#cal-1-b"},
    "2015-03-03":{"url": "#cal-1-a"}
  }
});

$(".responsive-calendar-2").responsiveCalendar({
  time: '2015-03',
  events: {
    "2015-03-09": {"url": "#cal-2-a"},
    "2015-03-18": {"url": "#cal-2-b"},
    "2015-03-27":{"url": "#cal-2-c"}
  }
});

$(".responsive-calendar-3").responsiveCalendar({
  time: '2015-03',
  events: {
    "2015-03-04": {"url": "#cal-3-a"},
    "2015-03-19": {"url": "#cal-3-b"},
    "2015-03-29":{"url": "#cal-3-c"}
  }
});
     

landingNav();
urlIs();
//History.pushState({state:1}, "landing-welcome", "?landing-welcome");


}); /* End document ready */
