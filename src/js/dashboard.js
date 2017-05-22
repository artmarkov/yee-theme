var Dashboard = function ($) {
    var settings = {
        widgetGetUrl: '/admin/dashboard/default/get-widget',
        dashboardSelector: '#dashboard',
        rowSelector: '.widgets-row',
        columnSelector: '.widgets-column',
        widgetSelector: '.dashboard-widget',
        animationSpeed: 500
    };

    var getOrder = function () {
        var widgets = [];
        $(settings.dashboardSelector).find(settings.widgetSelector).each(function () {
            var columnId = $(this).closest(settings.columnSelector).data('column');
            var rowId = $(this).closest(settings.rowSelector).data('row');
            var widgetId = $(this).data('id');
            var collapsed = $(this).hasClass('collapsed-box');

            widgets.push({
                row: rowId,
                column: columnId,
                widget: widgetId,
                collapsed: collapsed
            });
        });

        return widgets;
    };

    var saveOrder = function () {
        Settings.set('dashboard.widgets', getOrder());
    };

    var initWidgets = function () {
        //Make the dashboard widgets sortable Using jquery UI
        $(".connectedSortable").sortable({
            placeholder: "sort-highlight",
            connectWith: ".connectedSortable",
            handle: ".box-header, .nav-tabs",
            forcePlaceholderSize: true,
            zIndex: 9999,
            update: function (event, ui) {
                saveOrder();
            }
        });
    };

    var initLayoutActions = function () {
        $('body').on('click', '.list-layouts > li > a', function () {
            var layoutId = $(this).data('layout');
            $('.list-layouts > li > a').removeClass('active');
            $(this).addClass('active');
            Settings.set('dashboard.layoutId', layoutId);
            if ($("#dashboard").length) {
                location.reload();
            }
        });
    };

    var initToggleAction = function () {
        $('body').on('click', 'button[data-widget="collapse"], button[data-widget="remove"]', function () {
            setTimeout(saveOrder, 1000);
        });
    };

    var initSwitchers = function () {
        //Add showInfoBoxes listener
        $('body').on('switchChange.bootstrapSwitch', 'input[name^="dashboard.widget"]', function (event, state) {
            var widgetId = $(this).data('widget-id');
            if (state) {
                loadWidget(widgetId, function (content) {
                    $(settings.dashboardSelector).find(settings.rowSelector)
                            .find(settings.columnSelector).last().append(content);
                    saveOrder();
                });
            } else {
                $(settings.widgetSelector + '[data-id="' + widgetId + '"]')
                        .slideUp(settings.animationSpeed).remove();
                saveOrder();
            }
        });
    };

    var loadWidget = function (widgetId, callback) {
        $.ajax({
            url: settings.widgetGetUrl,
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

    return {
        init: function () {
            if (typeof DashboardSettings !== "undefined") {
                $.extend(true, settings, DashboardSettings);
            }

            initWidgets();
            initSwitchers();
            initToggleAction();
            initLayoutActions();

            //console.log(getOrder());

        }
    };

}(jQuery);

jQuery(document).ready(function () {
    Dashboard.init();
});