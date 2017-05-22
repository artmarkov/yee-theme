var Modal = function ($) {
    var settings = {

    };

    var getModal = function (message, title, ok, cancel) {
        if (typeof title === "undefined") {
            title = "Confirmation";
        }

        return '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="confirm-modal-label">'
                + '<div class="modal-dialog" role="document">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                + '<h4 class="modal-title" id="confirm-modal-label">' + title + '</h4>'
                + '</div>'
                + '<div class="modal-body">' + message + '</div>'
                + '<div class="modal-footer">'
                + '<button type="button" class="btn btn-default" data-action="cancel" data-dismiss="modal">Cancel</button>'
                + '<button type="button" class="btn btn-primary" data-action="ok">Ok</button>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';
    };

    var confirm = function (message, ok, cancel) {
        $modal = $(getModal(message));
        $('body').append($modal);

        $modal.find('[data-action="ok"]').click(function () {
            !ok || ok();
        });

        $modal.find('[data-action="cancel"]').click(function () {
            !cancel || cancel();
        });

        $modal.modal('show');
    };

    var _init = function () {

        yii.confirm = confirm;
    };

    return {
        init: function () {
            if (typeof ModalSettings !== "undefined") {
                $.extend(true, settings, ModalSettings);
            }

            _init();
        }
    };

}(jQuery);

jQuery(document).ready(function () {
    Modal.init();
});