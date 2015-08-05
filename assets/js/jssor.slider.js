/// <reference path="Jssor.js" />

/*
* Jssor.Slider 19.0
* http://www.jssor.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
* 
* TERMS OF USE - Jssor.Slider
* 
* Copyright 2014 Jssor
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var $JssorSlideshowFormations$ = window.$JssorSlideshowFormations$ = new function () {
    var _This = this;

    //Constants +++++++

    var COLUMN_INCREASE = 0;
    var COLUMN_DECREASE = 1;
    var ROW_INCREASE = 2;
    var ROW_DECREASE = 3;

    var DIRECTION_HORIZONTAL = 0x0003;
    var DIRECTION_VERTICAL = 0x000C;

    var TO_LEFT = 0x0001;
    var TO_RIGHT = 0x0002;
    var TO_TOP = 0x0004;
    var TO_BOTTOM = 0x0008;

    var FROM_LEFT = 0x0100;
    var FROM_TOP = 0x0200;
    var FROM_RIGHT = 0x0400;
    var FROM_BOTTOM = 0x0800;

    var ASSEMBLY_BOTTOM_LEFT = FROM_BOTTOM + TO_LEFT;
    var ASSEMBLY_BOTTOM_RIGHT = FROM_BOTTOM + TO_RIGHT;
    var ASSEMBLY_TOP_LEFT = FROM_TOP + TO_LEFT;
    var ASSEMBLY_TOP_RIGHT = FROM_TOP + TO_RIGHT;
    var ASSEMBLY_LEFT_TOP = FROM_LEFT + TO_TOP;
    var ASSEMBLY_LEFT_BOTTOM = FROM_LEFT + TO_BOTTOM;
    var ASSEMBLY_RIGHT_TOP = FROM_RIGHT + TO_TOP;
    var ASSEMBLY_RIGHT_BOTTOM = FROM_RIGHT + TO_BOTTOM;

    //Constants -------

    //Formation Definition +++++++
    function isToLeft(roadValue) {
        return (roadValue & TO_LEFT) == TO_LEFT;
    }

    function isToRight(roadValue) {
        return (roadValue & TO_RIGHT) == TO_RIGHT;
    }

    function isToTop(roadValue) {
        return (roadValue & TO_TOP) == TO_TOP;
    }

    function isToBottom(roadValue) {
        return (roadValue & TO_BOTTOM) == TO_BOTTOM;
    }

    function PushFormationOrder(arr, order, formationItem) {
        formationItem.push(order);
        arr[order] = arr[order] || [];
        arr[order].push(formationItem);
    }

    _This.$FormationStraight = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var order;
        for (r = 0; r < rows; r++) {
            for (col = 0; col < cols; col++) {
                cr = r + ',' + col;
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                        order = il - (col * rows + (rl - r));
                        break;
                    case ASSEMBLY_RIGHT_TOP:
                        order = il - (r * cols + (cl - col));
                        break;
                    case ASSEMBLY_TOP_LEFT:
                        order = il - (col * rows + r);
                    case ASSEMBLY_LEFT_TOP:
                        order = il - (r * cols + col);
                        break;
                    case ASSEMBLY_BOTTOM_RIGHT:
                        order = col * rows + r;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                        order = r * cols + (cl - col);
                        break;
                    case ASSEMBLY_TOP_RIGHT:
                        order = col * rows + (rl - r);
                        break;
                    default:
                        order = r * cols + col;
                        break; //ASSEMBLY_RIGHT_BOTTOM
                }
                PushFormationOrder(a, order, [r, col]);
            }
        }

        return a;
    };

    _This.$FormationSwirl = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var hit = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && !hit[cr]) {
                //a[cr] = i++;
                hit[cr] = true;
                PushFormationOrder(a, i++, [r, col]);
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
            }

            switch (courses[course % courses.length]) {
                case COLUMN_INCREASE:
                    col++;
                    break;
                case ROW_INCREASE:
                    r++;
                    break;
                case COLUMN_DECREASE:
                    col--;
                    break;
                case ROW_DECREASE:
                    r--;
                    break;
            }
        }
        return a;
    };

    _This.$FormationZigZag = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_INCREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && typeof (a[cr]) == 'undefined') {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
                switch (courses[course % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
        }
        return a;
    };

    _This.$FormationStraightStairs = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
            case ASSEMBLY_TOP_RIGHT:
            case ASSEMBLY_TOP_LEFT:
            case ASSEMBLY_BOTTOM_RIGHT:
                var C = 0;
                var R = 0;
                break;
            case ASSEMBLY_LEFT_BOTTOM:
            case ASSEMBLY_RIGHT_TOP:
            case ASSEMBLY_LEFT_TOP:
            case ASSEMBLY_RIGHT_BOTTOM:
                var C = cl;
                var R = 0;
                break;
            default:
                formationDirection = ASSEMBLY_RIGHT_BOTTOM;
                var C = cl;
                var R = 0;
                break;
        }
        col = C;
        r = R;
        while (i < count) {
            cr = r + ',' + col;
            if (isToTop(formationDirection) || isToRight(formationDirection)) {
                PushFormationOrder(a, il - i++, [r, col]);
                //a[cr] = il - i++;
            }
            else {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
            }
            switch (formationDirection) {
                case ASSEMBLY_BOTTOM_LEFT:
                case ASSEMBLY_TOP_RIGHT:
                    col--;
                    r++;
                    break;
                case ASSEMBLY_TOP_LEFT:
                case ASSEMBLY_BOTTOM_RIGHT:
                    col++;
                    r--;
                    break;
                case ASSEMBLY_LEFT_BOTTOM:
                case ASSEMBLY_RIGHT_TOP:
                    col--;
                    r--;
                    break;
                case ASSEMBLY_RIGHT_BOTTOM:
                case ASSEMBLY_LEFT_TOP:
                default:
                    col++;
                    r++;
                    break;
            }
            if (col < 0 || r < 0 || col > cl || r > rl) {
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                    case ASSEMBLY_TOP_RIGHT:
                        C++;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                    case ASSEMBLY_RIGHT_TOP:
                    case ASSEMBLY_TOP_LEFT:
                    case ASSEMBLY_BOTTOM_RIGHT:
                        R++;
                        break;
                    case ASSEMBLY_RIGHT_BOTTOM:
                    case ASSEMBLY_LEFT_TOP:
                    default:
                        C--;
                        break;
                }
                if (C < 0 || R < 0 || C > cl || R > rl) {
                    switch (formationDirection) {
                        case ASSEMBLY_BOTTOM_LEFT:
                        case ASSEMBLY_TOP_RIGHT:
                            C = cl;
                            R++;
                            break;
                        case ASSEMBLY_TOP_LEFT:
                        case ASSEMBLY_BOTTOM_RIGHT:
                            R = rl;
                            C++;
                            break;
                        case ASSEMBLY_LEFT_BOTTOM:
                        case ASSEMBLY_RIGHT_TOP: R = rl; C--;
                            break;
                        case ASSEMBLY_RIGHT_BOTTOM:
                        case ASSEMBLY_LEFT_TOP:
                        default:
                            C = 0;
                            R++;
                            break;
                    }
                    if (R > rl)
                        R = rl;
                    else if (R < 0)
                        R = 0;
                    else if (C > cl)
                        C = cl;
                    else if (C < 0)
                        C = 0;
                }
                r = R;
                col = C;
            }
        }
        return a;
    };

    _This.$FormationSquare = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var dc;
        var dr;
        var cr;
        dc = cols < rows ? (rows - cols) / 2 : 0;
        dr = cols > rows ? (cols - rows) / 2 : 0;
        cr = Math.round(Math.max(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1 + dc, r + 1 + dr, cols - col + dc, rows - r + dr), [r, col]);
        }
        return arr;
    };

    _This.$FormationRectangle = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var cr;
        cr = Math.round(Math.min(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1, r + 1, cols - col, rows - r), [r, col]);
        }
        return arr;
    };

    _This.$FormationRandom = function (transition) {
        var a = [];
        var r, col, i;
        for (r = 0; r < transition.$Rows; r++) {
            for (col = 0; col < transition.$Cols; col++)
                PushFormationOrder(a, Math.ceil(100000 * Math.random()) % 13, [r, col]);
        }

        return a;
    };

    _This.$FormationCircle = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.sqrt(Math.pow(col - hc, 2) + Math.pow(r - hr, 2))), [r, col]);
        }
        return arr;
    };

    _This.$FormationCross = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.min(Math.abs(col - hc), Math.abs(r - hr))), [r, col]);
        }
        return arr;
    };

    _This.$FormationRectangleCross = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        var cr = Math.max(hc, hr) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(cr - Math.max(hc - Math.abs(col - hc), hr - Math.abs(r - hr))) - 1, [r, col]);
        }
        return arr;
    };
};

var $JssorSlideshowRunner$ = window.$JssorSlideshowRunner$ = function (slideContainer, slideContainerWidth, slideContainerHeight, slideshowOptions, isTouchDevice) {

    var _SelfSlideshowRunner = this;

    //var _State = 0; //-1 fullfill, 0 clean, 1 initializing, 2 stay, 3 playing
    var _EndTime;

    var _SliderFrameCount;

    var _SlideshowPlayerBelow;
    var _SlideshowPlayerAbove;

    var _PrevItem;
    var _SlideItem;

    var _TransitionIndex = 0;
    var _TransitionsOrder = slideshowOptions.$TransitionsOrder;

    var _SlideshowTransition;

    var _SlideshowPerformance = 8;

    //#region Private Methods
    function EnsureTransitionInstance(options, slideshowInterval) {

        var slideshowTransition = {
            $Interval: slideshowInterval,  //Delay to play next frame
            $Duration: 1, //Duration to finish the entire transition
            $Delay: 0,  //Delay to assembly blocks
            $Cols: 1,   //Number of columns
            $Rows: 1,   //Number of rows
            $Opacity: 0,   //Fade block or not
            $Zoom: 0,   //Zoom block or not
            $Clip: 0,   //Clip block or not
            $Move: false,   //Move block or not
            $SlideOut: false,   //Slide the previous slide out to display next slide instead
            //$FlyDirection: 0,   //Specify fly transform with direction
            $Reverse: false,    //Reverse the assembly or not
            $Formation: $JssorSlideshowFormations$.$FormationRandom,    //Shape that assembly blocks as
            $Assembly: 0x0408,   //The way to assembly blocks ASSEMBLY_RIGHT_BOTTOM
            $ChessMode: { $Column: 0, $Row: 0 },    //Chess move or fly direction
            $Easing: $JssorEasing$.$EaseSwing,  //Specify variation of speed during transition
            $Round: {},
            $Blocks: [],
            $During: {}
        };

        $Jssor$.$Extend(slideshowTransition, options);

        slideshowTransition.$Count = slideshowTransition.$Cols * slideshowTransition.$Rows;
        if ($Jssor$.$IsFunction(slideshowTransition.$Easing))
            slideshowTransition.$Easing = { $Default: slideshowTransition.$Easing };

        slideshowTransition.$FramesCount = Math.ceil(slideshowTransition.$Duration / slideshowTransition.$Interval);

        slideshowTransition.$GetBlocks = function (width, height) {
            width /= slideshowTransition.$Cols;
            height /= slideshowTransition.$Rows;
            var wh = width + 'x' + height;
            if (!slideshowTransition.$Blocks[wh]) {
                slideshowTransition.$Blocks[wh] = { $Width: width, $Height: height };
                for (var col = 0; col < slideshowTransition.$Cols; col++) {
                    for (var r = 0; r < slideshowTransition.$Rows; r++)
                        slideshowTransition.$Blocks[wh][r + ',' + col] = { $Top: r * height, $Right: col * width + width, $Bottom: r * height + height, $Left: col * width };
                }
            }

            return slideshowTransition.$Blocks[wh];
        };

        if (slideshowTransition.$Brother) {
            slideshowTransition.$Brother = EnsureTransitionInstance(slideshowTransition.$Brother, slideshowInterval);
            slideshowTransition.$SlideOut = true;
        }

        return slideshowTransition;
    }
    //#endregion

    //#region Private Classes
    function JssorSlideshowPlayer(slideContainer, slideElement, slideTransition, beginTime, slideContainerWidth, slideContainerHeight) {
        var _Self = this;

        var _Block;
        var _StartStylesArr = {};
        var _AnimationStylesArrs = {};
        var _AnimationBlockItems = [];
        var _StyleStart;
        var _StyleEnd;
        var _StyleDif;
        var _ChessModeColumn = slideTransition.$ChessMode.$Column || 0;
        var _ChessModeRow = slideTransition.$ChessMode.$Row || 0;

        var _Blocks = slideTransition.$GetBlocks(slideContainerWidth, slideContainerHeight);
        var _FormationInstance = GetFormation(slideTransition);
        var _MaxOrder = _FormationInstance.length - 1;
        var _Period = slideTransition.$Duration + slideTransition.$Delay * _MaxOrder;
        var _EndTime = beginTime + _Period;

        var _SlideOut = slideTransition.$SlideOut;
        var _IsIn;

        //_EndTime += $Jssor$.$IsBrowserChrome() ? 260 : 50;
        _EndTime += 50;

        //#region Private Methods

        function GetFormation(transition) {

            var formationInstance = transition.$Formation(transition);

            return transition.$Reverse ? formationInstance.reverse() : formationInstance;

        }
        //#endregion

        _Self.$EndTime = _EndTime;

        _Self.$ShowFrame = function (time) {
            time -= beginTime;

            var isIn = time < _Period;

            if (isIn || _IsIn) {
                _IsIn = isIn;

                if (!_SlideOut)
                    time = _Period - time;

                var frameIndex = Math.ceil(time / slideTransition.$Interval);

                $Jssor$.$Each(_AnimationStylesArrs, function (value, index) {

                    var itemFrameIndex = Math.max(frameIndex, value.$Min);
                    itemFrameIndex = Math.min(itemFrameIndex, value.length - 1);

                    if (value.$LastFrameIndex != itemFrameIndex) {
                        if (!value.$LastFrameIndex && !_SlideOut) {
                            $Jssor$.$ShowElement(_AnimationBlockItems[index]);
                        }
                        else if (itemFrameIndex == value.$Max && _SlideOut) {
                            $Jssor$.$HideElement(_AnimationBlockItems[index]);
                        }
                        value.$LastFrameIndex = itemFrameIndex;
                        $Jssor$.$SetStylesEx(_AnimationBlockItems[index], value[itemFrameIndex]);
                    }
                });
            }
        };

        //constructor
        {
            slideElement = $Jssor$.$CloneNode(slideElement);
            //$Jssor$.$RemoveAttribute(slideElement, "id");
            if ($Jssor$.$IsBrowserIe9Earlier()) {
                var hasImage = !slideElement["no-image"];
                var slideChildElements = $Jssor$.$FindChildrenByTag(slideElement);
                $Jssor$.$Each(slideChildElements, function (slideChildElement) {
                    if (hasImage || slideChildElement["jssor-slider"])
                        $Jssor$.$CssOpacity(slideChildElement, $Jssor$.$CssOpacity(slideChildElement), true);
                });
            }

            $Jssor$.$Each(_FormationInstance, function (formationItems, order) {
                $Jssor$.$Each(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];
                    {
                        var columnRow = row + ',' + col;

                        var chessHorizontal = false;
                        var chessVertical = false;
                        var chessRotate = false;

                        if (_ChessModeColumn && col % 2) {
                            if (_ChessModeColumn & 3/*$JssorDirection$.$IsHorizontal(_ChessModeColumn)*/) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if (_ChessModeColumn & 12/*$JssorDirection$.$IsVertical(_ChessModeColumn)*/) {
                                chessVertical = !chessVertical;
                            }

                            if (_ChessModeColumn & 16)
                                chessRotate = !chessRotate;
                        }

                        if (_ChessModeRow && row % 2) {
                            if (_ChessModeRow & 3/*$JssorDirection$.$IsHorizontal(_ChessModeRow)*/) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if (_ChessModeRow & 12/*$JssorDirection$.$IsVertical(_ChessModeRow)*/) {
                                chessVertical = !chessVertical;
                            }
                            if (_ChessModeRow & 16)
                                chessRotate = !chessRotate;
                        }

                        slideTransition.$Top = slideTransition.$Top || (slideTransition.$Clip & 4);
                        slideTransition.$Bottom = slideTransition.$Bottom || (slideTransition.$Clip & 8);
                        slideTransition.$Left = slideTransition.$Left || (slideTransition.$Clip & 1);
                        slideTransition.$Right = slideTransition.$Right || (slideTransition.$Clip & 2);

                        var topBenchmark = chessVertical ? slideTransition.$Bottom : slideTransition.$Top;
                        var bottomBenchmark = chessVertical ? slideTransition.$Top : slideTransition.$Bottom;
                        var leftBenchmark = chessHorizontal ? slideTransition.$Right : slideTransition.$Left;
                        var rightBenchmark = chessHorizontal ? slideTransition.$Left : slideTransition.$Right;

                        slideTransition.$Clip = topBenchmark || bottomBenchmark || leftBenchmark || rightBenchmark;

                        _StyleDif = {};
                        _StyleEnd = { $Top: 0, $Left: 0, $Opacity: 1, $Width: slideContainerWidth, $Height: slideContainerHeight };
                        _StyleStart = $Jssor$.$Extend({}, _StyleEnd);
                        _Block = $Jssor$.$Extend({}, _Blocks[columnRow]);

                        if (slideTransition.$Opacity) {
                            _StyleEnd.$Opacity = 2 - slideTransition.$Opacity;
                        }

                        if (slideTransition.$ZIndex) {
                            _StyleEnd.$ZIndex = slideTransition.$ZIndex;
                            _StyleStart.$ZIndex = 0;
                        }

                        var allowClip = slideTransition.$Cols * slideTransition.$Rows > 1 || slideTransition.$Clip;

                        if (slideTransition.$Zoom || slideTransition.$Rotate) {
                            var allowRotate = true;
                            if ($Jssor$.$IsBrowserIe9Earlier()) {
                                if (slideTransition.$Cols * slideTransition.$Rows > 1)
                                    allowRotate = false;
                                else
                                    allowClip = false;
                            }

                            if (allowRotate) {
                                _StyleEnd.$Zoom = slideTransition.$Zoom ? slideTransition.$Zoom - 1 : 1;
                                _StyleStart.$Zoom = 1;

                                if ($Jssor$.$IsBrowserIe9Earlier() || $Jssor$.$IsBrowserOpera())
                                    _StyleEnd.$Zoom = Math.min(_StyleEnd.$Zoom, 2);

                                var rotate = slideTransition.$Rotate;

                                _StyleEnd.$Rotate = rotate * 360 * ((chessRotate) ? -1 : 1);
                                _StyleStart.$Rotate = 0;
                            }
                        }

                        if (allowClip) {
                            if (slideTransition.$Clip) {
                                var clipScale = slideTransition.$ScaleClip || 1;
                                var blockOffset = _Block.$Offset = {};
                                if (topBenchmark && bottomBenchmark) {
                                    blockOffset.$Top = _Blocks.$Height / 2 * clipScale;
                                    blockOffset.$Bottom = -blockOffset.$Top;
                                }
                                else if (topBenchmark) {
                                    blockOffset.$Bottom = -_Blocks.$Height * clipScale;
                                }
                                else if (bottomBenchmark) {
                                    blockOffset.$Top = _Blocks.$Height * clipScale;
                                }

                                if (leftBenchmark && rightBenchmark) {
                                    blockOffset.$Left = _Blocks.$Width / 2 * clipScale;
                                    blockOffset.$Right = -blockOffset.$Left;
                                }
                                else if (leftBenchmark) {
                                    blockOffset.$Right = -_Blocks.$Width * clipScale;
                                }
                                else if (rightBenchmark) {
                                    blockOffset.$Left = _Blocks.$Width * clipScale;
                                }
                            }

                            _StyleDif.$Clip = _Block;
                            _StyleStart.$Clip = _Blocks[columnRow];
                        }

                        //fly
                        {
                            var chessHor = chessHorizontal ? 1 : -1;
                            var chessVer = chessVertical ? 1 : -1;

                            if (slideTransition.x)
                                _StyleEnd.$Left += slideContainerWidth * slideTransition.x * chessHor;

                            if (slideTransition.y)
                                _StyleEnd.$Top += slideContainerHeight * slideTransition.y * chessVer;
                        }

                        $Jssor$.$Each(_StyleEnd, function (propertyEnd, property) {
                            if ($Jssor$.$IsNumeric(propertyEnd)) {
                                if (propertyEnd != _StyleStart[property]) {
                                    _StyleDif[property] = propertyEnd - _StyleStart[property];
                                }
                            }
                        });

                        _StartStylesArr[columnRow] = _SlideOut ? _StyleStart : _StyleEnd;

                        var animationStylesArr = [];
                        var framesCount = slideTransition.$FramesCount;
                        var virtualFrameCount = Math.round(order * slideTransition.$Delay / slideTransition.$Interval);
                        _AnimationStylesArrs[columnRow] = new Array(virtualFrameCount);
                        _AnimationStylesArrs[columnRow].$Min = virtualFrameCount;
                        _AnimationStylesArrs[columnRow].$Max = virtualFrameCount + framesCount - 1;

                        for (var frameN = 0; frameN <= framesCount; frameN++) {
                            var styleFrameN = $Jssor$.$Cast(_StyleStart, _StyleDif, frameN / framesCount, slideTransition.$Easing, slideTransition.$During, slideTransition.$Round, { $Move: slideTransition.$Move, $OriginalWidth: slideContainerWidth, $OriginalHeight: slideContainerHeight })

                            styleFrameN.$ZIndex = styleFrameN.$ZIndex || 1;

                            _AnimationStylesArrs[columnRow].push(styleFrameN);
                        }

                    } //for
                });
            });

            _FormationInstance.reverse();
            $Jssor$.$Each(_FormationInstance, function (formationItems) {
                $Jssor$.$Each(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];

                    var columnRow = row + ',' + col;

                    var image = slideElement;
                    if (col || row)
                        image = $Jssor$.$CloneNode(slideElement);

                    $Jssor$.$SetStyles(image, _StartStylesArr[columnRow]);
                    $Jssor$.$CssOverflow(image, "hidden");

                    $Jssor$.$CssPosition(image, "absolute");
                    slideContainer.$AddClipElement(image);
                    _AnimationBlockItems[columnRow] = image;
                    $Jssor$.$ShowElement(image, !_SlideOut);
                });
            });
        }
    }

    function SlideshowProcessor() {
        var _SelfSlideshowProcessor = this;
        var _CurrentTime = 0;

        $JssorAnimator$.call(_SelfSlideshowProcessor, 0, _EndTime);

        _SelfSlideshowProcessor.$OnPositionChange = function (oldPosition, newPosition) {
            if ((newPosition - _CurrentTime) > _SlideshowPerformance) {
                _CurrentTime = newPosition;

                _SlideshowPlayerAbove && _SlideshowPlayerAbove.$ShowFrame(newPosition);
                _SlideshowPlayerBelow && _SlideshowPlayerBelow.$ShowFrame(newPosition);
            }
        };

        _SelfSlideshowProcessor.$Transition = _SlideshowTransition;
    }
    //#endregion

    //member functions
    _SelfSlideshowRunner.$GetTransition = function (slideCount) {
        var n = 0;

        var transitions = slideshowOptions.$Transitions;

        var transitionCount = transitions.length;

        if (_TransitionsOrder) { /*Sequence*/
            //if (transitionCount > slideCount && ($Jssor$.$IsBrowserChrome() || $Jssor$.$IsBrowserSafari() || $Jssor$.$IsBrowserFireFox())) {
            //    transitionCount -= transitionCount % slideCount;
            //}
            n = _TransitionIndex++ % transitionCount;
        }
        else { /*Random*/
            n = Math.floor(Math.random() * transitionCount);
        }

        transitions[n] && (transitions[n].$Index = n);

        return transitions[n];
    };

    _SelfSlideshowRunner.$Initialize = function (slideIndex, prevIndex, slideItem, prevItem, slideshowTransition) {
        $JssorDebug$.$Execute(function () {
            if (_SlideshowPlayerBelow) {
                $JssorDebug$.$Fail("slideshow runner has not been cleared.");
            }
        });

        _SlideshowTransition = slideshowTransition;

        slideshowTransition = EnsureTransitionInstance(slideshowTransition, _SlideshowPerformance);

        _SlideItem = slideItem;
        _PrevItem = prevItem;

        var prevSlideElement = prevItem.$Item;
        var currentSlideElement = slideItem.$Item;
        prevSlideElement["no-image"] = !prevItem.$Image;
        currentSlideElement["no-image"] = !slideItem.$Image;

        var slideElementAbove = prevSlideElement;
        var slideElementBelow = currentSlideElement;

        var slideTransitionAbove = slideshowTransition;
        var slideTransitionBelow = slideshowTransition.$Brother || EnsureTransitionInstance({}, _SlideshowPerformance);

        if (!slideshowTransition.$SlideOut) {
            slideElementAbove = currentSlideElement;
            slideElementBelow = prevSlideElement;
        }

        var shift = slideTransitionBelow.$Shift || 0;

        _SlideshowPlayerBelow = new JssorSlideshowPlayer(slideContainer, slideElementBelow, slideTransitionBelow, Math.max(shift - slideTransitionBelow.$Interval, 0), slideContainerWidth, slideContainerHeight);
        _SlideshowPlayerAbove = new JssorSlideshowPlayer(slideContainer, slideElementAbove, slideTransitionAbove, Math.max(slideTransitionBelow.$Interval - shift, 0), slideContainerWidth, slideContainerHeight);

        _SlideshowPlayerBelow.$ShowFrame(0);
        _SlideshowPlayerAbove.$ShowFrame(0);

        _EndTime = Math.max(_SlideshowPlayerBelow.$EndTime, _SlideshowPlayerAbove.$EndTime);

        _SelfSlideshowRunner.$Index = slideIndex;
    };

    _SelfSlideshowRunner.$Clear = function () {
        slideContainer.$Clear();
        _SlideshowPlayerBelow = null;
        _SlideshowPlayerAbove = null;
    };

    _SelfSlideshowRunner.$GetProcessor = function () {
        var slideshowProcessor = null;

        if (_SlideshowPlayerAbove)
            slideshowProcessor = new SlideshowProcessor();

        return slideshowProcessor;
    };

    //Constructor
    {
        if ($Jssor$.$IsBrowserIe9Earlier() || $Jssor$.$IsBrowserOpera() || (isTouchDevice && $Jssor$.$WebKitVersion() < 537)) {
            _SlideshowPerformance = 16;
        }

        $JssorObject$.call(_SelfSlideshowRunner);
        $JssorAnimator$.call(_SelfSlideshowRunner, -10000000, 10000000);
    }
};

var $JssorSlider$ = window.$JssorSlider$ = function (elmt, options) {
    var _SelfSlider = this;

    //#region Private Classes
    //Conveyor
    function Conveyor() {
        var _SelfConveyor = this;
        $JssorAnimator$.call(_SelfConveyor, -100000000, 200000000);

        _SelfConveyor.$GetCurrentSlideInfo = function () {
            var positionDisplay = _SelfConveyor.$GetPosition_Display();
            var virtualIndex = Math.floor(positionDisplay);
            var slideIndex = GetRealIndex(virtualIndex);
            var slidePosition = positionDisplay - Math.floor(positionDisplay);

            return { $Index: slideIndex, $VirtualIndex: virtualIndex, $Position: slidePosition };
        };

        _SelfConveyor.$OnPositionChange = function (oldPosition, newPosition) {

            var index = Math.floor(newPosition);
            if (index != newPosition && newPosition > oldPosition)
                index++;

            ResetNavigator(index, true);

            _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_POSITION_CHANGE, GetRealIndex(newPosition), GetRealIndex(oldPosition), newPosition, oldPosition);
        };
    }
    //Conveyor

    //Carousel
    function Carousel() {
        var _SelfCarousel = this;

        $JssorAnimator$.call(_SelfCarousel, 0, 0, { $LoopLength: _SlideCount });

        //Carousel Constructor
        {
            $Jssor$.$Each(_SlideItems, function (slideItem) {
                (_Loop & 1) && slideItem.$SetLoopLength(_SlideCount);
                _SelfCarousel.$Chain(slideItem);
                slideItem.$Shift(_ParkingPosition / _StepLength);
            });
        }
    }
    //Carousel

    //Slideshow
    function Slideshow() {
        var _SelfSlideshow = this;
        var _Wrapper = _SlideContainer.$Elmt;

        $JssorAnimator$.call(_SelfSlideshow, -1, 2, { $Easing: $JssorEasing$.$EaseLinear, $Setter: { $Position: SetPosition }, $LoopLength: _SlideCount }, _Wrapper, { $Position: 1 }, { $Position: -2 });

        _SelfSlideshow.$Wrapper = _Wrapper;

        //Slideshow Constructor
        {
            $JssorDebug$.$Execute(function () {
                $Jssor$.$Attribute(_SlideContainer.$Elmt, "debug-id", "slide_container");
            });
        }
    }
    //Slideshow

    //CarouselPlayer
    function CarouselPlayer(carousel, slideshow) {
        var _SelfCarouselPlayer = this;
        var _FromPosition;
        var _ToPosition;
        var _Duration;
        var _StandBy;
        var _StandByPosition;

        $JssorAnimator$.call(_SelfCarouselPlayer, -100000000, 200000000, { $IntervalMax: 100 });

        _SelfCarouselPlayer.$OnStart = function () {
            _IsSliding = true;
            _LoadingTicket = null;

            //EVT_SWIPE_START
            _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_SWIPE_START, GetRealIndex(_Conveyor.$GetPosition()), _Conveyor.$GetPosition());
        };

        _SelfCarouselPlayer.$OnStop = function () {

            _IsSliding = false;
            _StandBy = false;

            var currentSlideInfo = _Conveyor.$GetCurrentSlideInfo();

            //EVT_SWIPE_END
            _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_SWIPE_END, GetRealIndex(_Conveyor.$GetPosition()), _Conveyor.$GetPosition());

            if (!currentSlideInfo.$Position) {
                OnPark(currentSlideInfo.$VirtualIndex, _CurrentSlideIndex);
            }
        };

        _SelfCarouselPlayer.$OnPositionChange = function (oldPosition, newPosition) {

            var toPosition;

            if (_StandBy)
                toPosition = _StandByPosition;
            else {
                toPosition = _ToPosition;

                if (_Duration) {
                    var interPosition = newPosition / _Duration;
                    toPosition = _Options.$SlideEasing(interPosition) * (_ToPosition - _FromPosition) + _FromPosition;
                }
            }

            _Conveyor.$GoToPosition(toPosition);
        };

        _SelfCarouselPlayer.$PlayCarousel = function (fromPosition, toPosition, duration, callback) {
            $JssorDebug$.$Execute(function () {
                if (_SelfCarouselPlayer.$IsPlaying())
                    $JssorDebug$.$Fail("The carousel is already playing.");
            });

            _FromPosition = fromPosition;
            _ToPosition = toPosition;
            _Duration = duration;

            _Conveyor.$GoToPosition(fromPosition);
            _SelfCarouselPlayer.$GoToPosition(0);

            _SelfCarouselPlayer.$PlayToPosition(duration, callback);
        };

        _SelfCarouselPlayer.$StandBy = function (standByPosition) {
            _StandBy = true;
            _StandByPosition = standByPosition;
            _SelfCarouselPlayer.$Play(standByPosition, null, true);
        };

        _SelfCarouselPlayer.$SetStandByPosition = function (standByPosition) {
            _StandByPosition = standByPosition;
        };

        _SelfCarouselPlayer.$MoveCarouselTo = function (position) {
            _Conveyor.$GoToPosition(position);
        };

        //CarouselPlayer Constructor
        {
            _Conveyor = new Conveyor();

            _Conveyor.$Combine(carousel);
            _Conveyor.$Combine(slideshow);
        }
    }
    //CarouselPlayer

    //SlideContainer
    function SlideContainer() {
        var _Self = this;
        var elmt = CreatePanel();

        $Jssor$.$CssZIndex(elmt, 0);
        $Jssor$.$Css(elmt, "pointerEvents", "none");

        _Self.$Elmt = elmt;

        _Self.$AddClipElement = function (clipElement) {
            $Jssor$.$AppendChild(elmt, clipElement);
            $Jssor$.$ShowElement(elmt);
        };

        _Self.$Clear = function () {
            $Jssor$.$HideElement(elmt);
            $Jssor$.$Empty(elmt);
        };
    }
    //SlideContainer

    //SlideItem
    function SlideItem(slideElmt, slideIndex) {

        var _SelfSlideItem = this;

        var _CaptionSliderIn;
        var _CaptionSliderOut;
        var _CaptionSliderCurrent;
        var _IsCaptionSliderPlayingWhenDragStart;

        var _Wrapper;
        var _BaseElement = slideElmt;

        var _LoadingScreen;

        var _ImageItem;
        var _ImageElmts = [];
        var _LinkItemOrigin;
        var _LinkItem;
        var _ImageLoading;
        var _ImageLoaded;
        var _ImageLazyLoading;
        var _ContentRefreshed;

        var _Processor;

        var _PlayerInstanceElement;
        var _PlayerInstance;

        var _SequenceNumber;    //for debug only

        $JssorAnimator$.call(_SelfSlideItem, -_DisplayPieces, _DisplayPieces + 1, { $SlideItemAnimator: true });

        function ResetCaptionSlider(fresh) {
            _CaptionSliderOut && _CaptionSliderOut.$Revert();
            _CaptionSliderIn && _CaptionSliderIn.$Revert();

            RefreshContent(slideElmt, fresh);
            _ContentRefreshed = true;

            _CaptionSliderIn = new _CaptionSliderOptions.$Class(slideElmt, _CaptionSliderOptions, 1);
            $JssorDebug$.$LiveStamp(_CaptionSliderIn, "caption_slider_" + _CaptionSliderCount + "_in");
            _CaptionSliderOut = new _CaptionSliderOptions.$Class(slideElmt, _CaptionSliderOptions);
            $JssorDebug$.$LiveStamp(_CaptionSliderOut, "caption_slider_" + _CaptionSliderCount + "_out");

            $JssorDebug$.$Execute(function () {
                _CaptionSliderCount++;
            });

            _CaptionSliderOut.$GoToPosition(0);
            _CaptionSliderIn.$GoToPosition(0);
        }

        function EnsureCaptionSliderVersion() {
            if (_CaptionSliderIn.$Version < _CaptionSliderOptions.$Version) {
                ResetCaptionSlider();
            }
        }

        //event handling begin
        function LoadImageCompleteEventHandler(completeCallback, loadingScreen, image) {
            if (!_ImageLoaded) {
                _ImageLoaded = true;

                if (_ImageItem && image) {
                    var imageWidth = image.width;
                    var imageHeight = image.height;
                    var fillWidth = imageWidth;
                    var fillHeight = imageHeight;

                    if (imageWidth && imageHeight && _Options.$FillMode) {

                        //0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
                        if (_Options.$FillMode & 3 && (!(_Options.$FillMode & 4) || imageWidth > _SlideWidth || imageHeight > _SlideHeight)) {
                            var fitHeight = false;
                            var ratio = _SlideWidth / _SlideHeight * imageHeight / imageWidth;

                            if (_Options.$FillMode & 1) {
                                fitHeight = (ratio > 1);
                            }
                            else if (_Options.$FillMode & 2) {
                                fitHeight = (ratio < 1);
                            }
                            fillWidth = fitHeight ? imageWidth * _SlideHeight / imageHeight : _SlideWidth;
                            fillHeight = fitHeight ? _SlideHeight : imageHeight * _SlideWidth / imageWidth;
                        }

                        $Jssor$.$CssWidth(_ImageItem, fillWidth);
                        $Jssor$.$CssHeight(_ImageItem, fillHeight);
                        $Jssor$.$CssTop(_ImageItem, (_SlideHeight - fillHeight) / 2);
                        $Jssor$.$CssLeft(_ImageItem, (_SlideWidth - fillWidth) / 2);
                    }

                    $Jssor$.$CssPosition(_ImageItem, "absolute");

                    _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_LOAD_END, slideIndex);
                }
            }

            $Jssor$.$HideElement(loadingScreen);
            completeCallback && completeCallback(_SelfSlideItem);
        }

        function LoadSlideshowImageCompleteEventHandler(nextIndex, nextItem, slideshowTransition, loadingTicket) {
            if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex && _AutoPlay) {
                if (!_Frozen) {
                    var nextRealIndex = GetRealIndex(nextIndex);
                    _SlideshowRunner.$Initialize(nextRealIndex, slideIndex, nextItem, _SelfSlideItem, slideshowTransition);
                    nextItem.$HideContentForSlideshow();
                    _Slideshow.$Locate(nextRealIndex, 1);
                    _Slideshow.$GoToPosition(nextRealIndex);
                    _CarouselPlayer.$PlayCarousel(nextIndex, nextIndex, 0);
                }
            }
        }

        function SlideReadyEventHandler(loadingTicket) {
            if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex) {

                if (!_Processor) {
                    var slideshowProcessor = null;
                    if (_SlideshowRunner) {
                        if (_SlideshowRunner.$Index == slideIndex)
                            slideshowProcessor = _SlideshowRunner.$GetProcessor();
                        else
                            _SlideshowRunner.$Clear();
                    }

                    EnsureCaptionSliderVersion();

                    _Processor = new Processor(slideElmt, slideIndex, slideshowProcessor, _SelfSlideItem.$GetCaptionSliderIn(), _SelfSlideItem.$GetCaptionSliderOut());
                    _Processor.$SetPlayer(_PlayerInstance);
                }

                !_Processor.$IsPlaying() && _Processor.$Replay();
            }
        }

        function ParkEventHandler(currentIndex, previousIndex, manualActivate) {
            if (currentIndex == slideIndex) {

                if (currentIndex != previousIndex)
                    _SlideItems[previousIndex] && _SlideItems[previousIndex].$ParkOut();
                else
                    !manualActivate && _Processor && _Processor.$AdjustIdleOnPark();

                _PlayerInstance && _PlayerInstance.$Enable();

                //park in
                var loadingTicket = _LoadingTicket = $Jssor$.$GetNow();
                _SelfSlideItem.$LoadImage($Jssor$.$CreateCallback(null, SlideReadyEventHandler, loadingTicket));
            }
            else {
                var distance = Math.abs(slideIndex - currentIndex);
                var loadRange = _DisplayPieces + _Options.$LazyLoading - 1;
                if (!_ImageLazyLoading || distance <= loadRange) {
                    _SelfSlideItem.$LoadImage();
                }
            }
        }

        function SwipeStartEventHandler() {
            if (_CurrentSlideIndex == slideIndex && _Processor) {
                _Processor.$Stop();
                _PlayerInstance && _PlayerInstance.$Quit();
                _PlayerInstance && _PlayerInstance.$Disable();
                _Processor.$OpenSlideshowPanel();
            }
        }

        function FreezeEventHandler() {
            if (_CurrentSlideIndex == slideIndex && _Processor) {
                _Processor.$Stop();
            }
        }

        function ContentClickEventHandler(event) {
            if (_LastDragSucceded) {
                $Jssor$.$StopEvent(event);

                var checkElement = $Jssor$.$EvtSrc(event);
                while (checkElement && slideElmt !== checkElement) {
                    if (checkElement.tagName == "A") {
                        $Jssor$.$CancelEvent(event);
                    }
                    try {
                        checkElement = checkElement.parentNode;
                    } catch (e) {
                        // Firefox sometimes fires events for XUL elements, which throws
                        // a "permission denied" error. so this is not a child.
                        break;
                    }
                }
            }
        }

        function SlideClickEventHandler(event) {
            if (!_LastDragSucceded) {
                _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_CLICK, slideIndex, event);
            }
        }

        function PlayerAvailableEventHandler() {
            _PlayerInstance = _PlayerInstanceElement.pInstance;
            _Processor && _Processor.$SetPlayer(_PlayerInstance);
        }

        _SelfSlideItem.$LoadImage = function (completeCallback, loadingScreen) {
            loadingScreen = loadingScreen || _LoadingScreen;

            if (_ImageElmts.length && !_ImageLoaded) {

                $Jssor$.$ShowElement(loadingScreen);

                if (!_ImageLoading) {
                    _ImageLoading = true;
                    _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_LOAD_START, slideIndex);

                    $Jssor$.$Each(_ImageElmts, function (imageElmt) {

                        if (!$Jssor$.$Attribute(imageElmt, "src")) {
                            imageElmt.src = $Jssor$.$AttributeEx(imageElmt, "src2");
                            $Jssor$.$CssDisplay(imageElmt, imageElmt["display-origin"]);
                        }
                    });
                }
                $Jssor$.$LoadImages(_ImageElmts, _ImageItem, $Jssor$.$CreateCallback(null, LoadImageCompleteEventHandler, completeCallback, loadingScreen));
            }
            else {
                LoadImageCompleteEventHandler(completeCallback, loadingScreen);
            }
        };

        _SelfSlideItem.$GoForNextSlide = function () {

            var index = slideIndex;
            if (_Options.$AutoPlaySteps < 0)
                index -= _SlideCount;

            var nextIndex = index + _Options.$AutoPlaySteps * _PlayReverse;

            if (_Loop & 2) {
                //Rewind
                nextIndex = GetRealIndex(nextIndex);
            }
            if (!(_Loop & 1)) {
                //Stop at threshold
                nextIndex = Math.max(0, Math.min(nextIndex, _SlideCount - _DisplayPieces));
            }

            if (nextIndex != slideIndex) {
                if (_SlideshowRunner) {
                    var slideshowTransition = _SlideshowRunner.$GetTransition(_SlideCount);

                    if (slideshowTransition) {
                        var loadingTicket = _LoadingTicket = $Jssor$.$GetNow();

                        var nextItem = _SlideItems[GetRealIndex(nextIndex)];
                        return nextItem.$LoadImage($Jssor$.$CreateCallback(null, LoadSlideshowImageCompleteEventHandler, nextIndex, nextItem, slideshowTransition, loadingTicket), _LoadingScreen);
                    }
                }

                PlayTo(nextIndex);
            }
        };

        _SelfSlideItem.$TryActivate = function () {
            ParkEventHandler(slideIndex, slideIndex, true);
        };

        _SelfSlideItem.$ParkOut = function () {
            //park out
            _PlayerInstance && _PlayerInstance.$Quit();
            _PlayerInstance && _PlayerInstance.$Disable();
            _SelfSlideItem.$UnhideContentForSlideshow();
            _Processor && _Processor.$Abort();
            _Processor = null;
            ResetCaptionSlider();
        };

        //for debug only
        _SelfSlideItem.$StampSlideItemElements = function (stamp) {
            stamp = _SequenceNumber + "_" + stamp;

            $JssorDebug$.$Execute(function () {
                if (_ImageItem)
                    $Jssor$.$Attribute(_ImageItem, "debug-id", stamp + "_slide_item_image_id");

                $Jssor$.$Attribute(slideElmt, "debug-id", stamp + "_slide_item_item_id");
            });

            $JssorDebug$.$Execute(function () {
                $Jssor$.$Attribute(_Wrapper, "debug-id", stamp + "_slide_item_wrapper_id");
            });

            $JssorDebug$.$Execute(function () {
                $Jssor$.$Attribute(_LoadingScreen, "debug-id", stamp + "_loading_container_id");
            });
        };

        _SelfSlideItem.$HideContentForSlideshow = function () {
            $Jssor$.$HideElement(slideElmt);
        };

        _SelfSlideItem.$UnhideContentForSlideshow = function () {
            $Jssor$.$ShowElement(slideElmt);
        };

        _SelfSlideItem.$EnablePlayer = function () {
            _PlayerInstance && _PlayerInstance.$Enable();
        };

        function RefreshContent(elmt, fresh, level) {
            $JssorDebug$.$Execute(function () {
                if ($Jssor$.$Attribute(elmt, "jssor-slider"))
                    $JssorDebug$.$Log("Child slider found.");
            });

            if ($Jssor$.$Attribute(elmt, "jssor-slider"))
                return;

            level = level || 0;

            if (!_ContentRefreshed) {
                if (elmt.tagName == "IMG") {
                    _ImageElmts.push(elmt);

                    if (!$Jssor$.$Attribute(elmt, "src")) {
                        _ImageLazyLoading = true;
                        elmt["display-origin"] = $Jssor$.$CssDisplay(elmt);
                        $Jssor$.$HideElement(elmt);
                    }
                }
                if ($Jssor$.$IsBrowserIe9Earlier()) {
                    $Jssor$.$CssZIndex(elmt, ($Jssor$.$CssZIndex(elmt) || 0) + 1);
                }
                if (_Options.$HWA && $Jssor$.$WebKitVersion()) {
                    if ($Jssor$.$WebKitVersion() < 534 || (!_SlideshowEnabled && !$Jssor$.$IsBrowserChrome())) {
                        $Jssor$.$EnableHWA(elmt);
                    }
                }
            }

            var childElements = $Jssor$.$Children(elmt);

            $Jssor$.$Each(childElements, function (childElement, i) {

                var childTagName = childElement.tagName;
                var uAttribute = $Jssor$.$AttributeEx(childElement, "u");
                if (uAttribute == "player" && !_PlayerInstanceElement) {
                    _PlayerInstanceElement = childElement;
                    if (_PlayerInstanceElement.pInstance) {
                        PlayerAvailableEventHandler();
                    }
                    else {
                        $Jssor$.$AddEvent(_PlayerInstanceElement, "dataavailable", PlayerAvailableEventHandler);
                    }
                }

                if (uAttribute == "caption") {
                    if (!$Jssor$.$IsBrowserIE() && !fresh) {

                        //if (childTagName == "A") {
                        //    $Jssor$.$RemoveEvent(childElement, "click", ContentClickEventHandler);
                        //    $Jssor$.$Attribute(childElement, "jssor-content", null);
                        //}

                        var captionElement = $Jssor$.$CloneNode(childElement, false, true);
                        $Jssor$.$InsertBefore(captionElement, childElement, elmt);
                        $Jssor$.$RemoveElement(childElement, elmt);
                        childElement = captionElement;

                        fresh = true;
                    }
                }
                else if (!_ContentRefreshed && !level && !_ImageItem) {

                    if (childTagName == "A") {
                        if ($Jssor$.$AttributeEx(childElement, "u") == "image") {
                            _ImageItem = $Jssor$.$FindChildByTag(childElement, "IMG");

                            $JssorDebug$.$Execute(function () {
                                if (!_ImageItem) {
                                    $JssorDebug$.$Error("slide html code definition error, no 'IMG' found in a 'image with link' slide.\r\n" + elmt.outerHTML);
                                }
                            });
                        }
                        else {
                            _ImageItem = $Jssor$.$FindChild(childElement, "image", true);
                        }

                        if (_ImageItem) {
                            _LinkItemOrigin = childElement;
                            $Jssor$.$SetStyles(_LinkItemOrigin, _StyleDef);

                            _LinkItem = $Jssor$.$CloneNode(_LinkItemOrigin, true);
                            //$Jssor$.$AddEvent(_LinkItem, "click", ContentClickEventHandler);

                            $Jssor$.$CssDisplay(_LinkItem, "block");
                            $Jssor$.$SetStyles(_LinkItem, _StyleDef);
                            $Jssor$.$CssOpacity(_LinkItem, 0);
                            $Jssor$.$Css(_LinkItem, "backgroundColor", "#000");
                        }
                    }
                    else if (childTagName == "IMG" && $Jssor$.$AttributeEx(childElement, "u") == "image") {
                        _ImageItem = childElement;
                    }

                    if (_ImageItem) {
                        _ImageItem.border = 0;
                        $Jssor$.$SetStyles(_ImageItem, _StyleDef);
                    }
                }

                //if (!$Jssor$.$Attribute(childElement, "jssor-content")) {
                //    //cancel click event on <A> element when a drag of slide succeeded
                //    $Jssor$.$AddEvent(childElement, "click", ContentClickEventHandler);
                //    $Jssor$.$Attribute(childElement, "jssor-content", true);
                //}

                RefreshContent(childElement, fresh, level +1);
            });
        }

        _SelfSlideItem.$OnInnerOffsetChange = function (oldOffset, newOffset) {
            var slidePosition = _DisplayPieces - newOffset;

            SetPosition(_Wrapper, slidePosition);

            //following lines are for future usage, not ready yet
            //if (!_IsDragging || !_IsCaptionSliderPlayingWhenDragStart) {
            //    var _DealWithParallax;
            //    if (IsCurrentSlideIndex(slideIndex)) {
            //        if (_CaptionSliderOptions.$PlayOutMode == 2)
            //            _DealWithParallax = true;
            //    }
            //    else {
            //        if (!_CaptionSliderOptions.$PlayInMode) {
            //            //PlayInMode: 0 none
            //            _CaptionSliderIn.$GoToEnd();
            //        }
            //        //else if (_CaptionSliderOptions.$PlayInMode == 1) {
            //        //    //PlayInMode: 1 chain
            //        //    _CaptionSliderIn.$GoToPosition(0);
            //        //}
            //        else if (_CaptionSliderOptions.$PlayInMode == 2) {
            //            //PlayInMode: 2 parallel
            //            _DealWithParallax = true;
            //        }
            //    }

            //    if (_DealWithParallax) {
            //        _CaptionSliderIn.$GoToPosition((_CaptionSliderIn.$GetPosition_OuterEnd() - _CaptionSliderIn.$GetPosition_OuterBegin()) * Math.abs(newOffset - 1) * .8 + _CaptionSliderIn.$GetPosition_OuterBegin());
            //    }
            //}
        };

        _SelfSlideItem.$GetCaptionSliderIn = function () {
            return _CaptionSliderIn;
        };

        _SelfSlideItem.$GetCaptionSliderOut = function () {
            return _CaptionSliderOut;
        };

        _SelfSlideItem.$Index = slideIndex;

        $JssorObject$.call(_SelfSlideItem);

        //SlideItem Constructor
        {

            var thumb = $Jssor$.$FindChild(slideElmt, "thumb", true);
            if (thumb) {
                _SelfSlideItem.$Thumb = $Jssor$.$CloneNode(thumb);
                $Jssor$.$RemoveAttribute(thumb, "id");
                $Jssor$.$HideElement(thumb);
            }
            $Jssor$.$ShowElement(slideElmt);

            _LoadingScreen = $Jssor$.$CloneNode(_LoadingContainer);
            $Jssor$.$CssZIndex(_LoadingScreen, 1000);

            //cancel click event on <A> element when a drag of slide succeeded
            $Jssor$.$AddEvent(slideElmt, "click", SlideClickEventHandler);

            ResetCaptionSlider(true);

            _SelfSlideItem.$Image = _ImageItem;
            _SelfSlideItem.$Link = _LinkItem;

            _SelfSlideItem.$Item = slideElmt;

            _SelfSlideItem.$Wrapper = _Wrapper = slideElmt;
            $Jssor$.$AppendChild(_Wrapper, _LoadingScreen);

            _SelfSlider.$On(203, ParkEventHandler);
            _SelfSlider.$On(28, FreezeEventHandler);
            _SelfSlider.$On(24, SwipeStartEventHandler);

            $JssorDebug$.$Execute(function () {
                _SequenceNumber = _SlideItemCreatedCount++;
            });

            $JssorDebug$.$Execute(function () {
                $Jssor$.$Attribute(_Wrapper, "debug-id", "slide-" + slideIndex);
            });
        }
    }
    //SlideItem

    //Processor
    function Processor(slideElmt, slideIndex, slideshowProcessor, captionSliderIn, captionSliderOut) {

        var _SelfProcessor = this;

        var _ProgressBegin = 0;
        var _SlideshowBegin = 0;
        var _SlideshowEnd;
        var _CaptionInBegin;
        var _IdleBegin;
        var _IdleEnd;
        var _ProgressEnd;

        var _IsSlideshowRunning;
        var _IsRollingBack;

        var _PlayerInstance;
        var _IsPlayerOnService;

        var slideItem = _SlideItems[slideIndex];

        $JssorAnimator$.call(_SelfProcessor, 0, 0);

        function UpdateLink() {

            $Jssor$.$Empty(_LinkContainer);

            if (_ShowLink && _IsSlideshowRunning && slideItem.$Link) {
                $Jssor$.$AppendChild(_LinkContainer, slideItem.$Link);
            }

            $Jssor$.$ShowElement(_LinkContainer, !_IsSlideshowRunning && slideItem.$Image);
        }

        function ProcessCompleteEventHandler() {

            if (_IsRollingBack) {
                _IsRollingBack = false;
                _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_ROLLBACK_END, slideIndex, _IdleEnd, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
                _SelfProcessor.$GoToPosition(_IdleBegin);
            }

            _SelfProcessor.$Replay();
        }

        function PlayerSwitchEventHandler(isOnService) {
            _IsPlayerOnService = isOnService;

            _SelfProcessor.$Stop();
            _SelfProcessor.$Replay();
        }

        _SelfProcessor.$Replay = function () {

            var currentPosition = _SelfProcessor.$GetPosition_Display();

            if (!_IsDragging && !_IsSliding && !_IsPlayerOnService && _CurrentSlideIndex == slideIndex) {

                if (!currentPosition) {
                    if (_SlideshowEnd && !_IsSlideshowRunning) {
                        _IsSlideshowRunning = true;

                        _SelfProcessor.$OpenSlideshowPanel(true);

                        _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_SLIDESHOW_START, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
                    }

                    UpdateLink();
                }

                var toPosition;
                var stateEvent = $JssorSlider$.$EVT_STATE_CHANGE;

                if (currentPosition != _ProgressEnd) {
                    if (currentPosition == _IdleEnd) {
                        toPosition = _ProgressEnd;
                    }
                    else if (currentPosition == _IdleBegin) {
                        toPosition = _IdleEnd;
                    }
                    else if (!currentPosition) {
                        toPosition = _IdleBegin;
                    }
                    else if (currentPosition > _IdleEnd) {
                        _IsRollingBack = true;
                        toPosition = _IdleEnd;
                        stateEvent = $JssorSlider$.$EVT_ROLLBACK_START;
                    }
                    else {
                        //continue from break (by drag or lock)
                        toPosition = _SelfProcessor.$GetPlayToPosition();
                    }
                }

                _SelfSlider.$TriggerEvent(stateEvent, slideIndex, currentPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);

                var allowAutoPlay = _AutoPlay && (!_HoverToPause || _NotOnHover);

                if (currentPosition == _ProgressEnd) {
                    (_IdleEnd != _ProgressEnd && !(_HoverToPause & 12) || allowAutoPlay) && slideItem.$GoForNextSlide();
                }
                else if (allowAutoPlay || currentPosition != _IdleEnd) {
                    _SelfProcessor.$PlayToPosition(toPosition, ProcessCompleteEventHandler);
                }
            }
        };

        _SelfProcessor.$AdjustIdleOnPark = function () {
            if (_IdleEnd == _ProgressEnd && _IdleEnd == _SelfProcessor.$GetPosition_Display())
                _SelfProcessor.$GoToPosition(_IdleBegin);
        };

        _SelfProcessor.$Abort = function () {
            _SlideshowRunner && _SlideshowRunner.$Index == slideIndex && _SlideshowRunner.$Clear();

            var currentPosition = _SelfProcessor.$GetPosition_Display();
            if (currentPosition < _ProgressEnd) {
                _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_STATE_CHANGE, slideIndex, -currentPosition - 1, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
            }
        };

        _SelfProcessor.$OpenSlideshowPanel = function (open) {
            if (slideshowProcessor) {
                $Jssor$.$CssOverflow(_SlideshowPanel, open && slideshowProcessor.$Transition.$Outside ? "" : "hidden");
            }
        };

        _SelfProcessor.$OnInnerOffsetChange = function (oldPosition, newPosition) {

            if (_IsSlideshowRunning && newPosition >= _SlideshowEnd) {
                _IsSlideshowRunning = false;
                UpdateLink();
                slideItem.$UnhideContentForSlideshow();
                _SlideshowRunner.$Clear();

                _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_SLIDESHOW_END, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
            }

            _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_PROGRESS_CHANGE, slideIndex, newPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
        };

        _SelfProcessor.$SetPlayer = function (playerInstance) {
            if (playerInstance && !_PlayerInstance) {
                _PlayerInstance = playerInstance;

                playerInstance.$On($JssorPlayer$.$EVT_SWITCH, PlayerSwitchEventHandler);
            }
        };

        //Processor Constructor
        {
            if (slideshowProcessor) {
                _SelfProcessor.$Chain(slideshowProcessor);
            }

            _SlideshowEnd = _SelfProcessor.$GetPosition_OuterEnd();
            _CaptionInBegin = _SelfProcessor.$GetPosition_OuterEnd();
            _SelfProcessor.$Chain(captionSliderIn);
            _IdleBegin = captionSliderIn.$GetPosition_OuterEnd();
            _IdleEnd = _IdleBegin + ($Jssor$.$ParseFloat($Jssor$.$AttributeEx(slideElmt, "idle")) || _AutoPlayInterval);

            captionSliderOut.$Shift(_IdleEnd);
            _SelfProcessor.$Combine(captionSliderOut);
            _ProgressEnd = _SelfProcessor.$GetPosition_OuterEnd();
        }
    }
    //Processor
    //#endregion

    function SetPosition(elmt, position) {
        var orientation = _DragOrientation > 0 ? _DragOrientation : _PlayOrientation;
        var x = _StepLengthX * position * (orientation & 1);
        var y = _StepLengthY * position * ((orientation >> 1) & 1);

        x = Math.round(x);
        y = Math.round(y);

        $Jssor$.$CssLeft(elmt, x);
        $Jssor$.$CssTop(elmt, y);
    }

    //#region Event handling begin

    function RecordFreezePoint() {
        _CarouselPlaying_OnFreeze = _IsSliding;
        _PlayToPosition_OnFreeze = _CarouselPlayer.$GetPlayToPosition();
        _Position_OnFreeze = _Conveyor.$GetPosition();
    }

    function Freeze() {
        RecordFreezePoint();

        if (_IsDragging || !_NotOnHover && (_HoverToPause & 12)) {
            _CarouselPlayer.$Stop();

            _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_FREEZE);
        }
    }

    function Unfreeze(byDrag) {

        if (!_IsDragging && (_NotOnHover || !(_HoverToPause & 12)) && !_CarouselPlayer.$IsPlaying()) {

            var currentPosition = _Conveyor.$GetPosition();
            var toPosition = Math.ceil(_Position_OnFreeze);

            if (byDrag && Math.abs(_DragOffsetTotal) >= _Options.$MinDragOffsetToSlide) {
                toPosition = Math.ceil(currentPosition);
                toPosition += _DragIndexAdjust;
            }

            if (!(_Loop & 1)) {
                toPosition = Math.min(_SlideCount - _DisplayPieces, Math.max(toPosition, 0));
            }

            var t = Math.abs(toPosition - currentPosition);
            t = 1 - Math.pow(1 - t, 5);

            if (!_LastDragSucceded && _CarouselPlaying_OnFreeze) {
                _CarouselPlayer.$Continue(_PlayToPosition_OnFreeze);
            }
            else if (currentPosition == toPosition) {
                _CurrentSlideItem.$EnablePlayer();
                _CurrentSlideItem.$TryActivate();
            }
            else {

                _CarouselPlayer.$PlayCarousel(currentPosition, toPosition, t * _SlideDuration);
            }
        }
    }

    function PreventDragSelectionEvent(event) {
        if (!$Jssor$.$AttributeEx($Jssor$.$EvtSrc(event), "nodrag")) {
            $Jssor$.$CancelEvent(event);
        }
    }

    function OnTouchStart(event) {
        OnDragStart(event, 1);
    }

    function OnDragStart(event, touch) {
        event = $Jssor$.$GetEvent(event);
        var eventSrc = $Jssor$.$EvtSrc(event);

        if (!_DragOrientationRegistered && !$Jssor$.$AttributeEx(eventSrc, "nodrag") && RegisterDrag() && (!touch || event.touches.length == 1)) {
            _IsDragging = true;
            _DragInvalid = false;
            _LoadingTicket = null;

            $Jssor$.$AddEvent(document, touch ? "touchmove" : "mousemove", OnDragMove);

            _LastTimeMoveByDrag = $Jssor$.$GetNow() - 50;

            _LastDragSucceded = 0;
            Freeze();

            if (!_CarouselPlaying_OnFreeze)
                _DragOrientation = 0;

            if (touch) {
                var touchPoint = event.touches[0];
                _DragStartMouseX = touchPoint.clientX;
                _DragStartMouseY = touchPoint.clientY;
            }
            else {
                var mousePoint = $Jssor$.$MousePosition(event);

                _DragStartMouseX = mousePoint.x;
                _DragStartMouseY = mousePoint.y;
            }

            _DragOffsetTotal = 0;
            _DragOffsetLastTime = 0;
            _DragIndexAdjust = 0;

            //Trigger EVT_DRAGSTART
            _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_DRAG_START, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze, event);
        }
    }

    function OnDragMove(event) {
        if (_IsDragging) {
            event = $Jssor$.$GetEvent(event);

            var actionPoint;

            if (event.type != "mousemove") {
                var touch = event.touches[0];
                actionPoint = { x: touch.clientX, y: touch.clientY };
            }
            else {
                actionPoint = $Jssor$.$MousePosition(event);
            }

            if (actionPoint) {
                var distanceX = actionPoint.x - _DragStartMouseX;
                var distanceY = actionPoint.y - _DragStartMouseY;


                if (Math.floor(_Position_OnFreeze) != _Position_OnFreeze)
                    _DragOrientation = _DragOrientation || (_PlayOrientation & _DragOrientationRegistered);

                if ((distanceX || distanceY) && !_DragOrientation) {
                    if (_DragOrientationRegistered == 3) {
                        if (Math.abs(distanceY) > Math.abs(distanceX)) {
                            _DragOrientation = 2;
                        }
                        else
                            _DragOrientation = 1;
                    }
                    else {
                        _DragOrientation = _DragOrientationRegistered;
                    }

                    if (_IsTouchDevice && _DragOrientation == 1 && Math.abs(distanceY) - Math.abs(distanceX) > 3) {
                        _DragInvalid = true;
                    }
                }

                if (_DragOrientation) {
                    var distance = distanceY;
                    var stepLength = _StepLengthY;

                    if (_DragOrientation == 1) {
                        distance = distanceX;
                        stepLength = _StepLengthX;
                    }

                    if (!(_Loop & 1)) {
                        if (distance > 0) {
                            var normalDistance = stepLength * _CurrentSlideIndex;
                            var sqrtDistance = distance - normalDistance;
                            if (sqrtDistance > 0) {
                                distance = normalDistance + Math.sqrt(sqrtDistance) * 5;
                            }
                        }

                        if (distance < 0) {
                            var normalDistance = stepLength * (_SlideCount - _DisplayPieces - _CurrentSlideIndex);
                            var sqrtDistance = -distance - normalDistance;

                            if (sqrtDistance > 0) {
                                distance = -normalDistance - Math.sqrt(sqrtDistance) * 5;
                            }
                        }
                    }

                    if (_DragOffsetTotal - _DragOffsetLastTime < -2) {
                        _DragIndexAdjust = 0;
                    }
                    else if (_DragOffsetTotal - _DragOffsetLastTime > 2) {
                        _DragIndexAdjust = -1;
                    }

                    _DragOffsetLastTime = _DragOffsetTotal;
                    _DragOffsetTotal = distance;
                    _PositionToGoByDrag = _Position_OnFreeze - _DragOffsetTotal / stepLength / (_ScaleRatio || 1);

                    if (_DragOffsetTotal && _DragOrientation && !_DragInvalid) {
                        $Jssor$.$CancelEvent(event);
                        if (!_IsSliding) {
                            _CarouselPlayer.$StandBy(_PositionToGoByDrag);
                        }
                        else
                            _CarouselPlayer.$SetStandByPosition(_PositionToGoByDrag);
                    }
                }
            }
        }
    }

    function OnDragEnd() {
        UnregisterDrag();

        if (_IsDragging) {

            _IsDragging = false;

            _LastTimeMoveByDrag = $Jssor$.$GetNow();

            $Jssor$.$RemoveEvent(document, "mousemove", OnDragMove);
            $Jssor$.$RemoveEvent(document, "touchmove", OnDragMove);

            _LastDragSucceded = _DragOffsetTotal;

            _CarouselPlayer.$Stop();

            var currentPosition = _Conveyor.$GetPosition();

            //Trigger EVT_DRAG_END
            _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_DRAG_END, GetRealIndex(currentPosition), currentPosition, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze);

            (_HoverToPause & 12) && RecordFreezePoint();

            Unfreeze(true);
        }
    }

    function SlidesClickEventHandler(event) {
        if (_LastDragSucceded) {
            $Jssor$.$StopEvent(event);

            var checkElement = $Jssor$.$EvtSrc(event);
            while (checkElement && _SlidesContainer !== checkElement) {
                if (checkElement.tagName == "A") {
                    $Jssor$.$CancelEvent(event);
                }
                try {
                    checkElement = checkElement.parentNode;
                } catch (e) {
                    // Firefox sometimes fires events for XUL elements, which throws
                    // a "permission denied" error. so this is not a child.
                    break;
                }
            }
        }
    }
    //#endregion

    function SetCurrentSlideIndex(index) {
        _PrevSlideItem = _SlideItems[_CurrentSlideIndex];
        _PreviousSlideIndex = _CurrentSlideIndex;
        _CurrentSlideIndex = GetRealIndex(index);
        _CurrentSlideItem = _SlideItems[_CurrentSlideIndex];
        ResetNavigator(index);
        return _CurrentSlideIndex;
    }

    function OnPark(slideIndex, prevIndex) {
        _DragOrientation = 0;

        SetCurrentSlideIndex(slideIndex);

        //Trigger EVT_PARK
        _SelfSlider.$TriggerEvent($JssorSlider$.$EVT_PARK, GetRealIndex(slideIndex), prevIndex);
    }

    function ResetNavigator(index, temp) {
        _TempSlideIndex = index;
        $Jssor$.$Each(_Navigators, function (navigator) {
            navigator.$SetCurrentIndex(GetRealIndex(index), index, temp);
        });
    }

    function RegisterDrag() {
        var dragRegistry = $JssorSlider$.$DragRegistry || 0;
        var dragOrientation = _DragEnabled;
        if (_IsTouchDevice)
            (dragOrientation & 1) && (dragOrientation &= 1);
        $JssorSlider$.$DragRegistry |= dragOrientation;

        return (_DragOrientationRegistered = dragOrientation & ~dragRegistry);
    }

    function UnregisterDrag() {
        if (_DragOrientationRegistered) {
            $JssorSlider$.$DragRegistry &= ~_DragEnabled;
            _DragOrientationRegistered = 0;
        }
    }

    function CreatePanel() {
        var div = $Jssor$.$CreateDiv();

        $Jssor$.$SetStyles(div, _StyleDef);
        $Jssor$.$CssPosition(div, "absolute");

        return div;
    }

    function GetRealIndex(index) {
        return (index % _SlideCount + _SlideCount) % _SlideCount;
    }

    function IsCurrentSlideIndex(index) {
        return GetRealIndex(index) == _CurrentSlideIndex;
    }

    function IsPreviousSlideIndex(index) {
        return GetRealIndex(index) == _PreviousSlideIndex;
    }

    //Navigation Request Handler
    function NavigationClickHandler(index, relative) {
        var toIndex = index;

        if (relative) {
            if (!_Loop) {
                //Stop at threshold
                toIndex = Math.min(Math.max(toIndex + _TempSlideIndex, 0), _SlideCount - _DisplayPieces);
                relative = false;
            }
            else if (_Loop & 2) {
                //Rewind
                toIndex = GetRealIndex(toIndex + _TempSlideIndex);
                relative = false;
            }
        }
        else if (_Loop) {
            toIndex = _SelfSlider.$GetVirtualIndex(toIndex);
        }

        PlayTo(toIndex, _Options.$SlideDuration, relative);
    }

    function ShowNavigators() {
        $Jssor$.$Each(_Navigators, function (navigator) {
            navigator.$Show(navigator.$Options.$ChanceToShow <= _NotOnHover);
        });
    }

    function MainContainerMouseLeaveEventHandler() {
        if (!_NotOnHover) {

            //$JssorDebug$.$Log("mouseleave");

            _NotOnHover = 1;

            ShowNavigators();

            if (!_IsDragging) {
                (_HoverToPause & 12) && Unfreeze();
                (_HoverToPause & 3) && _SlideItems[_CurrentSlideIndex].$TryActivate();
            }
        }
    }

    function MainContainerMouseEnterEventHandler() {

        if (_NotOnHover) {

            //$JssorDebug$.$Log("mouseenter");

            _NotOnHover = 0;

            ShowNavigators();

            _IsDragging || !(_HoverToPause & 12) || Freeze();
        }
    }

    function AdjustSlidesContainerSize() {
        _StyleDef = { $Width: _SlideWidth, $Height: _SlideHeight, $Top: 0, $Left: 0 };

        $Jssor$.$Each(_SlideElmts, function (slideElmt, i) {

            $Jssor$.$SetStyles(slideElmt, _StyleDef);
            $Jssor$.$CssPosition(slideElmt, "absolute");
            $Jssor$.$CssOverflow(slideElmt, "hidden");

            $Jssor$.$HideElement(slideElmt);
        });

        $Jssor$.$SetStyles(_LoadingContainer, _StyleDef);
    }

    function PlayToOffset(offset, slideDuration) {
        PlayTo(offset, slideDuration, true);
    }

    function PlayTo(slideIndex, slideDuration, relative) {
        ///	<summary>
        ///		PlayTo( slideIndex [, slideDuration] ); //Play slider to position 'slideIndex' within a period calculated base on 'slideDuration'.
        ///	</summary>
        ///	<param name="slideIndex" type="Number">
        ///		slide slideIndex or position will be playing to
        ///	</param>
        ///	<param name="slideDuration" type="Number" optional="true">
        ///		base slide duration in milliseconds to calculate the whole duration to complete this play request.
        ///	    default value is '$SlideDuration' value which is specified when initialize the slider.
        ///	</param>
        /// http://msdn.microsoft.com/en-us/library/vstudio/bb385682.aspx
        /// http://msdn.microsoft.com/en-us/library/vstudio/hh542720.aspx
        if (_CarouselEnabled && (!_IsDragging && (_NotOnHover || !(_HoverToPause & 12)) || _Options.$NaviQuitDrag)) {
            _IsSliding = true;
            _IsDragging = false;
            _CarouselPlayer.$Stop();

            {
                //Slide Duration
                if (slideDuration == undefined)
                    slideDuration = _SlideDuration;

                var positionDisplay = _Carousel.$GetPosition_Display();
                var positionTo = slideIndex;
                if (relative) {
                    positionTo = positionDisplay + slideIndex;
                    if (slideIndex > 0)
                        positionTo = Math.ceil(positionTo);
                    else
                        positionTo = Math.floor(positionTo);
                }

                if (_Loop & 2) {
                    //Rewind
                    positionTo = GetRealIndex(positionTo);
                }
                if (!(_Loop & 1)) {
                    //Stop at threshold
                    positionTo = Math.max(0, Math.min(positionTo, _SlideCount - _DisplayPieces));
                }

                var positionOffset = (positionTo - positionDisplay) % _SlideCount;
                positionTo = positionDisplay + positionOffset;

                var duration = positionDisplay == positionTo ? 0 : slideDuration * Math.abs(positionOffset);
                duration = Math.min(duration, slideDuration * _DisplayPieces * 1.5);

                _CarouselPlayer.$PlayCarousel(positionDisplay, positionTo, duration || 1);
            }
        }
    }

    //private functions

    //member functions

    _SelfSlider.$PlayTo = PlayTo;

    _SelfSlider.$GoTo = function (slideIndex) {
        ///	<summary>
        ///		instance.$GoTo( slideIndex );   //Go to the specifed slide immediately with no play.
        ///	</summary>
        //PlayTo(slideIndex, 1);
        _Conveyor.$GoToPosition(slideIndex);
    };

    _SelfSlider.$Next = function () {
        ///	<summary>
        ///		instance.$Next();   //Play the slider to next slide.
        ///	</summary>
        PlayToOffset(1);
    };

    _SelfSlider.$Prev = function () {
        ///	<summary>
        ///		instance.$Prev();   //Play the slider to previous slide.
        ///	</summary>
        PlayToOffset(-1);
    };

    _SelfSlider.$Pause = function () {
        ///	<summary>
        ///		instance.$Pause();   //Pause the slider, prevent it from auto playing.
        ///	</summary>
        _AutoPlay = false;
    };

    _SelfSlider.$Play = function () {
        ///	<summary>
        ///		instance.$Play();   //Start auto play if the slider is currently paused.
        ///	</summary>
        if (!_AutoPlay) {
            _AutoPlay = true;
            _SlideItems[_CurrentSlideIndex] && _SlideItems[_CurrentSlideIndex].$TryActivate();
        }
    };

    _SelfSlider.$SetSlideshowTransitions = function (transitions) {
        ///	<summary>
        ///		instance.$SetSlideshowTransitions( transitions );   //Reset slideshow transitions for the slider.
        ///	</summary>
        $JssorDebug$.$Execute(function () {
            if (!transitions || !transitions.length) {
                $JssorDebug$.$Error("Can not set slideshow transitions, no transitions specified.");
            }
        });

        //$Jssor$.$TranslateTransitions(transitions);    //for old transition compatibility
        _Options.$SlideshowOptions.$Transitions = transitions;
    };

    _SelfSlider.$SetCaptionTransitions = function (transitions) {
        ///	<summary>
        ///		instance.$SetCaptionTransitions( transitions );   //Reset caption transitions for the slider.
        ///	</summary>
        $JssorDebug$.$Execute(function () {
            if (!transitions || !transitions.length) {
                $JssorDebug$.$Error("Can not set caption transitions, no transitions specified");
            }
        });

        //$Jssor$.$TranslateTransitions(transitions);    //for old transition compatibility
        _CaptionSliderOptions.$CaptionTransitions = transitions;
        _CaptionSliderOptions.$Version = $Jssor$.$GetNow();
    };

    _SelfSlider.$SlidesCount = function () {
        ///	<summary>
        ///		instance.$SlidesCount();   //Retrieve slides count of the slider.
        ///	</summary>
        return _SlideElmts.length;
    };

    _SelfSlider.$CurrentIndex = function () {
        ///	<summary>
        ///		instance.$CurrentIndex();   //Retrieve current slide index of the slider.
        ///	</summary>
        return _CurrentSlideIndex;
    };

    _SelfSlider.$IsAutoPlaying = function () {
        ///	<summary>
        ///		instance.$IsAutoPlaying();   //Retrieve auto play status of the slider.
        ///	</summary>
        return _AutoPlay;
    };

    _SelfSlider.$IsDragging = function () {
        ///	<summary>
        ///		instance.$IsDragging();   //Retrieve drag status of the slider.
        ///	</summary>
        return _IsDragging;
    };

    _SelfSlider.$IsSliding = function () {
        ///	<summary>
        ///		instance.$IsSliding();   //Retrieve right<-->left sliding status of the slider.
        ///	</summary>
        return _IsSliding;
    };

    _SelfSlider.$IsMouseOver = function () {
        ///	<summary>
        ///		instance.$IsMouseOver();   //Retrieve mouse over status of the slider.
        ///	</summary>
        return !_NotOnHover;
    };

    _SelfSlider.$LastDragSucceded = function () {
        ///	<summary>
        ///		instance.$IsLastDragSucceded();   //Retrieve last drag succeded status, returns 0 if failed, returns drag offset if succeded
        ///	</summary>
        return _LastDragSucceded;
    };

    function OriginalWidth() {
        ///	<summary>
        ///		instance.$OriginalWidth();   //Retrieve original width of the slider.
        ///	</summary>
        return $Jssor$.$CssWidth(_ScaleWrapper || elmt);
    }

    function OriginalHeight() {
        ///	<summary>
        ///		instance.$OriginalHeight();   //Retrieve original height of the slider.
        ///	</summary>
        return $Jssor$.$CssHeight(_ScaleWrapper || elmt);
    }

    _SelfSlider.$OriginalWidth = _SelfSlider.$GetOriginalWidth = OriginalWidth;

    _SelfSlider.$OriginalHeight = _SelfSlider.$GetOriginalHeight = OriginalHeight;

    function Scale(dimension, isHeight) {
        ///	<summary>
        ///		instance.$ScaleWidth();   //Retrieve scaled dimension the slider currently displays.
        ///		instance.$ScaleWidth( dimension );   //Scale the slider to new width and keep aspect ratio.
        ///	</summary>

        if (dimension == undefined)
            return $Jssor$.$CssWidth(elmt);

        if (!_ScaleWrapper) {
            $JssorDebug$.$Execute(function () {
                var originalWidthStr = $Jssor$.$Css(elmt, "width");
                var originalHeightStr = $Jssor$.$Css(elmt, "height");
                var originalWidth = $Jssor$.$CssP(elmt, "width");
                var originalHeight = $Jssor$.$CssP(elmt, "height");

                if (!originalWidthStr || originalWidthStr.indexOf("px") == -1) {
                    $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not specified. Please specify 'width' in pixel. e.g. 'width: 600px;'");
                }

                if (!originalHeightStr || originalHeightStr.indexOf("px") == -1) {
                    $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not specified. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                }

                if (originalWidthStr.indexOf('%') != -1) {
                    $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. Please specify 'width' in pixel. e.g. 'width: 600px;'");
                }

                if (originalHeightStr.indexOf('%') != -1) {
                    $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                }

                if (!originalWidth) {
                    $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. 'width' of 'outer container' should be positive number. e.g. 'width: 600px;'");
                }

                if (!originalHeight) {
                    $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. 'height' of 'outer container' should be positive number. e.g. 'height: 300px;'");
                }
            });

            var innerWrapper = $Jssor$.$CreateDiv(document);
            $Jssor$.$ClassName(innerWrapper, $Jssor$.$ClassName(elmt));
            $Jssor$.$CssCssText(innerWrapper, $Jssor$.$CssCssText(elmt));
            $Jssor$.$CssDisplay(innerWrapper, "block");

            $Jssor$.$CssPosition(innerWrapper, "relative");
            $Jssor$.$CssTop(innerWrapper, 0);
            $Jssor$.$CssLeft(innerWrapper, 0);
            $Jssor$.$CssOverflow(innerWrapper, "visible");

            _ScaleWrapper = $Jssor$.$CreateDiv(document);

            $Jssor$.$CssPosition(_ScaleWrapper, "absolute");
            $Jssor$.$CssTop(_ScaleWrapper, 0);
            $Jssor$.$CssLeft(_ScaleWrapper, 0);
            $Jssor$.$CssWidth(_ScaleWrapper, $Jssor$.$CssWidth(elmt));
            $Jssor$.$CssHeight(_ScaleWrapper, $Jssor$.$CssHeight(elmt));
            $Jssor$.$SetStyleTransformOrigin(_ScaleWrapper, "0 0");

            $Jssor$.$AppendChild(_ScaleWrapper, innerWrapper);

            var children = $Jssor$.$Children(elmt);
            $Jssor$.$AppendChild(elmt, _ScaleWrapper);

            $Jssor$.$Css(elmt, "backgroundImage", "");

            //var noMoveElmts = {
            //    "navigator": _BulletNavigatorOptions && _BulletNavigatorOptions.$Scale == false,
            //    "arrowleft": _ArrowNavigatorOptions && _ArrowNavigatorOptions.$Scale == false,
            //    "arrowright": _ArrowNavigatorOptions && _ArrowNavigatorOptions.$Scale == false,
            //    "thumbnavigator": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.$Scale == false,
            //    "thumbwrapper": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.$Scale == false
            //};

            $Jssor$.$Each(children, function (child) {
                $Jssor$.$AppendChild($Jssor$.$AttributeEx(child, "noscale") ? elmt : innerWrapper, child);
                //$Jssor$.$AppendChild(noMoveElmts[$Jssor$.$AttributeEx(child, "u")] ? elmt : innerWrapper, child);
            });
        }

        $JssorDebug$.$Execute(function () {
            if (!dimension || dimension < 0) {
                $JssorDebug$.$Fail("'$ScaleWidth' error, 'dimension' should be positive value.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (!_InitialScrollWidth) {
                _InitialScrollWidth = _SelfSlider.$Elmt.scrollWidth;
            }
        });

        _ScaleRatio = dimension / (isHeight ? $Jssor$.$CssHeight : $Jssor$.$CssWidth)(_ScaleWrapper);
        $Jssor$.$CssScale(_ScaleWrapper, _ScaleRatio);

        var scaleWidth = isHeight ? (_ScaleRatio * OriginalWidth()) : dimension;
        var scaleHeight = isHeight ? dimension : (_ScaleRatio * OriginalHeight());

        $Jssor$.$CssWidth(elmt, scaleWidth);
        $Jssor$.$CssHeight(elmt, scaleHeight);

        $Jssor$.$Each(_Navigators, function (navigator) {
            navigator.$Relocate(scaleWidth, scaleHeight);
        });
    }

    _SelfSlider.$ScaleHeight = _SelfSlider.$GetScaleHeight = function (height) {
        ///	<summary>
        ///		instance.$ScaleHeight();   //Retrieve scaled height the slider currently displays.
        ///		instance.$ScaleHeight( dimension );   //Scale the slider to new height and keep aspect ratio.
        ///	</summary>

        if (height == undefined)
            return $Jssor$.$CssHeight(elmt);

        Scale(height, true);
    };

    _SelfSlider.$ScaleWidth = _SelfSlider.$SetScaleWidth = _SelfSlider.$GetScaleWidth = Scale;

    _SelfSlider.$GetVirtualIndex = function (index) {
        var parkingIndex = Math.ceil(GetRealIndex(_ParkingPosition / _StepLength));
        var displayIndex = GetRealIndex(index - _TempSlideIndex + parkingIndex);

        if (displayIndex > _DisplayPieces) {
            if (index - _TempSlideIndex > _SlideCount / 2)
                index -= _SlideCount;
            else if (index - _TempSlideIndex <= -_SlideCount / 2)
                index += _SlideCount;
        }
        else {
            index = _TempSlideIndex + displayIndex - parkingIndex;
        }

        return index;
    };

    //member functions

    $JssorObject$.call(_SelfSlider);

    $JssorDebug$.$Execute(function () {
        var outerContainerElmt = $Jssor$.$GetElement(elmt);
        if (!outerContainerElmt)
            $JssorDebug$.$Fail("Outer container '" + elmt + "' not found.");
    });

    //initialize member variables
    _SelfSlider.$Elmt = elmt = $Jssor$.$GetElement(elmt);
    //initialize member variables

    var _InitialScrollWidth;    //for debug only
    var _CaptionSliderCount = 1;    //for debug only

    var _Options = $Jssor$.$Extend({
        $FillMode: 0,                   //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
        $LazyLoading: 1,                //[Optional] For image with  lazy loading format (<IMG src2="url" .../>), by default it will be loaded only when the slide comes.
        //But an integer value (maybe 0, 1, 2 or 3) indicates that how far of nearby slides should be loaded immediately as well, default value is 1.
        $StartIndex: 0,                 //[Optional] Index of slide to display when initialize, default value is 0
        $AutoPlay: false,               //[Optional] Whether to auto play, default value is false
        $Loop: 1,                       //[Optional] Enable loop(circular) of carousel or not, 0: stop, 1: loop, 2 rewind, default value is 1
        $HWA: true,                     //[Optional] Enable hardware acceleration or not, default value is true
        $NaviQuitDrag: true,
        $AutoPlaySteps: 1,              //[Optional] Steps to go of every play (this options applys only when slideshow disabled), default value is 1
        $AutoPlayInterval: 3000,        //[Optional] Interval to play next slide since the previous stopped if a slideshow is auto playing, default value is 3000
        $PauseOnHover: 1,               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

        $SlideDuration: 500,            //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 400
        $SlideEasing: $JssorEasing$.$EaseOutQuad,   //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
        $MinDragOffsetToSlide: 20,      //[Optional] Minimum drag offset that trigger slide, default value is 20
        $SlideSpacing: 0, 				//[Optional] Space between each slide in pixels, default value is 0
        $DisplayPieces: 1,              //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), default value is 1
        $ParkingPosition: 0,            //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
        $UISearchMode: 1,               //[Optional] The way (0 parellel, 1 recursive, default value is recursive) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc.
        $PlayOrientation: 1,            //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
        $DragOrientation: 1             //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 both, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

    }, options);

    //going to use $Idle instead of $AutoPlayInterval
    if (_Options.$Idle != undefined)
        _Options.$AutoPlayInterval = _Options.$Idle;

    //going to use $Cols instead of $DisplayPieces
    if (_Options.$Cols != undefined)
        _Options.$DisplayPieces = _Options.$Cols;

    //Sodo statement for development time intellisence only
    $JssorDebug$.$Execute(function () {
        _Options = $Jssor$.$Extend({
            $ArrowKeyNavigation: undefined,
            $SlideWidth: undefined,
            $SlideHeight: undefined,
            $SlideshowOptions: undefined,
            $CaptionSliderOptions: undefined,
            $BulletNavigatorOptions: undefined,
            $ArrowNavigatorOptions: undefined,
            $ThumbnailNavigatorOptions: undefined
        },
        _Options);
    });

    var _PlayOrientation = _Options.$PlayOrientation & 3;
    var _PlayReverse = (_Options.$PlayOrientation & 4) / -4 || 1;

    var _SlideshowOptions = _Options.$SlideshowOptions;
    var _CaptionSliderOptions = $Jssor$.$Extend({ $Class: $JssorCaptionSliderBase$, $PlayInMode: 1, $PlayOutMode: 1 }, _Options.$CaptionSliderOptions);
    //$Jssor$.$TranslateTransitions(_CaptionSliderOptions.$CaptionTransitions); //for old transition compatibility
    var _BulletNavigatorOptions = _Options.$BulletNavigatorOptions;
    var _ArrowNavigatorOptions = _Options.$ArrowNavigatorOptions;
    var _ThumbnailNavigatorOptions = _Options.$ThumbnailNavigatorOptions;

    $JssorDebug$.$Execute(function () {
        if (_SlideshowOptions && !_SlideshowOptions.$Class) {
            $JssorDebug$.$Fail("Option $SlideshowOptions error, class not specified.");
        }
    });

    $JssorDebug$.$Execute(function () {
        if (_Options.$CaptionSliderOptions && !_Options.$CaptionSliderOptions.$Class) {
            $JssorDebug$.$Fail("Option $CaptionSliderOptions error, class not specified.");
        }
    });

    $JssorDebug$.$Execute(function () {
        if (_BulletNavigatorOptions && !_BulletNavigatorOptions.$Class) {
            $JssorDebug$.$Fail("Option $BulletNavigatorOptions error, class not specified.");
        }
    });

    $JssorDebug$.$Execute(function () {
        if (_ArrowNavigatorOptions && !_ArrowNavigatorOptions.$Class) {
            $JssorDebug$.$Fail("Option $ArrowNavigatorOptions error, class not specified.");
        }
    });

    $JssorDebug$.$Execute(function () {
        if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorOptions.$Class) {
            $JssorDebug$.$Fail("Option $ThumbnailNavigatorOptions error, class not specified.");
        }
    });

    var _UISearchNoDeep = !_Options.$UISearchMode;
    var _ScaleWrapper;
    var _SlidesContainer = $Jssor$.$FindChild(elmt, "slides", _UISearchNoDeep);
    var _LoadingContainer = $Jssor$.$FindChild(elmt, "loading", _UISearchNoDeep) || $Jssor$.$CreateDiv(document);

    var _BulletNavigatorContainer = $Jssor$.$FindChild(elmt, "navigator", _UISearchNoDeep);

    var _ArrowLeft = $Jssor$.$FindChild(elmt, "arrowleft", _UISearchNoDeep);
    var _ArrowRight = $Jssor$.$FindChild(elmt, "arrowright", _UISearchNoDeep);

    var _ThumbnailNavigatorContainer = $Jssor$.$FindChild(elmt, "thumbnavigator", _UISearchNoDeep);

    $JssorDebug$.$Execute(function () {
        //if (_BulletNavigatorOptions && !_BulletNavigatorContainer) {
        //    throw new Error("$BulletNavigatorOptions specified but bullet navigator container (<div u=\"navigator\" ...) not defined.");
        //}
        if (_BulletNavigatorContainer && !_BulletNavigatorOptions) {
            throw new Error("Bullet navigator container defined but $BulletNavigatorOptions not specified.");
        }

        //if (_ArrowNavigatorOptions) {
        //    if (!_ArrowLeft) {
        //        throw new Error("$ArrowNavigatorOptions specified, but arrowleft (<span u=\"arrowleft\" ...) not defined.");
        //    }

        //    if (!_ArrowRight) {
        //        throw new Error("$ArrowNavigatorOptions specified, but arrowright (<span u=\"arrowright\" ...) not defined.");
        //    }
        //}

        if ((_ArrowLeft || _ArrowRight) && !_ArrowNavigatorOptions) {
            throw new Error("arrowleft or arrowright defined, but $ArrowNavigatorOptions not specified.");
        }

        //if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorContainer) {
        //    throw new Error("$ThumbnailNavigatorOptions specified, but thumbnail navigator container (<div u=\"thumbnavigator\" ...) not defined.");
        //}

        if (_ThumbnailNavigatorContainer && !_ThumbnailNavigatorOptions) {
            throw new Error("Thumbnail navigator container defined, but $ThumbnailNavigatorOptions not specified.");
        }
    });

    var _SlidesContainerWidth = $Jssor$.$CssWidth(_SlidesContainer);
    var _SlidesContainerHeight = $Jssor$.$CssHeight(_SlidesContainer);

    $JssorDebug$.$Execute(function () {
        if (isNaN(_SlidesContainerWidth))
            $JssorDebug$.$Fail("Width of slides container wrong specification, it should be specified in pixel (like style='width: 600px;').");

        if (_SlidesContainerWidth == undefined)
            $JssorDebug$.$Fail("Width of slides container not specified, it should be specified in pixel (like style='width: 600px;').");

        if (isNaN(_SlidesContainerHeight))
            $JssorDebug$.$Fail("Height of slides container wrong specification, it should be specified in pixel (like style='height: 300px;').");

        if (_SlidesContainerHeight == undefined)
            $JssorDebug$.$Fail("Height of slides container not specified, it should be specified in pixel (like style='height: 300px;').");

        var slidesContainerOverflow = $Jssor$.$CssOverflow(_SlidesContainer);
        var slidesContainerOverflowX = $Jssor$.$Css(_SlidesContainer, "overflowX");
        var slidesContainerOverflowY = $Jssor$.$Css(_SlidesContainer, "overflowY");
        if (slidesContainerOverflow != "hidden" && (slidesContainerOverflowX != "hidden" || slidesContainerOverflowY != "hidden"))
            $JssorDebug$.$Fail("Overflow of slides container wrong specification, it should be specified as 'hidden' (style='overflow:hidden;').");
    });

    $JssorDebug$.$Execute(function () {
        if (!$Jssor$.$IsNumeric(_Options.$DisplayPieces))
            $JssorDebug$.$Fail("Option $DisplayPieces error, it should be a numeric value and greater than or equal to 1.");

        if (_Options.$DisplayPieces < 1)
            $JssorDebug$.$Fail("Option $DisplayPieces error, it should be greater than or equal to 1.");

        if (_Options.$DisplayPieces > 1 && _Options.$DragOrientation && _Options.$DragOrientation != _PlayOrientation)
            $JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $DisplayPieces is greater than 1.");

        if (!$Jssor$.$IsNumeric(_Options.$ParkingPosition))
            $JssorDebug$.$Fail("Option $ParkingPosition error, it should be a numeric value.");

        if (_Options.$ParkingPosition && _Options.$DragOrientation && _Options.$DragOrientation != _PlayOrientation)
            $JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $ParkingPosition is not equal to 0.");
    });

    var _StyleDef;

    var _SlideElmts = [];

    {
        var slideElmts = $Jssor$.$Children(_SlidesContainer);
        $Jssor$.$Each(slideElmts, function (slideElmt) {
            if (slideElmt.tagName == "DIV" && !$Jssor$.$AttributeEx(slideElmt, "u")) {
                _SlideElmts.push(slideElmt);
            }
            else if ($Jssor$.$IsBrowserIe9Earlier()) {
                $Jssor$.$CssZIndex(slideElmt, ($Jssor$.$CssZIndex(slideElmt) || 0) + 1);
            }
        });
    }

    $JssorDebug$.$Execute(function () {
        if (_SlideElmts.length < 1) {
            $JssorDebug$.$Error("Slides html code definition error, there must be at least 1 slide to initialize a slider.");
        }
    });

    var _SlideItemCreatedCount = 0; //for debug only
    var _SlideItemReleasedCount = 0;    //for debug only

    var _PreviousSlideIndex;
    var _CurrentSlideIndex = -1;
    var _TempSlideIndex;
    var _PrevSlideItem;
    var _CurrentSlideItem;
    var _SlideCount = _SlideElmts.length;

    var _SlideWidth = _Options.$SlideWidth || _SlidesContainerWidth;
    var _SlideHeight = _Options.$SlideHeight || _SlidesContainerHeight;

    var _SlideSpacing = _Options.$SlideSpacing;
    var _StepLengthX = _SlideWidth + _SlideSpacing;
    var _StepLengthY = _SlideHeight + _SlideSpacing;
    var _StepLength = (_PlayOrientation & 1) ? _StepLengthX : _StepLengthY;
    var _DisplayPieces = Math.min(_Options.$DisplayPieces, _SlideCount);

    var _SlideshowPanel;
    var _CurrentBoardIndex = 0;
    var _DragOrientation;
    var _DragOrientationRegistered;
    var _DragInvalid;

    var _Navigators = [];
    var _BulletNavigator;
    var _ArrowNavigator;
    var _ThumbnailNavigator;

    var _ShowLink;

    var _Frozen;
    var _AutoPlay;
    var _AutoPlaySteps = _Options.$AutoPlaySteps;
    var _HoverToPause = _Options.$PauseOnHover;
    var _AutoPlayInterval = _Options.$AutoPlayInterval;
    var _SlideDuration = _Options.$SlideDuration;

    var _SlideshowRunnerClass;
    var _TransitionsOrder;

    var _SlideshowEnabled;
    var _ParkingPosition;
    var _CarouselEnabled = _DisplayPieces < _SlideCount;
    var _Loop = _CarouselEnabled ? _Options.$Loop : 0;

    var _DragEnabled;
    var _LastDragSucceded;

    var _NotOnHover = 1;   //0 Hovering, 1 Not hovering

    //Variable Definition
    var _IsSliding;
    var _IsDragging;
    var _LoadingTicket;

    //The X position of mouse/touch when a drag start
    var _DragStartMouseX = 0;
    //The Y position of mouse/touch when a drag start
    var _DragStartMouseY = 0;
    var _DragOffsetTotal;
    var _DragOffsetLastTime;
    var _DragIndexAdjust;

    var _Carousel;
    var _Conveyor;
    var _Slideshow;
    var _CarouselPlayer;
    var _SlideContainer = new SlideContainer();
    var _ScaleRatio;

    //$JssorSlider$ Constructor
    {
        _AutoPlay = _Options.$AutoPlay;
        _SelfSlider.$Options = options;

        AdjustSlidesContainerSize();

        $Jssor$.$Attribute(elmt, "jssor-slider", true);

        $Jssor$.$CssZIndex(_SlidesContainer, $Jssor$.$CssZIndex(_SlidesContainer) || 0);
        $Jssor$.$CssPosition(_SlidesContainer, "absolute");
        _SlideshowPanel = $Jssor$.$CloneNode(_SlidesContainer, true);
        $Jssor$.$InsertBefore(_SlideshowPanel, _SlidesContainer);

        if (_SlideshowOptions) {
            _ShowLink = _SlideshowOptions.$ShowLink;
            _SlideshowRunnerClass = _SlideshowOptions.$Class;

            $JssorDebug$.$Execute(function () {
                if (!_SlideshowOptions.$Transitions || !_SlideshowOptions.$Transitions.length) {
                    $JssorDebug$.$Error("Invalid '$SlideshowOptions', no '$Transitions' specified.");
                }
            });

            _SlideshowEnabled = _DisplayPieces == 1 && _SlideCount > 1 && _SlideshowRunnerClass && (!$Jssor$.$IsBrowserIE() || $Jssor$.$BrowserVersion() >= 8);
        }

        _ParkingPosition = (_SlideshowEnabled || _DisplayPieces >= _SlideCount || !(_Loop & 1)) ? 0 : _Options.$ParkingPosition;

        _DragEnabled = ((_DisplayPieces > 1 || _ParkingPosition) ? _PlayOrientation : -1) & _Options.$DragOrientation;

        //SlideBoard
        var _SlideboardElmt = _SlidesContainer;
        var _SlideItems = [];

        var _SlideshowRunner;
        var _LinkContainer;

        var _Device = $Jssor$.$Device();
        var _IsTouchDevice = _Device.$Touchable;

        var _LastTimeMoveByDrag;
        var _Position_OnFreeze;
        var _CarouselPlaying_OnFreeze;
        var _PlayToPosition_OnFreeze;
        var _PositionToGoByDrag;

        //SlideBoard Constructor
        {
            if (_Device.$TouchActionAttr) {
                $Jssor$.$Css(_SlideboardElmt, _Device.$TouchActionAttr, [null, "pan-y", "pan-x", "none"][_DragEnabled] || "");
            }

            _Slideshow = new Slideshow();

            if (_SlideshowEnabled)
                _SlideshowRunner = new _SlideshowRunnerClass(_SlideContainer, _SlideWidth, _SlideHeight, _SlideshowOptions, _IsTouchDevice);

            $Jssor$.$AppendChild(_SlideshowPanel, _Slideshow.$Wrapper);
            $Jssor$.$CssOverflow(_SlidesContainer, "hidden");

            //link container
            {
                _LinkContainer = CreatePanel();
                $Jssor$.$Css(_LinkContainer, "backgroundColor", "#000");
                $Jssor$.$CssOpacity(_LinkContainer, 0);
                $Jssor$.$InsertBefore(_LinkContainer, _SlideboardElmt.firstChild, _SlideboardElmt);
            }

            for (var i = 0; i < _SlideElmts.length; i++) {
                var slideElmt = _SlideElmts[i];
                var slideItem = new SlideItem(slideElmt, i);
                _SlideItems.push(slideItem);
            }

            $Jssor$.$HideElement(_LoadingContainer);

            $JssorDebug$.$Execute(function () {
                $Jssor$.$Attribute(_LoadingContainer, "debug-id", "loading-container");
            });

            _Carousel = new Carousel();
            _CarouselPlayer = new CarouselPlayer(_Carousel, _Slideshow);

            $JssorDebug$.$Execute(function () {
                $Jssor$.$Attribute(_SlideboardElmt, "debug-id", "slide-board");
            });

            if (_DragEnabled) {
                $Jssor$.$AddEvent(_SlidesContainer, "mousedown", OnDragStart);
                $Jssor$.$AddEvent(_SlidesContainer, "touchstart", OnTouchStart);
                $Jssor$.$AddEvent(_SlidesContainer, "dragstart", PreventDragSelectionEvent);
                $Jssor$.$AddEvent(_SlidesContainer, "selectstart", PreventDragSelectionEvent);
                $Jssor$.$AddEvent(document, "mouseup", OnDragEnd);
                $Jssor$.$AddEvent(document, "touchend", OnDragEnd);
                $Jssor$.$AddEvent(document, "touchcancel", OnDragEnd);
                $Jssor$.$AddEvent(window, "blur", OnDragEnd);
            }
        }
        //SlideBoard

        _HoverToPause &= (_IsTouchDevice ? 10 : 5);

        //Bullet Navigator
        if (_BulletNavigatorContainer && _BulletNavigatorOptions) {
            _BulletNavigator = new _BulletNavigatorOptions.$Class(_BulletNavigatorContainer, _BulletNavigatorOptions, OriginalWidth(), OriginalHeight());
            _Navigators.push(_BulletNavigator);
        }

        //Arrow Navigator
        if (_ArrowNavigatorOptions && _ArrowLeft && _ArrowRight) {
            _ArrowNavigatorOptions.$Loop = _Loop;
            _ArrowNavigatorOptions.$DisplayPieces = _DisplayPieces;
            _ArrowNavigator = new _ArrowNavigatorOptions.$Class(_ArrowLeft, _ArrowRight, _ArrowNavigatorOptions, OriginalWidth(), OriginalHeight());
            _Navigators.push(_ArrowNavigator);
        }

        //Thumbnail Navigator
        if (_ThumbnailNavigatorContainer && _ThumbnailNavigatorOptions) {
            _ThumbnailNavigatorOptions.$StartIndex = _Options.$StartIndex;
            _ThumbnailNavigator = new _ThumbnailNavigatorOptions.$Class(_ThumbnailNavigatorContainer, _ThumbnailNavigatorOptions);
            _Navigators.push(_ThumbnailNavigator);
        }

        $Jssor$.$Each(_Navigators, function (navigator) {
            navigator.$Reset(_SlideCount, _SlideItems, _LoadingContainer);
            navigator.$On($JssorNavigatorEvents$.$NAVIGATIONREQUEST, NavigationClickHandler);
        });

        Scale(OriginalWidth());

        $Jssor$.$AddEvent(_SlidesContainer, "click", SlidesClickEventHandler);
        $Jssor$.$AddEvent(elmt, "mouseout", $Jssor$.$MouseOverOutFilter(MainContainerMouseLeaveEventHandler, elmt));
        $Jssor$.$AddEvent(elmt, "mouseover", $Jssor$.$MouseOverOutFilter(MainContainerMouseEnterEventHandler, elmt));

        ShowNavigators();

        //Keyboard Navigation
        if (_Options.$ArrowKeyNavigation) {
            $Jssor$.$AddEvent(document, "keydown", function (e) {
                if (e.keyCode == 37/*$JssorKeyCode$.$LEFT*/) {
                    //Arrow Left
                    PlayToOffset(-1);
                }
                else if (e.keyCode == 39/*$JssorKeyCode$.$RIGHT*/) {
                    //Arrow Right
                    PlayToOffset(1);
                }
            });
        }

        var startPosition = _Options.$StartIndex;
        if (!(_Loop & 1)) {
            startPosition = Math.max(0, Math.min(startPosition, _SlideCount - _DisplayPieces));
        }
        _CarouselPlayer.$PlayCarousel(startPosition, startPosition, 0);
    }
};
var $JssorSlideo$ = window.$JssorSlideo$ = $JssorSlider$;

$JssorSlider$.$EVT_CLICK = 21;
$JssorSlider$.$EVT_DRAG_START = 22;
$JssorSlider$.$EVT_DRAG_END = 23;
$JssorSlider$.$EVT_SWIPE_START = 24;
$JssorSlider$.$EVT_SWIPE_END = 25;

$JssorSlider$.$EVT_LOAD_START = 26;
$JssorSlider$.$EVT_LOAD_END = 27;
$JssorSlider$.$EVT_FREEZE = 28;

$JssorSlider$.$EVT_POSITION_CHANGE = 202;
$JssorSlider$.$EVT_PARK = 203;

$JssorSlider$.$EVT_SLIDESHOW_START = 206;
$JssorSlider$.$EVT_SLIDESHOW_END = 207;

$JssorSlider$.$EVT_PROGRESS_CHANGE = 208;
$JssorSlider$.$EVT_STATE_CHANGE = 209;
$JssorSlider$.$EVT_ROLLBACK_START = 210;
$JssorSlider$.$EVT_ROLLBACK_END = 211;

//(function ($) {
//    jQuery.fn.jssorSlider = function (options) {
//        return this.each(function () {
//            return $(this).data('jssorSlider') || $(this).data('jssorSlider', new $JssorSlider$(this, options));
//        });
//    };
//})(jQuery);

//window.jQuery && (jQuery.fn.jssorSlider = function (options) {
//    return this.each(function () {
//        return jQuery(this).data('jssorSlider') || jQuery(this).data('jssorSlider', new $JssorSlider$(this, options));
//    });
//});

//$JssorBulletNavigator$
var $JssorNavigatorEvents$ = {
    $NAVIGATIONREQUEST: 1,
    $INDEXCHANGE: 2,
    $RESET: 3
};

var $JssorBulletNavigator$ = window.$JssorBulletNavigator$ = function (elmt, options, containerWidth, containerHeight) {
    var self = this;
    $JssorObject$.call(self);

    elmt = $Jssor$.$GetElement(elmt);

    var _Count;
    var _Length;
    var _Width;
    var _Height;
    var _CurrentIndex;
    var _CurrentInnerIndex = 0;
    var _Options;
    var _Steps;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _Orientation;
    var _ItemPrototype;
    var _PrototypeWidth;
    var _PrototypeHeight;

    var _ButtonElements = [];
    var _Buttons = [];

    function Highlight(index) {
        if (index != -1)
            _Buttons[index].$Selected(index == _CurrentInnerIndex);
    }

    function OnNavigationRequest(index) {
        self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, index * _Steps);
    }

    self.$Elmt = elmt;
    self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.$SetCurrentIndex = function (index) {
        if (index != _CurrentIndex) {
            var lastInnerIndex = _CurrentInnerIndex;
            var innerIndex = Math.floor(index / _Steps);
            _CurrentInnerIndex = innerIndex;
            _CurrentIndex = index;

            Highlight(lastInnerIndex);
            Highlight(innerIndex);

            //self.$TriggerEvent($JssorNavigatorEvents$.$INDEXCHANGE, index);
        }
    };

    self.$Show = function (hide) {
        $Jssor$.$ShowElement(elmt, hide);
    };

    var _Located;
    self.$Relocate = function (containerWidth, containerHeight) {
        if (!_Located || _Options.$Scale == false) {
            var containerWidth = $Jssor$.$ParentNode(elmt).clientWidth;
            var containerHeight = $Jssor$.$ParentNode(elmt).clientHeight;

            if (_Options.$AutoCenter & 1) {
                $Jssor$.$CssLeft(elmt, (containerWidth - _Width) / 2);
            }
            if (_Options.$AutoCenter & 2) {
                $Jssor$.$CssTop(elmt, (containerHeight - _Height) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.$Reset = function (length) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(length / _Steps);
            _CurrentInnerIndex = 0;

            var itemOffsetX = _PrototypeWidth + _SpacingX;
            var itemOffsetY = _PrototypeHeight + _SpacingY;

            var maxIndex = Math.ceil(_Count / _Lanes) - 1;

            _Width = _PrototypeWidth + itemOffsetX * (!_Orientation ? maxIndex : _Lanes - 1);
            _Height = _PrototypeHeight + itemOffsetY * (_Orientation ? maxIndex : _Lanes - 1);

            $Jssor$.$CssWidth(elmt, _Width);
            $Jssor$.$CssHeight(elmt, _Height);

            for (var buttonIndex = 0; buttonIndex < _Count; buttonIndex++) {

                var numberDiv = $Jssor$.$CreateSpan();
                $Jssor$.$InnerText(numberDiv, buttonIndex + 1);

                var div = $Jssor$.$BuildElement(_ItemPrototype, "numbertemplate", numberDiv, true);
                $Jssor$.$CssPosition(div, "absolute");

                var columnIndex = buttonIndex % (maxIndex + 1);
                $Jssor$.$CssLeft(div, !_Orientation ? itemOffsetX * columnIndex : buttonIndex % _Lanes * itemOffsetX);
                $Jssor$.$CssTop(div, _Orientation ? itemOffsetY * columnIndex : Math.floor(buttonIndex / (maxIndex + 1)) * itemOffsetY);

                $Jssor$.$AppendChild(elmt, div);
                _ButtonElements[buttonIndex] = div;

                if (_Options.$ActionMode & 1)
                    $Jssor$.$AddEvent(div, "click", $Jssor$.$CreateCallback(null, OnNavigationRequest, buttonIndex));

                if (_Options.$ActionMode & 2)
                    $Jssor$.$AddEvent(div, "mouseover", $Jssor$.$MouseOverOutFilter($Jssor$.$CreateCallback(null, OnNavigationRequest, buttonIndex), div));

                _Buttons[buttonIndex] = $Jssor$.$Buttonize(div);
            }

            //self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
            _Initialized = true;
        }
    };

    //JssorBulletNavigator Constructor
    {
        self.$Options = _Options = $Jssor$.$Extend({
            $SpacingX: 0,
            $SpacingY: 0,
            $Orientation: 1,
            $ActionMode: 1
        }, options);

        //Sodo statement for development time intellisence only
        $JssorDebug$.$Execute(function () {
            _Options = $Jssor$.$Extend({
                $Steps: undefined,
                $Lanes: undefined
            }, _Options);
        });

        _ItemPrototype = $Jssor$.$FindChild(elmt, "prototype");

        $JssorDebug$.$Execute(function () {
            if (!_ItemPrototype)
                $JssorDebug$.$Fail("Navigator item prototype not defined.");

            if (isNaN($Jssor$.$CssWidth(_ItemPrototype))) {
                $JssorDebug$.$Fail("Width of 'navigator item prototype' not specified.");
            }

            if (isNaN($Jssor$.$CssHeight(_ItemPrototype))) {
                $JssorDebug$.$Fail("Height of 'navigator item prototype' not specified.");
            }
        });

        _PrototypeWidth = $Jssor$.$CssWidth(_ItemPrototype);
        _PrototypeHeight = $Jssor$.$CssHeight(_ItemPrototype);

        $Jssor$.$RemoveElement(_ItemPrototype, elmt);

        _Steps = _Options.$Steps || 1;
        _Lanes = _Options.$Lanes || 1;
        _SpacingX = _Options.$SpacingX;
        _SpacingY = _Options.$SpacingY;
        _Orientation = _Options.$Orientation - 1;

        if (_Options.$Scale == false) {
            $Jssor$.$Attribute(elmt, "noscale", true);
        }
    }
};

var $JssorArrowNavigator$ = window.$JssorArrowNavigator$ = function (arrowLeft, arrowRight, options, containerWidth, containerHeight) {
    var self = this;
    $JssorObject$.call(self);

    $JssorDebug$.$Execute(function () {

        if (!arrowLeft)
            $JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowleft' not defined. Define 'arrowleft' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");

        if (!arrowRight)
            $JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowright' not defined. Define 'arrowright' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");

        if (isNaN($Jssor$.$CssWidth(arrowLeft))) {
            $JssorDebug$.$Fail("Width of 'arrow left' not specified.");
        }

        if (isNaN($Jssor$.$CssWidth(arrowRight))) {
            $JssorDebug$.$Fail("Width of 'arrow right' not specified.");
        }

        if (isNaN($Jssor$.$CssHeight(arrowLeft))) {
            $JssorDebug$.$Fail("Height of 'arrow left' not specified.");
        }

        if (isNaN($Jssor$.$CssHeight(arrowRight))) {
            $JssorDebug$.$Fail("Height of 'arrow right' not specified.");
        }
    });

    var _Hide;
    var _Length;
    var _CurrentIndex;
    var _Options;
    var _Steps;
    var _ArrowWidth = $Jssor$.$CssWidth(arrowLeft);
    var _ArrowHeight = $Jssor$.$CssHeight(arrowLeft);

    function OnNavigationRequest(steps) {
        self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, steps, true);
    }

    function ShowArrows(hide) {
        $Jssor$.$ShowElement(arrowLeft, hide || !options.$Loop && _CurrentIndex == 0);
        $Jssor$.$ShowElement(arrowRight, hide || !options.$Loop && _CurrentIndex >= _Length - options.$DisplayPieces);

        _Hide = hide;
    }

    self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.$SetCurrentIndex = function (index, virtualIndex, temp) {
        if (temp) {
            _CurrentIndex = virtualIndex;
        }
        else {
            _CurrentIndex = index;

            ShowArrows(_Hide);
        }
        //self.$TriggerEvent($JssorNavigatorEvents$.$INDEXCHANGE, index);
    };

    self.$Show = ShowArrows;

    var _Located;
    self.$Relocate = function (conainerWidth, containerHeight) {
        if (!_Located || _Options.$Scale == false) {

            var containerWidth = $Jssor$.$ParentNode(arrowLeft).clientWidth;
            var containerHeight = $Jssor$.$ParentNode(arrowLeft).clientHeight;

            if (_Options.$AutoCenter & 1) {
                $Jssor$.$CssLeft(arrowLeft, (containerWidth - _ArrowWidth) / 2);
                $Jssor$.$CssLeft(arrowRight, (containerWidth - _ArrowWidth) / 2);
            }

            if (_Options.$AutoCenter & 2) {
                $Jssor$.$CssTop(arrowLeft, (containerHeight - _ArrowHeight) / 2);
                $Jssor$.$CssTop(arrowRight, (containerHeight - _ArrowHeight) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.$Reset = function (length) {
        _Length = length;
        _CurrentIndex = 0;

        if (!_Initialized) {

            $Jssor$.$AddEvent(arrowLeft, "click", $Jssor$.$CreateCallback(null, OnNavigationRequest, -_Steps));
            $Jssor$.$AddEvent(arrowRight, "click", $Jssor$.$CreateCallback(null, OnNavigationRequest, _Steps));

            $Jssor$.$Buttonize(arrowLeft);
            $Jssor$.$Buttonize(arrowRight);

            _Initialized = true;
        }

        //self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
    };

    //JssorArrowNavigator Constructor
    {
        self.$Options = _Options = $Jssor$.$Extend({
            $Steps: 1
        }, options);

        _Steps = _Options.$Steps;

        if (_Options.$Scale == false) {
            $Jssor$.$Attribute(arrowLeft, "noscale", true);
            $Jssor$.$Attribute(arrowRight, "noscale", true);
        }
    }
};

//$JssorThumbnailNavigator$
var $JssorThumbnailNavigator$ = window.$JssorThumbnailNavigator$ = function (elmt, options) {
    var _Self = this;
    var _Length;
    var _Count;
    var _CurrentIndex;
    var _Options;
    var _NavigationItems = [];

    var _Width;
    var _Height;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _PrototypeWidth;
    var _PrototypeHeight;
    var _DisplayPieces;

    var _Slider;
    var _CurrentMouseOverIndex = -1;

    var _SlidesContainer;
    var _ThumbnailPrototype;

    $JssorObject$.call(_Self);
    elmt = $Jssor$.$GetElement(elmt);

    function NavigationItem(item, index) {
        var self = this;
        var _Wrapper;
        var _Button;
        var _Thumbnail;

        function Highlight(mouseStatus) {
            _Button.$Selected(_CurrentIndex == index);
        }

        function OnNavigationRequest(byMouseOver, event) {
            if (byMouseOver || !_Slider.$LastDragSucceded()) {
                //var tail = _Lanes - index % _Lanes;
                //var slideVirtualIndex = _Slider.$GetVirtualIndex((index + tail) / _Lanes - 1);
                //var itemVirtualIndex = slideVirtualIndex * _Lanes + _Lanes - tail;
                //_Self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, itemVirtualIndex);

                _Self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, index);
            }

            //$JssorDebug$.$Log("navigation request");
        }

        $JssorDebug$.$Execute(function () {
            self.$Wrapper = undefined;
        });

        self.$Index = index;

        self.$Highlight = Highlight;

        //NavigationItem Constructor
        {
            _Thumbnail = item.$Thumb || item.$Image || $Jssor$.$CreateDiv();
            self.$Wrapper = _Wrapper = $Jssor$.$BuildElement(_ThumbnailPrototype, "thumbnailtemplate", _Thumbnail, true);

            _Button = $Jssor$.$Buttonize(_Wrapper);
            if (_Options.$ActionMode & 1)
                $Jssor$.$AddEvent(_Wrapper, "click", $Jssor$.$CreateCallback(null, OnNavigationRequest, 0));
            if (_Options.$ActionMode & 2)
                $Jssor$.$AddEvent(_Wrapper, "mouseover", $Jssor$.$MouseOverOutFilter($Jssor$.$CreateCallback(null, OnNavigationRequest, 1), _Wrapper));
        }
    }

    _Self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    _Self.$SetCurrentIndex = function (index, virtualIndex, temp) {
        var oldIndex = _CurrentIndex;
        _CurrentIndex = index;
        if (oldIndex != -1)
            _NavigationItems[oldIndex].$Highlight();
        _NavigationItems[index].$Highlight();

        if (!temp) {
            _Slider.$PlayTo(_Slider.$GetVirtualIndex(Math.floor(virtualIndex / _Lanes)));
        }
    };

    _Self.$Show = function (hide) {
        $Jssor$.$ShowElement(elmt, hide);
    };

    _Self.$Relocate = $Jssor$.$EmptyFunction;

    var _Initialized;
    _Self.$Reset = function (length, items, loadingContainer) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(_Length / _Lanes);
            _CurrentIndex = -1;
            _DisplayPieces = Math.min(_DisplayPieces, items.length);

            var horizontal = _Options.$Orientation & 1;

            var slideWidth = _PrototypeWidth + (_PrototypeWidth + _SpacingX) * (_Lanes - 1) * (1 - horizontal);
            var slideHeight = _PrototypeHeight + (_PrototypeHeight + _SpacingY) * (_Lanes - 1) * horizontal;

            var slidesContainerWidth = slideWidth + (slideWidth + _SpacingX) * (_DisplayPieces - 1) * horizontal;
            var slidesContainerHeight = slideHeight + (slideHeight + _SpacingY) * (_DisplayPieces - 1) * (1 - horizontal);

            $Jssor$.$CssPosition(_SlidesContainer, "absolute");
            $Jssor$.$CssOverflow(_SlidesContainer, "hidden");
            if (_Options.$AutoCenter & 1) {
                $Jssor$.$CssLeft(_SlidesContainer, (_Width - slidesContainerWidth) / 2);
            }
            if (_Options.$AutoCenter & 2) {
                $Jssor$.$CssTop(_SlidesContainer, (_Height - slidesContainerHeight) / 2);
            }
            //$JssorDebug$.$Execute(function () {
            //    if (!_Options.$AutoCenter) {
            //        var slidesContainerTop = $Jssor$.$CssTop(_SlidesContainer);
            //        var slidesContainerLeft = $Jssor$.$CssLeft(_SlidesContainer);

            //        if (isNaN(slidesContainerTop)) {
            //            $JssorDebug$.$Fail("Position 'top' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option $ThumbnailNavigatorOptions.$AutoCenter set to 0, it should be specified in pixel (like <div u=\"slides\" style=\"top: 0px;\">)");
            //        }

            //        if (isNaN(slidesContainerLeft)) {
            //            $JssorDebug$.$Fail("Position 'left' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option $ThumbnailNavigatorOptions.$AutoCenter set to 0, it should be specified in pixel (like <div u=\"slides\" style=\"left: 0px;\">)");
            //        }
            //    }
            //});
            $Jssor$.$CssWidth(_SlidesContainer, slidesContainerWidth);
            $Jssor$.$CssHeight(_SlidesContainer, slidesContainerHeight);

            var slideItemElmts = [];
            $Jssor$.$Each(items, function (item, index) {
                var navigationItem = new NavigationItem(item, index);
                var navigationItemWrapper = navigationItem.$Wrapper;

                var columnIndex = Math.floor(index / _Lanes);
                var laneIndex = index % _Lanes;

                $Jssor$.$CssLeft(navigationItemWrapper, (_PrototypeWidth + _SpacingX) * laneIndex * (1 - horizontal));
                $Jssor$.$CssTop(navigationItemWrapper, (_PrototypeHeight + _SpacingY) * laneIndex * horizontal);

                if (!slideItemElmts[columnIndex]) {
                    slideItemElmts[columnIndex] = $Jssor$.$CreateDiv();
                    $Jssor$.$AppendChild(_SlidesContainer, slideItemElmts[columnIndex]);
                }

                $Jssor$.$AppendChild(slideItemElmts[columnIndex], navigationItemWrapper);

                _NavigationItems.push(navigationItem);
            });

            var thumbnailSliderOptions = $Jssor$.$Extend({
                $HWA: false,
                $AutoPlay: false,
                $NaviQuitDrag: false,
                $SlideWidth: slideWidth,
                $SlideHeight: slideHeight,
                $SlideSpacing: _SpacingX * horizontal + _SpacingY * (1 - horizontal),
                $MinDragOffsetToSlide: 12,
                $SlideDuration: 200,
                $PauseOnHover: 1,
                $PlayOrientation: _Options.$Orientation,
                $DragOrientation: _Options.$DisableDrag ? 0 : _Options.$Orientation
            }, _Options);

            _Slider = new $JssorSlider$(elmt, thumbnailSliderOptions);

            _Initialized = true;
        }

        //_Self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
    };

    //JssorThumbnailNavigator Constructor
    {
        _Self.$Options = _Options = $Jssor$.$Extend({
            $SpacingX: 3,
            $SpacingY: 3,
            $DisplayPieces: 1,
            $Orientation: 1,
            $AutoCenter: 3,
            $ActionMode: 1
        }, options);

        //going to use $Rows instead of $Lanes
        if (_Options.$Rows != undefined)
            _Options.$Lanes = _Options.$Rows;

        //Sodo statement for development time intellisence only
        $JssorDebug$.$Execute(function () {
            _Options = $Jssor$.$Extend({
                $Lanes: undefined,
                $Width: undefined,
                $Height: undefined
            }, _Options);
        });

        _Width = $Jssor$.$CssWidth(elmt);
        _Height = $Jssor$.$CssHeight(elmt);

        $JssorDebug$.$Execute(function () {
            if (!_Width)
                $JssorDebug$.$Fail("width of 'thumbnavigator' container not specified.");
            if (!_Height)
                $JssorDebug$.$Fail("height of 'thumbnavigator' container not specified.");
        });

        _SlidesContainer = $Jssor$.$FindChild(elmt, "slides", true);
        _ThumbnailPrototype = $Jssor$.$FindChild(_SlidesContainer, "prototype");

        $JssorDebug$.$Execute(function () {
            if (!_ThumbnailPrototype)
                $JssorDebug$.$Fail("prototype of 'thumbnavigator' not defined.");
        });

        _PrototypeWidth = $Jssor$.$CssWidth(_ThumbnailPrototype);
        _PrototypeHeight = $Jssor$.$CssHeight(_ThumbnailPrototype);

        $Jssor$.$RemoveElement(_ThumbnailPrototype, _SlidesContainer);

        _Lanes = _Options.$Lanes || 1;
        _SpacingX = _Options.$SpacingX;
        _SpacingY = _Options.$SpacingY;
        _DisplayPieces = _Options.$DisplayPieces;

        if (_Options.$Scale == false) {
            $Jssor$.$Attribute(elmt, "noscale", true);
        }
    }
};

//$JssorCaptionSliderBase$
function $JssorCaptionSliderBase$() {
    $JssorAnimator$.call(this, 0, 0);
    this.$Revert = $Jssor$.$EmptyFunction;
}

var $JssorCaptionSlider$ = window.$JssorCaptionSlider$ = function (container, captionSlideOptions, playIn) {
    $JssorDebug$.$Execute(function () {
        if (!captionSlideOptions.$CaptionTransitions) {
            $JssorDebug$.$Error("'$CaptionSliderOptions' option error, '$CaptionSliderOptions.$CaptionTransitions' not specified.");
        }
    });

    var _Self = this;
    var _ImmediateOutCaptionHanger;
    var _PlayMode = playIn ? captionSlideOptions.$PlayInMode : captionSlideOptions.$PlayOutMode;

    var _CaptionTransitions = captionSlideOptions.$CaptionTransitions;
    var _CaptionTuningFetcher = { $Transition: "t", $Delay: "d", $Duration: "du", x: "x", y: "y", $Rotate: "r", $Zoom: "z", $Opacity: "f", $BeginTime: "b" };
    var _CaptionTuningTransfer = {
        $Default: function (value, tuningValue) {
            if (!isNaN(tuningValue.$Value))
                value = tuningValue.$Value;
            else
                value *= tuningValue.$Percent;

            return value;
        },
        $Opacity: function (value, tuningValue) {
            return this.$Default(value - 1, tuningValue);
        }
    };
    _CaptionTuningTransfer.$Zoom = _CaptionTuningTransfer.$Opacity;

    $JssorAnimator$.call(_Self, 0, 0);

    function GetCaptionItems(element, level) {

        var itemsToPlay = [];
        var lastTransitionName;
        var namedTransitions = [];
        var namedTransitionOrders = [];

        function FetchRawTransition(captionElmt, index) {
            var rawTransition = {};

            $Jssor$.$Each(_CaptionTuningFetcher, function (fetchAttribute, fetchProperty) {
                var attributeValue = $Jssor$.$AttributeEx(captionElmt, fetchAttribute + (index || ""));
                if (attributeValue) {
                    var propertyValue = {};

                    if (fetchAttribute == "t") {
                        propertyValue.$Value = attributeValue;
                    }
                    else if (attributeValue.indexOf("%") + 1)
                        propertyValue.$Percent = $Jssor$.$ParseFloat(attributeValue) / 100;
                    else
                        propertyValue.$Value = $Jssor$.$ParseFloat(attributeValue);

                    rawTransition[fetchProperty] = propertyValue;
                }
            });

            return rawTransition;
        }

        function GetRandomTransition() {
            return _CaptionTransitions[Math.floor(Math.random() * _CaptionTransitions.length)];
        }

        function EvaluateCaptionTransition(transitionName) {

            var transition;

            if (transitionName == "*") {
                transition = GetRandomTransition();
            }
            else if (transitionName) {

                //indexed transition allowed, just the same as named transition
                var tempTransition = _CaptionTransitions[$Jssor$.$ParseInt(transitionName)] || _CaptionTransitions[transitionName];

                if ($Jssor$.$IsArray(tempTransition)) {
                    if (transitionName != lastTransitionName) {
                        lastTransitionName = transitionName;
                        namedTransitionOrders[transitionName] = 0;

                        namedTransitions[transitionName] = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                    }
                    else {
                        namedTransitionOrders[transitionName]++;
                    }

                    tempTransition = namedTransitions[transitionName];

                    if ($Jssor$.$IsArray(tempTransition)) {
                        tempTransition = tempTransition.length && tempTransition[namedTransitionOrders[transitionName] % tempTransition.length];

                        if ($Jssor$.$IsArray(tempTransition)) {
                            //got transition from array level 3, random for all captions
                            tempTransition = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                        }
                        //else {
                        //    //got transition from array level 2, in sequence for all adjacent captions with same name specified
                        //    transition = tempTransition;
                        //}
                    }
                    //else {
                    //    //got transition from array level 1, random but same for all adjacent captions with same name specified
                    //    transition = tempTransition;
                    //}
                }
                //else {
                //    //got transition directly from a simple transition object
                //    transition = tempTransition;
                //}

                transition = tempTransition;

                if ($Jssor$.$IsString(transition))
                    transition = EvaluateCaptionTransition(transition);
            }

            return transition;
        }

        var captionElmts = $Jssor$.$Children(element);
        $Jssor$.$Each(captionElmts, function (captionElmt, i) {

            var transitionsWithTuning = [];
            transitionsWithTuning.$Elmt = captionElmt;
            var isCaption = $Jssor$.$AttributeEx(captionElmt, "u") == "caption";

            $Jssor$.$Each(playIn ? [0, 3] : [2], function (j, k) {

                if (isCaption) {
                    var transition;
                    var rawTransition;

                    if (j != 2 || !$Jssor$.$AttributeEx(captionElmt, "t3")) {
                        rawTransition = FetchRawTransition(captionElmt, j);

                        if (j == 2 && !rawTransition.$Transition) {
                            rawTransition.$Delay = rawTransition.$Delay || { $Value: 0 };
                            rawTransition = $Jssor$.$Extend(FetchRawTransition(captionElmt, 0), rawTransition);
                        }
                    }

                    if (rawTransition && rawTransition.$Transition) {

                        transition = EvaluateCaptionTransition(rawTransition.$Transition.$Value);

                        if (transition) {

                            //var transitionWithTuning = $Jssor$.$Extend({ $Delay: 0, $ScaleHorizontal: 1, $ScaleVertical: 1 }, transition);
                            var transitionWithTuning = $Jssor$.$Extend({ $Delay: 0 }, transition);

                            $Jssor$.$Each(rawTransition, function (rawPropertyValue, propertyName) {
                                var tuningPropertyValue = (_CaptionTuningTransfer[propertyName] || _CaptionTuningTransfer.$Default).apply(_CaptionTuningTransfer, [transitionWithTuning[propertyName], rawTransition[propertyName]]);
                                if (!isNaN(tuningPropertyValue))
                                    transitionWithTuning[propertyName] = tuningPropertyValue;
                            });

                            if (!k) {
                                if (rawTransition.$BeginTime)
                                    transitionWithTuning.$BeginTime = rawTransition.$BeginTime.$Value || 0;
                                else if ((_PlayMode) & 2)
                                    transitionWithTuning.$BeginTime = 0;
                            }
                        }
                    }

                    transitionsWithTuning.push(transitionWithTuning);
                }

                if ((level % 2) && !k) {
                    transitionsWithTuning.$Children = GetCaptionItems(captionElmt, level + 1);
                }
            });

            itemsToPlay.push(transitionsWithTuning);
        });

        return itemsToPlay;
    }

    function CreateAnimator(item, transition, immediateOut) {

        var animatorOptions = {
            $Easing: transition.$Easing,
            $Round: transition.$Round,
            $During: transition.$During,
            $Reverse: playIn && !immediateOut
        };

        $JssorDebug$.$Execute(function () {
            animatorOptions.$CaptionAnimator = true;
        });

        var captionItem = item;
        var captionParent = $Jssor$.$ParentNode(item);

        var captionItemWidth = $Jssor$.$CssWidth(captionItem);
        var captionItemHeight = $Jssor$.$CssHeight(captionItem);
        var captionParentWidth = $Jssor$.$CssWidth(captionParent);
        var captionParentHeight = $Jssor$.$CssHeight(captionParent);

        var fromStyles = {};
        var difStyles = {};
        var scaleClip = transition.$ScaleClip || 1;

        //Opacity
        if (transition.$Opacity) {
            difStyles.$Opacity = 1 - transition.$Opacity;
        }

        animatorOptions.$OriginalWidth = captionItemWidth;
        animatorOptions.$OriginalHeight = captionItemHeight;

        //Transform
        if (transition.$Zoom || transition.$Rotate) {
            difStyles.$Zoom = (transition.$Zoom || 2) - 2;

            if ($Jssor$.$IsBrowserIe9Earlier() || $Jssor$.$IsBrowserOpera()) {
                difStyles.$Zoom = Math.min(difStyles.$Zoom, 1);
            }

            fromStyles.$Zoom = 1;

            var rotate = transition.$Rotate || 0;

            difStyles.$Rotate = rotate * 360;
            fromStyles.$Rotate = 0;
        }
            //Clip
        else if (transition.$Clip) {
            var fromStyleClip = { $Top: 0, $Right: captionItemWidth, $Bottom: captionItemHeight, $Left: 0 };
            var toStyleClip = $Jssor$.$Extend({}, fromStyleClip);

            var blockOffset = toStyleClip.$Offset = {};

            var topBenchmark = transition.$Clip & 4;
            var bottomBenchmark = transition.$Clip & 8;
            var leftBenchmark = transition.$Clip & 1;
            var rightBenchmark = transition.$Clip & 2;

            if (topBenchmark && bottomBenchmark) {
                blockOffset.$Top = captionItemHeight / 2 * scaleClip;
                blockOffset.$Bottom = -blockOffset.$Top;
            }
            else if (topBenchmark)
                blockOffset.$Bottom = -captionItemHeight * scaleClip;
            else if (bottomBenchmark)
                blockOffset.$Top = captionItemHeight * scaleClip;

            if (leftBenchmark && rightBenchmark) {
                blockOffset.$Left = captionItemWidth / 2 * scaleClip;
                blockOffset.$Right = -blockOffset.$Left;
            }
            else if (leftBenchmark)
                blockOffset.$Right = -captionItemWidth * scaleClip;
            else if (rightBenchmark)
                blockOffset.$Left = captionItemWidth * scaleClip;

            animatorOptions.$Move = transition.$Move;
            difStyles.$Clip = toStyleClip;
            fromStyles.$Clip = fromStyleClip;
        }

        //Fly
        {
            var toLeft = 0;
            var toTop = 0;

            if (transition.x)
                toLeft -= captionParentWidth * transition.x;

            if (transition.y)
                toTop -= captionParentHeight * transition.y;

            if (toLeft || toTop || animatorOptions.$Move) {
                difStyles.$Left = toLeft;
                difStyles.$Top = toTop;
            }
        }

        //duration
        var duration = transition.$Duration;

        fromStyles = $Jssor$.$Extend(fromStyles, $Jssor$.$GetStyles(captionItem, difStyles));

        animatorOptions.$Setter = $Jssor$.$StyleSetterEx();

        return new $JssorAnimator$(transition.$Delay, duration, animatorOptions, captionItem, fromStyles, difStyles);
    }

    function CreateAnimators(streamLineLength, captionItems) {

        $Jssor$.$Each(captionItems, function (captionItem, i) {

            $JssorDebug$.$Execute(function () {
                if (captionItem.length) {
                    var top = $Jssor$.$CssTop(captionItem.$Elmt);
                    var left = $Jssor$.$CssLeft(captionItem.$Elmt);
                    var width = $Jssor$.$CssWidth(captionItem.$Elmt);
                    var height = $Jssor$.$CssHeight(captionItem.$Elmt);

                    var error = null;

                    if (isNaN(top))
                        error = "Style 'top' for caption not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(left))
                        error = "Style 'left' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(width))
                        error = "Style 'width' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(height))
                        error = "Style 'height' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";

                    if (error)
                        $JssorDebug$.$Error("Caption " + (i + 1) + " definition error, \r\n" + error + "\r\n" + captionItem.$Elmt.outerHTML);
                }
            });

            var animator;
            var captionElmt = captionItem.$Elmt;
            var transition = captionItem[0];
            var transition3 = captionItem[1];

            if (transition) {

                animator = CreateAnimator(captionElmt, transition);
                streamLineLength = animator.$Locate(transition.$BeginTime == undefined ? streamLineLength : transition.$BeginTime, 1);
            }

            streamLineLength = CreateAnimators(streamLineLength, captionItem.$Children);

            if (transition3) {
                var animator3 = CreateAnimator(captionElmt, transition3, 1);
                animator3.$Locate(streamLineLength, 1);
                _Self.$Combine(animator3);
                _ImmediateOutCaptionHanger.$Combine(animator3);
            }

            if (animator)
                _Self.$Combine(animator);
        });

        return streamLineLength;
    }

    _Self.$Revert = function () {
        _Self.$GoToPosition(_Self.$GetPosition_OuterEnd() * (playIn || 0));
        _ImmediateOutCaptionHanger.$GoToPosition(0);
    };

    //Constructor
    {
        _ImmediateOutCaptionHanger = new $JssorAnimator$(0, 0);

        CreateAnimators(0, _PlayMode ? GetCaptionItems(container, 1) : []);
    }
};

var $JssorCaptionSlideo$ = function (container, captionSlideoOptions, playIn) {
    $JssorDebug$.$Execute(function () {
        if (!captionSlideoOptions.$CaptionTransitions) {
            $JssorDebug$.$Error("'$CaptionSlideoOptions' option error, '$CaptionSlideoOptions.$CaptionTransitions' not specified.");
        }
        else if (!$Jssor$.$IsArray(captionSlideoOptions.$CaptionTransitions)) {
            $JssorDebug$.$Error("'$CaptionSlideoOptions' option error, '$CaptionSlideoOptions.$CaptionTransitions' is not an array.");
        }
    });

    var _This = this;

    var _Easings;
    var _TransitionConverter = {};
    var _CaptionTransitions = captionSlideoOptions.$CaptionTransitions;

    $JssorAnimator$.call(_This, 0, 0);

    function ConvertTransition(transition, isEasing) {
        $Jssor$.$Each(transition, function (property, name) {
            var performName = _TransitionConverter[name];
            if (performName) {
                if (isEasing || name == "e") {
                    if ($Jssor$.$IsNumeric(property)) {
                        property = _Easings[property];
                    }
                    else if ($Jssor$.$IsPlainObject(property)) {
                        ConvertTransition(property, true);
                    }
                }

                transition[performName] = property;
                delete transition[name];
            }
        });
    }

    function GetCaptionItems(element, level) {

        var itemsToPlay = [];

        var captionElmts = $Jssor$.$Children(element);
        $Jssor$.$Each(captionElmts, function (captionElmt, i) {
            var isCaption = $Jssor$.$AttributeEx(captionElmt, "u") == "caption";
            if (isCaption) {
                var transitionName = $Jssor$.$AttributeEx(captionElmt, "t");
                var transition = _CaptionTransitions[$Jssor$.$ParseInt(transitionName)] || _CaptionTransitions[transitionName];

                var transitionName2 = $Jssor$.$AttributeEx(captionElmt, "t2");
                var transition2 = _CaptionTransitions[$Jssor$.$ParseInt(transitionName2)] || _CaptionTransitions[transitionName2];

                var itemToPlay = { $Elmt: captionElmt, $Transition: transition, $Transition2: transition2 };
                if (level < 3) {
                    itemsToPlay.concat(GetCaptionItems(captionElmt, level + 1));
                }
                itemsToPlay.push(itemToPlay);
            }
        });

        return itemsToPlay;
    }

    function CreateAnimator(captionElmt, transitions, lastStyles, forIn) {

        $Jssor$.$Each(transitions, function (transition) {
            ConvertTransition(transition);

            var animatorOptions = {
                $Easing: transition.$Easing,
                $Round: transition.$Round,
                $During: transition.$During,
                $Setter: $Jssor$.$StyleSetterEx()
            };

            var fromStyles = $Jssor$.$Extend($Jssor$.$GetStyles(captionItem, transition), lastStyles);

            var animator = new $JssorAnimator$(transition.b || 0, transition.d, animatorOptions, captionElmt, fromStyles, transition);

            !forIn == !playIn && _This.$Combine(animator);

            var castOptions;
            lastStyles = $Jssor$.$Extend(lastStyles, $Jssor$.$Cast(fromStyles, transition, 1, animatorOptions.$Easing, animatorOptions.$During, animatorOptions.$Round, animatorOptions, castOptions));
        });

        return lastStyles;
    }

    function CreateAnimators(captionItems) {

        $Jssor$.$Each(captionItems, function (captionItem, i) {

            $JssorDebug$.$Execute(function () {
                if (captionItem.length) {
                    var top = $Jssor$.$CssTop(captionItem.$Elmt);
                    var left = $Jssor$.$CssLeft(captionItem.$Elmt);
                    var width = $Jssor$.$CssWidth(captionItem.$Elmt);
                    var height = $Jssor$.$CssHeight(captionItem.$Elmt);

                    var error = null;

                    if (isNaN(top))
                        error = "style 'top' not specified";
                    else if (isNaN(left))
                        error = "style 'left' not specified";
                    else if (isNaN(width))
                        error = "style 'width' not specified";
                    else if (isNaN(height))
                        error = "style 'height' not specified";

                    if (error)
                        throw new Error("Caption " + (i + 1) + " definition error, " + error + ".\r\n" + captionItem.$Elmt.outerHTML);
                }
            });

            var captionElmt = captionItem.$Elmt;

            var captionItemWidth = $Jssor$.$CssWidth(captionItem);
            var captionItemHeight = $Jssor$.$CssHeight(captionItem);
            var captionParentWidth = $Jssor$.$CssWidth(captionParent);
            var captionParentHeight = $Jssor$.$CssHeight(captionParent);

            var lastStyles = { $Zoom: 1, $Rotate: 0, $Clip: { $Top: 0, $Right: captionItemWidth, $Bottom: captionItemHeight, $Left: 0 } };

            lastStyles = CreateAnimator(captionElmt, captionItem.$Transition, lastStyles, true);
            CreateAnimator(captionElmt, captionItem.$Transition2, lastStyles, false);
        });
    }

    _This.$Revert = function () {
        _This.$GoToPosition(-1, true);
    }

    //Constructor
    {
        _Easings = [
            $JssorEasing$.$EaseSwing,
            $JssorEasing$.$EaseLinear,
            $JssorEasing$.$EaseInQuad,
            $JssorEasing$.$EaseOutQuad,
            $JssorEasing$.$EaseInOutQuad,
            $JssorEasing$.$EaseInCubic,
            $JssorEasing$.$EaseOutCubic,
            $JssorEasing$.$EaseInOutCubic,
            $JssorEasing$.$EaseInQuart,
            $JssorEasing$.$EaseOutQuart,
            $JssorEasing$.$EaseInOutQuart,
            $JssorEasing$.$EaseInQuint,
            $JssorEasing$.$EaseOutQuint,
            $JssorEasing$.$EaseInOutQuint,
            $JssorEasing$.$EaseInSine,
            $JssorEasing$.$EaseOutSine,
            $JssorEasing$.$EaseInOutSine,
            $JssorEasing$.$EaseInExpo,
            $JssorEasing$.$EaseOutExpo,
            $JssorEasing$.$EaseInOutExpo,
            $JssorEasing$.$EaseInCirc,
            $JssorEasing$.$EaseOutCirc,
            $JssorEasing$.$EaseInOutCirc,
            $JssorEasing$.$EaseInElastic,
            $JssorEasing$.$EaseOutElastic,
            $JssorEasing$.$EaseInOutElastic,
            $JssorEasing$.$EaseInBack,
            $JssorEasing$.$EaseOutBack,
            $JssorEasing$.$EaseInOutBack,
            $JssorEasing$.$EaseInBounce,
            $JssorEasing$.$EaseOutBounce,
            $JssorEasing$.$EaseInOutBounce//,
            //$JssorEasing$.$EaseGoBack,
            //$JssorEasing$.$EaseInWave,
            //$JssorEasing$.$EaseOutWave,
            //$JssorEasing$.$EaseOutJump,
            //$JssorEasing$.$EaseInJump
        ];

        var translater = {
            $Top: "y",          //top
            $Left: "x",         //left
            $Bottom: "m",       //bottom
            $Right: "t",        //right
            $Zoom: "s",         //zoom/scale
            $Rotate: "r",       //rotate
            $Opacity: "o",      //opacity
            $Easing: "e",       //easing
            $ZIndex: "i",       //zindex
            $Round: "rd",       //round
            $During: "du",      //during
            $Duration: "d"//,   //duration
            //$Begin: "b"
        };

        $Jssor$.$Each(translater, function (prop, newProp) {
            _TransitionConverter[prop] = newProp;
        });

        CreateAnimators(GetCaptionItems(container, 1));
    }
};

//Event Table

//$EVT_CLICK = 21;			    function(slideIndex[, event])
//$EVT_DRAG_START = 22;		    function(position[, virtualPosition, event])
//$EVT_DRAG_END = 23;		    function(position, startPosition[, virtualPosition, virtualStartPosition, event])
//$EVT_SWIPE_START = 24;		function(position[, virtualPosition])
//$EVT_SWIPE_END = 25;		    function(position[, virtualPosition])

//$EVT_LOAD_START = 26;			function(slideIndex)
//$EVT_LOAD_END = 27;			function(slideIndex)

//$EVT_POSITION_CHANGE = 202;	function(position, fromPosition[, virtualPosition, virtualFromPosition])
//$EVT_PARK = 203;			    function(slideIndex, fromIndex)

//$EVT_PROGRESS_CHANGE = 208;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//$EVT_STATE_CHANGE = 209;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//$EVT_ROLLBACK_START = 210;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//$EVT_ROLLBACK_END = 211;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//$EVT_SLIDESHOW_START = 206;   function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])
//$EVT_SLIDESHOW_END = 207;     function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])

//http://www.jssor.com/development/reference-api.html
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqc3Nvci5zbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkpzc29yLmpzXCIgLz5cclxuXHJcbi8qXHJcbiogSnNzb3IuU2xpZGVyIDE5LjBcclxuKiBodHRwOi8vd3d3Lmpzc29yLmNvbS9cclxuKlxyXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcclxuKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4qIFxyXG4qIFRFUk1TIE9GIFVTRSAtIEpzc29yLlNsaWRlclxyXG4qIFxyXG4qIENvcHlyaWdodCAyMDE0IEpzc29yXHJcbipcclxuKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcclxuKiBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcclxuKiBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcclxuKiB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXHJcbiogZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXHJcbiogcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXHJcbiogdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4qIFxyXG4qIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXHJcbiogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiogXHJcbiogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcclxuKiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcclxuKiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxyXG4qIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkVcclxuKiBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXHJcbiogT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXHJcbiogV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG5cclxudmFyICRKc3NvclNsaWRlc2hvd0Zvcm1hdGlvbnMkID0gd2luZG93LiRKc3NvclNsaWRlc2hvd0Zvcm1hdGlvbnMkID0gbmV3IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfVGhpcyA9IHRoaXM7XHJcblxyXG4gICAgLy9Db25zdGFudHMgKysrKysrK1xyXG5cclxuICAgIHZhciBDT0xVTU5fSU5DUkVBU0UgPSAwO1xyXG4gICAgdmFyIENPTFVNTl9ERUNSRUFTRSA9IDE7XHJcbiAgICB2YXIgUk9XX0lOQ1JFQVNFID0gMjtcclxuICAgIHZhciBST1dfREVDUkVBU0UgPSAzO1xyXG5cclxuICAgIHZhciBESVJFQ1RJT05fSE9SSVpPTlRBTCA9IDB4MDAwMztcclxuICAgIHZhciBESVJFQ1RJT05fVkVSVElDQUwgPSAweDAwMEM7XHJcblxyXG4gICAgdmFyIFRPX0xFRlQgPSAweDAwMDE7XHJcbiAgICB2YXIgVE9fUklHSFQgPSAweDAwMDI7XHJcbiAgICB2YXIgVE9fVE9QID0gMHgwMDA0O1xyXG4gICAgdmFyIFRPX0JPVFRPTSA9IDB4MDAwODtcclxuXHJcbiAgICB2YXIgRlJPTV9MRUZUID0gMHgwMTAwO1xyXG4gICAgdmFyIEZST01fVE9QID0gMHgwMjAwO1xyXG4gICAgdmFyIEZST01fUklHSFQgPSAweDA0MDA7XHJcbiAgICB2YXIgRlJPTV9CT1RUT00gPSAweDA4MDA7XHJcblxyXG4gICAgdmFyIEFTU0VNQkxZX0JPVFRPTV9MRUZUID0gRlJPTV9CT1RUT00gKyBUT19MRUZUO1xyXG4gICAgdmFyIEFTU0VNQkxZX0JPVFRPTV9SSUdIVCA9IEZST01fQk9UVE9NICsgVE9fUklHSFQ7XHJcbiAgICB2YXIgQVNTRU1CTFlfVE9QX0xFRlQgPSBGUk9NX1RPUCArIFRPX0xFRlQ7XHJcbiAgICB2YXIgQVNTRU1CTFlfVE9QX1JJR0hUID0gRlJPTV9UT1AgKyBUT19SSUdIVDtcclxuICAgIHZhciBBU1NFTUJMWV9MRUZUX1RPUCA9IEZST01fTEVGVCArIFRPX1RPUDtcclxuICAgIHZhciBBU1NFTUJMWV9MRUZUX0JPVFRPTSA9IEZST01fTEVGVCArIFRPX0JPVFRPTTtcclxuICAgIHZhciBBU1NFTUJMWV9SSUdIVF9UT1AgPSBGUk9NX1JJR0hUICsgVE9fVE9QO1xyXG4gICAgdmFyIEFTU0VNQkxZX1JJR0hUX0JPVFRPTSA9IEZST01fUklHSFQgKyBUT19CT1RUT007XHJcblxyXG4gICAgLy9Db25zdGFudHMgLS0tLS0tLVxyXG5cclxuICAgIC8vRm9ybWF0aW9uIERlZmluaXRpb24gKysrKysrK1xyXG4gICAgZnVuY3Rpb24gaXNUb0xlZnQocm9hZFZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChyb2FkVmFsdWUgJiBUT19MRUZUKSA9PSBUT19MRUZUO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVG9SaWdodChyb2FkVmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKHJvYWRWYWx1ZSAmIFRPX1JJR0hUKSA9PSBUT19SSUdIVDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1RvVG9wKHJvYWRWYWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAocm9hZFZhbHVlICYgVE9fVE9QKSA9PSBUT19UT1A7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNUb0JvdHRvbShyb2FkVmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKHJvYWRWYWx1ZSAmIFRPX0JPVFRPTSkgPT0gVE9fQk9UVE9NO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFB1c2hGb3JtYXRpb25PcmRlcihhcnIsIG9yZGVyLCBmb3JtYXRpb25JdGVtKSB7XHJcbiAgICAgICAgZm9ybWF0aW9uSXRlbS5wdXNoKG9yZGVyKTtcclxuICAgICAgICBhcnJbb3JkZXJdID0gYXJyW29yZGVyXSB8fCBbXTtcclxuICAgICAgICBhcnJbb3JkZXJdLnB1c2goZm9ybWF0aW9uSXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJEZvcm1hdGlvblN0cmFpZ2h0ID0gZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcclxuICAgICAgICB2YXIgY29scyA9IHRyYW5zaXRpb24uJENvbHM7XHJcbiAgICAgICAgdmFyIHJvd3MgPSB0cmFuc2l0aW9uLiRSb3dzO1xyXG4gICAgICAgIHZhciBmb3JtYXRpb25EaXJlY3Rpb24gPSB0cmFuc2l0aW9uLiRBc3NlbWJseTtcclxuICAgICAgICB2YXIgY291bnQgPSB0cmFuc2l0aW9uLiRDb3VudDtcclxuICAgICAgICB2YXIgYSA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB2YXIgY29sID0gMDtcclxuICAgICAgICB2YXIgciA9IDA7XHJcbiAgICAgICAgdmFyIGNsID0gY29scyAtIDE7XHJcbiAgICAgICAgdmFyIHJsID0gcm93cyAtIDE7XHJcbiAgICAgICAgdmFyIGlsID0gY291bnQgLSAxO1xyXG4gICAgICAgIHZhciBjcjtcclxuICAgICAgICB2YXIgb3JkZXI7XHJcbiAgICAgICAgZm9yIChyID0gMDsgciA8IHJvd3M7IHIrKykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IGNvbHM7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjciA9IHIgKyAnLCcgKyBjb2w7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdGlvbkRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfQk9UVE9NX0xFRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyID0gaWwgLSAoY29sICogcm93cyArIChybCAtIHIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9SSUdIVF9UT1A6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyID0gaWwgLSAociAqIGNvbHMgKyAoY2wgLSBjb2wpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9UT1BfTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIgPSBpbCAtIChjb2wgKiByb3dzICsgcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9MRUZUX1RPUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIgPSBpbCAtIChyICogY29scyArIGNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfQk9UVE9NX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlciA9IGNvbCAqIHJvd3MgKyByO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0xFRlRfQk9UVE9NOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlciA9IHIgKiBjb2xzICsgKGNsIC0gY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9UT1BfUklHSFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyID0gY29sICogcm93cyArIChybCAtIHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlciA9IHIgKiBjb2xzICsgY29sO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy9BU1NFTUJMWV9SSUdIVF9CT1RUT01cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFB1c2hGb3JtYXRpb25PcmRlcihhLCBvcmRlciwgW3IsIGNvbF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEZvcm1hdGlvblN3aXJsID0gZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcclxuICAgICAgICB2YXIgY29scyA9IHRyYW5zaXRpb24uJENvbHM7XHJcbiAgICAgICAgdmFyIHJvd3MgPSB0cmFuc2l0aW9uLiRSb3dzO1xyXG4gICAgICAgIHZhciBmb3JtYXRpb25EaXJlY3Rpb24gPSB0cmFuc2l0aW9uLiRBc3NlbWJseTtcclxuICAgICAgICB2YXIgY291bnQgPSB0cmFuc2l0aW9uLiRDb3VudDtcclxuICAgICAgICB2YXIgYSA9IFtdO1xyXG4gICAgICAgIHZhciBoaXQgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgdmFyIGNvbCA9IDA7XHJcbiAgICAgICAgdmFyIHIgPSAwO1xyXG4gICAgICAgIHZhciBjbCA9IGNvbHMgLSAxO1xyXG4gICAgICAgIHZhciBybCA9IHJvd3MgLSAxO1xyXG4gICAgICAgIHZhciBpbCA9IGNvdW50IC0gMTtcclxuICAgICAgICB2YXIgY3I7XHJcbiAgICAgICAgdmFyIGNvdXJzZXM7XHJcbiAgICAgICAgdmFyIGNvdXJzZSA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChmb3JtYXRpb25EaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9CT1RUT01fTEVGVDpcclxuICAgICAgICAgICAgICAgIGNvbCA9IGNsO1xyXG4gICAgICAgICAgICAgICAgciA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzID0gW1JPV19JTkNSRUFTRSwgQ09MVU1OX0RFQ1JFQVNFLCBST1dfREVDUkVBU0UsIENPTFVNTl9JTkNSRUFTRV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9SSUdIVF9UT1A6XHJcbiAgICAgICAgICAgICAgICBjb2wgPSAwO1xyXG4gICAgICAgICAgICAgICAgciA9IHJsO1xyXG4gICAgICAgICAgICAgICAgY291cnNlcyA9IFtDT0xVTU5fSU5DUkVBU0UsIFJPV19ERUNSRUFTRSwgQ09MVU1OX0RFQ1JFQVNFLCBST1dfSU5DUkVBU0VdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfVE9QX0xFRlQ6XHJcbiAgICAgICAgICAgICAgICBjb2wgPSBjbDtcclxuICAgICAgICAgICAgICAgIHIgPSBybDtcclxuICAgICAgICAgICAgICAgIGNvdXJzZXMgPSBbUk9XX0RFQ1JFQVNFLCBDT0xVTU5fREVDUkVBU0UsIFJPV19JTkNSRUFTRSwgQ09MVU1OX0lOQ1JFQVNFXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0xFRlRfVE9QOlxyXG4gICAgICAgICAgICAgICAgY29sID0gY2w7XHJcbiAgICAgICAgICAgICAgICByID0gcmw7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzID0gW0NPTFVNTl9ERUNSRUFTRSwgUk9XX0RFQ1JFQVNFLCBDT0xVTU5fSU5DUkVBU0UsIFJPV19JTkNSRUFTRV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9CT1RUT01fUklHSFQ6XHJcbiAgICAgICAgICAgICAgICBjb2wgPSAwO1xyXG4gICAgICAgICAgICAgICAgciA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzID0gW1JPV19JTkNSRUFTRSwgQ09MVU1OX0lOQ1JFQVNFLCBST1dfREVDUkVBU0UsIENPTFVNTl9ERUNSRUFTRV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9MRUZUX0JPVFRPTTpcclxuICAgICAgICAgICAgICAgIGNvbCA9IGNsO1xyXG4gICAgICAgICAgICAgICAgciA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzID0gW0NPTFVNTl9ERUNSRUFTRSwgUk9XX0lOQ1JFQVNFLCBDT0xVTU5fSU5DUkVBU0UsIFJPV19ERUNSRUFTRV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9UT1BfUklHSFQ6XHJcbiAgICAgICAgICAgICAgICBjb2wgPSAwO1xyXG4gICAgICAgICAgICAgICAgciA9IHJsO1xyXG4gICAgICAgICAgICAgICAgY291cnNlcyA9IFtST1dfREVDUkVBU0UsIENPTFVNTl9JTkNSRUFTRSwgUk9XX0lOQ1JFQVNFLCBDT0xVTU5fREVDUkVBU0VdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb2wgPSAwO1xyXG4gICAgICAgICAgICAgICAgciA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzID0gW0NPTFVNTl9JTkNSRUFTRSwgUk9XX0lOQ1JFQVNFLCBDT0xVTU5fREVDUkVBU0UsIFJPV19ERUNSRUFTRV07XHJcbiAgICAgICAgICAgICAgICBicmVhazsgLy9BU1NFTUJMWV9SSUdIVF9CT1RUT01cclxuICAgICAgICB9XHJcbiAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGkgPCBjb3VudCkge1xyXG4gICAgICAgICAgICBjciA9IHIgKyAnLCcgKyBjb2w7XHJcbiAgICAgICAgICAgIGlmIChjb2wgPj0gMCAmJiBjb2wgPCBjb2xzICYmIHIgPj0gMCAmJiByIDwgcm93cyAmJiAhaGl0W2NyXSkge1xyXG4gICAgICAgICAgICAgICAgLy9hW2NyXSA9IGkrKztcclxuICAgICAgICAgICAgICAgIGhpdFtjcl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgUHVzaEZvcm1hdGlvbk9yZGVyKGEsIGkrKywgW3IsIGNvbF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb3Vyc2VzW2NvdXJzZSsrICUgY291cnNlcy5sZW5ndGhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDT0xVTU5fSU5DUkVBU0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFJPV19JTkNSRUFTRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgci0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENPTFVNTl9ERUNSRUFTRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUk9XX0RFQ1JFQVNFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvdXJzZXNbY291cnNlICUgY291cnNlcy5sZW5ndGhdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENPTFVNTl9JTkNSRUFTRTpcclxuICAgICAgICAgICAgICAgICAgICBjb2wrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUk9XX0lOQ1JFQVNFOlxyXG4gICAgICAgICAgICAgICAgICAgIHIrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQ09MVU1OX0RFQ1JFQVNFOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBST1dfREVDUkVBU0U6XHJcbiAgICAgICAgICAgICAgICAgICAgci0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kRm9ybWF0aW9uWmlnWmFnID0gZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcclxuICAgICAgICB2YXIgY29scyA9IHRyYW5zaXRpb24uJENvbHM7XHJcbiAgICAgICAgdmFyIHJvd3MgPSB0cmFuc2l0aW9uLiRSb3dzO1xyXG4gICAgICAgIHZhciBmb3JtYXRpb25EaXJlY3Rpb24gPSB0cmFuc2l0aW9uLiRBc3NlbWJseTtcclxuICAgICAgICB2YXIgY291bnQgPSB0cmFuc2l0aW9uLiRDb3VudDtcclxuICAgICAgICB2YXIgYSA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB2YXIgY29sID0gMDtcclxuICAgICAgICB2YXIgciA9IDA7XHJcbiAgICAgICAgdmFyIGNsID0gY29scyAtIDE7XHJcbiAgICAgICAgdmFyIHJsID0gcm93cyAtIDE7XHJcbiAgICAgICAgdmFyIGlsID0gY291bnQgLSAxO1xyXG4gICAgICAgIHZhciBjcjtcclxuICAgICAgICB2YXIgY291cnNlcztcclxuICAgICAgICB2YXIgY291cnNlID0gMDtcclxuICAgICAgICBzd2l0Y2ggKGZvcm1hdGlvbkRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0JPVFRPTV9MRUZUOlxyXG4gICAgICAgICAgICAgICAgY29sID0gY2w7XHJcbiAgICAgICAgICAgICAgICByID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdXJzZXMgPSBbUk9XX0lOQ1JFQVNFLCBDT0xVTU5fREVDUkVBU0UsIFJPV19ERUNSRUFTRSwgQ09MVU1OX0RFQ1JFQVNFXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFTU0VNQkxZX1JJR0hUX1RPUDpcclxuICAgICAgICAgICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgICAgICAgICByID0gcmw7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzID0gW0NPTFVNTl9JTkNSRUFTRSwgUk9XX0RFQ1JFQVNFLCBDT0xVTU5fREVDUkVBU0UsIFJPV19ERUNSRUFTRV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9UT1BfTEVGVDpcclxuICAgICAgICAgICAgICAgIGNvbCA9IGNsO1xyXG4gICAgICAgICAgICAgICAgciA9IHJsO1xyXG4gICAgICAgICAgICAgICAgY291cnNlcyA9IFtST1dfREVDUkVBU0UsIENPTFVNTl9ERUNSRUFTRSwgUk9XX0lOQ1JFQVNFLCBDT0xVTU5fREVDUkVBU0VdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfTEVGVF9UT1A6XHJcbiAgICAgICAgICAgICAgICBjb2wgPSBjbDtcclxuICAgICAgICAgICAgICAgIHIgPSBybDtcclxuICAgICAgICAgICAgICAgIGNvdXJzZXMgPSBbQ09MVU1OX0RFQ1JFQVNFLCBST1dfREVDUkVBU0UsIENPTFVNTl9JTkNSRUFTRSwgUk9XX0RFQ1JFQVNFXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0JPVFRPTV9SSUdIVDpcclxuICAgICAgICAgICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgICAgICAgICByID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdXJzZXMgPSBbUk9XX0lOQ1JFQVNFLCBDT0xVTU5fSU5DUkVBU0UsIFJPV19ERUNSRUFTRSwgQ09MVU1OX0lOQ1JFQVNFXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0xFRlRfQk9UVE9NOlxyXG4gICAgICAgICAgICAgICAgY29sID0gY2w7XHJcbiAgICAgICAgICAgICAgICByID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdXJzZXMgPSBbQ09MVU1OX0RFQ1JFQVNFLCBST1dfSU5DUkVBU0UsIENPTFVNTl9JTkNSRUFTRSwgUk9XX0lOQ1JFQVNFXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFTU0VNQkxZX1RPUF9SSUdIVDpcclxuICAgICAgICAgICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgICAgICAgICByID0gcmw7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzID0gW1JPV19ERUNSRUFTRSwgQ09MVU1OX0lOQ1JFQVNFLCBST1dfSU5DUkVBU0UsIENPTFVNTl9JTkNSRUFTRV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgICAgICAgICByID0gMDtcclxuICAgICAgICAgICAgICAgIGNvdXJzZXMgPSBbQ09MVU1OX0lOQ1JFQVNFLCBST1dfSU5DUkVBU0UsIENPTFVNTl9ERUNSRUFTRSwgUk9XX0lOQ1JFQVNFXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyAvL0FTU0VNQkxZX1JJR0hUX0JPVFRPTVxyXG4gICAgICAgIH1cclxuICAgICAgICBpID0gMDtcclxuICAgICAgICB3aGlsZSAoaSA8IGNvdW50KSB7XHJcbiAgICAgICAgICAgIGNyID0gciArICcsJyArIGNvbDtcclxuICAgICAgICAgICAgaWYgKGNvbCA+PSAwICYmIGNvbCA8IGNvbHMgJiYgciA+PSAwICYmIHIgPCByb3dzICYmIHR5cGVvZiAoYVtjcl0pID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBQdXNoRm9ybWF0aW9uT3JkZXIoYSwgaSsrLCBbciwgY29sXSk7XHJcbiAgICAgICAgICAgICAgICAvL2FbY3JdID0gaSsrO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb3Vyc2VzW2NvdXJzZSAlIGNvdXJzZXMubGVuZ3RoXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09MVU1OX0lOQ1JFQVNFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBST1dfSU5DUkVBU0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDT0xVTU5fREVDUkVBU0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFJPV19ERUNSRUFTRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgci0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY291cnNlc1tjb3Vyc2UrKyAlIGNvdXJzZXMubGVuZ3RoXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09MVU1OX0lOQ1JFQVNFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBST1dfSU5DUkVBU0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHItLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDT0xVTU5fREVDUkVBU0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFJPV19ERUNSRUFTRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY291cnNlc1tjb3Vyc2UrKyAlIGNvdXJzZXMubGVuZ3RoXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ09MVU1OX0lOQ1JFQVNFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBST1dfSU5DUkVBU0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDT0xVTU5fREVDUkVBU0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFJPV19ERUNSRUFTRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgci0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEZvcm1hdGlvblN0cmFpZ2h0U3RhaXJzID0gZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcclxuICAgICAgICB2YXIgY29scyA9IHRyYW5zaXRpb24uJENvbHM7XHJcbiAgICAgICAgdmFyIHJvd3MgPSB0cmFuc2l0aW9uLiRSb3dzO1xyXG4gICAgICAgIHZhciBmb3JtYXRpb25EaXJlY3Rpb24gPSB0cmFuc2l0aW9uLiRBc3NlbWJseTtcclxuICAgICAgICB2YXIgY291bnQgPSB0cmFuc2l0aW9uLiRDb3VudDtcclxuICAgICAgICB2YXIgYSA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB2YXIgY29sID0gMDtcclxuICAgICAgICB2YXIgciA9IDA7XHJcbiAgICAgICAgdmFyIGNsID0gY29scyAtIDE7XHJcbiAgICAgICAgdmFyIHJsID0gcm93cyAtIDE7XHJcbiAgICAgICAgdmFyIGlsID0gY291bnQgLSAxO1xyXG4gICAgICAgIHZhciBjcjtcclxuICAgICAgICBzd2l0Y2ggKGZvcm1hdGlvbkRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0JPVFRPTV9MRUZUOlxyXG4gICAgICAgICAgICBjYXNlIEFTU0VNQkxZX1RPUF9SSUdIVDpcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9UT1BfTEVGVDpcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9CT1RUT01fUklHSFQ6XHJcbiAgICAgICAgICAgICAgICB2YXIgQyA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgUiA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9MRUZUX0JPVFRPTTpcclxuICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9SSUdIVF9UT1A6XHJcbiAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfTEVGVF9UT1A6XHJcbiAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfUklHSFRfQk9UVE9NOlxyXG4gICAgICAgICAgICAgICAgdmFyIEMgPSBjbDtcclxuICAgICAgICAgICAgICAgIHZhciBSID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZm9ybWF0aW9uRGlyZWN0aW9uID0gQVNTRU1CTFlfUklHSFRfQk9UVE9NO1xyXG4gICAgICAgICAgICAgICAgdmFyIEMgPSBjbDtcclxuICAgICAgICAgICAgICAgIHZhciBSID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2wgPSBDO1xyXG4gICAgICAgIHIgPSBSO1xyXG4gICAgICAgIHdoaWxlIChpIDwgY291bnQpIHtcclxuICAgICAgICAgICAgY3IgPSByICsgJywnICsgY29sO1xyXG4gICAgICAgICAgICBpZiAoaXNUb1RvcChmb3JtYXRpb25EaXJlY3Rpb24pIHx8IGlzVG9SaWdodChmb3JtYXRpb25EaXJlY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICBQdXNoRm9ybWF0aW9uT3JkZXIoYSwgaWwgLSBpKyssIFtyLCBjb2xdKTtcclxuICAgICAgICAgICAgICAgIC8vYVtjcl0gPSBpbCAtIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFB1c2hGb3JtYXRpb25PcmRlcihhLCBpKyssIFtyLCBjb2xdKTtcclxuICAgICAgICAgICAgICAgIC8vYVtjcl0gPSBpKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChmb3JtYXRpb25EaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfQk9UVE9NX0xFRlQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEFTU0VNQkxZX1RPUF9SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICBjb2wtLTtcclxuICAgICAgICAgICAgICAgICAgICByKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEFTU0VNQkxZX1RPUF9MRUZUOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9CT1RUT01fUklHSFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29sKys7XHJcbiAgICAgICAgICAgICAgICAgICAgci0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9MRUZUX0JPVFRPTTpcclxuICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfUklHSFRfVE9QOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHItLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfUklHSFRfQk9UVE9NOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9MRUZUX1RPUDpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29sKys7XHJcbiAgICAgICAgICAgICAgICAgICAgcisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb2wgPCAwIHx8IHIgPCAwIHx8IGNvbCA+IGNsIHx8IHIgPiBybCkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXRpb25EaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0JPVFRPTV9MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfVE9QX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfTEVGVF9CT1RUT006XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9SSUdIVF9UT1A6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9UT1BfTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0JPVFRPTV9SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgUisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEFTU0VNQkxZX1JJR0hUX0JPVFRPTTpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEFTU0VNQkxZX0xFRlRfVE9QOlxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoQyA8IDAgfHwgUiA8IDAgfHwgQyA+IGNsIHx8IFIgPiBybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9ybWF0aW9uRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfQk9UVE9NX0xFRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfVE9QX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQyA9IGNsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfVE9QX0xFRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfQk9UVE9NX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUiA9IHJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfTEVGVF9CT1RUT006XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQVNTRU1CTFlfUklHSFRfVE9QOiBSID0gcmw7IEMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEFTU0VNQkxZX1JJR0hUX0JPVFRPTTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBBU1NFTUJMWV9MRUZUX1RPUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSID4gcmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFIgPSBybDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChSIDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgUiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQyA+IGNsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDID0gY2w7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQyA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEMgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgciA9IFI7XHJcbiAgICAgICAgICAgICAgICBjb2wgPSBDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kRm9ybWF0aW9uU3F1YXJlID0gZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcclxuICAgICAgICB2YXIgY29scyA9IHRyYW5zaXRpb24uJENvbHMgfHwgMTtcclxuICAgICAgICB2YXIgcm93cyA9IHRyYW5zaXRpb24uJFJvd3MgfHwgMTtcclxuICAgICAgICB2YXIgYXJyID0gW107XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIHZhciBjb2w7XHJcbiAgICAgICAgdmFyIHI7XHJcbiAgICAgICAgdmFyIGRjO1xyXG4gICAgICAgIHZhciBkcjtcclxuICAgICAgICB2YXIgY3I7XHJcbiAgICAgICAgZGMgPSBjb2xzIDwgcm93cyA/IChyb3dzIC0gY29scykgLyAyIDogMDtcclxuICAgICAgICBkciA9IGNvbHMgPiByb3dzID8gKGNvbHMgLSByb3dzKSAvIDIgOiAwO1xyXG4gICAgICAgIGNyID0gTWF0aC5yb3VuZChNYXRoLm1heChjb2xzIC8gMiwgcm93cyAvIDIpKSArIDE7XHJcbiAgICAgICAgZm9yIChjb2wgPSAwOyBjb2wgPCBjb2xzOyBjb2wrKykge1xyXG4gICAgICAgICAgICBmb3IgKHIgPSAwOyByIDwgcm93czsgcisrKVxyXG4gICAgICAgICAgICAgICAgUHVzaEZvcm1hdGlvbk9yZGVyKGFyciwgY3IgLSBNYXRoLm1pbihjb2wgKyAxICsgZGMsIHIgKyAxICsgZHIsIGNvbHMgLSBjb2wgKyBkYywgcm93cyAtIHIgKyBkciksIFtyLCBjb2xdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEZvcm1hdGlvblJlY3RhbmdsZSA9IGZ1bmN0aW9uICh0cmFuc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIGNvbHMgPSB0cmFuc2l0aW9uLiRDb2xzIHx8IDE7XHJcbiAgICAgICAgdmFyIHJvd3MgPSB0cmFuc2l0aW9uLiRSb3dzIHx8IDE7XHJcbiAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB2YXIgY29sO1xyXG4gICAgICAgIHZhciByO1xyXG4gICAgICAgIHZhciBjcjtcclxuICAgICAgICBjciA9IE1hdGgucm91bmQoTWF0aC5taW4oY29scyAvIDIsIHJvd3MgLyAyKSkgKyAxO1xyXG4gICAgICAgIGZvciAoY29sID0gMDsgY29sIDwgY29sczsgY29sKyspIHtcclxuICAgICAgICAgICAgZm9yIChyID0gMDsgciA8IHJvd3M7IHIrKylcclxuICAgICAgICAgICAgICAgIFB1c2hGb3JtYXRpb25PcmRlcihhcnIsIGNyIC0gTWF0aC5taW4oY29sICsgMSwgciArIDEsIGNvbHMgLSBjb2wsIHJvd3MgLSByKSwgW3IsIGNvbF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kRm9ybWF0aW9uUmFuZG9tID0gZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcclxuICAgICAgICB2YXIgYSA9IFtdO1xyXG4gICAgICAgIHZhciByLCBjb2wsIGk7XHJcbiAgICAgICAgZm9yIChyID0gMDsgciA8IHRyYW5zaXRpb24uJFJvd3M7IHIrKykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IHRyYW5zaXRpb24uJENvbHM7IGNvbCsrKVxyXG4gICAgICAgICAgICAgICAgUHVzaEZvcm1hdGlvbk9yZGVyKGEsIE1hdGguY2VpbCgxMDAwMDAgKiBNYXRoLnJhbmRvbSgpKSAlIDEzLCBbciwgY29sXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEZvcm1hdGlvbkNpcmNsZSA9IGZ1bmN0aW9uICh0cmFuc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIGNvbHMgPSB0cmFuc2l0aW9uLiRDb2xzIHx8IDE7XHJcbiAgICAgICAgdmFyIHJvd3MgPSB0cmFuc2l0aW9uLiRSb3dzIHx8IDE7XHJcbiAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB2YXIgY29sO1xyXG4gICAgICAgIHZhciByO1xyXG4gICAgICAgIHZhciBoYyA9IGNvbHMgLyAyIC0gMC41O1xyXG4gICAgICAgIHZhciBociA9IHJvd3MgLyAyIC0gMC41O1xyXG4gICAgICAgIGZvciAoY29sID0gMDsgY29sIDwgY29sczsgY29sKyspIHtcclxuICAgICAgICAgICAgZm9yIChyID0gMDsgciA8IHJvd3M7IHIrKylcclxuICAgICAgICAgICAgICAgIFB1c2hGb3JtYXRpb25PcmRlcihhcnIsIE1hdGgucm91bmQoTWF0aC5zcXJ0KE1hdGgucG93KGNvbCAtIGhjLCAyKSArIE1hdGgucG93KHIgLSBociwgMikpKSwgW3IsIGNvbF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kRm9ybWF0aW9uQ3Jvc3MgPSBmdW5jdGlvbiAodHJhbnNpdGlvbikge1xyXG4gICAgICAgIHZhciBjb2xzID0gdHJhbnNpdGlvbi4kQ29scyB8fCAxO1xyXG4gICAgICAgIHZhciByb3dzID0gdHJhbnNpdGlvbi4kUm93cyB8fCAxO1xyXG4gICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgdmFyIGNvbDtcclxuICAgICAgICB2YXIgcjtcclxuICAgICAgICB2YXIgaGMgPSBjb2xzIC8gMiAtIDAuNTtcclxuICAgICAgICB2YXIgaHIgPSByb3dzIC8gMiAtIDAuNTtcclxuICAgICAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IGNvbHM7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAociA9IDA7IHIgPCByb3dzOyByKyspXHJcbiAgICAgICAgICAgICAgICBQdXNoRm9ybWF0aW9uT3JkZXIoYXJyLCBNYXRoLnJvdW5kKE1hdGgubWluKE1hdGguYWJzKGNvbCAtIGhjKSwgTWF0aC5hYnMociAtIGhyKSkpLCBbciwgY29sXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRGb3JtYXRpb25SZWN0YW5nbGVDcm9zcyA9IGZ1bmN0aW9uICh0cmFuc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIGNvbHMgPSB0cmFuc2l0aW9uLiRDb2xzIHx8IDE7XHJcbiAgICAgICAgdmFyIHJvd3MgPSB0cmFuc2l0aW9uLiRSb3dzIHx8IDE7XHJcbiAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB2YXIgY29sO1xyXG4gICAgICAgIHZhciByO1xyXG4gICAgICAgIHZhciBoYyA9IGNvbHMgLyAyIC0gMC41O1xyXG4gICAgICAgIHZhciBociA9IHJvd3MgLyAyIC0gMC41O1xyXG4gICAgICAgIHZhciBjciA9IE1hdGgubWF4KGhjLCBocikgKyAxO1xyXG4gICAgICAgIGZvciAoY29sID0gMDsgY29sIDwgY29sczsgY29sKyspIHtcclxuICAgICAgICAgICAgZm9yIChyID0gMDsgciA8IHJvd3M7IHIrKylcclxuICAgICAgICAgICAgICAgIFB1c2hGb3JtYXRpb25PcmRlcihhcnIsIE1hdGgucm91bmQoY3IgLSBNYXRoLm1heChoYyAtIE1hdGguYWJzKGNvbCAtIGhjKSwgaHIgLSBNYXRoLmFicyhyIC0gaHIpKSkgLSAxLCBbciwgY29sXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9O1xyXG59O1xyXG5cclxudmFyICRKc3NvclNsaWRlc2hvd1J1bm5lciQgPSB3aW5kb3cuJEpzc29yU2xpZGVzaG93UnVubmVyJCA9IGZ1bmN0aW9uIChzbGlkZUNvbnRhaW5lciwgc2xpZGVDb250YWluZXJXaWR0aCwgc2xpZGVDb250YWluZXJIZWlnaHQsIHNsaWRlc2hvd09wdGlvbnMsIGlzVG91Y2hEZXZpY2UpIHtcclxuXHJcbiAgICB2YXIgX1NlbGZTbGlkZXNob3dSdW5uZXIgPSB0aGlzO1xyXG5cclxuICAgIC8vdmFyIF9TdGF0ZSA9IDA7IC8vLTEgZnVsbGZpbGwsIDAgY2xlYW4sIDEgaW5pdGlhbGl6aW5nLCAyIHN0YXksIDMgcGxheWluZ1xyXG4gICAgdmFyIF9FbmRUaW1lO1xyXG5cclxuICAgIHZhciBfU2xpZGVyRnJhbWVDb3VudDtcclxuXHJcbiAgICB2YXIgX1NsaWRlc2hvd1BsYXllckJlbG93O1xyXG4gICAgdmFyIF9TbGlkZXNob3dQbGF5ZXJBYm92ZTtcclxuXHJcbiAgICB2YXIgX1ByZXZJdGVtO1xyXG4gICAgdmFyIF9TbGlkZUl0ZW07XHJcblxyXG4gICAgdmFyIF9UcmFuc2l0aW9uSW5kZXggPSAwO1xyXG4gICAgdmFyIF9UcmFuc2l0aW9uc09yZGVyID0gc2xpZGVzaG93T3B0aW9ucy4kVHJhbnNpdGlvbnNPcmRlcjtcclxuXHJcbiAgICB2YXIgX1NsaWRlc2hvd1RyYW5zaXRpb247XHJcblxyXG4gICAgdmFyIF9TbGlkZXNob3dQZXJmb3JtYW5jZSA9IDg7XHJcblxyXG4gICAgLy8jcmVnaW9uIFByaXZhdGUgTWV0aG9kc1xyXG4gICAgZnVuY3Rpb24gRW5zdXJlVHJhbnNpdGlvbkluc3RhbmNlKG9wdGlvbnMsIHNsaWRlc2hvd0ludGVydmFsKSB7XHJcblxyXG4gICAgICAgIHZhciBzbGlkZXNob3dUcmFuc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAkSW50ZXJ2YWw6IHNsaWRlc2hvd0ludGVydmFsLCAgLy9EZWxheSB0byBwbGF5IG5leHQgZnJhbWVcclxuICAgICAgICAgICAgJER1cmF0aW9uOiAxLCAvL0R1cmF0aW9uIHRvIGZpbmlzaCB0aGUgZW50aXJlIHRyYW5zaXRpb25cclxuICAgICAgICAgICAgJERlbGF5OiAwLCAgLy9EZWxheSB0byBhc3NlbWJseSBibG9ja3NcclxuICAgICAgICAgICAgJENvbHM6IDEsICAgLy9OdW1iZXIgb2YgY29sdW1uc1xyXG4gICAgICAgICAgICAkUm93czogMSwgICAvL051bWJlciBvZiByb3dzXHJcbiAgICAgICAgICAgICRPcGFjaXR5OiAwLCAgIC8vRmFkZSBibG9jayBvciBub3RcclxuICAgICAgICAgICAgJFpvb206IDAsICAgLy9ab29tIGJsb2NrIG9yIG5vdFxyXG4gICAgICAgICAgICAkQ2xpcDogMCwgICAvL0NsaXAgYmxvY2sgb3Igbm90XHJcbiAgICAgICAgICAgICRNb3ZlOiBmYWxzZSwgICAvL01vdmUgYmxvY2sgb3Igbm90XHJcbiAgICAgICAgICAgICRTbGlkZU91dDogZmFsc2UsICAgLy9TbGlkZSB0aGUgcHJldmlvdXMgc2xpZGUgb3V0IHRvIGRpc3BsYXkgbmV4dCBzbGlkZSBpbnN0ZWFkXHJcbiAgICAgICAgICAgIC8vJEZseURpcmVjdGlvbjogMCwgICAvL1NwZWNpZnkgZmx5IHRyYW5zZm9ybSB3aXRoIGRpcmVjdGlvblxyXG4gICAgICAgICAgICAkUmV2ZXJzZTogZmFsc2UsICAgIC8vUmV2ZXJzZSB0aGUgYXNzZW1ibHkgb3Igbm90XHJcbiAgICAgICAgICAgICRGb3JtYXRpb246ICRKc3NvclNsaWRlc2hvd0Zvcm1hdGlvbnMkLiRGb3JtYXRpb25SYW5kb20sICAgIC8vU2hhcGUgdGhhdCBhc3NlbWJseSBibG9ja3MgYXNcclxuICAgICAgICAgICAgJEFzc2VtYmx5OiAweDA0MDgsICAgLy9UaGUgd2F5IHRvIGFzc2VtYmx5IGJsb2NrcyBBU1NFTUJMWV9SSUdIVF9CT1RUT01cclxuICAgICAgICAgICAgJENoZXNzTW9kZTogeyAkQ29sdW1uOiAwLCAkUm93OiAwIH0sICAgIC8vQ2hlc3MgbW92ZSBvciBmbHkgZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICRFYXNpbmc6ICRKc3NvckVhc2luZyQuJEVhc2VTd2luZywgIC8vU3BlY2lmeSB2YXJpYXRpb24gb2Ygc3BlZWQgZHVyaW5nIHRyYW5zaXRpb25cclxuICAgICAgICAgICAgJFJvdW5kOiB7fSxcclxuICAgICAgICAgICAgJEJsb2NrczogW10sXHJcbiAgICAgICAgICAgICREdXJpbmc6IHt9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJEpzc29yJC4kRXh0ZW5kKHNsaWRlc2hvd1RyYW5zaXRpb24sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBzbGlkZXNob3dUcmFuc2l0aW9uLiRDb3VudCA9IHNsaWRlc2hvd1RyYW5zaXRpb24uJENvbHMgKiBzbGlkZXNob3dUcmFuc2l0aW9uLiRSb3dzO1xyXG4gICAgICAgIGlmICgkSnNzb3IkLiRJc0Z1bmN0aW9uKHNsaWRlc2hvd1RyYW5zaXRpb24uJEVhc2luZykpXHJcbiAgICAgICAgICAgIHNsaWRlc2hvd1RyYW5zaXRpb24uJEVhc2luZyA9IHsgJERlZmF1bHQ6IHNsaWRlc2hvd1RyYW5zaXRpb24uJEVhc2luZyB9O1xyXG5cclxuICAgICAgICBzbGlkZXNob3dUcmFuc2l0aW9uLiRGcmFtZXNDb3VudCA9IE1hdGguY2VpbChzbGlkZXNob3dUcmFuc2l0aW9uLiREdXJhdGlvbiAvIHNsaWRlc2hvd1RyYW5zaXRpb24uJEludGVydmFsKTtcclxuXHJcbiAgICAgICAgc2xpZGVzaG93VHJhbnNpdGlvbi4kR2V0QmxvY2tzID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAgICAgd2lkdGggLz0gc2xpZGVzaG93VHJhbnNpdGlvbi4kQ29scztcclxuICAgICAgICAgICAgaGVpZ2h0IC89IHNsaWRlc2hvd1RyYW5zaXRpb24uJFJvd3M7XHJcbiAgICAgICAgICAgIHZhciB3aCA9IHdpZHRoICsgJ3gnICsgaGVpZ2h0O1xyXG4gICAgICAgICAgICBpZiAoIXNsaWRlc2hvd1RyYW5zaXRpb24uJEJsb2Nrc1t3aF0pIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc2hvd1RyYW5zaXRpb24uJEJsb2Nrc1t3aF0gPSB7ICRXaWR0aDogd2lkdGgsICRIZWlnaHQ6IGhlaWdodCB9O1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgc2xpZGVzaG93VHJhbnNpdGlvbi4kQ29sczsgY29sKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHNsaWRlc2hvd1RyYW5zaXRpb24uJFJvd3M7IHIrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzaG93VHJhbnNpdGlvbi4kQmxvY2tzW3doXVtyICsgJywnICsgY29sXSA9IHsgJFRvcDogciAqIGhlaWdodCwgJFJpZ2h0OiBjb2wgKiB3aWR0aCArIHdpZHRoLCAkQm90dG9tOiByICogaGVpZ2h0ICsgaGVpZ2h0LCAkTGVmdDogY29sICogd2lkdGggfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNsaWRlc2hvd1RyYW5zaXRpb24uJEJsb2Nrc1t3aF07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHNsaWRlc2hvd1RyYW5zaXRpb24uJEJyb3RoZXIpIHtcclxuICAgICAgICAgICAgc2xpZGVzaG93VHJhbnNpdGlvbi4kQnJvdGhlciA9IEVuc3VyZVRyYW5zaXRpb25JbnN0YW5jZShzbGlkZXNob3dUcmFuc2l0aW9uLiRCcm90aGVyLCBzbGlkZXNob3dJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHNsaWRlc2hvd1RyYW5zaXRpb24uJFNsaWRlT3V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbGlkZXNob3dUcmFuc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFByaXZhdGUgQ2xhc3Nlc1xyXG4gICAgZnVuY3Rpb24gSnNzb3JTbGlkZXNob3dQbGF5ZXIoc2xpZGVDb250YWluZXIsIHNsaWRlRWxlbWVudCwgc2xpZGVUcmFuc2l0aW9uLCBiZWdpblRpbWUsIHNsaWRlQ29udGFpbmVyV2lkdGgsIHNsaWRlQ29udGFpbmVySGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIF9TZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIF9CbG9jaztcclxuICAgICAgICB2YXIgX1N0YXJ0U3R5bGVzQXJyID0ge307XHJcbiAgICAgICAgdmFyIF9BbmltYXRpb25TdHlsZXNBcnJzID0ge307XHJcbiAgICAgICAgdmFyIF9BbmltYXRpb25CbG9ja0l0ZW1zID0gW107XHJcbiAgICAgICAgdmFyIF9TdHlsZVN0YXJ0O1xyXG4gICAgICAgIHZhciBfU3R5bGVFbmQ7XHJcbiAgICAgICAgdmFyIF9TdHlsZURpZjtcclxuICAgICAgICB2YXIgX0NoZXNzTW9kZUNvbHVtbiA9IHNsaWRlVHJhbnNpdGlvbi4kQ2hlc3NNb2RlLiRDb2x1bW4gfHwgMDtcclxuICAgICAgICB2YXIgX0NoZXNzTW9kZVJvdyA9IHNsaWRlVHJhbnNpdGlvbi4kQ2hlc3NNb2RlLiRSb3cgfHwgMDtcclxuXHJcbiAgICAgICAgdmFyIF9CbG9ja3MgPSBzbGlkZVRyYW5zaXRpb24uJEdldEJsb2NrcyhzbGlkZUNvbnRhaW5lcldpZHRoLCBzbGlkZUNvbnRhaW5lckhlaWdodCk7XHJcbiAgICAgICAgdmFyIF9Gb3JtYXRpb25JbnN0YW5jZSA9IEdldEZvcm1hdGlvbihzbGlkZVRyYW5zaXRpb24pO1xyXG4gICAgICAgIHZhciBfTWF4T3JkZXIgPSBfRm9ybWF0aW9uSW5zdGFuY2UubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgX1BlcmlvZCA9IHNsaWRlVHJhbnNpdGlvbi4kRHVyYXRpb24gKyBzbGlkZVRyYW5zaXRpb24uJERlbGF5ICogX01heE9yZGVyO1xyXG4gICAgICAgIHZhciBfRW5kVGltZSA9IGJlZ2luVGltZSArIF9QZXJpb2Q7XHJcblxyXG4gICAgICAgIHZhciBfU2xpZGVPdXQgPSBzbGlkZVRyYW5zaXRpb24uJFNsaWRlT3V0O1xyXG4gICAgICAgIHZhciBfSXNJbjtcclxuXHJcbiAgICAgICAgLy9fRW5kVGltZSArPSAkSnNzb3IkLiRJc0Jyb3dzZXJDaHJvbWUoKSA/IDI2MCA6IDUwO1xyXG4gICAgICAgIF9FbmRUaW1lICs9IDUwO1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gUHJpdmF0ZSBNZXRob2RzXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEdldEZvcm1hdGlvbih0cmFuc2l0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybWF0aW9uSW5zdGFuY2UgPSB0cmFuc2l0aW9uLiRGb3JtYXRpb24odHJhbnNpdGlvbik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbi4kUmV2ZXJzZSA/IGZvcm1hdGlvbkluc3RhbmNlLnJldmVyc2UoKSA6IGZvcm1hdGlvbkluc3RhbmNlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIF9TZWxmLiRFbmRUaW1lID0gX0VuZFRpbWU7XHJcblxyXG4gICAgICAgIF9TZWxmLiRTaG93RnJhbWUgPSBmdW5jdGlvbiAodGltZSkge1xyXG4gICAgICAgICAgICB0aW1lIC09IGJlZ2luVGltZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc0luID0gdGltZSA8IF9QZXJpb2Q7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNJbiB8fCBfSXNJbikge1xyXG4gICAgICAgICAgICAgICAgX0lzSW4gPSBpc0luO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghX1NsaWRlT3V0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSBfUGVyaW9kIC0gdGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZnJhbWVJbmRleCA9IE1hdGguY2VpbCh0aW1lIC8gc2xpZGVUcmFuc2l0aW9uLiRJbnRlcnZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kRWFjaChfQW5pbWF0aW9uU3R5bGVzQXJycywgZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbUZyYW1lSW5kZXggPSBNYXRoLm1heChmcmFtZUluZGV4LCB2YWx1ZS4kTWluKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtRnJhbWVJbmRleCA9IE1hdGgubWluKGl0ZW1GcmFtZUluZGV4LCB2YWx1ZS5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLiRMYXN0RnJhbWVJbmRleCAhPSBpdGVtRnJhbWVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlLiRMYXN0RnJhbWVJbmRleCAmJiAhX1NsaWRlT3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRTaG93RWxlbWVudChfQW5pbWF0aW9uQmxvY2tJdGVtc1tpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW1GcmFtZUluZGV4ID09IHZhbHVlLiRNYXggJiYgX1NsaWRlT3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRIaWRlRWxlbWVudChfQW5pbWF0aW9uQmxvY2tJdGVtc1tpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLiRMYXN0RnJhbWVJbmRleCA9IGl0ZW1GcmFtZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRTZXRTdHlsZXNFeChfQW5pbWF0aW9uQmxvY2tJdGVtc1tpbmRleF0sIHZhbHVlW2l0ZW1GcmFtZUluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2NvbnN0cnVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzbGlkZUVsZW1lbnQgPSAkSnNzb3IkLiRDbG9uZU5vZGUoc2xpZGVFbGVtZW50KTtcclxuICAgICAgICAgICAgLy8kSnNzb3IkLiRSZW1vdmVBdHRyaWJ1dGUoc2xpZGVFbGVtZW50LCBcImlkXCIpO1xyXG4gICAgICAgICAgICBpZiAoJEpzc29yJC4kSXNCcm93c2VySWU5RWFybGllcigpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzSW1hZ2UgPSAhc2xpZGVFbGVtZW50W1wibm8taW1hZ2VcIl07XHJcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVDaGlsZEVsZW1lbnRzID0gJEpzc29yJC4kRmluZENoaWxkcmVuQnlUYWcoc2xpZGVFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJEVhY2goc2xpZGVDaGlsZEVsZW1lbnRzLCBmdW5jdGlvbiAoc2xpZGVDaGlsZEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzSW1hZ2UgfHwgc2xpZGVDaGlsZEVsZW1lbnRbXCJqc3Nvci1zbGlkZXJcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRKc3NvciQuJENzc09wYWNpdHkoc2xpZGVDaGlsZEVsZW1lbnQsICRKc3NvciQuJENzc09wYWNpdHkoc2xpZGVDaGlsZEVsZW1lbnQpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRFYWNoKF9Gb3JtYXRpb25JbnN0YW5jZSwgZnVuY3Rpb24gKGZvcm1hdGlvbkl0ZW1zLCBvcmRlcikge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kRWFjaChmb3JtYXRpb25JdGVtcywgZnVuY3Rpb24gKGZvcm1hdGlvbkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZm9ybWF0aW9uSXRlbVswXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sID0gZm9ybWF0aW9uSXRlbVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2x1bW5Sb3cgPSByb3cgKyAnLCcgKyBjb2w7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hlc3NIb3Jpem9udGFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGVzc1ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGVzc1JvdGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9DaGVzc01vZGVDb2x1bW4gJiYgY29sICUgMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9DaGVzc01vZGVDb2x1bW4gJiAzLyokSnNzb3JEaXJlY3Rpb24kLiRJc0hvcml6b250YWwoX0NoZXNzTW9kZUNvbHVtbikqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZXNzSG9yaXpvbnRhbCA9ICFjaGVzc0hvcml6b250YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX0NoZXNzTW9kZUNvbHVtbiAmIDEyLyokSnNzb3JEaXJlY3Rpb24kLiRJc1ZlcnRpY2FsKF9DaGVzc01vZGVDb2x1bW4pKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVzc1ZlcnRpY2FsID0gIWNoZXNzVmVydGljYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9DaGVzc01vZGVDb2x1bW4gJiAxNilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVzc1JvdGF0ZSA9ICFjaGVzc1JvdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9DaGVzc01vZGVSb3cgJiYgcm93ICUgMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9DaGVzc01vZGVSb3cgJiAzLyokSnNzb3JEaXJlY3Rpb24kLiRJc0hvcml6b250YWwoX0NoZXNzTW9kZVJvdykqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZXNzSG9yaXpvbnRhbCA9ICFjaGVzc0hvcml6b250YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX0NoZXNzTW9kZVJvdyAmIDEyLyokSnNzb3JEaXJlY3Rpb24kLiRJc1ZlcnRpY2FsKF9DaGVzc01vZGVSb3cpKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVzc1ZlcnRpY2FsID0gIWNoZXNzVmVydGljYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX0NoZXNzTW9kZVJvdyAmIDE2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZXNzUm90YXRlID0gIWNoZXNzUm90YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVRyYW5zaXRpb24uJFRvcCA9IHNsaWRlVHJhbnNpdGlvbi4kVG9wIHx8IChzbGlkZVRyYW5zaXRpb24uJENsaXAgJiA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVUcmFuc2l0aW9uLiRCb3R0b20gPSBzbGlkZVRyYW5zaXRpb24uJEJvdHRvbSB8fCAoc2xpZGVUcmFuc2l0aW9uLiRDbGlwICYgOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlVHJhbnNpdGlvbi4kTGVmdCA9IHNsaWRlVHJhbnNpdGlvbi4kTGVmdCB8fCAoc2xpZGVUcmFuc2l0aW9uLiRDbGlwICYgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlVHJhbnNpdGlvbi4kUmlnaHQgPSBzbGlkZVRyYW5zaXRpb24uJFJpZ2h0IHx8IChzbGlkZVRyYW5zaXRpb24uJENsaXAgJiAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3BCZW5jaG1hcmsgPSBjaGVzc1ZlcnRpY2FsID8gc2xpZGVUcmFuc2l0aW9uLiRCb3R0b20gOiBzbGlkZVRyYW5zaXRpb24uJFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJvdHRvbUJlbmNobWFyayA9IGNoZXNzVmVydGljYWwgPyBzbGlkZVRyYW5zaXRpb24uJFRvcCA6IHNsaWRlVHJhbnNpdGlvbi4kQm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdEJlbmNobWFyayA9IGNoZXNzSG9yaXpvbnRhbCA/IHNsaWRlVHJhbnNpdGlvbi4kUmlnaHQgOiBzbGlkZVRyYW5zaXRpb24uJExlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByaWdodEJlbmNobWFyayA9IGNoZXNzSG9yaXpvbnRhbCA/IHNsaWRlVHJhbnNpdGlvbi4kTGVmdCA6IHNsaWRlVHJhbnNpdGlvbi4kUmlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVRyYW5zaXRpb24uJENsaXAgPSB0b3BCZW5jaG1hcmsgfHwgYm90dG9tQmVuY2htYXJrIHx8IGxlZnRCZW5jaG1hcmsgfHwgcmlnaHRCZW5jaG1hcms7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfU3R5bGVEaWYgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlRW5kID0geyAkVG9wOiAwLCAkTGVmdDogMCwgJE9wYWNpdHk6IDEsICRXaWR0aDogc2xpZGVDb250YWluZXJXaWR0aCwgJEhlaWdodDogc2xpZGVDb250YWluZXJIZWlnaHQgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlU3RhcnQgPSAkSnNzb3IkLiRFeHRlbmQoe30sIF9TdHlsZUVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9CbG9jayA9ICRKc3NvciQuJEV4dGVuZCh7fSwgX0Jsb2Nrc1tjb2x1bW5Sb3ddKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZVRyYW5zaXRpb24uJE9wYWNpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9TdHlsZUVuZC4kT3BhY2l0eSA9IDIgLSBzbGlkZVRyYW5zaXRpb24uJE9wYWNpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZVRyYW5zaXRpb24uJFpJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlRW5kLiRaSW5kZXggPSBzbGlkZVRyYW5zaXRpb24uJFpJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9TdHlsZVN0YXJ0LiRaSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWxsb3dDbGlwID0gc2xpZGVUcmFuc2l0aW9uLiRDb2xzICogc2xpZGVUcmFuc2l0aW9uLiRSb3dzID4gMSB8fCBzbGlkZVRyYW5zaXRpb24uJENsaXA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVUcmFuc2l0aW9uLiRab29tIHx8IHNsaWRlVHJhbnNpdGlvbi4kUm90YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWxsb3dSb3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRKc3NvciQuJElzQnJvd3NlckllOUVhcmxpZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZVRyYW5zaXRpb24uJENvbHMgKiBzbGlkZVRyYW5zaXRpb24uJFJvd3MgPiAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvd1JvdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dDbGlwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93Um90YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlRW5kLiRab29tID0gc2xpZGVUcmFuc2l0aW9uLiRab29tID8gc2xpZGVUcmFuc2l0aW9uLiRab29tIC0gMSA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlU3RhcnQuJFpvb20gPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJEpzc29yJC4kSXNCcm93c2VySWU5RWFybGllcigpIHx8ICRKc3NvciQuJElzQnJvd3Nlck9wZXJhKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9TdHlsZUVuZC4kWm9vbSA9IE1hdGgubWluKF9TdHlsZUVuZC4kWm9vbSwgMik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3RhdGUgPSBzbGlkZVRyYW5zaXRpb24uJFJvdGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlRW5kLiRSb3RhdGUgPSByb3RhdGUgKiAzNjAgKiAoKGNoZXNzUm90YXRlKSA/IC0xIDogMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlU3RhcnQuJFJvdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGxvd0NsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZVRyYW5zaXRpb24uJENsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpcFNjYWxlID0gc2xpZGVUcmFuc2l0aW9uLiRTY2FsZUNsaXAgfHwgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxvY2tPZmZzZXQgPSBfQmxvY2suJE9mZnNldCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3BCZW5jaG1hcmsgJiYgYm90dG9tQmVuY2htYXJrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrT2Zmc2V0LiRUb3AgPSBfQmxvY2tzLiRIZWlnaHQgLyAyICogY2xpcFNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja09mZnNldC4kQm90dG9tID0gLWJsb2NrT2Zmc2V0LiRUb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRvcEJlbmNobWFyaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja09mZnNldC4kQm90dG9tID0gLV9CbG9ja3MuJEhlaWdodCAqIGNsaXBTY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYm90dG9tQmVuY2htYXJrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrT2Zmc2V0LiRUb3AgPSBfQmxvY2tzLiRIZWlnaHQgKiBjbGlwU2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdEJlbmNobWFyayAmJiByaWdodEJlbmNobWFyaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja09mZnNldC4kTGVmdCA9IF9CbG9ja3MuJFdpZHRoIC8gMiAqIGNsaXBTY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tPZmZzZXQuJFJpZ2h0ID0gLWJsb2NrT2Zmc2V0LiRMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZWZ0QmVuY2htYXJrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrT2Zmc2V0LiRSaWdodCA9IC1fQmxvY2tzLiRXaWR0aCAqIGNsaXBTY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmlnaHRCZW5jaG1hcmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tPZmZzZXQuJExlZnQgPSBfQmxvY2tzLiRXaWR0aCAqIGNsaXBTY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlRGlmLiRDbGlwID0gX0Jsb2NrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlU3RhcnQuJENsaXAgPSBfQmxvY2tzW2NvbHVtblJvd107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGVzc0hvciA9IGNoZXNzSG9yaXpvbnRhbCA/IDEgOiAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGVzc1ZlciA9IGNoZXNzVmVydGljYWwgPyAxIDogLTE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlVHJhbnNpdGlvbi54KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9TdHlsZUVuZC4kTGVmdCArPSBzbGlkZUNvbnRhaW5lcldpZHRoICogc2xpZGVUcmFuc2l0aW9uLnggKiBjaGVzc0hvcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVUcmFuc2l0aW9uLnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlRW5kLiRUb3AgKz0gc2xpZGVDb250YWluZXJIZWlnaHQgKiBzbGlkZVRyYW5zaXRpb24ueSAqIGNoZXNzVmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRFYWNoKF9TdHlsZUVuZCwgZnVuY3Rpb24gKHByb3BlcnR5RW5kLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRKc3NvciQuJElzTnVtZXJpYyhwcm9wZXJ0eUVuZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHlFbmQgIT0gX1N0eWxlU3RhcnRbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9TdHlsZURpZltwcm9wZXJ0eV0gPSBwcm9wZXJ0eUVuZCAtIF9TdHlsZVN0YXJ0W3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX1N0YXJ0U3R5bGVzQXJyW2NvbHVtblJvd10gPSBfU2xpZGVPdXQgPyBfU3R5bGVTdGFydCA6IF9TdHlsZUVuZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25TdHlsZXNBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyYW1lc0NvdW50ID0gc2xpZGVUcmFuc2l0aW9uLiRGcmFtZXNDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpcnR1YWxGcmFtZUNvdW50ID0gTWF0aC5yb3VuZChvcmRlciAqIHNsaWRlVHJhbnNpdGlvbi4kRGVsYXkgLyBzbGlkZVRyYW5zaXRpb24uJEludGVydmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX0FuaW1hdGlvblN0eWxlc0FycnNbY29sdW1uUm93XSA9IG5ldyBBcnJheSh2aXJ0dWFsRnJhbWVDb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9BbmltYXRpb25TdHlsZXNBcnJzW2NvbHVtblJvd10uJE1pbiA9IHZpcnR1YWxGcmFtZUNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfQW5pbWF0aW9uU3R5bGVzQXJyc1tjb2x1bW5Sb3ddLiRNYXggPSB2aXJ0dWFsRnJhbWVDb3VudCArIGZyYW1lc0NvdW50IC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGZyYW1lTiA9IDA7IGZyYW1lTiA8PSBmcmFtZXNDb3VudDsgZnJhbWVOKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZUZyYW1lTiA9ICRKc3NvciQuJENhc3QoX1N0eWxlU3RhcnQsIF9TdHlsZURpZiwgZnJhbWVOIC8gZnJhbWVzQ291bnQsIHNsaWRlVHJhbnNpdGlvbi4kRWFzaW5nLCBzbGlkZVRyYW5zaXRpb24uJER1cmluZywgc2xpZGVUcmFuc2l0aW9uLiRSb3VuZCwgeyAkTW92ZTogc2xpZGVUcmFuc2l0aW9uLiRNb3ZlLCAkT3JpZ2luYWxXaWR0aDogc2xpZGVDb250YWluZXJXaWR0aCwgJE9yaWdpbmFsSGVpZ2h0OiBzbGlkZUNvbnRhaW5lckhlaWdodCB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRnJhbWVOLiRaSW5kZXggPSBzdHlsZUZyYW1lTi4kWkluZGV4IHx8IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX0FuaW1hdGlvblN0eWxlc0FycnNbY29sdW1uUm93XS5wdXNoKHN0eWxlRnJhbWVOKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IC8vZm9yXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBfRm9ybWF0aW9uSW5zdGFuY2UucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRFYWNoKF9Gb3JtYXRpb25JbnN0YW5jZSwgZnVuY3Rpb24gKGZvcm1hdGlvbkl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRFYWNoKGZvcm1hdGlvbkl0ZW1zLCBmdW5jdGlvbiAoZm9ybWF0aW9uSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBmb3JtYXRpb25JdGVtWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSBmb3JtYXRpb25JdGVtWzFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sdW1uUm93ID0gcm93ICsgJywnICsgY29sO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBzbGlkZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCB8fCByb3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlID0gJEpzc29yJC4kQ2xvbmVOb2RlKHNsaWRlRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvciQuJFNldFN0eWxlcyhpbWFnZSwgX1N0YXJ0U3R5bGVzQXJyW2NvbHVtblJvd10pO1xyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvciQuJENzc092ZXJmbG93KGltYWdlLCBcImhpZGRlblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzUG9zaXRpb24oaW1hZ2UsIFwiYWJzb2x1dGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDb250YWluZXIuJEFkZENsaXBFbGVtZW50KGltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBfQW5pbWF0aW9uQmxvY2tJdGVtc1tjb2x1bW5Sb3ddID0gaW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kU2hvd0VsZW1lbnQoaW1hZ2UsICFfU2xpZGVPdXQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTbGlkZXNob3dQcm9jZXNzb3IoKSB7XHJcbiAgICAgICAgdmFyIF9TZWxmU2xpZGVzaG93UHJvY2Vzc29yID0gdGhpcztcclxuICAgICAgICB2YXIgX0N1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICAgICAgJEpzc29yQW5pbWF0b3IkLmNhbGwoX1NlbGZTbGlkZXNob3dQcm9jZXNzb3IsIDAsIF9FbmRUaW1lKTtcclxuXHJcbiAgICAgICAgX1NlbGZTbGlkZXNob3dQcm9jZXNzb3IuJE9uUG9zaXRpb25DaGFuZ2UgPSBmdW5jdGlvbiAob2xkUG9zaXRpb24sIG5ld1Bvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICgobmV3UG9zaXRpb24gLSBfQ3VycmVudFRpbWUpID4gX1NsaWRlc2hvd1BlcmZvcm1hbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBfQ3VycmVudFRpbWUgPSBuZXdQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBfU2xpZGVzaG93UGxheWVyQWJvdmUgJiYgX1NsaWRlc2hvd1BsYXllckFib3ZlLiRTaG93RnJhbWUobmV3UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgX1NsaWRlc2hvd1BsYXllckJlbG93ICYmIF9TbGlkZXNob3dQbGF5ZXJCZWxvdy4kU2hvd0ZyYW1lKG5ld1Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIF9TZWxmU2xpZGVzaG93UHJvY2Vzc29yLiRUcmFuc2l0aW9uID0gX1NsaWRlc2hvd1RyYW5zaXRpb247XHJcbiAgICB9XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvL21lbWJlciBmdW5jdGlvbnNcclxuICAgIF9TZWxmU2xpZGVzaG93UnVubmVyLiRHZXRUcmFuc2l0aW9uID0gZnVuY3Rpb24gKHNsaWRlQ291bnQpIHtcclxuICAgICAgICB2YXIgbiA9IDA7XHJcblxyXG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IHNsaWRlc2hvd09wdGlvbnMuJFRyYW5zaXRpb25zO1xyXG5cclxuICAgICAgICB2YXIgdHJhbnNpdGlvbkNvdW50ID0gdHJhbnNpdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoX1RyYW5zaXRpb25zT3JkZXIpIHsgLypTZXF1ZW5jZSovXHJcbiAgICAgICAgICAgIC8vaWYgKHRyYW5zaXRpb25Db3VudCA+IHNsaWRlQ291bnQgJiYgKCRKc3NvciQuJElzQnJvd3NlckNocm9tZSgpIHx8ICRKc3NvciQuJElzQnJvd3NlclNhZmFyaSgpIHx8ICRKc3NvciQuJElzQnJvd3NlckZpcmVGb3goKSkpIHtcclxuICAgICAgICAgICAgLy8gICAgdHJhbnNpdGlvbkNvdW50IC09IHRyYW5zaXRpb25Db3VudCAlIHNsaWRlQ291bnQ7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBuID0gX1RyYW5zaXRpb25JbmRleCsrICUgdHJhbnNpdGlvbkNvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgLypSYW5kb20qL1xyXG4gICAgICAgICAgICBuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdHJhbnNpdGlvbkNvdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyYW5zaXRpb25zW25dICYmICh0cmFuc2l0aW9uc1tuXS4kSW5kZXggPSBuKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW25dO1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZlNsaWRlc2hvd1J1bm5lci4kSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChzbGlkZUluZGV4LCBwcmV2SW5kZXgsIHNsaWRlSXRlbSwgcHJldkl0ZW0sIHNsaWRlc2hvd1RyYW5zaXRpb24pIHtcclxuICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoX1NsaWRlc2hvd1BsYXllckJlbG93KSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJzbGlkZXNob3cgcnVubmVyIGhhcyBub3QgYmVlbiBjbGVhcmVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBfU2xpZGVzaG93VHJhbnNpdGlvbiA9IHNsaWRlc2hvd1RyYW5zaXRpb247XHJcblxyXG4gICAgICAgIHNsaWRlc2hvd1RyYW5zaXRpb24gPSBFbnN1cmVUcmFuc2l0aW9uSW5zdGFuY2Uoc2xpZGVzaG93VHJhbnNpdGlvbiwgX1NsaWRlc2hvd1BlcmZvcm1hbmNlKTtcclxuXHJcbiAgICAgICAgX1NsaWRlSXRlbSA9IHNsaWRlSXRlbTtcclxuICAgICAgICBfUHJldkl0ZW0gPSBwcmV2SXRlbTtcclxuXHJcbiAgICAgICAgdmFyIHByZXZTbGlkZUVsZW1lbnQgPSBwcmV2SXRlbS4kSXRlbTtcclxuICAgICAgICB2YXIgY3VycmVudFNsaWRlRWxlbWVudCA9IHNsaWRlSXRlbS4kSXRlbTtcclxuICAgICAgICBwcmV2U2xpZGVFbGVtZW50W1wibm8taW1hZ2VcIl0gPSAhcHJldkl0ZW0uJEltYWdlO1xyXG4gICAgICAgIGN1cnJlbnRTbGlkZUVsZW1lbnRbXCJuby1pbWFnZVwiXSA9ICFzbGlkZUl0ZW0uJEltYWdlO1xyXG5cclxuICAgICAgICB2YXIgc2xpZGVFbGVtZW50QWJvdmUgPSBwcmV2U2xpZGVFbGVtZW50O1xyXG4gICAgICAgIHZhciBzbGlkZUVsZW1lbnRCZWxvdyA9IGN1cnJlbnRTbGlkZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHZhciBzbGlkZVRyYW5zaXRpb25BYm92ZSA9IHNsaWRlc2hvd1RyYW5zaXRpb247XHJcbiAgICAgICAgdmFyIHNsaWRlVHJhbnNpdGlvbkJlbG93ID0gc2xpZGVzaG93VHJhbnNpdGlvbi4kQnJvdGhlciB8fCBFbnN1cmVUcmFuc2l0aW9uSW5zdGFuY2Uoe30sIF9TbGlkZXNob3dQZXJmb3JtYW5jZSk7XHJcblxyXG4gICAgICAgIGlmICghc2xpZGVzaG93VHJhbnNpdGlvbi4kU2xpZGVPdXQpIHtcclxuICAgICAgICAgICAgc2xpZGVFbGVtZW50QWJvdmUgPSBjdXJyZW50U2xpZGVFbGVtZW50O1xyXG4gICAgICAgICAgICBzbGlkZUVsZW1lbnRCZWxvdyA9IHByZXZTbGlkZUVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2hpZnQgPSBzbGlkZVRyYW5zaXRpb25CZWxvdy4kU2hpZnQgfHwgMDtcclxuXHJcbiAgICAgICAgX1NsaWRlc2hvd1BsYXllckJlbG93ID0gbmV3IEpzc29yU2xpZGVzaG93UGxheWVyKHNsaWRlQ29udGFpbmVyLCBzbGlkZUVsZW1lbnRCZWxvdywgc2xpZGVUcmFuc2l0aW9uQmVsb3csIE1hdGgubWF4KHNoaWZ0IC0gc2xpZGVUcmFuc2l0aW9uQmVsb3cuJEludGVydmFsLCAwKSwgc2xpZGVDb250YWluZXJXaWR0aCwgc2xpZGVDb250YWluZXJIZWlnaHQpO1xyXG4gICAgICAgIF9TbGlkZXNob3dQbGF5ZXJBYm92ZSA9IG5ldyBKc3NvclNsaWRlc2hvd1BsYXllcihzbGlkZUNvbnRhaW5lciwgc2xpZGVFbGVtZW50QWJvdmUsIHNsaWRlVHJhbnNpdGlvbkFib3ZlLCBNYXRoLm1heChzbGlkZVRyYW5zaXRpb25CZWxvdy4kSW50ZXJ2YWwgLSBzaGlmdCwgMCksIHNsaWRlQ29udGFpbmVyV2lkdGgsIHNsaWRlQ29udGFpbmVySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgX1NsaWRlc2hvd1BsYXllckJlbG93LiRTaG93RnJhbWUoMCk7XHJcbiAgICAgICAgX1NsaWRlc2hvd1BsYXllckFib3ZlLiRTaG93RnJhbWUoMCk7XHJcblxyXG4gICAgICAgIF9FbmRUaW1lID0gTWF0aC5tYXgoX1NsaWRlc2hvd1BsYXllckJlbG93LiRFbmRUaW1lLCBfU2xpZGVzaG93UGxheWVyQWJvdmUuJEVuZFRpbWUpO1xyXG5cclxuICAgICAgICBfU2VsZlNsaWRlc2hvd1J1bm5lci4kSW5kZXggPSBzbGlkZUluZGV4O1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZlNsaWRlc2hvd1J1bm5lci4kQ2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2xpZGVDb250YWluZXIuJENsZWFyKCk7XHJcbiAgICAgICAgX1NsaWRlc2hvd1BsYXllckJlbG93ID0gbnVsbDtcclxuICAgICAgICBfU2xpZGVzaG93UGxheWVyQWJvdmUgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZlNsaWRlc2hvd1J1bm5lci4kR2V0UHJvY2Vzc29yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzbGlkZXNob3dQcm9jZXNzb3IgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoX1NsaWRlc2hvd1BsYXllckFib3ZlKVxyXG4gICAgICAgICAgICBzbGlkZXNob3dQcm9jZXNzb3IgPSBuZXcgU2xpZGVzaG93UHJvY2Vzc29yKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBzbGlkZXNob3dQcm9jZXNzb3I7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vQ29uc3RydWN0b3JcclxuICAgIHtcclxuICAgICAgICBpZiAoJEpzc29yJC4kSXNCcm93c2VySWU5RWFybGllcigpIHx8ICRKc3NvciQuJElzQnJvd3Nlck9wZXJhKCkgfHwgKGlzVG91Y2hEZXZpY2UgJiYgJEpzc29yJC4kV2ViS2l0VmVyc2lvbigpIDwgNTM3KSkge1xyXG4gICAgICAgICAgICBfU2xpZGVzaG93UGVyZm9ybWFuY2UgPSAxNjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRKc3Nvck9iamVjdCQuY2FsbChfU2VsZlNsaWRlc2hvd1J1bm5lcik7XHJcbiAgICAgICAgJEpzc29yQW5pbWF0b3IkLmNhbGwoX1NlbGZTbGlkZXNob3dSdW5uZXIsIC0xMDAwMDAwMCwgMTAwMDAwMDApO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyICRKc3NvclNsaWRlciQgPSB3aW5kb3cuJEpzc29yU2xpZGVyJCA9IGZ1bmN0aW9uIChlbG10LCBvcHRpb25zKSB7XHJcbiAgICB2YXIgX1NlbGZTbGlkZXIgPSB0aGlzO1xyXG5cclxuICAgIC8vI3JlZ2lvbiBQcml2YXRlIENsYXNzZXNcclxuICAgIC8vQ29udmV5b3JcclxuICAgIGZ1bmN0aW9uIENvbnZleW9yKCkge1xyXG4gICAgICAgIHZhciBfU2VsZkNvbnZleW9yID0gdGhpcztcclxuICAgICAgICAkSnNzb3JBbmltYXRvciQuY2FsbChfU2VsZkNvbnZleW9yLCAtMTAwMDAwMDAwLCAyMDAwMDAwMDApO1xyXG5cclxuICAgICAgICBfU2VsZkNvbnZleW9yLiRHZXRDdXJyZW50U2xpZGVJbmZvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25EaXNwbGF5ID0gX1NlbGZDb252ZXlvci4kR2V0UG9zaXRpb25fRGlzcGxheSgpO1xyXG4gICAgICAgICAgICB2YXIgdmlydHVhbEluZGV4ID0gTWF0aC5mbG9vcihwb3NpdGlvbkRpc3BsYXkpO1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVJbmRleCA9IEdldFJlYWxJbmRleCh2aXJ0dWFsSW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVQb3NpdGlvbiA9IHBvc2l0aW9uRGlzcGxheSAtIE1hdGguZmxvb3IocG9zaXRpb25EaXNwbGF5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7ICRJbmRleDogc2xpZGVJbmRleCwgJFZpcnR1YWxJbmRleDogdmlydHVhbEluZGV4LCAkUG9zaXRpb246IHNsaWRlUG9zaXRpb24gfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZkNvbnZleW9yLiRPblBvc2l0aW9uQ2hhbmdlID0gZnVuY3Rpb24gKG9sZFBvc2l0aW9uLCBuZXdQb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihuZXdQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSBuZXdQb3NpdGlvbiAmJiBuZXdQb3NpdGlvbiA+IG9sZFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuXHJcbiAgICAgICAgICAgIFJlc2V0TmF2aWdhdG9yKGluZGV4LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIF9TZWxmU2xpZGVyLiRUcmlnZ2VyRXZlbnQoJEpzc29yU2xpZGVyJC4kRVZUX1BPU0lUSU9OX0NIQU5HRSwgR2V0UmVhbEluZGV4KG5ld1Bvc2l0aW9uKSwgR2V0UmVhbEluZGV4KG9sZFBvc2l0aW9uKSwgbmV3UG9zaXRpb24sIG9sZFBvc2l0aW9uKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy9Db252ZXlvclxyXG5cclxuICAgIC8vQ2Fyb3VzZWxcclxuICAgIGZ1bmN0aW9uIENhcm91c2VsKCkge1xyXG4gICAgICAgIHZhciBfU2VsZkNhcm91c2VsID0gdGhpcztcclxuXHJcbiAgICAgICAgJEpzc29yQW5pbWF0b3IkLmNhbGwoX1NlbGZDYXJvdXNlbCwgMCwgMCwgeyAkTG9vcExlbmd0aDogX1NsaWRlQ291bnQgfSk7XHJcblxyXG4gICAgICAgIC8vQ2Fyb3VzZWwgQ29uc3RydWN0b3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRKc3NvciQuJEVhY2goX1NsaWRlSXRlbXMsIGZ1bmN0aW9uIChzbGlkZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIChfTG9vcCAmIDEpICYmIHNsaWRlSXRlbS4kU2V0TG9vcExlbmd0aChfU2xpZGVDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBfU2VsZkNhcm91c2VsLiRDaGFpbihzbGlkZUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVJdGVtLiRTaGlmdChfUGFya2luZ1Bvc2l0aW9uIC8gX1N0ZXBMZW5ndGgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL0Nhcm91c2VsXHJcblxyXG4gICAgLy9TbGlkZXNob3dcclxuICAgIGZ1bmN0aW9uIFNsaWRlc2hvdygpIHtcclxuICAgICAgICB2YXIgX1NlbGZTbGlkZXNob3cgPSB0aGlzO1xyXG4gICAgICAgIHZhciBfV3JhcHBlciA9IF9TbGlkZUNvbnRhaW5lci4kRWxtdDtcclxuXHJcbiAgICAgICAgJEpzc29yQW5pbWF0b3IkLmNhbGwoX1NlbGZTbGlkZXNob3csIC0xLCAyLCB7ICRFYXNpbmc6ICRKc3NvckVhc2luZyQuJEVhc2VMaW5lYXIsICRTZXR0ZXI6IHsgJFBvc2l0aW9uOiBTZXRQb3NpdGlvbiB9LCAkTG9vcExlbmd0aDogX1NsaWRlQ291bnQgfSwgX1dyYXBwZXIsIHsgJFBvc2l0aW9uOiAxIH0sIHsgJFBvc2l0aW9uOiAtMiB9KTtcclxuXHJcbiAgICAgICAgX1NlbGZTbGlkZXNob3cuJFdyYXBwZXIgPSBfV3JhcHBlcjtcclxuXHJcbiAgICAgICAgLy9TbGlkZXNob3cgQ29uc3RydWN0b3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBdHRyaWJ1dGUoX1NsaWRlQ29udGFpbmVyLiRFbG10LCBcImRlYnVnLWlkXCIsIFwic2xpZGVfY29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL1NsaWRlc2hvd1xyXG5cclxuICAgIC8vQ2Fyb3VzZWxQbGF5ZXJcclxuICAgIGZ1bmN0aW9uIENhcm91c2VsUGxheWVyKGNhcm91c2VsLCBzbGlkZXNob3cpIHtcclxuICAgICAgICB2YXIgX1NlbGZDYXJvdXNlbFBsYXllciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIF9Gcm9tUG9zaXRpb247XHJcbiAgICAgICAgdmFyIF9Ub1Bvc2l0aW9uO1xyXG4gICAgICAgIHZhciBfRHVyYXRpb247XHJcbiAgICAgICAgdmFyIF9TdGFuZEJ5O1xyXG4gICAgICAgIHZhciBfU3RhbmRCeVBvc2l0aW9uO1xyXG5cclxuICAgICAgICAkSnNzb3JBbmltYXRvciQuY2FsbChfU2VsZkNhcm91c2VsUGxheWVyLCAtMTAwMDAwMDAwLCAyMDAwMDAwMDAsIHsgJEludGVydmFsTWF4OiAxMDAgfSk7XHJcblxyXG4gICAgICAgIF9TZWxmQ2Fyb3VzZWxQbGF5ZXIuJE9uU3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9Jc1NsaWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBfTG9hZGluZ1RpY2tldCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvL0VWVF9TV0lQRV9TVEFSVFxyXG4gICAgICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KCRKc3NvclNsaWRlciQuJEVWVF9TV0lQRV9TVEFSVCwgR2V0UmVhbEluZGV4KF9Db252ZXlvci4kR2V0UG9zaXRpb24oKSksIF9Db252ZXlvci4kR2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGZDYXJvdXNlbFBsYXllci4kT25TdG9wID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgX0lzU2xpZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBfU3RhbmRCeSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZUluZm8gPSBfQ29udmV5b3IuJEdldEN1cnJlbnRTbGlkZUluZm8oKTtcclxuXHJcbiAgICAgICAgICAgIC8vRVZUX1NXSVBFX0VORFxyXG4gICAgICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KCRKc3NvclNsaWRlciQuJEVWVF9TV0lQRV9FTkQsIEdldFJlYWxJbmRleChfQ29udmV5b3IuJEdldFBvc2l0aW9uKCkpLCBfQ29udmV5b3IuJEdldFBvc2l0aW9uKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50U2xpZGVJbmZvLiRQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgT25QYXJrKGN1cnJlbnRTbGlkZUluZm8uJFZpcnR1YWxJbmRleCwgX0N1cnJlbnRTbGlkZUluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIF9TZWxmQ2Fyb3VzZWxQbGF5ZXIuJE9uUG9zaXRpb25DaGFuZ2UgPSBmdW5jdGlvbiAob2xkUG9zaXRpb24sIG5ld1Bvc2l0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9Qb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChfU3RhbmRCeSlcclxuICAgICAgICAgICAgICAgIHRvUG9zaXRpb24gPSBfU3RhbmRCeVBvc2l0aW9uO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvUG9zaXRpb24gPSBfVG9Qb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX0R1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGludGVyUG9zaXRpb24gPSBuZXdQb3NpdGlvbiAvIF9EdXJhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB0b1Bvc2l0aW9uID0gX09wdGlvbnMuJFNsaWRlRWFzaW5nKGludGVyUG9zaXRpb24pICogKF9Ub1Bvc2l0aW9uIC0gX0Zyb21Qb3NpdGlvbikgKyBfRnJvbVBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfQ29udmV5b3IuJEdvVG9Qb3NpdGlvbih0b1Bvc2l0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZkNhcm91c2VsUGxheWVyLiRQbGF5Q2Fyb3VzZWwgPSBmdW5jdGlvbiAoZnJvbVBvc2l0aW9uLCB0b1Bvc2l0aW9uLCBkdXJhdGlvbiwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfU2VsZkNhcm91c2VsUGxheWVyLiRJc1BsYXlpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJUaGUgY2Fyb3VzZWwgaXMgYWxyZWFkeSBwbGF5aW5nLlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBfRnJvbVBvc2l0aW9uID0gZnJvbVBvc2l0aW9uO1xyXG4gICAgICAgICAgICBfVG9Qb3NpdGlvbiA9IHRvUG9zaXRpb247XHJcbiAgICAgICAgICAgIF9EdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgX0NvbnZleW9yLiRHb1RvUG9zaXRpb24oZnJvbVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgX1NlbGZDYXJvdXNlbFBsYXllci4kR29Ub1Bvc2l0aW9uKDApO1xyXG5cclxuICAgICAgICAgICAgX1NlbGZDYXJvdXNlbFBsYXllci4kUGxheVRvUG9zaXRpb24oZHVyYXRpb24sIGNhbGxiYWNrKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZkNhcm91c2VsUGxheWVyLiRTdGFuZEJ5ID0gZnVuY3Rpb24gKHN0YW5kQnlQb3NpdGlvbikge1xyXG4gICAgICAgICAgICBfU3RhbmRCeSA9IHRydWU7XHJcbiAgICAgICAgICAgIF9TdGFuZEJ5UG9zaXRpb24gPSBzdGFuZEJ5UG9zaXRpb247XHJcbiAgICAgICAgICAgIF9TZWxmQ2Fyb3VzZWxQbGF5ZXIuJFBsYXkoc3RhbmRCeVBvc2l0aW9uLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZkNhcm91c2VsUGxheWVyLiRTZXRTdGFuZEJ5UG9zaXRpb24gPSBmdW5jdGlvbiAoc3RhbmRCeVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIF9TdGFuZEJ5UG9zaXRpb24gPSBzdGFuZEJ5UG9zaXRpb247XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGZDYXJvdXNlbFBsYXllci4kTW92ZUNhcm91c2VsVG8gPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgX0NvbnZleW9yLiRHb1RvUG9zaXRpb24ocG9zaXRpb24pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vQ2Fyb3VzZWxQbGF5ZXIgQ29uc3RydWN0b3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9Db252ZXlvciA9IG5ldyBDb252ZXlvcigpO1xyXG5cclxuICAgICAgICAgICAgX0NvbnZleW9yLiRDb21iaW5lKGNhcm91c2VsKTtcclxuICAgICAgICAgICAgX0NvbnZleW9yLiRDb21iaW5lKHNsaWRlc2hvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9DYXJvdXNlbFBsYXllclxyXG5cclxuICAgIC8vU2xpZGVDb250YWluZXJcclxuICAgIGZ1bmN0aW9uIFNsaWRlQ29udGFpbmVyKCkge1xyXG4gICAgICAgIHZhciBfU2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGVsbXQgPSBDcmVhdGVQYW5lbCgpO1xyXG5cclxuICAgICAgICAkSnNzb3IkLiRDc3NaSW5kZXgoZWxtdCwgMCk7XHJcbiAgICAgICAgJEpzc29yJC4kQ3NzKGVsbXQsIFwicG9pbnRlckV2ZW50c1wiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAgIF9TZWxmLiRFbG10ID0gZWxtdDtcclxuXHJcbiAgICAgICAgX1NlbGYuJEFkZENsaXBFbGVtZW50ID0gZnVuY3Rpb24gKGNsaXBFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICRKc3NvciQuJEFwcGVuZENoaWxkKGVsbXQsIGNsaXBFbGVtZW50KTtcclxuICAgICAgICAgICAgJEpzc29yJC4kU2hvd0VsZW1lbnQoZWxtdCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGYuJENsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRIaWRlRWxlbWVudChlbG10KTtcclxuICAgICAgICAgICAgJEpzc29yJC4kRW1wdHkoZWxtdCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vU2xpZGVDb250YWluZXJcclxuXHJcbiAgICAvL1NsaWRlSXRlbVxyXG4gICAgZnVuY3Rpb24gU2xpZGVJdGVtKHNsaWRlRWxtdCwgc2xpZGVJbmRleCkge1xyXG5cclxuICAgICAgICB2YXIgX1NlbGZTbGlkZUl0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgX0NhcHRpb25TbGlkZXJJbjtcclxuICAgICAgICB2YXIgX0NhcHRpb25TbGlkZXJPdXQ7XHJcbiAgICAgICAgdmFyIF9DYXB0aW9uU2xpZGVyQ3VycmVudDtcclxuICAgICAgICB2YXIgX0lzQ2FwdGlvblNsaWRlclBsYXlpbmdXaGVuRHJhZ1N0YXJ0O1xyXG5cclxuICAgICAgICB2YXIgX1dyYXBwZXI7XHJcbiAgICAgICAgdmFyIF9CYXNlRWxlbWVudCA9IHNsaWRlRWxtdDtcclxuXHJcbiAgICAgICAgdmFyIF9Mb2FkaW5nU2NyZWVuO1xyXG5cclxuICAgICAgICB2YXIgX0ltYWdlSXRlbTtcclxuICAgICAgICB2YXIgX0ltYWdlRWxtdHMgPSBbXTtcclxuICAgICAgICB2YXIgX0xpbmtJdGVtT3JpZ2luO1xyXG4gICAgICAgIHZhciBfTGlua0l0ZW07XHJcbiAgICAgICAgdmFyIF9JbWFnZUxvYWRpbmc7XHJcbiAgICAgICAgdmFyIF9JbWFnZUxvYWRlZDtcclxuICAgICAgICB2YXIgX0ltYWdlTGF6eUxvYWRpbmc7XHJcbiAgICAgICAgdmFyIF9Db250ZW50UmVmcmVzaGVkO1xyXG5cclxuICAgICAgICB2YXIgX1Byb2Nlc3NvcjtcclxuXHJcbiAgICAgICAgdmFyIF9QbGF5ZXJJbnN0YW5jZUVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIF9QbGF5ZXJJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgdmFyIF9TZXF1ZW5jZU51bWJlcjsgICAgLy9mb3IgZGVidWcgb25seVxyXG5cclxuICAgICAgICAkSnNzb3JBbmltYXRvciQuY2FsbChfU2VsZlNsaWRlSXRlbSwgLV9EaXNwbGF5UGllY2VzLCBfRGlzcGxheVBpZWNlcyArIDEsIHsgJFNsaWRlSXRlbUFuaW1hdG9yOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBSZXNldENhcHRpb25TbGlkZXIoZnJlc2gpIHtcclxuICAgICAgICAgICAgX0NhcHRpb25TbGlkZXJPdXQgJiYgX0NhcHRpb25TbGlkZXJPdXQuJFJldmVydCgpO1xyXG4gICAgICAgICAgICBfQ2FwdGlvblNsaWRlckluICYmIF9DYXB0aW9uU2xpZGVySW4uJFJldmVydCgpO1xyXG5cclxuICAgICAgICAgICAgUmVmcmVzaENvbnRlbnQoc2xpZGVFbG10LCBmcmVzaCk7XHJcbiAgICAgICAgICAgIF9Db250ZW50UmVmcmVzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9DYXB0aW9uU2xpZGVySW4gPSBuZXcgX0NhcHRpb25TbGlkZXJPcHRpb25zLiRDbGFzcyhzbGlkZUVsbXQsIF9DYXB0aW9uU2xpZGVyT3B0aW9ucywgMSk7XHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kTGl2ZVN0YW1wKF9DYXB0aW9uU2xpZGVySW4sIFwiY2FwdGlvbl9zbGlkZXJfXCIgKyBfQ2FwdGlvblNsaWRlckNvdW50ICsgXCJfaW5cIik7XHJcbiAgICAgICAgICAgIF9DYXB0aW9uU2xpZGVyT3V0ID0gbmV3IF9DYXB0aW9uU2xpZGVyT3B0aW9ucy4kQ2xhc3Moc2xpZGVFbG10LCBfQ2FwdGlvblNsaWRlck9wdGlvbnMpO1xyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJExpdmVTdGFtcChfQ2FwdGlvblNsaWRlck91dCwgXCJjYXB0aW9uX3NsaWRlcl9cIiArIF9DYXB0aW9uU2xpZGVyQ291bnQgKyBcIl9vdXRcIik7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX0NhcHRpb25TbGlkZXJDb3VudCsrO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIF9DYXB0aW9uU2xpZGVyT3V0LiRHb1RvUG9zaXRpb24oMCk7XHJcbiAgICAgICAgICAgIF9DYXB0aW9uU2xpZGVySW4uJEdvVG9Qb3NpdGlvbigwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEVuc3VyZUNhcHRpb25TbGlkZXJWZXJzaW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoX0NhcHRpb25TbGlkZXJJbi4kVmVyc2lvbiA8IF9DYXB0aW9uU2xpZGVyT3B0aW9ucy4kVmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgUmVzZXRDYXB0aW9uU2xpZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZXZlbnQgaGFuZGxpbmcgYmVnaW5cclxuICAgICAgICBmdW5jdGlvbiBMb2FkSW1hZ2VDb21wbGV0ZUV2ZW50SGFuZGxlcihjb21wbGV0ZUNhbGxiYWNrLCBsb2FkaW5nU2NyZWVuLCBpbWFnZSkge1xyXG4gICAgICAgICAgICBpZiAoIV9JbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgX0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX0ltYWdlSXRlbSAmJiBpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbWFnZVdpZHRoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxsV2lkdGggPSBpbWFnZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxsSGVpZ2h0ID0gaW1hZ2VIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZVdpZHRoICYmIGltYWdlSGVpZ2h0ICYmIF9PcHRpb25zLiRGaWxsTW9kZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8wIHN0cmV0Y2gsIDEgY29udGFpbiAoa2VlcCBhc3BlY3QgcmF0aW8gYW5kIHB1dCBhbGwgaW5zaWRlIHNsaWRlKSwgMiBjb3ZlciAoa2VlcCBhc3BlY3QgcmF0aW8gYW5kIGNvdmVyIHdob2xlIHNsaWRlKSwgNCBhY3R1YWwgc2l6ZSwgNSBjb250YWluIGZvciBsYXJnZSBpbWFnZSwgYWN0dWFsIHNpemUgZm9yIHNtYWxsIGltYWdlLCBkZWZhdWx0IHZhbHVlIGlzIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9PcHRpb25zLiRGaWxsTW9kZSAmIDMgJiYgKCEoX09wdGlvbnMuJEZpbGxNb2RlICYgNCkgfHwgaW1hZ2VXaWR0aCA+IF9TbGlkZVdpZHRoIHx8IGltYWdlSGVpZ2h0ID4gX1NsaWRlSGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpdEhlaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGlvID0gX1NsaWRlV2lkdGggLyBfU2xpZGVIZWlnaHQgKiBpbWFnZUhlaWdodCAvIGltYWdlV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9PcHRpb25zLiRGaWxsTW9kZSAmIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXRIZWlnaHQgPSAocmF0aW8gPiAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF9PcHRpb25zLiRGaWxsTW9kZSAmIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXRIZWlnaHQgPSAocmF0aW8gPCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxXaWR0aCA9IGZpdEhlaWdodCA/IGltYWdlV2lkdGggKiBfU2xpZGVIZWlnaHQgLyBpbWFnZUhlaWdodCA6IF9TbGlkZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbEhlaWdodCA9IGZpdEhlaWdodCA/IF9TbGlkZUhlaWdodCA6IGltYWdlSGVpZ2h0ICogX1NsaWRlV2lkdGggLyBpbWFnZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NXaWR0aChfSW1hZ2VJdGVtLCBmaWxsV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NIZWlnaHQoX0ltYWdlSXRlbSwgZmlsbEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRKc3NvciQuJENzc1RvcChfSW1hZ2VJdGVtLCAoX1NsaWRlSGVpZ2h0IC0gZmlsbEhlaWdodCkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzTGVmdChfSW1hZ2VJdGVtLCAoX1NsaWRlV2lkdGggLSBmaWxsV2lkdGgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NQb3NpdGlvbihfSW1hZ2VJdGVtLCBcImFic29sdXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KCRKc3NvclNsaWRlciQuJEVWVF9MT0FEX0VORCwgc2xpZGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJEhpZGVFbGVtZW50KGxvYWRpbmdTY3JlZW4pO1xyXG4gICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrICYmIGNvbXBsZXRlQ2FsbGJhY2soX1NlbGZTbGlkZUl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gTG9hZFNsaWRlc2hvd0ltYWdlQ29tcGxldGVFdmVudEhhbmRsZXIobmV4dEluZGV4LCBuZXh0SXRlbSwgc2xpZGVzaG93VHJhbnNpdGlvbiwgbG9hZGluZ1RpY2tldCkge1xyXG4gICAgICAgICAgICBpZiAobG9hZGluZ1RpY2tldCA9PSBfTG9hZGluZ1RpY2tldCAmJiBfQ3VycmVudFNsaWRlSW5kZXggPT0gc2xpZGVJbmRleCAmJiBfQXV0b1BsYXkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX0Zyb3plbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0UmVhbEluZGV4ID0gR2V0UmVhbEluZGV4KG5leHRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX1NsaWRlc2hvd1J1bm5lci4kSW5pdGlhbGl6ZShuZXh0UmVhbEluZGV4LCBzbGlkZUluZGV4LCBuZXh0SXRlbSwgX1NlbGZTbGlkZUl0ZW0sIHNsaWRlc2hvd1RyYW5zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLiRIaWRlQ29udGVudEZvclNsaWRlc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9TbGlkZXNob3cuJExvY2F0ZShuZXh0UmVhbEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBfU2xpZGVzaG93LiRHb1RvUG9zaXRpb24obmV4dFJlYWxJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX0Nhcm91c2VsUGxheWVyLiRQbGF5Q2Fyb3VzZWwobmV4dEluZGV4LCBuZXh0SW5kZXgsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBTbGlkZVJlYWR5RXZlbnRIYW5kbGVyKGxvYWRpbmdUaWNrZXQpIHtcclxuICAgICAgICAgICAgaWYgKGxvYWRpbmdUaWNrZXQgPT0gX0xvYWRpbmdUaWNrZXQgJiYgX0N1cnJlbnRTbGlkZUluZGV4ID09IHNsaWRlSW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIV9Qcm9jZXNzb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVzaG93UHJvY2Vzc29yID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX1NsaWRlc2hvd1J1bm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1NsaWRlc2hvd1J1bm5lci4kSW5kZXggPT0gc2xpZGVJbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd1Byb2Nlc3NvciA9IF9TbGlkZXNob3dSdW5uZXIuJEdldFByb2Nlc3NvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfU2xpZGVzaG93UnVubmVyLiRDbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgRW5zdXJlQ2FwdGlvblNsaWRlclZlcnNpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX1Byb2Nlc3NvciA9IG5ldyBQcm9jZXNzb3Ioc2xpZGVFbG10LCBzbGlkZUluZGV4LCBzbGlkZXNob3dQcm9jZXNzb3IsIF9TZWxmU2xpZGVJdGVtLiRHZXRDYXB0aW9uU2xpZGVySW4oKSwgX1NlbGZTbGlkZUl0ZW0uJEdldENhcHRpb25TbGlkZXJPdXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX1Byb2Nlc3Nvci4kU2V0UGxheWVyKF9QbGF5ZXJJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIV9Qcm9jZXNzb3IuJElzUGxheWluZygpICYmIF9Qcm9jZXNzb3IuJFJlcGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBQYXJrRXZlbnRIYW5kbGVyKGN1cnJlbnRJbmRleCwgcHJldmlvdXNJbmRleCwgbWFudWFsQWN0aXZhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PSBzbGlkZUluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJbmRleCAhPSBwcmV2aW91c0luZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIF9TbGlkZUl0ZW1zW3ByZXZpb3VzSW5kZXhdICYmIF9TbGlkZUl0ZW1zW3ByZXZpb3VzSW5kZXhdLiRQYXJrT3V0KCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgIW1hbnVhbEFjdGl2YXRlICYmIF9Qcm9jZXNzb3IgJiYgX1Byb2Nlc3Nvci4kQWRqdXN0SWRsZU9uUGFyaygpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9QbGF5ZXJJbnN0YW5jZSAmJiBfUGxheWVySW5zdGFuY2UuJEVuYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcGFyayBpblxyXG4gICAgICAgICAgICAgICAgdmFyIGxvYWRpbmdUaWNrZXQgPSBfTG9hZGluZ1RpY2tldCA9ICRKc3NvciQuJEdldE5vdygpO1xyXG4gICAgICAgICAgICAgICAgX1NlbGZTbGlkZUl0ZW0uJExvYWRJbWFnZSgkSnNzb3IkLiRDcmVhdGVDYWxsYmFjayhudWxsLCBTbGlkZVJlYWR5RXZlbnRIYW5kbGVyLCBsb2FkaW5nVGlja2V0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyhzbGlkZUluZGV4IC0gY3VycmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIHZhciBsb2FkUmFuZ2UgPSBfRGlzcGxheVBpZWNlcyArIF9PcHRpb25zLiRMYXp5TG9hZGluZyAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9JbWFnZUxhenlMb2FkaW5nIHx8IGRpc3RhbmNlIDw9IGxvYWRSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9TZWxmU2xpZGVJdGVtLiRMb2FkSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gU3dpcGVTdGFydEV2ZW50SGFuZGxlcigpIHtcclxuICAgICAgICAgICAgaWYgKF9DdXJyZW50U2xpZGVJbmRleCA9PSBzbGlkZUluZGV4ICYmIF9Qcm9jZXNzb3IpIHtcclxuICAgICAgICAgICAgICAgIF9Qcm9jZXNzb3IuJFN0b3AoKTtcclxuICAgICAgICAgICAgICAgIF9QbGF5ZXJJbnN0YW5jZSAmJiBfUGxheWVySW5zdGFuY2UuJFF1aXQoKTtcclxuICAgICAgICAgICAgICAgIF9QbGF5ZXJJbnN0YW5jZSAmJiBfUGxheWVySW5zdGFuY2UuJERpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgIF9Qcm9jZXNzb3IuJE9wZW5TbGlkZXNob3dQYW5lbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBGcmVlemVFdmVudEhhbmRsZXIoKSB7XHJcbiAgICAgICAgICAgIGlmIChfQ3VycmVudFNsaWRlSW5kZXggPT0gc2xpZGVJbmRleCAmJiBfUHJvY2Vzc29yKSB7XHJcbiAgICAgICAgICAgICAgICBfUHJvY2Vzc29yLiRTdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIENvbnRlbnRDbGlja0V2ZW50SGFuZGxlcihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoX0xhc3REcmFnU3VjY2VkZWQpIHtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJFN0b3BFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrRWxlbWVudCA9ICRKc3NvciQuJEV2dFNyYyhldmVudCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoY2hlY2tFbGVtZW50ICYmIHNsaWRlRWxtdCAhPT0gY2hlY2tFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrRWxlbWVudC50YWdOYW1lID09IFwiQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRKc3NvciQuJENhbmNlbEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50ID0gY2hlY2tFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJlZm94IHNvbWV0aW1lcyBmaXJlcyBldmVudHMgZm9yIFhVTCBlbGVtZW50cywgd2hpY2ggdGhyb3dzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgXCJwZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yLiBzbyB0aGlzIGlzIG5vdCBhIGNoaWxkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIFNsaWRlQ2xpY2tFdmVudEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCFfTGFzdERyYWdTdWNjZWRlZCkge1xyXG4gICAgICAgICAgICAgICAgX1NlbGZTbGlkZXIuJFRyaWdnZXJFdmVudCgkSnNzb3JTbGlkZXIkLiRFVlRfQ0xJQ0ssIHNsaWRlSW5kZXgsIGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gUGxheWVyQXZhaWxhYmxlRXZlbnRIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICBfUGxheWVySW5zdGFuY2UgPSBfUGxheWVySW5zdGFuY2VFbGVtZW50LnBJbnN0YW5jZTtcclxuICAgICAgICAgICAgX1Byb2Nlc3NvciAmJiBfUHJvY2Vzc29yLiRTZXRQbGF5ZXIoX1BsYXllckluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9TZWxmU2xpZGVJdGVtLiRMb2FkSW1hZ2UgPSBmdW5jdGlvbiAoY29tcGxldGVDYWxsYmFjaywgbG9hZGluZ1NjcmVlbikge1xyXG4gICAgICAgICAgICBsb2FkaW5nU2NyZWVuID0gbG9hZGluZ1NjcmVlbiB8fCBfTG9hZGluZ1NjcmVlbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChfSW1hZ2VFbG10cy5sZW5ndGggJiYgIV9JbWFnZUxvYWRlZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRKc3NvciQuJFNob3dFbGVtZW50KGxvYWRpbmdTY3JlZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghX0ltYWdlTG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9JbWFnZUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9TZWxmU2xpZGVyLiRUcmlnZ2VyRXZlbnQoJEpzc29yU2xpZGVyJC4kRVZUX0xPQURfU1RBUlQsIHNsaWRlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRFYWNoKF9JbWFnZUVsbXRzLCBmdW5jdGlvbiAoaW1hZ2VFbG10KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISRKc3NvciQuJEF0dHJpYnV0ZShpbWFnZUVsbXQsIFwic3JjXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUVsbXQuc3JjID0gJEpzc29yJC4kQXR0cmlidXRlRXgoaW1hZ2VFbG10LCBcInNyYzJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NEaXNwbGF5KGltYWdlRWxtdCwgaW1hZ2VFbG10W1wiZGlzcGxheS1vcmlnaW5cIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRMb2FkSW1hZ2VzKF9JbWFnZUVsbXRzLCBfSW1hZ2VJdGVtLCAkSnNzb3IkLiRDcmVhdGVDYWxsYmFjayhudWxsLCBMb2FkSW1hZ2VDb21wbGV0ZUV2ZW50SGFuZGxlciwgY29tcGxldGVDYWxsYmFjaywgbG9hZGluZ1NjcmVlbikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9hZEltYWdlQ29tcGxldGVFdmVudEhhbmRsZXIoY29tcGxldGVDYWxsYmFjaywgbG9hZGluZ1NjcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZlNsaWRlSXRlbS4kR29Gb3JOZXh0U2xpZGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzbGlkZUluZGV4O1xyXG4gICAgICAgICAgICBpZiAoX09wdGlvbnMuJEF1dG9QbGF5U3RlcHMgPCAwKVxyXG4gICAgICAgICAgICAgICAgaW5kZXggLT0gX1NsaWRlQ291bnQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gaW5kZXggKyBfT3B0aW9ucy4kQXV0b1BsYXlTdGVwcyAqIF9QbGF5UmV2ZXJzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfTG9vcCAmIDIpIHtcclxuICAgICAgICAgICAgICAgIC8vUmV3aW5kXHJcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSBHZXRSZWFsSW5kZXgobmV4dEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIShfTG9vcCAmIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAvL1N0b3AgYXQgdGhyZXNob2xkXHJcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihuZXh0SW5kZXgsIF9TbGlkZUNvdW50IC0gX0Rpc3BsYXlQaWVjZXMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5leHRJbmRleCAhPSBzbGlkZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX1NsaWRlc2hvd1J1bm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZXNob3dUcmFuc2l0aW9uID0gX1NsaWRlc2hvd1J1bm5lci4kR2V0VHJhbnNpdGlvbihfU2xpZGVDb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXNob3dUcmFuc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2FkaW5nVGlja2V0ID0gX0xvYWRpbmdUaWNrZXQgPSAkSnNzb3IkLiRHZXROb3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0SXRlbSA9IF9TbGlkZUl0ZW1zW0dldFJlYWxJbmRleChuZXh0SW5kZXgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHRJdGVtLiRMb2FkSW1hZ2UoJEpzc29yJC4kQ3JlYXRlQ2FsbGJhY2sobnVsbCwgTG9hZFNsaWRlc2hvd0ltYWdlQ29tcGxldGVFdmVudEhhbmRsZXIsIG5leHRJbmRleCwgbmV4dEl0ZW0sIHNsaWRlc2hvd1RyYW5zaXRpb24sIGxvYWRpbmdUaWNrZXQpLCBfTG9hZGluZ1NjcmVlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFBsYXlUbyhuZXh0SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGZTbGlkZUl0ZW0uJFRyeUFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBQYXJrRXZlbnRIYW5kbGVyKHNsaWRlSW5kZXgsIHNsaWRlSW5kZXgsIHRydWUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIF9TZWxmU2xpZGVJdGVtLiRQYXJrT3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3Bhcmsgb3V0XHJcbiAgICAgICAgICAgIF9QbGF5ZXJJbnN0YW5jZSAmJiBfUGxheWVySW5zdGFuY2UuJFF1aXQoKTtcclxuICAgICAgICAgICAgX1BsYXllckluc3RhbmNlICYmIF9QbGF5ZXJJbnN0YW5jZS4kRGlzYWJsZSgpO1xyXG4gICAgICAgICAgICBfU2VsZlNsaWRlSXRlbS4kVW5oaWRlQ29udGVudEZvclNsaWRlc2hvdygpO1xyXG4gICAgICAgICAgICBfUHJvY2Vzc29yICYmIF9Qcm9jZXNzb3IuJEFib3J0KCk7XHJcbiAgICAgICAgICAgIF9Qcm9jZXNzb3IgPSBudWxsO1xyXG4gICAgICAgICAgICBSZXNldENhcHRpb25TbGlkZXIoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2ZvciBkZWJ1ZyBvbmx5XHJcbiAgICAgICAgX1NlbGZTbGlkZUl0ZW0uJFN0YW1wU2xpZGVJdGVtRWxlbWVudHMgPSBmdW5jdGlvbiAoc3RhbXApIHtcclxuICAgICAgICAgICAgc3RhbXAgPSBfU2VxdWVuY2VOdW1iZXIgKyBcIl9cIiArIHN0YW1wO1xyXG5cclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfSW1hZ2VJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvciQuJEF0dHJpYnV0ZShfSW1hZ2VJdGVtLCBcImRlYnVnLWlkXCIsIHN0YW1wICsgXCJfc2xpZGVfaXRlbV9pbWFnZV9pZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBdHRyaWJ1dGUoc2xpZGVFbG10LCBcImRlYnVnLWlkXCIsIHN0YW1wICsgXCJfc2xpZGVfaXRlbV9pdGVtX2lkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBdHRyaWJ1dGUoX1dyYXBwZXIsIFwiZGVidWctaWRcIiwgc3RhbXAgKyBcIl9zbGlkZV9pdGVtX3dyYXBwZXJfaWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJEF0dHJpYnV0ZShfTG9hZGluZ1NjcmVlbiwgXCJkZWJ1Zy1pZFwiLCBzdGFtcCArIFwiX2xvYWRpbmdfY29udGFpbmVyX2lkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZlNsaWRlSXRlbS4kSGlkZUNvbnRlbnRGb3JTbGlkZXNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRKc3NvciQuJEhpZGVFbGVtZW50KHNsaWRlRWxtdCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGZTbGlkZUl0ZW0uJFVuaGlkZUNvbnRlbnRGb3JTbGlkZXNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRKc3NvciQuJFNob3dFbGVtZW50KHNsaWRlRWxtdCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGZTbGlkZUl0ZW0uJEVuYWJsZVBsYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX1BsYXllckluc3RhbmNlICYmIF9QbGF5ZXJJbnN0YW5jZS4kRW5hYmxlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gUmVmcmVzaENvbnRlbnQoZWxtdCwgZnJlc2gsIGxldmVsKSB7XHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJEpzc29yJC4kQXR0cmlidXRlKGVsbXQsIFwianNzb3Itc2xpZGVyXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kTG9nKFwiQ2hpbGQgc2xpZGVyIGZvdW5kLlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJEpzc29yJC4kQXR0cmlidXRlKGVsbXQsIFwianNzb3Itc2xpZGVyXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV2ZWwgPSBsZXZlbCB8fCAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFfQ29udGVudFJlZnJlc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsbXQudGFnTmFtZSA9PSBcIklNR1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX0ltYWdlRWxtdHMucHVzaChlbG10KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkSnNzb3IkLiRBdHRyaWJ1dGUoZWxtdCwgXCJzcmNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX0ltYWdlTGF6eUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbG10W1wiZGlzcGxheS1vcmlnaW5cIl0gPSAkSnNzb3IkLiRDc3NEaXNwbGF5KGVsbXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRIaWRlRWxlbWVudChlbG10KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoJEpzc29yJC4kSXNCcm93c2VySWU5RWFybGllcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzWkluZGV4KGVsbXQsICgkSnNzb3IkLiRDc3NaSW5kZXgoZWxtdCkgfHwgMCkgKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChfT3B0aW9ucy4kSFdBICYmICRKc3NvciQuJFdlYktpdFZlcnNpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkSnNzb3IkLiRXZWJLaXRWZXJzaW9uKCkgPCA1MzQgfHwgKCFfU2xpZGVzaG93RW5hYmxlZCAmJiAhJEpzc29yJC4kSXNCcm93c2VyQ2hyb21lKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRKc3NvciQuJEVuYWJsZUhXQShlbG10KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjaGlsZEVsZW1lbnRzID0gJEpzc29yJC4kQ2hpbGRyZW4oZWxtdCk7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRFYWNoKGNoaWxkRWxlbWVudHMsIGZ1bmN0aW9uIChjaGlsZEVsZW1lbnQsIGkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRUYWdOYW1lID0gY2hpbGRFbGVtZW50LnRhZ05hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgdUF0dHJpYnV0ZSA9ICRKc3NvciQuJEF0dHJpYnV0ZUV4KGNoaWxkRWxlbWVudCwgXCJ1XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVBdHRyaWJ1dGUgPT0gXCJwbGF5ZXJcIiAmJiAhX1BsYXllckluc3RhbmNlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9QbGF5ZXJJbnN0YW5jZUVsZW1lbnQgPSBjaGlsZEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9QbGF5ZXJJbnN0YW5jZUVsZW1lbnQucEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsYXllckF2YWlsYWJsZUV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoX1BsYXllckluc3RhbmNlRWxlbWVudCwgXCJkYXRhYXZhaWxhYmxlXCIsIFBsYXllckF2YWlsYWJsZUV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1QXR0cmlidXRlID09IFwiY2FwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkSnNzb3IkLiRJc0Jyb3dzZXJJRSgpICYmICFmcmVzaCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoY2hpbGRUYWdOYW1lID09IFwiQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICRKc3NvciQuJFJlbW92ZUV2ZW50KGNoaWxkRWxlbWVudCwgXCJjbGlja1wiLCBDb250ZW50Q2xpY2tFdmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAkSnNzb3IkLiRBdHRyaWJ1dGUoY2hpbGRFbGVtZW50LCBcImpzc29yLWNvbnRlbnRcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcHRpb25FbGVtZW50ID0gJEpzc29yJC4kQ2xvbmVOb2RlKGNoaWxkRWxlbWVudCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRJbnNlcnRCZWZvcmUoY2FwdGlvbkVsZW1lbnQsIGNoaWxkRWxlbWVudCwgZWxtdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRKc3NvciQuJFJlbW92ZUVsZW1lbnQoY2hpbGRFbGVtZW50LCBlbG10KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50ID0gY2FwdGlvbkVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmVzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIV9Db250ZW50UmVmcmVzaGVkICYmICFsZXZlbCAmJiAhX0ltYWdlSXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRUYWdOYW1lID09IFwiQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkSnNzb3IkLiRBdHRyaWJ1dGVFeChjaGlsZEVsZW1lbnQsIFwidVwiKSA9PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9JbWFnZUl0ZW0gPSAkSnNzb3IkLiRGaW5kQ2hpbGRCeVRhZyhjaGlsZEVsZW1lbnQsIFwiSU1HXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfSW1hZ2VJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRXJyb3IoXCJzbGlkZSBodG1sIGNvZGUgZGVmaW5pdGlvbiBlcnJvciwgbm8gJ0lNRycgZm91bmQgaW4gYSAnaW1hZ2Ugd2l0aCBsaW5rJyBzbGlkZS5cXHJcXG5cIiArIGVsbXQub3V0ZXJIVE1MKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9JbWFnZUl0ZW0gPSAkSnNzb3IkLiRGaW5kQ2hpbGQoY2hpbGRFbGVtZW50LCBcImltYWdlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX0ltYWdlSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX0xpbmtJdGVtT3JpZ2luID0gY2hpbGRFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kU2V0U3R5bGVzKF9MaW5rSXRlbU9yaWdpbiwgX1N0eWxlRGVmKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfTGlua0l0ZW0gPSAkSnNzb3IkLiRDbG9uZU5vZGUoX0xpbmtJdGVtT3JpZ2luLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJEpzc29yJC4kQWRkRXZlbnQoX0xpbmtJdGVtLCBcImNsaWNrXCIsIENvbnRlbnRDbGlja0V2ZW50SGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzRGlzcGxheShfTGlua0l0ZW0sIFwiYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRTZXRTdHlsZXMoX0xpbmtJdGVtLCBfU3R5bGVEZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzT3BhY2l0eShfTGlua0l0ZW0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzKF9MaW5rSXRlbSwgXCJiYWNrZ3JvdW5kQ29sb3JcIiwgXCIjMDAwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkVGFnTmFtZSA9PSBcIklNR1wiICYmICRKc3NvciQuJEF0dHJpYnV0ZUV4KGNoaWxkRWxlbWVudCwgXCJ1XCIpID09IFwiaW1hZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfSW1hZ2VJdGVtID0gY2hpbGRFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9JbWFnZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX0ltYWdlSXRlbS5ib3JkZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRTZXRTdHlsZXMoX0ltYWdlSXRlbSwgX1N0eWxlRGVmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiAoISRKc3NvciQuJEF0dHJpYnV0ZShjaGlsZEVsZW1lbnQsIFwianNzb3ItY29udGVudFwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy9jYW5jZWwgY2xpY2sgZXZlbnQgb24gPEE+IGVsZW1lbnQgd2hlbiBhIGRyYWcgb2Ygc2xpZGUgc3VjY2VlZGVkXHJcbiAgICAgICAgICAgICAgICAvLyAgICAkSnNzb3IkLiRBZGRFdmVudChjaGlsZEVsZW1lbnQsIFwiY2xpY2tcIiwgQ29udGVudENsaWNrRXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICRKc3NvciQuJEF0dHJpYnV0ZShjaGlsZEVsZW1lbnQsIFwianNzb3ItY29udGVudFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgIFJlZnJlc2hDb250ZW50KGNoaWxkRWxlbWVudCwgZnJlc2gsIGxldmVsICsxKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfU2VsZlNsaWRlSXRlbS4kT25Jbm5lck9mZnNldENoYW5nZSA9IGZ1bmN0aW9uIChvbGRPZmZzZXQsIG5ld09mZnNldCkge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVQb3NpdGlvbiA9IF9EaXNwbGF5UGllY2VzIC0gbmV3T2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgU2V0UG9zaXRpb24oX1dyYXBwZXIsIHNsaWRlUG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgLy9mb2xsb3dpbmcgbGluZXMgYXJlIGZvciBmdXR1cmUgdXNhZ2UsIG5vdCByZWFkeSB5ZXRcclxuICAgICAgICAgICAgLy9pZiAoIV9Jc0RyYWdnaW5nIHx8ICFfSXNDYXB0aW9uU2xpZGVyUGxheWluZ1doZW5EcmFnU3RhcnQpIHtcclxuICAgICAgICAgICAgLy8gICAgdmFyIF9EZWFsV2l0aFBhcmFsbGF4O1xyXG4gICAgICAgICAgICAvLyAgICBpZiAoSXNDdXJyZW50U2xpZGVJbmRleChzbGlkZUluZGV4KSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKF9DYXB0aW9uU2xpZGVyT3B0aW9ucy4kUGxheU91dE1vZGUgPT0gMilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBfRGVhbFdpdGhQYXJhbGxheCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoIV9DYXB0aW9uU2xpZGVyT3B0aW9ucy4kUGxheUluTW9kZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vUGxheUluTW9kZTogMCBub25lXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgX0NhcHRpb25TbGlkZXJJbi4kR29Ub0VuZCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9lbHNlIGlmIChfQ2FwdGlvblNsaWRlck9wdGlvbnMuJFBsYXlJbk1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gICAgLy9QbGF5SW5Nb2RlOiAxIGNoYWluXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyAgICBfQ2FwdGlvblNsaWRlckluLiRHb1RvUG9zaXRpb24oMCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL31cclxuICAgICAgICAgICAgLy8gICAgICAgIGVsc2UgaWYgKF9DYXB0aW9uU2xpZGVyT3B0aW9ucy4kUGxheUluTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9QbGF5SW5Nb2RlOiAyIHBhcmFsbGVsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgX0RlYWxXaXRoUGFyYWxsYXggPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICBpZiAoX0RlYWxXaXRoUGFyYWxsYXgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIF9DYXB0aW9uU2xpZGVySW4uJEdvVG9Qb3NpdGlvbigoX0NhcHRpb25TbGlkZXJJbi4kR2V0UG9zaXRpb25fT3V0ZXJFbmQoKSAtIF9DYXB0aW9uU2xpZGVySW4uJEdldFBvc2l0aW9uX091dGVyQmVnaW4oKSkgKiBNYXRoLmFicyhuZXdPZmZzZXQgLSAxKSAqIC44ICsgX0NhcHRpb25TbGlkZXJJbi4kR2V0UG9zaXRpb25fT3V0ZXJCZWdpbigpKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZlNsaWRlSXRlbS4kR2V0Q2FwdGlvblNsaWRlckluID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX0NhcHRpb25TbGlkZXJJbjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZlNsaWRlSXRlbS4kR2V0Q2FwdGlvblNsaWRlck91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9DYXB0aW9uU2xpZGVyT3V0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIF9TZWxmU2xpZGVJdGVtLiRJbmRleCA9IHNsaWRlSW5kZXg7XHJcblxyXG4gICAgICAgICRKc3Nvck9iamVjdCQuY2FsbChfU2VsZlNsaWRlSXRlbSk7XHJcblxyXG4gICAgICAgIC8vU2xpZGVJdGVtIENvbnN0cnVjdG9yXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRodW1iID0gJEpzc29yJC4kRmluZENoaWxkKHNsaWRlRWxtdCwgXCJ0aHVtYlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHRodW1iKSB7XHJcbiAgICAgICAgICAgICAgICBfU2VsZlNsaWRlSXRlbS4kVGh1bWIgPSAkSnNzb3IkLiRDbG9uZU5vZGUodGh1bWIpO1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kUmVtb3ZlQXR0cmlidXRlKHRodW1iLCBcImlkXCIpO1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kSGlkZUVsZW1lbnQodGh1bWIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRKc3NvciQuJFNob3dFbGVtZW50KHNsaWRlRWxtdCk7XHJcblxyXG4gICAgICAgICAgICBfTG9hZGluZ1NjcmVlbiA9ICRKc3NvciQuJENsb25lTm9kZShfTG9hZGluZ0NvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc1pJbmRleChfTG9hZGluZ1NjcmVlbiwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAvL2NhbmNlbCBjbGljayBldmVudCBvbiA8QT4gZWxlbWVudCB3aGVuIGEgZHJhZyBvZiBzbGlkZSBzdWNjZWVkZWRcclxuICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoc2xpZGVFbG10LCBcImNsaWNrXCIsIFNsaWRlQ2xpY2tFdmVudEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgUmVzZXRDYXB0aW9uU2xpZGVyKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgX1NlbGZTbGlkZUl0ZW0uJEltYWdlID0gX0ltYWdlSXRlbTtcclxuICAgICAgICAgICAgX1NlbGZTbGlkZUl0ZW0uJExpbmsgPSBfTGlua0l0ZW07XHJcblxyXG4gICAgICAgICAgICBfU2VsZlNsaWRlSXRlbS4kSXRlbSA9IHNsaWRlRWxtdDtcclxuXHJcbiAgICAgICAgICAgIF9TZWxmU2xpZGVJdGVtLiRXcmFwcGVyID0gX1dyYXBwZXIgPSBzbGlkZUVsbXQ7XHJcbiAgICAgICAgICAgICRKc3NvciQuJEFwcGVuZENoaWxkKF9XcmFwcGVyLCBfTG9hZGluZ1NjcmVlbik7XHJcblxyXG4gICAgICAgICAgICBfU2VsZlNsaWRlci4kT24oMjAzLCBQYXJrRXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgX1NlbGZTbGlkZXIuJE9uKDI4LCBGcmVlemVFdmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBfU2VsZlNsaWRlci4kT24oMjQsIFN3aXBlU3RhcnRFdmVudEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF9TZXF1ZW5jZU51bWJlciA9IF9TbGlkZUl0ZW1DcmVhdGVkQ291bnQrKztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQXR0cmlidXRlKF9XcmFwcGVyLCBcImRlYnVnLWlkXCIsIFwic2xpZGUtXCIgKyBzbGlkZUluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9TbGlkZUl0ZW1cclxuXHJcbiAgICAvL1Byb2Nlc3NvclxyXG4gICAgZnVuY3Rpb24gUHJvY2Vzc29yKHNsaWRlRWxtdCwgc2xpZGVJbmRleCwgc2xpZGVzaG93UHJvY2Vzc29yLCBjYXB0aW9uU2xpZGVySW4sIGNhcHRpb25TbGlkZXJPdXQpIHtcclxuXHJcbiAgICAgICAgdmFyIF9TZWxmUHJvY2Vzc29yID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIF9Qcm9ncmVzc0JlZ2luID0gMDtcclxuICAgICAgICB2YXIgX1NsaWRlc2hvd0JlZ2luID0gMDtcclxuICAgICAgICB2YXIgX1NsaWRlc2hvd0VuZDtcclxuICAgICAgICB2YXIgX0NhcHRpb25JbkJlZ2luO1xyXG4gICAgICAgIHZhciBfSWRsZUJlZ2luO1xyXG4gICAgICAgIHZhciBfSWRsZUVuZDtcclxuICAgICAgICB2YXIgX1Byb2dyZXNzRW5kO1xyXG5cclxuICAgICAgICB2YXIgX0lzU2xpZGVzaG93UnVubmluZztcclxuICAgICAgICB2YXIgX0lzUm9sbGluZ0JhY2s7XHJcblxyXG4gICAgICAgIHZhciBfUGxheWVySW5zdGFuY2U7XHJcbiAgICAgICAgdmFyIF9Jc1BsYXllck9uU2VydmljZTtcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlSXRlbSA9IF9TbGlkZUl0ZW1zW3NsaWRlSW5kZXhdO1xyXG5cclxuICAgICAgICAkSnNzb3JBbmltYXRvciQuY2FsbChfU2VsZlByb2Nlc3NvciwgMCwgMCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIFVwZGF0ZUxpbmsoKSB7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRFbXB0eShfTGlua0NvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICBpZiAoX1Nob3dMaW5rICYmIF9Jc1NsaWRlc2hvd1J1bm5pbmcgJiYgc2xpZGVJdGVtLiRMaW5rKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBcHBlbmRDaGlsZChfTGlua0NvbnRhaW5lciwgc2xpZGVJdGVtLiRMaW5rKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJEpzc29yJC4kU2hvd0VsZW1lbnQoX0xpbmtDb250YWluZXIsICFfSXNTbGlkZXNob3dSdW5uaW5nICYmIHNsaWRlSXRlbS4kSW1hZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gUHJvY2Vzc0NvbXBsZXRlRXZlbnRIYW5kbGVyKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKF9Jc1JvbGxpbmdCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBfSXNSb2xsaW5nQmFjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgX1NlbGZTbGlkZXIuJFRyaWdnZXJFdmVudCgkSnNzb3JTbGlkZXIkLiRFVlRfUk9MTEJBQ0tfRU5ELCBzbGlkZUluZGV4LCBfSWRsZUVuZCwgX1Byb2dyZXNzQmVnaW4sIF9JZGxlQmVnaW4sIF9JZGxlRW5kLCBfUHJvZ3Jlc3NFbmQpO1xyXG4gICAgICAgICAgICAgICAgX1NlbGZQcm9jZXNzb3IuJEdvVG9Qb3NpdGlvbihfSWRsZUJlZ2luKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX1NlbGZQcm9jZXNzb3IuJFJlcGxheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gUGxheWVyU3dpdGNoRXZlbnRIYW5kbGVyKGlzT25TZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIF9Jc1BsYXllck9uU2VydmljZSA9IGlzT25TZXJ2aWNlO1xyXG5cclxuICAgICAgICAgICAgX1NlbGZQcm9jZXNzb3IuJFN0b3AoKTtcclxuICAgICAgICAgICAgX1NlbGZQcm9jZXNzb3IuJFJlcGxheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX1NlbGZQcm9jZXNzb3IuJFJlcGxheSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSBfU2VsZlByb2Nlc3Nvci4kR2V0UG9zaXRpb25fRGlzcGxheSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFfSXNEcmFnZ2luZyAmJiAhX0lzU2xpZGluZyAmJiAhX0lzUGxheWVyT25TZXJ2aWNlICYmIF9DdXJyZW50U2xpZGVJbmRleCA9PSBzbGlkZUluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX1NsaWRlc2hvd0VuZCAmJiAhX0lzU2xpZGVzaG93UnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfSXNTbGlkZXNob3dSdW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9TZWxmUHJvY2Vzc29yLiRPcGVuU2xpZGVzaG93UGFuZWwodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KCRKc3NvclNsaWRlciQuJEVWVF9TTElERVNIT1dfU1RBUlQsIHNsaWRlSW5kZXgsIF9Qcm9ncmVzc0JlZ2luLCBfU2xpZGVzaG93QmVnaW4sIF9TbGlkZXNob3dFbmQsIF9Qcm9ncmVzc0VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBVcGRhdGVMaW5rKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGVFdmVudCA9ICRKc3NvclNsaWRlciQuJEVWVF9TVEFURV9DSEFOR0U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3NpdGlvbiAhPSBfUHJvZ3Jlc3NFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBvc2l0aW9uID09IF9JZGxlRW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUG9zaXRpb24gPSBfUHJvZ3Jlc3NFbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnRQb3NpdGlvbiA9PSBfSWRsZUJlZ2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUG9zaXRpb24gPSBfSWRsZUVuZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWN1cnJlbnRQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b1Bvc2l0aW9uID0gX0lkbGVCZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudFBvc2l0aW9uID4gX0lkbGVFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX0lzUm9sbGluZ0JhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b1Bvc2l0aW9uID0gX0lkbGVFbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlRXZlbnQgPSAkSnNzb3JTbGlkZXIkLiRFVlRfUk9MTEJBQ0tfU1RBUlQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRpbnVlIGZyb20gYnJlYWsgKGJ5IGRyYWcgb3IgbG9jaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9Qb3NpdGlvbiA9IF9TZWxmUHJvY2Vzc29yLiRHZXRQbGF5VG9Qb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KHN0YXRlRXZlbnQsIHNsaWRlSW5kZXgsIGN1cnJlbnRQb3NpdGlvbiwgX1Byb2dyZXNzQmVnaW4sIF9JZGxlQmVnaW4sIF9JZGxlRW5kLCBfUHJvZ3Jlc3NFbmQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhbGxvd0F1dG9QbGF5ID0gX0F1dG9QbGF5ICYmICghX0hvdmVyVG9QYXVzZSB8fCBfTm90T25Ib3Zlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3NpdGlvbiA9PSBfUHJvZ3Jlc3NFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAoX0lkbGVFbmQgIT0gX1Byb2dyZXNzRW5kICYmICEoX0hvdmVyVG9QYXVzZSAmIDEyKSB8fCBhbGxvd0F1dG9QbGF5KSAmJiBzbGlkZUl0ZW0uJEdvRm9yTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhbGxvd0F1dG9QbGF5IHx8IGN1cnJlbnRQb3NpdGlvbiAhPSBfSWRsZUVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9TZWxmUHJvY2Vzc29yLiRQbGF5VG9Qb3NpdGlvbih0b1Bvc2l0aW9uLCBQcm9jZXNzQ29tcGxldGVFdmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGZQcm9jZXNzb3IuJEFkanVzdElkbGVPblBhcmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChfSWRsZUVuZCA9PSBfUHJvZ3Jlc3NFbmQgJiYgX0lkbGVFbmQgPT0gX1NlbGZQcm9jZXNzb3IuJEdldFBvc2l0aW9uX0Rpc3BsYXkoKSlcclxuICAgICAgICAgICAgICAgIF9TZWxmUHJvY2Vzc29yLiRHb1RvUG9zaXRpb24oX0lkbGVCZWdpbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGZQcm9jZXNzb3IuJEFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfU2xpZGVzaG93UnVubmVyICYmIF9TbGlkZXNob3dSdW5uZXIuJEluZGV4ID09IHNsaWRlSW5kZXggJiYgX1NsaWRlc2hvd1J1bm5lci4kQ2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSBfU2VsZlByb2Nlc3Nvci4kR2V0UG9zaXRpb25fRGlzcGxheSgpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFBvc2l0aW9uIDwgX1Byb2dyZXNzRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KCRKc3NvclNsaWRlciQuJEVWVF9TVEFURV9DSEFOR0UsIHNsaWRlSW5kZXgsIC1jdXJyZW50UG9zaXRpb24gLSAxLCBfUHJvZ3Jlc3NCZWdpbiwgX0lkbGVCZWdpbiwgX0lkbGVFbmQsIF9Qcm9ncmVzc0VuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZlByb2Nlc3Nvci4kT3BlblNsaWRlc2hvd1BhbmVsID0gZnVuY3Rpb24gKG9wZW4pIHtcclxuICAgICAgICAgICAgaWYgKHNsaWRlc2hvd1Byb2Nlc3Nvcikge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzT3ZlcmZsb3coX1NsaWRlc2hvd1BhbmVsLCBvcGVuICYmIHNsaWRlc2hvd1Byb2Nlc3Nvci4kVHJhbnNpdGlvbi4kT3V0c2lkZSA/IFwiXCIgOiBcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIF9TZWxmUHJvY2Vzc29yLiRPbklubmVyT2Zmc2V0Q2hhbmdlID0gZnVuY3Rpb24gKG9sZFBvc2l0aW9uLCBuZXdQb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKF9Jc1NsaWRlc2hvd1J1bm5pbmcgJiYgbmV3UG9zaXRpb24gPj0gX1NsaWRlc2hvd0VuZCkge1xyXG4gICAgICAgICAgICAgICAgX0lzU2xpZGVzaG93UnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlTGluaygpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVJdGVtLiRVbmhpZGVDb250ZW50Rm9yU2xpZGVzaG93KCk7XHJcbiAgICAgICAgICAgICAgICBfU2xpZGVzaG93UnVubmVyLiRDbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9TZWxmU2xpZGVyLiRUcmlnZ2VyRXZlbnQoJEpzc29yU2xpZGVyJC4kRVZUX1NMSURFU0hPV19FTkQsIHNsaWRlSW5kZXgsIF9Qcm9ncmVzc0JlZ2luLCBfU2xpZGVzaG93QmVnaW4sIF9TbGlkZXNob3dFbmQsIF9Qcm9ncmVzc0VuZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9TZWxmU2xpZGVyLiRUcmlnZ2VyRXZlbnQoJEpzc29yU2xpZGVyJC4kRVZUX1BST0dSRVNTX0NIQU5HRSwgc2xpZGVJbmRleCwgbmV3UG9zaXRpb24sIF9Qcm9ncmVzc0JlZ2luLCBfSWRsZUJlZ2luLCBfSWRsZUVuZCwgX1Byb2dyZXNzRW5kKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfU2VsZlByb2Nlc3Nvci4kU2V0UGxheWVyID0gZnVuY3Rpb24gKHBsYXllckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnN0YW5jZSAmJiAhX1BsYXllckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBfUGxheWVySW5zdGFuY2UgPSBwbGF5ZXJJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJJbnN0YW5jZS4kT24oJEpzc29yUGxheWVyJC4kRVZUX1NXSVRDSCwgUGxheWVyU3dpdGNoRXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vUHJvY2Vzc29yIENvbnN0cnVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc2xpZGVzaG93UHJvY2Vzc29yKSB7XHJcbiAgICAgICAgICAgICAgICBfU2VsZlByb2Nlc3Nvci4kQ2hhaW4oc2xpZGVzaG93UHJvY2Vzc29yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX1NsaWRlc2hvd0VuZCA9IF9TZWxmUHJvY2Vzc29yLiRHZXRQb3NpdGlvbl9PdXRlckVuZCgpO1xyXG4gICAgICAgICAgICBfQ2FwdGlvbkluQmVnaW4gPSBfU2VsZlByb2Nlc3Nvci4kR2V0UG9zaXRpb25fT3V0ZXJFbmQoKTtcclxuICAgICAgICAgICAgX1NlbGZQcm9jZXNzb3IuJENoYWluKGNhcHRpb25TbGlkZXJJbik7XHJcbiAgICAgICAgICAgIF9JZGxlQmVnaW4gPSBjYXB0aW9uU2xpZGVySW4uJEdldFBvc2l0aW9uX091dGVyRW5kKCk7XHJcbiAgICAgICAgICAgIF9JZGxlRW5kID0gX0lkbGVCZWdpbiArICgkSnNzb3IkLiRQYXJzZUZsb2F0KCRKc3NvciQuJEF0dHJpYnV0ZUV4KHNsaWRlRWxtdCwgXCJpZGxlXCIpKSB8fCBfQXV0b1BsYXlJbnRlcnZhbCk7XHJcblxyXG4gICAgICAgICAgICBjYXB0aW9uU2xpZGVyT3V0LiRTaGlmdChfSWRsZUVuZCk7XHJcbiAgICAgICAgICAgIF9TZWxmUHJvY2Vzc29yLiRDb21iaW5lKGNhcHRpb25TbGlkZXJPdXQpO1xyXG4gICAgICAgICAgICBfUHJvZ3Jlc3NFbmQgPSBfU2VsZlByb2Nlc3Nvci4kR2V0UG9zaXRpb25fT3V0ZXJFbmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL1Byb2Nlc3NvclxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgZnVuY3Rpb24gU2V0UG9zaXRpb24oZWxtdCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgb3JpZW50YXRpb24gPSBfRHJhZ09yaWVudGF0aW9uID4gMCA/IF9EcmFnT3JpZW50YXRpb24gOiBfUGxheU9yaWVudGF0aW9uO1xyXG4gICAgICAgIHZhciB4ID0gX1N0ZXBMZW5ndGhYICogcG9zaXRpb24gKiAob3JpZW50YXRpb24gJiAxKTtcclxuICAgICAgICB2YXIgeSA9IF9TdGVwTGVuZ3RoWSAqIHBvc2l0aW9uICogKChvcmllbnRhdGlvbiA+PiAxKSAmIDEpO1xyXG5cclxuICAgICAgICB4ID0gTWF0aC5yb3VuZCh4KTtcclxuICAgICAgICB5ID0gTWF0aC5yb3VuZCh5KTtcclxuXHJcbiAgICAgICAgJEpzc29yJC4kQ3NzTGVmdChlbG10LCB4KTtcclxuICAgICAgICAkSnNzb3IkLiRDc3NUb3AoZWxtdCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jcmVnaW9uIEV2ZW50IGhhbmRsaW5nIGJlZ2luXHJcblxyXG4gICAgZnVuY3Rpb24gUmVjb3JkRnJlZXplUG9pbnQoKSB7XHJcbiAgICAgICAgX0Nhcm91c2VsUGxheWluZ19PbkZyZWV6ZSA9IF9Jc1NsaWRpbmc7XHJcbiAgICAgICAgX1BsYXlUb1Bvc2l0aW9uX09uRnJlZXplID0gX0Nhcm91c2VsUGxheWVyLiRHZXRQbGF5VG9Qb3NpdGlvbigpO1xyXG4gICAgICAgIF9Qb3NpdGlvbl9PbkZyZWV6ZSA9IF9Db252ZXlvci4kR2V0UG9zaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBGcmVlemUoKSB7XHJcbiAgICAgICAgUmVjb3JkRnJlZXplUG9pbnQoKTtcclxuXHJcbiAgICAgICAgaWYgKF9Jc0RyYWdnaW5nIHx8ICFfTm90T25Ib3ZlciAmJiAoX0hvdmVyVG9QYXVzZSAmIDEyKSkge1xyXG4gICAgICAgICAgICBfQ2Fyb3VzZWxQbGF5ZXIuJFN0b3AoKTtcclxuXHJcbiAgICAgICAgICAgIF9TZWxmU2xpZGVyLiRUcmlnZ2VyRXZlbnQoJEpzc29yU2xpZGVyJC4kRVZUX0ZSRUVaRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFVuZnJlZXplKGJ5RHJhZykge1xyXG5cclxuICAgICAgICBpZiAoIV9Jc0RyYWdnaW5nICYmIChfTm90T25Ib3ZlciB8fCAhKF9Ib3ZlclRvUGF1c2UgJiAxMikpICYmICFfQ2Fyb3VzZWxQbGF5ZXIuJElzUGxheWluZygpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gX0NvbnZleW9yLiRHZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB2YXIgdG9Qb3NpdGlvbiA9IE1hdGguY2VpbChfUG9zaXRpb25fT25GcmVlemUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJ5RHJhZyAmJiBNYXRoLmFicyhfRHJhZ09mZnNldFRvdGFsKSA+PSBfT3B0aW9ucy4kTWluRHJhZ09mZnNldFRvU2xpZGUpIHtcclxuICAgICAgICAgICAgICAgIHRvUG9zaXRpb24gPSBNYXRoLmNlaWwoY3VycmVudFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRvUG9zaXRpb24gKz0gX0RyYWdJbmRleEFkanVzdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEoX0xvb3AgJiAxKSkge1xyXG4gICAgICAgICAgICAgICAgdG9Qb3NpdGlvbiA9IE1hdGgubWluKF9TbGlkZUNvdW50IC0gX0Rpc3BsYXlQaWVjZXMsIE1hdGgubWF4KHRvUG9zaXRpb24sIDApKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHQgPSBNYXRoLmFicyh0b1Bvc2l0aW9uIC0gY3VycmVudFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdCA9IDEgLSBNYXRoLnBvdygxIC0gdCwgNSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIV9MYXN0RHJhZ1N1Y2NlZGVkICYmIF9DYXJvdXNlbFBsYXlpbmdfT25GcmVlemUpIHtcclxuICAgICAgICAgICAgICAgIF9DYXJvdXNlbFBsYXllci4kQ29udGludWUoX1BsYXlUb1Bvc2l0aW9uX09uRnJlZXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50UG9zaXRpb24gPT0gdG9Qb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgX0N1cnJlbnRTbGlkZUl0ZW0uJEVuYWJsZVBsYXllcigpO1xyXG4gICAgICAgICAgICAgICAgX0N1cnJlbnRTbGlkZUl0ZW0uJFRyeUFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgX0Nhcm91c2VsUGxheWVyLiRQbGF5Q2Fyb3VzZWwoY3VycmVudFBvc2l0aW9uLCB0b1Bvc2l0aW9uLCB0ICogX1NsaWRlRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFByZXZlbnREcmFnU2VsZWN0aW9uRXZlbnQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoISRKc3NvciQuJEF0dHJpYnV0ZUV4KCRKc3NvciQuJEV2dFNyYyhldmVudCksIFwibm9kcmFnXCIpKSB7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENhbmNlbEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gT25Ub3VjaFN0YXJ0KGV2ZW50KSB7XHJcbiAgICAgICAgT25EcmFnU3RhcnQoZXZlbnQsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE9uRHJhZ1N0YXJ0KGV2ZW50LCB0b3VjaCkge1xyXG4gICAgICAgIGV2ZW50ID0gJEpzc29yJC4kR2V0RXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIHZhciBldmVudFNyYyA9ICRKc3NvciQuJEV2dFNyYyhldmVudCk7XHJcblxyXG4gICAgICAgIGlmICghX0RyYWdPcmllbnRhdGlvblJlZ2lzdGVyZWQgJiYgISRKc3NvciQuJEF0dHJpYnV0ZUV4KGV2ZW50U3JjLCBcIm5vZHJhZ1wiKSAmJiBSZWdpc3RlckRyYWcoKSAmJiAoIXRvdWNoIHx8IGV2ZW50LnRvdWNoZXMubGVuZ3RoID09IDEpKSB7XHJcbiAgICAgICAgICAgIF9Jc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgX0RyYWdJbnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIF9Mb2FkaW5nVGlja2V0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJEFkZEV2ZW50KGRvY3VtZW50LCB0b3VjaCA/IFwidG91Y2htb3ZlXCIgOiBcIm1vdXNlbW92ZVwiLCBPbkRyYWdNb3ZlKTtcclxuXHJcbiAgICAgICAgICAgIF9MYXN0VGltZU1vdmVCeURyYWcgPSAkSnNzb3IkLiRHZXROb3coKSAtIDUwO1xyXG5cclxuICAgICAgICAgICAgX0xhc3REcmFnU3VjY2VkZWQgPSAwO1xyXG4gICAgICAgICAgICBGcmVlemUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghX0Nhcm91c2VsUGxheWluZ19PbkZyZWV6ZSlcclxuICAgICAgICAgICAgICAgIF9EcmFnT3JpZW50YXRpb24gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG91Y2hQb2ludCA9IGV2ZW50LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICBfRHJhZ1N0YXJ0TW91c2VYID0gdG91Y2hQb2ludC5jbGllbnRYO1xyXG4gICAgICAgICAgICAgICAgX0RyYWdTdGFydE1vdXNlWSA9IHRvdWNoUG9pbnQuY2xpZW50WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb3VzZVBvaW50ID0gJEpzc29yJC4kTW91c2VQb3NpdGlvbihldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX0RyYWdTdGFydE1vdXNlWCA9IG1vdXNlUG9pbnQueDtcclxuICAgICAgICAgICAgICAgIF9EcmFnU3RhcnRNb3VzZVkgPSBtb3VzZVBvaW50Lnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9EcmFnT2Zmc2V0VG90YWwgPSAwO1xyXG4gICAgICAgICAgICBfRHJhZ09mZnNldExhc3RUaW1lID0gMDtcclxuICAgICAgICAgICAgX0RyYWdJbmRleEFkanVzdCA9IDA7XHJcblxyXG4gICAgICAgICAgICAvL1RyaWdnZXIgRVZUX0RSQUdTVEFSVFxyXG4gICAgICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KCRKc3NvclNsaWRlciQuJEVWVF9EUkFHX1NUQVJULCBHZXRSZWFsSW5kZXgoX1Bvc2l0aW9uX09uRnJlZXplKSwgX1Bvc2l0aW9uX09uRnJlZXplLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE9uRHJhZ01vdmUoZXZlbnQpIHtcclxuICAgICAgICBpZiAoX0lzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgZXZlbnQgPSAkSnNzb3IkLiRHZXRFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uUG9pbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSAhPSBcIm1vdXNlbW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uUG9pbnQgPSB7IHg6IHRvdWNoLmNsaWVudFgsIHk6IHRvdWNoLmNsaWVudFkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvblBvaW50ID0gJEpzc29yJC4kTW91c2VQb3NpdGlvbihldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25Qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlWCA9IGFjdGlvblBvaW50LnggLSBfRHJhZ1N0YXJ0TW91c2VYO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlWSA9IGFjdGlvblBvaW50LnkgLSBfRHJhZ1N0YXJ0TW91c2VZO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcihfUG9zaXRpb25fT25GcmVlemUpICE9IF9Qb3NpdGlvbl9PbkZyZWV6ZSlcclxuICAgICAgICAgICAgICAgICAgICBfRHJhZ09yaWVudGF0aW9uID0gX0RyYWdPcmllbnRhdGlvbiB8fCAoX1BsYXlPcmllbnRhdGlvbiAmIF9EcmFnT3JpZW50YXRpb25SZWdpc3RlcmVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGRpc3RhbmNlWCB8fCBkaXN0YW5jZVkpICYmICFfRHJhZ09yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9EcmFnT3JpZW50YXRpb25SZWdpc3RlcmVkID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWSkgPiBNYXRoLmFicyhkaXN0YW5jZVgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRHJhZ09yaWVudGF0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRHJhZ09yaWVudGF0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9EcmFnT3JpZW50YXRpb24gPSBfRHJhZ09yaWVudGF0aW9uUmVnaXN0ZXJlZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfSXNUb3VjaERldmljZSAmJiBfRHJhZ09yaWVudGF0aW9uID09IDEgJiYgTWF0aC5hYnMoZGlzdGFuY2VZKSAtIE1hdGguYWJzKGRpc3RhbmNlWCkgPiAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9EcmFnSW52YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfRHJhZ09yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gZGlzdGFuY2VZO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGVwTGVuZ3RoID0gX1N0ZXBMZW5ndGhZO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX0RyYWdPcmllbnRhdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gZGlzdGFuY2VYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwTGVuZ3RoID0gX1N0ZXBMZW5ndGhYO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoX0xvb3AgJiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9ybWFsRGlzdGFuY2UgPSBzdGVwTGVuZ3RoICogX0N1cnJlbnRTbGlkZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNxcnREaXN0YW5jZSA9IGRpc3RhbmNlIC0gbm9ybWFsRGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3FydERpc3RhbmNlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gbm9ybWFsRGlzdGFuY2UgKyBNYXRoLnNxcnQoc3FydERpc3RhbmNlKSAqIDU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3JtYWxEaXN0YW5jZSA9IHN0ZXBMZW5ndGggKiAoX1NsaWRlQ291bnQgLSBfRGlzcGxheVBpZWNlcyAtIF9DdXJyZW50U2xpZGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3FydERpc3RhbmNlID0gLWRpc3RhbmNlIC0gbm9ybWFsRGlzdGFuY2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNxcnREaXN0YW5jZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IC1ub3JtYWxEaXN0YW5jZSAtIE1hdGguc3FydChzcXJ0RGlzdGFuY2UpICogNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9EcmFnT2Zmc2V0VG90YWwgLSBfRHJhZ09mZnNldExhc3RUaW1lIDwgLTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX0RyYWdJbmRleEFkanVzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF9EcmFnT2Zmc2V0VG90YWwgLSBfRHJhZ09mZnNldExhc3RUaW1lID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfRHJhZ0luZGV4QWRqdXN0ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBfRHJhZ09mZnNldExhc3RUaW1lID0gX0RyYWdPZmZzZXRUb3RhbDtcclxuICAgICAgICAgICAgICAgICAgICBfRHJhZ09mZnNldFRvdGFsID0gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX1Bvc2l0aW9uVG9Hb0J5RHJhZyA9IF9Qb3NpdGlvbl9PbkZyZWV6ZSAtIF9EcmFnT2Zmc2V0VG90YWwgLyBzdGVwTGVuZ3RoIC8gKF9TY2FsZVJhdGlvIHx8IDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX0RyYWdPZmZzZXRUb3RhbCAmJiBfRHJhZ09yaWVudGF0aW9uICYmICFfRHJhZ0ludmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQ2FuY2VsRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9Jc1NsaWRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DYXJvdXNlbFBsYXllci4kU3RhbmRCeShfUG9zaXRpb25Ub0dvQnlEcmFnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2Fyb3VzZWxQbGF5ZXIuJFNldFN0YW5kQnlQb3NpdGlvbihfUG9zaXRpb25Ub0dvQnlEcmFnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gT25EcmFnRW5kKCkge1xyXG4gICAgICAgIFVucmVnaXN0ZXJEcmFnKCk7XHJcblxyXG4gICAgICAgIGlmIChfSXNEcmFnZ2luZykge1xyXG5cclxuICAgICAgICAgICAgX0lzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIF9MYXN0VGltZU1vdmVCeURyYWcgPSAkSnNzb3IkLiRHZXROb3coKTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJFJlbW92ZUV2ZW50KGRvY3VtZW50LCBcIm1vdXNlbW92ZVwiLCBPbkRyYWdNb3ZlKTtcclxuICAgICAgICAgICAgJEpzc29yJC4kUmVtb3ZlRXZlbnQoZG9jdW1lbnQsIFwidG91Y2htb3ZlXCIsIE9uRHJhZ01vdmUpO1xyXG5cclxuICAgICAgICAgICAgX0xhc3REcmFnU3VjY2VkZWQgPSBfRHJhZ09mZnNldFRvdGFsO1xyXG5cclxuICAgICAgICAgICAgX0Nhcm91c2VsUGxheWVyLiRTdG9wKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gX0NvbnZleW9yLiRHZXRQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgLy9UcmlnZ2VyIEVWVF9EUkFHX0VORFxyXG4gICAgICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KCRKc3NvclNsaWRlciQuJEVWVF9EUkFHX0VORCwgR2V0UmVhbEluZGV4KGN1cnJlbnRQb3NpdGlvbiksIGN1cnJlbnRQb3NpdGlvbiwgR2V0UmVhbEluZGV4KF9Qb3NpdGlvbl9PbkZyZWV6ZSksIF9Qb3NpdGlvbl9PbkZyZWV6ZSk7XHJcblxyXG4gICAgICAgICAgICAoX0hvdmVyVG9QYXVzZSAmIDEyKSAmJiBSZWNvcmRGcmVlemVQb2ludCgpO1xyXG5cclxuICAgICAgICAgICAgVW5mcmVlemUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFNsaWRlc0NsaWNrRXZlbnRIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKF9MYXN0RHJhZ1N1Y2NlZGVkKSB7XHJcbiAgICAgICAgICAgICRKc3NvciQuJFN0b3BFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hlY2tFbGVtZW50ID0gJEpzc29yJC4kRXZ0U3JjKGV2ZW50KTtcclxuICAgICAgICAgICAgd2hpbGUgKGNoZWNrRWxlbWVudCAmJiBfU2xpZGVzQ29udGFpbmVyICE9PSBjaGVja0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0VsZW1lbnQudGFnTmFtZSA9PSBcIkFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvciQuJENhbmNlbEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tFbGVtZW50ID0gY2hlY2tFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmlyZWZveCBzb21ldGltZXMgZmlyZXMgZXZlbnRzIGZvciBYVUwgZWxlbWVudHMsIHdoaWNoIHRocm93c1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGEgXCJwZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yLiBzbyB0aGlzIGlzIG5vdCBhIGNoaWxkLlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgZnVuY3Rpb24gU2V0Q3VycmVudFNsaWRlSW5kZXgoaW5kZXgpIHtcclxuICAgICAgICBfUHJldlNsaWRlSXRlbSA9IF9TbGlkZUl0ZW1zW19DdXJyZW50U2xpZGVJbmRleF07XHJcbiAgICAgICAgX1ByZXZpb3VzU2xpZGVJbmRleCA9IF9DdXJyZW50U2xpZGVJbmRleDtcclxuICAgICAgICBfQ3VycmVudFNsaWRlSW5kZXggPSBHZXRSZWFsSW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIF9DdXJyZW50U2xpZGVJdGVtID0gX1NsaWRlSXRlbXNbX0N1cnJlbnRTbGlkZUluZGV4XTtcclxuICAgICAgICBSZXNldE5hdmlnYXRvcihpbmRleCk7XHJcbiAgICAgICAgcmV0dXJuIF9DdXJyZW50U2xpZGVJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBPblBhcmsoc2xpZGVJbmRleCwgcHJldkluZGV4KSB7XHJcbiAgICAgICAgX0RyYWdPcmllbnRhdGlvbiA9IDA7XHJcblxyXG4gICAgICAgIFNldEN1cnJlbnRTbGlkZUluZGV4KHNsaWRlSW5kZXgpO1xyXG5cclxuICAgICAgICAvL1RyaWdnZXIgRVZUX1BBUktcclxuICAgICAgICBfU2VsZlNsaWRlci4kVHJpZ2dlckV2ZW50KCRKc3NvclNsaWRlciQuJEVWVF9QQVJLLCBHZXRSZWFsSW5kZXgoc2xpZGVJbmRleCksIHByZXZJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gUmVzZXROYXZpZ2F0b3IoaW5kZXgsIHRlbXApIHtcclxuICAgICAgICBfVGVtcFNsaWRlSW5kZXggPSBpbmRleDtcclxuICAgICAgICAkSnNzb3IkLiRFYWNoKF9OYXZpZ2F0b3JzLCBmdW5jdGlvbiAobmF2aWdhdG9yKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci4kU2V0Q3VycmVudEluZGV4KEdldFJlYWxJbmRleChpbmRleCksIGluZGV4LCB0ZW1wKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBSZWdpc3RlckRyYWcoKSB7XHJcbiAgICAgICAgdmFyIGRyYWdSZWdpc3RyeSA9ICRKc3NvclNsaWRlciQuJERyYWdSZWdpc3RyeSB8fCAwO1xyXG4gICAgICAgIHZhciBkcmFnT3JpZW50YXRpb24gPSBfRHJhZ0VuYWJsZWQ7XHJcbiAgICAgICAgaWYgKF9Jc1RvdWNoRGV2aWNlKVxyXG4gICAgICAgICAgICAoZHJhZ09yaWVudGF0aW9uICYgMSkgJiYgKGRyYWdPcmllbnRhdGlvbiAmPSAxKTtcclxuICAgICAgICAkSnNzb3JTbGlkZXIkLiREcmFnUmVnaXN0cnkgfD0gZHJhZ09yaWVudGF0aW9uO1xyXG5cclxuICAgICAgICByZXR1cm4gKF9EcmFnT3JpZW50YXRpb25SZWdpc3RlcmVkID0gZHJhZ09yaWVudGF0aW9uICYgfmRyYWdSZWdpc3RyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gVW5yZWdpc3RlckRyYWcoKSB7XHJcbiAgICAgICAgaWYgKF9EcmFnT3JpZW50YXRpb25SZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgICAgICRKc3NvclNsaWRlciQuJERyYWdSZWdpc3RyeSAmPSB+X0RyYWdFbmFibGVkO1xyXG4gICAgICAgICAgICBfRHJhZ09yaWVudGF0aW9uUmVnaXN0ZXJlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIENyZWF0ZVBhbmVsKCkge1xyXG4gICAgICAgIHZhciBkaXYgPSAkSnNzb3IkLiRDcmVhdGVEaXYoKTtcclxuXHJcbiAgICAgICAgJEpzc29yJC4kU2V0U3R5bGVzKGRpdiwgX1N0eWxlRGVmKTtcclxuICAgICAgICAkSnNzb3IkLiRDc3NQb3NpdGlvbihkaXYsIFwiYWJzb2x1dGVcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBkaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gR2V0UmVhbEluZGV4KGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIChpbmRleCAlIF9TbGlkZUNvdW50ICsgX1NsaWRlQ291bnQpICUgX1NsaWRlQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSXNDdXJyZW50U2xpZGVJbmRleChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBHZXRSZWFsSW5kZXgoaW5kZXgpID09IF9DdXJyZW50U2xpZGVJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBJc1ByZXZpb3VzU2xpZGVJbmRleChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBHZXRSZWFsSW5kZXgoaW5kZXgpID09IF9QcmV2aW91c1NsaWRlSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLy9OYXZpZ2F0aW9uIFJlcXVlc3QgSGFuZGxlclxyXG4gICAgZnVuY3Rpb24gTmF2aWdhdGlvbkNsaWNrSGFuZGxlcihpbmRleCwgcmVsYXRpdmUpIHtcclxuICAgICAgICB2YXIgdG9JbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcclxuICAgICAgICAgICAgaWYgKCFfTG9vcCkge1xyXG4gICAgICAgICAgICAgICAgLy9TdG9wIGF0IHRocmVzaG9sZFxyXG4gICAgICAgICAgICAgICAgdG9JbmRleCA9IE1hdGgubWluKE1hdGgubWF4KHRvSW5kZXggKyBfVGVtcFNsaWRlSW5kZXgsIDApLCBfU2xpZGVDb3VudCAtIF9EaXNwbGF5UGllY2VzKTtcclxuICAgICAgICAgICAgICAgIHJlbGF0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX0xvb3AgJiAyKSB7XHJcbiAgICAgICAgICAgICAgICAvL1Jld2luZFxyXG4gICAgICAgICAgICAgICAgdG9JbmRleCA9IEdldFJlYWxJbmRleCh0b0luZGV4ICsgX1RlbXBTbGlkZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHJlbGF0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoX0xvb3ApIHtcclxuICAgICAgICAgICAgdG9JbmRleCA9IF9TZWxmU2xpZGVyLiRHZXRWaXJ0dWFsSW5kZXgodG9JbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQbGF5VG8odG9JbmRleCwgX09wdGlvbnMuJFNsaWRlRHVyYXRpb24sIHJlbGF0aXZlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTaG93TmF2aWdhdG9ycygpIHtcclxuICAgICAgICAkSnNzb3IkLiRFYWNoKF9OYXZpZ2F0b3JzLCBmdW5jdGlvbiAobmF2aWdhdG9yKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci4kU2hvdyhuYXZpZ2F0b3IuJE9wdGlvbnMuJENoYW5jZVRvU2hvdyA8PSBfTm90T25Ib3Zlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gTWFpbkNvbnRhaW5lck1vdXNlTGVhdmVFdmVudEhhbmRsZXIoKSB7XHJcbiAgICAgICAgaWYgKCFfTm90T25Ib3Zlcikge1xyXG5cclxuICAgICAgICAgICAgLy8kSnNzb3JEZWJ1ZyQuJExvZyhcIm1vdXNlbGVhdmVcIik7XHJcblxyXG4gICAgICAgICAgICBfTm90T25Ib3ZlciA9IDE7XHJcblxyXG4gICAgICAgICAgICBTaG93TmF2aWdhdG9ycygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFfSXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgKF9Ib3ZlclRvUGF1c2UgJiAxMikgJiYgVW5mcmVlemUoKTtcclxuICAgICAgICAgICAgICAgIChfSG92ZXJUb1BhdXNlICYgMykgJiYgX1NsaWRlSXRlbXNbX0N1cnJlbnRTbGlkZUluZGV4XS4kVHJ5QWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBNYWluQ29udGFpbmVyTW91c2VFbnRlckV2ZW50SGFuZGxlcigpIHtcclxuXHJcbiAgICAgICAgaWYgKF9Ob3RPbkhvdmVyKSB7XHJcblxyXG4gICAgICAgICAgICAvLyRKc3NvckRlYnVnJC4kTG9nKFwibW91c2VlbnRlclwiKTtcclxuXHJcbiAgICAgICAgICAgIF9Ob3RPbkhvdmVyID0gMDtcclxuXHJcbiAgICAgICAgICAgIFNob3dOYXZpZ2F0b3JzKCk7XHJcblxyXG4gICAgICAgICAgICBfSXNEcmFnZ2luZyB8fCAhKF9Ib3ZlclRvUGF1c2UgJiAxMikgfHwgRnJlZXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEFkanVzdFNsaWRlc0NvbnRhaW5lclNpemUoKSB7XHJcbiAgICAgICAgX1N0eWxlRGVmID0geyAkV2lkdGg6IF9TbGlkZVdpZHRoLCAkSGVpZ2h0OiBfU2xpZGVIZWlnaHQsICRUb3A6IDAsICRMZWZ0OiAwIH07XHJcblxyXG4gICAgICAgICRKc3NvciQuJEVhY2goX1NsaWRlRWxtdHMsIGZ1bmN0aW9uIChzbGlkZUVsbXQsIGkpIHtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJFNldFN0eWxlcyhzbGlkZUVsbXQsIF9TdHlsZURlZik7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc1Bvc2l0aW9uKHNsaWRlRWxtdCwgXCJhYnNvbHV0ZVwiKTtcclxuICAgICAgICAgICAgJEpzc29yJC4kQ3NzT3ZlcmZsb3coc2xpZGVFbG10LCBcImhpZGRlblwiKTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJEhpZGVFbGVtZW50KHNsaWRlRWxtdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRKc3NvciQuJFNldFN0eWxlcyhfTG9hZGluZ0NvbnRhaW5lciwgX1N0eWxlRGVmKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBQbGF5VG9PZmZzZXQob2Zmc2V0LCBzbGlkZUR1cmF0aW9uKSB7XHJcbiAgICAgICAgUGxheVRvKG9mZnNldCwgc2xpZGVEdXJhdGlvbiwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gUGxheVRvKHNsaWRlSW5kZXgsIHNsaWRlRHVyYXRpb24sIHJlbGF0aXZlKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0UGxheVRvKCBzbGlkZUluZGV4IFssIHNsaWRlRHVyYXRpb25dICk7IC8vUGxheSBzbGlkZXIgdG8gcG9zaXRpb24gJ3NsaWRlSW5kZXgnIHdpdGhpbiBhIHBlcmlvZCBjYWxjdWxhdGVkIGJhc2Ugb24gJ3NsaWRlRHVyYXRpb24nLlxyXG4gICAgICAgIC8vL1x0PC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0PHBhcmFtIG5hbWU9XCJzbGlkZUluZGV4XCIgdHlwZT1cIk51bWJlclwiPlxyXG4gICAgICAgIC8vL1x0XHRzbGlkZSBzbGlkZUluZGV4IG9yIHBvc2l0aW9uIHdpbGwgYmUgcGxheWluZyB0b1xyXG4gICAgICAgIC8vL1x0PC9wYXJhbT5cclxuICAgICAgICAvLy9cdDxwYXJhbSBuYW1lPVwic2xpZGVEdXJhdGlvblwiIHR5cGU9XCJOdW1iZXJcIiBvcHRpb25hbD1cInRydWVcIj5cclxuICAgICAgICAvLy9cdFx0YmFzZSBzbGlkZSBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgdG8gY2FsY3VsYXRlIHRoZSB3aG9sZSBkdXJhdGlvbiB0byBjb21wbGV0ZSB0aGlzIHBsYXkgcmVxdWVzdC5cclxuICAgICAgICAvLy9cdCAgICBkZWZhdWx0IHZhbHVlIGlzICckU2xpZGVEdXJhdGlvbicgdmFsdWUgd2hpY2ggaXMgc3BlY2lmaWVkIHdoZW4gaW5pdGlhbGl6ZSB0aGUgc2xpZGVyLlxyXG4gICAgICAgIC8vL1x0PC9wYXJhbT5cclxuICAgICAgICAvLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3ZzdHVkaW8vYmIzODU2ODIuYXNweFxyXG4gICAgICAgIC8vLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvdnN0dWRpby9oaDU0MjcyMC5hc3B4XHJcbiAgICAgICAgaWYgKF9DYXJvdXNlbEVuYWJsZWQgJiYgKCFfSXNEcmFnZ2luZyAmJiAoX05vdE9uSG92ZXIgfHwgIShfSG92ZXJUb1BhdXNlICYgMTIpKSB8fCBfT3B0aW9ucy4kTmF2aVF1aXREcmFnKSkge1xyXG4gICAgICAgICAgICBfSXNTbGlkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgX0lzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgX0Nhcm91c2VsUGxheWVyLiRTdG9wKCk7XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL1NsaWRlIER1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVEdXJhdGlvbiA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVEdXJhdGlvbiA9IF9TbGlkZUR1cmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbkRpc3BsYXkgPSBfQ2Fyb3VzZWwuJEdldFBvc2l0aW9uX0Rpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvblRvID0gc2xpZGVJbmRleDtcclxuICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG8gPSBwb3NpdGlvbkRpc3BsYXkgKyBzbGlkZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25UbyA9IE1hdGguY2VpbChwb3NpdGlvblRvKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG8gPSBNYXRoLmZsb29yKHBvc2l0aW9uVG8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfTG9vcCAmIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1Jld2luZFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG8gPSBHZXRSZWFsSW5kZXgocG9zaXRpb25Ubyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIShfTG9vcCAmIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TdG9wIGF0IHRocmVzaG9sZFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG8gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwb3NpdGlvblRvLCBfU2xpZGVDb3VudCAtIF9EaXNwbGF5UGllY2VzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uT2Zmc2V0ID0gKHBvc2l0aW9uVG8gLSBwb3NpdGlvbkRpc3BsYXkpICUgX1NsaWRlQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvblRvID0gcG9zaXRpb25EaXNwbGF5ICsgcG9zaXRpb25PZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gcG9zaXRpb25EaXNwbGF5ID09IHBvc2l0aW9uVG8gPyAwIDogc2xpZGVEdXJhdGlvbiAqIE1hdGguYWJzKHBvc2l0aW9uT2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gTWF0aC5taW4oZHVyYXRpb24sIHNsaWRlRHVyYXRpb24gKiBfRGlzcGxheVBpZWNlcyAqIDEuNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgX0Nhcm91c2VsUGxheWVyLiRQbGF5Q2Fyb3VzZWwocG9zaXRpb25EaXNwbGF5LCBwb3NpdGlvblRvLCBkdXJhdGlvbiB8fCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3ByaXZhdGUgZnVuY3Rpb25zXHJcblxyXG4gICAgLy9tZW1iZXIgZnVuY3Rpb25zXHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJFBsYXlUbyA9IFBsYXlUbztcclxuXHJcbiAgICBfU2VsZlNsaWRlci4kR29UbyA9IGZ1bmN0aW9uIChzbGlkZUluZGV4KSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJEdvVG8oIHNsaWRlSW5kZXggKTsgICAvL0dvIHRvIHRoZSBzcGVjaWZlZCBzbGlkZSBpbW1lZGlhdGVseSB3aXRoIG5vIHBsYXkuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy9QbGF5VG8oc2xpZGVJbmRleCwgMSk7XHJcbiAgICAgICAgX0NvbnZleW9yLiRHb1RvUG9zaXRpb24oc2xpZGVJbmRleCk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9TZWxmU2xpZGVyLiROZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdGluc3RhbmNlLiROZXh0KCk7ICAgLy9QbGF5IHRoZSBzbGlkZXIgdG8gbmV4dCBzbGlkZS5cclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICBQbGF5VG9PZmZzZXQoMSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9TZWxmU2xpZGVyLiRQcmV2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdGluc3RhbmNlLiRQcmV2KCk7ICAgLy9QbGF5IHRoZSBzbGlkZXIgdG8gcHJldmlvdXMgc2xpZGUuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgUGxheVRvT2Zmc2V0KC0xKTtcclxuICAgIH07XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJFBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdGluc3RhbmNlLiRQYXVzZSgpOyAgIC8vUGF1c2UgdGhlIHNsaWRlciwgcHJldmVudCBpdCBmcm9tIGF1dG8gcGxheWluZy5cclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICBfQXV0b1BsYXkgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJFBsYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJFBsYXkoKTsgICAvL1N0YXJ0IGF1dG8gcGxheSBpZiB0aGUgc2xpZGVyIGlzIGN1cnJlbnRseSBwYXVzZWQuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgaWYgKCFfQXV0b1BsYXkpIHtcclxuICAgICAgICAgICAgX0F1dG9QbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgX1NsaWRlSXRlbXNbX0N1cnJlbnRTbGlkZUluZGV4XSAmJiBfU2xpZGVJdGVtc1tfQ3VycmVudFNsaWRlSW5kZXhdLiRUcnlBY3RpdmF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJFNldFNsaWRlc2hvd1RyYW5zaXRpb25zID0gZnVuY3Rpb24gKHRyYW5zaXRpb25zKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJFNldFNsaWRlc2hvd1RyYW5zaXRpb25zKCB0cmFuc2l0aW9ucyApOyAgIC8vUmVzZXQgc2xpZGVzaG93IHRyYW5zaXRpb25zIGZvciB0aGUgc2xpZGVyLlxyXG4gICAgICAgIC8vL1x0PC9zdW1tYXJ5PlxyXG4gICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdHJhbnNpdGlvbnMgfHwgIXRyYW5zaXRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRFcnJvcihcIkNhbiBub3Qgc2V0IHNsaWRlc2hvdyB0cmFuc2l0aW9ucywgbm8gdHJhbnNpdGlvbnMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyRKc3NvciQuJFRyYW5zbGF0ZVRyYW5zaXRpb25zKHRyYW5zaXRpb25zKTsgICAgLy9mb3Igb2xkIHRyYW5zaXRpb24gY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIF9PcHRpb25zLiRTbGlkZXNob3dPcHRpb25zLiRUcmFuc2l0aW9ucyA9IHRyYW5zaXRpb25zO1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZlNsaWRlci4kU2V0Q2FwdGlvblRyYW5zaXRpb25zID0gZnVuY3Rpb24gKHRyYW5zaXRpb25zKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJFNldENhcHRpb25UcmFuc2l0aW9ucyggdHJhbnNpdGlvbnMgKTsgICAvL1Jlc2V0IGNhcHRpb24gdHJhbnNpdGlvbnMgZm9yIHRoZSBzbGlkZXIuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0cmFuc2l0aW9ucyB8fCAhdHJhbnNpdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEVycm9yKFwiQ2FuIG5vdCBzZXQgY2FwdGlvbiB0cmFuc2l0aW9ucywgbm8gdHJhbnNpdGlvbnMgc3BlY2lmaWVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vJEpzc29yJC4kVHJhbnNsYXRlVHJhbnNpdGlvbnModHJhbnNpdGlvbnMpOyAgICAvL2ZvciBvbGQgdHJhbnNpdGlvbiBjb21wYXRpYmlsaXR5XHJcbiAgICAgICAgX0NhcHRpb25TbGlkZXJPcHRpb25zLiRDYXB0aW9uVHJhbnNpdGlvbnMgPSB0cmFuc2l0aW9ucztcclxuICAgICAgICBfQ2FwdGlvblNsaWRlck9wdGlvbnMuJFZlcnNpb24gPSAkSnNzb3IkLiRHZXROb3coKTtcclxuICAgIH07XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJFNsaWRlc0NvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdGluc3RhbmNlLiRTbGlkZXNDb3VudCgpOyAgIC8vUmV0cmlldmUgc2xpZGVzIGNvdW50IG9mIHRoZSBzbGlkZXIuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgcmV0dXJuIF9TbGlkZUVsbXRzLmxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJEN1cnJlbnRJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRpbnN0YW5jZS4kQ3VycmVudEluZGV4KCk7ICAgLy9SZXRyaWV2ZSBjdXJyZW50IHNsaWRlIGluZGV4IG9mIHRoZSBzbGlkZXIuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgcmV0dXJuIF9DdXJyZW50U2xpZGVJbmRleDtcclxuICAgIH07XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJElzQXV0b1BsYXlpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJElzQXV0b1BsYXlpbmcoKTsgICAvL1JldHJpZXZlIGF1dG8gcGxheSBzdGF0dXMgb2YgdGhlIHNsaWRlci5cclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICByZXR1cm4gX0F1dG9QbGF5O1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZlNsaWRlci4kSXNEcmFnZ2luZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRpbnN0YW5jZS4kSXNEcmFnZ2luZygpOyAgIC8vUmV0cmlldmUgZHJhZyBzdGF0dXMgb2YgdGhlIHNsaWRlci5cclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICByZXR1cm4gX0lzRHJhZ2dpbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIF9TZWxmU2xpZGVyLiRJc1NsaWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJElzU2xpZGluZygpOyAgIC8vUmV0cmlldmUgcmlnaHQ8LS0+bGVmdCBzbGlkaW5nIHN0YXR1cyBvZiB0aGUgc2xpZGVyLlxyXG4gICAgICAgIC8vL1x0PC9zdW1tYXJ5PlxyXG4gICAgICAgIHJldHVybiBfSXNTbGlkaW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZlNsaWRlci4kSXNNb3VzZU92ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJElzTW91c2VPdmVyKCk7ICAgLy9SZXRyaWV2ZSBtb3VzZSBvdmVyIHN0YXR1cyBvZiB0aGUgc2xpZGVyLlxyXG4gICAgICAgIC8vL1x0PC9zdW1tYXJ5PlxyXG4gICAgICAgIHJldHVybiAhX05vdE9uSG92ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIF9TZWxmU2xpZGVyLiRMYXN0RHJhZ1N1Y2NlZGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdGluc3RhbmNlLiRJc0xhc3REcmFnU3VjY2VkZWQoKTsgICAvL1JldHJpZXZlIGxhc3QgZHJhZyBzdWNjZWRlZCBzdGF0dXMsIHJldHVybnMgMCBpZiBmYWlsZWQsIHJldHVybnMgZHJhZyBvZmZzZXQgaWYgc3VjY2VkZWRcclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICByZXR1cm4gX0xhc3REcmFnU3VjY2VkZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIE9yaWdpbmFsV2lkdGgoKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJE9yaWdpbmFsV2lkdGgoKTsgICAvL1JldHJpZXZlIG9yaWdpbmFsIHdpZHRoIG9mIHRoZSBzbGlkZXIuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgcmV0dXJuICRKc3NvciQuJENzc1dpZHRoKF9TY2FsZVdyYXBwZXIgfHwgZWxtdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gT3JpZ2luYWxIZWlnaHQoKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJE9yaWdpbmFsSGVpZ2h0KCk7ICAgLy9SZXRyaWV2ZSBvcmlnaW5hbCBoZWlnaHQgb2YgdGhlIHNsaWRlci5cclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICByZXR1cm4gJEpzc29yJC4kQ3NzSGVpZ2h0KF9TY2FsZVdyYXBwZXIgfHwgZWxtdCk7XHJcbiAgICB9XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJE9yaWdpbmFsV2lkdGggPSBfU2VsZlNsaWRlci4kR2V0T3JpZ2luYWxXaWR0aCA9IE9yaWdpbmFsV2lkdGg7XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJE9yaWdpbmFsSGVpZ2h0ID0gX1NlbGZTbGlkZXIuJEdldE9yaWdpbmFsSGVpZ2h0ID0gT3JpZ2luYWxIZWlnaHQ7XHJcblxyXG4gICAgZnVuY3Rpb24gU2NhbGUoZGltZW5zaW9uLCBpc0hlaWdodCkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdGluc3RhbmNlLiRTY2FsZVdpZHRoKCk7ICAgLy9SZXRyaWV2ZSBzY2FsZWQgZGltZW5zaW9uIHRoZSBzbGlkZXIgY3VycmVudGx5IGRpc3BsYXlzLlxyXG4gICAgICAgIC8vL1x0XHRpbnN0YW5jZS4kU2NhbGVXaWR0aCggZGltZW5zaW9uICk7ICAgLy9TY2FsZSB0aGUgc2xpZGVyIHRvIG5ldyB3aWR0aCBhbmQga2VlcCBhc3BlY3QgcmF0aW8uXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcblxyXG4gICAgICAgIGlmIChkaW1lbnNpb24gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gJEpzc29yJC4kQ3NzV2lkdGgoZWxtdCk7XHJcblxyXG4gICAgICAgIGlmICghX1NjYWxlV3JhcHBlcikge1xyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsV2lkdGhTdHIgPSAkSnNzb3IkLiRDc3MoZWxtdCwgXCJ3aWR0aFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbEhlaWdodFN0ciA9ICRKc3NvciQuJENzcyhlbG10LCBcImhlaWdodFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFdpZHRoID0gJEpzc29yJC4kQ3NzUChlbG10LCBcIndpZHRoXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsSGVpZ2h0ID0gJEpzc29yJC4kQ3NzUChlbG10LCBcImhlaWdodFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9yaWdpbmFsV2lkdGhTdHIgfHwgb3JpZ2luYWxXaWR0aFN0ci5pbmRleE9mKFwicHhcIikgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJDYW5ub3Qgc2NhbGUganNzb3Igc2xpZGVyLCAnd2lkdGgnIG9mICdvdXRlciBjb250YWluZXInIG5vdCBzcGVjaWZpZWQuIFBsZWFzZSBzcGVjaWZ5ICd3aWR0aCcgaW4gcGl4ZWwuIGUuZy4gJ3dpZHRoOiA2MDBweDsnXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3JpZ2luYWxIZWlnaHRTdHIgfHwgb3JpZ2luYWxIZWlnaHRTdHIuaW5kZXhPZihcInB4XCIpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiQ2Fubm90IHNjYWxlIGpzc29yIHNsaWRlciwgJ2hlaWdodCcgb2YgJ291dGVyIGNvbnRhaW5lcicgbm90IHNwZWNpZmllZC4gUGxlYXNlIHNwZWNpZnkgJ2hlaWdodCcgaW4gcGl4ZWwuIGUuZy4gJ2hlaWdodDogMzAwcHg7J1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxXaWR0aFN0ci5pbmRleE9mKCclJykgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJDYW5ub3Qgc2NhbGUganNzb3Igc2xpZGVyLCAnd2lkdGgnIG9mICdvdXRlciBjb250YWluZXInIG5vdCB2YWxpZC4gUGxlYXNlIHNwZWNpZnkgJ3dpZHRoJyBpbiBwaXhlbC4gZS5nLiAnd2lkdGg6IDYwMHB4OydcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSGVpZ2h0U3RyLmluZGV4T2YoJyUnKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIkNhbm5vdCBzY2FsZSBqc3NvciBzbGlkZXIsICdoZWlnaHQnIG9mICdvdXRlciBjb250YWluZXInIG5vdCB2YWxpZC4gUGxlYXNlIHNwZWNpZnkgJ2hlaWdodCcgaW4gcGl4ZWwuIGUuZy4gJ2hlaWdodDogMzAwcHg7J1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9yaWdpbmFsV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJDYW5ub3Qgc2NhbGUganNzb3Igc2xpZGVyLCAnd2lkdGgnIG9mICdvdXRlciBjb250YWluZXInIG5vdCB2YWxpZC4gJ3dpZHRoJyBvZiAnb3V0ZXIgY29udGFpbmVyJyBzaG91bGQgYmUgcG9zaXRpdmUgbnVtYmVyLiBlLmcuICd3aWR0aDogNjAwcHg7J1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9yaWdpbmFsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiQ2Fubm90IHNjYWxlIGpzc29yIHNsaWRlciwgJ2hlaWdodCcgb2YgJ291dGVyIGNvbnRhaW5lcicgbm90IHZhbGlkLiAnaGVpZ2h0JyBvZiAnb3V0ZXIgY29udGFpbmVyJyBzaG91bGQgYmUgcG9zaXRpdmUgbnVtYmVyLiBlLmcuICdoZWlnaHQ6IDMwMHB4OydcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlubmVyV3JhcHBlciA9ICRKc3NvciQuJENyZWF0ZURpdihkb2N1bWVudCk7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENsYXNzTmFtZShpbm5lcldyYXBwZXIsICRKc3NvciQuJENsYXNzTmFtZShlbG10KSk7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc0Nzc1RleHQoaW5uZXJXcmFwcGVyLCAkSnNzb3IkLiRDc3NDc3NUZXh0KGVsbXQpKTtcclxuICAgICAgICAgICAgJEpzc29yJC4kQ3NzRGlzcGxheShpbm5lcldyYXBwZXIsIFwiYmxvY2tcIik7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRDc3NQb3NpdGlvbihpbm5lcldyYXBwZXIsIFwicmVsYXRpdmVcIik7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc1RvcChpbm5lcldyYXBwZXIsIDApO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRDc3NMZWZ0KGlubmVyV3JhcHBlciwgMCk7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc092ZXJmbG93KGlubmVyV3JhcHBlciwgXCJ2aXNpYmxlXCIpO1xyXG5cclxuICAgICAgICAgICAgX1NjYWxlV3JhcHBlciA9ICRKc3NvciQuJENyZWF0ZURpdihkb2N1bWVudCk7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRDc3NQb3NpdGlvbihfU2NhbGVXcmFwcGVyLCBcImFic29sdXRlXCIpO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRDc3NUb3AoX1NjYWxlV3JhcHBlciwgMCk7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc0xlZnQoX1NjYWxlV3JhcHBlciwgMCk7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc1dpZHRoKF9TY2FsZVdyYXBwZXIsICRKc3NvciQuJENzc1dpZHRoKGVsbXQpKTtcclxuICAgICAgICAgICAgJEpzc29yJC4kQ3NzSGVpZ2h0KF9TY2FsZVdyYXBwZXIsICRKc3NvciQuJENzc0hlaWdodChlbG10KSk7XHJcbiAgICAgICAgICAgICRKc3NvciQuJFNldFN0eWxlVHJhbnNmb3JtT3JpZ2luKF9TY2FsZVdyYXBwZXIsIFwiMCAwXCIpO1xyXG5cclxuICAgICAgICAgICAgJEpzc29yJC4kQXBwZW5kQ2hpbGQoX1NjYWxlV3JhcHBlciwgaW5uZXJXcmFwcGVyKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9ICRKc3NvciQuJENoaWxkcmVuKGVsbXQpO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRBcHBlbmRDaGlsZChlbG10LCBfU2NhbGVXcmFwcGVyKTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJENzcyhlbG10LCBcImJhY2tncm91bmRJbWFnZVwiLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIG5vTW92ZUVsbXRzID0ge1xyXG4gICAgICAgICAgICAvLyAgICBcIm5hdmlnYXRvclwiOiBfQnVsbGV0TmF2aWdhdG9yT3B0aW9ucyAmJiBfQnVsbGV0TmF2aWdhdG9yT3B0aW9ucy4kU2NhbGUgPT0gZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgIFwiYXJyb3dsZWZ0XCI6IF9BcnJvd05hdmlnYXRvck9wdGlvbnMgJiYgX0Fycm93TmF2aWdhdG9yT3B0aW9ucy4kU2NhbGUgPT0gZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgIFwiYXJyb3dyaWdodFwiOiBfQXJyb3dOYXZpZ2F0b3JPcHRpb25zICYmIF9BcnJvd05hdmlnYXRvck9wdGlvbnMuJFNjYWxlID09IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICBcInRodW1ibmF2aWdhdG9yXCI6IF9UaHVtYm5haWxOYXZpZ2F0b3JPcHRpb25zICYmIF9UaHVtYm5haWxOYXZpZ2F0b3JPcHRpb25zLiRTY2FsZSA9PSBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgXCJ0aHVtYndyYXBwZXJcIjogX1RodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMgJiYgX1RodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMuJFNjYWxlID09IGZhbHNlXHJcbiAgICAgICAgICAgIC8vfTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJEVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQXBwZW5kQ2hpbGQoJEpzc29yJC4kQXR0cmlidXRlRXgoY2hpbGQsIFwibm9zY2FsZVwiKSA/IGVsbXQgOiBpbm5lcldyYXBwZXIsIGNoaWxkKTtcclxuICAgICAgICAgICAgICAgIC8vJEpzc29yJC4kQXBwZW5kQ2hpbGQobm9Nb3ZlRWxtdHNbJEpzc29yJC4kQXR0cmlidXRlRXgoY2hpbGQsIFwidVwiKV0gPyBlbG10IDogaW5uZXJXcmFwcGVyLCBjaGlsZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFkaW1lbnNpb24gfHwgZGltZW5zaW9uIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiJyRTY2FsZVdpZHRoJyBlcnJvciwgJ2RpbWVuc2lvbicgc2hvdWxkIGJlIHBvc2l0aXZlIHZhbHVlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIV9Jbml0aWFsU2Nyb2xsV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIF9Jbml0aWFsU2Nyb2xsV2lkdGggPSBfU2VsZlNsaWRlci4kRWxtdC5zY3JvbGxXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBfU2NhbGVSYXRpbyA9IGRpbWVuc2lvbiAvIChpc0hlaWdodCA/ICRKc3NvciQuJENzc0hlaWdodCA6ICRKc3NvciQuJENzc1dpZHRoKShfU2NhbGVXcmFwcGVyKTtcclxuICAgICAgICAkSnNzb3IkLiRDc3NTY2FsZShfU2NhbGVXcmFwcGVyLCBfU2NhbGVSYXRpbyk7XHJcblxyXG4gICAgICAgIHZhciBzY2FsZVdpZHRoID0gaXNIZWlnaHQgPyAoX1NjYWxlUmF0aW8gKiBPcmlnaW5hbFdpZHRoKCkpIDogZGltZW5zaW9uO1xyXG4gICAgICAgIHZhciBzY2FsZUhlaWdodCA9IGlzSGVpZ2h0ID8gZGltZW5zaW9uIDogKF9TY2FsZVJhdGlvICogT3JpZ2luYWxIZWlnaHQoKSk7XHJcblxyXG4gICAgICAgICRKc3NvciQuJENzc1dpZHRoKGVsbXQsIHNjYWxlV2lkdGgpO1xyXG4gICAgICAgICRKc3NvciQuJENzc0hlaWdodChlbG10LCBzY2FsZUhlaWdodCk7XHJcblxyXG4gICAgICAgICRKc3NvciQuJEVhY2goX05hdmlnYXRvcnMsIGZ1bmN0aW9uIChuYXZpZ2F0b3IpIHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLiRSZWxvY2F0ZShzY2FsZVdpZHRoLCBzY2FsZUhlaWdodCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX1NlbGZTbGlkZXIuJFNjYWxlSGVpZ2h0ID0gX1NlbGZTbGlkZXIuJEdldFNjYWxlSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdGluc3RhbmNlLiRTY2FsZUhlaWdodCgpOyAgIC8vUmV0cmlldmUgc2NhbGVkIGhlaWdodCB0aGUgc2xpZGVyIGN1cnJlbnRseSBkaXNwbGF5cy5cclxuICAgICAgICAvLy9cdFx0aW5zdGFuY2UuJFNjYWxlSGVpZ2h0KCBkaW1lbnNpb24gKTsgICAvL1NjYWxlIHRoZSBzbGlkZXIgdG8gbmV3IGhlaWdodCBhbmQga2VlcCBhc3BlY3QgcmF0aW8uXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcblxyXG4gICAgICAgIGlmIChoZWlnaHQgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gJEpzc29yJC4kQ3NzSGVpZ2h0KGVsbXQpO1xyXG5cclxuICAgICAgICBTY2FsZShoZWlnaHQsIHRydWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZlNsaWRlci4kU2NhbGVXaWR0aCA9IF9TZWxmU2xpZGVyLiRTZXRTY2FsZVdpZHRoID0gX1NlbGZTbGlkZXIuJEdldFNjYWxlV2lkdGggPSBTY2FsZTtcclxuXHJcbiAgICBfU2VsZlNsaWRlci4kR2V0VmlydHVhbEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgdmFyIHBhcmtpbmdJbmRleCA9IE1hdGguY2VpbChHZXRSZWFsSW5kZXgoX1BhcmtpbmdQb3NpdGlvbiAvIF9TdGVwTGVuZ3RoKSk7XHJcbiAgICAgICAgdmFyIGRpc3BsYXlJbmRleCA9IEdldFJlYWxJbmRleChpbmRleCAtIF9UZW1wU2xpZGVJbmRleCArIHBhcmtpbmdJbmRleCk7XHJcblxyXG4gICAgICAgIGlmIChkaXNwbGF5SW5kZXggPiBfRGlzcGxheVBpZWNlcykge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggLSBfVGVtcFNsaWRlSW5kZXggPiBfU2xpZGVDb3VudCAvIDIpXHJcbiAgICAgICAgICAgICAgICBpbmRleCAtPSBfU2xpZGVDb3VudDtcclxuICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggLSBfVGVtcFNsaWRlSW5kZXggPD0gLV9TbGlkZUNvdW50IC8gMilcclxuICAgICAgICAgICAgICAgIGluZGV4ICs9IF9TbGlkZUNvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZXggPSBfVGVtcFNsaWRlSW5kZXggKyBkaXNwbGF5SW5kZXggLSBwYXJraW5nSW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vbWVtYmVyIGZ1bmN0aW9uc1xyXG5cclxuICAgICRKc3Nvck9iamVjdCQuY2FsbChfU2VsZlNsaWRlcik7XHJcblxyXG4gICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgb3V0ZXJDb250YWluZXJFbG10ID0gJEpzc29yJC4kR2V0RWxlbWVudChlbG10KTtcclxuICAgICAgICBpZiAoIW91dGVyQ29udGFpbmVyRWxtdClcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiT3V0ZXIgY29udGFpbmVyICdcIiArIGVsbXQgKyBcIicgbm90IGZvdW5kLlwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vaW5pdGlhbGl6ZSBtZW1iZXIgdmFyaWFibGVzXHJcbiAgICBfU2VsZlNsaWRlci4kRWxtdCA9IGVsbXQgPSAkSnNzb3IkLiRHZXRFbGVtZW50KGVsbXQpO1xyXG4gICAgLy9pbml0aWFsaXplIG1lbWJlciB2YXJpYWJsZXNcclxuXHJcbiAgICB2YXIgX0luaXRpYWxTY3JvbGxXaWR0aDsgICAgLy9mb3IgZGVidWcgb25seVxyXG4gICAgdmFyIF9DYXB0aW9uU2xpZGVyQ291bnQgPSAxOyAgICAvL2ZvciBkZWJ1ZyBvbmx5XHJcblxyXG4gICAgdmFyIF9PcHRpb25zID0gJEpzc29yJC4kRXh0ZW5kKHtcclxuICAgICAgICAkRmlsbE1vZGU6IDAsICAgICAgICAgICAgICAgICAgIC8vW09wdGlvbmFsXSBUaGUgd2F5IHRvIGZpbGwgaW1hZ2UgaW4gc2xpZGUsIDAgc3RyZXRjaCwgMSBjb250YWluIChrZWVwIGFzcGVjdCByYXRpbyBhbmQgcHV0IGFsbCBpbnNpZGUgc2xpZGUpLCAyIGNvdmVyIChrZWVwIGFzcGVjdCByYXRpbyBhbmQgY292ZXIgd2hvbGUgc2xpZGUpLCA0IGFjdHVhbCBzaXplLCA1IGNvbnRhaW4gZm9yIGxhcmdlIGltYWdlLCBhY3R1YWwgc2l6ZSBmb3Igc21hbGwgaW1hZ2UsIGRlZmF1bHQgdmFsdWUgaXMgMFxyXG4gICAgICAgICRMYXp5TG9hZGluZzogMSwgICAgICAgICAgICAgICAgLy9bT3B0aW9uYWxdIEZvciBpbWFnZSB3aXRoICBsYXp5IGxvYWRpbmcgZm9ybWF0ICg8SU1HIHNyYzI9XCJ1cmxcIiAuLi4vPiksIGJ5IGRlZmF1bHQgaXQgd2lsbCBiZSBsb2FkZWQgb25seSB3aGVuIHRoZSBzbGlkZSBjb21lcy5cclxuICAgICAgICAvL0J1dCBhbiBpbnRlZ2VyIHZhbHVlIChtYXliZSAwLCAxLCAyIG9yIDMpIGluZGljYXRlcyB0aGF0IGhvdyBmYXIgb2YgbmVhcmJ5IHNsaWRlcyBzaG91bGQgYmUgbG9hZGVkIGltbWVkaWF0ZWx5IGFzIHdlbGwsIGRlZmF1bHQgdmFsdWUgaXMgMS5cclxuICAgICAgICAkU3RhcnRJbmRleDogMCwgICAgICAgICAgICAgICAgIC8vW09wdGlvbmFsXSBJbmRleCBvZiBzbGlkZSB0byBkaXNwbGF5IHdoZW4gaW5pdGlhbGl6ZSwgZGVmYXVsdCB2YWx1ZSBpcyAwXHJcbiAgICAgICAgJEF1dG9QbGF5OiBmYWxzZSwgICAgICAgICAgICAgICAvL1tPcHRpb25hbF0gV2hldGhlciB0byBhdXRvIHBsYXksIGRlZmF1bHQgdmFsdWUgaXMgZmFsc2VcclxuICAgICAgICAkTG9vcDogMSwgICAgICAgICAgICAgICAgICAgICAgIC8vW09wdGlvbmFsXSBFbmFibGUgbG9vcChjaXJjdWxhcikgb2YgY2Fyb3VzZWwgb3Igbm90LCAwOiBzdG9wLCAxOiBsb29wLCAyIHJld2luZCwgZGVmYXVsdCB2YWx1ZSBpcyAxXHJcbiAgICAgICAgJEhXQTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAvL1tPcHRpb25hbF0gRW5hYmxlIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiBvciBub3QsIGRlZmF1bHQgdmFsdWUgaXMgdHJ1ZVxyXG4gICAgICAgICROYXZpUXVpdERyYWc6IHRydWUsXHJcbiAgICAgICAgJEF1dG9QbGF5U3RlcHM6IDEsICAgICAgICAgICAgICAvL1tPcHRpb25hbF0gU3RlcHMgdG8gZ28gb2YgZXZlcnkgcGxheSAodGhpcyBvcHRpb25zIGFwcGx5cyBvbmx5IHdoZW4gc2xpZGVzaG93IGRpc2FibGVkKSwgZGVmYXVsdCB2YWx1ZSBpcyAxXHJcbiAgICAgICAgJEF1dG9QbGF5SW50ZXJ2YWw6IDMwMDAsICAgICAgICAvL1tPcHRpb25hbF0gSW50ZXJ2YWwgdG8gcGxheSBuZXh0IHNsaWRlIHNpbmNlIHRoZSBwcmV2aW91cyBzdG9wcGVkIGlmIGEgc2xpZGVzaG93IGlzIGF1dG8gcGxheWluZywgZGVmYXVsdCB2YWx1ZSBpcyAzMDAwXHJcbiAgICAgICAgJFBhdXNlT25Ib3ZlcjogMSwgICAgICAgICAgICAgICAvL1tPcHRpb25hbF0gV2hldGhlciB0byBwYXVzZSB3aGVuIG1vdXNlIG92ZXIgaWYgYSBzbGlkZXIgaXMgYXV0byBwbGF5aW5nLCAwIG5vIHBhdXNlLCAxIHBhdXNlIGZvciBkZXNrdG9wLCAyIHBhdXNlIGZvciB0b3VjaCBkZXZpY2UsIDMgcGF1c2UgZm9yIGRlc2t0b3AgYW5kIHRvdWNoIGRldmljZSwgNCBmcmVlemUgZm9yIGRlc2t0b3AsIDggZnJlZXplIGZvciB0b3VjaCBkZXZpY2UsIDEyIGZyZWV6ZSBmb3IgZGVza3RvcCBhbmQgdG91Y2ggZGV2aWNlLCBkZWZhdWx0IHZhbHVlIGlzIDFcclxuXHJcbiAgICAgICAgJFNsaWRlRHVyYXRpb246IDUwMCwgICAgICAgICAgICAvL1tPcHRpb25hbF0gU3BlY2lmaWVzIGRlZmF1bHQgZHVyYXRpb24gKHN3aXBlKSBmb3Igc2xpZGUgaW4gbWlsbGlzZWNvbmRzLCBkZWZhdWx0IHZhbHVlIGlzIDQwMFxyXG4gICAgICAgICRTbGlkZUVhc2luZzogJEpzc29yRWFzaW5nJC4kRWFzZU91dFF1YWQsICAgLy9bT3B0aW9uYWxdIFNwZWNpZmllcyBlYXNpbmcgZm9yIHJpZ2h0IHRvIGxlZnQgYW5pbWF0aW9uLCBkZWZhdWx0IHZhbHVlIGlzICRKc3NvckVhc2luZyQuJEVhc2VPdXRRdWFkXHJcbiAgICAgICAgJE1pbkRyYWdPZmZzZXRUb1NsaWRlOiAyMCwgICAgICAvL1tPcHRpb25hbF0gTWluaW11bSBkcmFnIG9mZnNldCB0aGF0IHRyaWdnZXIgc2xpZGUsIGRlZmF1bHQgdmFsdWUgaXMgMjBcclxuICAgICAgICAkU2xpZGVTcGFjaW5nOiAwLCBcdFx0XHRcdC8vW09wdGlvbmFsXSBTcGFjZSBiZXR3ZWVuIGVhY2ggc2xpZGUgaW4gcGl4ZWxzLCBkZWZhdWx0IHZhbHVlIGlzIDBcclxuICAgICAgICAkRGlzcGxheVBpZWNlczogMSwgICAgICAgICAgICAgIC8vW09wdGlvbmFsXSBOdW1iZXIgb2YgcGllY2VzIHRvIGRpc3BsYXkgKHRoZSBzbGlkZXNob3cgd291bGQgYmUgZGlzYWJsZWQgaWYgdGhlIHZhbHVlIGlzIHNldCB0byBncmVhdGVyIHRoYW4gMSksIGRlZmF1bHQgdmFsdWUgaXMgMVxyXG4gICAgICAgICRQYXJraW5nUG9zaXRpb246IDAsICAgICAgICAgICAgLy9bT3B0aW9uYWxdIFRoZSBvZmZzZXQgcG9zaXRpb24gdG8gcGFyayBzbGlkZSAodGhpcyBvcHRpb25zIGFwcGx5cyBvbmx5IHdoZW4gc2xpZGVzaG93IGRpc2FibGVkKSwgZGVmYXVsdCB2YWx1ZSBpcyAwLlxyXG4gICAgICAgICRVSVNlYXJjaE1vZGU6IDEsICAgICAgICAgICAgICAgLy9bT3B0aW9uYWxdIFRoZSB3YXkgKDAgcGFyZWxsZWwsIDEgcmVjdXJzaXZlLCBkZWZhdWx0IHZhbHVlIGlzIHJlY3Vyc2l2ZSkgdG8gc2VhcmNoIFVJIGNvbXBvbmVudHMgKHNsaWRlcyBjb250YWluZXIsIGxvYWRpbmcgc2NyZWVuLCBuYXZpZ2F0b3IgY29udGFpbmVyLCBhcnJvdyBuYXZpZ2F0b3IgY29udGFpbmVyLCB0aHVtYm5haWwgbmF2aWdhdG9yIGNvbnRhaW5lciBldGMuXHJcbiAgICAgICAgJFBsYXlPcmllbnRhdGlvbjogMSwgICAgICAgICAgICAvL1tPcHRpb25hbF0gT3JpZW50YXRpb24gdG8gcGxheSBzbGlkZSAoZm9yIGF1dG8gcGxheSwgbmF2aWdhdGlvbiksIDEgaG9yaXplbnRhbCwgMiB2ZXJ0aWNhbCwgNSBob3JpemVudGFsIHJldmVyc2UsIDYgdmVydGljYWwgcmV2ZXJzZSwgZGVmYXVsdCB2YWx1ZSBpcyAxXHJcbiAgICAgICAgJERyYWdPcmllbnRhdGlvbjogMSAgICAgICAgICAgICAvL1tPcHRpb25hbF0gT3JpZW50YXRpb24gdG8gZHJhZyBzbGlkZSwgMCBubyBkcmFnLCAxIGhvcml6ZW50YWwsIDIgdmVydGljYWwsIDMgYm90aCwgZGVmYXVsdCB2YWx1ZSBpcyAxIChOb3RlIHRoYXQgdGhlICREcmFnT3JpZW50YXRpb24gc2hvdWxkIGJlIHRoZSBzYW1lIGFzICRQbGF5T3JpZW50YXRpb24gd2hlbiAkRGlzcGxheVBpZWNlcyBpcyBncmVhdGVyIHRoYW4gMSwgb3IgcGFya2luZyBwb3NpdGlvbiBpcyBub3QgMClcclxuXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAvL2dvaW5nIHRvIHVzZSAkSWRsZSBpbnN0ZWFkIG9mICRBdXRvUGxheUludGVydmFsXHJcbiAgICBpZiAoX09wdGlvbnMuJElkbGUgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIF9PcHRpb25zLiRBdXRvUGxheUludGVydmFsID0gX09wdGlvbnMuJElkbGU7XHJcblxyXG4gICAgLy9nb2luZyB0byB1c2UgJENvbHMgaW5zdGVhZCBvZiAkRGlzcGxheVBpZWNlc1xyXG4gICAgaWYgKF9PcHRpb25zLiRDb2xzICE9IHVuZGVmaW5lZClcclxuICAgICAgICBfT3B0aW9ucy4kRGlzcGxheVBpZWNlcyA9IF9PcHRpb25zLiRDb2xzO1xyXG5cclxuICAgIC8vU29kbyBzdGF0ZW1lbnQgZm9yIGRldmVsb3BtZW50IHRpbWUgaW50ZWxsaXNlbmNlIG9ubHlcclxuICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX09wdGlvbnMgPSAkSnNzb3IkLiRFeHRlbmQoe1xyXG4gICAgICAgICAgICAkQXJyb3dLZXlOYXZpZ2F0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICRTbGlkZVdpZHRoOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICRTbGlkZUhlaWdodDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAkU2xpZGVzaG93T3B0aW9uczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAkQ2FwdGlvblNsaWRlck9wdGlvbnM6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgJEJ1bGxldE5hdmlnYXRvck9wdGlvbnM6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgJEFycm93TmF2aWdhdG9yT3B0aW9uczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAkVGh1bWJuYWlsTmF2aWdhdG9yT3B0aW9uczogdW5kZWZpbmVkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfT3B0aW9ucyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgX1BsYXlPcmllbnRhdGlvbiA9IF9PcHRpb25zLiRQbGF5T3JpZW50YXRpb24gJiAzO1xyXG4gICAgdmFyIF9QbGF5UmV2ZXJzZSA9IChfT3B0aW9ucy4kUGxheU9yaWVudGF0aW9uICYgNCkgLyAtNCB8fCAxO1xyXG5cclxuICAgIHZhciBfU2xpZGVzaG93T3B0aW9ucyA9IF9PcHRpb25zLiRTbGlkZXNob3dPcHRpb25zO1xyXG4gICAgdmFyIF9DYXB0aW9uU2xpZGVyT3B0aW9ucyA9ICRKc3NvciQuJEV4dGVuZCh7ICRDbGFzczogJEpzc29yQ2FwdGlvblNsaWRlckJhc2UkLCAkUGxheUluTW9kZTogMSwgJFBsYXlPdXRNb2RlOiAxIH0sIF9PcHRpb25zLiRDYXB0aW9uU2xpZGVyT3B0aW9ucyk7XHJcbiAgICAvLyRKc3NvciQuJFRyYW5zbGF0ZVRyYW5zaXRpb25zKF9DYXB0aW9uU2xpZGVyT3B0aW9ucy4kQ2FwdGlvblRyYW5zaXRpb25zKTsgLy9mb3Igb2xkIHRyYW5zaXRpb24gY29tcGF0aWJpbGl0eVxyXG4gICAgdmFyIF9CdWxsZXROYXZpZ2F0b3JPcHRpb25zID0gX09wdGlvbnMuJEJ1bGxldE5hdmlnYXRvck9wdGlvbnM7XHJcbiAgICB2YXIgX0Fycm93TmF2aWdhdG9yT3B0aW9ucyA9IF9PcHRpb25zLiRBcnJvd05hdmlnYXRvck9wdGlvbnM7XHJcbiAgICB2YXIgX1RodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMgPSBfT3B0aW9ucy4kVGh1bWJuYWlsTmF2aWdhdG9yT3B0aW9ucztcclxuXHJcbiAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChfU2xpZGVzaG93T3B0aW9ucyAmJiAhX1NsaWRlc2hvd09wdGlvbnMuJENsYXNzKSB7XHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIk9wdGlvbiAkU2xpZGVzaG93T3B0aW9ucyBlcnJvciwgY2xhc3Mgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoX09wdGlvbnMuJENhcHRpb25TbGlkZXJPcHRpb25zICYmICFfT3B0aW9ucy4kQ2FwdGlvblNsaWRlck9wdGlvbnMuJENsYXNzKSB7XHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIk9wdGlvbiAkQ2FwdGlvblNsaWRlck9wdGlvbnMgZXJyb3IsIGNsYXNzIG5vdCBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKF9CdWxsZXROYXZpZ2F0b3JPcHRpb25zICYmICFfQnVsbGV0TmF2aWdhdG9yT3B0aW9ucy4kQ2xhc3MpIHtcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiT3B0aW9uICRCdWxsZXROYXZpZ2F0b3JPcHRpb25zIGVycm9yLCBjbGFzcyBub3Qgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChfQXJyb3dOYXZpZ2F0b3JPcHRpb25zICYmICFfQXJyb3dOYXZpZ2F0b3JPcHRpb25zLiRDbGFzcykge1xyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJPcHRpb24gJEFycm93TmF2aWdhdG9yT3B0aW9ucyBlcnJvciwgY2xhc3Mgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoX1RodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMgJiYgIV9UaHVtYm5haWxOYXZpZ2F0b3JPcHRpb25zLiRDbGFzcykge1xyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJPcHRpb24gJFRodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMgZXJyb3IsIGNsYXNzIG5vdCBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBfVUlTZWFyY2hOb0RlZXAgPSAhX09wdGlvbnMuJFVJU2VhcmNoTW9kZTtcclxuICAgIHZhciBfU2NhbGVXcmFwcGVyO1xyXG4gICAgdmFyIF9TbGlkZXNDb250YWluZXIgPSAkSnNzb3IkLiRGaW5kQ2hpbGQoZWxtdCwgXCJzbGlkZXNcIiwgX1VJU2VhcmNoTm9EZWVwKTtcclxuICAgIHZhciBfTG9hZGluZ0NvbnRhaW5lciA9ICRKc3NvciQuJEZpbmRDaGlsZChlbG10LCBcImxvYWRpbmdcIiwgX1VJU2VhcmNoTm9EZWVwKSB8fCAkSnNzb3IkLiRDcmVhdGVEaXYoZG9jdW1lbnQpO1xyXG5cclxuICAgIHZhciBfQnVsbGV0TmF2aWdhdG9yQ29udGFpbmVyID0gJEpzc29yJC4kRmluZENoaWxkKGVsbXQsIFwibmF2aWdhdG9yXCIsIF9VSVNlYXJjaE5vRGVlcCk7XHJcblxyXG4gICAgdmFyIF9BcnJvd0xlZnQgPSAkSnNzb3IkLiRGaW5kQ2hpbGQoZWxtdCwgXCJhcnJvd2xlZnRcIiwgX1VJU2VhcmNoTm9EZWVwKTtcclxuICAgIHZhciBfQXJyb3dSaWdodCA9ICRKc3NvciQuJEZpbmRDaGlsZChlbG10LCBcImFycm93cmlnaHRcIiwgX1VJU2VhcmNoTm9EZWVwKTtcclxuXHJcbiAgICB2YXIgX1RodW1ibmFpbE5hdmlnYXRvckNvbnRhaW5lciA9ICRKc3NvciQuJEZpbmRDaGlsZChlbG10LCBcInRodW1ibmF2aWdhdG9yXCIsIF9VSVNlYXJjaE5vRGVlcCk7XHJcblxyXG4gICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2lmIChfQnVsbGV0TmF2aWdhdG9yT3B0aW9ucyAmJiAhX0J1bGxldE5hdmlnYXRvckNvbnRhaW5lcikge1xyXG4gICAgICAgIC8vICAgIHRocm93IG5ldyBFcnJvcihcIiRCdWxsZXROYXZpZ2F0b3JPcHRpb25zIHNwZWNpZmllZCBidXQgYnVsbGV0IG5hdmlnYXRvciBjb250YWluZXIgKDxkaXYgdT1cXFwibmF2aWdhdG9yXFxcIiAuLi4pIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICBpZiAoX0J1bGxldE5hdmlnYXRvckNvbnRhaW5lciAmJiAhX0J1bGxldE5hdmlnYXRvck9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVsbGV0IG5hdmlnYXRvciBjb250YWluZXIgZGVmaW5lZCBidXQgJEJ1bGxldE5hdmlnYXRvck9wdGlvbnMgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2lmIChfQXJyb3dOYXZpZ2F0b3JPcHRpb25zKSB7XHJcbiAgICAgICAgLy8gICAgaWYgKCFfQXJyb3dMZWZ0KSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRocm93IG5ldyBFcnJvcihcIiRBcnJvd05hdmlnYXRvck9wdGlvbnMgc3BlY2lmaWVkLCBidXQgYXJyb3dsZWZ0ICg8c3BhbiB1PVxcXCJhcnJvd2xlZnRcXFwiIC4uLikgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgaWYgKCFfQXJyb3dSaWdodCkge1xyXG4gICAgICAgIC8vICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIkQXJyb3dOYXZpZ2F0b3JPcHRpb25zIHNwZWNpZmllZCwgYnV0IGFycm93cmlnaHQgKDxzcGFuIHU9XFxcImFycm93cmlnaHRcXFwiIC4uLikgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgaWYgKChfQXJyb3dMZWZ0IHx8IF9BcnJvd1JpZ2h0KSAmJiAhX0Fycm93TmF2aWdhdG9yT3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcnJvd2xlZnQgb3IgYXJyb3dyaWdodCBkZWZpbmVkLCBidXQgJEFycm93TmF2aWdhdG9yT3B0aW9ucyBub3Qgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgKF9UaHVtYm5haWxOYXZpZ2F0b3JPcHRpb25zICYmICFfVGh1bWJuYWlsTmF2aWdhdG9yQ29udGFpbmVyKSB7XHJcbiAgICAgICAgLy8gICAgdGhyb3cgbmV3IEVycm9yKFwiJFRodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMgc3BlY2lmaWVkLCBidXQgdGh1bWJuYWlsIG5hdmlnYXRvciBjb250YWluZXIgKDxkaXYgdT1cXFwidGh1bWJuYXZpZ2F0b3JcXFwiIC4uLikgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBpZiAoX1RodW1ibmFpbE5hdmlnYXRvckNvbnRhaW5lciAmJiAhX1RodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGh1bWJuYWlsIG5hdmlnYXRvciBjb250YWluZXIgZGVmaW5lZCwgYnV0ICRUaHVtYm5haWxOYXZpZ2F0b3JPcHRpb25zIG5vdCBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBfU2xpZGVzQ29udGFpbmVyV2lkdGggPSAkSnNzb3IkLiRDc3NXaWR0aChfU2xpZGVzQ29udGFpbmVyKTtcclxuICAgIHZhciBfU2xpZGVzQ29udGFpbmVySGVpZ2h0ID0gJEpzc29yJC4kQ3NzSGVpZ2h0KF9TbGlkZXNDb250YWluZXIpO1xyXG5cclxuICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGlzTmFOKF9TbGlkZXNDb250YWluZXJXaWR0aCkpXHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIldpZHRoIG9mIHNsaWRlcyBjb250YWluZXIgd3Jvbmcgc3BlY2lmaWNhdGlvbiwgaXQgc2hvdWxkIGJlIHNwZWNpZmllZCBpbiBwaXhlbCAobGlrZSBzdHlsZT0nd2lkdGg6IDYwMHB4OycpLlwiKTtcclxuXHJcbiAgICAgICAgaWYgKF9TbGlkZXNDb250YWluZXJXaWR0aCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIldpZHRoIG9mIHNsaWRlcyBjb250YWluZXIgbm90IHNwZWNpZmllZCwgaXQgc2hvdWxkIGJlIHNwZWNpZmllZCBpbiBwaXhlbCAobGlrZSBzdHlsZT0nd2lkdGg6IDYwMHB4OycpLlwiKTtcclxuXHJcbiAgICAgICAgaWYgKGlzTmFOKF9TbGlkZXNDb250YWluZXJIZWlnaHQpKVxyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJIZWlnaHQgb2Ygc2xpZGVzIGNvbnRhaW5lciB3cm9uZyBzcGVjaWZpY2F0aW9uLCBpdCBzaG91bGQgYmUgc3BlY2lmaWVkIGluIHBpeGVsIChsaWtlIHN0eWxlPSdoZWlnaHQ6IDMwMHB4OycpLlwiKTtcclxuXHJcbiAgICAgICAgaWYgKF9TbGlkZXNDb250YWluZXJIZWlnaHQgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJIZWlnaHQgb2Ygc2xpZGVzIGNvbnRhaW5lciBub3Qgc3BlY2lmaWVkLCBpdCBzaG91bGQgYmUgc3BlY2lmaWVkIGluIHBpeGVsIChsaWtlIHN0eWxlPSdoZWlnaHQ6IDMwMHB4OycpLlwiKTtcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlc0NvbnRhaW5lck92ZXJmbG93ID0gJEpzc29yJC4kQ3NzT3ZlcmZsb3coX1NsaWRlc0NvbnRhaW5lcik7XHJcbiAgICAgICAgdmFyIHNsaWRlc0NvbnRhaW5lck92ZXJmbG93WCA9ICRKc3NvciQuJENzcyhfU2xpZGVzQ29udGFpbmVyLCBcIm92ZXJmbG93WFwiKTtcclxuICAgICAgICB2YXIgc2xpZGVzQ29udGFpbmVyT3ZlcmZsb3dZID0gJEpzc29yJC4kQ3NzKF9TbGlkZXNDb250YWluZXIsIFwib3ZlcmZsb3dZXCIpO1xyXG4gICAgICAgIGlmIChzbGlkZXNDb250YWluZXJPdmVyZmxvdyAhPSBcImhpZGRlblwiICYmIChzbGlkZXNDb250YWluZXJPdmVyZmxvd1ggIT0gXCJoaWRkZW5cIiB8fCBzbGlkZXNDb250YWluZXJPdmVyZmxvd1kgIT0gXCJoaWRkZW5cIikpXHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIk92ZXJmbG93IG9mIHNsaWRlcyBjb250YWluZXIgd3Jvbmcgc3BlY2lmaWNhdGlvbiwgaXQgc2hvdWxkIGJlIHNwZWNpZmllZCBhcyAnaGlkZGVuJyAoc3R5bGU9J292ZXJmbG93OmhpZGRlbjsnKS5cIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghJEpzc29yJC4kSXNOdW1lcmljKF9PcHRpb25zLiREaXNwbGF5UGllY2VzKSlcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiT3B0aW9uICREaXNwbGF5UGllY2VzIGVycm9yLCBpdCBzaG91bGQgYmUgYSBudW1lcmljIHZhbHVlIGFuZCBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMS5cIik7XHJcblxyXG4gICAgICAgIGlmIChfT3B0aW9ucy4kRGlzcGxheVBpZWNlcyA8IDEpXHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIk9wdGlvbiAkRGlzcGxheVBpZWNlcyBlcnJvciwgaXQgc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAxLlwiKTtcclxuXHJcbiAgICAgICAgaWYgKF9PcHRpb25zLiREaXNwbGF5UGllY2VzID4gMSAmJiBfT3B0aW9ucy4kRHJhZ09yaWVudGF0aW9uICYmIF9PcHRpb25zLiREcmFnT3JpZW50YXRpb24gIT0gX1BsYXlPcmllbnRhdGlvbilcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiT3B0aW9uICREcmFnT3JpZW50YXRpb24gZXJyb3IsIGl0IHNob3VsZCBiZSAwIG9yIHRoZSBzYW1lIG9mICRQbGF5T3JpZW50YXRpb24gd2hlbiAkRGlzcGxheVBpZWNlcyBpcyBncmVhdGVyIHRoYW4gMS5cIik7XHJcblxyXG4gICAgICAgIGlmICghJEpzc29yJC4kSXNOdW1lcmljKF9PcHRpb25zLiRQYXJraW5nUG9zaXRpb24pKVxyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJPcHRpb24gJFBhcmtpbmdQb3NpdGlvbiBlcnJvciwgaXQgc2hvdWxkIGJlIGEgbnVtZXJpYyB2YWx1ZS5cIik7XHJcblxyXG4gICAgICAgIGlmIChfT3B0aW9ucy4kUGFya2luZ1Bvc2l0aW9uICYmIF9PcHRpb25zLiREcmFnT3JpZW50YXRpb24gJiYgX09wdGlvbnMuJERyYWdPcmllbnRhdGlvbiAhPSBfUGxheU9yaWVudGF0aW9uKVxyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJPcHRpb24gJERyYWdPcmllbnRhdGlvbiBlcnJvciwgaXQgc2hvdWxkIGJlIDAgb3IgdGhlIHNhbWUgb2YgJFBsYXlPcmllbnRhdGlvbiB3aGVuICRQYXJraW5nUG9zaXRpb24gaXMgbm90IGVxdWFsIHRvIDAuXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIF9TdHlsZURlZjtcclxuXHJcbiAgICB2YXIgX1NsaWRlRWxtdHMgPSBbXTtcclxuXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNsaWRlRWxtdHMgPSAkSnNzb3IkLiRDaGlsZHJlbihfU2xpZGVzQ29udGFpbmVyKTtcclxuICAgICAgICAkSnNzb3IkLiRFYWNoKHNsaWRlRWxtdHMsIGZ1bmN0aW9uIChzbGlkZUVsbXQpIHtcclxuICAgICAgICAgICAgaWYgKHNsaWRlRWxtdC50YWdOYW1lID09IFwiRElWXCIgJiYgISRKc3NvciQuJEF0dHJpYnV0ZUV4KHNsaWRlRWxtdCwgXCJ1XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBfU2xpZGVFbG10cy5wdXNoKHNsaWRlRWxtdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoJEpzc29yJC4kSXNCcm93c2VySWU5RWFybGllcigpKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NaSW5kZXgoc2xpZGVFbG10LCAoJEpzc29yJC4kQ3NzWkluZGV4KHNsaWRlRWxtdCkgfHwgMCkgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKF9TbGlkZUVsbXRzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFcnJvcihcIlNsaWRlcyBodG1sIGNvZGUgZGVmaW5pdGlvbiBlcnJvciwgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAxIHNsaWRlIHRvIGluaXRpYWxpemUgYSBzbGlkZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBfU2xpZGVJdGVtQ3JlYXRlZENvdW50ID0gMDsgLy9mb3IgZGVidWcgb25seVxyXG4gICAgdmFyIF9TbGlkZUl0ZW1SZWxlYXNlZENvdW50ID0gMDsgICAgLy9mb3IgZGVidWcgb25seVxyXG5cclxuICAgIHZhciBfUHJldmlvdXNTbGlkZUluZGV4O1xyXG4gICAgdmFyIF9DdXJyZW50U2xpZGVJbmRleCA9IC0xO1xyXG4gICAgdmFyIF9UZW1wU2xpZGVJbmRleDtcclxuICAgIHZhciBfUHJldlNsaWRlSXRlbTtcclxuICAgIHZhciBfQ3VycmVudFNsaWRlSXRlbTtcclxuICAgIHZhciBfU2xpZGVDb3VudCA9IF9TbGlkZUVsbXRzLmxlbmd0aDtcclxuXHJcbiAgICB2YXIgX1NsaWRlV2lkdGggPSBfT3B0aW9ucy4kU2xpZGVXaWR0aCB8fCBfU2xpZGVzQ29udGFpbmVyV2lkdGg7XHJcbiAgICB2YXIgX1NsaWRlSGVpZ2h0ID0gX09wdGlvbnMuJFNsaWRlSGVpZ2h0IHx8IF9TbGlkZXNDb250YWluZXJIZWlnaHQ7XHJcblxyXG4gICAgdmFyIF9TbGlkZVNwYWNpbmcgPSBfT3B0aW9ucy4kU2xpZGVTcGFjaW5nO1xyXG4gICAgdmFyIF9TdGVwTGVuZ3RoWCA9IF9TbGlkZVdpZHRoICsgX1NsaWRlU3BhY2luZztcclxuICAgIHZhciBfU3RlcExlbmd0aFkgPSBfU2xpZGVIZWlnaHQgKyBfU2xpZGVTcGFjaW5nO1xyXG4gICAgdmFyIF9TdGVwTGVuZ3RoID0gKF9QbGF5T3JpZW50YXRpb24gJiAxKSA/IF9TdGVwTGVuZ3RoWCA6IF9TdGVwTGVuZ3RoWTtcclxuICAgIHZhciBfRGlzcGxheVBpZWNlcyA9IE1hdGgubWluKF9PcHRpb25zLiREaXNwbGF5UGllY2VzLCBfU2xpZGVDb3VudCk7XHJcblxyXG4gICAgdmFyIF9TbGlkZXNob3dQYW5lbDtcclxuICAgIHZhciBfQ3VycmVudEJvYXJkSW5kZXggPSAwO1xyXG4gICAgdmFyIF9EcmFnT3JpZW50YXRpb247XHJcbiAgICB2YXIgX0RyYWdPcmllbnRhdGlvblJlZ2lzdGVyZWQ7XHJcbiAgICB2YXIgX0RyYWdJbnZhbGlkO1xyXG5cclxuICAgIHZhciBfTmF2aWdhdG9ycyA9IFtdO1xyXG4gICAgdmFyIF9CdWxsZXROYXZpZ2F0b3I7XHJcbiAgICB2YXIgX0Fycm93TmF2aWdhdG9yO1xyXG4gICAgdmFyIF9UaHVtYm5haWxOYXZpZ2F0b3I7XHJcblxyXG4gICAgdmFyIF9TaG93TGluaztcclxuXHJcbiAgICB2YXIgX0Zyb3plbjtcclxuICAgIHZhciBfQXV0b1BsYXk7XHJcbiAgICB2YXIgX0F1dG9QbGF5U3RlcHMgPSBfT3B0aW9ucy4kQXV0b1BsYXlTdGVwcztcclxuICAgIHZhciBfSG92ZXJUb1BhdXNlID0gX09wdGlvbnMuJFBhdXNlT25Ib3ZlcjtcclxuICAgIHZhciBfQXV0b1BsYXlJbnRlcnZhbCA9IF9PcHRpb25zLiRBdXRvUGxheUludGVydmFsO1xyXG4gICAgdmFyIF9TbGlkZUR1cmF0aW9uID0gX09wdGlvbnMuJFNsaWRlRHVyYXRpb247XHJcblxyXG4gICAgdmFyIF9TbGlkZXNob3dSdW5uZXJDbGFzcztcclxuICAgIHZhciBfVHJhbnNpdGlvbnNPcmRlcjtcclxuXHJcbiAgICB2YXIgX1NsaWRlc2hvd0VuYWJsZWQ7XHJcbiAgICB2YXIgX1BhcmtpbmdQb3NpdGlvbjtcclxuICAgIHZhciBfQ2Fyb3VzZWxFbmFibGVkID0gX0Rpc3BsYXlQaWVjZXMgPCBfU2xpZGVDb3VudDtcclxuICAgIHZhciBfTG9vcCA9IF9DYXJvdXNlbEVuYWJsZWQgPyBfT3B0aW9ucy4kTG9vcCA6IDA7XHJcblxyXG4gICAgdmFyIF9EcmFnRW5hYmxlZDtcclxuICAgIHZhciBfTGFzdERyYWdTdWNjZWRlZDtcclxuXHJcbiAgICB2YXIgX05vdE9uSG92ZXIgPSAxOyAgIC8vMCBIb3ZlcmluZywgMSBOb3QgaG92ZXJpbmdcclxuXHJcbiAgICAvL1ZhcmlhYmxlIERlZmluaXRpb25cclxuICAgIHZhciBfSXNTbGlkaW5nO1xyXG4gICAgdmFyIF9Jc0RyYWdnaW5nO1xyXG4gICAgdmFyIF9Mb2FkaW5nVGlja2V0O1xyXG5cclxuICAgIC8vVGhlIFggcG9zaXRpb24gb2YgbW91c2UvdG91Y2ggd2hlbiBhIGRyYWcgc3RhcnRcclxuICAgIHZhciBfRHJhZ1N0YXJ0TW91c2VYID0gMDtcclxuICAgIC8vVGhlIFkgcG9zaXRpb24gb2YgbW91c2UvdG91Y2ggd2hlbiBhIGRyYWcgc3RhcnRcclxuICAgIHZhciBfRHJhZ1N0YXJ0TW91c2VZID0gMDtcclxuICAgIHZhciBfRHJhZ09mZnNldFRvdGFsO1xyXG4gICAgdmFyIF9EcmFnT2Zmc2V0TGFzdFRpbWU7XHJcbiAgICB2YXIgX0RyYWdJbmRleEFkanVzdDtcclxuXHJcbiAgICB2YXIgX0Nhcm91c2VsO1xyXG4gICAgdmFyIF9Db252ZXlvcjtcclxuICAgIHZhciBfU2xpZGVzaG93O1xyXG4gICAgdmFyIF9DYXJvdXNlbFBsYXllcjtcclxuICAgIHZhciBfU2xpZGVDb250YWluZXIgPSBuZXcgU2xpZGVDb250YWluZXIoKTtcclxuICAgIHZhciBfU2NhbGVSYXRpbztcclxuXHJcbiAgICAvLyRKc3NvclNsaWRlciQgQ29uc3RydWN0b3JcclxuICAgIHtcclxuICAgICAgICBfQXV0b1BsYXkgPSBfT3B0aW9ucy4kQXV0b1BsYXk7XHJcbiAgICAgICAgX1NlbGZTbGlkZXIuJE9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICBBZGp1c3RTbGlkZXNDb250YWluZXJTaXplKCk7XHJcblxyXG4gICAgICAgICRKc3NvciQuJEF0dHJpYnV0ZShlbG10LCBcImpzc29yLXNsaWRlclwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgJEpzc29yJC4kQ3NzWkluZGV4KF9TbGlkZXNDb250YWluZXIsICRKc3NvciQuJENzc1pJbmRleChfU2xpZGVzQ29udGFpbmVyKSB8fCAwKTtcclxuICAgICAgICAkSnNzb3IkLiRDc3NQb3NpdGlvbihfU2xpZGVzQ29udGFpbmVyLCBcImFic29sdXRlXCIpO1xyXG4gICAgICAgIF9TbGlkZXNob3dQYW5lbCA9ICRKc3NvciQuJENsb25lTm9kZShfU2xpZGVzQ29udGFpbmVyLCB0cnVlKTtcclxuICAgICAgICAkSnNzb3IkLiRJbnNlcnRCZWZvcmUoX1NsaWRlc2hvd1BhbmVsLCBfU2xpZGVzQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgaWYgKF9TbGlkZXNob3dPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIF9TaG93TGluayA9IF9TbGlkZXNob3dPcHRpb25zLiRTaG93TGluaztcclxuICAgICAgICAgICAgX1NsaWRlc2hvd1J1bm5lckNsYXNzID0gX1NsaWRlc2hvd09wdGlvbnMuJENsYXNzO1xyXG5cclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX1NsaWRlc2hvd09wdGlvbnMuJFRyYW5zaXRpb25zIHx8ICFfU2xpZGVzaG93T3B0aW9ucy4kVHJhbnNpdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRFcnJvcihcIkludmFsaWQgJyRTbGlkZXNob3dPcHRpb25zJywgbm8gJyRUcmFuc2l0aW9ucycgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBfU2xpZGVzaG93RW5hYmxlZCA9IF9EaXNwbGF5UGllY2VzID09IDEgJiYgX1NsaWRlQ291bnQgPiAxICYmIF9TbGlkZXNob3dSdW5uZXJDbGFzcyAmJiAoISRKc3NvciQuJElzQnJvd3NlcklFKCkgfHwgJEpzc29yJC4kQnJvd3NlclZlcnNpb24oKSA+PSA4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9QYXJraW5nUG9zaXRpb24gPSAoX1NsaWRlc2hvd0VuYWJsZWQgfHwgX0Rpc3BsYXlQaWVjZXMgPj0gX1NsaWRlQ291bnQgfHwgIShfTG9vcCAmIDEpKSA/IDAgOiBfT3B0aW9ucy4kUGFya2luZ1Bvc2l0aW9uO1xyXG5cclxuICAgICAgICBfRHJhZ0VuYWJsZWQgPSAoKF9EaXNwbGF5UGllY2VzID4gMSB8fCBfUGFya2luZ1Bvc2l0aW9uKSA/IF9QbGF5T3JpZW50YXRpb24gOiAtMSkgJiBfT3B0aW9ucy4kRHJhZ09yaWVudGF0aW9uO1xyXG5cclxuICAgICAgICAvL1NsaWRlQm9hcmRcclxuICAgICAgICB2YXIgX1NsaWRlYm9hcmRFbG10ID0gX1NsaWRlc0NvbnRhaW5lcjtcclxuICAgICAgICB2YXIgX1NsaWRlSXRlbXMgPSBbXTtcclxuXHJcbiAgICAgICAgdmFyIF9TbGlkZXNob3dSdW5uZXI7XHJcbiAgICAgICAgdmFyIF9MaW5rQ29udGFpbmVyO1xyXG5cclxuICAgICAgICB2YXIgX0RldmljZSA9ICRKc3NvciQuJERldmljZSgpO1xyXG4gICAgICAgIHZhciBfSXNUb3VjaERldmljZSA9IF9EZXZpY2UuJFRvdWNoYWJsZTtcclxuXHJcbiAgICAgICAgdmFyIF9MYXN0VGltZU1vdmVCeURyYWc7XHJcbiAgICAgICAgdmFyIF9Qb3NpdGlvbl9PbkZyZWV6ZTtcclxuICAgICAgICB2YXIgX0Nhcm91c2VsUGxheWluZ19PbkZyZWV6ZTtcclxuICAgICAgICB2YXIgX1BsYXlUb1Bvc2l0aW9uX09uRnJlZXplO1xyXG4gICAgICAgIHZhciBfUG9zaXRpb25Ub0dvQnlEcmFnO1xyXG5cclxuICAgICAgICAvL1NsaWRlQm9hcmQgQ29uc3RydWN0b3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfRGV2aWNlLiRUb3VjaEFjdGlvbkF0dHIpIHtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJENzcyhfU2xpZGVib2FyZEVsbXQsIF9EZXZpY2UuJFRvdWNoQWN0aW9uQXR0ciwgW251bGwsIFwicGFuLXlcIiwgXCJwYW4teFwiLCBcIm5vbmVcIl1bX0RyYWdFbmFibGVkXSB8fCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX1NsaWRlc2hvdyA9IG5ldyBTbGlkZXNob3coKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfU2xpZGVzaG93RW5hYmxlZClcclxuICAgICAgICAgICAgICAgIF9TbGlkZXNob3dSdW5uZXIgPSBuZXcgX1NsaWRlc2hvd1J1bm5lckNsYXNzKF9TbGlkZUNvbnRhaW5lciwgX1NsaWRlV2lkdGgsIF9TbGlkZUhlaWdodCwgX1NsaWRlc2hvd09wdGlvbnMsIF9Jc1RvdWNoRGV2aWNlKTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJEFwcGVuZENoaWxkKF9TbGlkZXNob3dQYW5lbCwgX1NsaWRlc2hvdy4kV3JhcHBlcik7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc092ZXJmbG93KF9TbGlkZXNDb250YWluZXIsIFwiaGlkZGVuXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9saW5rIGNvbnRhaW5lclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfTGlua0NvbnRhaW5lciA9IENyZWF0ZVBhbmVsKCk7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3MoX0xpbmtDb250YWluZXIsIFwiYmFja2dyb3VuZENvbG9yXCIsIFwiIzAwMFwiKTtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJENzc09wYWNpdHkoX0xpbmtDb250YWluZXIsIDApO1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kSW5zZXJ0QmVmb3JlKF9MaW5rQ29udGFpbmVyLCBfU2xpZGVib2FyZEVsbXQuZmlyc3RDaGlsZCwgX1NsaWRlYm9hcmRFbG10KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfU2xpZGVFbG10cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlRWxtdCA9IF9TbGlkZUVsbXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlSXRlbSA9IG5ldyBTbGlkZUl0ZW0oc2xpZGVFbG10LCBpKTtcclxuICAgICAgICAgICAgICAgIF9TbGlkZUl0ZW1zLnB1c2goc2xpZGVJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJEpzc29yJC4kSGlkZUVsZW1lbnQoX0xvYWRpbmdDb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJEF0dHJpYnV0ZShfTG9hZGluZ0NvbnRhaW5lciwgXCJkZWJ1Zy1pZFwiLCBcImxvYWRpbmctY29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIF9DYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCgpO1xyXG4gICAgICAgICAgICBfQ2Fyb3VzZWxQbGF5ZXIgPSBuZXcgQ2Fyb3VzZWxQbGF5ZXIoX0Nhcm91c2VsLCBfU2xpZGVzaG93KTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBdHRyaWJ1dGUoX1NsaWRlYm9hcmRFbG10LCBcImRlYnVnLWlkXCIsIFwic2xpZGUtYm9hcmRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9EcmFnRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoX1NsaWRlc0NvbnRhaW5lciwgXCJtb3VzZWRvd25cIiwgT25EcmFnU3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoX1NsaWRlc0NvbnRhaW5lciwgXCJ0b3VjaHN0YXJ0XCIsIE9uVG91Y2hTdGFydCk7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChfU2xpZGVzQ29udGFpbmVyLCBcImRyYWdzdGFydFwiLCBQcmV2ZW50RHJhZ1NlbGVjdGlvbkV2ZW50KTtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJEFkZEV2ZW50KF9TbGlkZXNDb250YWluZXIsIFwic2VsZWN0c3RhcnRcIiwgUHJldmVudERyYWdTZWxlY3Rpb25FdmVudCk7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChkb2N1bWVudCwgXCJtb3VzZXVwXCIsIE9uRHJhZ0VuZCk7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChkb2N1bWVudCwgXCJ0b3VjaGVuZFwiLCBPbkRyYWdFbmQpO1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoZG9jdW1lbnQsIFwidG91Y2hjYW5jZWxcIiwgT25EcmFnRW5kKTtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJEFkZEV2ZW50KHdpbmRvdywgXCJibHVyXCIsIE9uRHJhZ0VuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9TbGlkZUJvYXJkXHJcblxyXG4gICAgICAgIF9Ib3ZlclRvUGF1c2UgJj0gKF9Jc1RvdWNoRGV2aWNlID8gMTAgOiA1KTtcclxuXHJcbiAgICAgICAgLy9CdWxsZXQgTmF2aWdhdG9yXHJcbiAgICAgICAgaWYgKF9CdWxsZXROYXZpZ2F0b3JDb250YWluZXIgJiYgX0J1bGxldE5hdmlnYXRvck9wdGlvbnMpIHtcclxuICAgICAgICAgICAgX0J1bGxldE5hdmlnYXRvciA9IG5ldyBfQnVsbGV0TmF2aWdhdG9yT3B0aW9ucy4kQ2xhc3MoX0J1bGxldE5hdmlnYXRvckNvbnRhaW5lciwgX0J1bGxldE5hdmlnYXRvck9wdGlvbnMsIE9yaWdpbmFsV2lkdGgoKSwgT3JpZ2luYWxIZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIF9OYXZpZ2F0b3JzLnB1c2goX0J1bGxldE5hdmlnYXRvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0Fycm93IE5hdmlnYXRvclxyXG4gICAgICAgIGlmIChfQXJyb3dOYXZpZ2F0b3JPcHRpb25zICYmIF9BcnJvd0xlZnQgJiYgX0Fycm93UmlnaHQpIHtcclxuICAgICAgICAgICAgX0Fycm93TmF2aWdhdG9yT3B0aW9ucy4kTG9vcCA9IF9Mb29wO1xyXG4gICAgICAgICAgICBfQXJyb3dOYXZpZ2F0b3JPcHRpb25zLiREaXNwbGF5UGllY2VzID0gX0Rpc3BsYXlQaWVjZXM7XHJcbiAgICAgICAgICAgIF9BcnJvd05hdmlnYXRvciA9IG5ldyBfQXJyb3dOYXZpZ2F0b3JPcHRpb25zLiRDbGFzcyhfQXJyb3dMZWZ0LCBfQXJyb3dSaWdodCwgX0Fycm93TmF2aWdhdG9yT3B0aW9ucywgT3JpZ2luYWxXaWR0aCgpLCBPcmlnaW5hbEhlaWdodCgpKTtcclxuICAgICAgICAgICAgX05hdmlnYXRvcnMucHVzaChfQXJyb3dOYXZpZ2F0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9UaHVtYm5haWwgTmF2aWdhdG9yXHJcbiAgICAgICAgaWYgKF9UaHVtYm5haWxOYXZpZ2F0b3JDb250YWluZXIgJiYgX1RodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMpIHtcclxuICAgICAgICAgICAgX1RodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMuJFN0YXJ0SW5kZXggPSBfT3B0aW9ucy4kU3RhcnRJbmRleDtcclxuICAgICAgICAgICAgX1RodW1ibmFpbE5hdmlnYXRvciA9IG5ldyBfVGh1bWJuYWlsTmF2aWdhdG9yT3B0aW9ucy4kQ2xhc3MoX1RodW1ibmFpbE5hdmlnYXRvckNvbnRhaW5lciwgX1RodW1ibmFpbE5hdmlnYXRvck9wdGlvbnMpO1xyXG4gICAgICAgICAgICBfTmF2aWdhdG9ycy5wdXNoKF9UaHVtYm5haWxOYXZpZ2F0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJEpzc29yJC4kRWFjaChfTmF2aWdhdG9ycywgZnVuY3Rpb24gKG5hdmlnYXRvcikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuJFJlc2V0KF9TbGlkZUNvdW50LCBfU2xpZGVJdGVtcywgX0xvYWRpbmdDb250YWluZXIpO1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuJE9uKCRKc3Nvck5hdmlnYXRvckV2ZW50cyQuJE5BVklHQVRJT05SRVFVRVNULCBOYXZpZ2F0aW9uQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgU2NhbGUoT3JpZ2luYWxXaWR0aCgpKTtcclxuXHJcbiAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoX1NsaWRlc0NvbnRhaW5lciwgXCJjbGlja1wiLCBTbGlkZXNDbGlja0V2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoZWxtdCwgXCJtb3VzZW91dFwiLCAkSnNzb3IkLiRNb3VzZU92ZXJPdXRGaWx0ZXIoTWFpbkNvbnRhaW5lck1vdXNlTGVhdmVFdmVudEhhbmRsZXIsIGVsbXQpKTtcclxuICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChlbG10LCBcIm1vdXNlb3ZlclwiLCAkSnNzb3IkLiRNb3VzZU92ZXJPdXRGaWx0ZXIoTWFpbkNvbnRhaW5lck1vdXNlRW50ZXJFdmVudEhhbmRsZXIsIGVsbXQpKTtcclxuXHJcbiAgICAgICAgU2hvd05hdmlnYXRvcnMoKTtcclxuXHJcbiAgICAgICAgLy9LZXlib2FyZCBOYXZpZ2F0aW9uXHJcbiAgICAgICAgaWYgKF9PcHRpb25zLiRBcnJvd0tleU5hdmlnYXRpb24pIHtcclxuICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoZG9jdW1lbnQsIFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAzNy8qJEpzc29yS2V5Q29kZSQuJExFRlQqLykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQXJyb3cgTGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIFBsYXlUb09mZnNldCgtMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzkvKiRKc3NvcktleUNvZGUkLiRSSUdIVCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9BcnJvdyBSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIFBsYXlUb09mZnNldCgxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RhcnRQb3NpdGlvbiA9IF9PcHRpb25zLiRTdGFydEluZGV4O1xyXG4gICAgICAgIGlmICghKF9Mb29wICYgMSkpIHtcclxuICAgICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IE1hdGgubWF4KDAsIE1hdGgubWluKHN0YXJ0UG9zaXRpb24sIF9TbGlkZUNvdW50IC0gX0Rpc3BsYXlQaWVjZXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX0Nhcm91c2VsUGxheWVyLiRQbGF5Q2Fyb3VzZWwoc3RhcnRQb3NpdGlvbiwgc3RhcnRQb3NpdGlvbiwgMCk7XHJcbiAgICB9XHJcbn07XHJcbnZhciAkSnNzb3JTbGlkZW8kID0gd2luZG93LiRKc3NvclNsaWRlbyQgPSAkSnNzb3JTbGlkZXIkO1xyXG5cclxuJEpzc29yU2xpZGVyJC4kRVZUX0NMSUNLID0gMjE7XHJcbiRKc3NvclNsaWRlciQuJEVWVF9EUkFHX1NUQVJUID0gMjI7XHJcbiRKc3NvclNsaWRlciQuJEVWVF9EUkFHX0VORCA9IDIzO1xyXG4kSnNzb3JTbGlkZXIkLiRFVlRfU1dJUEVfU1RBUlQgPSAyNDtcclxuJEpzc29yU2xpZGVyJC4kRVZUX1NXSVBFX0VORCA9IDI1O1xyXG5cclxuJEpzc29yU2xpZGVyJC4kRVZUX0xPQURfU1RBUlQgPSAyNjtcclxuJEpzc29yU2xpZGVyJC4kRVZUX0xPQURfRU5EID0gMjc7XHJcbiRKc3NvclNsaWRlciQuJEVWVF9GUkVFWkUgPSAyODtcclxuXHJcbiRKc3NvclNsaWRlciQuJEVWVF9QT1NJVElPTl9DSEFOR0UgPSAyMDI7XHJcbiRKc3NvclNsaWRlciQuJEVWVF9QQVJLID0gMjAzO1xyXG5cclxuJEpzc29yU2xpZGVyJC4kRVZUX1NMSURFU0hPV19TVEFSVCA9IDIwNjtcclxuJEpzc29yU2xpZGVyJC4kRVZUX1NMSURFU0hPV19FTkQgPSAyMDc7XHJcblxyXG4kSnNzb3JTbGlkZXIkLiRFVlRfUFJPR1JFU1NfQ0hBTkdFID0gMjA4O1xyXG4kSnNzb3JTbGlkZXIkLiRFVlRfU1RBVEVfQ0hBTkdFID0gMjA5O1xyXG4kSnNzb3JTbGlkZXIkLiRFVlRfUk9MTEJBQ0tfU1RBUlQgPSAyMTA7XHJcbiRKc3NvclNsaWRlciQuJEVWVF9ST0xMQkFDS19FTkQgPSAyMTE7XHJcblxyXG4vLyhmdW5jdGlvbiAoJCkge1xyXG4vLyAgICBqUXVlcnkuZm4uanNzb3JTbGlkZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4vLyAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAgcmV0dXJuICQodGhpcykuZGF0YSgnanNzb3JTbGlkZXInKSB8fCAkKHRoaXMpLmRhdGEoJ2pzc29yU2xpZGVyJywgbmV3ICRKc3NvclNsaWRlciQodGhpcywgb3B0aW9ucykpO1xyXG4vLyAgICAgICAgfSk7XHJcbi8vICAgIH07XHJcbi8vfSkoalF1ZXJ5KTtcclxuXHJcbi8vd2luZG93LmpRdWVyeSAmJiAoalF1ZXJ5LmZuLmpzc29yU2xpZGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuLy8gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICByZXR1cm4galF1ZXJ5KHRoaXMpLmRhdGEoJ2pzc29yU2xpZGVyJykgfHwgalF1ZXJ5KHRoaXMpLmRhdGEoJ2pzc29yU2xpZGVyJywgbmV3ICRKc3NvclNsaWRlciQodGhpcywgb3B0aW9ucykpO1xyXG4vLyAgICB9KTtcclxuLy99KTtcclxuXHJcbi8vJEpzc29yQnVsbGV0TmF2aWdhdG9yJFxyXG52YXIgJEpzc29yTmF2aWdhdG9yRXZlbnRzJCA9IHtcclxuICAgICROQVZJR0FUSU9OUkVRVUVTVDogMSxcclxuICAgICRJTkRFWENIQU5HRTogMixcclxuICAgICRSRVNFVDogM1xyXG59O1xyXG5cclxudmFyICRKc3NvckJ1bGxldE5hdmlnYXRvciQgPSB3aW5kb3cuJEpzc29yQnVsbGV0TmF2aWdhdG9yJCA9IGZ1bmN0aW9uIChlbG10LCBvcHRpb25zLCBjb250YWluZXJXaWR0aCwgY29udGFpbmVySGVpZ2h0KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAkSnNzb3JPYmplY3QkLmNhbGwoc2VsZik7XHJcblxyXG4gICAgZWxtdCA9ICRKc3NvciQuJEdldEVsZW1lbnQoZWxtdCk7XHJcblxyXG4gICAgdmFyIF9Db3VudDtcclxuICAgIHZhciBfTGVuZ3RoO1xyXG4gICAgdmFyIF9XaWR0aDtcclxuICAgIHZhciBfSGVpZ2h0O1xyXG4gICAgdmFyIF9DdXJyZW50SW5kZXg7XHJcbiAgICB2YXIgX0N1cnJlbnRJbm5lckluZGV4ID0gMDtcclxuICAgIHZhciBfT3B0aW9ucztcclxuICAgIHZhciBfU3RlcHM7XHJcbiAgICB2YXIgX0xhbmVzO1xyXG4gICAgdmFyIF9TcGFjaW5nWDtcclxuICAgIHZhciBfU3BhY2luZ1k7XHJcbiAgICB2YXIgX09yaWVudGF0aW9uO1xyXG4gICAgdmFyIF9JdGVtUHJvdG90eXBlO1xyXG4gICAgdmFyIF9Qcm90b3R5cGVXaWR0aDtcclxuICAgIHZhciBfUHJvdG90eXBlSGVpZ2h0O1xyXG5cclxuICAgIHZhciBfQnV0dG9uRWxlbWVudHMgPSBbXTtcclxuICAgIHZhciBfQnV0dG9ucyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIEhpZ2hsaWdodChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSlcclxuICAgICAgICAgICAgX0J1dHRvbnNbaW5kZXhdLiRTZWxlY3RlZChpbmRleCA9PSBfQ3VycmVudElubmVySW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE9uTmF2aWdhdGlvblJlcXVlc3QoaW5kZXgpIHtcclxuICAgICAgICBzZWxmLiRUcmlnZ2VyRXZlbnQoJEpzc29yTmF2aWdhdG9yRXZlbnRzJC4kTkFWSUdBVElPTlJFUVVFU1QsIGluZGV4ICogX1N0ZXBzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLiRFbG10ID0gZWxtdDtcclxuICAgIHNlbGYuJEdldEN1cnJlbnRJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX0N1cnJlbnRJbmRleDtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi4kU2V0Q3VycmVudEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IF9DdXJyZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RJbm5lckluZGV4ID0gX0N1cnJlbnRJbm5lckluZGV4O1xyXG4gICAgICAgICAgICB2YXIgaW5uZXJJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyBfU3RlcHMpO1xyXG4gICAgICAgICAgICBfQ3VycmVudElubmVySW5kZXggPSBpbm5lckluZGV4O1xyXG4gICAgICAgICAgICBfQ3VycmVudEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICBIaWdobGlnaHQobGFzdElubmVySW5kZXgpO1xyXG4gICAgICAgICAgICBIaWdobGlnaHQoaW5uZXJJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvL3NlbGYuJFRyaWdnZXJFdmVudCgkSnNzb3JOYXZpZ2F0b3JFdmVudHMkLiRJTkRFWENIQU5HRSwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi4kU2hvdyA9IGZ1bmN0aW9uIChoaWRlKSB7XHJcbiAgICAgICAgJEpzc29yJC4kU2hvd0VsZW1lbnQoZWxtdCwgaGlkZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfTG9jYXRlZDtcclxuICAgIHNlbGYuJFJlbG9jYXRlID0gZnVuY3Rpb24gKGNvbnRhaW5lcldpZHRoLCBjb250YWluZXJIZWlnaHQpIHtcclxuICAgICAgICBpZiAoIV9Mb2NhdGVkIHx8IF9PcHRpb25zLiRTY2FsZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyV2lkdGggPSAkSnNzb3IkLiRQYXJlbnROb2RlKGVsbXQpLmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVySGVpZ2h0ID0gJEpzc29yJC4kUGFyZW50Tm9kZShlbG10KS5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoX09wdGlvbnMuJEF1dG9DZW50ZXIgJiAxKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NMZWZ0KGVsbXQsIChjb250YWluZXJXaWR0aCAtIF9XaWR0aCkgLyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX09wdGlvbnMuJEF1dG9DZW50ZXIgJiAyKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NUb3AoZWxtdCwgKGNvbnRhaW5lckhlaWdodCAtIF9IZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9Mb2NhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfSW5pdGlhbGl6ZWQ7XHJcbiAgICBzZWxmLiRSZXNldCA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcclxuICAgICAgICBpZiAoIV9Jbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICBfTGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgICAgICBfQ291bnQgPSBNYXRoLmNlaWwobGVuZ3RoIC8gX1N0ZXBzKTtcclxuICAgICAgICAgICAgX0N1cnJlbnRJbm5lckluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpdGVtT2Zmc2V0WCA9IF9Qcm90b3R5cGVXaWR0aCArIF9TcGFjaW5nWDtcclxuICAgICAgICAgICAgdmFyIGl0ZW1PZmZzZXRZID0gX1Byb3RvdHlwZUhlaWdodCArIF9TcGFjaW5nWTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXhJbmRleCA9IE1hdGguY2VpbChfQ291bnQgLyBfTGFuZXMpIC0gMTtcclxuXHJcbiAgICAgICAgICAgIF9XaWR0aCA9IF9Qcm90b3R5cGVXaWR0aCArIGl0ZW1PZmZzZXRYICogKCFfT3JpZW50YXRpb24gPyBtYXhJbmRleCA6IF9MYW5lcyAtIDEpO1xyXG4gICAgICAgICAgICBfSGVpZ2h0ID0gX1Byb3RvdHlwZUhlaWdodCArIGl0ZW1PZmZzZXRZICogKF9PcmllbnRhdGlvbiA/IG1heEluZGV4IDogX0xhbmVzIC0gMSk7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRDc3NXaWR0aChlbG10LCBfV2lkdGgpO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRDc3NIZWlnaHQoZWxtdCwgX0hlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBidXR0b25JbmRleCA9IDA7IGJ1dHRvbkluZGV4IDwgX0NvdW50OyBidXR0b25JbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG51bWJlckRpdiA9ICRKc3NvciQuJENyZWF0ZVNwYW4oKTtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJElubmVyVGV4dChudW1iZXJEaXYsIGJ1dHRvbkluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRpdiA9ICRKc3NvciQuJEJ1aWxkRWxlbWVudChfSXRlbVByb3RvdHlwZSwgXCJudW1iZXJ0ZW1wbGF0ZVwiLCBudW1iZXJEaXYsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzUG9zaXRpb24oZGl2LCBcImFic29sdXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb2x1bW5JbmRleCA9IGJ1dHRvbkluZGV4ICUgKG1heEluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NMZWZ0KGRpdiwgIV9PcmllbnRhdGlvbiA/IGl0ZW1PZmZzZXRYICogY29sdW1uSW5kZXggOiBidXR0b25JbmRleCAlIF9MYW5lcyAqIGl0ZW1PZmZzZXRYKTtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJENzc1RvcChkaXYsIF9PcmllbnRhdGlvbiA/IGl0ZW1PZmZzZXRZICogY29sdW1uSW5kZXggOiBNYXRoLmZsb29yKGJ1dHRvbkluZGV4IC8gKG1heEluZGV4ICsgMSkpICogaXRlbU9mZnNldFkpO1xyXG5cclxuICAgICAgICAgICAgICAgICRKc3NvciQuJEFwcGVuZENoaWxkKGVsbXQsIGRpdik7XHJcbiAgICAgICAgICAgICAgICBfQnV0dG9uRWxlbWVudHNbYnV0dG9uSW5kZXhdID0gZGl2O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfT3B0aW9ucy4kQWN0aW9uTW9kZSAmIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQoZGl2LCBcImNsaWNrXCIsICRKc3NvciQuJENyZWF0ZUNhbGxiYWNrKG51bGwsIE9uTmF2aWdhdGlvblJlcXVlc3QsIGJ1dHRvbkluZGV4KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9PcHRpb25zLiRBY3Rpb25Nb2RlICYgMilcclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChkaXYsIFwibW91c2VvdmVyXCIsICRKc3NvciQuJE1vdXNlT3Zlck91dEZpbHRlcigkSnNzb3IkLiRDcmVhdGVDYWxsYmFjayhudWxsLCBPbk5hdmlnYXRpb25SZXF1ZXN0LCBidXR0b25JbmRleCksIGRpdikpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9CdXR0b25zW2J1dHRvbkluZGV4XSA9ICRKc3NvciQuJEJ1dHRvbml6ZShkaXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NlbGYuJFRyaWdnZXJFdmVudCgkSnNzb3JOYXZpZ2F0b3JFdmVudHMkLiRSRVNFVCk7XHJcbiAgICAgICAgICAgIF9Jbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL0pzc29yQnVsbGV0TmF2aWdhdG9yIENvbnN0cnVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgc2VsZi4kT3B0aW9ucyA9IF9PcHRpb25zID0gJEpzc29yJC4kRXh0ZW5kKHtcclxuICAgICAgICAgICAgJFNwYWNpbmdYOiAwLFxyXG4gICAgICAgICAgICAkU3BhY2luZ1k6IDAsXHJcbiAgICAgICAgICAgICRPcmllbnRhdGlvbjogMSxcclxuICAgICAgICAgICAgJEFjdGlvbk1vZGU6IDFcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy9Tb2RvIHN0YXRlbWVudCBmb3IgZGV2ZWxvcG1lbnQgdGltZSBpbnRlbGxpc2VuY2Ugb25seVxyXG4gICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9PcHRpb25zID0gJEpzc29yJC4kRXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICRTdGVwczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJExhbmVzOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgfSwgX09wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBfSXRlbVByb3RvdHlwZSA9ICRKc3NvciQuJEZpbmRDaGlsZChlbG10LCBcInByb3RvdHlwZVwiKTtcclxuXHJcbiAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFfSXRlbVByb3RvdHlwZSlcclxuICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIk5hdmlnYXRvciBpdGVtIHByb3RvdHlwZSBub3QgZGVmaW5lZC5cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNOYU4oJEpzc29yJC4kQ3NzV2lkdGgoX0l0ZW1Qcm90b3R5cGUpKSkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiV2lkdGggb2YgJ25hdmlnYXRvciBpdGVtIHByb3RvdHlwZScgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc05hTigkSnNzb3IkLiRDc3NIZWlnaHQoX0l0ZW1Qcm90b3R5cGUpKSkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiSGVpZ2h0IG9mICduYXZpZ2F0b3IgaXRlbSBwcm90b3R5cGUnIG5vdCBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF9Qcm90b3R5cGVXaWR0aCA9ICRKc3NvciQuJENzc1dpZHRoKF9JdGVtUHJvdG90eXBlKTtcclxuICAgICAgICBfUHJvdG90eXBlSGVpZ2h0ID0gJEpzc29yJC4kQ3NzSGVpZ2h0KF9JdGVtUHJvdG90eXBlKTtcclxuXHJcbiAgICAgICAgJEpzc29yJC4kUmVtb3ZlRWxlbWVudChfSXRlbVByb3RvdHlwZSwgZWxtdCk7XHJcblxyXG4gICAgICAgIF9TdGVwcyA9IF9PcHRpb25zLiRTdGVwcyB8fCAxO1xyXG4gICAgICAgIF9MYW5lcyA9IF9PcHRpb25zLiRMYW5lcyB8fCAxO1xyXG4gICAgICAgIF9TcGFjaW5nWCA9IF9PcHRpb25zLiRTcGFjaW5nWDtcclxuICAgICAgICBfU3BhY2luZ1kgPSBfT3B0aW9ucy4kU3BhY2luZ1k7XHJcbiAgICAgICAgX09yaWVudGF0aW9uID0gX09wdGlvbnMuJE9yaWVudGF0aW9uIC0gMTtcclxuXHJcbiAgICAgICAgaWYgKF9PcHRpb25zLiRTY2FsZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRBdHRyaWJ1dGUoZWxtdCwgXCJub3NjYWxlXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbnZhciAkSnNzb3JBcnJvd05hdmlnYXRvciQgPSB3aW5kb3cuJEpzc29yQXJyb3dOYXZpZ2F0b3IkID0gZnVuY3Rpb24gKGFycm93TGVmdCwgYXJyb3dSaWdodCwgb3B0aW9ucywgY29udGFpbmVyV2lkdGgsIGNvbnRhaW5lckhlaWdodCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgJEpzc29yT2JqZWN0JC5jYWxsKHNlbGYpO1xyXG5cclxuICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmICghYXJyb3dMZWZ0KVxyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJPcHRpb24gJyRBcnJvd05hdmlnYXRvck9wdGlvbnMnIHNwZXBjaWZpZWQsIGJ1dCBVSSAnYXJyb3dsZWZ0JyBub3QgZGVmaW5lZC4gRGVmaW5lICdhcnJvd2xlZnQnIHRvIGVuYWJsZSBkaXJlY3QgbmF2aWdhdGlvbiwgb3IgcmVtb3ZlIG9wdGlvbiAnJEFycm93TmF2aWdhdG9yT3B0aW9ucycgdG8gZGlzYWJsZSBkaXJlY3QgbmF2aWdhdGlvbi5cIik7XHJcblxyXG4gICAgICAgIGlmICghYXJyb3dSaWdodClcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiT3B0aW9uICckQXJyb3dOYXZpZ2F0b3JPcHRpb25zJyBzcGVwY2lmaWVkLCBidXQgVUkgJ2Fycm93cmlnaHQnIG5vdCBkZWZpbmVkLiBEZWZpbmUgJ2Fycm93cmlnaHQnIHRvIGVuYWJsZSBkaXJlY3QgbmF2aWdhdGlvbiwgb3IgcmVtb3ZlIG9wdGlvbiAnJEFycm93TmF2aWdhdG9yT3B0aW9ucycgdG8gZGlzYWJsZSBkaXJlY3QgbmF2aWdhdGlvbi5cIik7XHJcblxyXG4gICAgICAgIGlmIChpc05hTigkSnNzb3IkLiRDc3NXaWR0aChhcnJvd0xlZnQpKSkge1xyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJXaWR0aCBvZiAnYXJyb3cgbGVmdCcgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNOYU4oJEpzc29yJC4kQ3NzV2lkdGgoYXJyb3dSaWdodCkpKSB7XHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIldpZHRoIG9mICdhcnJvdyByaWdodCcgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNOYU4oJEpzc29yJC4kQ3NzSGVpZ2h0KGFycm93TGVmdCkpKSB7XHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIkhlaWdodCBvZiAnYXJyb3cgbGVmdCcgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNOYU4oJEpzc29yJC4kQ3NzSGVpZ2h0KGFycm93UmlnaHQpKSkge1xyXG4gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJIZWlnaHQgb2YgJ2Fycm93IHJpZ2h0JyBub3Qgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgX0hpZGU7XHJcbiAgICB2YXIgX0xlbmd0aDtcclxuICAgIHZhciBfQ3VycmVudEluZGV4O1xyXG4gICAgdmFyIF9PcHRpb25zO1xyXG4gICAgdmFyIF9TdGVwcztcclxuICAgIHZhciBfQXJyb3dXaWR0aCA9ICRKc3NvciQuJENzc1dpZHRoKGFycm93TGVmdCk7XHJcbiAgICB2YXIgX0Fycm93SGVpZ2h0ID0gJEpzc29yJC4kQ3NzSGVpZ2h0KGFycm93TGVmdCk7XHJcblxyXG4gICAgZnVuY3Rpb24gT25OYXZpZ2F0aW9uUmVxdWVzdChzdGVwcykge1xyXG4gICAgICAgIHNlbGYuJFRyaWdnZXJFdmVudCgkSnNzb3JOYXZpZ2F0b3JFdmVudHMkLiROQVZJR0FUSU9OUkVRVUVTVCwgc3RlcHMsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFNob3dBcnJvd3MoaGlkZSkge1xyXG4gICAgICAgICRKc3NvciQuJFNob3dFbGVtZW50KGFycm93TGVmdCwgaGlkZSB8fCAhb3B0aW9ucy4kTG9vcCAmJiBfQ3VycmVudEluZGV4ID09IDApO1xyXG4gICAgICAgICRKc3NvciQuJFNob3dFbGVtZW50KGFycm93UmlnaHQsIGhpZGUgfHwgIW9wdGlvbnMuJExvb3AgJiYgX0N1cnJlbnRJbmRleCA+PSBfTGVuZ3RoIC0gb3B0aW9ucy4kRGlzcGxheVBpZWNlcyk7XHJcblxyXG4gICAgICAgIF9IaWRlID0gaGlkZTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLiRHZXRDdXJyZW50SW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9DdXJyZW50SW5kZXg7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuJFNldEN1cnJlbnRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCwgdmlydHVhbEluZGV4LCB0ZW1wKSB7XHJcbiAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgX0N1cnJlbnRJbmRleCA9IHZpcnR1YWxJbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIF9DdXJyZW50SW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgICAgICAgIFNob3dBcnJvd3MoX0hpZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3NlbGYuJFRyaWdnZXJFdmVudCgkSnNzb3JOYXZpZ2F0b3JFdmVudHMkLiRJTkRFWENIQU5HRSwgaW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLiRTaG93ID0gU2hvd0Fycm93cztcclxuXHJcbiAgICB2YXIgX0xvY2F0ZWQ7XHJcbiAgICBzZWxmLiRSZWxvY2F0ZSA9IGZ1bmN0aW9uIChjb25haW5lcldpZHRoLCBjb250YWluZXJIZWlnaHQpIHtcclxuICAgICAgICBpZiAoIV9Mb2NhdGVkIHx8IF9PcHRpb25zLiRTY2FsZSA9PSBmYWxzZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lcldpZHRoID0gJEpzc29yJC4kUGFyZW50Tm9kZShhcnJvd0xlZnQpLmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVySGVpZ2h0ID0gJEpzc29yJC4kUGFyZW50Tm9kZShhcnJvd0xlZnQpLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChfT3B0aW9ucy4kQXV0b0NlbnRlciAmIDEpIHtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJENzc0xlZnQoYXJyb3dMZWZ0LCAoY29udGFpbmVyV2lkdGggLSBfQXJyb3dXaWR0aCkgLyAyKTtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJENzc0xlZnQoYXJyb3dSaWdodCwgKGNvbnRhaW5lcldpZHRoIC0gX0Fycm93V2lkdGgpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfT3B0aW9ucy4kQXV0b0NlbnRlciAmIDIpIHtcclxuICAgICAgICAgICAgICAgICRKc3NvciQuJENzc1RvcChhcnJvd0xlZnQsIChjb250YWluZXJIZWlnaHQgLSBfQXJyb3dIZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NUb3AoYXJyb3dSaWdodCwgKGNvbnRhaW5lckhlaWdodCAtIF9BcnJvd0hlaWdodCkgLyAyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX0xvY2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9Jbml0aWFsaXplZDtcclxuICAgIHNlbGYuJFJlc2V0ID0gZnVuY3Rpb24gKGxlbmd0aCkge1xyXG4gICAgICAgIF9MZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgX0N1cnJlbnRJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGlmICghX0luaXRpYWxpemVkKSB7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChhcnJvd0xlZnQsIFwiY2xpY2tcIiwgJEpzc29yJC4kQ3JlYXRlQ2FsbGJhY2sobnVsbCwgT25OYXZpZ2F0aW9uUmVxdWVzdCwgLV9TdGVwcykpO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChhcnJvd1JpZ2h0LCBcImNsaWNrXCIsICRKc3NvciQuJENyZWF0ZUNhbGxiYWNrKG51bGwsIE9uTmF2aWdhdGlvblJlcXVlc3QsIF9TdGVwcykpO1xyXG5cclxuICAgICAgICAgICAgJEpzc29yJC4kQnV0dG9uaXplKGFycm93TGVmdCk7XHJcbiAgICAgICAgICAgICRKc3NvciQuJEJ1dHRvbml6ZShhcnJvd1JpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIF9Jbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3NlbGYuJFRyaWdnZXJFdmVudCgkSnNzb3JOYXZpZ2F0b3JFdmVudHMkLiRSRVNFVCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vSnNzb3JBcnJvd05hdmlnYXRvciBDb25zdHJ1Y3RvclxyXG4gICAge1xyXG4gICAgICAgIHNlbGYuJE9wdGlvbnMgPSBfT3B0aW9ucyA9ICRKc3NvciQuJEV4dGVuZCh7XHJcbiAgICAgICAgICAgICRTdGVwczogMVxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBfU3RlcHMgPSBfT3B0aW9ucy4kU3RlcHM7XHJcblxyXG4gICAgICAgIGlmIChfT3B0aW9ucy4kU2NhbGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgJEpzc29yJC4kQXR0cmlidXRlKGFycm93TGVmdCwgXCJub3NjYWxlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRBdHRyaWJ1dGUoYXJyb3dSaWdodCwgXCJub3NjYWxlXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8vJEpzc29yVGh1bWJuYWlsTmF2aWdhdG9yJFxyXG52YXIgJEpzc29yVGh1bWJuYWlsTmF2aWdhdG9yJCA9IHdpbmRvdy4kSnNzb3JUaHVtYm5haWxOYXZpZ2F0b3IkID0gZnVuY3Rpb24gKGVsbXQsIG9wdGlvbnMpIHtcclxuICAgIHZhciBfU2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgX0xlbmd0aDtcclxuICAgIHZhciBfQ291bnQ7XHJcbiAgICB2YXIgX0N1cnJlbnRJbmRleDtcclxuICAgIHZhciBfT3B0aW9ucztcclxuICAgIHZhciBfTmF2aWdhdGlvbkl0ZW1zID0gW107XHJcblxyXG4gICAgdmFyIF9XaWR0aDtcclxuICAgIHZhciBfSGVpZ2h0O1xyXG4gICAgdmFyIF9MYW5lcztcclxuICAgIHZhciBfU3BhY2luZ1g7XHJcbiAgICB2YXIgX1NwYWNpbmdZO1xyXG4gICAgdmFyIF9Qcm90b3R5cGVXaWR0aDtcclxuICAgIHZhciBfUHJvdG90eXBlSGVpZ2h0O1xyXG4gICAgdmFyIF9EaXNwbGF5UGllY2VzO1xyXG5cclxuICAgIHZhciBfU2xpZGVyO1xyXG4gICAgdmFyIF9DdXJyZW50TW91c2VPdmVySW5kZXggPSAtMTtcclxuXHJcbiAgICB2YXIgX1NsaWRlc0NvbnRhaW5lcjtcclxuICAgIHZhciBfVGh1bWJuYWlsUHJvdG90eXBlO1xyXG5cclxuICAgICRKc3Nvck9iamVjdCQuY2FsbChfU2VsZik7XHJcbiAgICBlbG10ID0gJEpzc29yJC4kR2V0RWxlbWVudChlbG10KTtcclxuXHJcbiAgICBmdW5jdGlvbiBOYXZpZ2F0aW9uSXRlbShpdGVtLCBpbmRleCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgX1dyYXBwZXI7XHJcbiAgICAgICAgdmFyIF9CdXR0b247XHJcbiAgICAgICAgdmFyIF9UaHVtYm5haWw7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEhpZ2hsaWdodChtb3VzZVN0YXR1cykge1xyXG4gICAgICAgICAgICBfQnV0dG9uLiRTZWxlY3RlZChfQ3VycmVudEluZGV4ID09IGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIE9uTmF2aWdhdGlvblJlcXVlc3QoYnlNb3VzZU92ZXIsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChieU1vdXNlT3ZlciB8fCAhX1NsaWRlci4kTGFzdERyYWdTdWNjZWRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciB0YWlsID0gX0xhbmVzIC0gaW5kZXggJSBfTGFuZXM7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBzbGlkZVZpcnR1YWxJbmRleCA9IF9TbGlkZXIuJEdldFZpcnR1YWxJbmRleCgoaW5kZXggKyB0YWlsKSAvIF9MYW5lcyAtIDEpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgaXRlbVZpcnR1YWxJbmRleCA9IHNsaWRlVmlydHVhbEluZGV4ICogX0xhbmVzICsgX0xhbmVzIC0gdGFpbDtcclxuICAgICAgICAgICAgICAgIC8vX1NlbGYuJFRyaWdnZXJFdmVudCgkSnNzb3JOYXZpZ2F0b3JFdmVudHMkLiROQVZJR0FUSU9OUkVRVUVTVCwgaXRlbVZpcnR1YWxJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX1NlbGYuJFRyaWdnZXJFdmVudCgkSnNzb3JOYXZpZ2F0b3JFdmVudHMkLiROQVZJR0FUSU9OUkVRVUVTVCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyRKc3NvckRlYnVnJC4kTG9nKFwibmF2aWdhdGlvbiByZXF1ZXN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi4kV3JhcHBlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi4kSW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgICAgc2VsZi4kSGlnaGxpZ2h0ID0gSGlnaGxpZ2h0O1xyXG5cclxuICAgICAgICAvL05hdmlnYXRpb25JdGVtIENvbnN0cnVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfVGh1bWJuYWlsID0gaXRlbS4kVGh1bWIgfHwgaXRlbS4kSW1hZ2UgfHwgJEpzc29yJC4kQ3JlYXRlRGl2KCk7XHJcbiAgICAgICAgICAgIHNlbGYuJFdyYXBwZXIgPSBfV3JhcHBlciA9ICRKc3NvciQuJEJ1aWxkRWxlbWVudChfVGh1bWJuYWlsUHJvdG90eXBlLCBcInRodW1ibmFpbHRlbXBsYXRlXCIsIF9UaHVtYm5haWwsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgX0J1dHRvbiA9ICRKc3NvciQuJEJ1dHRvbml6ZShfV3JhcHBlcik7XHJcbiAgICAgICAgICAgIGlmIChfT3B0aW9ucy4kQWN0aW9uTW9kZSAmIDEpXHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChfV3JhcHBlciwgXCJjbGlja1wiLCAkSnNzb3IkLiRDcmVhdGVDYWxsYmFjayhudWxsLCBPbk5hdmlnYXRpb25SZXF1ZXN0LCAwKSk7XHJcbiAgICAgICAgICAgIGlmIChfT3B0aW9ucy4kQWN0aW9uTW9kZSAmIDIpXHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudChfV3JhcHBlciwgXCJtb3VzZW92ZXJcIiwgJEpzc29yJC4kTW91c2VPdmVyT3V0RmlsdGVyKCRKc3NvciQuJENyZWF0ZUNhbGxiYWNrKG51bGwsIE9uTmF2aWdhdGlvblJlcXVlc3QsIDEpLCBfV3JhcHBlcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfU2VsZi4kR2V0Q3VycmVudEluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfQ3VycmVudEluZGV4O1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZi4kU2V0Q3VycmVudEluZGV4ID0gZnVuY3Rpb24gKGluZGV4LCB2aXJ0dWFsSW5kZXgsIHRlbXApIHtcclxuICAgICAgICB2YXIgb2xkSW5kZXggPSBfQ3VycmVudEluZGV4O1xyXG4gICAgICAgIF9DdXJyZW50SW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAob2xkSW5kZXggIT0gLTEpXHJcbiAgICAgICAgICAgIF9OYXZpZ2F0aW9uSXRlbXNbb2xkSW5kZXhdLiRIaWdobGlnaHQoKTtcclxuICAgICAgICBfTmF2aWdhdGlvbkl0ZW1zW2luZGV4XS4kSGlnaGxpZ2h0KCk7XHJcblxyXG4gICAgICAgIGlmICghdGVtcCkge1xyXG4gICAgICAgICAgICBfU2xpZGVyLiRQbGF5VG8oX1NsaWRlci4kR2V0VmlydHVhbEluZGV4KE1hdGguZmxvb3IodmlydHVhbEluZGV4IC8gX0xhbmVzKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX1NlbGYuJFNob3cgPSBmdW5jdGlvbiAoaGlkZSkge1xyXG4gICAgICAgICRKc3NvciQuJFNob3dFbGVtZW50KGVsbXQsIGhpZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfU2VsZi4kUmVsb2NhdGUgPSAkSnNzb3IkLiRFbXB0eUZ1bmN0aW9uO1xyXG5cclxuICAgIHZhciBfSW5pdGlhbGl6ZWQ7XHJcbiAgICBfU2VsZi4kUmVzZXQgPSBmdW5jdGlvbiAobGVuZ3RoLCBpdGVtcywgbG9hZGluZ0NvbnRhaW5lcikge1xyXG4gICAgICAgIGlmICghX0luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIF9MZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIF9Db3VudCA9IE1hdGguY2VpbChfTGVuZ3RoIC8gX0xhbmVzKTtcclxuICAgICAgICAgICAgX0N1cnJlbnRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICBfRGlzcGxheVBpZWNlcyA9IE1hdGgubWluKF9EaXNwbGF5UGllY2VzLCBpdGVtcy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhvcml6b250YWwgPSBfT3B0aW9ucy4kT3JpZW50YXRpb24gJiAxO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNsaWRlV2lkdGggPSBfUHJvdG90eXBlV2lkdGggKyAoX1Byb3RvdHlwZVdpZHRoICsgX1NwYWNpbmdYKSAqIChfTGFuZXMgLSAxKSAqICgxIC0gaG9yaXpvbnRhbCk7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZUhlaWdodCA9IF9Qcm90b3R5cGVIZWlnaHQgKyAoX1Byb3RvdHlwZUhlaWdodCArIF9TcGFjaW5nWSkgKiAoX0xhbmVzIC0gMSkgKiBob3Jpem9udGFsO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNsaWRlc0NvbnRhaW5lcldpZHRoID0gc2xpZGVXaWR0aCArIChzbGlkZVdpZHRoICsgX1NwYWNpbmdYKSAqIChfRGlzcGxheVBpZWNlcyAtIDEpICogaG9yaXpvbnRhbDtcclxuICAgICAgICAgICAgdmFyIHNsaWRlc0NvbnRhaW5lckhlaWdodCA9IHNsaWRlSGVpZ2h0ICsgKHNsaWRlSGVpZ2h0ICsgX1NwYWNpbmdZKSAqIChfRGlzcGxheVBpZWNlcyAtIDEpICogKDEgLSBob3Jpem9udGFsKTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc1Bvc2l0aW9uKF9TbGlkZXNDb250YWluZXIsIFwiYWJzb2x1dGVcIik7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzc092ZXJmbG93KF9TbGlkZXNDb250YWluZXIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICBpZiAoX09wdGlvbnMuJEF1dG9DZW50ZXIgJiAxKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NMZWZ0KF9TbGlkZXNDb250YWluZXIsIChfV2lkdGggLSBzbGlkZXNDb250YWluZXJXaWR0aCkgLyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX09wdGlvbnMuJEF1dG9DZW50ZXIgJiAyKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NUb3AoX1NsaWRlc0NvbnRhaW5lciwgKF9IZWlnaHQgLSBzbGlkZXNDb250YWluZXJIZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8kSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICBpZiAoIV9PcHRpb25zLiRBdXRvQ2VudGVyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgc2xpZGVzQ29udGFpbmVyVG9wID0gJEpzc29yJC4kQ3NzVG9wKF9TbGlkZXNDb250YWluZXIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIHNsaWRlc0NvbnRhaW5lckxlZnQgPSAkSnNzb3IkLiRDc3NMZWZ0KF9TbGlkZXNDb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIGlmIChpc05hTihzbGlkZXNDb250YWluZXJUb3ApKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiUG9zaXRpb24gJ3RvcCcgd3Jvbmcgc3BlY2lmaWNhdGlvbiBvZiB0aHVtYm5haWwgbmF2aWdhdG9yIHNsaWRlcyBjb250YWluZXIgKDxkaXYgdT1cXFwidGh1bWJuYXZpZ2F0b3JcXFwiPi4uLjxkaXYgdT1cXFwic2xpZGVzXFxcIj4pLCBcXHJcXG53aGVuIG9wdGlvbiAkVGh1bWJuYWlsTmF2aWdhdG9yT3B0aW9ucy4kQXV0b0NlbnRlciBzZXQgdG8gMCwgaXQgc2hvdWxkIGJlIHNwZWNpZmllZCBpbiBwaXhlbCAobGlrZSA8ZGl2IHU9XFxcInNsaWRlc1xcXCIgc3R5bGU9XFxcInRvcDogMHB4O1xcXCI+KVwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoaXNOYU4oc2xpZGVzQ29udGFpbmVyTGVmdCkpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJQb3NpdGlvbiAnbGVmdCcgd3Jvbmcgc3BlY2lmaWNhdGlvbiBvZiB0aHVtYm5haWwgbmF2aWdhdG9yIHNsaWRlcyBjb250YWluZXIgKDxkaXYgdT1cXFwidGh1bWJuYXZpZ2F0b3JcXFwiPi4uLjxkaXYgdT1cXFwic2xpZGVzXFxcIj4pLCBcXHJcXG53aGVuIG9wdGlvbiAkVGh1bWJuYWlsTmF2aWdhdG9yT3B0aW9ucy4kQXV0b0NlbnRlciBzZXQgdG8gMCwgaXQgc2hvdWxkIGJlIHNwZWNpZmllZCBpbiBwaXhlbCAobGlrZSA8ZGl2IHU9XFxcInNsaWRlc1xcXCIgc3R5bGU9XFxcImxlZnQ6IDBweDtcXFwiPilcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgJEpzc29yJC4kQ3NzV2lkdGgoX1NsaWRlc0NvbnRhaW5lciwgc2xpZGVzQ29udGFpbmVyV2lkdGgpO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRDc3NIZWlnaHQoX1NsaWRlc0NvbnRhaW5lciwgc2xpZGVzQ29udGFpbmVySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzbGlkZUl0ZW1FbG10cyA9IFtdO1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRFYWNoKGl0ZW1zLCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYXZpZ2F0aW9uSXRlbSA9IG5ldyBOYXZpZ2F0aW9uSXRlbShpdGVtLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmF2aWdhdGlvbkl0ZW1XcmFwcGVyID0gbmF2aWdhdGlvbkl0ZW0uJFdyYXBwZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbHVtbkluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIF9MYW5lcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFuZUluZGV4ID0gaW5kZXggJSBfTGFuZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQ3NzTGVmdChuYXZpZ2F0aW9uSXRlbVdyYXBwZXIsIChfUHJvdG90eXBlV2lkdGggKyBfU3BhY2luZ1gpICogbGFuZUluZGV4ICogKDEgLSBob3Jpem9udGFsKSk7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRDc3NUb3AobmF2aWdhdGlvbkl0ZW1XcmFwcGVyLCAoX1Byb3RvdHlwZUhlaWdodCArIF9TcGFjaW5nWSkgKiBsYW5lSW5kZXggKiBob3Jpem9udGFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNsaWRlSXRlbUVsbXRzW2NvbHVtbkluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSXRlbUVsbXRzW2NvbHVtbkluZGV4XSA9ICRKc3NvciQuJENyZWF0ZURpdigpO1xyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvciQuJEFwcGVuZENoaWxkKF9TbGlkZXNDb250YWluZXIsIHNsaWRlSXRlbUVsbXRzW2NvbHVtbkluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJEpzc29yJC4kQXBwZW5kQ2hpbGQoc2xpZGVJdGVtRWxtdHNbY29sdW1uSW5kZXhdLCBuYXZpZ2F0aW9uSXRlbVdyYXBwZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9OYXZpZ2F0aW9uSXRlbXMucHVzaChuYXZpZ2F0aW9uSXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRodW1ibmFpbFNsaWRlck9wdGlvbnMgPSAkSnNzb3IkLiRFeHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgJEhXQTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAkQXV0b1BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJE5hdmlRdWl0RHJhZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAkU2xpZGVXaWR0aDogc2xpZGVXaWR0aCxcclxuICAgICAgICAgICAgICAgICRTbGlkZUhlaWdodDogc2xpZGVIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAkU2xpZGVTcGFjaW5nOiBfU3BhY2luZ1ggKiBob3Jpem9udGFsICsgX1NwYWNpbmdZICogKDEgLSBob3Jpem9udGFsKSxcclxuICAgICAgICAgICAgICAgICRNaW5EcmFnT2Zmc2V0VG9TbGlkZTogMTIsXHJcbiAgICAgICAgICAgICAgICAkU2xpZGVEdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICAgICAgJFBhdXNlT25Ib3ZlcjogMSxcclxuICAgICAgICAgICAgICAgICRQbGF5T3JpZW50YXRpb246IF9PcHRpb25zLiRPcmllbnRhdGlvbixcclxuICAgICAgICAgICAgICAgICREcmFnT3JpZW50YXRpb246IF9PcHRpb25zLiREaXNhYmxlRHJhZyA/IDAgOiBfT3B0aW9ucy4kT3JpZW50YXRpb25cclxuICAgICAgICAgICAgfSwgX09wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgX1NsaWRlciA9IG5ldyAkSnNzb3JTbGlkZXIkKGVsbXQsIHRodW1ibmFpbFNsaWRlck9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgX0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vX1NlbGYuJFRyaWdnZXJFdmVudCgkSnNzb3JOYXZpZ2F0b3JFdmVudHMkLiRSRVNFVCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vSnNzb3JUaHVtYm5haWxOYXZpZ2F0b3IgQ29uc3RydWN0b3JcclxuICAgIHtcclxuICAgICAgICBfU2VsZi4kT3B0aW9ucyA9IF9PcHRpb25zID0gJEpzc29yJC4kRXh0ZW5kKHtcclxuICAgICAgICAgICAgJFNwYWNpbmdYOiAzLFxyXG4gICAgICAgICAgICAkU3BhY2luZ1k6IDMsXHJcbiAgICAgICAgICAgICREaXNwbGF5UGllY2VzOiAxLFxyXG4gICAgICAgICAgICAkT3JpZW50YXRpb246IDEsXHJcbiAgICAgICAgICAgICRBdXRvQ2VudGVyOiAzLFxyXG4gICAgICAgICAgICAkQWN0aW9uTW9kZTogMVxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvL2dvaW5nIHRvIHVzZSAkUm93cyBpbnN0ZWFkIG9mICRMYW5lc1xyXG4gICAgICAgIGlmIChfT3B0aW9ucy4kUm93cyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIF9PcHRpb25zLiRMYW5lcyA9IF9PcHRpb25zLiRSb3dzO1xyXG5cclxuICAgICAgICAvL1NvZG8gc3RhdGVtZW50IGZvciBkZXZlbG9wbWVudCB0aW1lIGludGVsbGlzZW5jZSBvbmx5XHJcbiAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX09wdGlvbnMgPSAkSnNzb3IkLiRFeHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgJExhbmVzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAkV2lkdGg6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICRIZWlnaHQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9LCBfT3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF9XaWR0aCA9ICRKc3NvciQuJENzc1dpZHRoKGVsbXQpO1xyXG4gICAgICAgIF9IZWlnaHQgPSAkSnNzb3IkLiRDc3NIZWlnaHQoZWxtdCk7XHJcblxyXG4gICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghX1dpZHRoKVxyXG4gICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwid2lkdGggb2YgJ3RodW1ibmF2aWdhdG9yJyBjb250YWluZXIgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgIGlmICghX0hlaWdodClcclxuICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcImhlaWdodCBvZiAndGh1bWJuYXZpZ2F0b3InIGNvbnRhaW5lciBub3Qgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgX1NsaWRlc0NvbnRhaW5lciA9ICRKc3NvciQuJEZpbmRDaGlsZChlbG10LCBcInNsaWRlc1wiLCB0cnVlKTtcclxuICAgICAgICBfVGh1bWJuYWlsUHJvdG90eXBlID0gJEpzc29yJC4kRmluZENoaWxkKF9TbGlkZXNDb250YWluZXIsIFwicHJvdG90eXBlXCIpO1xyXG5cclxuICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIV9UaHVtYm5haWxQcm90b3R5cGUpXHJcbiAgICAgICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEZhaWwoXCJwcm90b3R5cGUgb2YgJ3RodW1ibmF2aWdhdG9yJyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF9Qcm90b3R5cGVXaWR0aCA9ICRKc3NvciQuJENzc1dpZHRoKF9UaHVtYm5haWxQcm90b3R5cGUpO1xyXG4gICAgICAgIF9Qcm90b3R5cGVIZWlnaHQgPSAkSnNzb3IkLiRDc3NIZWlnaHQoX1RodW1ibmFpbFByb3RvdHlwZSk7XHJcblxyXG4gICAgICAgICRKc3NvciQuJFJlbW92ZUVsZW1lbnQoX1RodW1ibmFpbFByb3RvdHlwZSwgX1NsaWRlc0NvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIF9MYW5lcyA9IF9PcHRpb25zLiRMYW5lcyB8fCAxO1xyXG4gICAgICAgIF9TcGFjaW5nWCA9IF9PcHRpb25zLiRTcGFjaW5nWDtcclxuICAgICAgICBfU3BhY2luZ1kgPSBfT3B0aW9ucy4kU3BhY2luZ1k7XHJcbiAgICAgICAgX0Rpc3BsYXlQaWVjZXMgPSBfT3B0aW9ucy4kRGlzcGxheVBpZWNlcztcclxuXHJcbiAgICAgICAgaWYgKF9PcHRpb25zLiRTY2FsZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAkSnNzb3IkLiRBdHRyaWJ1dGUoZWxtdCwgXCJub3NjYWxlXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8vJEpzc29yQ2FwdGlvblNsaWRlckJhc2UkXHJcbmZ1bmN0aW9uICRKc3NvckNhcHRpb25TbGlkZXJCYXNlJCgpIHtcclxuICAgICRKc3NvckFuaW1hdG9yJC5jYWxsKHRoaXMsIDAsIDApO1xyXG4gICAgdGhpcy4kUmV2ZXJ0ID0gJEpzc29yJC4kRW1wdHlGdW5jdGlvbjtcclxufVxyXG5cclxudmFyICRKc3NvckNhcHRpb25TbGlkZXIkID0gd2luZG93LiRKc3NvckNhcHRpb25TbGlkZXIkID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgY2FwdGlvblNsaWRlT3B0aW9ucywgcGxheUluKSB7XHJcbiAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghY2FwdGlvblNsaWRlT3B0aW9ucy4kQ2FwdGlvblRyYW5zaXRpb25zKSB7XHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRXJyb3IoXCInJENhcHRpb25TbGlkZXJPcHRpb25zJyBvcHRpb24gZXJyb3IsICckQ2FwdGlvblNsaWRlck9wdGlvbnMuJENhcHRpb25UcmFuc2l0aW9ucycgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIF9TZWxmID0gdGhpcztcclxuICAgIHZhciBfSW1tZWRpYXRlT3V0Q2FwdGlvbkhhbmdlcjtcclxuICAgIHZhciBfUGxheU1vZGUgPSBwbGF5SW4gPyBjYXB0aW9uU2xpZGVPcHRpb25zLiRQbGF5SW5Nb2RlIDogY2FwdGlvblNsaWRlT3B0aW9ucy4kUGxheU91dE1vZGU7XHJcblxyXG4gICAgdmFyIF9DYXB0aW9uVHJhbnNpdGlvbnMgPSBjYXB0aW9uU2xpZGVPcHRpb25zLiRDYXB0aW9uVHJhbnNpdGlvbnM7XHJcbiAgICB2YXIgX0NhcHRpb25UdW5pbmdGZXRjaGVyID0geyAkVHJhbnNpdGlvbjogXCJ0XCIsICREZWxheTogXCJkXCIsICREdXJhdGlvbjogXCJkdVwiLCB4OiBcInhcIiwgeTogXCJ5XCIsICRSb3RhdGU6IFwiclwiLCAkWm9vbTogXCJ6XCIsICRPcGFjaXR5OiBcImZcIiwgJEJlZ2luVGltZTogXCJiXCIgfTtcclxuICAgIHZhciBfQ2FwdGlvblR1bmluZ1RyYW5zZmVyID0ge1xyXG4gICAgICAgICREZWZhdWx0OiBmdW5jdGlvbiAodmFsdWUsIHR1bmluZ1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odHVuaW5nVmFsdWUuJFZhbHVlKSlcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdHVuaW5nVmFsdWUuJFZhbHVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSAqPSB0dW5pbmdWYWx1ZS4kUGVyY2VudDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICRPcGFjaXR5OiBmdW5jdGlvbiAodmFsdWUsIHR1bmluZ1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiREZWZhdWx0KHZhbHVlIC0gMSwgdHVuaW5nVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBfQ2FwdGlvblR1bmluZ1RyYW5zZmVyLiRab29tID0gX0NhcHRpb25UdW5pbmdUcmFuc2Zlci4kT3BhY2l0eTtcclxuXHJcbiAgICAkSnNzb3JBbmltYXRvciQuY2FsbChfU2VsZiwgMCwgMCk7XHJcblxyXG4gICAgZnVuY3Rpb24gR2V0Q2FwdGlvbkl0ZW1zKGVsZW1lbnQsIGxldmVsKSB7XHJcblxyXG4gICAgICAgIHZhciBpdGVtc1RvUGxheSA9IFtdO1xyXG4gICAgICAgIHZhciBsYXN0VHJhbnNpdGlvbk5hbWU7XHJcbiAgICAgICAgdmFyIG5hbWVkVHJhbnNpdGlvbnMgPSBbXTtcclxuICAgICAgICB2YXIgbmFtZWRUcmFuc2l0aW9uT3JkZXJzID0gW107XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEZldGNoUmF3VHJhbnNpdGlvbihjYXB0aW9uRWxtdCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIHJhd1RyYW5zaXRpb24gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJEVhY2goX0NhcHRpb25UdW5pbmdGZXRjaGVyLCBmdW5jdGlvbiAoZmV0Y2hBdHRyaWJ1dGUsIGZldGNoUHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVWYWx1ZSA9ICRKc3NvciQuJEF0dHJpYnV0ZUV4KGNhcHRpb25FbG10LCBmZXRjaEF0dHJpYnV0ZSArIChpbmRleCB8fCBcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlWYWx1ZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmV0Y2hBdHRyaWJ1dGUgPT0gXCJ0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlWYWx1ZS4kVmFsdWUgPSBhdHRyaWJ1dGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXR0cmlidXRlVmFsdWUuaW5kZXhPZihcIiVcIikgKyAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlLiRQZXJjZW50ID0gJEpzc29yJC4kUGFyc2VGbG9hdChhdHRyaWJ1dGVWYWx1ZSkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlLiRWYWx1ZSA9ICRKc3NvciQuJFBhcnNlRmxvYXQoYXR0cmlidXRlVmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByYXdUcmFuc2l0aW9uW2ZldGNoUHJvcGVydHldID0gcHJvcGVydHlWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmF3VHJhbnNpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEdldFJhbmRvbVRyYW5zaXRpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfQ2FwdGlvblRyYW5zaXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIF9DYXB0aW9uVHJhbnNpdGlvbnMubGVuZ3RoKV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBFdmFsdWF0ZUNhcHRpb25UcmFuc2l0aW9uKHRyYW5zaXRpb25OYW1lKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uTmFtZSA9PSBcIipcIikge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbiA9IEdldFJhbmRvbVRyYW5zaXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0cmFuc2l0aW9uTmFtZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vaW5kZXhlZCB0cmFuc2l0aW9uIGFsbG93ZWQsIGp1c3QgdGhlIHNhbWUgYXMgbmFtZWQgdHJhbnNpdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBUcmFuc2l0aW9uID0gX0NhcHRpb25UcmFuc2l0aW9uc1skSnNzb3IkLiRQYXJzZUludCh0cmFuc2l0aW9uTmFtZSldIHx8IF9DYXB0aW9uVHJhbnNpdGlvbnNbdHJhbnNpdGlvbk5hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkSnNzb3IkLiRJc0FycmF5KHRlbXBUcmFuc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uTmFtZSAhPSBsYXN0VHJhbnNpdGlvbk5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRyYW5zaXRpb25OYW1lID0gdHJhbnNpdGlvbk5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVkVHJhbnNpdGlvbk9yZGVyc1t0cmFuc2l0aW9uTmFtZV0gPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZWRUcmFuc2l0aW9uc1t0cmFuc2l0aW9uTmFtZV0gPSB0ZW1wVHJhbnNpdGlvbltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0ZW1wVHJhbnNpdGlvbi5sZW5ndGgpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVkVHJhbnNpdGlvbk9yZGVyc1t0cmFuc2l0aW9uTmFtZV0rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBUcmFuc2l0aW9uID0gbmFtZWRUcmFuc2l0aW9uc1t0cmFuc2l0aW9uTmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkSnNzb3IkLiRJc0FycmF5KHRlbXBUcmFuc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wVHJhbnNpdGlvbiA9IHRlbXBUcmFuc2l0aW9uLmxlbmd0aCAmJiB0ZW1wVHJhbnNpdGlvbltuYW1lZFRyYW5zaXRpb25PcmRlcnNbdHJhbnNpdGlvbk5hbWVdICUgdGVtcFRyYW5zaXRpb24ubGVuZ3RoXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkSnNzb3IkLiRJc0FycmF5KHRlbXBUcmFuc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9nb3QgdHJhbnNpdGlvbiBmcm9tIGFycmF5IGxldmVsIDMsIHJhbmRvbSBmb3IgYWxsIGNhcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wVHJhbnNpdGlvbiA9IHRlbXBUcmFuc2l0aW9uW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRlbXBUcmFuc2l0aW9uLmxlbmd0aCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vZ290IHRyYW5zaXRpb24gZnJvbSBhcnJheSBsZXZlbCAyLCBpbiBzZXF1ZW5jZSBmb3IgYWxsIGFkamFjZW50IGNhcHRpb25zIHdpdGggc2FtZSBuYW1lIHNwZWNpZmllZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0cmFuc2l0aW9uID0gdGVtcFRyYW5zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vZ290IHRyYW5zaXRpb24gZnJvbSBhcnJheSBsZXZlbCAxLCByYW5kb20gYnV0IHNhbWUgZm9yIGFsbCBhZGphY2VudCBjYXB0aW9ucyB3aXRoIHNhbWUgbmFtZSBzcGVjaWZpZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0cmFuc2l0aW9uID0gdGVtcFRyYW5zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy9nb3QgdHJhbnNpdGlvbiBkaXJlY3RseSBmcm9tIGEgc2ltcGxlIHRyYW5zaXRpb24gb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0cmFuc2l0aW9uID0gdGVtcFRyYW5zaXRpb247XHJcbiAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uID0gdGVtcFRyYW5zaXRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRKc3NvciQuJElzU3RyaW5nKHRyYW5zaXRpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24gPSBFdmFsdWF0ZUNhcHRpb25UcmFuc2l0aW9uKHRyYW5zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjYXB0aW9uRWxtdHMgPSAkSnNzb3IkLiRDaGlsZHJlbihlbGVtZW50KTtcclxuICAgICAgICAkSnNzb3IkLiRFYWNoKGNhcHRpb25FbG10cywgZnVuY3Rpb24gKGNhcHRpb25FbG10LCBpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbnNXaXRoVHVuaW5nID0gW107XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25zV2l0aFR1bmluZy4kRWxtdCA9IGNhcHRpb25FbG10O1xyXG4gICAgICAgICAgICB2YXIgaXNDYXB0aW9uID0gJEpzc29yJC4kQXR0cmlidXRlRXgoY2FwdGlvbkVsbXQsIFwidVwiKSA9PSBcImNhcHRpb25cIjtcclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJEVhY2gocGxheUluID8gWzAsIDNdIDogWzJdLCBmdW5jdGlvbiAoaiwgaykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0NhcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF3VHJhbnNpdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogIT0gMiB8fCAhJEpzc29yJC4kQXR0cmlidXRlRXgoY2FwdGlvbkVsbXQsIFwidDNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3VHJhbnNpdGlvbiA9IEZldGNoUmF3VHJhbnNpdGlvbihjYXB0aW9uRWxtdCwgaik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PSAyICYmICFyYXdUcmFuc2l0aW9uLiRUcmFuc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdUcmFuc2l0aW9uLiREZWxheSA9IHJhd1RyYW5zaXRpb24uJERlbGF5IHx8IHsgJFZhbHVlOiAwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdUcmFuc2l0aW9uID0gJEpzc29yJC4kRXh0ZW5kKEZldGNoUmF3VHJhbnNpdGlvbihjYXB0aW9uRWxtdCwgMCksIHJhd1RyYW5zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmF3VHJhbnNpdGlvbiAmJiByYXdUcmFuc2l0aW9uLiRUcmFuc2l0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uID0gRXZhbHVhdGVDYXB0aW9uVHJhbnNpdGlvbihyYXdUcmFuc2l0aW9uLiRUcmFuc2l0aW9uLiRWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHRyYW5zaXRpb25XaXRoVHVuaW5nID0gJEpzc29yJC4kRXh0ZW5kKHsgJERlbGF5OiAwLCAkU2NhbGVIb3Jpem9udGFsOiAxLCAkU2NhbGVWZXJ0aWNhbDogMSB9LCB0cmFuc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uV2l0aFR1bmluZyA9ICRKc3NvciQuJEV4dGVuZCh7ICREZWxheTogMCB9LCB0cmFuc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRFYWNoKHJhd1RyYW5zaXRpb24sIGZ1bmN0aW9uIChyYXdQcm9wZXJ0eVZhbHVlLCBwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHVuaW5nUHJvcGVydHlWYWx1ZSA9IChfQ2FwdGlvblR1bmluZ1RyYW5zZmVyW3Byb3BlcnR5TmFtZV0gfHwgX0NhcHRpb25UdW5pbmdUcmFuc2Zlci4kRGVmYXVsdCkuYXBwbHkoX0NhcHRpb25UdW5pbmdUcmFuc2ZlciwgW3RyYW5zaXRpb25XaXRoVHVuaW5nW3Byb3BlcnR5TmFtZV0sIHJhd1RyYW5zaXRpb25bcHJvcGVydHlOYW1lXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4odHVuaW5nUHJvcGVydHlWYWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25XaXRoVHVuaW5nW3Byb3BlcnR5TmFtZV0gPSB0dW5pbmdQcm9wZXJ0eVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhd1RyYW5zaXRpb24uJEJlZ2luVGltZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbldpdGhUdW5pbmcuJEJlZ2luVGltZSA9IHJhd1RyYW5zaXRpb24uJEJlZ2luVGltZS4kVmFsdWUgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoX1BsYXlNb2RlKSAmIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25XaXRoVHVuaW5nLiRCZWdpblRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uc1dpdGhUdW5pbmcucHVzaCh0cmFuc2l0aW9uV2l0aFR1bmluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChsZXZlbCAlIDIpICYmICFrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbnNXaXRoVHVuaW5nLiRDaGlsZHJlbiA9IEdldENhcHRpb25JdGVtcyhjYXB0aW9uRWxtdCwgbGV2ZWwgKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdGVtc1RvUGxheS5wdXNoKHRyYW5zaXRpb25zV2l0aFR1bmluZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtc1RvUGxheTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBDcmVhdGVBbmltYXRvcihpdGVtLCB0cmFuc2l0aW9uLCBpbW1lZGlhdGVPdXQpIHtcclxuXHJcbiAgICAgICAgdmFyIGFuaW1hdG9yT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgJEVhc2luZzogdHJhbnNpdGlvbi4kRWFzaW5nLFxyXG4gICAgICAgICAgICAkUm91bmQ6IHRyYW5zaXRpb24uJFJvdW5kLFxyXG4gICAgICAgICAgICAkRHVyaW5nOiB0cmFuc2l0aW9uLiREdXJpbmcsXHJcbiAgICAgICAgICAgICRSZXZlcnNlOiBwbGF5SW4gJiYgIWltbWVkaWF0ZU91dFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yT3B0aW9ucy4kQ2FwdGlvbkFuaW1hdG9yID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGNhcHRpb25JdGVtID0gaXRlbTtcclxuICAgICAgICB2YXIgY2FwdGlvblBhcmVudCA9ICRKc3NvciQuJFBhcmVudE5vZGUoaXRlbSk7XHJcblxyXG4gICAgICAgIHZhciBjYXB0aW9uSXRlbVdpZHRoID0gJEpzc29yJC4kQ3NzV2lkdGgoY2FwdGlvbkl0ZW0pO1xyXG4gICAgICAgIHZhciBjYXB0aW9uSXRlbUhlaWdodCA9ICRKc3NvciQuJENzc0hlaWdodChjYXB0aW9uSXRlbSk7XHJcbiAgICAgICAgdmFyIGNhcHRpb25QYXJlbnRXaWR0aCA9ICRKc3NvciQuJENzc1dpZHRoKGNhcHRpb25QYXJlbnQpO1xyXG4gICAgICAgIHZhciBjYXB0aW9uUGFyZW50SGVpZ2h0ID0gJEpzc29yJC4kQ3NzSGVpZ2h0KGNhcHRpb25QYXJlbnQpO1xyXG5cclxuICAgICAgICB2YXIgZnJvbVN0eWxlcyA9IHt9O1xyXG4gICAgICAgIHZhciBkaWZTdHlsZXMgPSB7fTtcclxuICAgICAgICB2YXIgc2NhbGVDbGlwID0gdHJhbnNpdGlvbi4kU2NhbGVDbGlwIHx8IDE7XHJcblxyXG4gICAgICAgIC8vT3BhY2l0eVxyXG4gICAgICAgIGlmICh0cmFuc2l0aW9uLiRPcGFjaXR5KSB7XHJcbiAgICAgICAgICAgIGRpZlN0eWxlcy4kT3BhY2l0eSA9IDEgLSB0cmFuc2l0aW9uLiRPcGFjaXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0b3JPcHRpb25zLiRPcmlnaW5hbFdpZHRoID0gY2FwdGlvbkl0ZW1XaWR0aDtcclxuICAgICAgICBhbmltYXRvck9wdGlvbnMuJE9yaWdpbmFsSGVpZ2h0ID0gY2FwdGlvbkl0ZW1IZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vVHJhbnNmb3JtXHJcbiAgICAgICAgaWYgKHRyYW5zaXRpb24uJFpvb20gfHwgdHJhbnNpdGlvbi4kUm90YXRlKSB7XHJcbiAgICAgICAgICAgIGRpZlN0eWxlcy4kWm9vbSA9ICh0cmFuc2l0aW9uLiRab29tIHx8IDIpIC0gMjtcclxuXHJcbiAgICAgICAgICAgIGlmICgkSnNzb3IkLiRJc0Jyb3dzZXJJZTlFYXJsaWVyKCkgfHwgJEpzc29yJC4kSXNCcm93c2VyT3BlcmEoKSkge1xyXG4gICAgICAgICAgICAgICAgZGlmU3R5bGVzLiRab29tID0gTWF0aC5taW4oZGlmU3R5bGVzLiRab29tLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnJvbVN0eWxlcy4kWm9vbSA9IDE7XHJcblxyXG4gICAgICAgICAgICB2YXIgcm90YXRlID0gdHJhbnNpdGlvbi4kUm90YXRlIHx8IDA7XHJcblxyXG4gICAgICAgICAgICBkaWZTdHlsZXMuJFJvdGF0ZSA9IHJvdGF0ZSAqIDM2MDtcclxuICAgICAgICAgICAgZnJvbVN0eWxlcy4kUm90YXRlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vQ2xpcFxyXG4gICAgICAgIGVsc2UgaWYgKHRyYW5zaXRpb24uJENsaXApIHtcclxuICAgICAgICAgICAgdmFyIGZyb21TdHlsZUNsaXAgPSB7ICRUb3A6IDAsICRSaWdodDogY2FwdGlvbkl0ZW1XaWR0aCwgJEJvdHRvbTogY2FwdGlvbkl0ZW1IZWlnaHQsICRMZWZ0OiAwIH07XHJcbiAgICAgICAgICAgIHZhciB0b1N0eWxlQ2xpcCA9ICRKc3NvciQuJEV4dGVuZCh7fSwgZnJvbVN0eWxlQ2xpcCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmxvY2tPZmZzZXQgPSB0b1N0eWxlQ2xpcC4kT2Zmc2V0ID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9wQmVuY2htYXJrID0gdHJhbnNpdGlvbi4kQ2xpcCAmIDQ7XHJcbiAgICAgICAgICAgIHZhciBib3R0b21CZW5jaG1hcmsgPSB0cmFuc2l0aW9uLiRDbGlwICYgODtcclxuICAgICAgICAgICAgdmFyIGxlZnRCZW5jaG1hcmsgPSB0cmFuc2l0aW9uLiRDbGlwICYgMTtcclxuICAgICAgICAgICAgdmFyIHJpZ2h0QmVuY2htYXJrID0gdHJhbnNpdGlvbi4kQ2xpcCAmIDI7XHJcblxyXG4gICAgICAgICAgICBpZiAodG9wQmVuY2htYXJrICYmIGJvdHRvbUJlbmNobWFyaykge1xyXG4gICAgICAgICAgICAgICAgYmxvY2tPZmZzZXQuJFRvcCA9IGNhcHRpb25JdGVtSGVpZ2h0IC8gMiAqIHNjYWxlQ2xpcDtcclxuICAgICAgICAgICAgICAgIGJsb2NrT2Zmc2V0LiRCb3R0b20gPSAtYmxvY2tPZmZzZXQuJFRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0b3BCZW5jaG1hcmspXHJcbiAgICAgICAgICAgICAgICBibG9ja09mZnNldC4kQm90dG9tID0gLWNhcHRpb25JdGVtSGVpZ2h0ICogc2NhbGVDbGlwO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChib3R0b21CZW5jaG1hcmspXHJcbiAgICAgICAgICAgICAgICBibG9ja09mZnNldC4kVG9wID0gY2FwdGlvbkl0ZW1IZWlnaHQgKiBzY2FsZUNsaXA7XHJcblxyXG4gICAgICAgICAgICBpZiAobGVmdEJlbmNobWFyayAmJiByaWdodEJlbmNobWFyaykge1xyXG4gICAgICAgICAgICAgICAgYmxvY2tPZmZzZXQuJExlZnQgPSBjYXB0aW9uSXRlbVdpZHRoIC8gMiAqIHNjYWxlQ2xpcDtcclxuICAgICAgICAgICAgICAgIGJsb2NrT2Zmc2V0LiRSaWdodCA9IC1ibG9ja09mZnNldC4kTGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChsZWZ0QmVuY2htYXJrKVxyXG4gICAgICAgICAgICAgICAgYmxvY2tPZmZzZXQuJFJpZ2h0ID0gLWNhcHRpb25JdGVtV2lkdGggKiBzY2FsZUNsaXA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJpZ2h0QmVuY2htYXJrKVxyXG4gICAgICAgICAgICAgICAgYmxvY2tPZmZzZXQuJExlZnQgPSBjYXB0aW9uSXRlbVdpZHRoICogc2NhbGVDbGlwO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0b3JPcHRpb25zLiRNb3ZlID0gdHJhbnNpdGlvbi4kTW92ZTtcclxuICAgICAgICAgICAgZGlmU3R5bGVzLiRDbGlwID0gdG9TdHlsZUNsaXA7XHJcbiAgICAgICAgICAgIGZyb21TdHlsZXMuJENsaXAgPSBmcm9tU3R5bGVDbGlwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9GbHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0b0xlZnQgPSAwO1xyXG4gICAgICAgICAgICB2YXIgdG9Ub3AgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24ueClcclxuICAgICAgICAgICAgICAgIHRvTGVmdCAtPSBjYXB0aW9uUGFyZW50V2lkdGggKiB0cmFuc2l0aW9uLng7XHJcblxyXG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbi55KVxyXG4gICAgICAgICAgICAgICAgdG9Ub3AgLT0gY2FwdGlvblBhcmVudEhlaWdodCAqIHRyYW5zaXRpb24ueTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b0xlZnQgfHwgdG9Ub3AgfHwgYW5pbWF0b3JPcHRpb25zLiRNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBkaWZTdHlsZXMuJExlZnQgPSB0b0xlZnQ7XHJcbiAgICAgICAgICAgICAgICBkaWZTdHlsZXMuJFRvcCA9IHRvVG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2R1cmF0aW9uXHJcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gdHJhbnNpdGlvbi4kRHVyYXRpb247XHJcblxyXG4gICAgICAgIGZyb21TdHlsZXMgPSAkSnNzb3IkLiRFeHRlbmQoZnJvbVN0eWxlcywgJEpzc29yJC4kR2V0U3R5bGVzKGNhcHRpb25JdGVtLCBkaWZTdHlsZXMpKTtcclxuXHJcbiAgICAgICAgYW5pbWF0b3JPcHRpb25zLiRTZXR0ZXIgPSAkSnNzb3IkLiRTdHlsZVNldHRlckV4KCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgJEpzc29yQW5pbWF0b3IkKHRyYW5zaXRpb24uJERlbGF5LCBkdXJhdGlvbiwgYW5pbWF0b3JPcHRpb25zLCBjYXB0aW9uSXRlbSwgZnJvbVN0eWxlcywgZGlmU3R5bGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBDcmVhdGVBbmltYXRvcnMoc3RyZWFtTGluZUxlbmd0aCwgY2FwdGlvbkl0ZW1zKSB7XHJcblxyXG4gICAgICAgICRKc3NvciQuJEVhY2goY2FwdGlvbkl0ZW1zLCBmdW5jdGlvbiAoY2FwdGlvbkl0ZW0sIGkpIHtcclxuXHJcbiAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FwdGlvbkl0ZW0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCA9ICRKc3NvciQuJENzc1RvcChjYXB0aW9uSXRlbS4kRWxtdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnQgPSAkSnNzb3IkLiRDc3NMZWZ0KGNhcHRpb25JdGVtLiRFbG10KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSAkSnNzb3IkLiRDc3NXaWR0aChjYXB0aW9uSXRlbS4kRWxtdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9ICRKc3NvciQuJENzc0hlaWdodChjYXB0aW9uSXRlbS4kRWxtdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc05hTih0b3ApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IFwiU3R5bGUgJ3RvcCcgZm9yIGNhcHRpb24gbm90IHNwZWNpZmllZC4gUGxlYXNlIGFsd2F5cyBzcGVjaWZ5IGNhcHRpb24gbGlrZSAncG9zaXRpb246IGFic29sdXRlOyB0b3A6IC4uLnB4OyBsZWZ0OiAuLi5weDsgd2lkdGg6IC4uLnB4OyBoZWlnaHQ6IC4uLnB4OycuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNOYU4obGVmdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJTdHlsZSAnbGVmdCcgbm90IHNwZWNpZmllZC4gUGxlYXNlIGFsd2F5cyBzcGVjaWZ5IGNhcHRpb24gbGlrZSAncG9zaXRpb246IGFic29sdXRlOyB0b3A6IC4uLnB4OyBsZWZ0OiAuLi5weDsgd2lkdGg6IC4uLnB4OyBoZWlnaHQ6IC4uLnB4OycuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNOYU4od2lkdGgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IFwiU3R5bGUgJ3dpZHRoJyBub3Qgc3BlY2lmaWVkLiBQbGVhc2UgYWx3YXlzIHNwZWNpZnkgY2FwdGlvbiBsaWtlICdwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogLi4ucHg7IGxlZnQ6IC4uLnB4OyB3aWR0aDogLi4ucHg7IGhlaWdodDogLi4ucHg7Jy5cIjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc05hTihoZWlnaHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IFwiU3R5bGUgJ2hlaWdodCcgbm90IHNwZWNpZmllZC4gUGxlYXNlIGFsd2F5cyBzcGVjaWZ5IGNhcHRpb24gbGlrZSAncG9zaXRpb246IGFic29sdXRlOyB0b3A6IC4uLnB4OyBsZWZ0OiAuLi5weDsgd2lkdGg6IC4uLnB4OyBoZWlnaHQ6IC4uLnB4OycuXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRFcnJvcihcIkNhcHRpb24gXCIgKyAoaSArIDEpICsgXCIgZGVmaW5pdGlvbiBlcnJvciwgXFxyXFxuXCIgKyBlcnJvciArIFwiXFxyXFxuXCIgKyBjYXB0aW9uSXRlbS4kRWxtdC5vdXRlckhUTUwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhbmltYXRvcjtcclxuICAgICAgICAgICAgdmFyIGNhcHRpb25FbG10ID0gY2FwdGlvbkl0ZW0uJEVsbXQ7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uID0gY2FwdGlvbkl0ZW1bMF07XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uMyA9IGNhcHRpb25JdGVtWzFdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhbmltYXRvciA9IENyZWF0ZUFuaW1hdG9yKGNhcHRpb25FbG10LCB0cmFuc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHN0cmVhbUxpbmVMZW5ndGggPSBhbmltYXRvci4kTG9jYXRlKHRyYW5zaXRpb24uJEJlZ2luVGltZSA9PSB1bmRlZmluZWQgPyBzdHJlYW1MaW5lTGVuZ3RoIDogdHJhbnNpdGlvbi4kQmVnaW5UaW1lLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RyZWFtTGluZUxlbmd0aCA9IENyZWF0ZUFuaW1hdG9ycyhzdHJlYW1MaW5lTGVuZ3RoLCBjYXB0aW9uSXRlbS4kQ2hpbGRyZW4pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0b3IzID0gQ3JlYXRlQW5pbWF0b3IoY2FwdGlvbkVsbXQsIHRyYW5zaXRpb24zLCAxKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdG9yMy4kTG9jYXRlKHN0cmVhbUxpbmVMZW5ndGgsIDEpO1xyXG4gICAgICAgICAgICAgICAgX1NlbGYuJENvbWJpbmUoYW5pbWF0b3IzKTtcclxuICAgICAgICAgICAgICAgIF9JbW1lZGlhdGVPdXRDYXB0aW9uSGFuZ2VyLiRDb21iaW5lKGFuaW1hdG9yMyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbmltYXRvcilcclxuICAgICAgICAgICAgICAgIF9TZWxmLiRDb21iaW5lKGFuaW1hdG9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0cmVhbUxpbmVMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgX1NlbGYuJFJldmVydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfU2VsZi4kR29Ub1Bvc2l0aW9uKF9TZWxmLiRHZXRQb3NpdGlvbl9PdXRlckVuZCgpICogKHBsYXlJbiB8fCAwKSk7XHJcbiAgICAgICAgX0ltbWVkaWF0ZU91dENhcHRpb25IYW5nZXIuJEdvVG9Qb3NpdGlvbigwKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9Db25zdHJ1Y3RvclxyXG4gICAge1xyXG4gICAgICAgIF9JbW1lZGlhdGVPdXRDYXB0aW9uSGFuZ2VyID0gbmV3ICRKc3NvckFuaW1hdG9yJCgwLCAwKTtcclxuXHJcbiAgICAgICAgQ3JlYXRlQW5pbWF0b3JzKDAsIF9QbGF5TW9kZSA/IEdldENhcHRpb25JdGVtcyhjb250YWluZXIsIDEpIDogW10pO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyICRKc3NvckNhcHRpb25TbGlkZW8kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgY2FwdGlvblNsaWRlb09wdGlvbnMsIHBsYXlJbikge1xyXG4gICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIWNhcHRpb25TbGlkZW9PcHRpb25zLiRDYXB0aW9uVHJhbnNpdGlvbnMpIHtcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFcnJvcihcIickQ2FwdGlvblNsaWRlb09wdGlvbnMnIG9wdGlvbiBlcnJvciwgJyRDYXB0aW9uU2xpZGVvT3B0aW9ucy4kQ2FwdGlvblRyYW5zaXRpb25zJyBub3Qgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoISRKc3NvciQuJElzQXJyYXkoY2FwdGlvblNsaWRlb09wdGlvbnMuJENhcHRpb25UcmFuc2l0aW9ucykpIHtcclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFcnJvcihcIickQ2FwdGlvblNsaWRlb09wdGlvbnMnIG9wdGlvbiBlcnJvciwgJyRDYXB0aW9uU2xpZGVvT3B0aW9ucy4kQ2FwdGlvblRyYW5zaXRpb25zJyBpcyBub3QgYW4gYXJyYXkuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBfVGhpcyA9IHRoaXM7XHJcblxyXG4gICAgdmFyIF9FYXNpbmdzO1xyXG4gICAgdmFyIF9UcmFuc2l0aW9uQ29udmVydGVyID0ge307XHJcbiAgICB2YXIgX0NhcHRpb25UcmFuc2l0aW9ucyA9IGNhcHRpb25TbGlkZW9PcHRpb25zLiRDYXB0aW9uVHJhbnNpdGlvbnM7XHJcblxyXG4gICAgJEpzc29yQW5pbWF0b3IkLmNhbGwoX1RoaXMsIDAsIDApO1xyXG5cclxuICAgIGZ1bmN0aW9uIENvbnZlcnRUcmFuc2l0aW9uKHRyYW5zaXRpb24sIGlzRWFzaW5nKSB7XHJcbiAgICAgICAgJEpzc29yJC4kRWFjaCh0cmFuc2l0aW9uLCBmdW5jdGlvbiAocHJvcGVydHksIG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHBlcmZvcm1OYW1lID0gX1RyYW5zaXRpb25Db252ZXJ0ZXJbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChwZXJmb3JtTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRWFzaW5nIHx8IG5hbWUgPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJEpzc29yJC4kSXNOdW1lcmljKHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSA9IF9FYXNpbmdzW3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoJEpzc29yJC4kSXNQbGFpbk9iamVjdChwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29udmVydFRyYW5zaXRpb24ocHJvcGVydHksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uW3BlcmZvcm1OYW1lXSA9IHByb3BlcnR5O1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRyYW5zaXRpb25bbmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBHZXRDYXB0aW9uSXRlbXMoZWxlbWVudCwgbGV2ZWwpIHtcclxuXHJcbiAgICAgICAgdmFyIGl0ZW1zVG9QbGF5ID0gW107XHJcblxyXG4gICAgICAgIHZhciBjYXB0aW9uRWxtdHMgPSAkSnNzb3IkLiRDaGlsZHJlbihlbGVtZW50KTtcclxuICAgICAgICAkSnNzb3IkLiRFYWNoKGNhcHRpb25FbG10cywgZnVuY3Rpb24gKGNhcHRpb25FbG10LCBpKSB7XHJcbiAgICAgICAgICAgIHZhciBpc0NhcHRpb24gPSAkSnNzb3IkLiRBdHRyaWJ1dGVFeChjYXB0aW9uRWxtdCwgXCJ1XCIpID09IFwiY2FwdGlvblwiO1xyXG4gICAgICAgICAgICBpZiAoaXNDYXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbk5hbWUgPSAkSnNzb3IkLiRBdHRyaWJ1dGVFeChjYXB0aW9uRWxtdCwgXCJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBfQ2FwdGlvblRyYW5zaXRpb25zWyRKc3NvciQuJFBhcnNlSW50KHRyYW5zaXRpb25OYW1lKV0gfHwgX0NhcHRpb25UcmFuc2l0aW9uc1t0cmFuc2l0aW9uTmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25OYW1lMiA9ICRKc3NvciQuJEF0dHJpYnV0ZUV4KGNhcHRpb25FbG10LCBcInQyXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24yID0gX0NhcHRpb25UcmFuc2l0aW9uc1skSnNzb3IkLiRQYXJzZUludCh0cmFuc2l0aW9uTmFtZTIpXSB8fCBfQ2FwdGlvblRyYW5zaXRpb25zW3RyYW5zaXRpb25OYW1lMl07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1Ub1BsYXkgPSB7ICRFbG10OiBjYXB0aW9uRWxtdCwgJFRyYW5zaXRpb246IHRyYW5zaXRpb24sICRUcmFuc2l0aW9uMjogdHJhbnNpdGlvbjIgfTtcclxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA8IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUGxheS5jb25jYXQoR2V0Q2FwdGlvbkl0ZW1zKGNhcHRpb25FbG10LCBsZXZlbCArIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9QbGF5LnB1c2goaXRlbVRvUGxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW1zVG9QbGF5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIENyZWF0ZUFuaW1hdG9yKGNhcHRpb25FbG10LCB0cmFuc2l0aW9ucywgbGFzdFN0eWxlcywgZm9ySW4pIHtcclxuXHJcbiAgICAgICAgJEpzc29yJC4kRWFjaCh0cmFuc2l0aW9ucywgZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcclxuICAgICAgICAgICAgQ29udmVydFRyYW5zaXRpb24odHJhbnNpdGlvbik7XHJcblxyXG4gICAgICAgICAgICB2YXIgYW5pbWF0b3JPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgJEVhc2luZzogdHJhbnNpdGlvbi4kRWFzaW5nLFxyXG4gICAgICAgICAgICAgICAgJFJvdW5kOiB0cmFuc2l0aW9uLiRSb3VuZCxcclxuICAgICAgICAgICAgICAgICREdXJpbmc6IHRyYW5zaXRpb24uJER1cmluZyxcclxuICAgICAgICAgICAgICAgICRTZXR0ZXI6ICRKc3NvciQuJFN0eWxlU2V0dGVyRXgoKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyb21TdHlsZXMgPSAkSnNzb3IkLiRFeHRlbmQoJEpzc29yJC4kR2V0U3R5bGVzKGNhcHRpb25JdGVtLCB0cmFuc2l0aW9uKSwgbGFzdFN0eWxlcyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYW5pbWF0b3IgPSBuZXcgJEpzc29yQW5pbWF0b3IkKHRyYW5zaXRpb24uYiB8fCAwLCB0cmFuc2l0aW9uLmQsIGFuaW1hdG9yT3B0aW9ucywgY2FwdGlvbkVsbXQsIGZyb21TdHlsZXMsIHRyYW5zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgIWZvckluID09ICFwbGF5SW4gJiYgX1RoaXMuJENvbWJpbmUoYW5pbWF0b3IpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhc3RPcHRpb25zO1xyXG4gICAgICAgICAgICBsYXN0U3R5bGVzID0gJEpzc29yJC4kRXh0ZW5kKGxhc3RTdHlsZXMsICRKc3NvciQuJENhc3QoZnJvbVN0eWxlcywgdHJhbnNpdGlvbiwgMSwgYW5pbWF0b3JPcHRpb25zLiRFYXNpbmcsIGFuaW1hdG9yT3B0aW9ucy4kRHVyaW5nLCBhbmltYXRvck9wdGlvbnMuJFJvdW5kLCBhbmltYXRvck9wdGlvbnMsIGNhc3RPcHRpb25zKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsYXN0U3R5bGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIENyZWF0ZUFuaW1hdG9ycyhjYXB0aW9uSXRlbXMpIHtcclxuXHJcbiAgICAgICAgJEpzc29yJC4kRWFjaChjYXB0aW9uSXRlbXMsIGZ1bmN0aW9uIChjYXB0aW9uSXRlbSwgaSkge1xyXG5cclxuICAgICAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYXB0aW9uSXRlbS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wID0gJEpzc29yJC4kQ3NzVG9wKGNhcHRpb25JdGVtLiRFbG10KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdCA9ICRKc3NvciQuJENzc0xlZnQoY2FwdGlvbkl0ZW0uJEVsbXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9ICRKc3NvciQuJENzc1dpZHRoKGNhcHRpb25JdGVtLiRFbG10KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gJEpzc29yJC4kQ3NzSGVpZ2h0KGNhcHRpb25JdGVtLiRFbG10KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHRvcCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJzdHlsZSAndG9wJyBub3Qgc3BlY2lmaWVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNOYU4obGVmdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJzdHlsZSAnbGVmdCcgbm90IHNwZWNpZmllZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzTmFOKHdpZHRoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBcInN0eWxlICd3aWR0aCcgbm90IHNwZWNpZmllZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzTmFOKGhlaWdodCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gXCJzdHlsZSAnaGVpZ2h0JyBub3Qgc3BlY2lmaWVkXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FwdGlvbiBcIiArIChpICsgMSkgKyBcIiBkZWZpbml0aW9uIGVycm9yLCBcIiArIGVycm9yICsgXCIuXFxyXFxuXCIgKyBjYXB0aW9uSXRlbS4kRWxtdC5vdXRlckhUTUwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXB0aW9uRWxtdCA9IGNhcHRpb25JdGVtLiRFbG10O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcHRpb25JdGVtV2lkdGggPSAkSnNzb3IkLiRDc3NXaWR0aChjYXB0aW9uSXRlbSk7XHJcbiAgICAgICAgICAgIHZhciBjYXB0aW9uSXRlbUhlaWdodCA9ICRKc3NvciQuJENzc0hlaWdodChjYXB0aW9uSXRlbSk7XHJcbiAgICAgICAgICAgIHZhciBjYXB0aW9uUGFyZW50V2lkdGggPSAkSnNzb3IkLiRDc3NXaWR0aChjYXB0aW9uUGFyZW50KTtcclxuICAgICAgICAgICAgdmFyIGNhcHRpb25QYXJlbnRIZWlnaHQgPSAkSnNzb3IkLiRDc3NIZWlnaHQoY2FwdGlvblBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbGFzdFN0eWxlcyA9IHsgJFpvb206IDEsICRSb3RhdGU6IDAsICRDbGlwOiB7ICRUb3A6IDAsICRSaWdodDogY2FwdGlvbkl0ZW1XaWR0aCwgJEJvdHRvbTogY2FwdGlvbkl0ZW1IZWlnaHQsICRMZWZ0OiAwIH0gfTtcclxuXHJcbiAgICAgICAgICAgIGxhc3RTdHlsZXMgPSBDcmVhdGVBbmltYXRvcihjYXB0aW9uRWxtdCwgY2FwdGlvbkl0ZW0uJFRyYW5zaXRpb24sIGxhc3RTdHlsZXMsIHRydWUpO1xyXG4gICAgICAgICAgICBDcmVhdGVBbmltYXRvcihjYXB0aW9uRWxtdCwgY2FwdGlvbkl0ZW0uJFRyYW5zaXRpb24yLCBsYXN0U3R5bGVzLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJFJldmVydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfVGhpcy4kR29Ub1Bvc2l0aW9uKC0xLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0NvbnN0cnVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgX0Vhc2luZ3MgPSBbXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VTd2luZyxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZUxpbmVhcixcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZUluUXVhZCxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZU91dFF1YWQsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VJbk91dFF1YWQsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VJbkN1YmljLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlT3V0Q3ViaWMsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VJbk91dEN1YmljLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlSW5RdWFydCxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZU91dFF1YXJ0LFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlSW5PdXRRdWFydCxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZUluUXVpbnQsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VPdXRRdWludCxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZUluT3V0UXVpbnQsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VJblNpbmUsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VPdXRTaW5lLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlSW5PdXRTaW5lLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlSW5FeHBvLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlT3V0RXhwbyxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZUluT3V0RXhwbyxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZUluQ2lyYyxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZU91dENpcmMsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VJbk91dENpcmMsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VJbkVsYXN0aWMsXHJcbiAgICAgICAgICAgICRKc3NvckVhc2luZyQuJEVhc2VPdXRFbGFzdGljLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlSW5PdXRFbGFzdGljLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlSW5CYWNrLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlT3V0QmFjayxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZUluT3V0QmFjayxcclxuICAgICAgICAgICAgJEpzc29yRWFzaW5nJC4kRWFzZUluQm91bmNlLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlT3V0Qm91bmNlLFxyXG4gICAgICAgICAgICAkSnNzb3JFYXNpbmckLiRFYXNlSW5PdXRCb3VuY2UvLyxcclxuICAgICAgICAgICAgLy8kSnNzb3JFYXNpbmckLiRFYXNlR29CYWNrLFxyXG4gICAgICAgICAgICAvLyRKc3NvckVhc2luZyQuJEVhc2VJbldhdmUsXHJcbiAgICAgICAgICAgIC8vJEpzc29yRWFzaW5nJC4kRWFzZU91dFdhdmUsXHJcbiAgICAgICAgICAgIC8vJEpzc29yRWFzaW5nJC4kRWFzZU91dEp1bXAsXHJcbiAgICAgICAgICAgIC8vJEpzc29yRWFzaW5nJC4kRWFzZUluSnVtcFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHZhciB0cmFuc2xhdGVyID0ge1xyXG4gICAgICAgICAgICAkVG9wOiBcInlcIiwgICAgICAgICAgLy90b3BcclxuICAgICAgICAgICAgJExlZnQ6IFwieFwiLCAgICAgICAgIC8vbGVmdFxyXG4gICAgICAgICAgICAkQm90dG9tOiBcIm1cIiwgICAgICAgLy9ib3R0b21cclxuICAgICAgICAgICAgJFJpZ2h0OiBcInRcIiwgICAgICAgIC8vcmlnaHRcclxuICAgICAgICAgICAgJFpvb206IFwic1wiLCAgICAgICAgIC8vem9vbS9zY2FsZVxyXG4gICAgICAgICAgICAkUm90YXRlOiBcInJcIiwgICAgICAgLy9yb3RhdGVcclxuICAgICAgICAgICAgJE9wYWNpdHk6IFwib1wiLCAgICAgIC8vb3BhY2l0eVxyXG4gICAgICAgICAgICAkRWFzaW5nOiBcImVcIiwgICAgICAgLy9lYXNpbmdcclxuICAgICAgICAgICAgJFpJbmRleDogXCJpXCIsICAgICAgIC8vemluZGV4XHJcbiAgICAgICAgICAgICRSb3VuZDogXCJyZFwiLCAgICAgICAvL3JvdW5kXHJcbiAgICAgICAgICAgICREdXJpbmc6IFwiZHVcIiwgICAgICAvL2R1cmluZ1xyXG4gICAgICAgICAgICAkRHVyYXRpb246IFwiZFwiLy8sICAgLy9kdXJhdGlvblxyXG4gICAgICAgICAgICAvLyRCZWdpbjogXCJiXCJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkSnNzb3IkLiRFYWNoKHRyYW5zbGF0ZXIsIGZ1bmN0aW9uIChwcm9wLCBuZXdQcm9wKSB7XHJcbiAgICAgICAgICAgIF9UcmFuc2l0aW9uQ29udmVydGVyW3Byb3BdID0gbmV3UHJvcDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ3JlYXRlQW5pbWF0b3JzKEdldENhcHRpb25JdGVtcyhjb250YWluZXIsIDEpKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vRXZlbnQgVGFibGVcclxuXHJcbi8vJEVWVF9DTElDSyA9IDIxO1x0XHRcdCAgICBmdW5jdGlvbihzbGlkZUluZGV4WywgZXZlbnRdKVxyXG4vLyRFVlRfRFJBR19TVEFSVCA9IDIyO1x0XHQgICAgZnVuY3Rpb24ocG9zaXRpb25bLCB2aXJ0dWFsUG9zaXRpb24sIGV2ZW50XSlcclxuLy8kRVZUX0RSQUdfRU5EID0gMjM7XHRcdCAgICBmdW5jdGlvbihwb3NpdGlvbiwgc3RhcnRQb3NpdGlvblssIHZpcnR1YWxQb3NpdGlvbiwgdmlydHVhbFN0YXJ0UG9zaXRpb24sIGV2ZW50XSlcclxuLy8kRVZUX1NXSVBFX1NUQVJUID0gMjQ7XHRcdGZ1bmN0aW9uKHBvc2l0aW9uWywgdmlydHVhbFBvc2l0aW9uXSlcclxuLy8kRVZUX1NXSVBFX0VORCA9IDI1O1x0XHQgICAgZnVuY3Rpb24ocG9zaXRpb25bLCB2aXJ0dWFsUG9zaXRpb25dKVxyXG5cclxuLy8kRVZUX0xPQURfU1RBUlQgPSAyNjtcdFx0XHRmdW5jdGlvbihzbGlkZUluZGV4KVxyXG4vLyRFVlRfTE9BRF9FTkQgPSAyNztcdFx0XHRmdW5jdGlvbihzbGlkZUluZGV4KVxyXG5cclxuLy8kRVZUX1BPU0lUSU9OX0NIQU5HRSA9IDIwMjtcdGZ1bmN0aW9uKHBvc2l0aW9uLCBmcm9tUG9zaXRpb25bLCB2aXJ0dWFsUG9zaXRpb24sIHZpcnR1YWxGcm9tUG9zaXRpb25dKVxyXG4vLyRFVlRfUEFSSyA9IDIwMztcdFx0XHQgICAgZnVuY3Rpb24oc2xpZGVJbmRleCwgZnJvbUluZGV4KVxyXG5cclxuLy8kRVZUX1BST0dSRVNTX0NIQU5HRSA9IDIwODtcdGZ1bmN0aW9uKHNsaWRlSW5kZXgsIHByb2dyZXNzWywgcHJvZ3Jlc3NCZWdpbiwgaWRsZUJlZ2luLCBpZGxlRW5kLCBwcm9ncmVzc0VuZF0pXHJcbi8vJEVWVF9TVEFURV9DSEFOR0UgPSAyMDk7XHQgICAgZnVuY3Rpb24oc2xpZGVJbmRleCwgcHJvZ3Jlc3NbLCBwcm9ncmVzc0JlZ2luLCBpZGxlQmVnaW4sIGlkbGVFbmQsIHByb2dyZXNzRW5kXSlcclxuXHJcbi8vJEVWVF9ST0xMQkFDS19TVEFSVCA9IDIxMDtcdGZ1bmN0aW9uKHNsaWRlSW5kZXgsIHByb2dyZXNzWywgcHJvZ3Jlc3NCZWdpbiwgaWRsZUJlZ2luLCBpZGxlRW5kLCBwcm9ncmVzc0VuZF0pXHJcbi8vJEVWVF9ST0xMQkFDS19FTkQgPSAyMTE7XHQgICAgZnVuY3Rpb24oc2xpZGVJbmRleCwgcHJvZ3Jlc3NbLCBwcm9ncmVzc0JlZ2luLCBpZGxlQmVnaW4sIGlkbGVFbmQsIHByb2dyZXNzRW5kXSlcclxuXHJcbi8vJEVWVF9TTElERVNIT1dfU1RBUlQgPSAyMDY7ICAgZnVuY3Rpb24oc2xpZGVJbmRleFssIHByb2dyZXNzQmVnaW4sIHNsaWRlc2hvd0JlZ2luLCBzbGlkZXNob3dFbmQsIHByb2dyZXNzRW5kXSlcclxuLy8kRVZUX1NMSURFU0hPV19FTkQgPSAyMDc7ICAgICBmdW5jdGlvbihzbGlkZUluZGV4WywgcHJvZ3Jlc3NCZWdpbiwgc2xpZGVzaG93QmVnaW4sIHNsaWRlc2hvd0VuZCwgcHJvZ3Jlc3NFbmRdKVxyXG5cclxuLy9odHRwOi8vd3d3Lmpzc29yLmNvbS9kZXZlbG9wbWVudC9yZWZlcmVuY2UtYXBpLmh0bWwiXSwiZmlsZSI6Impzc29yLnNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9