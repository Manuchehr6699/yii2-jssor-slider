<?php

/**
 * @copyright Copyright &copy; Klaus Mergen, 2014
 * @package yii2-widgets
 * @version 1.1.0
 */

namespace kmergen\jssorSlider;

use yii\helpers\Html;
use yii\helpers\Json;
use yii\base\Widget;

/**
 * Slider Widget
 *
 * @author Klaus Mergen <klaus.mergen@web.de>
 * @since 1.0
 */
class SliderWidget extends Widget
{

    public $margin_right_responsive = 30;
    public $responsive = true;

    /**
     * @var array the HTML attributes for the div tag.
     */
    public $options;

    /**
     * @var array options for Slider plugin
     */
    public $pluginOptions = [];

    public function init()
    {
        parent::init();
        if (!isset($this->options['id'])) {
            $this->options['id'] = $this->getId();
        }
        // open tag
        echo Html::beginTag('div', $this->options) . '
                <!-- Slides Container -->';
    }

    public function run()
    {
        // close tag
        echo Html::endTag('div');

        // get id
        $id = $this->options['id'];

        // register Assets
        $view = $this->getView();
        SliderAsset::register($view);

        //We must replace the quotes from the Classes because these are functions.

        $trans = [
            '"$JssorBulletNavigator$"' => '$JssorBulletNavigator$',
            '"$JssorArrowNavigator$"' => '$JssorArrowNavigator$',
            '"$JssorThumbnailNavigator$"' => '$JssorThumbnailNavigator$',
            '"$JssorSlideshowRunner$"' => '$JssorSlideshowRunner$',
            '"$JssorCaptionSlider$"' => '$JssorCaptionSlider$',
        ];

        // plugin init
        $pluginOptions = empty($this->pluginOptions) ? '' : strtr(Json::encode($this->pluginOptions), $trans);

        $js = "var $id = new \$JssorSlider$('$id', $pluginOptions);";
        $view->registerJs($js . ";\n");

        // responsive init
        if ($this->responsive) {
            $js2 = "
            function " . $id . "ScaleSlider() {
                var parentWidth = $id.\$Elmt.parentNode.clientWidth;
                if (parentWidth)
                    $id.\$SetScaleWidth(parentWidth-$this->margin_right_responsive);
                else
                    window.setTimeout(" . $id . "ScaleSlider, 30);
            }

            " . $id . "ScaleSlider();

            if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
                $(window).bind('resize', " . $id . "ScaleSlider);
            }";
            $view->registerJs($js2 . ";\n");
        }
    }

}
