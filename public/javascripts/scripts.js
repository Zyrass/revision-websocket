window.addEventListener("DOMContentLoaded", () => {
  
  // INITIALISATION
  websocketInit()

})

// FONCTIONS
const newMessage = ( 
  urlImg, 
  pseudo,
  message,
  date =  new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    year: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  })
) => {

  // sélection du parent
  const section = document.getElementById("tchat-container")

  // création des éléments nécessaire
  const dl = document.createElement("dl")
  const divLeft = document.createElement("div")
  const divRight = document.createElement("div")
  const img = document.createElement("img")
  const dt = document.createElement("dt")
  const h4 = document.createElement("h4")
  const dd = document.createElement("dd")

  // ajout des classes correspondante aux 2 div
  divLeft.classList.add("left")
  divRight.classList.add("right")

  // ajout de mes 2 div dans mon tag "dl"
  dl.appendChild(divLeft)
  dl.appendChild(divRight)

  // ajout des attributs pour l'image de profile
  img.width = "60px"
  img.alt = `${pseudo} présente son image de profile`
  img.src = urlImg

  // ajout de l'image dans la "divLeft"
  divLeft.appendChild(img)

  // ajout des tags "dt" et "dd" dans ma divRight
  divRight.appendChild(dt)
  divRight.appendChild(dd)

  // création du contenu de l'auteur du message
  h4.innerHTML = `
    ${pseudo}<br />
    <span>
      <small>${date}</small>
    </span>
  `

  // ajout de l'auteur dans le tag "dt"
  dt.appendChild(h4)

  // ajout du message dans le tag "dd"
  dd.innerText = message

  // ajout du tag "dl" 100% créé à la suite de ma section
  section.appendChild(dl)

  // Faire en sorte que le scroll soit tout en bas
  section.scrollTo(0, section.scrollHeight)
}

const websocketInit = () => {

  // CONSTANTES
  const input     = document.querySelector("input")
  const btn       = document.querySelector("button")
  
  // API WEBSOCKET
  const websocket = new WebSocket(`ws://localhost:3001`)

  // ETATS
  websocket.onopen  = () => console.log("Bonjour et bienvenue.");
  websocket.onerror = error => console.log("Error", error);
  
  // CONTENU DU MESSAGE SORTANT - envoie - (Issue du client)
  btn.addEventListener('click', $e => {
    $e.preventDefault()
    // SI 0 caractère on envoie rien
    if (input.value.length > 0 ) {
      // ETAPE 1 - Ce message sera affiché sur mon écran
      newMessage("https://static.vecteezy.com/ti/vecteur-libre/p1/1840612-image-profil-icon-male-icon-human-or-people-sign-and-symbol-vector-gratuit-vectoriel.jpg", "Alain Guillon", input.value)
      // ETAPE 2 - J'envoie le contenu de l'input au server !!
      websocket.send(input.value)
      // ETAPE 3 - Je vide le contenu du champ input !!
      input.value = ""      
    }
  })

  // CONTENU DU MESSAGE ENTRANT - récupération - (Issue du server)
  websocket.onmessage = messageDuServer => {

    // ETAPE 4 - Affichage du message récupérer par le server
    // console.log(messageDuServer.data)
    newMessage("https://static.vecteezy.com/ti/vecteur-libre/p1/1840612-image-profil-icon-male-icon-human-or-people-sign-and-symbol-vector-gratuit-vectoriel.jpg", "Alain Guillon", messageDuServer.data)

  }

}

/**
 * -----------------------------------------------------------------------------
 * CLIENT
 * -----------------------------------------------------------------------------
 */
