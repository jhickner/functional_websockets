newWebSocketWithHandlers = ({url, errorFn, openFn, closeFn, msgFn}) ->
  ws = new WebSocket url
  if errorFn? then ws.addEventListener "error" (errorFn ws)
  if openFn? then ws.addEventListener "open" (openFn ws)
  if closeFn? then ws.addEventListener "close" (closeFn ws)
  if msgFn? then ws.addEventListener "message" (msgFn ws)
  window.addEventListener "unload" (-> ws.close!)
  ws

defaultOpts = url: "ws://echo.websocket.org/"
            , errorFn: (ws, e) --> console.log "websocket error: #{e}"
            , openFn:  (ws, e) --> console.log "socket opened!"
            , closeFn: (ws, e) --> console.log "socket closed!"
            , msgFn:   (ws, e) --> console.log "got data: #{e.data}"

window.ws =
  create: newWebSocketWithHandlers
  defaultOpts : defaultOpts
