const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Open',
  submenu: [
        {
            role: 'about',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+A' : 'Alt+Shift+A',
            click: () => { console.log('About!') }
        },
        {
            role: 'reload',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+R' : 'Alt+Shift+R',
            click: () => { console.log('forceReload!') }
        },
        {
            role: 'forceReload',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+T' : 'Alt+Shift+T',
            click: () => { console.log('forceReload!') }
        },
        {
            role: 'help',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+H' : 'Alt+Shift+H',
            click: () => { console.log('Electron rocks!') }
        },
        {
            role: 'quit',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+Q' : 'Alt+Shift+Q',
            click: () => { console.log('Quit!') }
        },
    ]
}))

Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})