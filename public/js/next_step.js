(function(){
  window.nextStep = function(){
    window.currentContent+=1;
    window.insertCurrentContent();
  };
  window.goToStep = function(step){
    window.currentContent=step;
    window.insertCurrentContent();
  };
})();
