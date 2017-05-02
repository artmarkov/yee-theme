/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
(function ($, AdminLTE) {

    "use strict";

    /**
     * List of all the available skins
     *
     * @type Array
     */
    var skins = [
        "skin-blue",
        "skin-black",
        "skin-red",
        "skin-yellow",
        "skin-purple",
        "skin-green",
        "skin-blue-light",
        "skin-black-light",
        "skin-red-light",
        "skin-yellow-light",
        "skin-purple-light",
        "skin-green-light"
    ];



    setup();



    /**
     * Replaces the old skin with the new skin
     * @param String cls the new skin class
     * @returns Boolean false to prevent link's default action
     */
    function change_skin(cls) {
        $.each(skins, function (i) {
            $("body").removeClass(skins[i]);
        });

        $("body").addClass(cls);
        store('skin', cls);
        return false;
    }

    /**
     * Store a new settings in the browser
     *
     * @param String name Name of the setting
     * @param String val Value of the setting
     * @returns void
     */
    function store(name, val) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Get a prestored setting
     *
     * @param String name Name of of the setting
     * @returns String The value of the setting | null
     */
    function get(name) {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Retrieve default settings and apply them to the template
     *
     * @returns void
     */
    function setup() {
        var tmp = get('skin');
        if (tmp && $.inArray(tmp, skins))
            change_skin(tmp);

        //Add the change skin listener
        $("[data-skin]").on('click', function (e) {
            if ($(this).hasClass('knob'))
                return;
            e.preventDefault();
            change_skin($(this).data('skin'));
        });


    }
})(jQuery, $.AdminLTE);

$.YeeCms = function ($, AdminLTE) {

    var settingGetUrl = '/admin/dashboard/default/get-setting';
    var settingSetUrl = '/admin/dashboard/default/set-setting';
    var infoBoxGetUrl = '/admin/dashboard/default/get-info-box';
    var infoBoxContainer = '.info-box-container';
    var infoBoxSelector = '.info-box';

    var InfoBox = {
        init: function () {

            //Init sortable plugin
            $(infoBoxContainer).sortable({
                connectWith: infoBoxContainer,
                handle: infoBoxSelector,
                forcePlaceholderSize: true,
                zIndex: 9999,
                update: function (event, ui) {
                    InfoBox.saveOrder();
                }
            });

            //Add showInfoBoxes listener
            $('body').on('switchChange.bootstrapSwitch', 'input[name="dashboard.showInfoBoxes"]', function (event, state) {
                if (state) {
                    InfoBox.loadInfoBox(null, function (content) {
                        $(infoBoxContainer).html(content);
                        Settings.set('dashboard.showInfoBoxes', state);
                    });
                } else {
                    $(infoBoxContainer).html('');
                    Settings.set('dashboard.showInfoBoxes', state);
                }

                $('input[name^="dashboard.infoBox"]').bootstrapSwitch('disabled', !state);
            });

            //Add showInfoBoxes listener
            $('body').on('switchChange.bootstrapSwitch', 'input[name^="dashboard.infoBox"]', function (event, state) {
                var widgetId = $(this).data('widget-id');

                if (state) {
                    InfoBox.loadInfoBox(widgetId, function (content) {
                        $(infoBoxContainer).append(content);
                        InfoBox.saveOrder();
                    });
                } else {
                    $(infoBoxSelector + '[data-id="' + widgetId + '"]').parent().remove();
                    InfoBox.saveOrder();
                }
            });
        },

        getOrder: function () {
            var infoBoxes = [];
            $(infoBoxContainer).find(infoBoxSelector).each(function () {
                infoBoxes.push($(this).data('id'));
            });
            return infoBoxes;
        },

        saveOrder: function () {
            Settings.set('dashboard.infoBoxes', InfoBox.getOrder());
        },

        loadInfoBox: function (widgetId, successCallback) {
            $.ajax({
                url: infoBoxGetUrl,
                data: {widgetId: widgetId},
                type: 'POST',
                dataType: 'json',
                success: function (response, textStatus, jqXHR) {
                    if (response !== null && typeof response === 'object') {
                        successCallback(response.content);
                    } else {
                        //TODO: show error
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //TODO: show error
                }
            });
        }
    };

    var Settings = {
        /**
         * Get a prestored setting
         *
         * @param String name Name of of the setting
         * @returns String The value of the setting | null
         */
        get: function (name) {
            $.ajax({
                url: settingGetUrl,
                data: {name: name},
                type: 'POST',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data !== null && typeof data === 'object') {
                        console.log(data);
                    } else {

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                },
                complete: function (jqXHR, textStatus) {
                    //$form.trigger(events.ajaxComplete, [jqXHR, textStatus]);
                }
            });
        },

        /**
         * Store a new settings in the browser
         *
         * @param String name Name of the setting
         * @param String val Value of the setting
         * @returns void
         */
        set: function (name, value) {
            $.ajax({
                url: settingSetUrl,
                data: {name: name, value: value},
                type: 'POST',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data !== null && typeof data === 'object') {
                        console.log(data);
                    } else {

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                },
                complete: function (jqXHR, textStatus) {
                    //$form.trigger(events.ajaxComplete, [jqXHR, textStatus]);
                }
            });
        }
    };

    var updateSettings = function () {
        $.fn.bootstrapSwitch.defaults.labelWidth = 0;
        $.fn.bootstrapSwitch.defaults.onColor = "success";

        //InfoBox.saveOrder();
        //Settings.get('layoutId');
    };

    var initComponents = function () {
        //iCheck for checkbox and radio inputs
        $('input[type="checkbox"].checkbox, input[type="radio"].radio').each(function () {
            var color = $(this).data('color');
            if (color === undefined) {
                $(this).iCheck();
            } else {
                $(this).iCheck({
                    checkboxClass: 'icheckbox icheckbox-' + color,
                    radioClass: 'iradio iradio-' + color
                });
            }
        });

        //Make the dashboard widgets sortable Using jquery UI
        $(".connectedSortable").sortable({
            placeholder: "sort-highlight",
            connectWith: ".connectedSortable",
            handle: ".box-header, .nav-tabs",
            forcePlaceholderSize: true,
            zIndex: 9999
        });

        //Init Bootstrap Switch
        $("input.switch").bootstrapSwitch();
    };

    var initActions = function () {
        $('body').on('click', '.list-layouts > li > a', function () {
            var layoutId = $(this).data('layout');
            $('.list-layouts > li > a').removeClass('active');
            $(this).addClass('active');
            Settings.set('dashboard.layoutId', layoutId);
            if($("#dashboard").length){
                location.reload();
            }
        });
    };

    return {

        //main function to initiate the application
        init: function () {
            InfoBox.init();
            updateSettings();
            initComponents();
            initActions();

//            // set layout style from cookie
//            if (typeof Cookies !== "undefined" && Cookies.get('layout-style-option') === 'rounded') {
//                setThemeStyle(Cookies.get('layout-style-option'));
//                $('.theme-panel .layout-style-option').val(Cookies.get('layout-style-option'));
//            }
        }
    };

}(jQuery, $.AdminLTE);


jQuery(document).ready(function () {
    $.YeeCms.init();
});
