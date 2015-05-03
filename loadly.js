;(function() {
  var spinnerInterval;
  var loadly = {
    spinner: function (prefix, end) {
      clearInterval(spinnerInterval);
      var spinner = ['-','\\','|','/'], i = 0, l = spinner.length;
      prefix = '# ' + prefix + ' ' || '# ';
      if (end) {
        window.location.hash = prefix;
        return;
      }
      spinnerInterval = setInterval(function () {
        window.location.hash = prefix + spinner[i++];
        if (i == l) i = 0;
      }, 100);
    },
    progress: function (complete, total, end) {
      clearInterval(spinnerInterval);
      var barWidth = 20, width = Math.floor(barWidth*(complete/total));
      var bar = new Array(width + 1).join('█') + new Array(barWidth + 1 - width).join('▒');
      //window.location.hash = '# ' + bar + ' ' + complete + '/' + total;
      window.location.hash = '# ' + bar + ' ' + complete + '/' + total;
      if ( end || complete === total ) {
        window.location.hash = '# Complete!';
      }
    }
  };

  window.loadly = loadly;
}());
