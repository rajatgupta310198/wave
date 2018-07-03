var electron = require('electron');
var app = require('electron').app;
var fs = require("fs")
var music = require("./musicEngine").musicEngine
// const {Menu} = require('electron')
// const template = [
//     {
//         label:'File',
//         submenu:[
//             {
//                 label:'Add Library',

//                 click() { alert("Will add soon") }
//             }
//         ]
//     }
// ]
// if(process.platform == 'darwin'){
//     template.unshift({
//         label:'Wave',
//         submenu:[
//             {
//                 label:'About Wave',
                 
//                 click(){

//                 }
//             },
//             {role:'Services', submenu:[]},
//             {
//                 label:'Quit Wave',
//                 accelarator:'CmdOrCtrl+Q',
//                 click(){
//                     app.quit()
//                 }
//             }
//         ]
//     })
    
// }



function createWindow(){
    let win = new electron.BrowserWindow({
        width:1280,
        height:736,
        resizable:false,
        // transparent:true,
        titleBarStyle:"hidden",
        darkTheme:true,
        // frame:false
        
    })
    
    
    
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

