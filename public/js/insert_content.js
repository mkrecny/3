(function(){

  function centerElement(el){
    var w = $('#content').width()
      , h = $('#content').height()
      , smaller = w>h ? h : w
      , size = smaller*.7
      , top = (h-size)/2
      , left = (w-size)/2
      , css_opts = {
      "text-align":"center",
      position:'absolute',
      display:'none',
      height:size,
      width:size,
      top:top,
      left:left};
    $(el).css(css_opts);
  }

  window.insertCurrentContent = function(){
    var template_id = 'c'+window.currentContent;
    $('#content').html('');
    var el = $($('#'+template_id).html());
    centerElement(el);
    $('#content').append(el);
    $(el).fadeIn(2000);
    setTimeout(function(){
      window['initContent'+window.currentContent]();
    }, 1000);
  }

})();
