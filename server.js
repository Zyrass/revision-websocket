// Dépendances
const path    = require("path")
const express = require("express")
const ws      = require("ws")

// Application
const app     = express()
const port    = process.env.PORT || 3001

// Middlewares
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))

// Routing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"))
})

app.get("/tchat", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/tchat.html"))
})

app.post("/tchat", (req, res) => {
  console.log(req.body.msg)
  res.sendFile(path.join(__dirname, "./views/tchat.html"))
})

app.get("*", (req, res) => {
  res.redirect("/tchat")
})

const server = app.listen(port, () => console.log(`Server démarré sur http://localhost:${port}`))
const wss = new ws.Server({ server: server, clientTracking: true })

// Une nouvelle connexion WebSocket est établie
wss.on("connection", (socket, req) => {

  console.log(req.params)
  
  socket.on("message", (messageDuClient) => {
    const clients = wss.clients
    for ( client of clients ) {
      if ( client !== socket && client.readyState === ws.OPEN) {
        console.log("message du server envoyé")
        client.send(messageDuClient)
      }
    }
  })

})

wss.on("error", (err) => {
  console.log(err)
})

/**
 * -----------------------------------------------------------------------------
 * SERVER
 * -----------------------------------------------------------------------------
 */
