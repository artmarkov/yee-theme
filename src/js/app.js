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


        $("[data-controlsidebar]").on('click', function () {
            var slide = !AdminLTE.options.controlSidebarOptions.slide;
            AdminLTE.options.controlSidebarOptions.slide = slide;
            if (!slide)
                $('.control-sidebar').removeClass('control-sidebar-open');
        });

        $("[data-sidebarskin='toggle']").on('click', function () {
            var sidebar = $(".control-sidebar");
            if (sidebar.hasClass("control-sidebar-dark")) {
                sidebar.removeClass("control-sidebar-dark")
                sidebar.addClass("control-sidebar-light")
            } else {
                sidebar.removeClass("control-sidebar-light")
                sidebar.addClass("control-sidebar-dark")
            }
        });

        $("[data-enable='expandOnHover']").on('click', function () {
            $(this).attr('disabled', true);
            AdminLTE.pushMenu.expandOnHover();
            if (!$('body').hasClass('sidebar-collapse'))
                $("[data-layout='sidebar-collapse']").click();
        });

    }
})(jQuery, $.AdminLTE);

$.YeeCms = function ($, AdminLTE) {

    var updateSettings = function () {
        $.fn.bootstrapSwitch.defaults.labelWidth = 0;
        $.fn.bootstrapSwitch.defaults.onColor = "success";
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
            zIndex: 999999
        });
        $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");

        $(".info-box-container").sortable({
            connectWith: ".info-box-container",
            handle: ".info-box",
            forcePlaceholderSize: true,
            zIndex: 999999
        });
        $(".info-box").css("cursor", "move");
        
        //Init Bootstrap Switch
        $("input.switch").bootstrapSwitch();
    };

    return {

        //main function to initiate the application
        init: function () {
            updateSettings();
            initComponents();

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
