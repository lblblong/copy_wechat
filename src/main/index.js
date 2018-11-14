import { app, BrowserWindow, ipcRenderer, ipcMain } from 'electron'
const ipc = ipcMain

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
let transferIpc
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
  mainWindow = new BrowserWindow({
    minHeight: 450,
    minWidth: 600,
    height: 700,
    useContentSize: true,
    width: 1000,
    frame: false,
    backgroundColor: '#ffffff',
    webPreferences: {
      backgroundThrottling: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('focus', () => {
    if (transferWindow && transferWindow.isVisible()) {
      transferIpc.send('hide')
      transferWindow.hide()
    }
  })
}

function createTransferWindow() {
  let msg

  transferWindow = new BrowserWindow({
    height: 430,
    width: 300,
    frame: false,
    show: false,
    backgroundColor: '#ffffff',
    webPreferences: {
      backgroundThrottling: false
    }
  })

  transferWindow.loadURL(winURL + '#/transfer')

  transferWindow.on('closed', () => {
    transferWindow = null
  })

  transferWindow.once('ready-to-show', event => {
    transferIpc = event.sender
  })

  ipc.on('open_transfer_window', function(event_main, _msg) {
    msg = _msg

    transferIpc.send('transfer_show', msg)
    setTimeout(() => {
      transferWindow.show()
    }, 1000)

    // 转账窗口发布消息到主窗口
    ipc.on('transfer_pub_msg', (event, pub_msg) => {
      // 发送到主窗口
      event_main.sender.send('transfer_on_msg', pub_msg)
    })
  })
}

app.on('ready', () => {
  createWindow()
  createTransferWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  } else if (transferWindow === null) {
    createTransferWindow()
  }
})

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
