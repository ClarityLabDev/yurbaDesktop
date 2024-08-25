const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electron", {
  minimize: () => ipcRenderer.send("window-minimize"),

  maximize: () => ipcRenderer.send("window-maximize"),

  close: () => ipcRenderer.send("window-close"),

  openInBrowser: (url) => ipcRenderer.send("open-in-browser", url),

  sendWebviewData: (mainColor, textColor, title) => ipcRenderer.send('send-webview-data', mainColor, textColor, title),

  on: (channel, listener) => {
    const validChannels = ['update-webview-data'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, listener);
    }
  }
});
