const { BrowserWindow, app, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        heigth: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

const bringToTop = (event, task) => {
    app.setBadgeCount(1);
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.flashFrame(true);
    win.show();
}

app.on('ready', () => {
    createWindow();
    ipcMain.on('taskFinished', bringToTop)
})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
})