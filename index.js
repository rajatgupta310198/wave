var electron = require('electron');
var app = require('electron').app;



function createWindow(){
    let win = new electron.BrowserWindow({
        width:1280,
        height:736,
        resizable:false,
        //transparent:true,
        titleBarStyle:"hidden-inset",
        
    })
    win.loadURL('file://' + __dirname + '/index.html')
    //win.webContents.openDevTools()
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