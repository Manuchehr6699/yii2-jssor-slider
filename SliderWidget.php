<?php
/**
 * @copyright Copyright &copy; Klaus Mergen, 2014
 * @package yii2-widgets
 * @version 1.1.0
 */

namespace kmergen\jssor;

use yii\helpers\Html;
use yii\helpers\Json;
use yii\base\Widget;
use yii\base\InvalidConfigException;

/**
 * Slider Widget
 *
 * @author Klaus Mergen <klaus.mergen@web.de>
 * @since 1.0
 */
class SliderWidget extends Widget
{

    /**
     * @var array $images The images to show in the slider.
     * 'images' => [
     *    'uri' => 'images/bild1.jpg',
     *    'uri' => 'images/bild2.jpg'
     *  ];
     */
    public $images = [];

    /**
     * @var boolean $responsive Show the slider responsive.
     */
    public $responsive = true;

    /**
     * @var array $sliderHeight The height of the slider container.
     */
    public $sliderWidth = 600;

    /**
     * @var array $sliderWidth The width of the slider container.
     */
    public $sliderHeight = 450;

    /**
     * @var array $captionTransitions The transitions how to animate a caption.
     */
    public $captionTransitions = '[{$Duration: 900, $Clip: 3, $Easing: $JssorEasing$.$EaseInOutCubic }]';

    /**
     * @var array $containerOptions The HTML attributes for the slider container div tag.
     */
    public $containerOptions;

    /**
     * @var array $pluginOptions The options for JssorSlider plugin see http://www.jssor.com/development/index.html.
     */
    public $pluginOptions = [];

    /**
     * @var string $js The javascript code which will be published.
     */
    protected $js = '';

    /**
     * @var boolean $hasCaption Wether this slider has captions
     */
    protected $hasCaption;

    /**
     * @var string|boolean $navSkin The navigation Skin This should be one of the following:
     * 't01' until 't10'
     * 'b01' until 'b10'
     * If you set false no navigation will be applied to the slider.
     * 
     */
    public $navSkin;

    /**
     * @var string|boolean $arrowSkin The navigation Skin This should be one of the following:
     * 'a01' until 'a10'
     * If you set false no navigation will be applied to the slider.
     * 
     */
    public $arrowSkin;

    /**
     * @var array $skins The available skins.
     */
    protected $skins = [
        'a01' => [],
        'a02' => [],
        'a03' => [],
        'a04' => [],
        'a05' => [],
        'b01' => [],
        'b02' => [],
        'b03' => [],
        'b04' => [],
        'b05' => [],
        't01' => [],
        't02' => [],
        't03' => [],
        't04' => [],
        't05' => [],
    ];

    /**
     * @var array $trans We must replace the quotes from the Classes because these are functions.
     * This will done when the [[$pluginOptions]] were json encoded.
     */
    protected $trans = [
        '"$JssorBulletNavigator$"' => '$JssorBulletNavigator$',
        '"$JssorArrowNavigator$"' => '$JssorArrowNavigator$',
        '"$JssorThumbnailNavigator$"' => '$JssorThumbnailNavigator$',
        '"$JssorSlideshowRunner$"' => '$JssorSlideshowRunner$',
        '"$JssorCaptionSlider$"' => '$JssorCaptionSlider$'
    ];

    /**
     * @var boolean $raw If you want to write your custom html for the slider 
     * you must run the widget with [[begin()]] and [[end()]]
     * All propertys except [[pluginOptions]], [[responsive]], [[images]], [[options]], [[sliderWidth]], [[sliderHeight]] are ignored.
     */
    protected static $raw = false;

    /**
     * @inheritdoc
     */
    public static function begin($config = [])
    {
        static::$raw = true;
        parent::begin($config);
    }

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();


        $this->hasCaption = array_key_exists('$CaptionSliderOptions', $this->pluginOptions) ? true : false;

        if (static::$raw === false) {
            $this->createSkin();
        }

        $this->containerOptions['id'] = $this->getId();

        // open tag
        echo '<!-- Slider Container -->';
        echo Html::beginTag('div', $this->containerOptions);
    }

    /**
     * @inheritdoc
     */
    public function run()
    {
        $view = $this->getView();
        //boxsizing settings

        $view->registerCss('.thumbnavigator div,.w,.p,.c{box-sizing: content-box}');

        // register Assets
        SliderAsset::register($view);

        $id = $this->getId();

        // responsive init
        if ($this->responsive) {
            handleResponsive();
        }

        //$pluginOptions = $this->pluginOptions;
        //It is important that this comes before handleCaption() call because handleCaption() must manipulate the json encoded string
        $this->pluginOptions = empty($this->pluginOptions) ? '' : strtr(Json::encode($this->pluginOptions), $this->trans);

        if ($this->hasCaption) {
            handleCaption();
        }

        $this->js .= "var $id = new \$JssorSlider$('$id', $this->pluginOptions);";

        $view->registerJs($this->js . ";\n");

        if (!static::$raw) {
            echo $this->renderSlider();
        }

        echo Html::endTag('div');
        echo '<!-- Slider Container End -->';
    }

    /**
     * Handle the js for caption transitions and correct the strings in [[$pluginOptions]]
     */
    protected function handleCaption()
    {

        $this->js .= ' var _CaptionTransitions = [];
            _CaptionTransitions["L"] = { $Duration: 900, x: 0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
            _CaptionTransitions["R"] = { $Duration: 900, x: -0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
            _CaptionTransitions["T"] = { $Duration: 900, y: 0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
            _CaptionTransitions["B"] = { $Duration: 900, y: -0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
            _CaptionTransitions["ZMF|10"] = { $Duration: 900, $Zoom: 11, $Easing: { $Zoom: $JssorEasing$.$EaseOutQuad, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 };
            _CaptionTransitions["RTT|10"] = { $Duration: 900, $Zoom: 11, $Rotate: 1, $Easing: { $Zoom: $JssorEasing$.$EaseOutQuad, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInExpo }, $Opacity: 2, $Round: { $Rotate: 0.8} };
            _CaptionTransitions["RTT|2"] = { $Duration: 900, $Zoom: 3, $Rotate: 1, $Easing: { $Zoom: $JssorEasing$.$EaseInQuad, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInQuad }, $Opacity: 2, $Round: { $Rotate: 0.5} };
            _CaptionTransitions["RTTL|BR"] = { $Duration: 900, x: -0.6, y: -0.6, $Zoom: 11, $Rotate: 1, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Top: $JssorEasing$.$EaseInCubic, $Zoom: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInCubic }, $Opacity: 2, $Round: { $Rotate: 0.8} };
            _CaptionTransitions["CLIP|LR"] = { $Duration: 900, $Clip: 15, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic }, $Opacity: 2 };
            _CaptionTransitions["MCLIP|L"] = { $Duration: 900, $Clip: 1, $Move: true, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic} };
            _CaptionTransitions["MCLIP|R"] = { $Duration: 900, $Clip: 2, $Move: true, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic} };';

        $this->pluginOptions = strtr($this->pluginOptions, ['"CaptionTransitionsPlaceholder"' => '_CaptionTransitions']);
    }

    /**
     * Makes all necessary settings when [[$responsive]] property is true 
     */
    protected function handleResponsive()
    {
        $id = $this->getId();
        $this->js .= "
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
    }

    /**
     * Render the slider html for the given configuration and skin.
     * This function is only called if [[raw]] is false.
     */
    protected function renderSlider()
    {
        return $this->render('imageGallery1', [
                'images' => $this->images
        ]);
    }

    /**
     * Do all important settings for the skin
     */
    protected function createSkin()
    {
        //Set slider container
        $customCssClass = isset($this->containerOptions['class']) ? ' ' . $this->containerOptions['class'] : '';
        $this->containerOptions = [];
        $this->containerOptions['style'] = "width:{$this->sliderWidth}px; height:{$this->sliderHeight}px";
        $this->containerOptions['class'] = "slider-container slider-container-{$this->id}$customCssClass";

        //Set the arrow skin
        if ($this->arrowSkin) {
            try {
                $aSkin = $this->skins[$this->arrowSkin];
                if (!isset($this->pluginOptions['$ArrowNavigatorOptions'])) {
                    $this->pluginOptions['$ArrowNavigatorOptions'] = [
                        '$Class' => '$JssorArrowNavigator$',
                        '$ChanceToShow' => 2,
                        '$AutoCenter' => 2,
                    ];
                }
            } catch (Exception $ex) {
                throw new InvalidConfigException();
            }
        }
        if ($this->navSkin) {
            try {
                $navSkin = $this->skins[$this->navSkin];
                if ($this->navSkin[0] === 'b') {
                    if (!isset($this->pluginOptions['$BulletNavigatorOptions'])) {
                        $this->pluginOptions['$BulletNavigatorOptions'] = [
                            '$Class' => '$JssorBulletNavigator$',
                            '$ChanceToShow' => 2,
                            '$AutoCenter' => 1,
                            '$Steps' => 1, //[Optional] Steps to go for each navigation request, default value is 1
                            '$Lanes' => 1, //[Optional] Specify lanes to arrange items, default value is 1
                            '$SpacingX' => 10, //[Optional] Horizontal space between each item in pixel, default value is 0
                            '$SpacingY' => 10, //[Optional] Vertical space between each item in pixel, default value is 0
                            '$Orientation' => 1
                        ];
                    }
                } elseif ($this->navSkin[0] === 'b') {
                    if (!isset($this->pluginOptions['$ThumbnailNavigatorOptions'])) {
                        $this->pluginOptions['$ThumbnailNavigatorOptions'] = [
                            '$Class' => '$JssorThumbnailNavigator$',
                            '$ChanceToShow' => 2,
                            '$AutoCenter' => 3,
                        ];
                    }
                }
            } catch (Exception $ex) {
                throw new InvalidConfigException();
            }
        }
    }

}
