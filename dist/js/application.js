var AdminLTEOptions = {
    boxWidgetOptions: {
        boxWidgetIcons: {
            collapse: 'fa-minus',
            open: 'fa-chevron-down',
            remove: 'fa-times'
        }
    },
    directChat: {
        enable: false
    }
};
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
/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <abdullah@almsaeedstudio.com>
 * @version 2.3.8
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

/* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
  //Add slimscroll to navbar menus
  //This requires you to load the slimscroll plugin
  //in every page before app.js
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
  navbarMenuHeight: "200px", //The height of the inner menu
  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 500,
  //Sidebar push menu toggle button selector
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  //Activate sidebar push menu
  sidebarPushMenu: true,
  //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: true,
  //Enable sidebar expand on hover effect for sidebar mini
  //This option is forced to true if both the fixed layout and sidebar mini
  //are used together
  sidebarExpandOnHover: false,
  //BoxRefresh Plugin
  enableBoxRefresh: true,
  //Bootstrap.js tooltip
  enableBSToppltip: true,
  BSTooltipSelector: "[data-toggle='tooltip']",
  //Enable Fast Click. Fastclick.js creates a more
  //native touch experience with touch devices. If you
  //choose to enable the plugin, make sure you load the script
  //before AdminLTE's app.js
  enableFastclick: false,
  //Control Sidebar Tree views
  enableControlTreeView: true,
  //Control Sidebar Options
  enableControlSidebar: true,
  controlSidebarOptions: {
    //Which button should trigger the open/close event
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    //The sidebar selector
    selector: ".control-sidebar",
    //Enable slide over content
    slide: true
  },
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'fa-minus',
      //Open icon
      open: 'fa-plus',
      //Remove icon
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]',
      //Collapse button selector
      collapse: '[data-widget="collapse"]'
    }
  },
  //Direct Chat plugin options
  directChat: {
    //Enable direct chat by default
    enable: true,
    //The button to open and close the chat contacts pane
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  //Define the set of colors to use globally around the website
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
  "use strict";

  //Fix for IE page transitions
  $("body").removeClass("hold-transition");

  //Extend options if external options exist
  if (typeof AdminLTEOptions !== "undefined") {
    $.extend(true,
      $.AdminLTE.options,
      AdminLTEOptions);
  }

  //Easy access to options
  var o = $.AdminLTE.options;

  //Set up the object
  _init();

  //Activate the layout maker
  $.AdminLTE.layout.activate();

  //Enable sidebar tree view controls
  if (o.enableControlTreeView) {
    $.AdminLTE.tree('.sidebar');
  }

  //Enable control sidebar
  if (o.enableControlSidebar) {
    $.AdminLTE.controlSidebar.activate();
  }

  //Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth
    }).css("width", "100%");
  }

  //Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
  }

  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $('body').tooltip({
      selector: o.BSTooltipSelector,
      container: 'body'
    });
  }

  //Activate box widget
  if (o.enableBoxWidget) {
    $.AdminLTE.boxWidget.activate();
  }

  //Activate fast click
  if (o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }

  //Activate direct chat widget
  if (o.directChat.enable) {
    $(document).on('click', o.directChat.contactToggleSelector, function () {
      var box = $(this).parents('.direct-chat').first();
      box.toggleClass('direct-chat-contacts-open');
    });
  }

  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
  $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var group = $(this);
    $(this).find(".btn").on('click', function (e) {
      group.find(".btn.active").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });

  });
});

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.AdminLTE.layout.activate()
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */
  $.AdminLTE.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $('body, html, .wrapper').css('height', 'auto');
      $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      // Remove overflow from .wrapper if layout-boxed exists
      $(".layout-boxed > .wrapper").css('overflow', 'hidden');
      //Get window height and the wrapper height
      var footer_height = $('.main-footer').outerHeight() || 0;
      var neg = $('.main-header').outerHeight() + footer_height;
      var window_height = $(window).height();
      var sidebar_height = $(".sidebar").height() || 0;
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - footer_height);
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
          if (controlSidebar.height() > postSetWidth)
            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }

      }
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      //Enable slimscroll for fixed layout
      if ($.AdminLTE.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //Destroy if it exists
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          //Add slimscroll
          $(".sidebar").slimScroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */
  $.AdminLTE.pushMenu = {
    activate: function (toggleBtn) {
      //Get the screen sizes
      var screenSizes = $.AdminLTE.options.screenSizes;

      //Enable sidebar toggle
      $(document).on('click', toggleBtn, function (e) {
        e.preventDefault();

        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
          }
        }
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
          }
        }
      });

      $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });

      //Enable expand on hover for sidebar mini
      if ($.AdminLTE.options.sidebarExpandOnHover
        || ($('body').hasClass('fixed')
        && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
      }
    },
    expandOnHover: function () {
      var _this = this;
      var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
      //Expand sidebar on hover
      $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
          && $("body").hasClass('sidebar-collapse')
          && $(window).width() > screenWidth) {
          _this.expand();
        }
      }, function () {
        if ($('body').hasClass('sidebar-mini')
          && $('body').hasClass('sidebar-expanded-on-hover')
          && $(window).width() > screenWidth) {
          _this.collapse();
        }
      });
    },
    expand: function () {
      $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function () {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    }
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.AdminLTE.tree('.sidebar')
   */
  $.AdminLTE.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.AdminLTE.options.animationSpeed;
    $(document).off('click', menu + ' li a')
      .on('click', menu + ' li a', function (e) {
        //Get the clicked link and the next element
        var $this = $(this);
        var checkElement = $this.next();

        //Check if the next element is a menu and is visible
        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
          //Close the menu
          checkElement.slideUp(animationSpeed, function () {
            checkElement.removeClass('menu-open');
            //Fix the layout in case the sidebar stretches over the height of the window
            //_this.layout.fix();
          });
          checkElement.parent("li").removeClass("active");
        }
        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
          //Get the parent menu
          var parent = $this.parents('ul').first();
          //Close all open menus within the parent
          var ul = parent.find('ul:visible').slideUp(animationSpeed);
          //Remove the menu-open class from the parent
          ul.removeClass('menu-open');
          //Get the parent li
          var parent_li = $this.parent("li");

          //Open the target menu and add the menu-open class
          checkElement.slideDown(animationSpeed, function () {
            //Add the class active to the parent li
            checkElement.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parent_li.addClass('active');
            //Fix the layout in case the sidebar stretches over the height of the window
            _this.layout.fix();
          });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
          e.preventDefault();
        }
      });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */
  $.AdminLTE.controlSidebar = {
    //instantiate the object
    activate: function () {
      //Get the object
      var _this = this;
      //Update options
      var o = $.AdminLTE.options.controlSidebarOptions;
      //Get the sidebar
      var sidebar = $(o.selector);
      //The toggle button
      var btn = $(o.toggleBtnSelector);

      //Listen to the click event
      btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
          && !$('body').hasClass('control-sidebar-open')) {
          //Open the sidebar
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });

      //If the body has a boxed layout, fix the sidebar bg position
      var bg = $(".control-sidebar-bg");
      _this._fix(bg);

      //If the body has a fixed layout, make the control sidebar fixed
      if ($('body').hasClass('fixed')) {
        _this._fixForFixed(sidebar);
      } else {
        //If the content height is less than the sidebar's height, force max height
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
          _this._fixForContent(sidebar);
        }
      }
    },
    //Open the control sidebar
    open: function (sidebar, slide) {
      //Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    //Close the control sidebar
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        if (_this.hasBindedResize) {
          return;
        }
        $(window).resize(function () {
          _this._fix(sidebar);
        });
        _this.hasBindedResize = true;
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      }
    },
    _fixForFixed: function (sidebar) {
      sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px'
      });
    },
    _fixForContent: function (sidebar) {
      $(".content-wrapper, .right-side").css('min-height', sidebar.height());
    }
  };

  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.AdminLTE.boxWidget.activate()
   *        Set all your options in the main $.AdminLTE.options object
   */
  $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      //Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      //Find the box parent
      var box = element.parents(".box").first();
      //Find the body and the footer
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
          .removeClass(_this.icons.collapse)
          .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass("collapsed-box");
        });
      } else {
        //Convert plus into minus
        element.children(":first")
          .removeClass(_this.icons.open)
          .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass("collapsed-box");
        });
      }
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents(".box").first();
      box.slideUp(this.animationSpeed);
    }
  };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function ($) {

  "use strict";

  $.fn.boxRefresh = function (options) {

    // Render options
    var settings = $.extend({
      //Refresh button selector
      trigger: ".refresh-btn",
      //File source to be loaded (e.g: ajax/src.php)
      source: "",
      //Callbacks
      onLoadStart: function (box) {
        return box;
      }, //Right after the button has been clicked
      onLoadDone: function (box) {
        return box;
      } //When the source has been loaded

    }, options);

    //The overlay
    var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

    return this.each(function () {
      //if a source is specified
      if (settings.source === "") {
        if (window.console) {
          window.console.log("Please specify a source first - boxRefresh()");
        }
        return;
      }
      //the box
      var box = $(this);
      //the button
      var rBtn = box.find(settings.trigger).first();

      //On trigger click
      rBtn.on('click', function (e) {
        e.preventDefault();
        //Add loading overlay
        start(box);

        //Perform ajax call
        box.find(".box-body").load(settings.source, function () {
          done(box);
        });
      });
    });

    function start(box) {
      //Add overlay and loading img
      box.append(overlay);

      settings.onLoadStart.call(box);
    }

    function done(box) {
      //Remove overlay and loading img
      box.find(overlay).remove();

      settings.onLoadDone.call(box);
    }

  };

})(jQuery);

/*
 * EXPLICIT BOX CONTROLS
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded, toggle and remove box.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 * @usage $("#box-widget").toggleBox();
 * @usage $("#box-widget").removeBox();
 */
(function ($) {

  'use strict';

  $.fn.activateBox = function () {
    $.AdminLTE.boxWidget.activate(this);
  };

  $.fn.toggleBox = function () {
    var button = $($.AdminLTE.boxWidget.selectors.collapse, this);
    $.AdminLTE.boxWidget.collapse(button);
  };

  $.fn.removeBox = function () {
    var button = $($.AdminLTE.boxWidget.selectors.remove, this);
    $.AdminLTE.boxWidget.remove(button);
  };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
(function ($) {

  'use strict';

  $.fn.todolist = function (options) {
    // Render options
    var settings = $.extend({
      //When the user checks the input
      onCheck: function (ele) {
        return ele;
      },
      //When the user unchecks the input
      onUncheck: function (ele) {
        return ele;
      }
    }, options);

    return this.each(function () {

      if (typeof $.fn.iCheck != 'undefined') {
        $('input', this).on('ifChecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onCheck.call(ele);
        });

        $('input', this).on('ifUnchecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onUncheck.call(ele);
        });
      } else {
        $('input', this).on('change', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          if ($('input', ele).is(":checked")) {
            settings.onCheck.call(ele);
          } else {
            settings.onUncheck.call(ele);
          }
        });
      }
    });
  };
}(jQuery));

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