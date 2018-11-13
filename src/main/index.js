import { app, BrowserWindow, ipcRenderer } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow, transferWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minHeight: 450,
    minWidth: 600,
    height: 700,
    useContentSize: true,
    width: 1000,
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('focus', () => {
    if (transferWindow) {
      transferWindow.close()
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const electron = require('electron')
const ipc = electron.ipcMain
//登录窗口最小化
ipc.on('window-min', function() {
  mainWindow.minimize()
})
//登录窗口最大化
ipc.on('window-max', function() {
  if (mainWindow.isMaximized()) {
    mainWindow.restore()
  } else {
    mainWindow.maximize()
  }
})
ipc.on('window-close', function() {
  mainWindow.close()
  if (transferWindow) {
    transferWindow.close()
  }
})

let msg

ipc.on('open_transfer_window', function(event_main, _msg) {
  msg = _msg
  transferWindow = new BrowserWindow({
    height: 430,
    width: 300,
    frame: false
  })

  // 转账窗口获取消息
  ipc.on('transfer_get_msg', (event, _) => {
    event.returnValue = msg
  })

  // 转账窗口发布消息到主窗口
  ipc.on('transfer_pub_msg', (event, pub_msg) => {
    // 发送到主窗口
    event_main.sender.send('transfer_on_msg', pub_msg)
  })

  transferWindow.loadURL(winURL + '/#/transfer')

  transferWindow.on('closed', () => {
    transferWindow = null
  })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
