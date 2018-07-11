var electron = require('electron');
var app = require('electron').app;
var fs = require("fs")
var music = require("./musicEngine").musicEngine
var path = require("path")



function createWindow(){
    
    let win = new electron.BrowserWindow({
        width:1040,
        height:820,
        minWidth:820,
        minHeight:640,
        // transparent:true,
        
        // darkTheme:true,
        // frame:false
        titleBarStyle:"hidden"
    
        
        
    })
    
    console.log(app.getAppPath())
    
    win.loadURL('file://' + __dirname + '/index.html')
    // win.webContents.openDevTools()
    // const menu = Menu.buildFromTemplate(template)
    // Menu.setApplicationMenu(menu)
    win.on('closed', () => {
        win = null
    })
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform != 'darwin'){
        app.quit()
    }
})

