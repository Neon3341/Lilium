const { BrowserWindow, session } = require('electron');
import { join } from "path";
import Tabs from './tabs';

class TabbedBrowserWindow {

    tabs;
    window;

    constructor(options) {
        this.session = options.session || session.defaultSession

        // Can't inheret BrowserWindow
        // https://github.com/electron/electron/issues/23#issuecomment-19613241
        this.window = new BrowserWindow(options.window)
        this.id = this.window.id
        this.webContents = this.window.webContents

        //Loading React UI
        this.webContents.loadFile(join(__dirname, "../renderer/index.html"),)

        //loading Tabs Api
        this.tabs = new Tabs(this.window)

        //Handle 
        this.tabs.on('tab-created', function onTabCreated(tab) {
            if (options.initialUrl) {
                tab.webContents.loadURL(options.initialUrl)
                console.log(options.initialUrl);
            }
            else {
                tab.webContents.loadURL("https://example.com")
            }

        })

        this.tabs.on('tab-selected', function onTabSelected(tab) {

        })

        queueMicrotask(() => {
            // Create initial tab
            this.tabs.create()
        })
    }

    destroy() {
        this.tabs.destroy()
        this.window.destroy()
    }

    getFocusedTab() {
        return this.tabs.selected
    }
}

export default TabbedBrowserWindow;