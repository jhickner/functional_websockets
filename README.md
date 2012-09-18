Functional Websockets
=====================

A simple wrapper that makes it more convenient to work with websockets in
a functional style.

```livescript
ws = FWS.create FWS.defaultOpts <<< openFn: (ws, e) --> ws.send "hello server!"
```
