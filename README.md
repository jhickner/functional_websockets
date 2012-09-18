Functional Websockets
=====================

A simple wrapper that makes it more convenient to work with websockets in
a functional style.

```livescript
ws = FWS.create <| FWS.defaultOpts <<< open: (ws, e) --> ws.send "hello server!"
```
