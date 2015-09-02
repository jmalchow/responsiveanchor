(function(){
  'use strict';

  // Custom Breakpoint Event
  var event = new CustomEvent('breakpoint', {
        breakpoint: null,
        detail: {
          breakpoint: null
        },
        bubbles: true,
        cancelable: true
      }),
      _timeout = null,
      _breakpoints = {
        sm: [0, 639],
        md: [640, 959],
        lg: [960, 3200]
      },
      _current = null;

  // Resize Handler
  window.onresize = window.onorientationchange = function(){
    // Throttle Resize
    if(!!_timeout) clearTimeout(_timeout);
    _timeout = setTimeout(function(){
      // Custom Breakpoints
      if('breakpoints' in window) _breakpoints = window.breakpoints;
      var breakpoint = (function(){
            var width = window.innerWidth;
            for(var breakpoint in _breakpoints){
              if(width >= _breakpoints[breakpoint][0] && width <= _breakpoints[breakpoint][1]) return breakpoint;
            }
          })();
      if(_current === breakpoint) return;
      window.breakpoint = event.breakpoint = event.detail.breakpoint = _current = breakpoint;
      window.dispatchEvent(event);
    }, 350);
  };

  window.dispatchEvent(new CustomEvent('resize')); // Dispatch Resize Event to Trigger First Event on Start
})();

(function() {
  'use strict';

  // 728x90
  var iframe = document.createElement('iframe');
  //var html = '<body><script type="text/javascript" src="http://a.intgr.net/tags/3_1.js"></script></body>';
  //iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
  iframe.src = 'ad-728x90.html';
  // Styles
  iframe.style.width = '728px';
  iframe.style.height = '90px';
  iframe.style.padding = '0';
  iframe.style.overflow = 'hidden';
  iframe.style.border = 0;
  iframe.style.position = 'fixed';
  iframe.style.bottom = 0;
  iframe.style.left = '50%';
  iframe.style.marginLeft = '-364px';
  //iframe.style.backgroundColor = '#000';
  document.body.appendChild(iframe);
  console.log('iframe.contentWindow =', iframe.contentWindow);

  window.addEventListener('breakpoint', function(e) {
    switch(e.breakpoint) {
      case 'sm':
        iframe.style.width = '300px';
        iframe.style.height = '250px';
        iframe.style.marginLeft = '-150px';
        iframe.src = 'ad-300x250.html';
        break;
      default:
        iframe.style.width = '728px';
        iframe.style.height = '90px';
        iframe.style.marginLeft = '-364px';
        iframe.src = 'ad-728x90.html';
    }
  });

  console.log(iframe);
})();
