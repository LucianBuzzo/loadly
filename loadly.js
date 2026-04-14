;(function() {
  var spinnerInterval;
  var loadly = {
    spinner: function (prefix, end) {
      clearInterval(spinnerInterval);
      var spinner = ['-','\\','|','/'], i = 0, l = spinner.length;
      prefix = (typeof prefix === 'string' && prefix.length > 0)
        ? '# ' + prefix + ' '
        : '# ';
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
      var barWidth = 20;
      var safeTotal = (typeof total === 'number' && total > 0) ? total : 1;
      var safeComplete = (typeof complete === 'number') ? complete : 0;
      var ratio = safeComplete / safeTotal;
      var width = Math.floor(barWidth * ratio);

      if (width < 0) width = 0;
      if (width > barWidth) width = barWidth;

      var bar = new Array(width + 1).join('█') + new Array(barWidth + 1 - width).join('▒');
      window.location.hash = '# ' + bar + ' ' + complete + '/' + total;
      if ( end || complete === total ) {
        window.location.hash = '# Complete!';
      }
    }
  };

  window.loadly = loadly;
}());
