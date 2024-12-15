const { app, BrowserWindow } = require('electron');
import LiliumTabbedWindow from "./liliumTabbedWindow"
import { join } from "path";


class Lilium {
    LWin;
    constructor() {
        const createWindow = () => {
            this.LWin = new LiliumTabbedWindow({
                window: {
                    width: 1280,
                    height: 720,
                    frame: false,
                    titleBarStyle: 'hidden',
                    titleBarOverlay: {
                        height: 31,
                        color: '#56365C', //Lilac Shadow
                        symbolColor: '#ffffff',
                    },
                    webPreferences: {
                        devTools: true,
                        preload: join(__dirname, "../preload/index.js"),
                    },
                }
            })

            // win.loadFile(join(__dirname, "../../src/renderer/ui.html"),)
        }
        app.whenReady().then(() => {
            createWindow();
            this.LWin.window.webContents.openDevTools();
            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) { createWindow() }
            })
        })

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') this.destroy()
        })

        //app.on('web-contents-created', this.onWebContentsCreated.bind(this))
    }

    destroy() {
        app.quit()
    }

    getFocusedWindow() {
        return this.windows.find((w) => w.window.isFocused()) || this.windows[0]
    }

    getWindowFromBrowserWindow(window) {
        return !window.isDestroyed() ? this.windows.find((win) => win.id === window.id) : null
    }

    getWindowFromWebContents(webContents) {
        let window

        if (this.popup && webContents === this.popup.browserWindow?.webContents) {
            window = this.popup.parent
        } else {
            window = getParentWindowOfTab(webContents)
        }

        return window ? this.getWindowFromBrowserWindow(window) : null
    }

}


export default Lilium;
