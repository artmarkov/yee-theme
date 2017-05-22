var InfoBox = function ($) {
    var settings = {
        infoBoxGetUrl: '/admin/dashboard/default/get-info-box',
        infoBoxContainer: '.info-box-container',
        infoBoxSelector: '.info-box'
    };

    var getOrder = function () {
        var infoBoxes = [];
        $(settings.infoBoxContainer).find(settings.infoBoxSelector).each(function () {
            infoBoxes.push($(this).data('id'));
        });
        return infoBoxes;
    };

    var saveOrder = function () {
        Settings.set('dashboard.infoBoxes', getOrder());
    };

    var loadInfoBox = function (widgetId, callback) {
        $.ajax({
            url: settings.infoBoxGetUrl,
            data: {widgetId: widgetId},
            type: 'POST',
            dataType: 'json',
            success: function (response, textStatus, jqXHR) {
                if (response !== null && typeof response === 'object') {
                    callback(response.content);
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

    var initSortable = function () {
        $(settings.infoBoxContainer).sortable({
            connectWith: settings.infoBoxContainer,
            handle: settings.infoBoxSelector,
            forcePlaceholderSize: true,
            zIndex: 9999,
            update: function (event, ui) {
                saveOrder();
            }
        });
    };

    var initSwitchers = function () {
        //Add showInfoBoxes listener
        $('body').on('switchChange.bootstrapSwitch', 'input[name="dashboard.showInfoBoxes"]', function (event, state) {
            if (state) {
                loadInfoBox(null, function (content) {
                    $(settings.infoBoxContainer).html(content);
                    Settings.set('dashboard.showInfoBoxes', state);
                });
            } else {
                $(settings.infoBoxContainer).html('');
                Settings.set('dashboard.showInfoBoxes', state);
            }

            $('input[name^="dashboard.infoBox"]').bootstrapSwitch('disabled', !state);
        });

        //Add showInfoBoxes listener
        $('body').on('switchChange.bootstrapSwitch', 'input[name^="dashboard.infoBox"]', function (event, state) {
            var widgetId = $(this).data('widget-id');

            if (state) {
                loadInfoBox(widgetId, function (content) {
                    $(settings.infoBoxContainer).append(content);
                    saveOrder();
                });
            } else {
                $(settings.infoBoxSelector + '[data-id="' + widgetId + '"]').parent().remove();
                saveOrder();
            }
        });
    };


    return {
        init: function () {
            if (typeof InfoBoxSettings !== "undefined") {
                $.extend(true, settings, InfoBoxSettings);
            }

            initSortable();
            initSwitchers();
        }
    };
}(jQuery);

jQuery(document).ready(function () {
    InfoBox.init();
});