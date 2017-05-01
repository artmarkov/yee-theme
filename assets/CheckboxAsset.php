<?php

namespace yeesoft\theme\assets;

use yii\web\AssetBundle;

class CheckboxAsset extends AssetBundle
{

    public $sourcePath = '@bower/icheck';
    //public $js = ['icheck.min.js'];
    //public $css = ['skins/all.css'];
    public $depends = [
        'yii\web\JqueryAsset',
    ];

}
