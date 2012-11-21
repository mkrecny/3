(function(){

  function setupContentPane(){
    var w = $(window).width()
      , h = $(window).height()
      , smaller = w>h ? h : w
      , size = smaller*.7
      , top = (h-size)/2
      , left = (w-size)/2;
    $('#content').css({height:size,width:size,top:top,left:left});
  }

  window.initVideoPlayer = function(cb){
    var f = $('iframe')
    , url = f.attr('src').split('?')[0];

    // Listen for messages from the player
    if (window.addEventListener){
      window.addEventListener('message', onMessageReceived, false);
    } else {
      window.attachEvent('onmessage', onMessageReceived, false);
    }

    // Interaction functions

    function play(){
      post('play');
    }

    // Handle messages received from the player
    function onMessageReceived(e) {
      var data = JSON.parse(e.data);

      switch (data.event) {
        case 'ready':
          onReady();
          break;

        case 'playProgress':
          //onPlayProgress(data.data);
          break;

        case 'pause':
          onPause();
          break;

        case 'finish':
          onFinish();
          break;
      }
    }

    // Call the API when a button is pressed
    $('button').on('click', function() {
      post($(this).text().toLowerCase());
    });

    // Helper function for sending a message to the player
    function post(action, value) {
      var data = { method: action };

      if (value) {
        data.value = value;
      }

      f[0].contentWindow.postMessage(JSON.stringify(data), url);
    }

    function onReady() {
      post('addEventListener', 'pause');
      post('addEventListener', 'finish');
      //post('addEventListener', 'playProgress');

      post('setVolume', '0');
      post('play');
      setupContentPane();
      $('#content').fadeIn(100, cb);
    }

    function onPause() {
      console.log('paused');
    }

    function onFinish() {
      console.log('finished');
    }

    function onPlayProgress(data) {
      //console.log(data.seconds + 's played');
    }
  };
})();
