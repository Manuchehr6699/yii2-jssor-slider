/*
* Jssor 19.0
* http://www.jssor.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
* 
* TERMS OF USE - Jssor
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

/*! Jssor */

//$JssorDebug$
var $JssorDebug$ = new function () {

    this.$DebugMode = true;

    // Methods

    this.$Log = function (msg, important) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.log) {
            console.log(msg);
        } else if (debug && important) {
            alert(msg);
        }
    };

    this.$Error = function (msg, e) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.error) {
            console.error(msg);
        } else if (debug) {
            alert(msg);
        }

        if (debug) {
            // since we're debugging, fail fast by crashing
            throw e || new Error(msg);
        }
    };

    this.$Fail = function (msg) {
        throw new Error(msg);
    };

    this.$Assert = function (value, msg) {
        var debug = this.$DebugMode;
        if (debug) {
            if (!value)
                throw new Error("Assert failed " + msg || "");
        }
    };

    this.$Trace = function (msg) {
        var console = window.console || {};
        var debug = this.$DebugMode;

        if (debug && console.log) {
            console.log(msg);
        }
    };

    this.$Execute = function (func) {
        var debug = this.$DebugMode;
        if (debug)
            func();
    };

    this.$LiveStamp = function (obj, id) {
        var debug = this.$DebugMode;
        if (debug) {
            var stamp = document.createElement("DIV");
            stamp.setAttribute("id", id);

            obj.$Live = stamp;
        }
    };

    this.$C_AbstractProperty = function () {
        ///	<summary>
        ///		Tells compiler the property is abstract, it should be implemented by subclass.
        ///	</summary>

        throw new Error("The property is abstract, it should be implemented by subclass.");
    };

    this.$C_AbstractMethod = function () {
        ///	<summary>
        ///		Tells compiler the method is abstract, it should be implemented by subclass.
        ///	</summary>

        throw new Error("The method is abstract, it should be implemented by subclass.");
    };

    function C_AbstractClass(instance) {
        ///	<summary>
        ///		Tells compiler the class is abstract, it should be implemented by subclass.
        ///	</summary>

        if (instance.constructor === C_AbstractClass.caller)
            throw new Error("Cannot create instance of an abstract class.");
    }

    this.$C_AbstractClass = C_AbstractClass;
};

//$JssorEasing$
var $JssorEasing$ = window.$JssorEasing$ = {
    $EaseSwing: function (t) {
        return -Math.cos(t * Math.PI) / 2 + .5;
    },
    $EaseLinear: function (t) {
        return t;
    },
    $EaseInQuad: function (t) {
        return t * t;
    },
    $EaseOutQuad: function (t) {
        return -t * (t - 2);
    },
    $EaseInOutQuad: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t : -1 / 2 * (--t * (t - 2) - 1);
    },
    $EaseInCubic: function (t) {
        return t * t * t;
    },
    $EaseOutCubic: function (t) {
        return (t -= 1) * t * t + 1;
    },
    $EaseInOutCubic: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t : 1 / 2 * ((t -= 2) * t * t + 2);
    },
    $EaseInQuart: function (t) {
        return t * t * t * t;
    },
    $EaseOutQuart: function (t) {
        return -((t -= 1) * t * t * t - 1);
    },
    $EaseInOutQuart: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t * t : -1 / 2 * ((t -= 2) * t * t * t - 2);
    },
    $EaseInQuint: function (t) {
        return t * t * t * t * t;
    },
    $EaseOutQuint: function (t) {
        return (t -= 1) * t * t * t * t + 1;
    },
    $EaseInOutQuint: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t * t * t : 1 / 2 * ((t -= 2) * t * t * t * t + 2);
    },
    $EaseInSine: function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
    },
    $EaseOutSine: function (t) {
        return Math.sin(t * Math.PI / 2);
    },
    $EaseInOutSine: function (t) {
        return -1 / 2 * (Math.cos(Math.PI * t) - 1);
    },
    $EaseInExpo: function (t) {
        return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));
    },
    $EaseOutExpo: function (t) {
        return t == 1 ? 1 : -Math.pow(2, -10 * t) + 1;
    },
    $EaseInOutExpo: function (t) {
        return t == 0 || t == 1 ? t : (t *= 2) < 1 ? 1 / 2 * Math.pow(2, 10 * (t - 1)) : 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
    },
    $EaseInCirc: function (t) {
        return -(Math.sqrt(1 - t * t) - 1);
    },
    $EaseOutCirc: function (t) {
        return Math.sqrt(1 - (t -= 1) * t);
    },
    $EaseInOutCirc: function (t) {
        return (t *= 2) < 1 ? -1 / 2 * (Math.sqrt(1 - t * t) - 1) : 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    $EaseInElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .3, s = .075;
        return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p));
    },
    $EaseOutElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .3, s = .075;
        return Math.pow(2, -10 * t) * Math.sin((t - s) * 2 * Math.PI / p) + 1;
    },
    $EaseInOutElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .45, s = .1125;
        return (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) : Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) * .5 + 1;
    },
    $EaseInBack: function (t) {
        var s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },
    $EaseOutBack: function (t) {
        var s = 1.70158;
        return (t -= 1) * t * ((s + 1) * t + s) + 1;
    },
    $EaseInOutBack: function (t) {
        var s = 1.70158;
        return (t *= 2) < 1 ? 1 / 2 * t * t * (((s *= 1.525) + 1) * t - s) : 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    $EaseInBounce: function (t) {
        return 1 - $JssorEasing$.$EaseOutBounce(1 - t)
    },
    $EaseOutBounce: function (t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    },
    $EaseInOutBounce: function (t) {
        return t < 1 / 2 ? $JssorEasing$.$EaseInBounce(t * 2) * .5 : $JssorEasing$.$EaseOutBounce(t * 2 - 1) * .5 + .5;
    },
    $EaseGoBack: function (t) {
        return 1 - Math.abs((t *= 2) - 1);
    },
    $EaseInWave: function (t) {
        return 1 - Math.cos(t * Math.PI * 2)
    },
    $EaseOutWave: function (t) {
        return Math.sin(t * Math.PI * 2);
    },
    $EaseOutJump: function (t) {
        return 1 - (((t *= 2) < 1) ? (t = 1 - t) * t * t : (t -= 1) * t * t);
    },
    $EaseInJump: function (t) {
        return ((t *= 2) < 1) ? t * t * t : (t = 2 - t) * t * t;
    }
};

var $JssorDirection$ = window.$JssorDirection$ = {
    $TO_LEFT: 0x0001,
    $TO_RIGHT: 0x0002,
    $TO_TOP: 0x0004,
    $TO_BOTTOM: 0x0008,
    $HORIZONTAL: 0x0003,
    $VERTICAL: 0x000C,
    //$LEFTRIGHT: 0x0003,
    //$TOPBOTOM: 0x000C,
    //$TOPLEFT: 0x0005,
    //$TOPRIGHT: 0x0006,
    //$BOTTOMLEFT: 0x0009,
    //$BOTTOMRIGHT: 0x000A,
    //$AROUND: 0x000F,

    $GetDirectionHorizontal: function (direction) {
        return direction & 0x0003;
    },
    $GetDirectionVertical: function (direction) {
        return direction & 0x000C;
    },
    //$ChessHorizontal: function (direction) {
    //    return (~direction & 0x0003) + (direction & 0x000C);
    //},
    //$ChessVertical: function (direction) {
    //    return (~direction & 0x000C) + (direction & 0x0003);
    //},
    //$IsToLeft: function (direction) {
    //    return (direction & 0x0003) == 0x0001;
    //},
    //$IsToRight: function (direction) {
    //    return (direction & 0x0003) == 0x0002;
    //},
    //$IsToTop: function (direction) {
    //    return (direction & 0x000C) == 0x0004;
    //},
    //$IsToBottom: function (direction) {
    //    return (direction & 0x000C) == 0x0008;
    //},
    $IsHorizontal: function (direction) {
        return direction & 0x0003;
    },
    $IsVertical: function (direction) {
        return direction & 0x000C;
    }
};

var $JssorKeyCode$ = {
    $BACKSPACE: 8,
    $COMMA: 188,
    $DELETE: 46,
    $DOWN: 40,
    $END: 35,
    $ENTER: 13,
    $ESCAPE: 27,
    $HOME: 36,
    $LEFT: 37,
    $NUMPAD_ADD: 107,
    $NUMPAD_DECIMAL: 110,
    $NUMPAD_DIVIDE: 111,
    $NUMPAD_ENTER: 108,
    $NUMPAD_MULTIPLY: 106,
    $NUMPAD_SUBTRACT: 109,
    $PAGE_DOWN: 34,
    $PAGE_UP: 33,
    $PERIOD: 190,
    $RIGHT: 39,
    $SPACE: 32,
    $TAB: 9,
    $UP: 38
};

// $Jssor$ is a static class, so make it singleton instance
var $Jssor$ = window.$Jssor$ = new function () {
    var _This = this;

    //#region Constants
    var REGEX_WHITESPACE_GLOBAL = /\S+/g;
    var ROWSER_OTHER = -1;
    var ROWSER_UNKNOWN = 0;
    var BROWSER_IE = 1;
    var BROWSER_FIREFOX = 2;
    var BROWSER_SAFARI = 3;
    var BROWSER_CHROME = 4;
    var BROWSER_OPERA = 5;
    //var arrActiveX = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"];
    //#endregion

    //#region Variables
    var _Device;
    var _Browser = 0;
    var _BrowserRuntimeVersion = 0;
    var _BrowserEngineVersion = 0;
    var _BrowserJavascriptVersion = 0;
    var _WebkitVersion = 0;

    var _Navigator = navigator;
    var _AppName = _Navigator.appName;
    var _AppVersion = _Navigator.appVersion;
    var _UserAgent = _Navigator.userAgent;

    var _DocElmt = document.documentElement;
    var _TransformProperty;
    //#endregion

    function Device() {
        if (!_Device) {
            _Device = { $Touchable: "ontouchstart" in window || "createTouch" in document };

            var msPrefix;
            if ((_Navigator.pointerEnabled || (msPrefix = _Navigator.msPointerEnabled))) {
                _Device.$TouchActionAttr = msPrefix ? "msTouchAction" : "touchAction";
            }
        }

        return _Device;
    }

    function DetectBrowser(browser) {
        if (!_Browser) {
            _Browser = -1;

            if (_AppName == "Microsoft Internet Explorer" &&
                !!window.attachEvent && !!window.ActiveXObject) {

                var ieOffset = _UserAgent.indexOf("MSIE");
                _Browser = BROWSER_IE;
                _BrowserEngineVersion = ParseFloat(_UserAgent.substring(ieOffset + 5, _UserAgent.indexOf(";", ieOffset)));

                //check IE javascript version
                /*@cc_on
                _BrowserJavascriptVersion = @_jscript_version;
                @*/

                // update: for intranet sites and compat view list sites, IE sends
                // an IE7 User-Agent to the server to be interoperable, and even if
                // the page requests a later IE version, IE will still report the
                // IE7 UA to JS. we should be robust to self
                //var docMode = document.documentMode;
                //if (typeof docMode !== "undefined") {
                //    _BrowserRuntimeVersion = docMode;
                //}

                _BrowserRuntimeVersion = document.documentMode || _BrowserEngineVersion;

            }
            else if (_AppName == "Netscape" && !!window.addEventListener) {

                var ffOffset = _UserAgent.indexOf("Firefox");
                var saOffset = _UserAgent.indexOf("Safari");
                var chOffset = _UserAgent.indexOf("Chrome");
                var webkitOffset = _UserAgent.indexOf("AppleWebKit");

                if (ffOffset >= 0) {
                    _Browser = BROWSER_FIREFOX;
                    _BrowserRuntimeVersion = ParseFloat(_UserAgent.substring(ffOffset + 8));
                }
                else if (saOffset >= 0) {
                    var slash = _UserAgent.substring(0, saOffset).lastIndexOf("/");
                    _Browser = (chOffset >= 0) ? BROWSER_CHROME : BROWSER_SAFARI;
                    _BrowserRuntimeVersion = ParseFloat(_UserAgent.substring(slash + 1, saOffset));
                }
                else {
                    //(/Trident.*rv[ :]*11\./i
                    var match = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(_UserAgent);
                    if (match) {
                        _Browser = BROWSER_IE;
                        _BrowserRuntimeVersion = _BrowserEngineVersion = ParseFloat(match[1]);
                    }
                }

                if (webkitOffset >= 0)
                    _WebkitVersion = ParseFloat(_UserAgent.substring(webkitOffset + 12));
            }
            else {
                var match = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(_UserAgent);
                if (match) {
                    _Browser = BROWSER_OPERA;
                    _BrowserRuntimeVersion = ParseFloat(match[2]);
                }
            }
        }

        return browser == _Browser;
    }

    function IsBrowserIE() {
        return DetectBrowser(BROWSER_IE);
    }

    function IsBrowserIeQuirks() {
        return IsBrowserIE() && (_BrowserRuntimeVersion < 6 || document.compatMode == "BackCompat");   //Composite to "CSS1Compat"
    }

    function IsBrowserFireFox() {
        return DetectBrowser(BROWSER_FIREFOX);
    }

    function IsBrowserSafari() {
        return DetectBrowser(BROWSER_SAFARI);
    }

    function IsBrowserChrome() {
        return DetectBrowser(BROWSER_CHROME);
    }

    function IsBrowserOpera() {
        return DetectBrowser(BROWSER_OPERA);
    }

    function IsBrowserBadTransform() {
        return IsBrowserSafari() && (_WebkitVersion > 534) && (_WebkitVersion < 535);
    }

    function IsBrowserIe9Earlier() {
        return IsBrowserIE() && _BrowserRuntimeVersion < 9;
    }

    function GetTransformProperty(elmt) {

        if (!_TransformProperty) {
            // Note that in some versions of IE9 it is critical that
            // msTransform appear in this list before MozTransform

            Each(['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'], function (property) {
                if (elmt.style[property] != undefined) {
                    _TransformProperty = property;
                    return true;
                }
            });

            _TransformProperty = _TransformProperty || "transform";
        }

        return _TransformProperty;
    }

    // Helpers
    function getOffsetParent(elmt, isFixed) {
        // IE and Opera "fixed" position elements don't have offset parents.
        // regardless, if it's fixed, its offset parent is the body.
        if (isFixed && elmt != document.body) {
            return document.body;
        } else {
            return elmt.offsetParent;
        }
    }

    function toString(obj) {
        return {}.toString.call(obj);
    }

    // [[Class]] -> type pairs
    var _Class2type;

    function GetClass2Type() {
        if (!_Class2type) {
            _Class2type = {};
            Each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function (name) {
                _Class2type["[object " + name + "]"] = name.toLowerCase();
            });
        }

        return _Class2type;
    }

    function Each(obj, callback) {
        if (toString(obj) == "[object Array]") {
            for (var i = 0; i < obj.length; i++) {
                if (callback(obj[i], i, obj)) {
                    return true;
                }
            }
        }
        else {
            for (var name in obj) {
                if (callback(obj[name], name, obj)) {
                    return true;
                }
            }
        }
    }

    function Type(obj) {
        return obj == null ? String(obj) : GetClass2Type()[toString(obj)] || "object";
    }

    function IsNotEmpty(obj) {
        for(var name in obj)
            return true;
    }

    function IsPlainObject(obj) {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        try {
            return Type(obj) == "object"
                && !obj.nodeType
                && obj != obj.window
                && (!obj.constructor || { }.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"));
        }
        catch (e) { }
    }

    function Point(x, y) {
        return { x: x, y: y };
    }

    function Delay(code, delay) {
        setTimeout(code, delay || 0);
    }

    function RemoveByReg(str, reg) {
        var m = reg.exec(str);

        if (m) {
            var header = str.substr(0, m.index);
            var tailer = str.substr(m.lastIndex + 1, str.length - (m.lastIndex + 1));
            str = header + tailer;
        }

        return str;
    }

    function BuildNewCss(oldCss, removeRegs, replaceValue) {
        var css = (!oldCss || oldCss == "inherit") ? "" : oldCss;

        Each(removeRegs, function (removeReg) {
            var m = removeReg.exec(css);

            if (m) {
                var header = css.substr(0, m.index);
                var tailer = css.substr(m.lastIndex + 1, css.length - (m.lastIndex + 1));
                css = header + tailer;
            }
        });

        css = replaceValue + (css.indexOf(" ") != 0 ? " " : "") + css;

        return css;
    }

    function SetStyleFilterIE(elmt, value) {
        if (_BrowserRuntimeVersion < 9) {
            elmt.style.filter = value;
        }
    }

    function SetStyleMatrixIE(elmt, matrix, offset) {
        //matrix is not for ie9+ running in ie8- mode
        if (_BrowserJavascriptVersion < 9) {
            var oldFilterValue = elmt.style.filter;
            var matrixReg = new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g);
            var matrixValue = matrix ? "progid:DXImageTransform.Microsoft.Matrix(" + "M11=" + matrix[0][0] + ", M12=" + matrix[0][1] + ", M21=" + matrix[1][0] + ", M22=" + matrix[1][1] + ", SizingMethod='auto expand')" : "";

            var newFilterValue = BuildNewCss(oldFilterValue, [matrixReg], matrixValue);

            SetStyleFilterIE(elmt, newFilterValue);

            _This.$CssMarginTop(elmt, offset.y);
            _This.$CssMarginLeft(elmt, offset.x);
        }
    }

    // Methods

    _This.$Device = Device;

    _This.$IsBrowserIE = IsBrowserIE;

    _This.$IsBrowserIeQuirks = IsBrowserIeQuirks;

    _This.$IsBrowserFireFox = IsBrowserFireFox;

    _This.$IsBrowserSafari = IsBrowserSafari;

    _This.$IsBrowserChrome = IsBrowserChrome;

    _This.$IsBrowserOpera = IsBrowserOpera;

    _This.$IsBrowserBadTransform = IsBrowserBadTransform;

    _This.$IsBrowserIe9Earlier = IsBrowserIe9Earlier;

    _This.$BrowserVersion = function () {
        return _BrowserRuntimeVersion;
    };

    _This.$BrowserEngineVersion = function () {
        return _BrowserEngineVersion || _BrowserRuntimeVersion;
    };

    _This.$WebKitVersion = function () {
        DetectBrowser();

        return _WebkitVersion;
    };

    _This.$Delay = Delay;

    _This.$Inherit = function (instance, baseClass) {
        baseClass.call(instance);
        return Extend({}, instance);
    };

    function Construct(instance) {
        instance.constructor === Construct.caller && instance.$Construct && instance.$Construct.apply(instance, Construct.caller.arguments);
    }

    _This.$Construct = Construct;

    _This.$GetElement = function (elmt) {
        if (_This.$IsString(elmt)) {
            elmt = document.getElementById(elmt);
        }

        return elmt;
    };

    function GetEvent(event) {
        return event || window.event;
    }

    _This.$GetEvent = GetEvent;

    _This.$EvtSrc = function (event) {
        event = GetEvent(event);
        return event.target || event.srcElement || document;
    };

    _This.$EvtTarget = function (event) {
        event = GetEvent(event);
        return event.relatedTarget || event.toElement;
    };

    _This.$EvtWhich = function (event) {
        event = GetEvent(event);
        return event.which || [0, 1, 3, 0, 2][event.button] || event.charCode || event.keyCode;
    };

    _This.$MousePosition = function (event) {
        event = GetEvent(event);
        //var body = document.body;

        return {
            x: event.pageX || event.clientX/* + (_DocElmt.scrollLeft || body.scrollLeft || 0) - (_DocElmt.clientLeft || body.clientLeft || 0)*/ || 0,
            y: event.pageY || event.clientY/* + (_DocElmt.scrollTop || body.scrollTop || 0) - (_DocElmt.clientTop || body.clientTop || 0)*/ || 0
        };
    };

    _This.$PageScroll = function () {
        var body = document.body;

        return {
            x: (window.pageXOffset || _DocElmt.scrollLeft || body.scrollLeft || 0) - (_DocElmt.clientLeft || body.clientLeft || 0),
            y: (window.pageYOffset || _DocElmt.scrollTop || body.scrollTop || 0) - (_DocElmt.clientTop || body.clientTop || 0)
        };
    };

    _This.$WindowSize = function () {
        var body = document.body;

        return {
            x: body.clientWidth || _DocElmt.clientWidth,
            y: body.clientHeight || _DocElmt.clientHeight
        };
    };

    //_This.$GetElementPosition = function (elmt) {
    //    elmt = _This.$GetElement(elmt);
    //    var result = Point();

    //    // technique from:
    //    // http://www.quirksmode.org/js/findpos.html
    //    // with special check for "fixed" elements.

    //    while (elmt) {
    //        result.x += elmt.offsetLeft;
    //        result.y += elmt.offsetTop;

    //        var isFixed = _This.$GetElementStyle(elmt).position == "fixed";

    //        if (isFixed) {
    //            result = result.$Plus(_This.$PageScroll(window));
    //        }

    //        elmt = getOffsetParent(elmt, isFixed);
    //    }

    //    return result;
    //};

    //_This.$GetMouseScroll = function (event) {
    //    event = GetEvent(event);
    //    var delta = 0; // default value

    //    // technique from:
    //    // http://blog.paranoidferret.com/index.php/2007/10/31/javascript-tutorial-the-scroll-wheel/

    //    if (typeof (event.wheelDelta) == "number") {
    //        delta = event.wheelDelta;
    //    } else if (typeof (event.detail) == "number") {
    //        delta = event.detail * -1;
    //    } else {
    //        $JssorDebug$.$Fail("Unknown event mouse scroll, no known technique.");
    //    }

    //    // normalize value to [-1, 1]
    //    return delta ? delta / Math.abs(delta) : 0;
    //};

    //_This.$MakeAjaxRequest = function (url, callback) {
    //    var async = typeof (callback) == "function";
    //    var req = null;

    //    if (async) {
    //        var actual = callback;
    //        var callback = function () {
    //            Delay($Jssor$.$CreateCallback(null, actual, req), 1);
    //        };
    //    }

    //    if (window.ActiveXObject) {
    //        for (var i = 0; i < arrActiveX.length; i++) {
    //            try {
    //                req = new ActiveXObject(arrActiveX[i]);
    //                break;
    //            } catch (e) {
    //                continue;
    //            }
    //        }
    //    } else if (window.XMLHttpRequest) {
    //        req = new XMLHttpRequest();
    //    }

    //    if (!req) {
    //        $JssorDebug$.$Fail("Browser doesn't support XMLHttpRequest.");
    //    }

    //    if (async) {
    //        req.onreadystatechange = function () {
    //            if (req.readyState == 4) {
    //                // prevent memory leaks by breaking circular reference now
    //                req.onreadystatechange = new Function();
    //                callback();
    //            }
    //        };
    //    }

    //    try {
    //        req.open("GET", url, async);
    //        req.send(null);
    //    } catch (e) {
    //        $JssorDebug$.$Log(e.name + " while making AJAX request: " + e.message);

    //        req.onreadystatechange = null;
    //        req = null;

    //        if (async) {
    //            callback();
    //        }
    //    }

    //    return async ? null : req;
    //};

    //_This.$ParseXml = function (string) {
    //    var xmlDoc = null;

    //    if (window.ActiveXObject) {
    //        try {
    //            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    //            xmlDoc.async = false;
    //            xmlDoc.loadXML(string);
    //        } catch (e) {
    //            $JssorDebug$.$Log(e.name + " while parsing XML (ActiveX): " + e.message);
    //        }
    //    } else if (window.DOMParser) {
    //        try {
    //            var parser = new DOMParser();
    //            xmlDoc = parser.parseFromString(string, "text/xml");
    //        } catch (e) {
    //            $JssorDebug$.$Log(e.name + " while parsing XML (DOMParser): " + e.message);
    //        }
    //    } else {
    //        $JssorDebug$.$Fail("Browser doesn't support XML DOM.");
    //    }

    //    return xmlDoc;
    //};

    function Css(elmt, name, value) {
        ///	<summary>
        ///		access css
        ///     $Jssor$.$Css(elmt, name);         //get css value
        ///     $Jssor$.$Css(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" optional="true">
        ///		the value to set
        ///	</param>
        if (value != undefined) {
            elmt.style[name] = value;
        }
        else {
            var style = elmt.currentStyle || elmt.style;
            value = style[name];

            if (value == "" && window.getComputedStyle) {
                style = elmt.ownerDocument.defaultView.getComputedStyle(elmt, null);

                style && (value = style.getPropertyValue(name) || style[name]);
            }

            return value;
        }
    }

    function CssN(elmt, name, value, isDimensional) {
        ///	<summary>
        ///		access css as numeric
        ///     $Jssor$.$CssN(elmt, name);         //get css value
        ///     $Jssor$.$CssN(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" type="Number" optional="true">
        ///		the value to set
        ///	</param>
        if (value != undefined) {
            isDimensional && (value += "px");
            Css(elmt, name, value);
        }
        else {
            return ParseFloat(Css(elmt, name));
        }
    }

    function CssP(elmt, name, value) {
        ///	<summary>
        ///		access css in pixel as numeric, like 'top', 'left', 'width', 'height'
        ///     $Jssor$.$CssP(elmt, name);         //get css value
        ///     $Jssor$.$CssP(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" type="Number" optional="true">
        ///		the value to set
        ///	</param>
        return CssN(elmt, name, value, true);
    }

    function CssProxy(name, numericOrDimension) {
        ///	<summary>
        ///		create proxy to access css, CssProxy(name[, numericOrDimension]);
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="numericOrDimension" type="Number" optional="true">
        ///		not set: access original css, 1: access css as numeric, 2: access css in pixel as numeric
        ///	</param>
        var isDimensional = numericOrDimension & 2;
        var cssAccessor = numericOrDimension ? CssN : Css;
        return function (elmt, value) {
            return cssAccessor(elmt, name, value, isDimensional);
        };
    }

    function GetStyleOpacity(elmt) {
        if (IsBrowserIE() && _BrowserEngineVersion < 9) {
            var match = /opacity=([^)]*)/.exec(elmt.style.filter || "");
            return match ? (ParseFloat(match[1]) / 100) : 1;
        }
        else
            return ParseFloat(elmt.style.opacity || "1");
    }

    function SetStyleOpacity(elmt, opacity, ie9EarlierForce) {

        if (IsBrowserIE() && _BrowserEngineVersion < 9) {
            //var filterName = "filter"; // _BrowserEngineVersion < 8 ? "filter" : "-ms-filter";
            var finalFilter = elmt.style.filter || "";

            // for CSS filter browsers (IE), remove alpha filter if it's unnecessary.
            // update: doing _This always since IE9 beta seems to have broken the
            // behavior if we rely on the programmatic filters collection.
            var alphaReg = new RegExp(/[\s]*alpha\([^\)]*\)/g);

            // important: note the lazy star! _This protects against
            // multiple filters; we don't want to delete the other ones.
            // update: also trimming extra whitespace around filter.

            var ieOpacity = Math.round(100 * opacity);
            var alphaFilter = "";
            if (ieOpacity < 100 || ie9EarlierForce) {
                alphaFilter = "alpha(opacity=" + ieOpacity + ") ";
            }

            var newFilterValue = BuildNewCss(finalFilter, [alphaReg], alphaFilter);

            SetStyleFilterIE(elmt, newFilterValue);
        }
        else {
            elmt.style.opacity = opacity == 1 ? "" : Math.round(opacity * 100) / 100;
        }
    }

    function SetStyleTransformInternal(elmt, transform) {
        var rotate = transform.$Rotate || 0;
        var scale = transform.$Scale == undefined ? 1 : transform.$Scale;

        if (IsBrowserIe9Earlier()) {
            var matrix = _This.$CreateMatrix(rotate / 180 * Math.PI, scale, scale);
            SetStyleMatrixIE(elmt, (!rotate && scale == 1) ? null : matrix, _This.$GetMatrixOffset(matrix, transform.$OriginalWidth, transform.$OriginalHeight));
        }
        else {
            //rotate(15deg) scale(.5) translateZ(0)
            var transformProperty = GetTransformProperty(elmt);
            if (transformProperty) {
                var transformValue = "rotate(" + rotate % 360 + "deg) scale(" + scale + ")";

                //needed for touch device, no need for desktop device
                if (IsBrowserChrome() && _WebkitVersion > 535 && "ontouchstart" in window)
                    transformValue += " perspective(2000px)";

                elmt.style[transformProperty] = transformValue;
            }
        }
    }

    _This.$SetStyleTransform = function (elmt, transform) {
        if (IsBrowserBadTransform()) {
            Delay(_This.$CreateCallback(null, SetStyleTransformInternal, elmt, transform));
        }
        else {
            SetStyleTransformInternal(elmt, transform);
        }
    };

    _This.$SetStyleTransformOrigin = function (elmt, transformOrigin) {
        var transformProperty = GetTransformProperty(elmt);

        if (transformProperty)
            elmt.style[transformProperty + "Origin"] = transformOrigin;
    };

    _This.$CssScale = function (elmt, scale) {

        if (IsBrowserIE() && _BrowserEngineVersion < 9 || (_BrowserEngineVersion < 10 && IsBrowserIeQuirks())) {
            elmt.style.zoom = (scale == 1) ? "" : scale;
        }
        else {
            var transformProperty = GetTransformProperty(elmt);

            if (transformProperty) {
                //rotate(15deg) scale(.5)
                var transformValue = "scale(" + scale + ")";

                var oldTransformValue = elmt.style[transformProperty];
                var scaleReg = new RegExp(/[\s]*scale\(.*?\)/g);

                var newTransformValue = BuildNewCss(oldTransformValue, [scaleReg], transformValue);

                elmt.style[transformProperty] = newTransformValue;
            }
        }
    };

    _This.$EnableHWA = function (elmt) {
        if (!elmt.style[GetTransformProperty(elmt)] || elmt.style[GetTransformProperty(elmt)] == "none")
            elmt.style[GetTransformProperty(elmt)] = "perspective(2000px)";
    };

    _This.$DisableHWA = function (elmt) {
        elmt.style[GetTransformProperty(elmt)] = "none";
    };

    var ie8OffsetWidth = 0;
    var ie8OffsetHeight = 0;

    _This.$WindowResizeFilter = function (window, handler) {
        return IsBrowserIe9Earlier() ? function () {

            var trigger = true;

            var checkElement = (IsBrowserIeQuirks() ? window.document.body : window.document.documentElement);
            if (checkElement) {
                var widthChange = checkElement.offsetWidth - ie8OffsetWidth;
                var heightChange = checkElement.offsetHeight - ie8OffsetHeight;
                if (widthChange || heightChange) {
                    ie8OffsetWidth += widthChange;
                    ie8OffsetHeight += heightChange;
                }
                else
                    trigger = false;
            }

            trigger && handler();

        } : handler;
    };

    _This.$MouseOverOutFilter = function (handler, target) {
        ///	<param name="target" type="HTMLDomElement">
        ///		The target element to detect mouse over/out events. (for ie < 9 compatibility)
        ///	</param>

        $JssorDebug$.$Execute(function () {
            if (!target) {
                throw new Error("Null reference, parameter \"target\".");
            }
        });

        return function (event) {
            event = GetEvent(event);

            var eventName = event.type;
            var related = event.relatedTarget || (eventName == "mouseout" ? event.toElement : event.fromElement);

            if (!related || (related !== target && !_This.$IsChild(target, related))) {
                handler(event);
            }
        };
    };

    _This.$AddEvent = function (elmt, eventName, handler, useCapture) {
        elmt = _This.$GetElement(elmt);

        $JssorDebug$.$Execute(function () {
            if (!elmt) {
                $JssorDebug$.$Fail("Parameter 'elmt' not specified.");
            }

            if (!handler) {
                $JssorDebug$.$Fail("Parameter 'handler' not specified.");
            }

            if (!elmt.addEventListener && !elmt.attachEvent) {
                $JssorDebug$.$Fail("Unable to attach event handler, no known technique.");
            }
        });

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (elmt.addEventListener) {
            if (eventName == "mousewheel") {
                elmt.addEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to add the mousewheel -- not a mistake!
            // _This is for opera, since it uses onmousewheel but needs addEventListener.
            elmt.addEventListener(eventName, handler, useCapture);
        }
        else if (elmt.attachEvent) {
            elmt.attachEvent("on" + eventName, handler);
            if (useCapture && elmt.setCapture) {
                elmt.setCapture();
            }
        }
    };

    _This.$RemoveEvent = function (elmt, eventName, handler, useCapture) {
        elmt = _This.$GetElement(elmt);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (elmt.removeEventListener) {
            if (eventName == "mousewheel") {
                elmt.removeEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to remove the mousewheel -- not a mistake!
            // _This is for opera, since it uses onmousewheel but needs removeEventListener.
            elmt.removeEventListener(eventName, handler, useCapture);
        }
        else if (elmt.detachEvent) {
            elmt.detachEvent("on" + eventName, handler);
            if (useCapture && elmt.releaseCapture) {
                elmt.releaseCapture();
            }
        }
    };

    _This.$FireEvent = function (elmt, eventName) {
        //var document = elmt.document;

        $JssorDebug$.$Execute(function () {
            if (!document.createEvent && !document.createEventObject) {
                $JssorDebug$.$Fail("Unable to fire event, no known technique.");
            }

            if (!elmt.dispatchEvent && !elmt.fireEvent) {
                $JssorDebug$.$Fail("Unable to fire event, no known technique.");
            }
        });

        var evento;

        if (document.createEvent) {
            evento = document.createEvent("HTMLEvents");
            evento.initEvent(eventName, false, false);
            elmt.dispatchEvent(evento);
        }
        else {
            var ieEventName = "on" + eventName;
            evento = document.createEventObject();

            elmt.fireEvent(ieEventName, evento);
        }
    };

    _This.$CancelEvent = function (event) {
        event = GetEvent(event);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (event.preventDefault) {
            event.preventDefault();     // W3C for preventing default
        }

        event.cancel = true;            // legacy for preventing default
        event.returnValue = false;      // IE for preventing default
    };

    _This.$StopEvent = function (event) {
        event = GetEvent(event);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (event.stopPropagation) {
            event.stopPropagation();    // W3C for stopping propagation
        }

        event.cancelBubble = true;      // IE for stopping propagation
    };

    _This.$CreateCallback = function (object, method) {
        // create callback args
        var initialArgs = [].slice.call(arguments, 2);

        // create closure to apply method
        var callback = function () {
            // concatenate new args, but make a copy of initialArgs first
            var args = initialArgs.concat([].slice.call(arguments, 0));

            return method.apply(object, args);
        };

        //$JssorDebug$.$LiveStamp(callback, "callback_" + ($Jssor$.$GetNow() & 0xFFFFFF));

        return callback;
    };

    _This.$InnerText = function (elmt, text) {
        if (text == undefined)
            return elmt.textContent || elmt.innerText;

        var textNode = document.createTextNode(text);
        _This.$Empty(elmt);
        elmt.appendChild(textNode);
    };

    _This.$InnerHtml = function (elmt, html) {
        if (html == undefined)
            return elmt.innerHTML;

        elmt.innerHTML = html;
    };

    _This.$GetClientRect = function (elmt) {
        var rect = elmt.getBoundingClientRect();

        return { x: rect.left, y: rect.top, w: rect.right - rect.left, h: rect.bottom - rect.top };
    };

    _This.$ClearInnerHtml = function (elmt) {
        elmt.innerHTML = "";
    };

    _This.$EncodeHtml = function (text) {
        var div = _This.$CreateDiv();
        _This.$InnerText(div, text);
        return _This.$InnerHtml(div);
    };

    _This.$DecodeHtml = function (html) {
        var div = _This.$CreateDiv();
        _This.$InnerHtml(div, html);
        return _This.$InnerText(div);
    };

    _This.$SelectElement = function (elmt) {
        var userSelection;
        if (window.getSelection) {
            //W3C default
            userSelection = window.getSelection();
        }
        var theRange = null;
        if (document.createRange) {
            theRange = document.createRange();
            theRange.selectNode(elmt);
        }
        else {
            theRange = document.body.createTextRange();
            theRange.moveToElementText(elmt);
            theRange.select();
        }
        //set user selection
        if (userSelection)
            userSelection.addRange(theRange);
    };

    _This.$DeselectElements = function () {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    };

    _This.$Children = function (elmt, includeAll) {
        var children = [];

        for (var tmpEl = elmt.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
            if (includeAll || tmpEl.nodeType == 1) {
                children.push(tmpEl);
            }
        }

        return children;
    };

    function FindChild(elmt, attrValue, noDeep, attrName) {
        attrName = attrName || "u";

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (AttributeEx(elmt, attrName) == attrValue)
                    return elmt;

                if (!noDeep) {
                    var childRet = FindChild(elmt, attrValue, noDeep, attrName);
                    if (childRet)
                        return childRet;
                }
            }
        }
    }

    _This.$FindChild = FindChild;

    function FindChildren(elmt, attrValue, noDeep, attrName) {
        attrName = attrName || "u";

        var ret = [];

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (AttributeEx(elmt, attrName) == attrValue)
                    ret.push(elmt);

                if (!noDeep) {
                    var childRet = FindChildren(elmt, attrValue, noDeep, attrName);
                    if (childRet.length)
                        ret = ret.concat(childRet);
                }
            }
        }

        return ret;
    }

    _This.$FindChildren = FindChildren;

    function FindChildByTag(elmt, tagName, noDeep) {

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (elmt.tagName == tagName)
                    return elmt;

                if (!noDeep) {
                    var childRet = FindChildByTag(elmt, tagName, noDeep);
                    if (childRet)
                        return childRet;
                }
            }
        }
    }

    _This.$FindChildByTag = FindChildByTag;

    function FindChildrenByTag(elmt, tagName, noDeep) {
        var ret = [];

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (!tagName || elmt.tagName == tagName)
                    ret.push(elmt);

                if (!noDeep) {
                    var childRet = FindChildrenByTag(elmt, tagName, noDeep);
                    if (childRet.length)
                        ret = ret.concat(childRet);
                }
            }
        }

        return ret;
    }

    _This.$FindChildrenByTag = FindChildrenByTag;

    _This.$GetElementsByTag = function (elmt, tagName) {
        return elmt.getElementsByTagName(tagName);
    };

    //function Extend() {
    //    var args = arguments;
    //    var target;
    //    var options;
    //    var propName;
    //    var propValue;
    //    var targetPropValue;
    //    var purpose = 7 & args[0];
    //    var deep = 1 & purpose;
    //    var unextend = 2 & purpose;
    //    var i = purpose ? 2 : 1;
    //    target = args[i - 1] || {};

    //    for (; i < args.length; i++) {
    //        // Only deal with non-null/undefined values
    //        if (options = args[i]) {
    //            // Extend the base object
    //            for (propName in options) {
    //                propValue = options[propName];

    //                if (propValue !== undefined) {
    //                    propValue = options[propName];

    //                    if (unextend) {
    //                        targetPropValue = target[propName];
    //                        if (propValue === targetPropValue)
    //                            delete target[propName];
    //                        else if (deep && IsPlainObject(targetPropValue)) {
    //                            Extend(purpose, targetPropValue, propValue);
    //                        }
    //                    }
    //                    else {
    //                        target[propName] = (deep && IsPlainObject(target[propName])) ? Extend(purpose | 4, {}, propValue) : propValue;
    //                    }
    //                }
    //            }
    //        }
    //    }

    //    // Return the modified object
    //    return target;
    //}

    //function Unextend() {
    //    var args = arguments;
    //    var newArgs = [].slice.call(arguments);
    //    var purpose = 1 & args[0];

    //    purpose && newArgs.shift();
    //    newArgs.unshift(purpose | 2);

    //    return Extend.apply(null, newArgs);
    //}

    function Extend() {
        var args = arguments;
        var target;
        var options;
        var propName;
        var propValue;
        var deep = 1 & args[0];
        var i = 1 + deep;
        target = args[i - 1] || {};

        for (; i < args.length; i++) {
            // Only deal with non-null/undefined values
            if (options = args[i]) {
                // Extend the base object
                for (propName in options) {
                    propValue = options[propName];

                    if (propValue !== undefined) {
                        propValue = options[propName];
                        target[propName] = (deep && IsPlainObject(target[propName])) ? Extend(deep, {}, propValue) : propValue;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    _This.$Extend = Extend;

    function Unextend(target, option) {
        $JssorDebug$.$Assert(option);

        var unextended = {};
        var name;
        var targetProp;
        var optionProp;

        // Extend the base object
        for (name in target) {
            targetProp = target[name];
            optionProp = option[name];

            if (targetProp !== optionProp) {
                var exclude;

                if (IsPlainObject(targetProp) && IsPlainObject(optionProp)) {
                    targetProp = Unextend(optionProp);
                    exclude = !IsNotEmpty(targetProp);
                }
                
                !exclude && (unextended[name] = targetProp);
            }
        }

        // Return the modified object
        return unextended;
    }

    _This.$Unextend = Unextend;

    _This.$IsFunction = function (obj) {
        return Type(obj) == "function";
    };

    _This.$IsArray = function (obj) {
        return Type(obj) == "array";
    };

    _This.$IsString = function (obj) {
        return Type(obj) == "string";
    };

    _This.$IsNumeric = function (obj) {
        return !isNaN(ParseFloat(obj)) && isFinite(obj);
    };

    _This.$Type = Type;

    // args is for internal usage only
    _This.$Each = Each;

    _This.$IsNotEmpty = IsNotEmpty;

    _This.$IsPlainObject = IsPlainObject;

    function CreateElement(tagName) {
        return document.createElement(tagName);
    }

    _This.$CreateElement = CreateElement;

    _This.$CreateDiv = function () {
        return CreateElement("DIV");
    };

    _This.$CreateSpan = function () {
        return CreateElement("SPAN");
    };

    _This.$EmptyFunction = function () { };

    function Attribute(elmt, name, value) {
        if (value == undefined)
            return elmt.getAttribute(name);

        elmt.setAttribute(name, value);
    }

    function AttributeEx(elmt, name) {
        return Attribute(elmt, name) || Attribute(elmt, "data-" + name);
    }

    _This.$Attribute = Attribute;
    _This.$AttributeEx = AttributeEx;

    function ClassName(elmt, className) {
        if (className == undefined)
            return elmt.className;

        elmt.className = className;
    }

    _This.$ClassName = ClassName;

    function ToHash(array) {
        var hash = {};

        Each(array, function (item) {
            hash[item] = item;
        });

        return hash;
    }

    function Split(str, separator) {
        return str.match(separator || REGEX_WHITESPACE_GLOBAL);
    }

    function StringToHashObject(str, regExp) {
        return ToHash(Split(str || "", regExp));
    }

    _This.$ToHash = ToHash;
    _This.$Split = Split;

    function Join(separator, strings) {
        ///	<param name="separator" type="String">
        ///	</param>
        ///	<param name="strings" type="Array" value="['1']">
        ///	</param>

        var joined = "";

        Each(strings, function (str) {
            joined && (joined += separator);
            joined += str;
        });

        return joined;
    }

    function ReplaceClass(elmt, oldClassName, newClassName) {
        ClassName(elmt, Join(" ", Extend(Unextend(StringToHashObject(ClassName(elmt)), StringToHashObject(oldClassName)), StringToHashObject(newClassName))));
    }

    _This.$Join = Join;

    _This.$AddClass = function (elmt, className) {
        ReplaceClass(elmt, null, className);
    };

    _This.$RemoveClass = ReplaceClass;

    _This.$ReplaceClass = ReplaceClass;

    _This.$ParentNode = function (elmt) {
        return elmt.parentNode;
    };

    _This.$HideElement = function (elmt) {
        _This.$CssDisplay(elmt, "none");
    };

    _This.$EnableElement = function (elmt, notEnable) {
        if (notEnable) {
            _This.$Attribute(elmt, "disabled", true);
        }
        else {
            _This.$RemoveAttribute(elmt, "disabled");
        }
    };

    _This.$HideElements = function (elmts) {
        for (var i = 0; i < elmts.length; i++) {
            _This.$HideElement(elmts[i]);
        }
    };

    _This.$ShowElement = function (elmt, hide) {
        _This.$CssDisplay(elmt, hide ? "none" : "");
    };

    _This.$ShowElements = function (elmts, hide) {
        for (var i = 0; i < elmts.length; i++) {
            _This.$ShowElement(elmts[i], hide);
        }
    };

    _This.$RemoveAttribute = function (elmt, attrbuteName) {
        elmt.removeAttribute(attrbuteName);
    };

    _This.$CanClearClip = function () {
        return IsBrowserIE() && _BrowserRuntimeVersion < 10;
    };

    _This.$SetStyleClip = function (elmt, clip) {
        if (clip) {
            elmt.style.clip = "rect(" + Math.round(clip.$Top) + "px " + Math.round(clip.$Right) + "px " + Math.round(clip.$Bottom) + "px " + Math.round(clip.$Left) + "px)";
        }
        else {
            var cssText = elmt.style.cssText;
            var clipRegs = [
                new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),
                new RegExp(/[\s]*cliptop: .*?[;]?/i),
                new RegExp(/[\s]*clipright: .*?[;]?/i),
                new RegExp(/[\s]*clipbottom: .*?[;]?/i),
                new RegExp(/[\s]*clipleft: .*?[;]?/i)
            ];

            var newCssText = BuildNewCss(cssText, clipRegs, "");

            $Jssor$.$CssCssText(elmt, newCssText);
        }
    };

    _This.$GetNow = function () {
        return new Date().getTime();
    };

    _This.$AppendChild = function (elmt, child) {
        elmt.appendChild(child);
    };

    _This.$AppendChildren = function (elmt, children) {
        Each(children, function (child) {
            _This.$AppendChild(elmt, child);
        });
    };

    _This.$InsertBefore = function (newNode, refNode, pNode) {
        ///	<summary>
        ///		Insert a node before a reference node
        ///	</summary>
        ///	<param name="newNode" type="HTMLElement">
        ///		A new node to insert
        ///	</param>
        ///	<param name="refNode" type="HTMLElement">
        ///		The reference node to insert a new node before
        ///	</param>
        ///	<param name="pNode" type="HTMLElement" optional="true">
        ///		The parent node to insert node to
        ///	</param>

        (pNode || refNode.parentNode).insertBefore(newNode, refNode);
    };

    _This.$InsertAfter = function (newNode, refNode, pNode) {
        ///	<summary>
        ///		Insert a node after a reference node
        ///	</summary>
        ///	<param name="newNode" type="HTMLElement">
        ///		A new node to insert
        ///	</param>
        ///	<param name="refNode" type="HTMLElement">
        ///		The reference node to insert a new node after
        ///	</param>
        ///	<param name="pNode" type="HTMLElement" optional="true">
        ///		The parent node to insert node to
        ///	</param>

        _This.$InsertBefore(newNode, refNode.nextSibling, pNode || refNode.parentNode);
    };

    _This.$InsertAdjacentHtml = function (elmt, where, html) {
        elmt.insertAdjacentHTML(where, html);
    };

    _This.$RemoveElement = function (elmt, pNode) {
        ///	<summary>
        ///		Remove element from parent node
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		The element to remove
        ///	</param>
        ///	<param name="pNode" type="HTMLElement" optional="true">
        ///		The parent node to remove elment from
        ///	</param>
        (pNode || elmt.parentNode).removeChild(elmt);
    };

    _This.$RemoveElements = function (elmts, pNode) {
        Each(elmts, function (elmt) {
            _This.$RemoveElement(elmt, pNode);
        });
    };

    _This.$Empty = function (elmt) {
        _This.$RemoveElements(_This.$Children(elmt, true), elmt);
    };

    _This.$ParseInt = function (str, radix) {
        return parseInt(str, radix || 10);
    };

    var ParseFloat = parseFloat;

    _This.$ParseFloat = ParseFloat;

    _This.$IsChild = function (elmtA, elmtB) {
        var body = document.body;

        while (elmtB && elmtA !== elmtB && body !== elmtB) {
            try {
                elmtB = elmtB.parentNode;
            } catch (e) {
                // Firefox sometimes fires events for XUL elements, which throws
                // a "permission denied" error. so this is not a child.
                return false;
            }
        }

        return elmtA === elmtB;
    };

    function CloneNode(elmt, noDeep, keepId) {
        var clone = elmt.cloneNode(!noDeep);
        if (!keepId) {
            _This.$RemoveAttribute(clone, "id");
        }

        return clone;
    }

    _This.$CloneNode = CloneNode;

    _This.$LoadImage = function (src, callback) {
        var image = new Image();

        function LoadImageCompleteHandler(event, abort) {
            _This.$RemoveEvent(image, "load", LoadImageCompleteHandler);
            _This.$RemoveEvent(image, "abort", ErrorOrAbortHandler);
            _This.$RemoveEvent(image, "error", ErrorOrAbortHandler);

            if (callback)
                callback(image, abort);
        }

        function ErrorOrAbortHandler(event) {
            LoadImageCompleteHandler(event, true);
        }

        if (IsBrowserOpera() && _BrowserRuntimeVersion < 11.6 || !src) {
            LoadImageCompleteHandler(!src);
        }
        else {

            _This.$AddEvent(image, "load", LoadImageCompleteHandler);
            _This.$AddEvent(image, "abort", ErrorOrAbortHandler);
            _This.$AddEvent(image, "error", ErrorOrAbortHandler);

            image.src = src;
        }
    };

    _This.$LoadImages = function (imageElmts, mainImageElmt, callback) {

        var _ImageLoading = imageElmts.length + 1;

        function LoadImageCompleteEventHandler(image, abort) {

            _ImageLoading--;
            if (mainImageElmt && image && image.src == mainImageElmt.src)
                mainImageElmt = image;
            !_ImageLoading && callback && callback(mainImageElmt);
        }

        Each(imageElmts, function (imageElmt) {
            _This.$LoadImage(imageElmt.src, LoadImageCompleteEventHandler);
        });

        LoadImageCompleteEventHandler();
    };

    _This.$BuildElement = function (template, tagName, replacer, createCopy) {
        if (createCopy)
            template = CloneNode(template);

        var templateHolders = FindChildren(template, tagName);
        if (!templateHolders.length)
            templateHolders = $Jssor$.$GetElementsByTag(template, tagName);

        for (var j = templateHolders.length - 1; j > -1; j--) {
            var templateHolder = templateHolders[j];
            var replaceItem = CloneNode(replacer);
            ClassName(replaceItem, ClassName(templateHolder));
            $Jssor$.$CssCssText(replaceItem, templateHolder.style.cssText);

            $Jssor$.$InsertBefore(replaceItem, templateHolder);
            $Jssor$.$RemoveElement(templateHolder);
        }

        return template;
    };

    function JssorButtonEx(elmt) {
        var _Self = this;

        var _OriginClassName = "";
        var _ToggleClassSuffixes = ["av", "pv", "ds", "dn"];
        var _ToggleClasses = [];
        var _ToggleClassName;

        var _IsMouseDown = 0;   //class name 'dn'
        var _IsSelected = 0;    //class name 1(active): 'av', 2(passive): 'pv'
        var _IsDisabled = 0;    //class name 'ds'

        function Highlight() {
            ReplaceClass(elmt, _ToggleClassName, _ToggleClasses[_IsDisabled || _IsMouseDown || (_IsSelected & 2) || _IsSelected]);
            $Jssor$.$Css(elmt, "pointer-events", _IsDisabled ? "none" : "");
        }

        function MouseUpOrCancelEventHandler(event) {
            _IsMouseDown = 0;

            Highlight();

            _This.$RemoveEvent(document, "mouseup", MouseUpOrCancelEventHandler);
            _This.$RemoveEvent(document, "touchend", MouseUpOrCancelEventHandler);
            _This.$RemoveEvent(document, "touchcancel", MouseUpOrCancelEventHandler);
        }

        function MouseDownEventHandler(event) {
            if (_IsDisabled) {
                _This.$CancelEvent(event);
            }
            else {

                _IsMouseDown = 4;

                Highlight();

                _This.$AddEvent(document, "mouseup", MouseUpOrCancelEventHandler);
                _This.$AddEvent(document, "touchend", MouseUpOrCancelEventHandler);
                _This.$AddEvent(document, "touchcancel", MouseUpOrCancelEventHandler);
            }
        }

        _Self.$Selected = function (activate) {
            if (activate != undefined) {
                _IsSelected = (activate & 2) || (activate & 1);

                Highlight();
            }
            else {
                return _IsSelected;
            }
        };

        _Self.$Enable = function (enable) {
            if (enable == undefined) {
                return !_IsDisabled;
            }

            _IsDisabled = enable ? 0 : 3;

            Highlight();
        };

        //JssorButtonEx Constructor
        {
            elmt = _This.$GetElement(elmt);

            var originalClassNameArray = $Jssor$.$Split(ClassName(elmt));
            if (originalClassNameArray)
                _OriginClassName = originalClassNameArray.shift();

            Each(_ToggleClassSuffixes, function (toggleClassSuffix) {
                _ToggleClasses.push(_OriginClassName +toggleClassSuffix);
            });

            _ToggleClassName = Join(" ", _ToggleClasses);

            _ToggleClasses.unshift("");

            _This.$AddEvent(elmt, "mousedown", MouseDownEventHandler);
            _This.$AddEvent(elmt, "touchstart", MouseDownEventHandler);
        }
    }

    _This.$Buttonize = function (elmt) {
        return new JssorButtonEx(elmt);
    };

    _This.$Css = Css;
    _This.$CssN = CssN;
    _This.$CssP = CssP;

    _This.$CssOverflow = CssProxy("overflow");

    _This.$CssTop = CssProxy("top", 2);
    _This.$CssLeft = CssProxy("left", 2);
    _This.$CssWidth = CssProxy("width", 2);
    _This.$CssHeight = CssProxy("height", 2);
    _This.$CssMarginLeft = CssProxy("marginLeft", 2);
    _This.$CssMarginTop = CssProxy("marginTop", 2);
    _This.$CssPosition = CssProxy("position");
    _This.$CssDisplay = CssProxy("display");
    _This.$CssZIndex = CssProxy("zIndex", 1);
    _This.$CssFloat = function (elmt, floatValue) {
        return Css(elmt, IsBrowserIE() ? "styleFloat" : "cssFloat", floatValue);
    };
    _This.$CssOpacity = function (elmt, opacity, ie9EarlierForce) {
        if (opacity != undefined) {
            SetStyleOpacity(elmt, opacity, ie9EarlierForce);
        }
        else {
            return GetStyleOpacity(elmt);
        }
    };

    _This.$CssCssText = function (elmt, text) {
        if (text != undefined) {
            elmt.style.cssText = text;
        }
        else {
            return elmt.style.cssText;
        }
    };

    var _StyleGetter = {
        $Opacity: _This.$CssOpacity,
        $Top: _This.$CssTop,
        $Left: _This.$CssLeft,
        $Width: _This.$CssWidth,
        $Height: _This.$CssHeight,
        $Position: _This.$CssPosition,
        $Display: _This.$CssDisplay,
        $ZIndex: _This.$CssZIndex
    };

    var _StyleSetterReserved;

    function StyleSetter() {
        if (!_StyleSetterReserved) {
            _StyleSetterReserved = Extend({
                $MarginTop: _This.$CssMarginTop,
                $MarginLeft: _This.$CssMarginLeft,
                $Clip: _This.$SetStyleClip,
                $Transform: _This.$SetStyleTransform
            }, _StyleGetter);
        }
        return _StyleSetterReserved;
    }

    function StyleSetterEx() {
        StyleSetter();

        //For Compression Only
        _StyleSetterReserved.$Transform = _StyleSetterReserved.$Transform;

        return _StyleSetterReserved;
    }

    _This.$StyleSetter = StyleSetter;

    _This.$StyleSetterEx = StyleSetterEx;

    _This.$GetStyles = function (elmt, originStyles) {
        StyleSetter();

        var styles = {};

        Each(originStyles, function (value, key) {
            if (_StyleGetter[key]) {
                styles[key] = _StyleGetter[key](elmt);
            }
        });

        return styles;
    };

    _This.$SetStyles = function (elmt, styles) {
        var styleSetter = StyleSetter();

        Each(styles, function (value, key) {
            styleSetter[key] && styleSetter[key](elmt, value);
        });
    };

    _This.$SetStylesEx = function (elmt, styles) {
        StyleSetterEx();

        _This.$SetStyles(elmt, styles);
    };

    var $JssorMatrix$ = new function () {
        var _ThisMatrix = this;

        function Multiply(ma, mb) {
            var acs = ma[0].length;
            var rows = ma.length;
            var cols = mb[0].length;

            var matrix = [];

            for (var r = 0; r < rows; r++) {
                var row = matrix[r] = [];
                for (var c = 0; c < cols; c++) {
                    var unitValue = 0;

                    for (var ac = 0; ac < acs; ac++) {
                        unitValue += ma[r][ac] * mb[ac][c];
                    }

                    row[c] = unitValue;
                }
            }

            return matrix;
        }

        _ThisMatrix.$ScaleX = function (matrix, sx) {
            return _ThisMatrix.$ScaleXY(matrix, sx, 0);
        };

        _ThisMatrix.$ScaleY = function (matrix, sy) {
            return _ThisMatrix.$ScaleXY(matrix, 0, sy);
        };

        _ThisMatrix.$ScaleXY = function (matrix, sx, sy) {
            return Multiply(matrix, [[sx, 0], [0, sy]]);
        };

        _ThisMatrix.$TransformPoint = function (matrix, p) {
            var pMatrix = Multiply(matrix, [[p.x], [p.y]]);

            return Point(pMatrix[0][0], pMatrix[1][0]);
        };
    };

    _This.$CreateMatrix = function (alpha, scaleX, scaleY) {
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);
        //var r11 = cos;
        //var r21 = sin;
        //var r12 = -sin;
        //var r22 = cos;

        //var m11 = cos * scaleX;
        //var m12 = -sin * scaleY;
        //var m21 = sin * scaleX;
        //var m22 = cos * scaleY;

        return [[cos * scaleX, -sin * scaleY], [sin * scaleX, cos * scaleY]];
    };

    _This.$GetMatrixOffset = function (matrix, width, height) {
        var p1 = $JssorMatrix$.$TransformPoint(matrix, Point(-width / 2, -height / 2));
        var p2 = $JssorMatrix$.$TransformPoint(matrix, Point(width / 2, -height / 2));
        var p3 = $JssorMatrix$.$TransformPoint(matrix, Point(width / 2, height / 2));
        var p4 = $JssorMatrix$.$TransformPoint(matrix, Point(-width / 2, height / 2));

        return Point(Math.min(p1.x, p2.x, p3.x, p4.x) + width / 2, Math.min(p1.y, p2.y, p3.y, p4.y) + height / 2);
    };

    _This.$Cast = function (fromStyles, difStyles, interPosition, easings, durings, rounds, options) {

        var currentStyles = difStyles;

        if (fromStyles) {
            currentStyles = {};

            for (var key in difStyles) {

                var round = rounds[key] || 1;
                var during = durings[key] || [0, 1];
                var propertyInterPosition = (interPosition - during[0]) / during[1];
                propertyInterPosition = Math.min(Math.max(propertyInterPosition, 0), 1);
                propertyInterPosition = propertyInterPosition * round;
                var floorPosition = Math.floor(propertyInterPosition);
                if (propertyInterPosition != floorPosition)
                    propertyInterPosition -= floorPosition;

                var easing = easings[key] || easings.$Default || $JssorEasing$.$EaseSwing;
                var easingValue = easing(propertyInterPosition);
                var currentPropertyValue;
                var value = fromStyles[key];
                var toValue = difStyles[key];
                var difValue = difStyles[key];

                if ($Jssor$.$IsNumeric(difValue)) {
                    currentPropertyValue = value + difValue * easingValue;
                }
                else {
                    currentPropertyValue = $Jssor$.$Extend({ $Offset: {} }, fromStyles[key]);

                    $Jssor$.$Each(difValue.$Offset, function (rectX, n) {
                        var offsetValue = rectX * easingValue;
                        currentPropertyValue.$Offset[n] = offsetValue;
                        currentPropertyValue[n] += offsetValue;
                    });
                }
                currentStyles[key] = currentPropertyValue;
            }

            if (difStyles.$Zoom || difStyles.$Rotate) {
                currentStyles.$Transform = { $Rotate: currentStyles.$Rotate || 0, $Scale: currentStyles.$Zoom, $OriginalWidth: options.$OriginalWidth, $OriginalHeight: options.$OriginalHeight };
            }
        }

        if (difStyles.$Clip && options.$Move) {
            var styleFrameNClipOffset = currentStyles.$Clip.$Offset;

            var offsetY = (styleFrameNClipOffset.$Top || 0) + (styleFrameNClipOffset.$Bottom || 0);
            var offsetX = (styleFrameNClipOffset.$Left || 0) + (styleFrameNClipOffset.$Right || 0);

            currentStyles.$Left = (currentStyles.$Left || 0) + offsetX;
            currentStyles.$Top = (currentStyles.$Top || 0) + offsetY;
            currentStyles.$Clip.$Left -= offsetX;
            currentStyles.$Clip.$Right -= offsetX;
            currentStyles.$Clip.$Top -= offsetY;
            currentStyles.$Clip.$Bottom -= offsetY;
        }

        if (currentStyles.$Clip && $Jssor$.$CanClearClip() && !currentStyles.$Clip.$Top && !currentStyles.$Clip.$Left && (currentStyles.$Clip.$Right == options.$OriginalWidth) && (currentStyles.$Clip.$Bottom == options.$OriginalHeight))
            currentStyles.$Clip = null;

        return currentStyles;
    };
};

//$JssorObject$
function $JssorObject$() {
    var _ThisObject = this;
    // Fields

    var _Listeners = []; // dictionary of eventName --> array of handlers
    var _Listenees = [];

    // Private Methods
    function AddListener(eventName, handler) {

        $JssorDebug$.$Execute(function () {
            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }

            $Jssor$.$Each(_Listeners, function (listener) {
                if (listener.$EventName == eventName && listener.$Handler === handler) {
                    throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");
                }
            });
        });

        _Listeners.push({ $EventName: eventName, $Handler: handler });
    }

    function RemoveListener(eventName, handler) {

        $JssorDebug$.$Execute(function () {
            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }
        });

        $Jssor$.$Each(_Listeners, function (listener, index) {
            if (listener.$EventName == eventName && listener.$Handler === handler) {
                _Listeners.splice(index, 1);
            }
        });
    }

    function ClearListeners() {
        _Listeners = [];
    }

    function ClearListenees() {

        $Jssor$.$Each(_Listenees, function (listenee) {
            $Jssor$.$RemoveEvent(listenee.$Obj, listenee.$EventName, listenee.$Handler);
        });

        _Listenees = [];
    }

    //Protected Methods
    _ThisObject.$Listen = function (obj, eventName, handler, useCapture) {

        $JssorDebug$.$Execute(function () {
            if (!obj)
                throw new Error("param 'obj' is null or empty.");

            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }

            $Jssor$.$Each(_Listenees, function (listenee) {
                if (listenee.$Obj === obj && listenee.$EventName == eventName && listenee.$Handler === handler) {
                    throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");
                }
            });
        });

        $Jssor$.$AddEvent(obj, eventName, handler, useCapture);
        _Listenees.push({ $Obj: obj, $EventName: eventName, $Handler: handler });
    };

    _ThisObject.$Unlisten = function (obj, eventName, handler) {

        $JssorDebug$.$Execute(function () {
            if (!obj)
                throw new Error("param 'obj' is null or empty.");

            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }
        });

        $Jssor$.$Each(_Listenees, function (listenee, index) {
            if (listenee.$Obj === obj && listenee.$EventName == eventName && listenee.$Handler === handler) {
                $Jssor$.$RemoveEvent(obj, eventName, handler);
                _Listenees.splice(index, 1);
            }
        });
    };

    _ThisObject.$UnlistenAll = ClearListenees;

    // Public Methods
    _ThisObject.$On = _ThisObject.addEventListener = AddListener;

    _ThisObject.$Off = _ThisObject.removeEventListener = RemoveListener;

    _ThisObject.$TriggerEvent = function (eventName) {

        var args = [].slice.call(arguments, 1);

        $Jssor$.$Each(_Listeners, function (listener) {
            listener.$EventName == eventName && listener.$Handler.apply(window, args);
        });
    };

    _ThisObject.$Destroy = function () {
        ClearListenees();
        ClearListeners();

        for (var name in _ThisObject)
            delete _ThisObject[name];
    };

    $JssorDebug$.$C_AbstractClass(_ThisObject);
};

function $JssorAnimator$(delay, duration, options, elmt, fromStyles, difStyles) {
    delay = delay || 0;

    var _ThisAnimator = this;
    var _AutoPlay;
    var _Hiden;
    var _CombineMode;
    var _PlayToPosition;
    var _PlayDirection;
    var _NoStop;
    var _TimeStampLastFrame = 0;

    var _SubEasings;
    var _SubRounds;
    var _SubDurings;
    var _Callback;

    var _Shift = 0;
    var _Position_Current = 0;
    var _Position_Display = 0;
    var _Hooked;

    var _Position_InnerBegin = delay;
    var _Position_InnerEnd = delay + duration;
    var _Position_OuterBegin;
    var _Position_OuterEnd;
    var _LoopLength;

    var _NestedAnimators = [];
    var _StyleSetter;

    function GetPositionRange(position, begin, end) {
        var range = 0;

        if (position < begin)
            range = -1;

        else if (position > end)
            range = 1;

        return range;
    }

    function GetInnerPositionRange(position) {
        return GetPositionRange(position, _Position_InnerBegin, _Position_InnerEnd);
    }

    function GetOuterPositionRange(position) {
        return GetPositionRange(position, _Position_OuterBegin, _Position_OuterEnd);
    }

    function Shift(offset) {
        _Position_OuterBegin += offset;
        _Position_OuterEnd += offset;
        _Position_InnerBegin += offset;
        _Position_InnerEnd += offset;

        _Position_Current += offset;
        _Position_Display += offset;

        _Shift = offset;
    }

    function Locate(position, relative) {
        var offset = position - _Position_OuterBegin + delay * relative;

        Shift(offset);

        //$JssorDebug$.$Execute(function () {
        //    _ThisAnimator.$Position_InnerBegin = _Position_InnerBegin;
        //    _ThisAnimator.$Position_InnerEnd = _Position_InnerEnd;
        //    _ThisAnimator.$Position_OuterBegin = _Position_OuterBegin;
        //    _ThisAnimator.$Position_OuterEnd = _Position_OuterEnd;
        //});

        return _Position_OuterEnd;
    }

    function GoToPosition(positionOuter, force) {
        var trimedPositionOuter = positionOuter;

        if (_LoopLength && (trimedPositionOuter >= _Position_OuterEnd || trimedPositionOuter <= _Position_OuterBegin)) {
            trimedPositionOuter = ((trimedPositionOuter - _Position_OuterBegin) % _LoopLength + _LoopLength) % _LoopLength + _Position_OuterBegin;
        }

        if (!_Hooked || _NoStop || force || _Position_Current != trimedPositionOuter) {

            var positionToDisplay = Math.min(trimedPositionOuter, _Position_OuterEnd);
            positionToDisplay = Math.max(positionToDisplay, _Position_OuterBegin);

            if (!_Hooked || _NoStop || force || positionToDisplay != _Position_Display) {

                if (difStyles) {

                    var interPosition = (positionToDisplay - _Position_InnerBegin) / (duration || 1);

                    if (options.$Reverse)
                        interPosition = 1 - interPosition;

                    var currentStyles = $Jssor$.$Cast(fromStyles, difStyles, interPosition, _SubEasings, _SubDurings, _SubRounds, options);

                    $Jssor$.$Each(currentStyles, function (value, key) {
                        _StyleSetter[key] && _StyleSetter[key](elmt, value);
                    });
                }

                _ThisAnimator.$OnInnerOffsetChange(_Position_Display - _Position_InnerBegin, positionToDisplay - _Position_InnerBegin);

                _Position_Display = positionToDisplay;

                $Jssor$.$Each(_NestedAnimators, function (animator, i) {
                    var nestedAnimator = positionOuter < _Position_Current ? _NestedAnimators[_NestedAnimators.length - i - 1] : animator;
                    nestedAnimator.$GoToPosition(_Position_Display - _Shift, force);
                });

                var positionOld = _Position_Current;
                var positionNew = _Position_Display;

                _Position_Current = trimedPositionOuter;
                _Hooked = true;

                _ThisAnimator.$OnPositionChange(positionOld, positionNew);
            }
        }
    }

    function Join(animator, combineMode, noExpand) {
        ///	<summary>
        ///		Combine another animator as nested animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        ///	<param name="combineMode" type="int">
        ///		0: parallel - place the animator parallel to this animator.
        ///		1: chain - chain the animator at the _Position_InnerEnd of this animator.
        ///	</param>
        $JssorDebug$.$Execute(function () {
            if (combineMode !== 0 && combineMode !== 1)
                $JssorDebug$.$Fail("Argument out of range, the value of 'combineMode' should be either 0 or 1.");
        });

        if (combineMode)
            animator.$Locate(_Position_OuterEnd, 1);

        if (!noExpand) {
            _Position_OuterBegin = Math.min(_Position_OuterBegin, animator.$GetPosition_OuterBegin() + _Shift);
            _Position_OuterEnd = Math.max(_Position_OuterEnd, animator.$GetPosition_OuterEnd() + _Shift);
        }
        _NestedAnimators.push(animator);
    }

    var RequestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame;

    if ($Jssor$.$IsBrowserSafari() && $Jssor$.$BrowserVersion() < 7) {
        RequestAnimationFrame = null;

        //$JssorDebug$.$Log("Custom animation frame for safari before 7.");
    }

    RequestAnimationFrame = RequestAnimationFrame || function (callback) {
        $Jssor$.$Delay(callback, options.$Interval);
    };

    function ShowFrame() {
        if (_AutoPlay) {
            var now = $Jssor$.$GetNow();
            var timeOffset = Math.min(now - _TimeStampLastFrame, options.$IntervalMax);
            var timePosition = _Position_Current + timeOffset * _PlayDirection;
            _TimeStampLastFrame = now;

            if (timePosition * _PlayDirection >= _PlayToPosition * _PlayDirection)
                timePosition = _PlayToPosition;

            GoToPosition(timePosition);

            if (!_NoStop && timePosition * _PlayDirection >= _PlayToPosition * _PlayDirection) {
                Stop(_Callback);
            }
            else {
                RequestAnimationFrame(ShowFrame);
            }
        }
    }

    function PlayToPosition(toPosition, callback, noStop) {
        if (!_AutoPlay) {
            _AutoPlay = true;
            _NoStop = noStop
            _Callback = callback;
            toPosition = Math.max(toPosition, _Position_OuterBegin);
            toPosition = Math.min(toPosition, _Position_OuterEnd);
            _PlayToPosition = toPosition;
            _PlayDirection = _PlayToPosition < _Position_Current ? -1 : 1;
            _ThisAnimator.$OnStart();
            _TimeStampLastFrame = $Jssor$.$GetNow();
            RequestAnimationFrame(ShowFrame);
        }
    }

    function Stop(callback) {
        if (_AutoPlay) {
            _NoStop = _AutoPlay = _Callback = false;
            _ThisAnimator.$OnStop();

            if (callback)
                callback();
        }
    }

    _ThisAnimator.$Play = function (positionLength, callback, noStop) {
        PlayToPosition(positionLength ? _Position_Current + positionLength : _Position_OuterEnd, callback, noStop);
    };

    _ThisAnimator.$PlayToPosition = PlayToPosition;

    _ThisAnimator.$PlayToBegin = function (callback, noStop) {
        PlayToPosition(_Position_OuterBegin, callback, noStop);
    };

    _ThisAnimator.$PlayToEnd = function (callback, noStop) {
        PlayToPosition(_Position_OuterEnd, callback, noStop);
    };

    _ThisAnimator.$Stop = Stop;

    _ThisAnimator.$Continue = function (toPosition) {
        PlayToPosition(toPosition);
    };

    _ThisAnimator.$GetPosition = function () {
        return _Position_Current;
    };

    _ThisAnimator.$GetPlayToPosition = function () {
        return _PlayToPosition;
    };

    _ThisAnimator.$GetPosition_Display = function () {
        return _Position_Display;
    };

    _ThisAnimator.$GoToPosition = GoToPosition;

    _ThisAnimator.$GoToBegin = function () {
        GoToPosition(_Position_OuterBegin, true);
    };

    _ThisAnimator.$GoToEnd = function () {
        GoToPosition(_Position_OuterEnd, true);
    };

    _ThisAnimator.$Move = function (offset) {
        GoToPosition(_Position_Current + offset);
    };

    _ThisAnimator.$CombineMode = function () {
        return _CombineMode;
    };

    _ThisAnimator.$GetDuration = function () {
        return duration;
    };

    _ThisAnimator.$IsPlaying = function () {
        return _AutoPlay;
    };

    _ThisAnimator.$IsOnTheWay = function () {
        return _Position_Current > _Position_InnerBegin && _Position_Current <= _Position_InnerEnd;
    };

    _ThisAnimator.$SetLoopLength = function (length) {
        _LoopLength = length;
    };

    _ThisAnimator.$Locate = Locate;

    _ThisAnimator.$Shift = Shift;

    _ThisAnimator.$Join = Join;

    _ThisAnimator.$Combine = function (animator) {
        ///	<summary>
        ///		Combine another animator parallel to this animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        Join(animator, 0);
    };

    _ThisAnimator.$Chain = function (animator) {
        ///	<summary>
        ///		Chain another animator at the _Position_InnerEnd of this animator
        ///	</summary>
        ///	<param name="animator" type="$JssorAnimator$">
        ///		An instance of $JssorAnimator$
        ///	</param>
        Join(animator, 1);
    };

    _ThisAnimator.$GetPosition_InnerBegin = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_InnerBegin;
    };

    _ThisAnimator.$GetPosition_InnerEnd = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_InnerEnd;
    };

    _ThisAnimator.$GetPosition_OuterBegin = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_OuterBegin;
    };

    _ThisAnimator.$GetPosition_OuterEnd = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_OuterEnd;
    };

    _ThisAnimator.$OnPositionChange = _ThisAnimator.$OnStart = _ThisAnimator.$OnStop = _ThisAnimator.$OnInnerOffsetChange = $Jssor$.$EmptyFunction;
    _ThisAnimator.$Version = $Jssor$.$GetNow();

    //Constructor  1
    {
        options = $Jssor$.$Extend({
            $Interval: 16,
            $IntervalMax: 50
        }, options);

        //Sodo statement, for development time intellisence only
        $JssorDebug$.$Execute(function () {
            options = $Jssor$.$Extend({
                $LoopLength: undefined,
                $Setter: undefined,
                $Easing: undefined
            }, options);
        });

        _LoopLength = options.$LoopLength;

        _StyleSetter = $Jssor$.$Extend({}, $Jssor$.$StyleSetter(), options.$Setter);

        _Position_OuterBegin = _Position_InnerBegin = delay;
        _Position_OuterEnd = _Position_InnerEnd = delay + duration;

        _SubRounds = options.$Round || {};
        _SubDurings = options.$During || {};
        _SubEasings = $Jssor$.$Extend({ $Default: $Jssor$.$IsFunction(options.$Easing) && options.$Easing || $JssorEasing$.$EaseSwing }, options.$Easing);
    }
};

function $JssorPlayerClass$() {

    var _ThisPlayer = this;
    var _PlayerControllers = [];

    function PlayerController(playerElement) {
        var _SelfPlayerController = this;
        var _PlayerInstance;
        var _PlayerInstantces = [];

        function OnPlayerInstanceDataAvailable(event) {
            var srcElement = $Jssor$.$EvtSrc(event);
            _PlayerInstance = srcElement.pInstance;

            $Jssor$.$RemoveEvent(srcElement, "dataavailable", OnPlayerInstanceDataAvailable);
            $Jssor$.$Each(_PlayerInstantces, function (playerInstance) {
                if (playerInstance != _PlayerInstance) {
                    playerInstance.$Remove();
                }
            });

            playerElement.pTagName = _PlayerInstance.tagName;
            _PlayerInstantces = null;
        }

        function HandlePlayerInstance(playerInstanceElement) {
            var playerHandler;

            if (!playerInstanceElement.pInstance) {
                var playerHandlerAttribute = $Jssor$.$AttributeEx(playerInstanceElement, "pHandler");

                if ($JssorPlayer$[playerHandlerAttribute]) {
                    $Jssor$.$AddEvent(playerInstanceElement, "dataavailable", OnPlayerInstanceDataAvailable);
                    playerHandler = new $JssorPlayer$[playerHandlerAttribute](playerElement, playerInstanceElement);
                    _PlayerInstantces.push(playerHandler);

                    $JssorDebug$.$Execute(function () {
                        if ($Jssor$.$Type(playerHandler.$Remove) != "function") {
                            $JssorDebug$.$Fail("'pRemove' interface not implemented for player handler '" + playerHandlerAttribute + "'.");
                        }
                    });
                }
            }

            return playerHandler;
        }

        _SelfPlayerController.$InitPlayerController = function () {
            if (!playerElement.pInstance && !HandlePlayerInstance(playerElement)) {

                var playerInstanceElements = $Jssor$.$Children(playerElement);

                $Jssor$.$Each(playerInstanceElements, function (playerInstanceElement) {
                    HandlePlayerInstance(playerInstanceElement);
                });
            }
        };
    }

    _ThisPlayer.$EVT_SWITCH = 21;

    _ThisPlayer.$FetchPlayers = function (elmt) {
        elmt = elmt || document.body;

        var playerElements = $Jssor$.$FindChildren(elmt, "player");

        $Jssor$.$Each(playerElements, function (playerElement) {
            if (!_PlayerControllers[playerElement.pId]) {
                playerElement.pId = _PlayerControllers.length;
                _PlayerControllers.push(new PlayerController(playerElement));
            }
            var playerController = _PlayerControllers[playerElement.pId];
            playerController.$InitPlayerController();
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqc3Nvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIEpzc29yIDE5LjBcclxuKiBodHRwOi8vd3d3Lmpzc29yLmNvbS9cclxuKlxyXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcclxuKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4qIFxyXG4qIFRFUk1TIE9GIFVTRSAtIEpzc29yXHJcbiogXHJcbiogQ29weXJpZ2h0IDIwMTQgSnNzb3JcclxuKlxyXG4qIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xyXG4qIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxyXG4qIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xyXG4qIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcclxuKiBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cclxuKiBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG9cclxuKiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogXHJcbiogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcclxuKiBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuKiBcclxuKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxyXG4qIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxyXG4qIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXHJcbiogTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRVxyXG4qIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT05cclxuKiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cclxuKiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuXHJcbi8qISBKc3NvciAqL1xyXG5cclxuLy8kSnNzb3JEZWJ1ZyRcclxudmFyICRKc3NvckRlYnVnJCA9IG5ldyBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdGhpcy4kRGVidWdNb2RlID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBNZXRob2RzXHJcblxyXG4gICAgdGhpcy4kTG9nID0gZnVuY3Rpb24gKG1zZywgaW1wb3J0YW50KSB7XHJcbiAgICAgICAgdmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7fTtcclxuICAgICAgICB2YXIgZGVidWcgPSB0aGlzLiREZWJ1Z01vZGU7XHJcblxyXG4gICAgICAgIGlmIChkZWJ1ZyAmJiBjb25zb2xlLmxvZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVidWcgJiYgaW1wb3J0YW50KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLiRFcnJvciA9IGZ1bmN0aW9uIChtc2csIGUpIHtcclxuICAgICAgICB2YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlIHx8IHt9O1xyXG4gICAgICAgIHZhciBkZWJ1ZyA9IHRoaXMuJERlYnVnTW9kZTtcclxuXHJcbiAgICAgICAgaWYgKGRlYnVnICYmIGNvbnNvbGUuZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVidWcpIHtcclxuICAgICAgICAgICAgYWxlcnQobXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZWJ1Zykge1xyXG4gICAgICAgICAgICAvLyBzaW5jZSB3ZSdyZSBkZWJ1Z2dpbmcsIGZhaWwgZmFzdCBieSBjcmFzaGluZ1xyXG4gICAgICAgICAgICB0aHJvdyBlIHx8IG5ldyBFcnJvcihtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy4kRmFpbCA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy4kQXNzZXJ0ID0gZnVuY3Rpb24gKHZhbHVlLCBtc2cpIHtcclxuICAgICAgICB2YXIgZGVidWcgPSB0aGlzLiREZWJ1Z01vZGU7XHJcbiAgICAgICAgaWYgKGRlYnVnKSB7XHJcbiAgICAgICAgICAgIGlmICghdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBc3NlcnQgZmFpbGVkIFwiICsgbXNnIHx8IFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy4kVHJhY2UgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgdmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7fTtcclxuICAgICAgICB2YXIgZGVidWcgPSB0aGlzLiREZWJ1Z01vZGU7XHJcblxyXG4gICAgICAgIGlmIChkZWJ1ZyAmJiBjb25zb2xlLmxvZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy4kRXhlY3V0ZSA9IGZ1bmN0aW9uIChmdW5jKSB7XHJcbiAgICAgICAgdmFyIGRlYnVnID0gdGhpcy4kRGVidWdNb2RlO1xyXG4gICAgICAgIGlmIChkZWJ1ZylcclxuICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLiRMaXZlU3RhbXAgPSBmdW5jdGlvbiAob2JqLCBpZCkge1xyXG4gICAgICAgIHZhciBkZWJ1ZyA9IHRoaXMuJERlYnVnTW9kZTtcclxuICAgICAgICBpZiAoZGVidWcpIHtcclxuICAgICAgICAgICAgdmFyIHN0YW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcclxuICAgICAgICAgICAgc3RhbXAuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xyXG5cclxuICAgICAgICAgICAgb2JqLiRMaXZlID0gc3RhbXA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLiRDX0Fic3RyYWN0UHJvcGVydHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0VGVsbHMgY29tcGlsZXIgdGhlIHByb3BlcnR5IGlzIGFic3RyYWN0LCBpdCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgc3ViY2xhc3MuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBwcm9wZXJ0eSBpcyBhYnN0cmFjdCwgaXQgc2hvdWxkIGJlIGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzLlwiKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy4kQ19BYnN0cmFjdE1ldGhvZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRUZWxscyBjb21waWxlciB0aGUgbWV0aG9kIGlzIGFic3RyYWN0LCBpdCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgc3ViY2xhc3MuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBtZXRob2QgaXMgYWJzdHJhY3QsIGl0IHNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBzdWJjbGFzcy5cIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIENfQWJzdHJhY3RDbGFzcyhpbnN0YW5jZSkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdFRlbGxzIGNvbXBpbGVyIHRoZSBjbGFzcyBpcyBhYnN0cmFjdCwgaXQgc2hvdWxkIGJlIGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzLlxyXG4gICAgICAgIC8vL1x0PC9zdW1tYXJ5PlxyXG5cclxuICAgICAgICBpZiAoaW5zdGFuY2UuY29uc3RydWN0b3IgPT09IENfQWJzdHJhY3RDbGFzcy5jYWxsZXIpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjcmVhdGUgaW5zdGFuY2Ugb2YgYW4gYWJzdHJhY3QgY2xhc3MuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJENfQWJzdHJhY3RDbGFzcyA9IENfQWJzdHJhY3RDbGFzcztcclxufTtcclxuXHJcbi8vJEpzc29yRWFzaW5nJFxyXG52YXIgJEpzc29yRWFzaW5nJCA9IHdpbmRvdy4kSnNzb3JFYXNpbmckID0ge1xyXG4gICAgJEVhc2VTd2luZzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gLU1hdGguY29zKHQgKiBNYXRoLlBJKSAvIDIgKyAuNTtcclxuICAgIH0sXHJcbiAgICAkRWFzZUxpbmVhcjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH0sXHJcbiAgICAkRWFzZUluUXVhZDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gdCAqIHQ7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VPdXRRdWFkOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiAtdCAqICh0IC0gMik7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VJbk91dFF1YWQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuICh0ICo9IDIpIDwgMSA/IDEgLyAyICogdCAqIHQgOiAtMSAvIDIgKiAoLS10ICogKHQgLSAyKSAtIDEpO1xyXG4gICAgfSxcclxuICAgICRFYXNlSW5DdWJpYzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gdCAqIHQgKiB0O1xyXG4gICAgfSxcclxuICAgICRFYXNlT3V0Q3ViaWM6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuICh0IC09IDEpICogdCAqIHQgKyAxO1xyXG4gICAgfSxcclxuICAgICRFYXNlSW5PdXRDdWJpYzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gKHQgKj0gMikgPCAxID8gMSAvIDIgKiB0ICogdCAqIHQgOiAxIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMik7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VJblF1YXJ0OiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiB0ICogdCAqIHQgKiB0O1xyXG4gICAgfSxcclxuICAgICRFYXNlT3V0UXVhcnQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuIC0oKHQgLT0gMSkgKiB0ICogdCAqIHQgLSAxKTtcclxuICAgIH0sXHJcbiAgICAkRWFzZUluT3V0UXVhcnQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuICh0ICo9IDIpIDwgMSA/IDEgLyAyICogdCAqIHQgKiB0ICogdCA6IC0xIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpO1xyXG4gICAgfSxcclxuICAgICRFYXNlSW5RdWludDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gdCAqIHQgKiB0ICogdCAqIHQ7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VPdXRRdWludDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gKHQgLT0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMTtcclxuICAgIH0sXHJcbiAgICAkRWFzZUluT3V0UXVpbnQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuICh0ICo9IDIpIDwgMSA/IDEgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgOiAxIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKTtcclxuICAgIH0sXHJcbiAgICAkRWFzZUluU2luZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gMSAtIE1hdGguY29zKHQgKiBNYXRoLlBJIC8gMik7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VPdXRTaW5lOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNpbih0ICogTWF0aC5QSSAvIDIpO1xyXG4gICAgfSxcclxuICAgICRFYXNlSW5PdXRTaW5lOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiAtMSAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQpIC0gMSk7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VJbkV4cG86IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQgPT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xyXG4gICAgfSxcclxuICAgICRFYXNlT3V0RXhwbzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gdCA9PSAxID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiB0KSArIDE7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VJbk91dEV4cG86IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQgPT0gMCB8fCB0ID09IDEgPyB0IDogKHQgKj0gMikgPCAxID8gMSAvIDIgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpIDogMSAvIDIgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKTtcclxuICAgIH0sXHJcbiAgICAkRWFzZUluQ2lyYzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xyXG4gICAgfSxcclxuICAgICRFYXNlT3V0Q2lyYzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSAodCAtPSAxKSAqIHQpO1xyXG4gICAgfSxcclxuICAgICRFYXNlSW5PdXRDaXJjOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiAodCAqPSAyKSA8IDEgPyAtMSAvIDIgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSA6IDEgLyAyICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpO1xyXG4gICAgfSxcclxuICAgICRFYXNlSW5FbGFzdGljOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIGlmICghdCB8fCB0ID09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIHZhciBwID0gLjMsIHMgPSAuMDc1O1xyXG4gICAgICAgIHJldHVybiAtKE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqIDIgKiBNYXRoLlBJIC8gcCkpO1xyXG4gICAgfSxcclxuICAgICRFYXNlT3V0RWxhc3RpYzogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICBpZiAoIXQgfHwgdCA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB2YXIgcCA9IC4zLCBzID0gLjA3NTtcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAtIHMpICogMiAqIE1hdGguUEkgLyBwKSArIDE7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VJbk91dEVsYXN0aWM6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgaWYgKCF0IHx8IHQgPT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgdmFyIHAgPSAuNDUsIHMgPSAuMTEyNTtcclxuICAgICAgICByZXR1cm4gKHQgKj0gMikgPCAxID8gLS41ICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogMiAqIE1hdGguUEkgLyBwKSA6IE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAyICogTWF0aC5QSSAvIHApICogLjUgKyAxO1xyXG4gICAgfSxcclxuICAgICRFYXNlSW5CYWNrOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcclxuICAgICAgICByZXR1cm4gdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcclxuICAgIH0sXHJcbiAgICAkRWFzZU91dEJhY2s6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgIHJldHVybiAodCAtPSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDE7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VJbk91dEJhY2s6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgIHJldHVybiAodCAqPSAyKSA8IDEgPyAxIC8gMiAqIHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSA6IDEgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKTtcclxuICAgIH0sXHJcbiAgICAkRWFzZUluQm91bmNlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiAxIC0gJEpzc29yRWFzaW5nJC4kRWFzZU91dEJvdW5jZSgxIC0gdClcclxuICAgIH0sXHJcbiAgICAkRWFzZU91dEJvdW5jZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gdCA8IDEgLyAyLjc1ID8gNy41NjI1ICogdCAqIHQgOiB0IDwgMiAvIDIuNzUgPyA3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAuNzUgOiB0IDwgMi41IC8gMi43NSA/IDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAuOTM3NSA6IDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgLjk4NDM3NTtcclxuICAgIH0sXHJcbiAgICAkRWFzZUluT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiB0IDwgMSAvIDIgPyAkSnNzb3JFYXNpbmckLiRFYXNlSW5Cb3VuY2UodCAqIDIpICogLjUgOiAkSnNzb3JFYXNpbmckLiRFYXNlT3V0Qm91bmNlKHQgKiAyIC0gMSkgKiAuNSArIC41O1xyXG4gICAgfSxcclxuICAgICRFYXNlR29CYWNrOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiAxIC0gTWF0aC5hYnMoKHQgKj0gMikgLSAxKTtcclxuICAgIH0sXHJcbiAgICAkRWFzZUluV2F2ZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gMSAtIE1hdGguY29zKHQgKiBNYXRoLlBJICogMilcclxuICAgIH0sXHJcbiAgICAkRWFzZU91dFdhdmU6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgKiBNYXRoLlBJICogMik7XHJcbiAgICB9LFxyXG4gICAgJEVhc2VPdXRKdW1wOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiAxIC0gKCgodCAqPSAyKSA8IDEpID8gKHQgPSAxIC0gdCkgKiB0ICogdCA6ICh0IC09IDEpICogdCAqIHQpO1xyXG4gICAgfSxcclxuICAgICRFYXNlSW5KdW1wOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiAoKHQgKj0gMikgPCAxKSA/IHQgKiB0ICogdCA6ICh0ID0gMiAtIHQpICogdCAqIHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgJEpzc29yRGlyZWN0aW9uJCA9IHdpbmRvdy4kSnNzb3JEaXJlY3Rpb24kID0ge1xyXG4gICAgJFRPX0xFRlQ6IDB4MDAwMSxcclxuICAgICRUT19SSUdIVDogMHgwMDAyLFxyXG4gICAgJFRPX1RPUDogMHgwMDA0LFxyXG4gICAgJFRPX0JPVFRPTTogMHgwMDA4LFxyXG4gICAgJEhPUklaT05UQUw6IDB4MDAwMyxcclxuICAgICRWRVJUSUNBTDogMHgwMDBDLFxyXG4gICAgLy8kTEVGVFJJR0hUOiAweDAwMDMsXHJcbiAgICAvLyRUT1BCT1RPTTogMHgwMDBDLFxyXG4gICAgLy8kVE9QTEVGVDogMHgwMDA1LFxyXG4gICAgLy8kVE9QUklHSFQ6IDB4MDAwNixcclxuICAgIC8vJEJPVFRPTUxFRlQ6IDB4MDAwOSxcclxuICAgIC8vJEJPVFRPTVJJR0hUOiAweDAwMEEsXHJcbiAgICAvLyRBUk9VTkQ6IDB4MDAwRixcclxuXHJcbiAgICAkR2V0RGlyZWN0aW9uSG9yaXpvbnRhbDogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBkaXJlY3Rpb24gJiAweDAwMDM7XHJcbiAgICB9LFxyXG4gICAgJEdldERpcmVjdGlvblZlcnRpY2FsOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbiAmIDB4MDAwQztcclxuICAgIH0sXHJcbiAgICAvLyRDaGVzc0hvcml6b250YWw6IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgIC8vICAgIHJldHVybiAofmRpcmVjdGlvbiAmIDB4MDAwMykgKyAoZGlyZWN0aW9uICYgMHgwMDBDKTtcclxuICAgIC8vfSxcclxuICAgIC8vJENoZXNzVmVydGljYWw6IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgIC8vICAgIHJldHVybiAofmRpcmVjdGlvbiAmIDB4MDAwQykgKyAoZGlyZWN0aW9uICYgMHgwMDAzKTtcclxuICAgIC8vfSxcclxuICAgIC8vJElzVG9MZWZ0OiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XHJcbiAgICAvLyAgICByZXR1cm4gKGRpcmVjdGlvbiAmIDB4MDAwMykgPT0gMHgwMDAxO1xyXG4gICAgLy99LFxyXG4gICAgLy8kSXNUb1JpZ2h0OiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XHJcbiAgICAvLyAgICByZXR1cm4gKGRpcmVjdGlvbiAmIDB4MDAwMykgPT0gMHgwMDAyO1xyXG4gICAgLy99LFxyXG4gICAgLy8kSXNUb1RvcDogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgLy8gICAgcmV0dXJuIChkaXJlY3Rpb24gJiAweDAwMEMpID09IDB4MDAwNDtcclxuICAgIC8vfSxcclxuICAgIC8vJElzVG9Cb3R0b206IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgIC8vICAgIHJldHVybiAoZGlyZWN0aW9uICYgMHgwMDBDKSA9PSAweDAwMDg7XHJcbiAgICAvL30sXHJcbiAgICAkSXNIb3Jpem9udGFsOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbiAmIDB4MDAwMztcclxuICAgIH0sXHJcbiAgICAkSXNWZXJ0aWNhbDogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBkaXJlY3Rpb24gJiAweDAwMEM7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgJEpzc29yS2V5Q29kZSQgPSB7XHJcbiAgICAkQkFDS1NQQUNFOiA4LFxyXG4gICAgJENPTU1BOiAxODgsXHJcbiAgICAkREVMRVRFOiA0NixcclxuICAgICRET1dOOiA0MCxcclxuICAgICRFTkQ6IDM1LFxyXG4gICAgJEVOVEVSOiAxMyxcclxuICAgICRFU0NBUEU6IDI3LFxyXG4gICAgJEhPTUU6IDM2LFxyXG4gICAgJExFRlQ6IDM3LFxyXG4gICAgJE5VTVBBRF9BREQ6IDEwNyxcclxuICAgICROVU1QQURfREVDSU1BTDogMTEwLFxyXG4gICAgJE5VTVBBRF9ESVZJREU6IDExMSxcclxuICAgICROVU1QQURfRU5URVI6IDEwOCxcclxuICAgICROVU1QQURfTVVMVElQTFk6IDEwNixcclxuICAgICROVU1QQURfU1VCVFJBQ1Q6IDEwOSxcclxuICAgICRQQUdFX0RPV046IDM0LFxyXG4gICAgJFBBR0VfVVA6IDMzLFxyXG4gICAgJFBFUklPRDogMTkwLFxyXG4gICAgJFJJR0hUOiAzOSxcclxuICAgICRTUEFDRTogMzIsXHJcbiAgICAkVEFCOiA5LFxyXG4gICAgJFVQOiAzOFxyXG59O1xyXG5cclxuLy8gJEpzc29yJCBpcyBhIHN0YXRpYyBjbGFzcywgc28gbWFrZSBpdCBzaW5nbGV0b24gaW5zdGFuY2VcclxudmFyICRKc3NvciQgPSB3aW5kb3cuJEpzc29yJCA9IG5ldyBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX1RoaXMgPSB0aGlzO1xyXG5cclxuICAgIC8vI3JlZ2lvbiBDb25zdGFudHNcclxuICAgIHZhciBSRUdFWF9XSElURVNQQUNFX0dMT0JBTCA9IC9cXFMrL2c7XHJcbiAgICB2YXIgUk9XU0VSX09USEVSID0gLTE7XHJcbiAgICB2YXIgUk9XU0VSX1VOS05PV04gPSAwO1xyXG4gICAgdmFyIEJST1dTRVJfSUUgPSAxO1xyXG4gICAgdmFyIEJST1dTRVJfRklSRUZPWCA9IDI7XHJcbiAgICB2YXIgQlJPV1NFUl9TQUZBUkkgPSAzO1xyXG4gICAgdmFyIEJST1dTRVJfQ0hST01FID0gNDtcclxuICAgIHZhciBCUk9XU0VSX09QRVJBID0gNTtcclxuICAgIC8vdmFyIGFyckFjdGl2ZVggPSBbXCJNc3htbDIuWE1MSFRUUFwiLCBcIk1zeG1sMy5YTUxIVFRQXCIsIFwiTWljcm9zb2Z0LlhNTEhUVFBcIl07XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gVmFyaWFibGVzXHJcbiAgICB2YXIgX0RldmljZTtcclxuICAgIHZhciBfQnJvd3NlciA9IDA7XHJcbiAgICB2YXIgX0Jyb3dzZXJSdW50aW1lVmVyc2lvbiA9IDA7XHJcbiAgICB2YXIgX0Jyb3dzZXJFbmdpbmVWZXJzaW9uID0gMDtcclxuICAgIHZhciBfQnJvd3NlckphdmFzY3JpcHRWZXJzaW9uID0gMDtcclxuICAgIHZhciBfV2Via2l0VmVyc2lvbiA9IDA7XHJcblxyXG4gICAgdmFyIF9OYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XHJcbiAgICB2YXIgX0FwcE5hbWUgPSBfTmF2aWdhdG9yLmFwcE5hbWU7XHJcbiAgICB2YXIgX0FwcFZlcnNpb24gPSBfTmF2aWdhdG9yLmFwcFZlcnNpb247XHJcbiAgICB2YXIgX1VzZXJBZ2VudCA9IF9OYXZpZ2F0b3IudXNlckFnZW50O1xyXG5cclxuICAgIHZhciBfRG9jRWxtdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgIHZhciBfVHJhbnNmb3JtUHJvcGVydHk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICBmdW5jdGlvbiBEZXZpY2UoKSB7XHJcbiAgICAgICAgaWYgKCFfRGV2aWNlKSB7XHJcbiAgICAgICAgICAgIF9EZXZpY2UgPSB7ICRUb3VjaGFibGU6IFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93IHx8IFwiY3JlYXRlVG91Y2hcIiBpbiBkb2N1bWVudCB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG1zUHJlZml4O1xyXG4gICAgICAgICAgICBpZiAoKF9OYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgfHwgKG1zUHJlZml4ID0gX05hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkKSkpIHtcclxuICAgICAgICAgICAgICAgIF9EZXZpY2UuJFRvdWNoQWN0aW9uQXR0ciA9IG1zUHJlZml4ID8gXCJtc1RvdWNoQWN0aW9uXCIgOiBcInRvdWNoQWN0aW9uXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfRGV2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIERldGVjdEJyb3dzZXIoYnJvd3Nlcikge1xyXG4gICAgICAgIGlmICghX0Jyb3dzZXIpIHtcclxuICAgICAgICAgICAgX0Jyb3dzZXIgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfQXBwTmFtZSA9PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmXHJcbiAgICAgICAgICAgICAgICAhIXdpbmRvdy5hdHRhY2hFdmVudCAmJiAhIXdpbmRvdy5BY3RpdmVYT2JqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGllT2Zmc2V0ID0gX1VzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKTtcclxuICAgICAgICAgICAgICAgIF9Ccm93c2VyID0gQlJPV1NFUl9JRTtcclxuICAgICAgICAgICAgICAgIF9Ccm93c2VyRW5naW5lVmVyc2lvbiA9IFBhcnNlRmxvYXQoX1VzZXJBZ2VudC5zdWJzdHJpbmcoaWVPZmZzZXQgKyA1LCBfVXNlckFnZW50LmluZGV4T2YoXCI7XCIsIGllT2Zmc2V0KSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY2hlY2sgSUUgamF2YXNjcmlwdCB2ZXJzaW9uXHJcbiAgICAgICAgICAgICAgICAvKkBjY19vblxyXG4gICAgICAgICAgICAgICAgX0Jyb3dzZXJKYXZhc2NyaXB0VmVyc2lvbiA9IEBfanNjcmlwdF92ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgQCovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlOiBmb3IgaW50cmFuZXQgc2l0ZXMgYW5kIGNvbXBhdCB2aWV3IGxpc3Qgc2l0ZXMsIElFIHNlbmRzXHJcbiAgICAgICAgICAgICAgICAvLyBhbiBJRTcgVXNlci1BZ2VudCB0byB0aGUgc2VydmVyIHRvIGJlIGludGVyb3BlcmFibGUsIGFuZCBldmVuIGlmXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgcGFnZSByZXF1ZXN0cyBhIGxhdGVyIElFIHZlcnNpb24sIElFIHdpbGwgc3RpbGwgcmVwb3J0IHRoZVxyXG4gICAgICAgICAgICAgICAgLy8gSUU3IFVBIHRvIEpTLiB3ZSBzaG91bGQgYmUgcm9idXN0IHRvIHNlbGZcclxuICAgICAgICAgICAgICAgIC8vdmFyIGRvY01vZGUgPSBkb2N1bWVudC5kb2N1bWVudE1vZGU7XHJcbiAgICAgICAgICAgICAgICAvL2lmICh0eXBlb2YgZG9jTW9kZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgX0Jyb3dzZXJSdW50aW1lVmVyc2lvbiA9IGRvY01vZGU7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICBfQnJvd3NlclJ1bnRpbWVWZXJzaW9uID0gZG9jdW1lbnQuZG9jdW1lbnRNb2RlIHx8IF9Ccm93c2VyRW5naW5lVmVyc2lvbjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX0FwcE5hbWUgPT0gXCJOZXRzY2FwZVwiICYmICEhd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZmZPZmZzZXQgPSBfVXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNhT2Zmc2V0ID0gX1VzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoT2Zmc2V0ID0gX1VzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdlYmtpdE9mZnNldCA9IF9Vc2VyQWdlbnQuaW5kZXhPZihcIkFwcGxlV2ViS2l0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmZk9mZnNldCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX0Jyb3dzZXIgPSBCUk9XU0VSX0ZJUkVGT1g7XHJcbiAgICAgICAgICAgICAgICAgICAgX0Jyb3dzZXJSdW50aW1lVmVyc2lvbiA9IFBhcnNlRmxvYXQoX1VzZXJBZ2VudC5zdWJzdHJpbmcoZmZPZmZzZXQgKyA4KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzYU9mZnNldCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsYXNoID0gX1VzZXJBZ2VudC5zdWJzdHJpbmcoMCwgc2FPZmZzZXQpLmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBfQnJvd3NlciA9IChjaE9mZnNldCA+PSAwKSA/IEJST1dTRVJfQ0hST01FIDogQlJPV1NFUl9TQUZBUkk7XHJcbiAgICAgICAgICAgICAgICAgICAgX0Jyb3dzZXJSdW50aW1lVmVyc2lvbiA9IFBhcnNlRmxvYXQoX1VzZXJBZ2VudC5zdWJzdHJpbmcoc2xhc2ggKyAxLCBzYU9mZnNldCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8oL1RyaWRlbnQuKnJ2WyA6XSoxMVxcLi9pXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gL1RyaWRlbnRcXC8uKnJ2OihbMC05XXsxLH1bXFwuMC05XXswLH0pL2kuZXhlYyhfVXNlckFnZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX0Jyb3dzZXIgPSBCUk9XU0VSX0lFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfQnJvd3NlclJ1bnRpbWVWZXJzaW9uID0gX0Jyb3dzZXJFbmdpbmVWZXJzaW9uID0gUGFyc2VGbG9hdChtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3ZWJraXRPZmZzZXQgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICBfV2Via2l0VmVyc2lvbiA9IFBhcnNlRmxvYXQoX1VzZXJBZ2VudC5zdWJzdHJpbmcod2Via2l0T2Zmc2V0ICsgMTIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IC8ob3BlcmEpKD86Lip2ZXJzaW9ufClbIFxcL10oW1xcdy5dKykvaS5leGVjKF9Vc2VyQWdlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX0Jyb3dzZXIgPSBCUk9XU0VSX09QRVJBO1xyXG4gICAgICAgICAgICAgICAgICAgIF9Ccm93c2VyUnVudGltZVZlcnNpb24gPSBQYXJzZUZsb2F0KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJyb3dzZXIgPT0gX0Jyb3dzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSXNCcm93c2VySUUoKSB7XHJcbiAgICAgICAgcmV0dXJuIERldGVjdEJyb3dzZXIoQlJPV1NFUl9JRSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSXNCcm93c2VySWVRdWlya3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIElzQnJvd3NlcklFKCkgJiYgKF9Ccm93c2VyUnVudGltZVZlcnNpb24gPCA2IHx8IGRvY3VtZW50LmNvbXBhdE1vZGUgPT0gXCJCYWNrQ29tcGF0XCIpOyAgIC8vQ29tcG9zaXRlIHRvIFwiQ1NTMUNvbXBhdFwiXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSXNCcm93c2VyRmlyZUZveCgpIHtcclxuICAgICAgICByZXR1cm4gRGV0ZWN0QnJvd3NlcihCUk9XU0VSX0ZJUkVGT1gpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIElzQnJvd3NlclNhZmFyaSgpIHtcclxuICAgICAgICByZXR1cm4gRGV0ZWN0QnJvd3NlcihCUk9XU0VSX1NBRkFSSSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSXNCcm93c2VyQ2hyb21lKCkge1xyXG4gICAgICAgIHJldHVybiBEZXRlY3RCcm93c2VyKEJST1dTRVJfQ0hST01FKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBJc0Jyb3dzZXJPcGVyYSgpIHtcclxuICAgICAgICByZXR1cm4gRGV0ZWN0QnJvd3NlcihCUk9XU0VSX09QRVJBKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBJc0Jyb3dzZXJCYWRUcmFuc2Zvcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuIElzQnJvd3NlclNhZmFyaSgpICYmIChfV2Via2l0VmVyc2lvbiA+IDUzNCkgJiYgKF9XZWJraXRWZXJzaW9uIDwgNTM1KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBJc0Jyb3dzZXJJZTlFYXJsaWVyKCkge1xyXG4gICAgICAgIHJldHVybiBJc0Jyb3dzZXJJRSgpICYmIF9Ccm93c2VyUnVudGltZVZlcnNpb24gPCA5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEdldFRyYW5zZm9ybVByb3BlcnR5KGVsbXQpIHtcclxuXHJcbiAgICAgICAgaWYgKCFfVHJhbnNmb3JtUHJvcGVydHkpIHtcclxuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IGluIHNvbWUgdmVyc2lvbnMgb2YgSUU5IGl0IGlzIGNyaXRpY2FsIHRoYXRcclxuICAgICAgICAgICAgLy8gbXNUcmFuc2Zvcm0gYXBwZWFyIGluIHRoaXMgbGlzdCBiZWZvcmUgTW96VHJhbnNmb3JtXHJcblxyXG4gICAgICAgICAgICBFYWNoKFsndHJhbnNmb3JtJywgJ1dlYmtpdFRyYW5zZm9ybScsICdtc1RyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybSddLCBmdW5jdGlvbiAocHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbG10LnN0eWxlW3Byb3BlcnR5XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfVHJhbnNmb3JtUHJvcGVydHkgPSBwcm9wZXJ0eTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBfVHJhbnNmb3JtUHJvcGVydHkgPSBfVHJhbnNmb3JtUHJvcGVydHkgfHwgXCJ0cmFuc2Zvcm1cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfVHJhbnNmb3JtUHJvcGVydHk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVscGVyc1xyXG4gICAgZnVuY3Rpb24gZ2V0T2Zmc2V0UGFyZW50KGVsbXQsIGlzRml4ZWQpIHtcclxuICAgICAgICAvLyBJRSBhbmQgT3BlcmEgXCJmaXhlZFwiIHBvc2l0aW9uIGVsZW1lbnRzIGRvbid0IGhhdmUgb2Zmc2V0IHBhcmVudHMuXHJcbiAgICAgICAgLy8gcmVnYXJkbGVzcywgaWYgaXQncyBmaXhlZCwgaXRzIG9mZnNldCBwYXJlbnQgaXMgdGhlIGJvZHkuXHJcbiAgICAgICAgaWYgKGlzRml4ZWQgJiYgZWxtdCAhPSBkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbG10Lm9mZnNldFBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBbW0NsYXNzXV0gLT4gdHlwZSBwYWlyc1xyXG4gICAgdmFyIF9DbGFzczJ0eXBlO1xyXG5cclxuICAgIGZ1bmN0aW9uIEdldENsYXNzMlR5cGUoKSB7XHJcbiAgICAgICAgaWYgKCFfQ2xhc3MydHlwZSkge1xyXG4gICAgICAgICAgICBfQ2xhc3MydHlwZSA9IHt9O1xyXG4gICAgICAgICAgICBFYWNoKFtcIkJvb2xlYW5cIiwgXCJOdW1iZXJcIiwgXCJTdHJpbmdcIiwgXCJGdW5jdGlvblwiLCBcIkFycmF5XCIsIFwiRGF0ZVwiLCBcIlJlZ0V4cFwiLCBcIk9iamVjdFwiXSwgZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIF9DbGFzczJ0eXBlW1wiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIl0gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9DbGFzczJ0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEVhY2gob2JqLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0b1N0cmluZyhvYmopID09IFwiW29iamVjdCBBcnJheV1cIikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKG9ialtpXSwgaSwgb2JqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKG9ialtuYW1lXSwgbmFtZSwgb2JqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFR5cGUob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gU3RyaW5nKG9iaikgOiBHZXRDbGFzczJUeXBlKClbdG9TdHJpbmcob2JqKV0gfHwgXCJvYmplY3RcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBJc05vdEVtcHR5KG9iaikge1xyXG4gICAgICAgIGZvcih2YXIgbmFtZSBpbiBvYmopXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIElzUGxhaW5PYmplY3Qob2JqKSB7XHJcbiAgICAgICAgLy8gTm90IHBsYWluIG9iamVjdHM6XHJcbiAgICAgICAgLy8gLSBBbnkgb2JqZWN0IG9yIHZhbHVlIHdob3NlIGludGVybmFsIFtbQ2xhc3NdXSBwcm9wZXJ0eSBpcyBub3QgXCJbb2JqZWN0IE9iamVjdF1cIlxyXG4gICAgICAgIC8vIC0gRE9NIG5vZGVzXHJcbiAgICAgICAgLy8gLSB3aW5kb3dcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gVHlwZShvYmopID09IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgICAgICYmICFvYmoubm9kZVR5cGVcclxuICAgICAgICAgICAgICAgICYmIG9iaiAhPSBvYmoud2luZG93XHJcbiAgICAgICAgICAgICAgICAmJiAoIW9iai5jb25zdHJ1Y3RvciB8fCB7IH0uaGFzT3duUHJvcGVydHkuY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCBcImlzUHJvdG90eXBlT2ZcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xyXG4gICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBEZWxheShjb2RlLCBkZWxheSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoY29kZSwgZGVsYXkgfHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gUmVtb3ZlQnlSZWcoc3RyLCByZWcpIHtcclxuICAgICAgICB2YXIgbSA9IHJlZy5leGVjKHN0cik7XHJcblxyXG4gICAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSBzdHIuc3Vic3RyKDAsIG0uaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgdGFpbGVyID0gc3RyLnN1YnN0cihtLmxhc3RJbmRleCArIDEsIHN0ci5sZW5ndGggLSAobS5sYXN0SW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIHN0ciA9IGhlYWRlciArIHRhaWxlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQnVpbGROZXdDc3Mob2xkQ3NzLCByZW1vdmVSZWdzLCByZXBsYWNlVmFsdWUpIHtcclxuICAgICAgICB2YXIgY3NzID0gKCFvbGRDc3MgfHwgb2xkQ3NzID09IFwiaW5oZXJpdFwiKSA/IFwiXCIgOiBvbGRDc3M7XHJcblxyXG4gICAgICAgIEVhY2gocmVtb3ZlUmVncywgZnVuY3Rpb24gKHJlbW92ZVJlZykge1xyXG4gICAgICAgICAgICB2YXIgbSA9IHJlbW92ZVJlZy5leGVjKGNzcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAobSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhlYWRlciA9IGNzcy5zdWJzdHIoMCwgbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFpbGVyID0gY3NzLnN1YnN0cihtLmxhc3RJbmRleCArIDEsIGNzcy5sZW5ndGggLSAobS5sYXN0SW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgICAgICBjc3MgPSBoZWFkZXIgKyB0YWlsZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY3NzID0gcmVwbGFjZVZhbHVlICsgKGNzcy5pbmRleE9mKFwiIFwiKSAhPSAwID8gXCIgXCIgOiBcIlwiKSArIGNzcztcclxuXHJcbiAgICAgICAgcmV0dXJuIGNzcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTZXRTdHlsZUZpbHRlcklFKGVsbXQsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKF9Ccm93c2VyUnVudGltZVZlcnNpb24gPCA5KSB7XHJcbiAgICAgICAgICAgIGVsbXQuc3R5bGUuZmlsdGVyID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFNldFN0eWxlTWF0cml4SUUoZWxtdCwgbWF0cml4LCBvZmZzZXQpIHtcclxuICAgICAgICAvL21hdHJpeCBpcyBub3QgZm9yIGllOSsgcnVubmluZyBpbiBpZTgtIG1vZGVcclxuICAgICAgICBpZiAoX0Jyb3dzZXJKYXZhc2NyaXB0VmVyc2lvbiA8IDkpIHtcclxuICAgICAgICAgICAgdmFyIG9sZEZpbHRlclZhbHVlID0gZWxtdC5zdHlsZS5maWx0ZXI7XHJcbiAgICAgICAgICAgIHZhciBtYXRyaXhSZWcgPSBuZXcgUmVnRXhwKC9bXFxzXSpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybVxcLk1pY3Jvc29mdFxcLk1hdHJpeFxcKFteXFwpXSpcXCkvZyk7XHJcbiAgICAgICAgICAgIHZhciBtYXRyaXhWYWx1ZSA9IG1hdHJpeCA/IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0Lk1hdHJpeChcIiArIFwiTTExPVwiICsgbWF0cml4WzBdWzBdICsgXCIsIE0xMj1cIiArIG1hdHJpeFswXVsxXSArIFwiLCBNMjE9XCIgKyBtYXRyaXhbMV1bMF0gKyBcIiwgTTIyPVwiICsgbWF0cml4WzFdWzFdICsgXCIsIFNpemluZ01ldGhvZD0nYXV0byBleHBhbmQnKVwiIDogXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdGaWx0ZXJWYWx1ZSA9IEJ1aWxkTmV3Q3NzKG9sZEZpbHRlclZhbHVlLCBbbWF0cml4UmVnXSwgbWF0cml4VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgU2V0U3R5bGVGaWx0ZXJJRShlbG10LCBuZXdGaWx0ZXJWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBfVGhpcy4kQ3NzTWFyZ2luVG9wKGVsbXQsIG9mZnNldC55KTtcclxuICAgICAgICAgICAgX1RoaXMuJENzc01hcmdpbkxlZnQoZWxtdCwgb2Zmc2V0LngpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBNZXRob2RzXHJcblxyXG4gICAgX1RoaXMuJERldmljZSA9IERldmljZTtcclxuXHJcbiAgICBfVGhpcy4kSXNCcm93c2VySUUgPSBJc0Jyb3dzZXJJRTtcclxuXHJcbiAgICBfVGhpcy4kSXNCcm93c2VySWVRdWlya3MgPSBJc0Jyb3dzZXJJZVF1aXJrcztcclxuXHJcbiAgICBfVGhpcy4kSXNCcm93c2VyRmlyZUZveCA9IElzQnJvd3NlckZpcmVGb3g7XHJcblxyXG4gICAgX1RoaXMuJElzQnJvd3NlclNhZmFyaSA9IElzQnJvd3NlclNhZmFyaTtcclxuXHJcbiAgICBfVGhpcy4kSXNCcm93c2VyQ2hyb21lID0gSXNCcm93c2VyQ2hyb21lO1xyXG5cclxuICAgIF9UaGlzLiRJc0Jyb3dzZXJPcGVyYSA9IElzQnJvd3Nlck9wZXJhO1xyXG5cclxuICAgIF9UaGlzLiRJc0Jyb3dzZXJCYWRUcmFuc2Zvcm0gPSBJc0Jyb3dzZXJCYWRUcmFuc2Zvcm07XHJcblxyXG4gICAgX1RoaXMuJElzQnJvd3NlckllOUVhcmxpZXIgPSBJc0Jyb3dzZXJJZTlFYXJsaWVyO1xyXG5cclxuICAgIF9UaGlzLiRCcm93c2VyVmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX0Jyb3dzZXJSdW50aW1lVmVyc2lvbjtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEJyb3dzZXJFbmdpbmVWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfQnJvd3NlckVuZ2luZVZlcnNpb24gfHwgX0Jyb3dzZXJSdW50aW1lVmVyc2lvbjtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJFdlYktpdFZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgRGV0ZWN0QnJvd3NlcigpO1xyXG5cclxuICAgICAgICByZXR1cm4gX1dlYmtpdFZlcnNpb247XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiREZWxheSA9IERlbGF5O1xyXG5cclxuICAgIF9UaGlzLiRJbmhlcml0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBiYXNlQ2xhc3MpIHtcclxuICAgICAgICBiYXNlQ2xhc3MuY2FsbChpbnN0YW5jZSk7XHJcbiAgICAgICAgcmV0dXJuIEV4dGVuZCh7fSwgaW5zdGFuY2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBDb25zdHJ1Y3QoaW5zdGFuY2UpIHtcclxuICAgICAgICBpbnN0YW5jZS5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0LmNhbGxlciAmJiBpbnN0YW5jZS4kQ29uc3RydWN0ICYmIGluc3RhbmNlLiRDb25zdHJ1Y3QuYXBwbHkoaW5zdGFuY2UsIENvbnN0cnVjdC5jYWxsZXIuYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBfVGhpcy4kQ29uc3RydWN0ID0gQ29uc3RydWN0O1xyXG5cclxuICAgIF9UaGlzLiRHZXRFbGVtZW50ID0gZnVuY3Rpb24gKGVsbXQpIHtcclxuICAgICAgICBpZiAoX1RoaXMuJElzU3RyaW5nKGVsbXQpKSB7XHJcbiAgICAgICAgICAgIGVsbXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG10KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbG10O1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBHZXRFdmVudChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJEdldEV2ZW50ID0gR2V0RXZlbnQ7XHJcblxyXG4gICAgX1RoaXMuJEV2dFNyYyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50ID0gR2V0RXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fCBkb2N1bWVudDtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEV2dFRhcmdldCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50ID0gR2V0RXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIHJldHVybiBldmVudC5yZWxhdGVkVGFyZ2V0IHx8IGV2ZW50LnRvRWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEV2dFdoaWNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQgPSBHZXRFdmVudChldmVudCk7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LndoaWNoIHx8IFswLCAxLCAzLCAwLCAyXVtldmVudC5idXR0b25dIHx8IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGU7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRNb3VzZVBvc2l0aW9uID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQgPSBHZXRFdmVudChldmVudCk7XHJcbiAgICAgICAgLy92YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYIHx8IGV2ZW50LmNsaWVudFgvKiArIChfRG9jRWxtdC5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdCB8fCAwKSAtIChfRG9jRWxtdC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwKSovIHx8IDAsXHJcbiAgICAgICAgICAgIHk6IGV2ZW50LnBhZ2VZIHx8IGV2ZW50LmNsaWVudFkvKiArIChfRG9jRWxtdC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3AgfHwgMCkgLSAoX0RvY0VsbXQuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDApKi8gfHwgMFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRQYWdlU2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBfRG9jRWxtdC5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdCB8fCAwKSAtIChfRG9jRWxtdC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwKSxcclxuICAgICAgICAgICAgeTogKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBfRG9jRWxtdC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3AgfHwgMCkgLSAoX0RvY0VsbXQuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDApXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJFdpbmRvd1NpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBib2R5LmNsaWVudFdpZHRoIHx8IF9Eb2NFbG10LmNsaWVudFdpZHRoLFxyXG4gICAgICAgICAgICB5OiBib2R5LmNsaWVudEhlaWdodCB8fCBfRG9jRWxtdC5jbGllbnRIZWlnaHRcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvL19UaGlzLiRHZXRFbGVtZW50UG9zaXRpb24gPSBmdW5jdGlvbiAoZWxtdCkge1xyXG4gICAgLy8gICAgZWxtdCA9IF9UaGlzLiRHZXRFbGVtZW50KGVsbXQpO1xyXG4gICAgLy8gICAgdmFyIHJlc3VsdCA9IFBvaW50KCk7XHJcblxyXG4gICAgLy8gICAgLy8gdGVjaG5pcXVlIGZyb206XHJcbiAgICAvLyAgICAvLyBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnL2pzL2ZpbmRwb3MuaHRtbFxyXG4gICAgLy8gICAgLy8gd2l0aCBzcGVjaWFsIGNoZWNrIGZvciBcImZpeGVkXCIgZWxlbWVudHMuXHJcblxyXG4gICAgLy8gICAgd2hpbGUgKGVsbXQpIHtcclxuICAgIC8vICAgICAgICByZXN1bHQueCArPSBlbG10Lm9mZnNldExlZnQ7XHJcbiAgICAvLyAgICAgICAgcmVzdWx0LnkgKz0gZWxtdC5vZmZzZXRUb3A7XHJcblxyXG4gICAgLy8gICAgICAgIHZhciBpc0ZpeGVkID0gX1RoaXMuJEdldEVsZW1lbnRTdHlsZShlbG10KS5wb3NpdGlvbiA9PSBcImZpeGVkXCI7XHJcblxyXG4gICAgLy8gICAgICAgIGlmIChpc0ZpeGVkKSB7XHJcbiAgICAvLyAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC4kUGx1cyhfVGhpcy4kUGFnZVNjcm9sbCh3aW5kb3cpKTtcclxuICAgIC8vICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgIGVsbXQgPSBnZXRPZmZzZXRQYXJlbnQoZWxtdCwgaXNGaXhlZCk7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIC8vfTtcclxuXHJcbiAgICAvL19UaGlzLiRHZXRNb3VzZVNjcm9sbCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgLy8gICAgZXZlbnQgPSBHZXRFdmVudChldmVudCk7XHJcbiAgICAvLyAgICB2YXIgZGVsdGEgPSAwOyAvLyBkZWZhdWx0IHZhbHVlXHJcblxyXG4gICAgLy8gICAgLy8gdGVjaG5pcXVlIGZyb206XHJcbiAgICAvLyAgICAvLyBodHRwOi8vYmxvZy5wYXJhbm9pZGZlcnJldC5jb20vaW5kZXgucGhwLzIwMDcvMTAvMzEvamF2YXNjcmlwdC10dXRvcmlhbC10aGUtc2Nyb2xsLXdoZWVsL1xyXG5cclxuICAgIC8vICAgIGlmICh0eXBlb2YgKGV2ZW50LndoZWVsRGVsdGEpID09IFwibnVtYmVyXCIpIHtcclxuICAgIC8vICAgICAgICBkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGE7XHJcbiAgICAvLyAgICB9IGVsc2UgaWYgKHR5cGVvZiAoZXZlbnQuZGV0YWlsKSA9PSBcIm51bWJlclwiKSB7XHJcbiAgICAvLyAgICAgICAgZGVsdGEgPSBldmVudC5kZXRhaWwgKiAtMTtcclxuICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiVW5rbm93biBldmVudCBtb3VzZSBzY3JvbGwsIG5vIGtub3duIHRlY2huaXF1ZS5cIik7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgLy8gbm9ybWFsaXplIHZhbHVlIHRvIFstMSwgMV1cclxuICAgIC8vICAgIHJldHVybiBkZWx0YSA/IGRlbHRhIC8gTWF0aC5hYnMoZGVsdGEpIDogMDtcclxuICAgIC8vfTtcclxuXHJcbiAgICAvL19UaGlzLiRNYWtlQWpheFJlcXVlc3QgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xyXG4gICAgLy8gICAgdmFyIGFzeW5jID0gdHlwZW9mIChjYWxsYmFjaykgPT0gXCJmdW5jdGlvblwiO1xyXG4gICAgLy8gICAgdmFyIHJlcSA9IG51bGw7XHJcblxyXG4gICAgLy8gICAgaWYgKGFzeW5jKSB7XHJcbiAgICAvLyAgICAgICAgdmFyIGFjdHVhbCA9IGNhbGxiYWNrO1xyXG4gICAgLy8gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgICAgRGVsYXkoJEpzc29yJC4kQ3JlYXRlQ2FsbGJhY2sobnVsbCwgYWN0dWFsLCByZXEpLCAxKTtcclxuICAgIC8vICAgICAgICB9O1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIGlmICh3aW5kb3cuQWN0aXZlWE9iamVjdCkge1xyXG4gICAgLy8gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyQWN0aXZlWC5sZW5ndGg7IGkrKykge1xyXG4gICAgLy8gICAgICAgICAgICB0cnkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgcmVxID0gbmV3IEFjdGl2ZVhPYmplY3QoYXJyQWN0aXZlWFtpXSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAvLyAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICB9XHJcbiAgICAvLyAgICB9IGVsc2UgaWYgKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCkge1xyXG4gICAgLy8gICAgICAgIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIGlmICghcmVxKSB7XHJcbiAgICAvLyAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiQnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QuXCIpO1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIGlmIChhc3luYykge1xyXG4gICAgLy8gICAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgICAgICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IG1lbW9yeSBsZWFrcyBieSBicmVha2luZyBjaXJjdWxhciByZWZlcmVuY2Ugbm93XHJcbiAgICAvLyAgICAgICAgICAgICAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gbmV3IEZ1bmN0aW9uKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgLy8gICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgfTtcclxuICAgIC8vICAgIH1cclxuXHJcbiAgICAvLyAgICB0cnkge1xyXG4gICAgLy8gICAgICAgIHJlcS5vcGVuKFwiR0VUXCIsIHVybCwgYXN5bmMpO1xyXG4gICAgLy8gICAgICAgIHJlcS5zZW5kKG51bGwpO1xyXG4gICAgLy8gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgLy8gICAgICAgICRKc3NvckRlYnVnJC4kTG9nKGUubmFtZSArIFwiIHdoaWxlIG1ha2luZyBBSkFYIHJlcXVlc3Q6IFwiICsgZS5tZXNzYWdlKTtcclxuXHJcbiAgICAvLyAgICAgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XHJcbiAgICAvLyAgICAgICAgcmVxID0gbnVsbDtcclxuXHJcbiAgICAvLyAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAvLyAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAvLyAgICAgICAgfVxyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIHJldHVybiBhc3luYyA/IG51bGwgOiByZXE7XHJcbiAgICAvL307XHJcblxyXG4gICAgLy9fVGhpcy4kUGFyc2VYbWwgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcbiAgICAvLyAgICB2YXIgeG1sRG9jID0gbnVsbDtcclxuXHJcbiAgICAvLyAgICBpZiAod2luZG93LkFjdGl2ZVhPYmplY3QpIHtcclxuICAgIC8vICAgICAgICB0cnkge1xyXG4gICAgLy8gICAgICAgICAgICB4bWxEb2MgPSBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxET01cIik7XHJcbiAgICAvLyAgICAgICAgICAgIHhtbERvYy5hc3luYyA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICB4bWxEb2MubG9hZFhNTChzdHJpbmcpO1xyXG4gICAgLy8gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgIC8vICAgICAgICAgICAgJEpzc29yRGVidWckLiRMb2coZS5uYW1lICsgXCIgd2hpbGUgcGFyc2luZyBYTUwgKEFjdGl2ZVgpOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAvLyAgICAgICAgfVxyXG4gICAgLy8gICAgfSBlbHNlIGlmICh3aW5kb3cuRE9NUGFyc2VyKSB7XHJcbiAgICAvLyAgICAgICAgdHJ5IHtcclxuICAgIC8vICAgICAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcclxuICAgIC8vICAgICAgICAgICAgeG1sRG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhzdHJpbmcsIFwidGV4dC94bWxcIik7XHJcbiAgICAvLyAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgLy8gICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJExvZyhlLm5hbWUgKyBcIiB3aGlsZSBwYXJzaW5nIFhNTCAoRE9NUGFyc2VyKTogXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgLy8gICAgICAgIH1cclxuICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiQnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgWE1MIERPTS5cIik7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgcmV0dXJuIHhtbERvYztcclxuICAgIC8vfTtcclxuXHJcbiAgICBmdW5jdGlvbiBDc3MoZWxtdCwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRhY2Nlc3MgY3NzXHJcbiAgICAgICAgLy8vICAgICAkSnNzb3IkLiRDc3MoZWxtdCwgbmFtZSk7ICAgICAgICAgLy9nZXQgY3NzIHZhbHVlXHJcbiAgICAgICAgLy8vICAgICAkSnNzb3IkLiRDc3MoZWxtdCwgbmFtZSwgdmFsdWUpOyAgLy9zZXQgY3NzIHZhbHVlXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cImVsbXRcIiB0eXBlPVwiSFRNTEVsZW1lbnRcIj5cclxuICAgICAgICAvLy9cdFx0dGhlIGVsZW1lbnQgdG8gYWNjZXNzIGNzc1xyXG4gICAgICAgIC8vL1x0PC9wYXJhbT5cclxuICAgICAgICAvLy9cdDxwYXJhbSBuYW1lPVwibmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5cclxuICAgICAgICAvLy9cdFx0dGhlIG5hbWUgb2YgY3NzIHByb3BlcnR5XHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIC8vL1x0PHBhcmFtIG5hbWU9XCJ2YWx1ZVwiIG9wdGlvbmFsPVwidHJ1ZVwiPlxyXG4gICAgICAgIC8vL1x0XHR0aGUgdmFsdWUgdG8gc2V0XHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIGlmICh2YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxtdC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gZWxtdC5jdXJyZW50U3R5bGUgfHwgZWxtdC5zdHlsZTtcclxuICAgICAgICAgICAgdmFsdWUgPSBzdHlsZVtuYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIlwiICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGVsbXQub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsbXQsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0eWxlICYmICh2YWx1ZSA9IHN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSkgfHwgc3R5bGVbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIENzc04oZWxtdCwgbmFtZSwgdmFsdWUsIGlzRGltZW5zaW9uYWwpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRhY2Nlc3MgY3NzIGFzIG51bWVyaWNcclxuICAgICAgICAvLy8gICAgICRKc3NvciQuJENzc04oZWxtdCwgbmFtZSk7ICAgICAgICAgLy9nZXQgY3NzIHZhbHVlXHJcbiAgICAgICAgLy8vICAgICAkSnNzb3IkLiRDc3NOKGVsbXQsIG5hbWUsIHZhbHVlKTsgIC8vc2V0IGNzcyB2YWx1ZVxyXG4gICAgICAgIC8vL1x0PC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0PHBhcmFtIG5hbWU9XCJlbG10XCIgdHlwZT1cIkhUTUxFbGVtZW50XCI+XHJcbiAgICAgICAgLy8vXHRcdHRoZSBlbGVtZW50IHRvIGFjY2VzcyBjc3NcclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cIm5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+XHJcbiAgICAgICAgLy8vXHRcdHRoZSBuYW1lIG9mIGNzcyBwcm9wZXJ0eVxyXG4gICAgICAgIC8vL1x0PC9wYXJhbT5cclxuICAgICAgICAvLy9cdDxwYXJhbSBuYW1lPVwidmFsdWVcIiB0eXBlPVwiTnVtYmVyXCIgb3B0aW9uYWw9XCJ0cnVlXCI+XHJcbiAgICAgICAgLy8vXHRcdHRoZSB2YWx1ZSB0byBzZXRcclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcbiAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpc0RpbWVuc2lvbmFsICYmICh2YWx1ZSArPSBcInB4XCIpO1xyXG4gICAgICAgICAgICBDc3MoZWxtdCwgbmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBhcnNlRmxvYXQoQ3NzKGVsbXQsIG5hbWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQ3NzUChlbG10LCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdGFjY2VzcyBjc3MgaW4gcGl4ZWwgYXMgbnVtZXJpYywgbGlrZSAndG9wJywgJ2xlZnQnLCAnd2lkdGgnLCAnaGVpZ2h0J1xyXG4gICAgICAgIC8vLyAgICAgJEpzc29yJC4kQ3NzUChlbG10LCBuYW1lKTsgICAgICAgICAvL2dldCBjc3MgdmFsdWVcclxuICAgICAgICAvLy8gICAgICRKc3NvciQuJENzc1AoZWxtdCwgbmFtZSwgdmFsdWUpOyAgLy9zZXQgY3NzIHZhbHVlXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cImVsbXRcIiB0eXBlPVwiSFRNTEVsZW1lbnRcIj5cclxuICAgICAgICAvLy9cdFx0dGhlIGVsZW1lbnQgdG8gYWNjZXNzIGNzc1xyXG4gICAgICAgIC8vL1x0PC9wYXJhbT5cclxuICAgICAgICAvLy9cdDxwYXJhbSBuYW1lPVwibmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5cclxuICAgICAgICAvLy9cdFx0dGhlIG5hbWUgb2YgY3NzIHByb3BlcnR5XHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIC8vL1x0PHBhcmFtIG5hbWU9XCJ2YWx1ZVwiIHR5cGU9XCJOdW1iZXJcIiBvcHRpb25hbD1cInRydWVcIj5cclxuICAgICAgICAvLy9cdFx0dGhlIHZhbHVlIHRvIHNldFxyXG4gICAgICAgIC8vL1x0PC9wYXJhbT5cclxuICAgICAgICByZXR1cm4gQ3NzTihlbG10LCBuYW1lLCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQ3NzUHJveHkobmFtZSwgbnVtZXJpY09yRGltZW5zaW9uKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0Y3JlYXRlIHByb3h5IHRvIGFjY2VzcyBjc3MsIENzc1Byb3h5KG5hbWVbLCBudW1lcmljT3JEaW1lbnNpb25dKTtcclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICAvLy9cdDxwYXJhbSBuYW1lPVwiZWxtdFwiIHR5cGU9XCJIVE1MRWxlbWVudFwiPlxyXG4gICAgICAgIC8vL1x0XHR0aGUgZWxlbWVudCB0byBhY2Nlc3MgY3NzXHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIC8vL1x0PHBhcmFtIG5hbWU9XCJudW1lcmljT3JEaW1lbnNpb25cIiB0eXBlPVwiTnVtYmVyXCIgb3B0aW9uYWw9XCJ0cnVlXCI+XHJcbiAgICAgICAgLy8vXHRcdG5vdCBzZXQ6IGFjY2VzcyBvcmlnaW5hbCBjc3MsIDE6IGFjY2VzcyBjc3MgYXMgbnVtZXJpYywgMjogYWNjZXNzIGNzcyBpbiBwaXhlbCBhcyBudW1lcmljXHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIHZhciBpc0RpbWVuc2lvbmFsID0gbnVtZXJpY09yRGltZW5zaW9uICYgMjtcclxuICAgICAgICB2YXIgY3NzQWNjZXNzb3IgPSBudW1lcmljT3JEaW1lbnNpb24gPyBDc3NOIDogQ3NzO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxtdCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNzc0FjY2Vzc29yKGVsbXQsIG5hbWUsIHZhbHVlLCBpc0RpbWVuc2lvbmFsKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEdldFN0eWxlT3BhY2l0eShlbG10KSB7XHJcbiAgICAgICAgaWYgKElzQnJvd3NlcklFKCkgJiYgX0Jyb3dzZXJFbmdpbmVWZXJzaW9uIDwgOSkge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAvb3BhY2l0eT0oW14pXSopLy5leGVjKGVsbXQuc3R5bGUuZmlsdGVyIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2ggPyAoUGFyc2VGbG9hdChtYXRjaFsxXSkgLyAxMDApIDogMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gUGFyc2VGbG9hdChlbG10LnN0eWxlLm9wYWNpdHkgfHwgXCIxXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFNldFN0eWxlT3BhY2l0eShlbG10LCBvcGFjaXR5LCBpZTlFYXJsaWVyRm9yY2UpIHtcclxuXHJcbiAgICAgICAgaWYgKElzQnJvd3NlcklFKCkgJiYgX0Jyb3dzZXJFbmdpbmVWZXJzaW9uIDwgOSkge1xyXG4gICAgICAgICAgICAvL3ZhciBmaWx0ZXJOYW1lID0gXCJmaWx0ZXJcIjsgLy8gX0Jyb3dzZXJFbmdpbmVWZXJzaW9uIDwgOCA/IFwiZmlsdGVyXCIgOiBcIi1tcy1maWx0ZXJcIjtcclxuICAgICAgICAgICAgdmFyIGZpbmFsRmlsdGVyID0gZWxtdC5zdHlsZS5maWx0ZXIgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIGZvciBDU1MgZmlsdGVyIGJyb3dzZXJzIChJRSksIHJlbW92ZSBhbHBoYSBmaWx0ZXIgaWYgaXQncyB1bm5lY2Vzc2FyeS5cclxuICAgICAgICAgICAgLy8gdXBkYXRlOiBkb2luZyBfVGhpcyBhbHdheXMgc2luY2UgSUU5IGJldGEgc2VlbXMgdG8gaGF2ZSBicm9rZW4gdGhlXHJcbiAgICAgICAgICAgIC8vIGJlaGF2aW9yIGlmIHdlIHJlbHkgb24gdGhlIHByb2dyYW1tYXRpYyBmaWx0ZXJzIGNvbGxlY3Rpb24uXHJcbiAgICAgICAgICAgIHZhciBhbHBoYVJlZyA9IG5ldyBSZWdFeHAoL1tcXHNdKmFscGhhXFwoW15cXCldKlxcKS9nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGltcG9ydGFudDogbm90ZSB0aGUgbGF6eSBzdGFyISBfVGhpcyBwcm90ZWN0cyBhZ2FpbnN0XHJcbiAgICAgICAgICAgIC8vIG11bHRpcGxlIGZpbHRlcnM7IHdlIGRvbid0IHdhbnQgdG8gZGVsZXRlIHRoZSBvdGhlciBvbmVzLlxyXG4gICAgICAgICAgICAvLyB1cGRhdGU6IGFsc28gdHJpbW1pbmcgZXh0cmEgd2hpdGVzcGFjZSBhcm91bmQgZmlsdGVyLlxyXG5cclxuICAgICAgICAgICAgdmFyIGllT3BhY2l0eSA9IE1hdGgucm91bmQoMTAwICogb3BhY2l0eSk7XHJcbiAgICAgICAgICAgIHZhciBhbHBoYUZpbHRlciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChpZU9wYWNpdHkgPCAxMDAgfHwgaWU5RWFybGllckZvcmNlKSB7XHJcbiAgICAgICAgICAgICAgICBhbHBoYUZpbHRlciA9IFwiYWxwaGEob3BhY2l0eT1cIiArIGllT3BhY2l0eSArIFwiKSBcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG5ld0ZpbHRlclZhbHVlID0gQnVpbGROZXdDc3MoZmluYWxGaWx0ZXIsIFthbHBoYVJlZ10sIGFscGhhRmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIFNldFN0eWxlRmlsdGVySUUoZWxtdCwgbmV3RmlsdGVyVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZWxtdC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eSA9PSAxID8gXCJcIiA6IE1hdGgucm91bmQob3BhY2l0eSAqIDEwMCkgLyAxMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFNldFN0eWxlVHJhbnNmb3JtSW50ZXJuYWwoZWxtdCwgdHJhbnNmb3JtKSB7XHJcbiAgICAgICAgdmFyIHJvdGF0ZSA9IHRyYW5zZm9ybS4kUm90YXRlIHx8IDA7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gdHJhbnNmb3JtLiRTY2FsZSA9PSB1bmRlZmluZWQgPyAxIDogdHJhbnNmb3JtLiRTY2FsZTtcclxuXHJcbiAgICAgICAgaWYgKElzQnJvd3NlckllOUVhcmxpZXIoKSkge1xyXG4gICAgICAgICAgICB2YXIgbWF0cml4ID0gX1RoaXMuJENyZWF0ZU1hdHJpeChyb3RhdGUgLyAxODAgKiBNYXRoLlBJLCBzY2FsZSwgc2NhbGUpO1xyXG4gICAgICAgICAgICBTZXRTdHlsZU1hdHJpeElFKGVsbXQsICghcm90YXRlICYmIHNjYWxlID09IDEpID8gbnVsbCA6IG1hdHJpeCwgX1RoaXMuJEdldE1hdHJpeE9mZnNldChtYXRyaXgsIHRyYW5zZm9ybS4kT3JpZ2luYWxXaWR0aCwgdHJhbnNmb3JtLiRPcmlnaW5hbEhlaWdodCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9yb3RhdGUoMTVkZWcpIHNjYWxlKC41KSB0cmFuc2xhdGVaKDApXHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IEdldFRyYW5zZm9ybVByb3BlcnR5KGVsbXQpO1xyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtUHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1WYWx1ZSA9IFwicm90YXRlKFwiICsgcm90YXRlICUgMzYwICsgXCJkZWcpIHNjYWxlKFwiICsgc2NhbGUgKyBcIilcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvL25lZWRlZCBmb3IgdG91Y2ggZGV2aWNlLCBubyBuZWVkIGZvciBkZXNrdG9wIGRldmljZVxyXG4gICAgICAgICAgICAgICAgaWYgKElzQnJvd3NlckNocm9tZSgpICYmIF9XZWJraXRWZXJzaW9uID4gNTM1ICYmIFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93KVxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybVZhbHVlICs9IFwiIHBlcnNwZWN0aXZlKDIwMDBweClcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBlbG10LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9IHRyYW5zZm9ybVZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9UaGlzLiRTZXRTdHlsZVRyYW5zZm9ybSA9IGZ1bmN0aW9uIChlbG10LCB0cmFuc2Zvcm0pIHtcclxuICAgICAgICBpZiAoSXNCcm93c2VyQmFkVHJhbnNmb3JtKCkpIHtcclxuICAgICAgICAgICAgRGVsYXkoX1RoaXMuJENyZWF0ZUNhbGxiYWNrKG51bGwsIFNldFN0eWxlVHJhbnNmb3JtSW50ZXJuYWwsIGVsbXQsIHRyYW5zZm9ybSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgU2V0U3R5bGVUcmFuc2Zvcm1JbnRlcm5hbChlbG10LCB0cmFuc2Zvcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJFNldFN0eWxlVHJhbnNmb3JtT3JpZ2luID0gZnVuY3Rpb24gKGVsbXQsIHRyYW5zZm9ybU9yaWdpbikge1xyXG4gICAgICAgIHZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IEdldFRyYW5zZm9ybVByb3BlcnR5KGVsbXQpO1xyXG5cclxuICAgICAgICBpZiAodHJhbnNmb3JtUHJvcGVydHkpXHJcbiAgICAgICAgICAgIGVsbXQuc3R5bGVbdHJhbnNmb3JtUHJvcGVydHkgKyBcIk9yaWdpblwiXSA9IHRyYW5zZm9ybU9yaWdpbjtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJENzc1NjYWxlID0gZnVuY3Rpb24gKGVsbXQsIHNjYWxlKSB7XHJcblxyXG4gICAgICAgIGlmIChJc0Jyb3dzZXJJRSgpICYmIF9Ccm93c2VyRW5naW5lVmVyc2lvbiA8IDkgfHwgKF9Ccm93c2VyRW5naW5lVmVyc2lvbiA8IDEwICYmIElzQnJvd3NlckllUXVpcmtzKCkpKSB7XHJcbiAgICAgICAgICAgIGVsbXQuc3R5bGUuem9vbSA9IChzY2FsZSA9PSAxKSA/IFwiXCIgOiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IEdldFRyYW5zZm9ybVByb3BlcnR5KGVsbXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyYW5zZm9ybVByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICAvL3JvdGF0ZSgxNWRlZykgc2NhbGUoLjUpXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNmb3JtVmFsdWUgPSBcInNjYWxlKFwiICsgc2NhbGUgKyBcIilcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkVHJhbnNmb3JtVmFsdWUgPSBlbG10LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIHZhciBzY2FsZVJlZyA9IG5ldyBSZWdFeHAoL1tcXHNdKnNjYWxlXFwoLio/XFwpL2cpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBuZXdUcmFuc2Zvcm1WYWx1ZSA9IEJ1aWxkTmV3Q3NzKG9sZFRyYW5zZm9ybVZhbHVlLCBbc2NhbGVSZWddLCB0cmFuc2Zvcm1WYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxtdC5zdHlsZVt0cmFuc2Zvcm1Qcm9wZXJ0eV0gPSBuZXdUcmFuc2Zvcm1WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEVuYWJsZUhXQSA9IGZ1bmN0aW9uIChlbG10KSB7XHJcbiAgICAgICAgaWYgKCFlbG10LnN0eWxlW0dldFRyYW5zZm9ybVByb3BlcnR5KGVsbXQpXSB8fCBlbG10LnN0eWxlW0dldFRyYW5zZm9ybVByb3BlcnR5KGVsbXQpXSA9PSBcIm5vbmVcIilcclxuICAgICAgICAgICAgZWxtdC5zdHlsZVtHZXRUcmFuc2Zvcm1Qcm9wZXJ0eShlbG10KV0gPSBcInBlcnNwZWN0aXZlKDIwMDBweClcIjtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJERpc2FibGVIV0EgPSBmdW5jdGlvbiAoZWxtdCkge1xyXG4gICAgICAgIGVsbXQuc3R5bGVbR2V0VHJhbnNmb3JtUHJvcGVydHkoZWxtdCldID0gXCJub25lXCI7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBpZThPZmZzZXRXaWR0aCA9IDA7XHJcbiAgICB2YXIgaWU4T2Zmc2V0SGVpZ2h0ID0gMDtcclxuXHJcbiAgICBfVGhpcy4kV2luZG93UmVzaXplRmlsdGVyID0gZnVuY3Rpb24gKHdpbmRvdywgaGFuZGxlcikge1xyXG4gICAgICAgIHJldHVybiBJc0Jyb3dzZXJJZTlFYXJsaWVyKCkgPyBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHJpZ2dlciA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hlY2tFbGVtZW50ID0gKElzQnJvd3NlckllUXVpcmtzKCkgPyB3aW5kb3cuZG9jdW1lbnQuYm9keSA6IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGhDaGFuZ2UgPSBjaGVja0VsZW1lbnQub2Zmc2V0V2lkdGggLSBpZThPZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHRDaGFuZ2UgPSBjaGVja0VsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gaWU4T2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpZHRoQ2hhbmdlIHx8IGhlaWdodENoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGllOE9mZnNldFdpZHRoICs9IHdpZHRoQ2hhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgIGllOE9mZnNldEhlaWdodCArPSBoZWlnaHRDaGFuZ2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cmlnZ2VyICYmIGhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgfSA6IGhhbmRsZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRNb3VzZU92ZXJPdXRGaWx0ZXIgPSBmdW5jdGlvbiAoaGFuZGxlciwgdGFyZ2V0KSB7XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cInRhcmdldFwiIHR5cGU9XCJIVE1MRG9tRWxlbWVudFwiPlxyXG4gICAgICAgIC8vL1x0XHRUaGUgdGFyZ2V0IGVsZW1lbnQgdG8gZGV0ZWN0IG1vdXNlIG92ZXIvb3V0IGV2ZW50cy4gKGZvciBpZSA8IDkgY29tcGF0aWJpbGl0eSlcclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcblxyXG4gICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdWxsIHJlZmVyZW5jZSwgcGFyYW1ldGVyIFxcXCJ0YXJnZXRcXFwiLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50ID0gR2V0RXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50LnR5cGU7XHJcbiAgICAgICAgICAgIHZhciByZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCB8fCAoZXZlbnROYW1lID09IFwibW91c2VvdXRcIiA/IGV2ZW50LnRvRWxlbWVudCA6IGV2ZW50LmZyb21FbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghcmVsYXRlZCB8fCAocmVsYXRlZCAhPT0gdGFyZ2V0ICYmICFfVGhpcy4kSXNDaGlsZCh0YXJnZXQsIHJlbGF0ZWQpKSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcihldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kQWRkRXZlbnQgPSBmdW5jdGlvbiAoZWxtdCwgZXZlbnROYW1lLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgZWxtdCA9IF9UaGlzLiRHZXRFbGVtZW50KGVsbXQpO1xyXG5cclxuICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWVsbXQpIHtcclxuICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIlBhcmFtZXRlciAnZWxtdCcgbm90IHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiUGFyYW1ldGVyICdoYW5kbGVyJyBub3Qgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFlbG10LmFkZEV2ZW50TGlzdGVuZXIgJiYgIWVsbXQuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIlVuYWJsZSB0byBhdHRhY2ggZXZlbnQgaGFuZGxlciwgbm8ga25vd24gdGVjaG5pcXVlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB0ZWNobmlxdWUgZnJvbTpcclxuICAgICAgICAvLyBodHRwOi8vYmxvZy5wYXJhbm9pZGZlcnJldC5jb20vaW5kZXgucGhwLzIwMDcvMDgvMTAvamF2YXNjcmlwdC13b3JraW5nLXdpdGgtZXZlbnRzL1xyXG5cclxuICAgICAgICBpZiAoZWxtdC5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUgPT0gXCJtb3VzZXdoZWVsXCIpIHtcclxuICAgICAgICAgICAgICAgIGVsbXQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTU1vdXNlU2Nyb2xsXCIsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHdlIGFyZSBzdGlsbCBnb2luZyB0byBhZGQgdGhlIG1vdXNld2hlZWwgLS0gbm90IGEgbWlzdGFrZSFcclxuICAgICAgICAgICAgLy8gX1RoaXMgaXMgZm9yIG9wZXJhLCBzaW5jZSBpdCB1c2VzIG9ubW91c2V3aGVlbCBidXQgbmVlZHMgYWRkRXZlbnRMaXN0ZW5lci5cclxuICAgICAgICAgICAgZWxtdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGVsbXQuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgZWxtdC5hdHRhY2hFdmVudChcIm9uXCIgKyBldmVudE5hbWUsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICBpZiAodXNlQ2FwdHVyZSAmJiBlbG10LnNldENhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGVsbXQuc2V0Q2FwdHVyZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kUmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiAoZWxtdCwgZXZlbnROYW1lLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgZWxtdCA9IF9UaGlzLiRHZXRFbGVtZW50KGVsbXQpO1xyXG5cclxuICAgICAgICAvLyB0ZWNobmlxdWUgZnJvbTpcclxuICAgICAgICAvLyBodHRwOi8vYmxvZy5wYXJhbm9pZGZlcnJldC5jb20vaW5kZXgucGhwLzIwMDcvMDgvMTAvamF2YXNjcmlwdC13b3JraW5nLXdpdGgtZXZlbnRzL1xyXG5cclxuICAgICAgICBpZiAoZWxtdC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUgPT0gXCJtb3VzZXdoZWVsXCIpIHtcclxuICAgICAgICAgICAgICAgIGVsbXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIkRPTU1vdXNlU2Nyb2xsXCIsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHdlIGFyZSBzdGlsbCBnb2luZyB0byByZW1vdmUgdGhlIG1vdXNld2hlZWwgLS0gbm90IGEgbWlzdGFrZSFcclxuICAgICAgICAgICAgLy8gX1RoaXMgaXMgZm9yIG9wZXJhLCBzaW5jZSBpdCB1c2VzIG9ubW91c2V3aGVlbCBidXQgbmVlZHMgcmVtb3ZlRXZlbnRMaXN0ZW5lci5cclxuICAgICAgICAgICAgZWxtdC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGVsbXQuZGV0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgZWxtdC5kZXRhY2hFdmVudChcIm9uXCIgKyBldmVudE5hbWUsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICBpZiAodXNlQ2FwdHVyZSAmJiBlbG10LnJlbGVhc2VDYXB0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBlbG10LnJlbGVhc2VDYXB0dXJlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRGaXJlRXZlbnQgPSBmdW5jdGlvbiAoZWxtdCwgZXZlbnROYW1lKSB7XHJcbiAgICAgICAgLy92YXIgZG9jdW1lbnQgPSBlbG10LmRvY3VtZW50O1xyXG5cclxuICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmNyZWF0ZUV2ZW50ICYmICFkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiVW5hYmxlIHRvIGZpcmUgZXZlbnQsIG5vIGtub3duIHRlY2huaXF1ZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghZWxtdC5kaXNwYXRjaEV2ZW50ICYmICFlbG10LmZpcmVFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiVW5hYmxlIHRvIGZpcmUgZXZlbnQsIG5vIGtub3duIHRlY2huaXF1ZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGV2ZW50bztcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50byA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiSFRNTEV2ZW50c1wiKTtcclxuICAgICAgICAgICAgZXZlbnRvLmluaXRFdmVudChldmVudE5hbWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsbXQuZGlzcGF0Y2hFdmVudChldmVudG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGllRXZlbnROYW1lID0gXCJvblwiICsgZXZlbnROYW1lO1xyXG4gICAgICAgICAgICBldmVudG8gPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xyXG5cclxuICAgICAgICAgICAgZWxtdC5maXJlRXZlbnQoaWVFdmVudE5hbWUsIGV2ZW50byk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kQ2FuY2VsRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudCA9IEdldEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gdGVjaG5pcXVlIGZyb206XHJcbiAgICAgICAgLy8gaHR0cDovL2Jsb2cucGFyYW5vaWRmZXJyZXQuY29tL2luZGV4LnBocC8yMDA3LzA4LzEwL2phdmFzY3JpcHQtd29ya2luZy13aXRoLWV2ZW50cy9cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7ICAgICAvLyBXM0MgZm9yIHByZXZlbnRpbmcgZGVmYXVsdFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXZlbnQuY2FuY2VsID0gdHJ1ZTsgICAgICAgICAgICAvLyBsZWdhY3kgZm9yIHByZXZlbnRpbmcgZGVmYXVsdFxyXG4gICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7ICAgICAgLy8gSUUgZm9yIHByZXZlbnRpbmcgZGVmYXVsdFxyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kU3RvcEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQgPSBHZXRFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgIC8vIHRlY2huaXF1ZSBmcm9tOlxyXG4gICAgICAgIC8vIGh0dHA6Ly9ibG9nLnBhcmFub2lkZmVycmV0LmNvbS9pbmRleC5waHAvMjAwNy8wOC8xMC9qYXZhc2NyaXB0LXdvcmtpbmctd2l0aC1ldmVudHMvXHJcblxyXG4gICAgICAgIGlmIChldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7ICAgIC8vIFczQyBmb3Igc3RvcHBpbmcgcHJvcGFnYXRpb25cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7ICAgICAgLy8gSUUgZm9yIHN0b3BwaW5nIHByb3BhZ2F0aW9uXHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRDcmVhdGVDYWxsYmFjayA9IGZ1bmN0aW9uIChvYmplY3QsIG1ldGhvZCkge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBjYWxsYmFjayBhcmdzXHJcbiAgICAgICAgdmFyIGluaXRpYWxBcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgY2xvc3VyZSB0byBhcHBseSBtZXRob2RcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbmNhdGVuYXRlIG5ldyBhcmdzLCBidXQgbWFrZSBhIGNvcHkgb2YgaW5pdGlhbEFyZ3MgZmlyc3RcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBpbml0aWFsQXJncy5jb25jYXQoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkob2JqZWN0LCBhcmdzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyRKc3NvckRlYnVnJC4kTGl2ZVN0YW1wKGNhbGxiYWNrLCBcImNhbGxiYWNrX1wiICsgKCRKc3NvciQuJEdldE5vdygpICYgMHhGRkZGRkYpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kSW5uZXJUZXh0ID0gZnVuY3Rpb24gKGVsbXQsIHRleHQpIHtcclxuICAgICAgICBpZiAodGV4dCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBlbG10LnRleHRDb250ZW50IHx8IGVsbXQuaW5uZXJUZXh0O1xyXG5cclxuICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcclxuICAgICAgICBfVGhpcy4kRW1wdHkoZWxtdCk7XHJcbiAgICAgICAgZWxtdC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRJbm5lckh0bWwgPSBmdW5jdGlvbiAoZWxtdCwgaHRtbCkge1xyXG4gICAgICAgIGlmIChodG1sID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIGVsbXQuaW5uZXJIVE1MO1xyXG5cclxuICAgICAgICBlbG10LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRHZXRDbGllbnRSZWN0ID0gZnVuY3Rpb24gKGVsbXQpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGVsbXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7IHg6IHJlY3QubGVmdCwgeTogcmVjdC50b3AsIHc6IHJlY3QucmlnaHQgLSByZWN0LmxlZnQsIGg6IHJlY3QuYm90dG9tIC0gcmVjdC50b3AgfTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJENsZWFySW5uZXJIdG1sID0gZnVuY3Rpb24gKGVsbXQpIHtcclxuICAgICAgICBlbG10LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRFbmNvZGVIdG1sID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICB2YXIgZGl2ID0gX1RoaXMuJENyZWF0ZURpdigpO1xyXG4gICAgICAgIF9UaGlzLiRJbm5lclRleHQoZGl2LCB0ZXh0KTtcclxuICAgICAgICByZXR1cm4gX1RoaXMuJElubmVySHRtbChkaXYpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kRGVjb2RlSHRtbCA9IGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgdmFyIGRpdiA9IF9UaGlzLiRDcmVhdGVEaXYoKTtcclxuICAgICAgICBfVGhpcy4kSW5uZXJIdG1sKGRpdiwgaHRtbCk7XHJcbiAgICAgICAgcmV0dXJuIF9UaGlzLiRJbm5lclRleHQoZGl2KTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJFNlbGVjdEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxtdCkge1xyXG4gICAgICAgIHZhciB1c2VyU2VsZWN0aW9uO1xyXG4gICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vVzNDIGRlZmF1bHRcclxuICAgICAgICAgICAgdXNlclNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRoZVJhbmdlID0gbnVsbDtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlUmFuZ2UpIHtcclxuICAgICAgICAgICAgdGhlUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGVSYW5nZS5zZWxlY3ROb2RlKGVsbXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhlUmFuZ2UgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGVSYW5nZS5tb3ZlVG9FbGVtZW50VGV4dChlbG10KTtcclxuICAgICAgICAgICAgdGhlUmFuZ2Uuc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc2V0IHVzZXIgc2VsZWN0aW9uXHJcbiAgICAgICAgaWYgKHVzZXJTZWxlY3Rpb24pXHJcbiAgICAgICAgICAgIHVzZXJTZWxlY3Rpb24uYWRkUmFuZ2UodGhlUmFuZ2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kRGVzZWxlY3RFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kQ2hpbGRyZW4gPSBmdW5jdGlvbiAoZWxtdCwgaW5jbHVkZUFsbCkge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciB0bXBFbCA9IGVsbXQuZmlyc3RDaGlsZDsgdG1wRWw7IHRtcEVsID0gdG1wRWwubmV4dFNpYmxpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGluY2x1ZGVBbGwgfHwgdG1wRWwubm9kZVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh0bXBFbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gRmluZENoaWxkKGVsbXQsIGF0dHJWYWx1ZSwgbm9EZWVwLCBhdHRyTmFtZSkge1xyXG4gICAgICAgIGF0dHJOYW1lID0gYXR0ck5hbWUgfHwgXCJ1XCI7XHJcblxyXG4gICAgICAgIGZvciAoZWxtdCA9IGVsbXQgPyBlbG10LmZpcnN0Q2hpbGQgOiBudWxsOyBlbG10OyBlbG10ID0gZWxtdC5uZXh0U2libGluZykge1xyXG4gICAgICAgICAgICBpZiAoZWxtdC5ub2RlVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXR0cmlidXRlRXgoZWxtdCwgYXR0ck5hbWUpID09IGF0dHJWYWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxtdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW5vRGVlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZFJldCA9IEZpbmRDaGlsZChlbG10LCBhdHRyVmFsdWUsIG5vRGVlcCwgYXR0ck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZFJldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkUmV0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9UaGlzLiRGaW5kQ2hpbGQgPSBGaW5kQ2hpbGQ7XHJcblxyXG4gICAgZnVuY3Rpb24gRmluZENoaWxkcmVuKGVsbXQsIGF0dHJWYWx1ZSwgbm9EZWVwLCBhdHRyTmFtZSkge1xyXG4gICAgICAgIGF0dHJOYW1lID0gYXR0ck5hbWUgfHwgXCJ1XCI7XHJcblxyXG4gICAgICAgIHZhciByZXQgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChlbG10ID0gZWxtdCA/IGVsbXQuZmlyc3RDaGlsZCA6IG51bGw7IGVsbXQ7IGVsbXQgPSBlbG10Lm5leHRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChlbG10Lm5vZGVUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBdHRyaWJ1dGVFeChlbG10LCBhdHRyTmFtZSkgPT0gYXR0clZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGVsbXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbm9EZWVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkUmV0ID0gRmluZENoaWxkcmVuKGVsbXQsIGF0dHJWYWx1ZSwgbm9EZWVwLCBhdHRyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkUmV0Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChjaGlsZFJldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJEZpbmRDaGlsZHJlbiA9IEZpbmRDaGlsZHJlbjtcclxuXHJcbiAgICBmdW5jdGlvbiBGaW5kQ2hpbGRCeVRhZyhlbG10LCB0YWdOYW1lLCBub0RlZXApIHtcclxuXHJcbiAgICAgICAgZm9yIChlbG10ID0gZWxtdCA/IGVsbXQuZmlyc3RDaGlsZCA6IG51bGw7IGVsbXQ7IGVsbXQgPSBlbG10Lm5leHRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChlbG10Lm5vZGVUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbG10LnRhZ05hbWUgPT0gdGFnTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxtdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW5vRGVlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZFJldCA9IEZpbmRDaGlsZEJ5VGFnKGVsbXQsIHRhZ05hbWUsIG5vRGVlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkUmV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRSZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJEZpbmRDaGlsZEJ5VGFnID0gRmluZENoaWxkQnlUYWc7XHJcblxyXG4gICAgZnVuY3Rpb24gRmluZENoaWxkcmVuQnlUYWcoZWxtdCwgdGFnTmFtZSwgbm9EZWVwKSB7XHJcbiAgICAgICAgdmFyIHJldCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGVsbXQgPSBlbG10ID8gZWxtdC5maXJzdENoaWxkIDogbnVsbDsgZWxtdDsgZWxtdCA9IGVsbXQubmV4dFNpYmxpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGVsbXQubm9kZVR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YWdOYW1lIHx8IGVsbXQudGFnTmFtZSA9PSB0YWdOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGVsbXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbm9EZWVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkUmV0ID0gRmluZENoaWxkcmVuQnlUYWcoZWxtdCwgdGFnTmFtZSwgbm9EZWVwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRSZXQubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSByZXQuY29uY2F0KGNoaWxkUmV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICBfVGhpcy4kRmluZENoaWxkcmVuQnlUYWcgPSBGaW5kQ2hpbGRyZW5CeVRhZztcclxuXHJcbiAgICBfVGhpcy4kR2V0RWxlbWVudHNCeVRhZyA9IGZ1bmN0aW9uIChlbG10LCB0YWdOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsbXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vZnVuY3Rpb24gRXh0ZW5kKCkge1xyXG4gICAgLy8gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAvLyAgICB2YXIgdGFyZ2V0O1xyXG4gICAgLy8gICAgdmFyIG9wdGlvbnM7XHJcbiAgICAvLyAgICB2YXIgcHJvcE5hbWU7XHJcbiAgICAvLyAgICB2YXIgcHJvcFZhbHVlO1xyXG4gICAgLy8gICAgdmFyIHRhcmdldFByb3BWYWx1ZTtcclxuICAgIC8vICAgIHZhciBwdXJwb3NlID0gNyAmIGFyZ3NbMF07XHJcbiAgICAvLyAgICB2YXIgZGVlcCA9IDEgJiBwdXJwb3NlO1xyXG4gICAgLy8gICAgdmFyIHVuZXh0ZW5kID0gMiAmIHB1cnBvc2U7XHJcbiAgICAvLyAgICB2YXIgaSA9IHB1cnBvc2UgPyAyIDogMTtcclxuICAgIC8vICAgIHRhcmdldCA9IGFyZ3NbaSAtIDFdIHx8IHt9O1xyXG5cclxuICAgIC8vICAgIGZvciAoOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgLy8gICAgICAgIC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcclxuICAgIC8vICAgICAgICBpZiAob3B0aW9ucyA9IGFyZ3NbaV0pIHtcclxuICAgIC8vICAgICAgICAgICAgLy8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxyXG4gICAgLy8gICAgICAgICAgICBmb3IgKHByb3BOYW1lIGluIG9wdGlvbnMpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IG9wdGlvbnNbcHJvcE5hbWVdO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IG9wdGlvbnNbcHJvcE5hbWVdO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodW5leHRlbmQpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UHJvcFZhbHVlID0gdGFyZ2V0W3Byb3BOYW1lXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gdGFyZ2V0UHJvcFZhbHVlKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRhcmdldFtwcm9wTmFtZV07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlZXAgJiYgSXNQbGFpbk9iamVjdCh0YXJnZXRQcm9wVmFsdWUpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHRlbmQocHVycG9zZSwgdGFyZ2V0UHJvcFZhbHVlLCBwcm9wVmFsdWUpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcE5hbWVdID0gKGRlZXAgJiYgSXNQbGFpbk9iamVjdCh0YXJnZXRbcHJvcE5hbWVdKSkgPyBFeHRlbmQocHVycG9zZSB8IDQsIHt9LCBwcm9wVmFsdWUpIDogcHJvcFZhbHVlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgIH1cclxuICAgIC8vICAgIH1cclxuXHJcbiAgICAvLyAgICAvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxyXG4gICAgLy8gICAgcmV0dXJuIHRhcmdldDtcclxuICAgIC8vfVxyXG5cclxuICAgIC8vZnVuY3Rpb24gVW5leHRlbmQoKSB7XHJcbiAgICAvLyAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIC8vICAgIHZhciBuZXdBcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgLy8gICAgdmFyIHB1cnBvc2UgPSAxICYgYXJnc1swXTtcclxuXHJcbiAgICAvLyAgICBwdXJwb3NlICYmIG5ld0FyZ3Muc2hpZnQoKTtcclxuICAgIC8vICAgIG5ld0FyZ3MudW5zaGlmdChwdXJwb3NlIHwgMik7XHJcblxyXG4gICAgLy8gICAgcmV0dXJuIEV4dGVuZC5hcHBseShudWxsLCBuZXdBcmdzKTtcclxuICAgIC8vfVxyXG5cclxuICAgIGZ1bmN0aW9uIEV4dGVuZCgpIHtcclxuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICB2YXIgdGFyZ2V0O1xyXG4gICAgICAgIHZhciBvcHRpb25zO1xyXG4gICAgICAgIHZhciBwcm9wTmFtZTtcclxuICAgICAgICB2YXIgcHJvcFZhbHVlO1xyXG4gICAgICAgIHZhciBkZWVwID0gMSAmIGFyZ3NbMF07XHJcbiAgICAgICAgdmFyIGkgPSAxICsgZGVlcDtcclxuICAgICAgICB0YXJnZXQgPSBhcmdzW2kgLSAxXSB8fCB7fTtcclxuXHJcbiAgICAgICAgZm9yICg7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMgPSBhcmdzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBmb3IgKHByb3BOYW1lIGluIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBvcHRpb25zW3Byb3BOYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IG9wdGlvbnNbcHJvcE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcE5hbWVdID0gKGRlZXAgJiYgSXNQbGFpbk9iamVjdCh0YXJnZXRbcHJvcE5hbWVdKSkgPyBFeHRlbmQoZGVlcCwge30sIHByb3BWYWx1ZSkgOiBwcm9wVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJEV4dGVuZCA9IEV4dGVuZDtcclxuXHJcbiAgICBmdW5jdGlvbiBVbmV4dGVuZCh0YXJnZXQsIG9wdGlvbikge1xyXG4gICAgICAgICRKc3NvckRlYnVnJC4kQXNzZXJ0KG9wdGlvbik7XHJcblxyXG4gICAgICAgIHZhciB1bmV4dGVuZGVkID0ge307XHJcbiAgICAgICAgdmFyIG5hbWU7XHJcbiAgICAgICAgdmFyIHRhcmdldFByb3A7XHJcbiAgICAgICAgdmFyIG9wdGlvblByb3A7XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3RcclxuICAgICAgICBmb3IgKG5hbWUgaW4gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldFByb3AgPSB0YXJnZXRbbmFtZV07XHJcbiAgICAgICAgICAgIG9wdGlvblByb3AgPSBvcHRpb25bbmFtZV07XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0UHJvcCAhPT0gb3B0aW9uUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4Y2x1ZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKElzUGxhaW5PYmplY3QodGFyZ2V0UHJvcCkgJiYgSXNQbGFpbk9iamVjdChvcHRpb25Qcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFByb3AgPSBVbmV4dGVuZChvcHRpb25Qcm9wKTtcclxuICAgICAgICAgICAgICAgICAgICBleGNsdWRlID0gIUlzTm90RW1wdHkodGFyZ2V0UHJvcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICFleGNsdWRlICYmICh1bmV4dGVuZGVkW25hbWVdID0gdGFyZ2V0UHJvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XHJcbiAgICAgICAgcmV0dXJuIHVuZXh0ZW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJFVuZXh0ZW5kID0gVW5leHRlbmQ7XHJcblxyXG4gICAgX1RoaXMuJElzRnVuY3Rpb24gPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIFR5cGUob2JqKSA9PSBcImZ1bmN0aW9uXCI7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRJc0FycmF5ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiBUeXBlKG9iaikgPT0gXCJhcnJheVwiO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kSXNTdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIFR5cGUob2JqKSA9PSBcInN0cmluZ1wiO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kSXNOdW1lcmljID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4oUGFyc2VGbG9hdChvYmopKSAmJiBpc0Zpbml0ZShvYmopO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kVHlwZSA9IFR5cGU7XHJcblxyXG4gICAgLy8gYXJncyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxyXG4gICAgX1RoaXMuJEVhY2ggPSBFYWNoO1xyXG5cclxuICAgIF9UaGlzLiRJc05vdEVtcHR5ID0gSXNOb3RFbXB0eTtcclxuXHJcbiAgICBfVGhpcy4kSXNQbGFpbk9iamVjdCA9IElzUGxhaW5PYmplY3Q7XHJcblxyXG4gICAgZnVuY3Rpb24gQ3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJENyZWF0ZUVsZW1lbnQgPSBDcmVhdGVFbGVtZW50O1xyXG5cclxuICAgIF9UaGlzLiRDcmVhdGVEaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIENyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRDcmVhdGVTcGFuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBDcmVhdGVFbGVtZW50KFwiU1BBTlwiKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7IH07XHJcblxyXG4gICAgZnVuY3Rpb24gQXR0cmlidXRlKGVsbXQsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIGVsbXQuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG5cclxuICAgICAgICBlbG10LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQXR0cmlidXRlRXgoZWxtdCwgbmFtZSkge1xyXG4gICAgICAgIHJldHVybiBBdHRyaWJ1dGUoZWxtdCwgbmFtZSkgfHwgQXR0cmlidXRlKGVsbXQsIFwiZGF0YS1cIiArIG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9UaGlzLiRBdHRyaWJ1dGUgPSBBdHRyaWJ1dGU7XHJcbiAgICBfVGhpcy4kQXR0cmlidXRlRXggPSBBdHRyaWJ1dGVFeDtcclxuXHJcbiAgICBmdW5jdGlvbiBDbGFzc05hbWUoZWxtdCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBlbG10LmNsYXNzTmFtZTtcclxuXHJcbiAgICAgICAgZWxtdC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJENsYXNzTmFtZSA9IENsYXNzTmFtZTtcclxuXHJcbiAgICBmdW5jdGlvbiBUb0hhc2goYXJyYXkpIHtcclxuICAgICAgICB2YXIgaGFzaCA9IHt9O1xyXG5cclxuICAgICAgICBFYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBoYXNoW2l0ZW1dID0gaXRlbTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc2g7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gU3BsaXQoc3RyLCBzZXBhcmF0b3IpIHtcclxuICAgICAgICByZXR1cm4gc3RyLm1hdGNoKHNlcGFyYXRvciB8fCBSRUdFWF9XSElURVNQQUNFX0dMT0JBTCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gU3RyaW5nVG9IYXNoT2JqZWN0KHN0ciwgcmVnRXhwKSB7XHJcbiAgICAgICAgcmV0dXJuIFRvSGFzaChTcGxpdChzdHIgfHwgXCJcIiwgcmVnRXhwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJFRvSGFzaCA9IFRvSGFzaDtcclxuICAgIF9UaGlzLiRTcGxpdCA9IFNwbGl0O1xyXG5cclxuICAgIGZ1bmN0aW9uIEpvaW4oc2VwYXJhdG9yLCBzdHJpbmdzKSB7XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cInNlcGFyYXRvclwiIHR5cGU9XCJTdHJpbmdcIj5cclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cInN0cmluZ3NcIiB0eXBlPVwiQXJyYXlcIiB2YWx1ZT1cIlsnMSddXCI+XHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG5cclxuICAgICAgICB2YXIgam9pbmVkID0gXCJcIjtcclxuXHJcbiAgICAgICAgRWFjaChzdHJpbmdzLCBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgIGpvaW5lZCAmJiAoam9pbmVkICs9IHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgIGpvaW5lZCArPSBzdHI7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBqb2luZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gUmVwbGFjZUNsYXNzKGVsbXQsIG9sZENsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSB7XHJcbiAgICAgICAgQ2xhc3NOYW1lKGVsbXQsIEpvaW4oXCIgXCIsIEV4dGVuZChVbmV4dGVuZChTdHJpbmdUb0hhc2hPYmplY3QoQ2xhc3NOYW1lKGVsbXQpKSwgU3RyaW5nVG9IYXNoT2JqZWN0KG9sZENsYXNzTmFtZSkpLCBTdHJpbmdUb0hhc2hPYmplY3QobmV3Q2xhc3NOYW1lKSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBfVGhpcy4kSm9pbiA9IEpvaW47XHJcblxyXG4gICAgX1RoaXMuJEFkZENsYXNzID0gZnVuY3Rpb24gKGVsbXQsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgIFJlcGxhY2VDbGFzcyhlbG10LCBudWxsLCBjbGFzc05hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kUmVtb3ZlQ2xhc3MgPSBSZXBsYWNlQ2xhc3M7XHJcblxyXG4gICAgX1RoaXMuJFJlcGxhY2VDbGFzcyA9IFJlcGxhY2VDbGFzcztcclxuXHJcbiAgICBfVGhpcy4kUGFyZW50Tm9kZSA9IGZ1bmN0aW9uIChlbG10KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsbXQucGFyZW50Tm9kZTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEhpZGVFbGVtZW50ID0gZnVuY3Rpb24gKGVsbXQpIHtcclxuICAgICAgICBfVGhpcy4kQ3NzRGlzcGxheShlbG10LCBcIm5vbmVcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRFbmFibGVFbGVtZW50ID0gZnVuY3Rpb24gKGVsbXQsIG5vdEVuYWJsZSkge1xyXG4gICAgICAgIGlmIChub3RFbmFibGUpIHtcclxuICAgICAgICAgICAgX1RoaXMuJEF0dHJpYnV0ZShlbG10LCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgX1RoaXMuJFJlbW92ZUF0dHJpYnV0ZShlbG10LCBcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEhpZGVFbGVtZW50cyA9IGZ1bmN0aW9uIChlbG10cykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxtdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgX1RoaXMuJEhpZGVFbGVtZW50KGVsbXRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRTaG93RWxlbWVudCA9IGZ1bmN0aW9uIChlbG10LCBoaWRlKSB7XHJcbiAgICAgICAgX1RoaXMuJENzc0Rpc3BsYXkoZWxtdCwgaGlkZSA/IFwibm9uZVwiIDogXCJcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRTaG93RWxlbWVudHMgPSBmdW5jdGlvbiAoZWxtdHMsIGhpZGUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsbXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIF9UaGlzLiRTaG93RWxlbWVudChlbG10c1tpXSwgaGlkZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kUmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gKGVsbXQsIGF0dHJidXRlTmFtZSkge1xyXG4gICAgICAgIGVsbXQucmVtb3ZlQXR0cmlidXRlKGF0dHJidXRlTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRDYW5DbGVhckNsaXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIElzQnJvd3NlcklFKCkgJiYgX0Jyb3dzZXJSdW50aW1lVmVyc2lvbiA8IDEwO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kU2V0U3R5bGVDbGlwID0gZnVuY3Rpb24gKGVsbXQsIGNsaXApIHtcclxuICAgICAgICBpZiAoY2xpcCkge1xyXG4gICAgICAgICAgICBlbG10LnN0eWxlLmNsaXAgPSBcInJlY3QoXCIgKyBNYXRoLnJvdW5kKGNsaXAuJFRvcCkgKyBcInB4IFwiICsgTWF0aC5yb3VuZChjbGlwLiRSaWdodCkgKyBcInB4IFwiICsgTWF0aC5yb3VuZChjbGlwLiRCb3R0b20pICsgXCJweCBcIiArIE1hdGgucm91bmQoY2xpcC4kTGVmdCkgKyBcInB4KVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNzc1RleHQgPSBlbG10LnN0eWxlLmNzc1RleHQ7XHJcbiAgICAgICAgICAgIHZhciBjbGlwUmVncyA9IFtcclxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoL1tcXHNdKmNsaXA6IHJlY3RcXCguKj9cXClbO10/L2kpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCgvW1xcc10qY2xpcHRvcDogLio/WztdPy9pKSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoL1tcXHNdKmNsaXByaWdodDogLio/WztdPy9pKSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoL1tcXHNdKmNsaXBib3R0b206IC4qP1s7XT8vaSksXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKC9bXFxzXSpjbGlwbGVmdDogLio/WztdPy9pKVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5ld0Nzc1RleHQgPSBCdWlsZE5ld0Nzcyhjc3NUZXh0LCBjbGlwUmVncywgXCJcIik7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRDc3NDc3NUZXh0KGVsbXQsIG5ld0Nzc1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEdldE5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRBcHBlbmRDaGlsZCA9IGZ1bmN0aW9uIChlbG10LCBjaGlsZCkge1xyXG4gICAgICAgIGVsbXQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kQXBwZW5kQ2hpbGRyZW4gPSBmdW5jdGlvbiAoZWxtdCwgY2hpbGRyZW4pIHtcclxuICAgICAgICBFYWNoKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgX1RoaXMuJEFwcGVuZENoaWxkKGVsbXQsIGNoaWxkKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEluc2VydEJlZm9yZSA9IGZ1bmN0aW9uIChuZXdOb2RlLCByZWZOb2RlLCBwTm9kZSkge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdEluc2VydCBhIG5vZGUgYmVmb3JlIGEgcmVmZXJlbmNlIG5vZGVcclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICAvLy9cdDxwYXJhbSBuYW1lPVwibmV3Tm9kZVwiIHR5cGU9XCJIVE1MRWxlbWVudFwiPlxyXG4gICAgICAgIC8vL1x0XHRBIG5ldyBub2RlIHRvIGluc2VydFxyXG4gICAgICAgIC8vL1x0PC9wYXJhbT5cclxuICAgICAgICAvLy9cdDxwYXJhbSBuYW1lPVwicmVmTm9kZVwiIHR5cGU9XCJIVE1MRWxlbWVudFwiPlxyXG4gICAgICAgIC8vL1x0XHRUaGUgcmVmZXJlbmNlIG5vZGUgdG8gaW5zZXJ0IGEgbmV3IG5vZGUgYmVmb3JlXHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIC8vL1x0PHBhcmFtIG5hbWU9XCJwTm9kZVwiIHR5cGU9XCJIVE1MRWxlbWVudFwiIG9wdGlvbmFsPVwidHJ1ZVwiPlxyXG4gICAgICAgIC8vL1x0XHRUaGUgcGFyZW50IG5vZGUgdG8gaW5zZXJ0IG5vZGUgdG9cclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcblxyXG4gICAgICAgIChwTm9kZSB8fCByZWZOb2RlLnBhcmVudE5vZGUpLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZOb2RlKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEluc2VydEFmdGVyID0gZnVuY3Rpb24gKG5ld05vZGUsIHJlZk5vZGUsIHBOb2RlKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0SW5zZXJ0IGEgbm9kZSBhZnRlciBhIHJlZmVyZW5jZSBub2RlXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cIm5ld05vZGVcIiB0eXBlPVwiSFRNTEVsZW1lbnRcIj5cclxuICAgICAgICAvLy9cdFx0QSBuZXcgbm9kZSB0byBpbnNlcnRcclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cInJlZk5vZGVcIiB0eXBlPVwiSFRNTEVsZW1lbnRcIj5cclxuICAgICAgICAvLy9cdFx0VGhlIHJlZmVyZW5jZSBub2RlIHRvIGluc2VydCBhIG5ldyBub2RlIGFmdGVyXHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIC8vL1x0PHBhcmFtIG5hbWU9XCJwTm9kZVwiIHR5cGU9XCJIVE1MRWxlbWVudFwiIG9wdGlvbmFsPVwidHJ1ZVwiPlxyXG4gICAgICAgIC8vL1x0XHRUaGUgcGFyZW50IG5vZGUgdG8gaW5zZXJ0IG5vZGUgdG9cclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcblxyXG4gICAgICAgIF9UaGlzLiRJbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmTm9kZS5uZXh0U2libGluZywgcE5vZGUgfHwgcmVmTm9kZS5wYXJlbnROb2RlKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEluc2VydEFkamFjZW50SHRtbCA9IGZ1bmN0aW9uIChlbG10LCB3aGVyZSwgaHRtbCkge1xyXG4gICAgICAgIGVsbXQuaW5zZXJ0QWRqYWNlbnRIVE1MKHdoZXJlLCBodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJFJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxtdCwgcE5vZGUpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRSZW1vdmUgZWxlbWVudCBmcm9tIHBhcmVudCBub2RlXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cImVsbXRcIiB0eXBlPVwiSFRNTEVsZW1lbnRcIj5cclxuICAgICAgICAvLy9cdFx0VGhlIGVsZW1lbnQgdG8gcmVtb3ZlXHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIC8vL1x0PHBhcmFtIG5hbWU9XCJwTm9kZVwiIHR5cGU9XCJIVE1MRWxlbWVudFwiIG9wdGlvbmFsPVwidHJ1ZVwiPlxyXG4gICAgICAgIC8vL1x0XHRUaGUgcGFyZW50IG5vZGUgdG8gcmVtb3ZlIGVsbWVudCBmcm9tXHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgIChwTm9kZSB8fCBlbG10LnBhcmVudE5vZGUpLnJlbW92ZUNoaWxkKGVsbXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kUmVtb3ZlRWxlbWVudHMgPSBmdW5jdGlvbiAoZWxtdHMsIHBOb2RlKSB7XHJcbiAgICAgICAgRWFjaChlbG10cywgZnVuY3Rpb24gKGVsbXQpIHtcclxuICAgICAgICAgICAgX1RoaXMuJFJlbW92ZUVsZW1lbnQoZWxtdCwgcE5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kRW1wdHkgPSBmdW5jdGlvbiAoZWxtdCkge1xyXG4gICAgICAgIF9UaGlzLiRSZW1vdmVFbGVtZW50cyhfVGhpcy4kQ2hpbGRyZW4oZWxtdCwgdHJ1ZSksIGVsbXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpcy4kUGFyc2VJbnQgPSBmdW5jdGlvbiAoc3RyLCByYWRpeCkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChzdHIsIHJhZGl4IHx8IDEwKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIFBhcnNlRmxvYXQgPSBwYXJzZUZsb2F0O1xyXG5cclxuICAgIF9UaGlzLiRQYXJzZUZsb2F0ID0gUGFyc2VGbG9hdDtcclxuXHJcbiAgICBfVGhpcy4kSXNDaGlsZCA9IGZ1bmN0aW9uIChlbG10QSwgZWxtdEIpIHtcclxuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgICAgIHdoaWxlIChlbG10QiAmJiBlbG10QSAhPT0gZWxtdEIgJiYgYm9keSAhPT0gZWxtdEIpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGVsbXRCID0gZWxtdEIucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveCBzb21ldGltZXMgZmlyZXMgZXZlbnRzIGZvciBYVUwgZWxlbWVudHMsIHdoaWNoIHRocm93c1xyXG4gICAgICAgICAgICAgICAgLy8gYSBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3IuIHNvIHRoaXMgaXMgbm90IGEgY2hpbGQuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbG10QSA9PT0gZWxtdEI7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIENsb25lTm9kZShlbG10LCBub0RlZXAsIGtlZXBJZCkge1xyXG4gICAgICAgIHZhciBjbG9uZSA9IGVsbXQuY2xvbmVOb2RlKCFub0RlZXApO1xyXG4gICAgICAgIGlmICgha2VlcElkKSB7XHJcbiAgICAgICAgICAgIF9UaGlzLiRSZW1vdmVBdHRyaWJ1dGUoY2xvbmUsIFwiaWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2xvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXMuJENsb25lTm9kZSA9IENsb25lTm9kZTtcclxuXHJcbiAgICBfVGhpcy4kTG9hZEltYWdlID0gZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gTG9hZEltYWdlQ29tcGxldGVIYW5kbGVyKGV2ZW50LCBhYm9ydCkge1xyXG4gICAgICAgICAgICBfVGhpcy4kUmVtb3ZlRXZlbnQoaW1hZ2UsIFwibG9hZFwiLCBMb2FkSW1hZ2VDb21wbGV0ZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICBfVGhpcy4kUmVtb3ZlRXZlbnQoaW1hZ2UsIFwiYWJvcnRcIiwgRXJyb3JPckFib3J0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIF9UaGlzLiRSZW1vdmVFdmVudChpbWFnZSwgXCJlcnJvclwiLCBFcnJvck9yQWJvcnRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGltYWdlLCBhYm9ydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBFcnJvck9yQWJvcnRIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIExvYWRJbWFnZUNvbXBsZXRlSGFuZGxlcihldmVudCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoSXNCcm93c2VyT3BlcmEoKSAmJiBfQnJvd3NlclJ1bnRpbWVWZXJzaW9uIDwgMTEuNiB8fCAhc3JjKSB7XHJcbiAgICAgICAgICAgIExvYWRJbWFnZUNvbXBsZXRlSGFuZGxlcighc3JjKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBfVGhpcy4kQWRkRXZlbnQoaW1hZ2UsIFwibG9hZFwiLCBMb2FkSW1hZ2VDb21wbGV0ZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICBfVGhpcy4kQWRkRXZlbnQoaW1hZ2UsIFwiYWJvcnRcIiwgRXJyb3JPckFib3J0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIF9UaGlzLiRBZGRFdmVudChpbWFnZSwgXCJlcnJvclwiLCBFcnJvck9yQWJvcnRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyYztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRMb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlRWxtdHMsIG1haW5JbWFnZUVsbXQsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgIHZhciBfSW1hZ2VMb2FkaW5nID0gaW1hZ2VFbG10cy5sZW5ndGggKyAxO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBMb2FkSW1hZ2VDb21wbGV0ZUV2ZW50SGFuZGxlcihpbWFnZSwgYWJvcnQpIHtcclxuXHJcbiAgICAgICAgICAgIF9JbWFnZUxvYWRpbmctLTtcclxuICAgICAgICAgICAgaWYgKG1haW5JbWFnZUVsbXQgJiYgaW1hZ2UgJiYgaW1hZ2Uuc3JjID09IG1haW5JbWFnZUVsbXQuc3JjKVxyXG4gICAgICAgICAgICAgICAgbWFpbkltYWdlRWxtdCA9IGltYWdlO1xyXG4gICAgICAgICAgICAhX0ltYWdlTG9hZGluZyAmJiBjYWxsYmFjayAmJiBjYWxsYmFjayhtYWluSW1hZ2VFbG10KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVhY2goaW1hZ2VFbG10cywgZnVuY3Rpb24gKGltYWdlRWxtdCkge1xyXG4gICAgICAgICAgICBfVGhpcy4kTG9hZEltYWdlKGltYWdlRWxtdC5zcmMsIExvYWRJbWFnZUNvbXBsZXRlRXZlbnRIYW5kbGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgTG9hZEltYWdlQ29tcGxldGVFdmVudEhhbmRsZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJEJ1aWxkRWxlbWVudCA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgdGFnTmFtZSwgcmVwbGFjZXIsIGNyZWF0ZUNvcHkpIHtcclxuICAgICAgICBpZiAoY3JlYXRlQ29weSlcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSBDbG9uZU5vZGUodGVtcGxhdGUpO1xyXG5cclxuICAgICAgICB2YXIgdGVtcGxhdGVIb2xkZXJzID0gRmluZENoaWxkcmVuKHRlbXBsYXRlLCB0YWdOYW1lKTtcclxuICAgICAgICBpZiAoIXRlbXBsYXRlSG9sZGVycy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHRlbXBsYXRlSG9sZGVycyA9ICRKc3NvciQuJEdldEVsZW1lbnRzQnlUYWcodGVtcGxhdGUsIHRhZ05hbWUpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gdGVtcGxhdGVIb2xkZXJzLmxlbmd0aCAtIDE7IGogPiAtMTsgai0tKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZUhvbGRlciA9IHRlbXBsYXRlSG9sZGVyc1tqXTtcclxuICAgICAgICAgICAgdmFyIHJlcGxhY2VJdGVtID0gQ2xvbmVOb2RlKHJlcGxhY2VyKTtcclxuICAgICAgICAgICAgQ2xhc3NOYW1lKHJlcGxhY2VJdGVtLCBDbGFzc05hbWUodGVtcGxhdGVIb2xkZXIpKTtcclxuICAgICAgICAgICAgJEpzc29yJC4kQ3NzQ3NzVGV4dChyZXBsYWNlSXRlbSwgdGVtcGxhdGVIb2xkZXIuc3R5bGUuY3NzVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAkSnNzb3IkLiRJbnNlcnRCZWZvcmUocmVwbGFjZUl0ZW0sIHRlbXBsYXRlSG9sZGVyKTtcclxuICAgICAgICAgICAgJEpzc29yJC4kUmVtb3ZlRWxlbWVudCh0ZW1wbGF0ZUhvbGRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIEpzc29yQnV0dG9uRXgoZWxtdCkge1xyXG4gICAgICAgIHZhciBfU2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBfT3JpZ2luQ2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICB2YXIgX1RvZ2dsZUNsYXNzU3VmZml4ZXMgPSBbXCJhdlwiLCBcInB2XCIsIFwiZHNcIiwgXCJkblwiXTtcclxuICAgICAgICB2YXIgX1RvZ2dsZUNsYXNzZXMgPSBbXTtcclxuICAgICAgICB2YXIgX1RvZ2dsZUNsYXNzTmFtZTtcclxuXHJcbiAgICAgICAgdmFyIF9Jc01vdXNlRG93biA9IDA7ICAgLy9jbGFzcyBuYW1lICdkbidcclxuICAgICAgICB2YXIgX0lzU2VsZWN0ZWQgPSAwOyAgICAvL2NsYXNzIG5hbWUgMShhY3RpdmUpOiAnYXYnLCAyKHBhc3NpdmUpOiAncHYnXHJcbiAgICAgICAgdmFyIF9Jc0Rpc2FibGVkID0gMDsgICAgLy9jbGFzcyBuYW1lICdkcydcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gSGlnaGxpZ2h0KCkge1xyXG4gICAgICAgICAgICBSZXBsYWNlQ2xhc3MoZWxtdCwgX1RvZ2dsZUNsYXNzTmFtZSwgX1RvZ2dsZUNsYXNzZXNbX0lzRGlzYWJsZWQgfHwgX0lzTW91c2VEb3duIHx8IChfSXNTZWxlY3RlZCAmIDIpIHx8IF9Jc1NlbGVjdGVkXSk7XHJcbiAgICAgICAgICAgICRKc3NvciQuJENzcyhlbG10LCBcInBvaW50ZXItZXZlbnRzXCIsIF9Jc0Rpc2FibGVkID8gXCJub25lXCIgOiBcIlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIE1vdXNlVXBPckNhbmNlbEV2ZW50SGFuZGxlcihldmVudCkge1xyXG4gICAgICAgICAgICBfSXNNb3VzZURvd24gPSAwO1xyXG5cclxuICAgICAgICAgICAgSGlnaGxpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBfVGhpcy4kUmVtb3ZlRXZlbnQoZG9jdW1lbnQsIFwibW91c2V1cFwiLCBNb3VzZVVwT3JDYW5jZWxFdmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBfVGhpcy4kUmVtb3ZlRXZlbnQoZG9jdW1lbnQsIFwidG91Y2hlbmRcIiwgTW91c2VVcE9yQ2FuY2VsRXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgX1RoaXMuJFJlbW92ZUV2ZW50KGRvY3VtZW50LCBcInRvdWNoY2FuY2VsXCIsIE1vdXNlVXBPckNhbmNlbEV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBNb3VzZURvd25FdmVudEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKF9Jc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBfVGhpcy4kQ2FuY2VsRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIF9Jc01vdXNlRG93biA9IDQ7XHJcblxyXG4gICAgICAgICAgICAgICAgSGlnaGxpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX1RoaXMuJEFkZEV2ZW50KGRvY3VtZW50LCBcIm1vdXNldXBcIiwgTW91c2VVcE9yQ2FuY2VsRXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIF9UaGlzLiRBZGRFdmVudChkb2N1bWVudCwgXCJ0b3VjaGVuZFwiLCBNb3VzZVVwT3JDYW5jZWxFdmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgX1RoaXMuJEFkZEV2ZW50KGRvY3VtZW50LCBcInRvdWNoY2FuY2VsXCIsIE1vdXNlVXBPckNhbmNlbEV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9TZWxmLiRTZWxlY3RlZCA9IGZ1bmN0aW9uIChhY3RpdmF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZhdGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBfSXNTZWxlY3RlZCA9IChhY3RpdmF0ZSAmIDIpIHx8IChhY3RpdmF0ZSAmIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIEhpZ2hsaWdodCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9Jc1NlbGVjdGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1NlbGYuJEVuYWJsZSA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuICAgICAgICAgICAgaWYgKGVuYWJsZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhX0lzRGlzYWJsZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9Jc0Rpc2FibGVkID0gZW5hYmxlID8gMCA6IDM7XHJcblxyXG4gICAgICAgICAgICBIaWdobGlnaHQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL0pzc29yQnV0dG9uRXggQ29uc3RydWN0b3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsbXQgPSBfVGhpcy4kR2V0RWxlbWVudChlbG10KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbENsYXNzTmFtZUFycmF5ID0gJEpzc29yJC4kU3BsaXQoQ2xhc3NOYW1lKGVsbXQpKTtcclxuICAgICAgICAgICAgaWYgKG9yaWdpbmFsQ2xhc3NOYW1lQXJyYXkpXHJcbiAgICAgICAgICAgICAgICBfT3JpZ2luQ2xhc3NOYW1lID0gb3JpZ2luYWxDbGFzc05hbWVBcnJheS5zaGlmdCgpO1xyXG5cclxuICAgICAgICAgICAgRWFjaChfVG9nZ2xlQ2xhc3NTdWZmaXhlcywgZnVuY3Rpb24gKHRvZ2dsZUNsYXNzU3VmZml4KSB7XHJcbiAgICAgICAgICAgICAgICBfVG9nZ2xlQ2xhc3Nlcy5wdXNoKF9PcmlnaW5DbGFzc05hbWUgK3RvZ2dsZUNsYXNzU3VmZml4KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBfVG9nZ2xlQ2xhc3NOYW1lID0gSm9pbihcIiBcIiwgX1RvZ2dsZUNsYXNzZXMpO1xyXG5cclxuICAgICAgICAgICAgX1RvZ2dsZUNsYXNzZXMudW5zaGlmdChcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIF9UaGlzLiRBZGRFdmVudChlbG10LCBcIm1vdXNlZG93blwiLCBNb3VzZURvd25FdmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBfVGhpcy4kQWRkRXZlbnQoZWxtdCwgXCJ0b3VjaHN0YXJ0XCIsIE1vdXNlRG93bkV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9UaGlzLiRCdXR0b25pemUgPSBmdW5jdGlvbiAoZWxtdCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgSnNzb3JCdXR0b25FeChlbG10KTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJENzcyA9IENzcztcclxuICAgIF9UaGlzLiRDc3NOID0gQ3NzTjtcclxuICAgIF9UaGlzLiRDc3NQID0gQ3NzUDtcclxuXHJcbiAgICBfVGhpcy4kQ3NzT3ZlcmZsb3cgPSBDc3NQcm94eShcIm92ZXJmbG93XCIpO1xyXG5cclxuICAgIF9UaGlzLiRDc3NUb3AgPSBDc3NQcm94eShcInRvcFwiLCAyKTtcclxuICAgIF9UaGlzLiRDc3NMZWZ0ID0gQ3NzUHJveHkoXCJsZWZ0XCIsIDIpO1xyXG4gICAgX1RoaXMuJENzc1dpZHRoID0gQ3NzUHJveHkoXCJ3aWR0aFwiLCAyKTtcclxuICAgIF9UaGlzLiRDc3NIZWlnaHQgPSBDc3NQcm94eShcImhlaWdodFwiLCAyKTtcclxuICAgIF9UaGlzLiRDc3NNYXJnaW5MZWZ0ID0gQ3NzUHJveHkoXCJtYXJnaW5MZWZ0XCIsIDIpO1xyXG4gICAgX1RoaXMuJENzc01hcmdpblRvcCA9IENzc1Byb3h5KFwibWFyZ2luVG9wXCIsIDIpO1xyXG4gICAgX1RoaXMuJENzc1Bvc2l0aW9uID0gQ3NzUHJveHkoXCJwb3NpdGlvblwiKTtcclxuICAgIF9UaGlzLiRDc3NEaXNwbGF5ID0gQ3NzUHJveHkoXCJkaXNwbGF5XCIpO1xyXG4gICAgX1RoaXMuJENzc1pJbmRleCA9IENzc1Byb3h5KFwiekluZGV4XCIsIDEpO1xyXG4gICAgX1RoaXMuJENzc0Zsb2F0ID0gZnVuY3Rpb24gKGVsbXQsIGZsb2F0VmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gQ3NzKGVsbXQsIElzQnJvd3NlcklFKCkgPyBcInN0eWxlRmxvYXRcIiA6IFwiY3NzRmxvYXRcIiwgZmxvYXRWYWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgX1RoaXMuJENzc09wYWNpdHkgPSBmdW5jdGlvbiAoZWxtdCwgb3BhY2l0eSwgaWU5RWFybGllckZvcmNlKSB7XHJcbiAgICAgICAgaWYgKG9wYWNpdHkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIFNldFN0eWxlT3BhY2l0eShlbG10LCBvcGFjaXR5LCBpZTlFYXJsaWVyRm9yY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdldFN0eWxlT3BhY2l0eShlbG10KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRDc3NDc3NUZXh0ID0gZnVuY3Rpb24gKGVsbXQsIHRleHQpIHtcclxuICAgICAgICBpZiAodGV4dCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxtdC5zdHlsZS5jc3NUZXh0ID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbG10LnN0eWxlLmNzc1RleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX1N0eWxlR2V0dGVyID0ge1xyXG4gICAgICAgICRPcGFjaXR5OiBfVGhpcy4kQ3NzT3BhY2l0eSxcclxuICAgICAgICAkVG9wOiBfVGhpcy4kQ3NzVG9wLFxyXG4gICAgICAgICRMZWZ0OiBfVGhpcy4kQ3NzTGVmdCxcclxuICAgICAgICAkV2lkdGg6IF9UaGlzLiRDc3NXaWR0aCxcclxuICAgICAgICAkSGVpZ2h0OiBfVGhpcy4kQ3NzSGVpZ2h0LFxyXG4gICAgICAgICRQb3NpdGlvbjogX1RoaXMuJENzc1Bvc2l0aW9uLFxyXG4gICAgICAgICREaXNwbGF5OiBfVGhpcy4kQ3NzRGlzcGxheSxcclxuICAgICAgICAkWkluZGV4OiBfVGhpcy4kQ3NzWkluZGV4XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfU3R5bGVTZXR0ZXJSZXNlcnZlZDtcclxuXHJcbiAgICBmdW5jdGlvbiBTdHlsZVNldHRlcigpIHtcclxuICAgICAgICBpZiAoIV9TdHlsZVNldHRlclJlc2VydmVkKSB7XHJcbiAgICAgICAgICAgIF9TdHlsZVNldHRlclJlc2VydmVkID0gRXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICRNYXJnaW5Ub3A6IF9UaGlzLiRDc3NNYXJnaW5Ub3AsXHJcbiAgICAgICAgICAgICAgICAkTWFyZ2luTGVmdDogX1RoaXMuJENzc01hcmdpbkxlZnQsXHJcbiAgICAgICAgICAgICAgICAkQ2xpcDogX1RoaXMuJFNldFN0eWxlQ2xpcCxcclxuICAgICAgICAgICAgICAgICRUcmFuc2Zvcm06IF9UaGlzLiRTZXRTdHlsZVRyYW5zZm9ybVxyXG4gICAgICAgICAgICB9LCBfU3R5bGVHZXR0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX1N0eWxlU2V0dGVyUmVzZXJ2ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gU3R5bGVTZXR0ZXJFeCgpIHtcclxuICAgICAgICBTdHlsZVNldHRlcigpO1xyXG5cclxuICAgICAgICAvL0ZvciBDb21wcmVzc2lvbiBPbmx5XHJcbiAgICAgICAgX1N0eWxlU2V0dGVyUmVzZXJ2ZWQuJFRyYW5zZm9ybSA9IF9TdHlsZVNldHRlclJlc2VydmVkLiRUcmFuc2Zvcm07XHJcblxyXG4gICAgICAgIHJldHVybiBfU3R5bGVTZXR0ZXJSZXNlcnZlZDtcclxuICAgIH1cclxuXHJcbiAgICBfVGhpcy4kU3R5bGVTZXR0ZXIgPSBTdHlsZVNldHRlcjtcclxuXHJcbiAgICBfVGhpcy4kU3R5bGVTZXR0ZXJFeCA9IFN0eWxlU2V0dGVyRXg7XHJcblxyXG4gICAgX1RoaXMuJEdldFN0eWxlcyA9IGZ1bmN0aW9uIChlbG10LCBvcmlnaW5TdHlsZXMpIHtcclxuICAgICAgICBTdHlsZVNldHRlcigpO1xyXG5cclxuICAgICAgICB2YXIgc3R5bGVzID0ge307XHJcblxyXG4gICAgICAgIEVhY2gob3JpZ2luU3R5bGVzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICBpZiAoX1N0eWxlR2V0dGVyW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlc1trZXldID0gX1N0eWxlR2V0dGVyW2tleV0oZWxtdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlcztcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJFNldFN0eWxlcyA9IGZ1bmN0aW9uIChlbG10LCBzdHlsZXMpIHtcclxuICAgICAgICB2YXIgc3R5bGVTZXR0ZXIgPSBTdHlsZVNldHRlcigpO1xyXG5cclxuICAgICAgICBFYWNoKHN0eWxlcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgc3R5bGVTZXR0ZXJba2V5XSAmJiBzdHlsZVNldHRlcltrZXldKGVsbXQsIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJFNldFN0eWxlc0V4ID0gZnVuY3Rpb24gKGVsbXQsIHN0eWxlcykge1xyXG4gICAgICAgIFN0eWxlU2V0dGVyRXgoKTtcclxuXHJcbiAgICAgICAgX1RoaXMuJFNldFN0eWxlcyhlbG10LCBzdHlsZXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgJEpzc29yTWF0cml4JCA9IG5ldyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9UaGlzTWF0cml4ID0gdGhpcztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gTXVsdGlwbHkobWEsIG1iKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3MgPSBtYVswXS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciByb3dzID0gbWEubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgY29scyA9IG1iWzBdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXRyaXggPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgcm93czsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gbWF0cml4W3JdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNvbHM7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1bml0VmFsdWUgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBhYyA9IDA7IGFjIDwgYWNzOyBhYysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRWYWx1ZSArPSBtYVtyXVthY10gKiBtYlthY11bY107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByb3dbY10gPSB1bml0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtYXRyaXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfVGhpc01hdHJpeC4kU2NhbGVYID0gZnVuY3Rpb24gKG1hdHJpeCwgc3gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9UaGlzTWF0cml4LiRTY2FsZVhZKG1hdHJpeCwgc3gsIDApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIF9UaGlzTWF0cml4LiRTY2FsZVkgPSBmdW5jdGlvbiAobWF0cml4LCBzeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX1RoaXNNYXRyaXguJFNjYWxlWFkobWF0cml4LCAwLCBzeSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgX1RoaXNNYXRyaXguJFNjYWxlWFkgPSBmdW5jdGlvbiAobWF0cml4LCBzeCwgc3kpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE11bHRpcGx5KG1hdHJpeCwgW1tzeCwgMF0sIFswLCBzeV1dKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBfVGhpc01hdHJpeC4kVHJhbnNmb3JtUG9pbnQgPSBmdW5jdGlvbiAobWF0cml4LCBwKSB7XHJcbiAgICAgICAgICAgIHZhciBwTWF0cml4ID0gTXVsdGlwbHkobWF0cml4LCBbW3AueF0sIFtwLnldXSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUG9pbnQocE1hdHJpeFswXVswXSwgcE1hdHJpeFsxXVswXSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJENyZWF0ZU1hdHJpeCA9IGZ1bmN0aW9uIChhbHBoYSwgc2NhbGVYLCBzY2FsZVkpIHtcclxuICAgICAgICB2YXIgY29zID0gTWF0aC5jb3MoYWxwaGEpO1xyXG4gICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbHBoYSk7XHJcbiAgICAgICAgLy92YXIgcjExID0gY29zO1xyXG4gICAgICAgIC8vdmFyIHIyMSA9IHNpbjtcclxuICAgICAgICAvL3ZhciByMTIgPSAtc2luO1xyXG4gICAgICAgIC8vdmFyIHIyMiA9IGNvcztcclxuXHJcbiAgICAgICAgLy92YXIgbTExID0gY29zICogc2NhbGVYO1xyXG4gICAgICAgIC8vdmFyIG0xMiA9IC1zaW4gKiBzY2FsZVk7XHJcbiAgICAgICAgLy92YXIgbTIxID0gc2luICogc2NhbGVYO1xyXG4gICAgICAgIC8vdmFyIG0yMiA9IGNvcyAqIHNjYWxlWTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtbY29zICogc2NhbGVYLCAtc2luICogc2NhbGVZXSwgW3NpbiAqIHNjYWxlWCwgY29zICogc2NhbGVZXV07XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzLiRHZXRNYXRyaXhPZmZzZXQgPSBmdW5jdGlvbiAobWF0cml4LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIHAxID0gJEpzc29yTWF0cml4JC4kVHJhbnNmb3JtUG9pbnQobWF0cml4LCBQb2ludCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMikpO1xyXG4gICAgICAgIHZhciBwMiA9ICRKc3Nvck1hdHJpeCQuJFRyYW5zZm9ybVBvaW50KG1hdHJpeCwgUG9pbnQod2lkdGggLyAyLCAtaGVpZ2h0IC8gMikpO1xyXG4gICAgICAgIHZhciBwMyA9ICRKc3Nvck1hdHJpeCQuJFRyYW5zZm9ybVBvaW50KG1hdHJpeCwgUG9pbnQod2lkdGggLyAyLCBoZWlnaHQgLyAyKSk7XHJcbiAgICAgICAgdmFyIHA0ID0gJEpzc29yTWF0cml4JC4kVHJhbnNmb3JtUG9pbnQobWF0cml4LCBQb2ludCgtd2lkdGggLyAyLCBoZWlnaHQgLyAyKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBQb2ludChNYXRoLm1pbihwMS54LCBwMi54LCBwMy54LCBwNC54KSArIHdpZHRoIC8gMiwgTWF0aC5taW4ocDEueSwgcDIueSwgcDMueSwgcDQueSkgKyBoZWlnaHQgLyAyKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXMuJENhc3QgPSBmdW5jdGlvbiAoZnJvbVN0eWxlcywgZGlmU3R5bGVzLCBpbnRlclBvc2l0aW9uLCBlYXNpbmdzLCBkdXJpbmdzLCByb3VuZHMsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRTdHlsZXMgPSBkaWZTdHlsZXM7XHJcblxyXG4gICAgICAgIGlmIChmcm9tU3R5bGVzKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdHlsZXMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBkaWZTdHlsZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcm91bmQgPSByb3VuZHNba2V5XSB8fCAxO1xyXG4gICAgICAgICAgICAgICAgdmFyIGR1cmluZyA9IGR1cmluZ3Nba2V5XSB8fCBbMCwgMV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlJbnRlclBvc2l0aW9uID0gKGludGVyUG9zaXRpb24gLSBkdXJpbmdbMF0pIC8gZHVyaW5nWzFdO1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlJbnRlclBvc2l0aW9uID0gTWF0aC5taW4oTWF0aC5tYXgocHJvcGVydHlJbnRlclBvc2l0aW9uLCAwKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUludGVyUG9zaXRpb24gPSBwcm9wZXJ0eUludGVyUG9zaXRpb24gKiByb3VuZDtcclxuICAgICAgICAgICAgICAgIHZhciBmbG9vclBvc2l0aW9uID0gTWF0aC5mbG9vcihwcm9wZXJ0eUludGVyUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5SW50ZXJQb3NpdGlvbiAhPSBmbG9vclBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5SW50ZXJQb3NpdGlvbiAtPSBmbG9vclBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlYXNpbmcgPSBlYXNpbmdzW2tleV0gfHwgZWFzaW5ncy4kRGVmYXVsdCB8fCAkSnNzb3JFYXNpbmckLiRFYXNlU3dpbmc7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWFzaW5nVmFsdWUgPSBlYXNpbmcocHJvcGVydHlJbnRlclBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UHJvcGVydHlWYWx1ZTtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZyb21TdHlsZXNba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciB0b1ZhbHVlID0gZGlmU3R5bGVzW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmVmFsdWUgPSBkaWZTdHlsZXNba2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJEpzc29yJC4kSXNOdW1lcmljKGRpZlZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9wZXJ0eVZhbHVlID0gdmFsdWUgKyBkaWZWYWx1ZSAqIGVhc2luZ1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFByb3BlcnR5VmFsdWUgPSAkSnNzb3IkLiRFeHRlbmQoeyAkT2Zmc2V0OiB7fSB9LCBmcm9tU3R5bGVzW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3IkLiRFYWNoKGRpZlZhbHVlLiRPZmZzZXQsIGZ1bmN0aW9uIChyZWN0WCwgbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0VmFsdWUgPSByZWN0WCAqIGVhc2luZ1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UHJvcGVydHlWYWx1ZS4kT2Zmc2V0W25dID0gb2Zmc2V0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9wZXJ0eVZhbHVlW25dICs9IG9mZnNldFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFN0eWxlc1trZXldID0gY3VycmVudFByb3BlcnR5VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkaWZTdHlsZXMuJFpvb20gfHwgZGlmU3R5bGVzLiRSb3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdHlsZXMuJFRyYW5zZm9ybSA9IHsgJFJvdGF0ZTogY3VycmVudFN0eWxlcy4kUm90YXRlIHx8IDAsICRTY2FsZTogY3VycmVudFN0eWxlcy4kWm9vbSwgJE9yaWdpbmFsV2lkdGg6IG9wdGlvbnMuJE9yaWdpbmFsV2lkdGgsICRPcmlnaW5hbEhlaWdodDogb3B0aW9ucy4kT3JpZ2luYWxIZWlnaHQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRpZlN0eWxlcy4kQ2xpcCAmJiBvcHRpb25zLiRNb3ZlKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZUZyYW1lTkNsaXBPZmZzZXQgPSBjdXJyZW50U3R5bGVzLiRDbGlwLiRPZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0WSA9IChzdHlsZUZyYW1lTkNsaXBPZmZzZXQuJFRvcCB8fCAwKSArIChzdHlsZUZyYW1lTkNsaXBPZmZzZXQuJEJvdHRvbSB8fCAwKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldFggPSAoc3R5bGVGcmFtZU5DbGlwT2Zmc2V0LiRMZWZ0IHx8IDApICsgKHN0eWxlRnJhbWVOQ2xpcE9mZnNldC4kUmlnaHQgfHwgMCk7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50U3R5bGVzLiRMZWZ0ID0gKGN1cnJlbnRTdHlsZXMuJExlZnQgfHwgMCkgKyBvZmZzZXRYO1xyXG4gICAgICAgICAgICBjdXJyZW50U3R5bGVzLiRUb3AgPSAoY3VycmVudFN0eWxlcy4kVG9wIHx8IDApICsgb2Zmc2V0WTtcclxuICAgICAgICAgICAgY3VycmVudFN0eWxlcy4kQ2xpcC4kTGVmdCAtPSBvZmZzZXRYO1xyXG4gICAgICAgICAgICBjdXJyZW50U3R5bGVzLiRDbGlwLiRSaWdodCAtPSBvZmZzZXRYO1xyXG4gICAgICAgICAgICBjdXJyZW50U3R5bGVzLiRDbGlwLiRUb3AgLT0gb2Zmc2V0WTtcclxuICAgICAgICAgICAgY3VycmVudFN0eWxlcy4kQ2xpcC4kQm90dG9tIC09IG9mZnNldFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VycmVudFN0eWxlcy4kQ2xpcCAmJiAkSnNzb3IkLiRDYW5DbGVhckNsaXAoKSAmJiAhY3VycmVudFN0eWxlcy4kQ2xpcC4kVG9wICYmICFjdXJyZW50U3R5bGVzLiRDbGlwLiRMZWZ0ICYmIChjdXJyZW50U3R5bGVzLiRDbGlwLiRSaWdodCA9PSBvcHRpb25zLiRPcmlnaW5hbFdpZHRoKSAmJiAoY3VycmVudFN0eWxlcy4kQ2xpcC4kQm90dG9tID09IG9wdGlvbnMuJE9yaWdpbmFsSGVpZ2h0KSlcclxuICAgICAgICAgICAgY3VycmVudFN0eWxlcy4kQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50U3R5bGVzO1xyXG4gICAgfTtcclxufTtcclxuXHJcbi8vJEpzc29yT2JqZWN0JFxyXG5mdW5jdGlvbiAkSnNzb3JPYmplY3QkKCkge1xyXG4gICAgdmFyIF9UaGlzT2JqZWN0ID0gdGhpcztcclxuICAgIC8vIEZpZWxkc1xyXG5cclxuICAgIHZhciBfTGlzdGVuZXJzID0gW107IC8vIGRpY3Rpb25hcnkgb2YgZXZlbnROYW1lIC0tPiBhcnJheSBvZiBoYW5kbGVyc1xyXG4gICAgdmFyIF9MaXN0ZW5lZXMgPSBbXTtcclxuXHJcbiAgICAvLyBQcml2YXRlIE1ldGhvZHNcclxuICAgIGZ1bmN0aW9uIEFkZExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG5cclxuICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lID09IHVuZGVmaW5lZCB8fCBldmVudE5hbWUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBhcmFtICdldmVudE5hbWUnIGlzIG51bGwgb3IgZW1wdHkuXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaGFuZGxlcikgIT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcInBhcmFtICdoYW5kbGVyJyBtdXN0IGJlIGEgZnVuY3Rpb24uXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRKc3NvciQuJEVhY2goX0xpc3RlbmVycywgZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuJEV2ZW50TmFtZSA9PSBldmVudE5hbWUgJiYgbGlzdGVuZXIuJEhhbmRsZXIgPT09IGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaGFuZGxlciBsaXN0ZW5lZCB0byB0aGUgZXZlbnQgYWxyZWFkeSwgY2Fubm90IGxpc3RlbiB0byB0aGUgc2FtZSBldmVudCBvZiB0aGUgc2FtZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBoYW5kbGVyIHR3aWNlLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF9MaXN0ZW5lcnMucHVzaCh7ICRFdmVudE5hbWU6IGV2ZW50TmFtZSwgJEhhbmRsZXI6IGhhbmRsZXIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gUmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XHJcblxyXG4gICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUgPT0gdW5kZWZpbmVkIHx8IGV2ZW50TmFtZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicGFyYW0gJ2V2ZW50TmFtZScgaXMgbnVsbCBvciBlbXB0eS5cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChoYW5kbGVyKSAhPSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwicGFyYW0gJ2hhbmRsZXInIG11c3QgYmUgYSBmdW5jdGlvbi5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkSnNzb3IkLiRFYWNoKF9MaXN0ZW5lcnMsIGZ1bmN0aW9uIChsaXN0ZW5lciwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyLiRFdmVudE5hbWUgPT0gZXZlbnROYW1lICYmIGxpc3RlbmVyLiRIYW5kbGVyID09PSBoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBfTGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBDbGVhckxpc3RlbmVycygpIHtcclxuICAgICAgICBfTGlzdGVuZXJzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQ2xlYXJMaXN0ZW5lZXMoKSB7XHJcblxyXG4gICAgICAgICRKc3NvciQuJEVhY2goX0xpc3RlbmVlcywgZnVuY3Rpb24gKGxpc3RlbmVlKSB7XHJcbiAgICAgICAgICAgICRKc3NvciQuJFJlbW92ZUV2ZW50KGxpc3RlbmVlLiRPYmosIGxpc3RlbmVlLiRFdmVudE5hbWUsIGxpc3RlbmVlLiRIYW5kbGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgX0xpc3RlbmVlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vUHJvdGVjdGVkIE1ldGhvZHNcclxuICAgIF9UaGlzT2JqZWN0LiRMaXN0ZW4gPSBmdW5jdGlvbiAob2JqLCBldmVudE5hbWUsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcclxuXHJcbiAgICAgICAgJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFvYmopXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwYXJhbSAnb2JqJyBpcyBudWxsIG9yIGVtcHR5LlwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUgPT0gdW5kZWZpbmVkIHx8IGV2ZW50TmFtZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicGFyYW0gJ2V2ZW50TmFtZScgaXMgbnVsbCBvciBlbXB0eS5cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChoYW5kbGVyKSAhPSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwicGFyYW0gJ2hhbmRsZXInIG11c3QgYmUgYSBmdW5jdGlvbi5cIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJEpzc29yJC4kRWFjaChfTGlzdGVuZWVzLCBmdW5jdGlvbiAobGlzdGVuZWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lZS4kT2JqID09PSBvYmogJiYgbGlzdGVuZWUuJEV2ZW50TmFtZSA9PSBldmVudE5hbWUgJiYgbGlzdGVuZWUuJEhhbmRsZXIgPT09IGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaGFuZGxlciBsaXN0ZW5lZCB0byB0aGUgZXZlbnQgYWxyZWFkeSwgY2Fubm90IGxpc3RlbiB0byB0aGUgc2FtZSBldmVudCBvZiB0aGUgc2FtZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBoYW5kbGVyIHR3aWNlLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRKc3NvciQuJEFkZEV2ZW50KG9iaiwgZXZlbnROYW1lLCBoYW5kbGVyLCB1c2VDYXB0dXJlKTtcclxuICAgICAgICBfTGlzdGVuZWVzLnB1c2goeyAkT2JqOiBvYmosICRFdmVudE5hbWU6IGV2ZW50TmFtZSwgJEhhbmRsZXI6IGhhbmRsZXIgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzT2JqZWN0LiRVbmxpc3RlbiA9IGZ1bmN0aW9uIChvYmosIGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG5cclxuICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIW9iailcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBhcmFtICdvYmonIGlzIG51bGwgb3IgZW1wdHkuXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSA9PSB1bmRlZmluZWQgfHwgZXZlbnROYW1lID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwYXJhbSAnZXZlbnROYW1lJyBpcyBudWxsIG9yIGVtcHR5LlwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGhhbmRsZXIpICE9IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJwYXJhbSAnaGFuZGxlcicgbXVzdCBiZSBhIGZ1bmN0aW9uLlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRKc3NvciQuJEVhY2goX0xpc3RlbmVlcywgZnVuY3Rpb24gKGxpc3RlbmVlLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAobGlzdGVuZWUuJE9iaiA9PT0gb2JqICYmIGxpc3RlbmVlLiRFdmVudE5hbWUgPT0gZXZlbnROYW1lICYmIGxpc3RlbmVlLiRIYW5kbGVyID09PSBoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRSZW1vdmVFdmVudChvYmosIGV2ZW50TmFtZSwgaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBfTGlzdGVuZWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNPYmplY3QuJFVubGlzdGVuQWxsID0gQ2xlYXJMaXN0ZW5lZXM7XHJcblxyXG4gICAgLy8gUHVibGljIE1ldGhvZHNcclxuICAgIF9UaGlzT2JqZWN0LiRPbiA9IF9UaGlzT2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIgPSBBZGRMaXN0ZW5lcjtcclxuXHJcbiAgICBfVGhpc09iamVjdC4kT2ZmID0gX1RoaXNPYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IFJlbW92ZUxpc3RlbmVyO1xyXG5cclxuICAgIF9UaGlzT2JqZWN0LiRUcmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XHJcblxyXG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG5cclxuICAgICAgICAkSnNzb3IkLiRFYWNoKF9MaXN0ZW5lcnMsIGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBsaXN0ZW5lci4kRXZlbnROYW1lID09IGV2ZW50TmFtZSAmJiBsaXN0ZW5lci4kSGFuZGxlci5hcHBseSh3aW5kb3csIGFyZ3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpc09iamVjdC4kRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBDbGVhckxpc3RlbmVlcygpO1xyXG4gICAgICAgIENsZWFyTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gX1RoaXNPYmplY3QpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBfVGhpc09iamVjdFtuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgJEpzc29yRGVidWckLiRDX0Fic3RyYWN0Q2xhc3MoX1RoaXNPYmplY3QpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gJEpzc29yQW5pbWF0b3IkKGRlbGF5LCBkdXJhdGlvbiwgb3B0aW9ucywgZWxtdCwgZnJvbVN0eWxlcywgZGlmU3R5bGVzKSB7XHJcbiAgICBkZWxheSA9IGRlbGF5IHx8IDA7XHJcblxyXG4gICAgdmFyIF9UaGlzQW5pbWF0b3IgPSB0aGlzO1xyXG4gICAgdmFyIF9BdXRvUGxheTtcclxuICAgIHZhciBfSGlkZW47XHJcbiAgICB2YXIgX0NvbWJpbmVNb2RlO1xyXG4gICAgdmFyIF9QbGF5VG9Qb3NpdGlvbjtcclxuICAgIHZhciBfUGxheURpcmVjdGlvbjtcclxuICAgIHZhciBfTm9TdG9wO1xyXG4gICAgdmFyIF9UaW1lU3RhbXBMYXN0RnJhbWUgPSAwO1xyXG5cclxuICAgIHZhciBfU3ViRWFzaW5ncztcclxuICAgIHZhciBfU3ViUm91bmRzO1xyXG4gICAgdmFyIF9TdWJEdXJpbmdzO1xyXG4gICAgdmFyIF9DYWxsYmFjaztcclxuXHJcbiAgICB2YXIgX1NoaWZ0ID0gMDtcclxuICAgIHZhciBfUG9zaXRpb25fQ3VycmVudCA9IDA7XHJcbiAgICB2YXIgX1Bvc2l0aW9uX0Rpc3BsYXkgPSAwO1xyXG4gICAgdmFyIF9Ib29rZWQ7XHJcblxyXG4gICAgdmFyIF9Qb3NpdGlvbl9Jbm5lckJlZ2luID0gZGVsYXk7XHJcbiAgICB2YXIgX1Bvc2l0aW9uX0lubmVyRW5kID0gZGVsYXkgKyBkdXJhdGlvbjtcclxuICAgIHZhciBfUG9zaXRpb25fT3V0ZXJCZWdpbjtcclxuICAgIHZhciBfUG9zaXRpb25fT3V0ZXJFbmQ7XHJcbiAgICB2YXIgX0xvb3BMZW5ndGg7XHJcblxyXG4gICAgdmFyIF9OZXN0ZWRBbmltYXRvcnMgPSBbXTtcclxuICAgIHZhciBfU3R5bGVTZXR0ZXI7XHJcblxyXG4gICAgZnVuY3Rpb24gR2V0UG9zaXRpb25SYW5nZShwb3NpdGlvbiwgYmVnaW4sIGVuZCkge1xyXG4gICAgICAgIHZhciByYW5nZSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IGJlZ2luKVxyXG4gICAgICAgICAgICByYW5nZSA9IC0xO1xyXG5cclxuICAgICAgICBlbHNlIGlmIChwb3NpdGlvbiA+IGVuZClcclxuICAgICAgICAgICAgcmFuZ2UgPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gcmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gR2V0SW5uZXJQb3NpdGlvblJhbmdlKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIEdldFBvc2l0aW9uUmFuZ2UocG9zaXRpb24sIF9Qb3NpdGlvbl9Jbm5lckJlZ2luLCBfUG9zaXRpb25fSW5uZXJFbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEdldE91dGVyUG9zaXRpb25SYW5nZShwb3NpdGlvbikge1xyXG4gICAgICAgIHJldHVybiBHZXRQb3NpdGlvblJhbmdlKHBvc2l0aW9uLCBfUG9zaXRpb25fT3V0ZXJCZWdpbiwgX1Bvc2l0aW9uX091dGVyRW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTaGlmdChvZmZzZXQpIHtcclxuICAgICAgICBfUG9zaXRpb25fT3V0ZXJCZWdpbiArPSBvZmZzZXQ7XHJcbiAgICAgICAgX1Bvc2l0aW9uX091dGVyRW5kICs9IG9mZnNldDtcclxuICAgICAgICBfUG9zaXRpb25fSW5uZXJCZWdpbiArPSBvZmZzZXQ7XHJcbiAgICAgICAgX1Bvc2l0aW9uX0lubmVyRW5kICs9IG9mZnNldDtcclxuXHJcbiAgICAgICAgX1Bvc2l0aW9uX0N1cnJlbnQgKz0gb2Zmc2V0O1xyXG4gICAgICAgIF9Qb3NpdGlvbl9EaXNwbGF5ICs9IG9mZnNldDtcclxuXHJcbiAgICAgICAgX1NoaWZ0ID0gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIExvY2F0ZShwb3NpdGlvbiwgcmVsYXRpdmUpIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gcG9zaXRpb24gLSBfUG9zaXRpb25fT3V0ZXJCZWdpbiArIGRlbGF5ICogcmVsYXRpdmU7XHJcblxyXG4gICAgICAgIFNoaWZ0KG9mZnNldCk7XHJcblxyXG4gICAgICAgIC8vJEpzc29yRGVidWckLiRFeGVjdXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICBfVGhpc0FuaW1hdG9yLiRQb3NpdGlvbl9Jbm5lckJlZ2luID0gX1Bvc2l0aW9uX0lubmVyQmVnaW47XHJcbiAgICAgICAgLy8gICAgX1RoaXNBbmltYXRvci4kUG9zaXRpb25fSW5uZXJFbmQgPSBfUG9zaXRpb25fSW5uZXJFbmQ7XHJcbiAgICAgICAgLy8gICAgX1RoaXNBbmltYXRvci4kUG9zaXRpb25fT3V0ZXJCZWdpbiA9IF9Qb3NpdGlvbl9PdXRlckJlZ2luO1xyXG4gICAgICAgIC8vICAgIF9UaGlzQW5pbWF0b3IuJFBvc2l0aW9uX091dGVyRW5kID0gX1Bvc2l0aW9uX091dGVyRW5kO1xyXG4gICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBfUG9zaXRpb25fT3V0ZXJFbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gR29Ub1Bvc2l0aW9uKHBvc2l0aW9uT3V0ZXIsIGZvcmNlKSB7XHJcbiAgICAgICAgdmFyIHRyaW1lZFBvc2l0aW9uT3V0ZXIgPSBwb3NpdGlvbk91dGVyO1xyXG5cclxuICAgICAgICBpZiAoX0xvb3BMZW5ndGggJiYgKHRyaW1lZFBvc2l0aW9uT3V0ZXIgPj0gX1Bvc2l0aW9uX091dGVyRW5kIHx8IHRyaW1lZFBvc2l0aW9uT3V0ZXIgPD0gX1Bvc2l0aW9uX091dGVyQmVnaW4pKSB7XHJcbiAgICAgICAgICAgIHRyaW1lZFBvc2l0aW9uT3V0ZXIgPSAoKHRyaW1lZFBvc2l0aW9uT3V0ZXIgLSBfUG9zaXRpb25fT3V0ZXJCZWdpbikgJSBfTG9vcExlbmd0aCArIF9Mb29wTGVuZ3RoKSAlIF9Mb29wTGVuZ3RoICsgX1Bvc2l0aW9uX091dGVyQmVnaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIV9Ib29rZWQgfHwgX05vU3RvcCB8fCBmb3JjZSB8fCBfUG9zaXRpb25fQ3VycmVudCAhPSB0cmltZWRQb3NpdGlvbk91dGVyKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25Ub0Rpc3BsYXkgPSBNYXRoLm1pbih0cmltZWRQb3NpdGlvbk91dGVyLCBfUG9zaXRpb25fT3V0ZXJFbmQpO1xyXG4gICAgICAgICAgICBwb3NpdGlvblRvRGlzcGxheSA9IE1hdGgubWF4KHBvc2l0aW9uVG9EaXNwbGF5LCBfUG9zaXRpb25fT3V0ZXJCZWdpbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIV9Ib29rZWQgfHwgX05vU3RvcCB8fCBmb3JjZSB8fCBwb3NpdGlvblRvRGlzcGxheSAhPSBfUG9zaXRpb25fRGlzcGxheSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaWZTdHlsZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGludGVyUG9zaXRpb24gPSAocG9zaXRpb25Ub0Rpc3BsYXkgLSBfUG9zaXRpb25fSW5uZXJCZWdpbikgLyAoZHVyYXRpb24gfHwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLiRSZXZlcnNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlclBvc2l0aW9uID0gMSAtIGludGVyUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U3R5bGVzID0gJEpzc29yJC4kQ2FzdChmcm9tU3R5bGVzLCBkaWZTdHlsZXMsIGludGVyUG9zaXRpb24sIF9TdWJFYXNpbmdzLCBfU3ViRHVyaW5ncywgX1N1YlJvdW5kcywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvciQuJEVhY2goY3VycmVudFN0eWxlcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX1N0eWxlU2V0dGVyW2tleV0gJiYgX1N0eWxlU2V0dGVyW2tleV0oZWxtdCwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9UaGlzQW5pbWF0b3IuJE9uSW5uZXJPZmZzZXRDaGFuZ2UoX1Bvc2l0aW9uX0Rpc3BsYXkgLSBfUG9zaXRpb25fSW5uZXJCZWdpbiwgcG9zaXRpb25Ub0Rpc3BsYXkgLSBfUG9zaXRpb25fSW5uZXJCZWdpbik7XHJcblxyXG4gICAgICAgICAgICAgICAgX1Bvc2l0aW9uX0Rpc3BsYXkgPSBwb3NpdGlvblRvRGlzcGxheTtcclxuXHJcbiAgICAgICAgICAgICAgICAkSnNzb3IkLiRFYWNoKF9OZXN0ZWRBbmltYXRvcnMsIGZ1bmN0aW9uIChhbmltYXRvciwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXN0ZWRBbmltYXRvciA9IHBvc2l0aW9uT3V0ZXIgPCBfUG9zaXRpb25fQ3VycmVudCA/IF9OZXN0ZWRBbmltYXRvcnNbX05lc3RlZEFuaW1hdG9ycy5sZW5ndGggLSBpIC0gMV0gOiBhbmltYXRvcjtcclxuICAgICAgICAgICAgICAgICAgICBuZXN0ZWRBbmltYXRvci4kR29Ub1Bvc2l0aW9uKF9Qb3NpdGlvbl9EaXNwbGF5IC0gX1NoaWZ0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25PbGQgPSBfUG9zaXRpb25fQ3VycmVudDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbk5ldyA9IF9Qb3NpdGlvbl9EaXNwbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIF9Qb3NpdGlvbl9DdXJyZW50ID0gdHJpbWVkUG9zaXRpb25PdXRlcjtcclxuICAgICAgICAgICAgICAgIF9Ib29rZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIF9UaGlzQW5pbWF0b3IuJE9uUG9zaXRpb25DaGFuZ2UocG9zaXRpb25PbGQsIHBvc2l0aW9uTmV3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBKb2luKGFuaW1hdG9yLCBjb21iaW5lTW9kZSwgbm9FeHBhbmQpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRDb21iaW5lIGFub3RoZXIgYW5pbWF0b3IgYXMgbmVzdGVkIGFuaW1hdG9yXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cImFuaW1hdG9yXCIgdHlwZT1cIiRKc3NvckFuaW1hdG9yJFwiPlxyXG4gICAgICAgIC8vL1x0XHRBbiBpbnN0YW5jZSBvZiAkSnNzb3JBbmltYXRvciRcclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cImNvbWJpbmVNb2RlXCIgdHlwZT1cImludFwiPlxyXG4gICAgICAgIC8vL1x0XHQwOiBwYXJhbGxlbCAtIHBsYWNlIHRoZSBhbmltYXRvciBwYXJhbGxlbCB0byB0aGlzIGFuaW1hdG9yLlxyXG4gICAgICAgIC8vL1x0XHQxOiBjaGFpbiAtIGNoYWluIHRoZSBhbmltYXRvciBhdCB0aGUgX1Bvc2l0aW9uX0lubmVyRW5kIG9mIHRoaXMgYW5pbWF0b3IuXHJcbiAgICAgICAgLy8vXHQ8L3BhcmFtPlxyXG4gICAgICAgICRKc3NvckRlYnVnJC4kRXhlY3V0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjb21iaW5lTW9kZSAhPT0gMCAmJiBjb21iaW5lTW9kZSAhPT0gMSlcclxuICAgICAgICAgICAgICAgICRKc3NvckRlYnVnJC4kRmFpbChcIkFyZ3VtZW50IG91dCBvZiByYW5nZSwgdGhlIHZhbHVlIG9mICdjb21iaW5lTW9kZScgc2hvdWxkIGJlIGVpdGhlciAwIG9yIDEuXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29tYmluZU1vZGUpXHJcbiAgICAgICAgICAgIGFuaW1hdG9yLiRMb2NhdGUoX1Bvc2l0aW9uX091dGVyRW5kLCAxKTtcclxuXHJcbiAgICAgICAgaWYgKCFub0V4cGFuZCkge1xyXG4gICAgICAgICAgICBfUG9zaXRpb25fT3V0ZXJCZWdpbiA9IE1hdGgubWluKF9Qb3NpdGlvbl9PdXRlckJlZ2luLCBhbmltYXRvci4kR2V0UG9zaXRpb25fT3V0ZXJCZWdpbigpICsgX1NoaWZ0KTtcclxuICAgICAgICAgICAgX1Bvc2l0aW9uX091dGVyRW5kID0gTWF0aC5tYXgoX1Bvc2l0aW9uX091dGVyRW5kLCBhbmltYXRvci4kR2V0UG9zaXRpb25fT3V0ZXJFbmQoKSArIF9TaGlmdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9OZXN0ZWRBbmltYXRvcnMucHVzaChhbmltYXRvcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIFJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuICAgIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuICAgIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuICAgIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuXHJcbiAgICBpZiAoJEpzc29yJC4kSXNCcm93c2VyU2FmYXJpKCkgJiYgJEpzc29yJC4kQnJvd3NlclZlcnNpb24oKSA8IDcpIHtcclxuICAgICAgICBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyRKc3NvckRlYnVnJC4kTG9nKFwiQ3VzdG9tIGFuaW1hdGlvbiBmcmFtZSBmb3Igc2FmYXJpIGJlZm9yZSA3LlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgJEpzc29yJC4kRGVsYXkoY2FsbGJhY2ssIG9wdGlvbnMuJEludGVydmFsKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gU2hvd0ZyYW1lKCkge1xyXG4gICAgICAgIGlmIChfQXV0b1BsYXkpIHtcclxuICAgICAgICAgICAgdmFyIG5vdyA9ICRKc3NvciQuJEdldE5vdygpO1xyXG4gICAgICAgICAgICB2YXIgdGltZU9mZnNldCA9IE1hdGgubWluKG5vdyAtIF9UaW1lU3RhbXBMYXN0RnJhbWUsIG9wdGlvbnMuJEludGVydmFsTWF4KTtcclxuICAgICAgICAgICAgdmFyIHRpbWVQb3NpdGlvbiA9IF9Qb3NpdGlvbl9DdXJyZW50ICsgdGltZU9mZnNldCAqIF9QbGF5RGlyZWN0aW9uO1xyXG4gICAgICAgICAgICBfVGltZVN0YW1wTGFzdEZyYW1lID0gbm93O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRpbWVQb3NpdGlvbiAqIF9QbGF5RGlyZWN0aW9uID49IF9QbGF5VG9Qb3NpdGlvbiAqIF9QbGF5RGlyZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgdGltZVBvc2l0aW9uID0gX1BsYXlUb1Bvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgR29Ub1Bvc2l0aW9uKHRpbWVQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIV9Ob1N0b3AgJiYgdGltZVBvc2l0aW9uICogX1BsYXlEaXJlY3Rpb24gPj0gX1BsYXlUb1Bvc2l0aW9uICogX1BsYXlEaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIFN0b3AoX0NhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFJlcXVlc3RBbmltYXRpb25GcmFtZShTaG93RnJhbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFBsYXlUb1Bvc2l0aW9uKHRvUG9zaXRpb24sIGNhbGxiYWNrLCBub1N0b3ApIHtcclxuICAgICAgICBpZiAoIV9BdXRvUGxheSkge1xyXG4gICAgICAgICAgICBfQXV0b1BsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICBfTm9TdG9wID0gbm9TdG9wXHJcbiAgICAgICAgICAgIF9DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICB0b1Bvc2l0aW9uID0gTWF0aC5tYXgodG9Qb3NpdGlvbiwgX1Bvc2l0aW9uX091dGVyQmVnaW4pO1xyXG4gICAgICAgICAgICB0b1Bvc2l0aW9uID0gTWF0aC5taW4odG9Qb3NpdGlvbiwgX1Bvc2l0aW9uX091dGVyRW5kKTtcclxuICAgICAgICAgICAgX1BsYXlUb1Bvc2l0aW9uID0gdG9Qb3NpdGlvbjtcclxuICAgICAgICAgICAgX1BsYXlEaXJlY3Rpb24gPSBfUGxheVRvUG9zaXRpb24gPCBfUG9zaXRpb25fQ3VycmVudCA/IC0xIDogMTtcclxuICAgICAgICAgICAgX1RoaXNBbmltYXRvci4kT25TdGFydCgpO1xyXG4gICAgICAgICAgICBfVGltZVN0YW1wTGFzdEZyYW1lID0gJEpzc29yJC4kR2V0Tm93KCk7XHJcbiAgICAgICAgICAgIFJlcXVlc3RBbmltYXRpb25GcmFtZShTaG93RnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTdG9wKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKF9BdXRvUGxheSkge1xyXG4gICAgICAgICAgICBfTm9TdG9wID0gX0F1dG9QbGF5ID0gX0NhbGxiYWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIF9UaGlzQW5pbWF0b3IuJE9uU3RvcCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kUGxheSA9IGZ1bmN0aW9uIChwb3NpdGlvbkxlbmd0aCwgY2FsbGJhY2ssIG5vU3RvcCkge1xyXG4gICAgICAgIFBsYXlUb1Bvc2l0aW9uKHBvc2l0aW9uTGVuZ3RoID8gX1Bvc2l0aW9uX0N1cnJlbnQgKyBwb3NpdGlvbkxlbmd0aCA6IF9Qb3NpdGlvbl9PdXRlckVuZCwgY2FsbGJhY2ssIG5vU3RvcCk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzQW5pbWF0b3IuJFBsYXlUb1Bvc2l0aW9uID0gUGxheVRvUG9zaXRpb247XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kUGxheVRvQmVnaW4gPSBmdW5jdGlvbiAoY2FsbGJhY2ssIG5vU3RvcCkge1xyXG4gICAgICAgIFBsYXlUb1Bvc2l0aW9uKF9Qb3NpdGlvbl9PdXRlckJlZ2luLCBjYWxsYmFjaywgbm9TdG9wKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kUGxheVRvRW5kID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBub1N0b3ApIHtcclxuICAgICAgICBQbGF5VG9Qb3NpdGlvbihfUG9zaXRpb25fT3V0ZXJFbmQsIGNhbGxiYWNrLCBub1N0b3ApO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpc0FuaW1hdG9yLiRTdG9wID0gU3RvcDtcclxuXHJcbiAgICBfVGhpc0FuaW1hdG9yLiRDb250aW51ZSA9IGZ1bmN0aW9uICh0b1Bvc2l0aW9uKSB7XHJcbiAgICAgICAgUGxheVRvUG9zaXRpb24odG9Qb3NpdGlvbik7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzQW5pbWF0b3IuJEdldFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfUG9zaXRpb25fQ3VycmVudDtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kR2V0UGxheVRvUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9QbGF5VG9Qb3NpdGlvbjtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kR2V0UG9zaXRpb25fRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX1Bvc2l0aW9uX0Rpc3BsYXk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzQW5pbWF0b3IuJEdvVG9Qb3NpdGlvbiA9IEdvVG9Qb3NpdGlvbjtcclxuXHJcbiAgICBfVGhpc0FuaW1hdG9yLiRHb1RvQmVnaW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgR29Ub1Bvc2l0aW9uKF9Qb3NpdGlvbl9PdXRlckJlZ2luLCB0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kR29Ub0VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBHb1RvUG9zaXRpb24oX1Bvc2l0aW9uX091dGVyRW5kLCB0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kTW92ZSA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuICAgICAgICBHb1RvUG9zaXRpb24oX1Bvc2l0aW9uX0N1cnJlbnQgKyBvZmZzZXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpc0FuaW1hdG9yLiRDb21iaW5lTW9kZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX0NvbWJpbmVNb2RlO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpc0FuaW1hdG9yLiRHZXREdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZHVyYXRpb247XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzQW5pbWF0b3IuJElzUGxheWluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX0F1dG9QbGF5O1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpc0FuaW1hdG9yLiRJc09uVGhlV2F5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfUG9zaXRpb25fQ3VycmVudCA+IF9Qb3NpdGlvbl9Jbm5lckJlZ2luICYmIF9Qb3NpdGlvbl9DdXJyZW50IDw9IF9Qb3NpdGlvbl9Jbm5lckVuZDtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kU2V0TG9vcExlbmd0aCA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcclxuICAgICAgICBfTG9vcExlbmd0aCA9IGxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kTG9jYXRlID0gTG9jYXRlO1xyXG5cclxuICAgIF9UaGlzQW5pbWF0b3IuJFNoaWZ0ID0gU2hpZnQ7XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kSm9pbiA9IEpvaW47XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kQ29tYmluZSA9IGZ1bmN0aW9uIChhbmltYXRvcikge1xyXG4gICAgICAgIC8vL1x0PHN1bW1hcnk+XHJcbiAgICAgICAgLy8vXHRcdENvbWJpbmUgYW5vdGhlciBhbmltYXRvciBwYXJhbGxlbCB0byB0aGlzIGFuaW1hdG9yXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cGFyYW0gbmFtZT1cImFuaW1hdG9yXCIgdHlwZT1cIiRKc3NvckFuaW1hdG9yJFwiPlxyXG4gICAgICAgIC8vL1x0XHRBbiBpbnN0YW5jZSBvZiAkSnNzb3JBbmltYXRvciRcclxuICAgICAgICAvLy9cdDwvcGFyYW0+XHJcbiAgICAgICAgSm9pbihhbmltYXRvciwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9UaGlzQW5pbWF0b3IuJENoYWluID0gZnVuY3Rpb24gKGFuaW1hdG9yKSB7XHJcbiAgICAgICAgLy8vXHQ8c3VtbWFyeT5cclxuICAgICAgICAvLy9cdFx0Q2hhaW4gYW5vdGhlciBhbmltYXRvciBhdCB0aGUgX1Bvc2l0aW9uX0lubmVyRW5kIG9mIHRoaXMgYW5pbWF0b3JcclxuICAgICAgICAvLy9cdDwvc3VtbWFyeT5cclxuICAgICAgICAvLy9cdDxwYXJhbSBuYW1lPVwiYW5pbWF0b3JcIiB0eXBlPVwiJEpzc29yQW5pbWF0b3IkXCI+XHJcbiAgICAgICAgLy8vXHRcdEFuIGluc3RhbmNlIG9mICRKc3NvckFuaW1hdG9yJFxyXG4gICAgICAgIC8vL1x0PC9wYXJhbT5cclxuICAgICAgICBKb2luKGFuaW1hdG9yLCAxKTtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kR2V0UG9zaXRpb25fSW5uZXJCZWdpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRJbnRlcm5hbCBtZW1iZXIgZnVuY3Rpb24sIGRvIG5vdCB1c2UgaXQuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cHJpdmF0ZSAvPlxyXG4gICAgICAgIC8vL1x0PHJldHVybnMgdHlwZT1cImludFwiIC8+XHJcbiAgICAgICAgcmV0dXJuIF9Qb3NpdGlvbl9Jbm5lckJlZ2luO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpc0FuaW1hdG9yLiRHZXRQb3NpdGlvbl9Jbm5lckVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRJbnRlcm5hbCBtZW1iZXIgZnVuY3Rpb24sIGRvIG5vdCB1c2UgaXQuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cHJpdmF0ZSAvPlxyXG4gICAgICAgIC8vL1x0PHJldHVybnMgdHlwZT1cImludFwiIC8+XHJcbiAgICAgICAgcmV0dXJuIF9Qb3NpdGlvbl9Jbm5lckVuZDtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kR2V0UG9zaXRpb25fT3V0ZXJCZWdpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRJbnRlcm5hbCBtZW1iZXIgZnVuY3Rpb24sIGRvIG5vdCB1c2UgaXQuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cHJpdmF0ZSAvPlxyXG4gICAgICAgIC8vL1x0PHJldHVybnMgdHlwZT1cImludFwiIC8+XHJcbiAgICAgICAgcmV0dXJuIF9Qb3NpdGlvbl9PdXRlckJlZ2luO1xyXG4gICAgfTtcclxuXHJcbiAgICBfVGhpc0FuaW1hdG9yLiRHZXRQb3NpdGlvbl9PdXRlckVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy9cdDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vL1x0XHRJbnRlcm5hbCBtZW1iZXIgZnVuY3Rpb24sIGRvIG5vdCB1c2UgaXQuXHJcbiAgICAgICAgLy8vXHQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vXHQ8cHJpdmF0ZSAvPlxyXG4gICAgICAgIC8vL1x0PHJldHVybnMgdHlwZT1cImludFwiIC8+XHJcbiAgICAgICAgcmV0dXJuIF9Qb3NpdGlvbl9PdXRlckVuZDtcclxuICAgIH07XHJcblxyXG4gICAgX1RoaXNBbmltYXRvci4kT25Qb3NpdGlvbkNoYW5nZSA9IF9UaGlzQW5pbWF0b3IuJE9uU3RhcnQgPSBfVGhpc0FuaW1hdG9yLiRPblN0b3AgPSBfVGhpc0FuaW1hdG9yLiRPbklubmVyT2Zmc2V0Q2hhbmdlID0gJEpzc29yJC4kRW1wdHlGdW5jdGlvbjtcclxuICAgIF9UaGlzQW5pbWF0b3IuJFZlcnNpb24gPSAkSnNzb3IkLiRHZXROb3coKTtcclxuXHJcbiAgICAvL0NvbnN0cnVjdG9yICAxXHJcbiAgICB7XHJcbiAgICAgICAgb3B0aW9ucyA9ICRKc3NvciQuJEV4dGVuZCh7XHJcbiAgICAgICAgICAgICRJbnRlcnZhbDogMTYsXHJcbiAgICAgICAgICAgICRJbnRlcnZhbE1heDogNTBcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy9Tb2RvIHN0YXRlbWVudCwgZm9yIGRldmVsb3BtZW50IHRpbWUgaW50ZWxsaXNlbmNlIG9ubHlcclxuICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gJEpzc29yJC4kRXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICRMb29wTGVuZ3RoOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAkU2V0dGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAkRWFzaW5nOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgfSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF9Mb29wTGVuZ3RoID0gb3B0aW9ucy4kTG9vcExlbmd0aDtcclxuXHJcbiAgICAgICAgX1N0eWxlU2V0dGVyID0gJEpzc29yJC4kRXh0ZW5kKHt9LCAkSnNzb3IkLiRTdHlsZVNldHRlcigpLCBvcHRpb25zLiRTZXR0ZXIpO1xyXG5cclxuICAgICAgICBfUG9zaXRpb25fT3V0ZXJCZWdpbiA9IF9Qb3NpdGlvbl9Jbm5lckJlZ2luID0gZGVsYXk7XHJcbiAgICAgICAgX1Bvc2l0aW9uX091dGVyRW5kID0gX1Bvc2l0aW9uX0lubmVyRW5kID0gZGVsYXkgKyBkdXJhdGlvbjtcclxuXHJcbiAgICAgICAgX1N1YlJvdW5kcyA9IG9wdGlvbnMuJFJvdW5kIHx8IHt9O1xyXG4gICAgICAgIF9TdWJEdXJpbmdzID0gb3B0aW9ucy4kRHVyaW5nIHx8IHt9O1xyXG4gICAgICAgIF9TdWJFYXNpbmdzID0gJEpzc29yJC4kRXh0ZW5kKHsgJERlZmF1bHQ6ICRKc3NvciQuJElzRnVuY3Rpb24ob3B0aW9ucy4kRWFzaW5nKSAmJiBvcHRpb25zLiRFYXNpbmcgfHwgJEpzc29yRWFzaW5nJC4kRWFzZVN3aW5nIH0sIG9wdGlvbnMuJEVhc2luZyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiAkSnNzb3JQbGF5ZXJDbGFzcyQoKSB7XHJcblxyXG4gICAgdmFyIF9UaGlzUGxheWVyID0gdGhpcztcclxuICAgIHZhciBfUGxheWVyQ29udHJvbGxlcnMgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBQbGF5ZXJDb250cm9sbGVyKHBsYXllckVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgX1NlbGZQbGF5ZXJDb250cm9sbGVyID0gdGhpcztcclxuICAgICAgICB2YXIgX1BsYXllckluc3RhbmNlO1xyXG4gICAgICAgIHZhciBfUGxheWVySW5zdGFudGNlcyA9IFtdO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBPblBsYXllckluc3RhbmNlRGF0YUF2YWlsYWJsZShldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgc3JjRWxlbWVudCA9ICRKc3NvciQuJEV2dFNyYyhldmVudCk7XHJcbiAgICAgICAgICAgIF9QbGF5ZXJJbnN0YW5jZSA9IHNyY0VsZW1lbnQucEluc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgJEpzc29yJC4kUmVtb3ZlRXZlbnQoc3JjRWxlbWVudCwgXCJkYXRhYXZhaWxhYmxlXCIsIE9uUGxheWVySW5zdGFuY2VEYXRhQXZhaWxhYmxlKTtcclxuICAgICAgICAgICAgJEpzc29yJC4kRWFjaChfUGxheWVySW5zdGFudGNlcywgZnVuY3Rpb24gKHBsYXllckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5zdGFuY2UgIT0gX1BsYXllckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySW5zdGFuY2UuJFJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckVsZW1lbnQucFRhZ05hbWUgPSBfUGxheWVySW5zdGFuY2UudGFnTmFtZTtcclxuICAgICAgICAgICAgX1BsYXllckluc3RhbnRjZXMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gSGFuZGxlUGxheWVySW5zdGFuY2UocGxheWVySW5zdGFuY2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJIYW5kbGVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwbGF5ZXJJbnN0YW5jZUVsZW1lbnQucEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVySGFuZGxlckF0dHJpYnV0ZSA9ICRKc3NvciQuJEF0dHJpYnV0ZUV4KHBsYXllckluc3RhbmNlRWxlbWVudCwgXCJwSGFuZGxlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJEpzc29yUGxheWVyJFtwbGF5ZXJIYW5kbGVyQXR0cmlidXRlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRKc3NvciQuJEFkZEV2ZW50KHBsYXllckluc3RhbmNlRWxlbWVudCwgXCJkYXRhYXZhaWxhYmxlXCIsIE9uUGxheWVySW5zdGFuY2VEYXRhQXZhaWxhYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kbGVyID0gbmV3ICRKc3NvclBsYXllciRbcGxheWVySGFuZGxlckF0dHJpYnV0ZV0ocGxheWVyRWxlbWVudCwgcGxheWVySW5zdGFuY2VFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBfUGxheWVySW5zdGFudGNlcy5wdXNoKHBsYXllckhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkSnNzb3JEZWJ1ZyQuJEV4ZWN1dGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJEpzc29yJC4kVHlwZShwbGF5ZXJIYW5kbGVyLiRSZW1vdmUpICE9IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJEpzc29yRGVidWckLiRGYWlsKFwiJ3BSZW1vdmUnIGludGVyZmFjZSBub3QgaW1wbGVtZW50ZWQgZm9yIHBsYXllciBoYW5kbGVyICdcIiArIHBsYXllckhhbmRsZXJBdHRyaWJ1dGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJIYW5kbGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX1NlbGZQbGF5ZXJDb250cm9sbGVyLiRJbml0UGxheWVyQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFwbGF5ZXJFbGVtZW50LnBJbnN0YW5jZSAmJiAhSGFuZGxlUGxheWVySW5zdGFuY2UocGxheWVyRWxlbWVudCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVySW5zdGFuY2VFbGVtZW50cyA9ICRKc3NvciQuJENoaWxkcmVuKHBsYXllckVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICRKc3NvciQuJEVhY2gocGxheWVySW5zdGFuY2VFbGVtZW50cywgZnVuY3Rpb24gKHBsYXllckluc3RhbmNlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEhhbmRsZVBsYXllckluc3RhbmNlKHBsYXllckluc3RhbmNlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX1RoaXNQbGF5ZXIuJEVWVF9TV0lUQ0ggPSAyMTtcclxuXHJcbiAgICBfVGhpc1BsYXllci4kRmV0Y2hQbGF5ZXJzID0gZnVuY3Rpb24gKGVsbXQpIHtcclxuICAgICAgICBlbG10ID0gZWxtdCB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgICB2YXIgcGxheWVyRWxlbWVudHMgPSAkSnNzb3IkLiRGaW5kQ2hpbGRyZW4oZWxtdCwgXCJwbGF5ZXJcIik7XHJcblxyXG4gICAgICAgICRKc3NvciQuJEVhY2gocGxheWVyRWxlbWVudHMsIGZ1bmN0aW9uIChwbGF5ZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICghX1BsYXllckNvbnRyb2xsZXJzW3BsYXllckVsZW1lbnQucElkXSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyRWxlbWVudC5wSWQgPSBfUGxheWVyQ29udHJvbGxlcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgX1BsYXllckNvbnRyb2xsZXJzLnB1c2gobmV3IFBsYXllckNvbnRyb2xsZXIocGxheWVyRWxlbWVudCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJDb250cm9sbGVyID0gX1BsYXllckNvbnRyb2xsZXJzW3BsYXllckVsZW1lbnQucElkXTtcclxuICAgICAgICAgICAgcGxheWVyQ29udHJvbGxlci4kSW5pdFBsYXllckNvbnRyb2xsZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn0iXSwiZmlsZSI6Impzc29yLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=