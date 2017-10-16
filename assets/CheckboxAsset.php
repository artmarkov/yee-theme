<?php

namespace yeesoft\theme\assets;

use yii\web\View;
use yii\web\AssetBundle;

class CheckboxAsset extends AssetBundle {

    public $sourcePath = '@yeesoft/yee-theme/dist/checkbox';
    public $js = ['js/checkbox.min.js'];
    public $css = ['css/checkbox.min.css'];
    //public $jsOptions = ['position' => View::POS_HEAD];

}
