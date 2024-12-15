// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    createTab: (url) => ipcRenderer.send('create-tab', url),
    closeTab: (index) => ipcRenderer.send('close-tab', index),
    switchTab: (index) => ipcRenderer.send('switch-tab', index),
});
