// Dépendances
const path    = require("path")
const express = require("express")
const ws      = require("ws")

// Application
const app = express()
const port = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, "public")))

app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views/index.html"))
})

const server = app.listen(port, () => console.log(`Server démarré sur http://localhost:${port}`))

// Websocket
const wss = new ws.Server({ server: server })

wss.on("connection", (socket, req) => {
  socket.send("Bienvenue sur cette révision.");
  console.log(socket, req)
})

wss.on("headers", (headers, req) => {
  console.log(headers)
})
