const UUID = "horizontal-osd@berk-karaal";

const Main = imports.ui.main;
const OsdWindow = imports.ui.osdWindow;
const Settings = imports.ui.settings;

const Self = imports.extensions[UUID];
const CustomOsd = Self.CustomOsd;

let extension_settings = {};

function MyExtension(meta) {
    this._init(meta);
}

MyExtension.prototype = {
    _init: function (meta) {
        this.meta = meta;

        this.settings = new Settings.ExtensionSettings(extension_settings, UUID, meta.uuid);
        this.settings.bind("osd-width", "osd_width", this.on_settings_changed);
        this.settings.bind("osd-height", "osd_height", this.on_settings_changed);
        this.settings.bind("osd-border-radius", "osd_border_radius", this.on_settings_changed);
        this.settings.bind("osd-position-x", "osd_position_x", this.on_settings_changed);
        this.settings.bind("osd-position-y", "osd_position_y", this.on_settings_changed);

    },

    enable: function () {
        // extension enabled, make system use our custom OsdWindowManager:
        Main.osdWindowManager = new CustomOsd.OsdWindowManager(extension_settings);
    },

    disable: function () {
        // extension disabled, turn back to default OsdWindowManager:
        Main.osdWindowManager = new OsdWindow.OsdWindowManager();
    },

    on_settings_changed: function () {
        // settings changed, update osd with new user preferences:
        Main.osdWindowManager = new CustomOsd.OsdWindowManager(extension_settings);
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
