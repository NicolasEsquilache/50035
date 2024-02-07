const socket = io()
socket.emit("mensaje", "Comunicacion desde websocket")