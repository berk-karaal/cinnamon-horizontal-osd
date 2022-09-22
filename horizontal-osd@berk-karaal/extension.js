const UUID = "horizontal-osd@berk-karaal";

const Main = imports.ui.main;
const OsdWindow = imports.ui.osdWindow;

const Self = imports.extensions[UUID];
const CustomOsd = Self.CustomOsd;

function MyExtension(meta) {
    this._init(meta);
}

MyExtension.prototype = {
    _init: function (meta) {
        this.meta = meta;
    },

    enable: function () {
        // extension enabled, make system use our custom OsdWindowManager:
        Main.osdWindowManager = new CustomOsd.OsdWindowManager();
    },

    disable: function () {
        // extension disabled, turn back to default OsdWindowManager:
        Main.osdWindowManager = new OsdWindow.OsdWindowManager();
    },

    on_settings_changed: function () {
        // settings changed
    },
};


let extension = null;

function enable() {
    try {
        extension.enable();
    } catch (err) {
        extension.disable();
        throw err;
    }
}

function disable() {
    try {
        extension.disable();
    } catch (err) {
        global.logError(err);
    } finally {
        extension = null;
    }
}

function init(metadata) {
    extension = new MyExtension(metadata);
}
