// Electron
const { app, BrowserWindow, ipcMain, shell  } = require("electron");
const path = require('path');

app.whenReady().then(() => {
  // Main window
  const window = require("./src/window");
  mainWindow = window.createBrowserWindow(app);

  mainWindow.maximize()

  mainWindow.loadFile("index.html");

  ipcMain.on('send-webview-data', (event, mainColor, textColor, title) => {
    mainWindow.webContents.send('update-webview-data', { mainColor, textColor, title });
  });

  ipcMain.on('open-in-browser', (event, url) => {
    shell.openExternal(url);
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: path.join(__dirname, 'assets/media/appicon.ico'),
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
