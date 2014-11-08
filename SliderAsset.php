<?php

/**
 * @copyright Copyright &copy; Klaus Mergen, 2014
 * @package yii2-widgets
 * @version 1.1.0
 */

namespace kmergen\jssorSlider;

use yii\web\AssetBundle;

/**
 * Asset bundle for Slider Widget
 *
 * @author Klaus Mergen <klaus.mergen@web.de>
 * @since 1.0
 */
class SliderAsset extends AssetBundle {

    
    public $js = [
      'jssor.slider.mini.js'
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
    
    public function init()
    {
        $this->sourcePath = __DIR__ . '/js';
        parent::init();
    }

}
