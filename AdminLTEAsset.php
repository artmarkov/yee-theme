<?php

namespace yeesoft\assets;

use yii\web\AssetBundle;

/**
 * Class YeeAsset
 * 
 * @package yeesoft\core
 */
class AdminLTEAsset extends AssetBundle
{

    public function init()
    {
        $this->sourcePath = '@yeesoft/yee-theme/dist';

        $this->js = [
            //'js/bootstrap.min.js',
            'js/app.min.js',
                //'js/admin.js',
        ];

        $this->css = [
                //'css/theme.css',
                //'css/bootstrap.css'
        ];

        $this->depends = [
            'yii\web\YiiAsset',
            'yii\bootstrap\BootstrapPluginAsset', 
        ];

        parent::init();
    }

}
