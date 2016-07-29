'use strict';

const {electron, app, BrowserWindow, ipcMain} = require('electron');
const express = require('express');
const xprss = express();
const path = require('path');
const rootPath = path.normalize(__dirname);
const nodePort = '4444';
var mainWindow = null;
var jQuery = require('jquery');

xprss.use(express.static(rootPath));
//xprss.use('/node_modules', express.static(rootPath + '/node_modules'));
xprss.use('/semantic', express.static(rootPath + '/semantic'));
xprss.get('/', function(req, res) {
    res.sendfile(`${rootPath}/index.html`);
})

xprss.listen(nodePort);
console.log(`${new Date()} Listening on port: ${nodePort}`);

require('electron-reload')(__dirname);

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow();
    mainWindow.maximize();
    mainWindow.loadURL(`http://localhost:4444`);


    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    ipcMain.on('openDevTools', function(event, arg) {
        if (mainWindow.isDevToolsOpened()) {
            mainWindow.webContents.closeDevTools();
        } else {
            mainWindow.webContents.openDevTools();
        }
    })
});'use strict';
