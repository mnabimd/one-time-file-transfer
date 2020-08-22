// Preloader
$(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});

// Menu Dropdowns on hover:
$(document).ready(function(){
  $(".dropdown, .btn-group").hover(function(){
      var dropdownMenu = $(this).children(".dropdown-menu");
      if(dropdownMenu.is(":visible")){
          dropdownMenu.parent().toggleClass("open");
      }
  });
}); 


// Show popovers without clicking:
$('#upload-button').popover('show');

// .Card hover icon large color:
$('#features .card').hover(function () {
  const icon = $(this)[0].children[0];
 icon.style.color = '#FF6000'
}, function () {
  const icon = $(this)[0].children[0];
 icon.style.color = '#343a40'
})