const {ipcMain} = require('electron')

var electron = require('electron');
var app = require('electron').app;
var fs = require("fs")
var path = require("path")
var JSONStorage = require('node-localstorage').JSONStorage;
var storageLocation = app.getPath('userData');
global.nodeStorage = new JSONStorage(storageLocation);
var libPath = ""

ipcMain.on('check', (event, arg) =>{
    try{
        libPath = global.nodeStorage.getItem('libPath');
        event.sender.send('libpath', libPath)
    
    }
    catch(err){
        libPath = ""
        event.sender.send(libPath)
    }
})


let win
function createWindow(){
    
   
     win = new electron.BrowserWindow({
        width:1040,
        height:820,
        minWidth:820,
        minHeight:640,
       
        titleBarStyle:"hidden",
        backgroundColor: '#FFF',
    
        
        
    })
    
    
    win.on('ready-to-show', function(){
        win.show()
        win.focus()
    })
    win.loadURL('file://' + __dirname + '/index.html')
    // win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
    require('./menu')
    
}

ipcMain.on('lib', (event, arg)=>{
    console.log(arg)
    global.nodeStorage.setItem('libPath', arg)
})


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform != 'darwin'){
        app.quit()
    }
})

app.on('activate', () => {

    if (win === null) {
      createWindow()
    }
  })

