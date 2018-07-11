
module.exports.UI = {
    'ListDisplaySongs': (SongsDB, player) =>{
        var ul = document.getElementById("songs")
        console.log(SongsDB["file"].length)
        for(var i = SongsDB["indexLastDisplayer"] +1; i < SongsDB["file"].length ; i++){
            var li = document.createElement("li")
            li.setAttribute("class", "collection-item avatar hoverable")
            li.setAttribute("style", "font-size:12px")
            var img = document.createElement("img")
            if(SongsDB['tags'][i]['picture'].length ==1){
                var imgobj = SongsDB['tags'][i]['picture']
                var b64 = ""
                    for(let i=0; i<imgobj[0]['data'].length; i++){
                        b64 += String.fromCharCode(imgobj[0]['data'][i])
                    }
                    var b64img = 'data:image/' + imgobj[0]['format'] + ';base64,' + window.btoa(b64)
                    img.setAttribute("src", b64img)
            }
            else{
                img.setAttribute("src", "images/default_art.png")
            }
            img.setAttribute("class", "circle")
            var span = document.createElement("span")
            span.setAttribute("class", "title")
            
            if(SongsDB['tags'][i]['title']!="" && SongsDB['tags'][i]['title']!=undefined)
                {
                    span.appendChild(document.createTextNode(SongsDB['tags'][i]['title']))
                }
            else{
                span.appendChild(document.createTextNode(SongsDB['file'][i]))
            }
            var p = document.createElement("p")
            if(SongsDB['tags'][i]['artist'][0]!="" && SongsDB['tags'][i]['artist'][0]!=undefined){
                p.appendChild(document.createTextNode(SongsDB['tags'][i]['artist'][0]))
            }
            else{
                p.appendChild(document.createTextNode("Unknown"))
            }
           
            p.appendChild(document.createElement("br"))
            if(SongsDB['tags'][i]['album']!="" && SongsDB['tags'][i]['album']!=undefined){
                p.appendChild(document.createTextNode(SongsDB['tags'][i]['album']))
            }
            else{
                p.appendChild(document.createTextNode("Unknown"))
            }
            var link = document.createElement("a")
            link.setAttribute("href", SongsDB['path'][i])
            link.setAttribute("class", "secondary-content btn-floating grey hoverable")
            var i_ = document.createElement("i")
            i_.setAttribute("class", "material-icons")
            i_.appendChild(document.createTextNode("play_arrow"))
            link.addEventListener("click", function(e){
                e.preventDefault()
                var music = this.getAttribute("href")
                M.toast({html: 'Added to playlist', classes: 'rounded'});
                player.AddSongs(music)
                // console.log(player)
            })
            link.appendChild(i_)
            li.onmouseover = function(){
                this.style.background = "#ffff"
            }
            li.onmouseout = function(){
                this.style.background = 'white'
            }
            
            li.appendChild(img)
            li.appendChild(span)
            li.appendChild(p)
            li.appendChild(link)
            ul.appendChild(li)
            // console.log(SongsDB['path'][i])
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
        // document.body.appendChild(navbarFixed)

    },
    'LoadControlButtons': (player) =>{

        // adding control buttons
        console.log("Loading controls")
        var playBtn = document.getElementById("playBtn")
       
        playBtn.addEventListener("click", function(e){
            //console.log(this.innerHTML === 'Play')
            e.preventDefault()
            console.log(player.GetPlayList() != [] && player.IsPlaying() == false)
            console.log(player.GetPlayList()) 
        if(player.GetPlayList().length>0 && player.IsPlaying() == false){
 
                player.Play()

            }
            else if(player.GetPlayList().length>0 && player.IsPaused() == false && player.IsPlaying() == true){
                
                player.Pause()

            }
            else if(player.GetPlayList().length>0 && player.IsPaused() == true && player.IsPlaying() == true){
                
                player.Resume()

            }

        })

        var nextBtn = document.getElementById("nextBtn")
       
        nextBtn.addEventListener("click", function(e){
            if(player.GetPlayList().length > 0){
                player.Next()
            }  
        })

        var stopBtn = document.getElementById("stopBtn")
       
        stopBtn.addEventListener("click", function(e){
            player.Stop()
             
        })

        var previousBtn = document.getElementById("prevBtn")
       
        previousBtn.addEventListener("click", function(e){
            player.Previous()
             
        })
        var repeatBtn = document.getElementById("repeatBtn")
        repeatBtn.addEventListener("click", function(e){
            e.preventDefault()
            player.setRepeat()
        })
        

         
    },
    'playlistDisplay': function(player){
        var playlistUL = document.getElementById("playlist")
        if(player.GetPlayList().length == 0){
            while(playlistUL.hasChildNodes()){
                playlistUL.removeChild(playlistUL.lastChild)
            }

            var lis = document.createElement("li")
            var a = document.createElement("a")
            a.setAttribute("href", "#")
            a.setAttribute("class", "grey-text")
            a.addEventListener("click", function(){
                e.preventDefault()
            })
            var i = document.createElement("i")
            i.setAttribute("class", "material-icons")
            i.innerHTML = "hourglass_empty"
            a.appendChild(document.createTextNode("No songs :/"))
            a.appendChild(i)
            lis.appendChild(a)
            
            playlistUL.appendChild(lis)
        }
        if(player.GetPlayList().length >0){
            if(player.GetPlayList().length == 1){
                playlistUL.removeChild(playlistUL.firstChild)
            }
            var playlist = player.GetPlayList()
            var SongsDB = player.GetSongsDB()
            
            var li = document.createElement("li")

            var index = SongsDB['path'].findIndex(result => result == playlist[playlist.length-1])
            console.log(SongsDB['file'],playlist[playlist.length-1],index)
            var keys = Object.keys(SongsDB['tags'][index])
            var name = undefined
            if(keys[0]=="title"){
                name = SongsDB['tags'][index][keys[0]]
            } 
            if(name == undefined || name ==""){
                name = SongsDB['file'][index]
            }

            var a = document.createElement("a")
            a.setAttribute("href", "#")
            a.setAttribute("class", "grey-text")
            a.addEventListener("click", function(){
                e.preventDefault()
            })
            a.appendChild(document.createTextNode(player.GetPlayList().length + '. ' +name))
            li.appendChild(a)
            playlistUL.appendChild(li)

          
        }
    },
    'ListDisplayAlbum':(SongsDB, player) =>{
        var mainRow = document.getElementById("albums")
        var localdb = new Set(SongsDB['album'])
 
        // console.log(db)
        
        var ulCollapsible = document.createElement("ul")
        ulCollapsible.setAttribute("class", "collapsible")
        localdb.forEach(element => {
            console.log(element)
            // now apply filter in original database

            var upperCol = document.createElement("li")
            // upperCol.setAttribute("class", "col s12 m4")
            var collapsibleHeader = document.createElement("div")
            collapsibleHeader.setAttribute("class", "collapsible-header")


            var img = document.createElement("img")
            img.setAttribute("style", "height:120px;width:120px;")
            
            var listOfMp3 = []
            for(var i=0;i<SongsDB["path"].length; i++){
                if(element == SongsDB["album"][i]){
                    console.log(SongsDB["path"][i]) 
                    listOfMp3.push({'tags':SongsDB['tags'][i], 'path':SongsDB['path'][i], 'file':SongsDB['file'][i]})
                }
            }
            var song = listOfMp3[0]
            // console.log(tags)
            if(song['tags']==undefined){
                img.setAttribute("src", "images/default_art.png")
            }
            else{

            
                var imgobj = song['tags']['picture']
                if(imgobj.length < 1){
                    img.setAttribute("src", "images/default_art.png")
                }
                else{
                    // console.log(btoa(imgobj.imageBuffer.data))
                    if(imgobj[0]['format'] == 'jpeg'){
                        var b64 = ""
                        for(let i=0; i<imgobj[0]['data'].length; i++){
                            b64 += String.fromCharCode(imgobj[0]['data'][i])
                        }
                        var b64img = 'data:image/jpeg;base64,' + window.btoa(b64)
                        img.setAttribute("src", b64img)
                        
                    }
                    if(imgobj[0]['format'] == 'jpg'){
                        var b64 = ""
                        for(let i=0; i<imgobj[0]['data'].length; i++){
                            b64 += String.fromCharCode(imgobj[0]['data'][i])
                        }
                        var b64img = 'data:image/jpeg;base64,' + window.btoa(b64)
                        img.setAttribute("src", b64img)
                        
                    }
                    else{
                        var b64 = ""
                        for(let i=0; i<imgobj[0]['data'].length; i++){
                            b64 += String.fromCharCode(imgobj[0]['data'][i])
                        }
                        var b64img = 'data:image/png;base64,' + window.btoa(b64)
                        img.setAttribute("src", b64img)
                    }
                    
                }
            }
            

            var collapsibleBody = document.createElement("div")
            collapsibleBody.setAttribute("class", "collapsible-body")

            var ulSongs = document.createElement("ul")
            ulSongs.setAttribute("id", element)
            // ulSongs.setAttribute("class", "collapsible-body")
            ulSongs.style.display = 'block'
            for(var i=0; i<listOfMp3.length; i++){
                var li = document.createElement("li")
                var ali = document.createElement("a")
                ali.setAttribute("href", listOfMp3[i]["path"])
                ali.setAttribute("class", "grey-text text-darken-1")
                
                    if(listOfMp3[i]['tags']['title']!=""){
                        ali.appendChild(document.createTextNode(listOfMp3[i]['tags']['title']))
                    }
                    else{
                        ali.appendChild(document.createTextNode(listOfMp3[i]['file']))
                    }
                
                 
                ali.addEventListener("click", function(e){
                    e.preventDefault()
                    var music = this.getAttribute("href")
                    player.AddSongs(music)})
                li.appendChild(ali)
                ulSongs.appendChild(li)
            }


            // console.log(element)
            collapsibleBody.appendChild(ulSongs)
            collapsibleHeader.appendChild(img)
            // collapsibleHeader.appendChild(document.createElement("hr"))
            collapsibleHeader.appendChild(document.createTextNode(element))
            collapsibleHeader.appendChild(document.createElement("br"))
            
          
                if(song['tags']['artist']!=""){
                    collapsibleHeader.appendChild(document.createTextNode(song['tags']['artist']))
                }
                else{
                    collapsibleHeader.appendChild(document.createTextNode("Unknown"))
                }
 

            upperCol.appendChild(collapsibleHeader)
            upperCol.appendChild(collapsibleBody)
            
            ulCollapsible.appendChild(upperCol)
            mainRow.appendChild(ulCollapsible)
            document.body.appendChild(mainRow)
        });
        
    },
    'songsLoader':(option) =>{
        songsLoaderFirstTime = false
        if(option == 'create')
        
        { 
        var divLoader = document.createElement("div")
        divLoader.setAttribute("id", "songs-loader")
        divLoader.setAttribute("class", "container")
        var loader = document.createElement("div")
        loader.setAttribute("class","progress")
        loader.setAttribute("id", "songs-loader-inner")
        var intd = document.createElement("div")
        intd.setAttribute("class", "indeterminate grey")
        loader.appendChild(intd)
        divLoader.appendChild(loader)
        document.body.appendChild(divLoader)}
        if(option == 'show'){
            var divLoader = document.getElementById("songs-loader")
            divLoader.style.display = 'block'
        }
        if(option == 'hide'){
            var divLoader = document.getElementById("songs-loader")
            divLoader.style.display = 'none'
        }
    },
    'showDragAndDrop':() =>{
        var dragFileElement = document.createElement("div")
        dragFileElement.setAttribute("class", "container white-text text-darken-3")
        dragFileElement.setAttribute("id", "drag-file")
        dragFileElement.appendChild(document.createTextNode("Drop your music directory here..."))
        document.body.appendChild(dragFileElement)
    },
    'hideDragAndDrop':()=>{
        var dragFileElement = document.getElementById("drag-file")
        dragFileElement.style.display = 'none'
    }
    
    

}