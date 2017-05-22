var Settings = function ($) {
    var settings = {
        settingGetUrl: '/admin/dashboard/default/get-setting',
        settingSetUrl: '/admin/dashboard/default/set-setting'
    };

    /**
     * Get a prestored setting
     * 
     * @param String name Name of of the setting
     * @param Function callback
     * @returns String The value of the setting | null
     */
    var get = function (name, callback) {
        $.ajax({
            url: settings.settingGetUrl,
            data: {name: name},
            type: 'POST',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data !== null && typeof data === 'object') {
                    callback(data);
                } else {
                    Notification.showError('Unexpected response was received from the server!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var error = jqXHR.responseJSON;
                Notification.showError(error.status + ' ' + error.name + ': ' + error.message);
            }
        });
    };

    /**
     * Store a new settings in the browser
     *
     * @param String name Name of the setting
     * @param String value Value of the setting
     * @returns void
     */
    var set = function (name, value) {
        $.ajax({
            url: settings.settingSetUrl,
            data: {name: name, value: value},
            type: 'POST',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data === null || typeof data !== 'object')
                    Notification.showError('Unexpected response was received from the server!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var error = jqXHR.responseJSON;
                Notification.showError(error.status + ' ' + error.name + ': ' + error.message);
            }
        });
    };

    return {
        init: function () {
            if (typeof SettingsSettings !== "undefined") {
                $.extend(true, settings, SettingsSettings);
            }
        },
        get: function (name, callback) {
            return get(name, callback);
        },
        set: function (name, value) {
            set(name, value);
        }
    };
}(jQuery);

jQuery(document).ready(function () {
    Settings.init();
});