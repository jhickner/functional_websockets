newWebSocketWithHandlers = ({url, error, open, close, message}) ->
  ws = new WebSocket url
  if error? then ws.addEventListener "error" (error ws)
  if open? then ws.addEventListener "open" (open ws)
  if close? then ws.addEventListener "close" (close ws)
  if message? then ws.addEventListener "message" (message ws)
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
