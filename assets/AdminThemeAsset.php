<?php

namespace yeesoft\theme\assets;

use yii\web\AssetBundle;

/**
 * Class YeeThemeAsset
 * 
 * @package yeesoft\theme
 */
class AdminThemeAsset extends AssetBundle {

    public $sourcePath = '@yeesoft/yee-theme/dist/theme';
    public $js = ['js/application.min.js'];
    public $depends = [
        'yeesoft\theme\assets\CheckboxAsset',
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\bootstrap\BootstrapPluginAsset',
        'yii\jui\JuiAsset',
    ];

}
