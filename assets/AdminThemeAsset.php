<?php

namespace yeesoft\theme\assets;

use yii\web\AssetBundle;

/**
 * Class YeeThemeAsset
 * 
 * @package yeesoft\theme
 */
class AdminThemeAsset extends AssetBundle
{

    public function init()
    {
        $this->sourcePath = '@yeesoft/yee-theme/dist';

        $this->js = [
            //'js/bootstrap.min.js',
            //'js/bootstrap-switch.min.js',
            'js/application.min.js',
            //'js/admin.min.js',
        ];

        $this->css = [
                //'css/bootstrap-switch.min.css',
                //'css/bootstrap.css'
        ];

        $this->depends = [
            'yii\web\YiiAsset',
            'yii\bootstrap\BootstrapAsset',
            'yii\bootstrap\BootstrapPluginAsset',
            'yii\jui\JuiAsset',
            //'yeesoft\theme\assets\CheckboxAsset',
        ];
        
    }

}
