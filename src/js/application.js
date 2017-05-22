var Application = function ($) {
    var settings = {};

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

        //Init Bootstrap Switch
        $("input.switch").bootstrapSwitch();
    };

    return {
        init: function () {
            if (typeof ApplicationSettings !== "undefined") {
                $.extend(true, settings, ApplicationSettings);
            }

            $.fn.bootstrapSwitch.defaults.labelWidth = 0;
            $.fn.bootstrapSwitch.defaults.onColor = "success";

            initComponents();
        }
    };

}(jQuery);

jQuery(document).ready(function () {
    Application.init();
});