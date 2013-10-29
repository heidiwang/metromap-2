// http://masonry.desandro.com/masonry.pkgd.js added as external resource

// http://masonry.desandro.com/components/classie/classie.js added as external resource

docReady( function() {

  var container = document.querySelector('.masonry');
  var msnry = new Masonry( container, {
    columnWidth: 50
  });

$('#addTileButton').bind('click', function() {
  var testClass = document.createElement('div');
testClass.id ='test';
testClass.className = "item";
var rand = Math.random()*100;
console.log(rand);
testClass.style.width=rand +"px";
var rand = Math.random()*100;
testClass.style.height=rand +"px";


container.appendChild( testClass );
msnry.appended( testClass );
msnry.layout();

});



});