var player = require("./player")
module.exports.UI = {
    'ListDisplaySongs': (listOfMp3s) =>{
        var ul = document.getElementById("songs")

        for(var i = 0; i < listOfMp3s["file"].length ; i++){
            var li = document.createElement("li")
            var link = document.createElement("a")
            link.setAttribute("href", listOfMp3s['path'][i])
            link.setAttribute("class", "grey-text text-darken-1")
            link.addEventListener("click", function(e){
                e.preventDefault()
                var music = this.getAttribute("href")
                player.addSongs(music)
            })
            link.appendChild(document.createTextNode(listOfMp3s['file'][i]))
            li.setAttribute("class", "collection-item")
            li.appendChild(link)
            ul.appendChild(li)
            
        }
    },
    'LoadNav':() =>{
        var navbarFixed = document.getElementById("nav")
        
        var navExtended = document.createElement("nav")
        navExtended.setAttribute("class", "nav-extended white")
       
        var containerDiv = document.createElement("div")
        containerDiv.setAttribute("class", "container")
        
        var navWrapper =  document.createElement("div")
        navWrapper.setAttribute("class", "nav-wrapper")

        var alogo = document.createElement("a")
        alogo.setAttribute("href", "#")
        alogo.setAttribute("class", "brand-logo center grey-text text-darken-3")
        alogo.appendChild(document.createTextNode("Logo"))
        navWrapper.appendChild(alogo)
        var ul = document.createElement("ul")
        ul.setAttribute("class", "right")
        var pa = document.createElement("li")
        pa.setAttribute("id", "pa")
        var pl = document.createElement("li")
        pl.setAttribute("id", "pl")
        var next = document.createElement("li")
        next.setAttribute("id", "nxt")
        ul.appendChild(pa)
        ul.appendChild(pl)
        ul.appendChild(next)
        navWrapper.appendChild(ul)

        containerDiv.appendChild(navWrapper)

        var navContent = document.createElement("div")
        navContent.setAttribute("class", "nav-content")
        var ul2 = document.createElement("ul")
        ul2.setAttribute("class", "tabs tabs-transparent")
        var alb = document.createElement("li")
        alb.setAttribute("class", "tab")
        var aalb = document.createElement("a")
        aalb.setAttribute("class", "grey-text text-darken-3")
        aalb.appendChild(document.createTextNode("Albums"))
        aalb.addEventListener("click", function(e){
            e.preventDefault()
            var songDP = document.getElementById("songs")
            songDP.style.display = "none"
            var albDP = document.getElementById("albums")
            albDP.style.display = "block"
        })
        alb.appendChild(aalb)

        var song = document.createElement("li")
        song.setAttribute("class", "tab")
        var asong = document.createElement("a")
        asong.setAttribute("class", "grey-text text-darken-3")
        asong.appendChild(document.createTextNode("Songs"))
        asong.addEventListener("click", function(e){
            e.preventDefault()
            var songDP = document.getElementById("songs")
            songDP.style.display = "block"
            var albDP = document.getElementById("albums")
            albDP.style.display = "none"
        })
        song.appendChild(asong)
        navContent.appendChild(alb)
        navContent.appendChild(song)
        containerDiv.appendChild(navContent)

        navExtended.appendChild(containerDiv)
        navbarFixed.appendChild(navExtended)
        document.body.appendChild(navbarFixed)

    },
    'LoadControlButtons': () =>{

        // adding control buttons
        console.log("Loading controls")
        var playBtn = document.createElement("button")
        playBtn.appendChild(document.createTextNode('Play'))
        playBtn.setAttribute("id", "playBtn")
        playBtn.setAttribute("class", "btn btn-waves waves effect blue")
        playBtn.addEventListener("click", function(e){
            //console.log(this.innerHTML === 'Play')
        if(this.innerHTML == "Play"){

                this.innerHTML = "Pause"
                player.play()

            }
            else if(this.innerHTML == "Pause"){
                console.log('pause')
                this.innerHTML = "Resume"
                player.pause()

            }
            else if(this.innerHTML == "Resume"){
                console.log('resume')
                this.innerHTML = "Pause"
                player.resume()

            }

        })

        var nextBtn = document.createElement("button")
        nextBtn.appendChild(document.createTextNode("Next"))
        nextBtn.setAttribute("class", "btn btn-waves waves effect blue")
        nextBtn.addEventListener("click", function(e){
            player.next()
        })

        var stopBtn = document.createElement("button")
        stopBtn.appendChild(document.createTextNode("Stop"))
        stopBtn.setAttribute("class", "btn btn-waves waves effect blue")
        stopBtn.addEventListener("click", function(e){
            player.stop()
            playBtn.innerHTML = "Play"
        })
        // appending to main body
        var pl = document.getElementById("pl")
        pl.appendChild(playBtn)
        var nxt = document.getElementById("nxt")
        nxt.appendChild(nextBtn)
        var pa = document.getElementById("pa")
        pa.appendChild(stopBtn)
    },
    'ListDisplayAlbum':(db) =>{
        var mainRow = document.getElementById("albums")
        var localdb = new Set(db["album"])
         
        localdb.forEach(element => {
            // now apply filter in original database
            var upperCol = document.createElement("div")
            upperCol.setAttribute("class", "col s12 m3")
            var card = document.createElement("div")
            card.setAttribute("class", "card")
            var imgCard = document.createElement("div")
            // for(var i=0;i<db["path"].length; i++){
            //     if(element == db["album"][i]){
            //         console.log(db["path"][i])
                    
            //     }
            // }
            imgCard.setAttribute("class", "card-image")
            var img = document.createElement("img")
            img.setAttribute("src", "m.png")
            imgCard.appendChild(img)
            var spanTitle = document.createElement("span")
            spanTitle.setAttribute("class", "card-title")
            spanTitle.appendChild(document.createTextNode(element))
            imgCard.appendChild(spanTitle)
            console.log(element)
            
            card.appendChild(imgCard)
            upperCol.appendChild(card)
            mainRow.appendChild(upperCol)
            document.body.appendChild(mainRow)
        });
        
    }

}