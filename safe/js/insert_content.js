(function(){

  function centerElement(el){
    var w = $('#content').width()
      , h = $('#content').height()
      , smaller = w>h ? h : w
      , size = smaller*.7
      , top = (h-size)/2
      , left = (w-size)/2;
    $(el).css({position:'absolute',height:size,width:size,top:top,left:left});
  }

  window.insertContent = function(template_id){
    $('#content').html('');
    var el = $($('#'+template_id).html());
    centerElement(el);
    $('#content').append(el);
  }
})();
