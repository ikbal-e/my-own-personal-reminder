const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    taskFinished: (task) => ipcRenderer.send('taskFinished', task)
})