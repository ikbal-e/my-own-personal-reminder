const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    taskFinished: (task) => ipcRenderer.send('taskFinished', task),
    closePanel: () => ipcRenderer.send('closePanel'),
    restartTaskToMain: (id) => ipcRenderer.send('restartTaskToMain', id),
    restartTaskToRenderer: (id) => ipcRenderer.on('restartTaskToRenderer', id)
})