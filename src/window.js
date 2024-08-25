const path = require("path");
const { ipcMain, BrowserWindow } = require("electron");

ipcMain.on("window-minimize", (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window) window.minimize();
});

ipcMain.on("window-maximize", (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window) {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  }
});

ipcMain.on("window-close", (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window) window.close();
});

ipcMain.on('send-webview-data', (event, mainColor, textColor, title) => {
  const mainWindow = BrowserWindow.fromWebContents(event.sender);
  if (mainWindow) {
    mainWindow.webContents.send('update-webview-data', { mainColor, textColor, title });
  }
});


exports.createBrowserWindow = () => {
  return new BrowserWindow({
    icon: path.join(__dirname, 'assets/media/appicon.ico'),
    backgroundColor: '#fff',
    frame: false,
    webPreferences: {
      nativeWindowOpen: true,
      devTools: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: false,
      webviewTag: true,
    },
  });
};
