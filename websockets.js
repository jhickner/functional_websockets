(function(){
  var newWebSocketWithHandlers, defaultOpts;
  newWebSocketWithHandlers = function(arg$){
    var url, errorFn, openFn, closeFn, msgFn, ws;
    url = arg$.url, errorFn = arg$.errorFn, openFn = arg$.openFn, closeFn = arg$.closeFn, msgFn = arg$.msgFn;
    ws = new WebSocket(url);
    if (errorFn != null) {
      ws.addEventListener("error", errorFn(ws));
    }
    if (openFn != null) {
      ws.addEventListener("open", openFn(ws));
    }
    if (closeFn != null) {
      ws.addEventListener("close", closeFn(ws));
    }
    if (msgFn != null) {
      ws.addEventListener("message", msgFn(ws));
    }
    window.addEventListener("unload", function(){
      return ws.close();
    });
    return ws;
  };
  defaultOpts = {
    url: "ws://echo.websocket.org/",
    errorFn: curry$(function(ws, e){
      return console.log("websocket error: " + e);
    }),
    openFn: curry$(function(ws, e){
      return console.log("socket opened!");
    }),
    closeFn: curry$(function(ws, e){
      return console.log("socket closed!");
    }),
    msgFn: curry$(function(ws, e){
      return console.log("got data: " + e.data);
    })
  };
  window.ws = {
    create: newWebSocketWithHandlers,
    defaultOpts: defaultOpts
  };
  function curry$(f, args){
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      return params.push.apply(params, arguments) < f.length && arguments.length ?
        curry$.call(this, f, params) : f.apply(this, params);
    } : f;
  }
}).call(this);
