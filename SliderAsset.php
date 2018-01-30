<?php
/**
 * @copyright Copyright &copy; Klaus Mergen, 2014
 * @package yii2-widgets
 * @version 1.1.0
 */

namespace kmergen\jssor;

use yii\web\AssetBundle;

/**
 * Asset bundle for Slider Widget
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 * @since 1.0
 */
class SliderAsset extends AssetBundle
{
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap\BootstrapAsset',
    ];

    public function init()
    {
        $this->sourcePath = __DIR__ . '/assets';
        
        $this->js = YII_DEBUG ? [
            'js/jssor.js',
            'js/jssor.slider.js'
        ] : ['js/jssor.slider.mini.js'];

        $this->css = YII_DEBUG ? [
            'css/slider.css',
            'css/arrows.css',
            'css/bullets.css',
            'css/thumbnails.css'
            ] : ['css/all.min.css'];

        parent::init();
    }

}
