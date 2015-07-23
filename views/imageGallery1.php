<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
?>


<!-- Loading Screen -->
<div u="loading" style="position: absolute; top: 0px; left: 0px;">
    <div style="filter: alpha(opacity=70); opacity:0.7; position: absolute; display: block;
         background-color: #000000; top: 0px; left: 0px;width: 100%;height:100%;">
    </div>
    <div style="position: absolute; display: block; background: url(../img/loading.gif) no-repeat center center;
         top: 0px; left: 0px;width: 100%;height:100%;">
    </div>
</div>

<!-- Slides Container -->
<div u="slides" style="cursor: move; position: absolute; left: 250px; top: 0px; width: 600px; height: 450px; overflow: hidden;">
    <?php foreach ($images as $image): ?>
        <div>
            <?= Html::img([$image['uri']], ['u' => 'image']) ?>
            <?= Html:: img(\Yii::$app->image->getThumb($image['uri'], 'small'), ['u' => 'thumb']) ?>
        </div>
    <?php endforeach; ?>
</div>

<!-- Thumbnail Navigator Skin 02 Begin -->
<div u="thumbnavigator" class="jssort02" style="position: absolute; width: 250px; height: 450px; left:0px; bottom: 0px;">
    <!-- Thumbnail Item Skin Begin -->
    <div u="slides" style="cursor: move;">
        <div u="prototype" class="p" style="position: absolute; width: 99px; height: 66px; top: 0; left: 0;">
            <div class=w><thumbnailtemplate style=" width: 100%; height: 100%; border: none;position:absolute; top: 0; left: 0;"></thumbnailtemplate></div>
            <div class=c>
            </div>
        </div>
    </div>
    <!-- Thumbnail Item Skin End -->
</div>
<!-- Thumbnail Navigator Skin End -->
