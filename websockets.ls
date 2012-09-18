newWebSocketWithHandlers = ({url, error, open, close, message}) ->
  ws = new WebSocket url
  if errorFn? then ws.addEventListener "error" (error ws)
  if openFn? then ws.addEventListener "open" (open ws)
  if closeFn? then ws.addEventListener "close" (close ws)
  if msgFn? then ws.addEventListener "message" (message ws)
  window.addEventListener "unload" (-> ws.close!)
  ws

defaultOpts = url: "ws://echo.websocket.org/"
            , error: (ws, e) --> console.log "websocket error: #{e}"
            , open:  (ws, e) --> console.log "socket opened!"
            , close: (ws, e) --> console.log "socket closed!"
            , message:   (ws, e) --> console.log "got data: #{e.data}"

window.FWS =
  create: newWebSocketWithHandlers
  defaultOpts : defaultOpts
