(function(){
  var newWebSocketWithHandlers, defaultOpts;
  newWebSocketWithHandlers = function(arg$){
    var url, error, open, close, message, ws;
    url = arg$.url, error = arg$.error, open = arg$.open, close = arg$.close, message = arg$.message;
    ws = new WebSocket(url);
    if (error != null) {
      ws.addEventListener("error", error(ws));
    }
    if (open != null) {
      ws.addEventListener("open", open(ws));
    }
    if (close != null) {
      ws.addEventListener("close", close(ws));
    }
    if (message != null) {
      ws.addEventListener("message", message(ws));
    }
    window.addEventListener("unload", function(){
      return ws.close();
    });
    return ws;
  };
  defaultOpts = {
    url: "ws://echo.websocket.org/",
    error: curry$(function(ws, e){
      return console.log("websocket error: " + e);
    }),
    open: curry$(function(ws, e){
      return console.log("socket opened!");
    }),
    close: curry$(function(ws, e){
      return console.log("socket closed!");
    }),
    message: curry$(function(ws, e){
      return console.log("got data: " + e.data);
    })
  };
  window.FWS = {
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
