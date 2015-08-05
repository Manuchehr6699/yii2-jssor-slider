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
    public $responsive = false;

    /**
     * @var string $sliderWidth The width of the slider container.
     */
    public $sliderWidth = 700;

    /**
     * @var string $sliderHeight The height of the slider container.
     */
    public $sliderHeight = 350;

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
     * @var string|boolean $Id The navigation Skin (Bullets or Thumbnails) This should be one of the following:
     * 'b01' until 'b10'
     * 't01' until 't10'
     * If you set false no navigation will be applied to the slider.
     * 
     */
    public $navSkinId = 'b01';

    /**
     * @var string|boolean $arrowSkinId The navigation Skin This should be one of the following:
     * 'a01' until 'a10'
     * If you set false no arrows will be applied to the slider.
     * 
     */
    public $arrowSkinId = 'a01';

    /**
     * @var string $js The javascript code which will be published.
     */
    protected $js = '';

    /**
     * @var boolean $hasCaption Wether this slider has captions
     */
    protected $hasCaption;

    /**
     * @var array $arrowSkins The available arrowSkins.
     * We use shortnames here for the plugin options that than will merge into the pluginOptions array
     * -pluginOptions['p'] The plugin options
     * -pluginOptions['s'] The specific plugin options (here the arrow option)
     */
    protected static $arrowSkins = [
        'a01' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a02' => [
            'left' => 0,
            'right' => 0,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a03' => [
            'left' => 0,
            'right' => 0,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a04' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a05' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ]
        ],
        'a06' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a07' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a08' => [
            'left' => 0,
            'right' => 0,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a09' => [
            'left' => 0,
            'right' => 0,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a10' => [
            'left' => 0,
            'right' => 0,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a11' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a12' => [
            'left' => 0,
            'right' => 0,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a13' => [
            'left' => 0,
            'right' => 0,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a14' => [
            'left' => 0,
            'right' => 0,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a15' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a16' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a18' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a19' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a20' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a21' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
        'a22' => [
            'left' => 4,
            'right' => 4,
            'p' => [],
            's' => [
                '$AutoCenter' => 2
            ],
        ],
    ];

    /**
     * @var array $navSkins The available navSkins (bullets or thumbnails).
     * We use shortnames here for the plugin options that than will merge into the pluginOptions array
     * -pluginOptions['p'] The plugin options
     * -pluginOptions['s'] The specific plugin options (here the bullet or thumbnail option)
     */
    protected static $navSkins = [
        'b01' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b02' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b03' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b05' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 15,
            ],
        ],
        'b06' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b07' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b09' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b10' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b11' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b12' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b13' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b14' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b16' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b17' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b18' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b20' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        'b21' => [
            'p' => [],
            's' => [
                '$AutoCenter' => 1,
                '$SpacingX' => 5,
            ],
        ],
        't01' => [
            'template' => 't01',
            'position' => 'bottom',
            'containerHeight' => 100,
            'calcSlide' => true,
            'p' => [],
            's' => [
                '$AutoCenter' => 3,
                '$DisplayPieces' => 10,
                '$ParkingPosition' => 360,
                '$SpacingX' => 8,
            ],
        ],
        't02' => [
            'template' => 't02',
            'position' => 'left',
            'containerWidth' => 240,
            'calcSlide' => true,
            'p' => [],
            's' => [
                '$ChanceToShow' => 2,
                '$Lanes' => 2, //[Optional] Specify lanes to arrange thumbnails, default value is 1
                '$SpacingX' => 14, //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
                '$SpacingY' => 12, //[Optional] Vertical space between each thumbnail in pixel, default value is 0
                '$DisplayPieces' => 6, //[Optional] Number of pieces to display, default value is 1
                '$ParkingPosition' => 156, //[Optional] The offset position to park thumbnail
                '$Orientation' => 2
            ],
        ],
        't03' => [
            'template' => 't03',
            'position' => 'bottom',
            'containerHeight' => 60,
            'calcSlide' => false,
            'p' => [],
            's' => [
                '$AutoCenter' => 3, //[Optional] Auto center thumbnail items in the thumbnail navigator container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 3
                '$Lanes' => 1, //[Optional] Specify lanes to arrange thumbnails, default value is 1
                '$SpacingX' => 3, //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
                '$SpacingY' => 3, //[Optional] Vertical space between each thumbnail in pixel, default value is 0
                '$DisplayPieces' => 9, //[Optional] Number of pieces to display, default value is 1
                '$ParkingPosition' => 260, //[Optional] The offset position to park thumbnail
                '$Orientation' => 1, //[Optional] Orientation to arrange thumbnails, 1 horizental, 2 vertical, default value is 1
                '$DisableDrag' => false                            //[Optional] Disable drag or not, default value is false
            ],
        ],
        't04' => [
            'template' => 't04',
            'position' => 'bottom',
            'containerHeight' => 100,
            'calcSlide' => false,
            'p' => [],
            's' => [
                '$AutoCenter' => 0,
                'SpacingX' => 3,
                'SpacingY' => 3,
                '$ParkingPosition' => 260,
                '$DisplayPieces' => 9,
            ],
        ],
        't05' => [
            'template' => 't05',
            'position' => 'bottom',
            'containerHeight' => 100,
            'calcSlide' => true,
            'p' => [],
            's' => [
                '$AutoCenter' => 3,
                '$DisplayPieces' => 10,
                '$ParkingPosition' => 300,
                '$SpacingX' => 8,
            ],
        ],
        't06' => [
            'template' => 't06',
            'position' => 'right',
            'containerWidth' => 240,
            'calcSlide' => true,
            'p' => [],
            's' => [
                '$ChanceToShow' => 2,
                '$Lanes' => 2, //[Optional] Specify lanes to arrange thumbnails, default value is 1
                '$SpacingX' => 14, //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
                '$SpacingY' => 12, //[Optional] Vertical space between each thumbnail in pixel, default value is 0
                '$DisplayPieces' => 6, //[Optional] Number of pieces to display, default value is 1
                '$ParkingPosition' => 156, //[Optional] The offset position to park thumbnail
                '$Orientation' => 2
            ],
        ],
        't07' => [
            'template' => 't07',
            'position' => 'bottom',
            'containerHeight' => 100,
            'calcSlide' => true,
            'p' => [],
            's' => [
                '$AutoCenter' => 3,
                '$DisplayPieces' => 10,
                '$ParkingPosition' => 360,
                '$SpacingX' => 8,
            ],
        ],
        't08' => [
            'template' => 't08',
            'position' => 'bottom',
            'containerHeight' => 60,
            'calcSlide' => true,
            'p' => [],
            's' => [
                '$AutoCenter' => 3,
                '$DisplayPieces' => 7,
                '$ParkingPosition' => 219,
                '$SpacingX' => 15,
                '$SpacingY' => 15,
            ],
        ],
        't09' => [
            'template' => 't09',
            'position' => 'left',
            'containerWidth' => 140,
            'calcSlide' => true,
            'p' => [],
            's' => [
                '$ChanceToShow' => 2,
                '$AutoCenter' => 3,
                '$Lanes' => 1, //[Optional] Specify lanes to arrange thumbnails, default value is 1
                '$SpacingX' => 12, //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
                '$SpacingY' => 12, //[Optional] Vertical space between each thumbnail in pixel, default value is 0
                '$DisplayPieces' => 6, //[Optional] Number of pieces to display, default value is 1
                '$ParkingPosition' => 156, //[Optional] The offset position to park thumbnail
                '$Orientation' => 2
            ],
        ],
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
     * @var array $data The data for the view File 
     */
    protected $data = [];

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
            $this->createSlider();
        } else {
            $this->createSliderContainer();
        }

        $this->containerOptions['id'] = $this->getId();

// open tag
        echo '<!-- Slider Container Begin -->';
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

//$pluginOptions = $this->pluginOptions;
//It is important that this comes before handleCaption() call because handleCaption() must manipulate the json encoded string
        $this->pluginOptions = empty($this->pluginOptions) ? '{}' : strtr(Json::encode($this->pluginOptions), $this->trans);

        if ($this->hasCaption) {
            handleCaption();
        }

        $this->js .= "var $id = new \$JssorSlider$('$id', $this->pluginOptions);";

// responsive init
        if ($this->responsive) {
            $this->handleResponsive();
        }

        $view->registerJs($this->js);

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
                    $id.\$SetScaleWidth(parentWidth);
                else
                    window.setTimeout(" . $id . "ScaleSlider, 30);
            }

            " . $id . "ScaleSlider();

            if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
                $(window).bind('resize', " . $id . "ScaleSlider);
            };\n";
    }

    /**
     * Render the slider html for the given configuration and skin.
     * This function is only called if [[raw]] is false.
     */
    protected function renderSlider()
    {
        $this->data['slidePosition'] = $this->resolvePosition($this->data['slidePosition']);

        return $this->render('main', [
                'images' => $this->images,
                'data' => $this->data
        ]);
    }

    /**
     * Do all important settings for the skin and the view file
     */
    protected function createSlider()
    {
        $this->data['slideWidth'] = $this->sliderWidth;
        $this->data['slideHeight'] = $this->sliderHeight;
        $this->data['slidePosition'] = ['left' => 0, 'top' => 0];
        $this->data['arrowSkinId'] = $this->arrowSkinId;
        $this->data['navSkinId'] = $this->navSkinId;

        $this->createSliderContainer();

//Slider Arrows
        if ($this->arrowSkinId) {
            if (array_key_exists($this->arrowSkinId, self::$arrowSkins)) {
                $this->createSliderArrow();
            } else {
                throw new InvalidConfigException("The arrowSkinId '{$this->arrowSkinId}' does not exist.\n
                    Available arrow skins: " . implode(',', array_keys(self::$arrowSkins)));
            }
        }

//Slider Navigation (Bullet or Thumbnail)
        if ($this->navSkinId) {
            if (array_key_exists($this->navSkinId, self::$navSkins)) {
                if ($this->navSkinId[0] === 'b') {
                    $this->createSliderBullet();
                } elseif ($this->navSkinId[0] === 't') {
                    $this->createSliderThumb();
                }
            } else {
                throw new InvalidConfigException("The navSkinId '{$this->navSkinId}' does not exist.\n
                    Available arrow skins: " . implode(',', array_keys(self::$navSkins)));
            }
        }
    }

    /**
     * Slider Container settings
     */
    protected function createSliderContainer()
    {
//Slider container
        $customCssClass = isset($this->containerOptions['class']) ? ' ' . $this->containerOptions['class'] : '';
        $this->containerOptions = [];
        $this->containerOptions['style'] = "width:{$this->sliderWidth}px; height:{$this->sliderHeight}px";
        $this->containerOptions['class'] = "slider-container slider-container-{$this->id}$customCssClass";
    }

    /**
     * Slider Arrows settings
     */
    protected function createSliderArrow()
    {

        $skin = self::$arrowSkins[$this->arrowSkinId];
//$this->data['arrow']['top'] = 0;
// $this->data['arrow']['top'] = floor($this->data['slideHeight'] / 2);
        $this->data['arrow']['left'] = $skin['left'];
        $this->data['arrow']['right'] = $skin['right'];
        $skin['s']['$Class'] = '$JssorArrowNavigator$';
        $this->mergeSkinSettings($skin, '$ArrowNavigatorOptions');
    }

    /**
     * Slider Bullet settings
     */
    protected function createSliderBullet()
    {
        $skin = self::$navSkins[$this->navSkinId];
        $skin['s']['$Class'] = '$JssorBulletNavigator$';
        $this->mergeSkinSettings($skin, '$BulletNavigatorOptions');
    }

    /**
     * Slider Thumb settings
     */
    protected function createSliderThumb()
    {
        $skin = self::$navSkins[$this->navSkinId];
        //Set default value for thumb positon becauce not all skins need this value
        $this->data['template'] = $skin['template'];
        if ($skin['position'] === 'bottom') {
            $this->data['thumb']['containerWidth'] = $this->sliderWidth;
            $this->data['thumb']['containerHeight'] = $skin['containerHeight'];
            if ($skin['calcSlide']) {
                $this->data['slideHeight'] = $this->data['slideHeight'] - $skin['containerHeight'];
            }
        } elseif ($skin['position'] === 'left') {
            $this->data['thumb']['containerHeight'] = $this->sliderHeight;
            $this->data['thumb']['containerWidth'] = $skin['containerWidth'];
            $this->data['slideWidth'] = $this->data['slideWidth'] - $skin['containerWidth'];
            $this->data['slidePosition'] = ['top' => 0, 'left' => $skin['containerWidth']];
        } elseif ($skin['position'] === 'right') {
            $this->data['thumb']['containerHeight'] = $this->sliderHeight;
            $this->data['thumb']['containerWidth'] = $skin['containerWidth'];
            $this->data['slideWidth'] = $this->data['slideWidth'] - $skin['containerWidth'];
        }

        $skin['s']['$Class'] = '$JssorThumbnailNavigator$';
        $this->mergeSkinSettings($skin, '$ThumbnailNavigatorOptions');
    }

    /**
     * Merge the skin settings from [[arrowSkins]] and [[navSkins]] with [[pluginOptions]]
     * @param $skin array the skin settings array
     * @param $skey string the specific key for this skin
     */
    protected function mergeSkinSettings($skin, $skey)
    {
        if (!empty($skin['p'])) {
            $this->pluginOptions = array_merge($skin['p'], $this->pluginOptions);
        }

        if (isset($this->pluginOptions[$skey])) {
            $this->pluginOptions[$skey] = array_merge($skin['s'], $this->pluginOptions[$skey]);
        } else {
            $this->pluginOptions[$skey] = $skin['s'];
        }
    }

    /**
     * Get all skins or the skins from [[name]] That function can be used to get the configuration
     * and default settings of a skin in another application component. We use it to set default in the Demo Slider.
     * @param $skinId string the skin identifier (eg. 't01')
     * @return array of the sins
     */
    public static function getSkins($skinId = null)
    {
        $allSkins = self::$arrowSkins + self::$navSkins;
        if ($skinId === null) {
            return $allSkins;
        } else {
            if (array_key_exists($skinId, $allSkins)) {
                return $allSkins[$skinId];
            } else {
                throw new InvalidConfigException();
            }
        }
    }

    /**
     * Helper function to convert a position array to a correct style attribute string.
     * @param $positions array the position array
     * @return string
     */
    protected function resolvePosition($positions)
    {
        $str = '';
        foreach ($positions as $pos => $val) {
            $str .= "{$pos}: {$val}px; ";
        }

        return rtrim($str);
    }

}
