# yee-theme

Yee CMS Theme
=====

Installation
------------

- Either run

```
composer require --prefer-dist yeesoft/yee-theme "0.2.0"
```

or add

```
"yeesoft/yee-theme": "0.2.0"
```

to the require section of your `composer.json` file.

Configuration
------

- In your config file

```php
'components' => [
    'assetManager' => [
        'bundles' => [
            'yii\bootstrap\BootstrapAsset' => [
                'sourcePath' => '@yeesoft/yee-theme/dist',
                 'css' => ['css/theme.min.css']
            ],
            'yii\bootstrap\BootstrapPluginAsset' => [
                'sourcePath' => '@yeesoft/yee-theme/dist',
                 'js' => ['js/bootstrap.min.js',]
            ],
        ],
    ],
]
```


Creation of own theme
---

- Create a copy of `yeesoft/yee-theme`.

- Run
```
composer install
npm install
```
to install all dependencies.

- Update js, less or other files. Run

```php
grunt run
```

to build and minify all source files.
