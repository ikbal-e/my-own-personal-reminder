const { BrowserWindow, app, ipcMain, screen } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        heigth: 600,
        autoHideMenuBar: true,
        title: 'My Own Personel Reminder',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    win.on('close', () => app.quit());

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    return win;
}

const bringToTop = (event, task) => {
    app.setBadgeCount(1);
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.flashFrame(true);
    win.show();
}

const createInfoPanel = (event, taskId) => {
    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
    const [panelWidth, panelHeight] = [300, 200];
    const taskInfoPanel = new BrowserWindow({
        width: panelWidth,
        height: panelHeight,
        x: screenWidth - panelWidth,
        y: screenHeight - panelHeight,
        frame: false,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });
    taskInfoPanel.loadURL(
        isDev
        ? `http://localhost:3000/info-panel?id=${taskId}`
        : `file://${path.join(__dirname, "../build/index.html")}#/info-panel?id=${taskId}`
    );
    taskInfoPanel.setAlwaysOnTop(true, 'screen-saver');
    taskInfoPanel.show();
}

const closeInfoPanel = (event) => {
    const webContents = event.sender
    const infoPanel = BrowserWindow.fromWebContents(webContents)
    infoPanel.close();
};

app.on('ready', () => {
    createWindow();
    ipcMain.on('taskFinished', createInfoPanel);
    ipcMain.on('closePanel', closeInfoPanel);
})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
})