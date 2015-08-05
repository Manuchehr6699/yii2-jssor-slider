<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $images array */
/* @var $data array */
?>


<!-- Loading Screen -->
<div u="loading" class="jssor-loader-container">
    <div class="filter"></div>
    <div class="loader-image"></div>
</div>


<!-- Slides Container -->
<div u="slides" style="cursor: move; position: absolute; <?= $data['slidePosition'] ?> width: <?= $data['slideWidth'] ?>px; height: <?= $data['slideHeight'] ?>px; overflow: hidden;">
    <?php foreach ($images as $image): ?>
        <div>
            <?= Html::img([$image['uri']], ['u' => 'image']) ?>
            <?php if ($data['navSkinId'] && $data['navSkinId'][0] === 't'): ?>
                <?= Html:: img(\Yii::$app->image->thumb($image['uri'], 'small'), ['u' => 'thumb']) ?>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>


    <?php if ($data['arrowSkinId']): ?>
        <!--#region Arrow Navigator Skin Begin -->
        <!-- Help: http://www.jssor.com/development/slider-with-arrow-navigator-jquery.html -->
        <!-- Arrow Left -->
        <span u="arrowleft" class="jssor<?= $data['arrowSkinId'] ?>l" style="left: <?= $data['arrow']['left'] ?>px;">
        </span>
        <!-- Arrow Right -->
        <span u="arrowright" class="jssor<?= $data['arrowSkinId'] ?>r" style="right: <?= $data['arrow']['right'] ?>px;">
        </span>
        <!--#endregion Arrow Navigator Skin End -->
    <?php endif; ?>
</div>

<?php if ($data['navSkinId']): ?>
    <?php if ($data['navSkinId'][0] === 't') : ?>
        <!-- thumbnail navigator container -->
        <div u="thumbnavigator" class="jssor<?= $data['navSkinId'] ?>" style="width: <?= $data['thumb']['containerWidth'] ?>px; height: <?= $data['thumb']['containerHeight'] ?>px; ">
            <!-- Thumbnail Item Skin Begin -->
            <?= $this->render('thumb_templates/' . $data['template'], ['data' => $data]) ?>
            <!-- Thumbnail Item Skin End -->
        </div>
        <!--#endregion Thumbnail Navigator Skin End -->
    <?php elseif ($data['navSkinId'][0] === 'b'): ?>
        <!--#region Bullet Navigator Skin Begin -->
        <!-- Help: http://www.jssor.com/development/slider-with-bullet-navigator-jquery.html -->
        <!-- bullet navigator container -->
        <div u="navigator" class="jssor<?= $data['navSkinId'] ?>" style="bottom: 16px; right: 10px;">
            <!-- bullet navigator item prototype -->
            <div u="prototype"></div>
        </div>
        <!--#endregion Bullet Navigator Skin End -->
    <?php endif; ?>
<?php endif; ?>
