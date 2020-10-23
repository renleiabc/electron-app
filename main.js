/*
 * @Author: abc
 * @Date: 2020-10-21 17:30:22
 * @LastEditors: abc
 * @LastEditTime: 2020-10-22 15:51:53
 * @Description:入口文件
 */
const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
// import { autoUpdater } from 'electron-updater';
let win;
function createWindow() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 1000,
    height: 563,
    useContentSize: true,
    titleBarStyle: 'hidden'
  });
  /*   //在下载之前将autoUpdater的autoDownload属性设置成false，通过渲染进程触发主进程事件来实现这一设置(将自动更新设置成false)
  autoUpdater.autoDownload = false;
  //如果检测到可以更新再触发主进程下面这一行代码(来实现开始下载软件)
  autoUpdater.downloadUpdate(); */
  win.loadFile('index.html');
  // win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools();
  });
}
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
