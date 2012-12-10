(function(){

  function centerElement(el, iw, ih){

    var w = $('#content').width()
      , h = $('#content').height();

    var css_opts = {
      position:'absolute',
      display:'none',
      top:(h-ih)/2,
      left:(w-iw)/2
    };
      
    $(el).css(css_opts);
  }

  window.insertCurrentContent = function(){
    $('#content').children().fadeOut(function(){

    });
    var cid = window.currentContent;
    var imgLoad = $('<img class="main-image" />');
    imgLoad.attr("src", "/img/"+cid+".jpg" + "?" + new Date().getTime());
    imgLoad.unbind("load");
    imgLoad.bind("load", function(){
      $('#status').text(cid);
      centerElement(imgLoad, this.width, this.height);
      $('#content').append(imgLoad);
      $(imgLoad).fadeIn(2000);
      var aid = 'audio_'+cid;
      var src = '/audio/'+cid+'.ogg';
      $('#content').append('<audio id="'+aid+'"><source src="'+src+'" type="audio/ogg"> </audio>');
      document.getElementById(aid).play();
      document.getElementById(aid).addEventListener('ended', function(){
        console.log('audio ended');
        setTimeout(function(){
          window.nextStep();
        }, 400);
      }, false);

    });
  }

})();
