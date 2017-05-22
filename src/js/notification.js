var Notification = function ($) {
    var settings = {
        timeout: 3000,
        hideDuration: 1000,
        defaultIcon: '',
        defaultTitle: 'Notification!',
        notificationContainer: '.notification-container'
    };

    var getNotification = function (type, message, title, icon) {
        var notificationClass;

        if (typeof title === 'undefined')
            title = settings.defaultTitle;

        if (typeof icon === 'undefined')
            icon = settings.defaultIcon;

        switch (type) {
            case 'success':
                title = 'Success!';
                icon = '<i class="icon fa fa-check"></i>';
                notificationClass = 'callout callout-success';
                break;
            case 'danger':
                title = 'Error!';
                icon = '<i class="icon fa fa-ban"></i>';
                notificationClass = 'callout callout-danger';
                break;
            case 'info':
                title = 'Info!';
                icon = '<i class="icon fa fa-info"></i>';
                notificationClass = 'callout callout-info';
                break;
            case 'warning':
                title = 'Warning!';
                icon = '<i class="icon fa fa-warning"></i>';
                notificationClass = 'callout callout-warning';
                break;
            case 'primary':
                notificationClass = 'callout callout-primary';
                break;
            default:
                notificationClass = 'callout callout-default';

        }

        return $('<div class="' + notificationClass + '"><h4>' + icon + ' ' + title + '</h4><p>' + message + '</p></div>');
    };

    var show = function (type, message, title, icon) {
        var $notification = getNotification(type, message, title, icon);
        $(settings.notificationContainer).append($notification);

        setTimeout(function () {
            $notification.fadeOut(settings.hideDuration);
        }, settings.timeout);
    };

    return {
        init: function () {
            if (typeof NotificationSettings !== "undefined") {
                $.extend(true, settings, NotificationSettings);
            }
        },
        showSuccess: function (message) {
            show('success', message);
        },
        showError: function (message) {
            show('danger', message);
        },
        showWarning: function (message) {
            show('warning', message);
        },
        showInfo: function (message) {
            show('info', message);
        },
        showPrimary: function (message, title, icon) {
            show('primary', message, title, icon);
        },
        showDefault: function (message, title, icon) {
            show('default', message, title, icon);
        }
    };

}(jQuery);

jQuery(document).ready(function () {
    Notification.init();
});