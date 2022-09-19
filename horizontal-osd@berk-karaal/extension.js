const UUID = "horizontal-osd@berk-karaal";

function MyExtension(meta) {
    this._init(meta);
}

MyExtension.prototype = {
    _init: function (meta) {
        this.meta = meta;
    },

    enable: function () {
        // extension enabled
    },

    disable: function () {
        // extension disabled
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
