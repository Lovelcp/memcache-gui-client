const electron = require('electron')

var memcached = require('memcached');


// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    // Open the DevTools.
    mainWindow.webContents.openDevTools({
        mode: "bottom"
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// test ssh connection
var Client = require('ssh2').Client;

let conn = new Client();
conn.connect({
        host: '121.41.41.92',
        port: 10022,
        username: 'cjy',
        privateKey: require('fs').readFileSync('/Users/CJY/.ssh/id_rsa'),
        // keepaliveInterval: 1,
        debug: console.log
    }
);

conn.on('ready', function () {
    console.log('Client :: ready');

    // setInterval(function () {
    //     conn.exec('uptime', function (err, stream) {
    //         if (err) throw err;
    //         stream.on('close', function (code, signal) {
    //             console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
    //             conn.end();
    //         }).on('data', function (data) {
    //             console.log('STDOUT: ' + data);
    //         }).stderr.on('data', function (data) {
    //             console.log('STDERR: ' + data);
    //         });
    //     });
    // }, 1);

    conn.exec('uptime', function (err, stream) {
        if (err) throw err;
        stream.on('close', function (code, signal) {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            // conn.end();
        }).on('data', function (data) {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', function (data) {
            console.log('STDERR: ' + data);
        });
    });

    conn.exec('uptime', function (err, stream) {
        if (err) throw err;
        stream.on('close', function (code, signal) {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            // conn.end();
        }).on('data', function (data) {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', function (data) {
            console.log('STDERR: ' + data);
        });
    });
});
