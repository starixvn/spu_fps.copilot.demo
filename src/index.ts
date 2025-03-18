// write docstring here for index.ts
// This file is the entry point of the library. 
// It contains the main function that checks the device type and returns the result.
// The function uses helper functions to check the device type based on the browser and platform.
// The helper functions use feature detection to determine the device type.
// The result is an object with the device type and debug info. 
// The debug info contains the results of the feature detection tests.
// The function returns the device type and debug info as an object.


export function countTruthy(values: boolean[]): number {
  return values.reduce(function (sum: number, value: boolean): number {         
    return sum + (value ? 1 : 0); 
  }, 0);
}

// For Chrome
export function isChromium() {
    var w = window;
    var n = navigator;
    return (countTruthy([
        'webkitPersistentStorage' in n,
        'webkitTemporaryStorage' in n,
        n.vendor.indexOf('Google') === 0,
        'webkitResolveLocalFileSystemURL' in w,
        'BatteryManager' in w,
        'webkitMediaStream' in w,
        'webkitSpeechGrammar' in w,
    ]) >= 4);
}

//For Firefox
function isGecko() {
    var _a, _b;
    var w = window;
    return (countTruthy([
        'buildID' in navigator,
        'MozAppearance' in ((_b = (_a = document.documentElement) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0 ? _b : {}),
        'onmozfullscreenchange' in w,
        'mozInnerScreenX' in w,
        'CSSMozDocumentRule' in w,
        'CanvasCaptureMediaStream' in w,
    ]) >= 4);
}

//For IE
function isTrident() {
    var w = window;
    var n = navigator;
    return (countTruthy([
        'MSCSSMatrix' in w,
        'msSetImmediate' in w,
        'msIndexedDB' in w,
        'msMaxTouchPoints' in n,
        'msPointerEnabled' in n,
    ]) >= 4);
}

// For Safari
function isWebKit() {
    var w = window;
    var n = navigator;
    return (countTruthy([
        'ApplePayError' in w,
        'CSSPrimitiveValue' in w,
        'Counter' in w,
        n.vendor.indexOf('Apple') === 0,
        'getStorageUpdates' in n,
        'WebKitMediaKeys' in w,
    ]) >= 4);
}

function isAndroid() {
    var isItChromium = isChromium();
    var isItGecko = isGecko();
    
    if (!isItChromium && !isItGecko) {
        return false;
    }
    var w = window;
    return (countTruthy([
        'onorientationchange' in w,
        'orientation' in w,
        isItChromium && !('SharedWorker' in w),
        isItGecko && /android/i.test(navigator.appVersion),
    ]) >= 2);
}

function isIOS()
{
    var isItWebKit = isWebKit();

    if(!isItWebKit) return false;

    var w = window;

    return (countTruthy([
        'safari' in w,
        ('DeviceMotionEvent' in w),
        ('ongestureend' in w),
        ('standalone' in navigator),
    ]) >= 3);
}

// GEt USer Agent
function getUserAgent() {
    return navigator.userAgent;
}

// Parse User Agent from result of method getUserAgent return browser name
export function parseUserAgent(userAgent: string) {
    const browserMatch = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    const browserName = browserMatch[ 1 ] || '';
    const browserVersion = browserMatch[ 2 ] || 0;    
    return {
        browser: browserName,
        version: browserVersion
    };      
}

/**
 * Determines the device type (Mobile, Desktop, or Unknown) based on various browser features and characteristics
 * @param isDebug - When true, returns additional debug information about the detection process
 * @returns {Object} An object containing:
 *   - device: 'Mobile' | 'Desktop' | 'Unknown'
 *   - debugInfo: Detailed detection information (only when isDebug is true)
 */
export function checking(isDebug = false) {
    // Check if device supports touch events or has touch points
    var isItTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Detect Android and iOS devices using feature detection
    var isItAndroid = isAndroid();
    var isItIOS = isIOS();
    
    // Get screen dimensions for device type detection
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height; 
    
    // Check for Internet Explorer
    var isItTrident = isTrident();

    // Device is considered mobile if at least 3 of these conditions are true:
    // 1. Is Android or iOS
    // 2. Has touch capabilities
    // 3. Screen size is tablet/phone sized (<=1024)
    // 4. Platform string matches mobile devices
    var isItMobile = (countTruthy([
        isItAndroid || isItIOS,        
        isItTouchDevice,
        (screenWidth <= 1024 && screenHeight <= 1024),
        (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.platform))
    ]) >= 3);

    // Device is considered tablet if at least 3 of these conditions are true:
    // 1. Is Android or iOS
    // 2. Has touch capabilities
    // 3. Screen size is larger than typical phone (>1024)
    // 4. Platform string matches tablet devices
    var isItTablet = (countTruthy([
        isItAndroid || isItIOS,
        isItTouchDevice,
        (screenWidth > 1024 || screenHeight > 1024),
        (/Android|iPad|tablet/i.test(navigator.platform))
    ]) >= 3);

    let result = 'Unknown';
    let isItDesktop = false;

    // If device matches mobile or tablet criteria, classify as Mobile
    if(isItMobile || isItTablet) {
        result = 'Mobile';       
    } else {
        // Device is considered desktop if at least 3 of these conditions are true:
        // 1. Not Android or iOS
        // 2. No touch capabilities
        // 3. Large screen size
        // 4. Platform string matches desktop OS
        isItDesktop = (countTruthy([
            !isItAndroid && !isItIOS,            
            !isItTouchDevice,
            (screenWidth > 1024 || screenHeight > 1024),
            (/Win|Mac|Linux/i.test(navigator.platform))
        ]) >= 3);

        if(isItDesktop || isItTrident) {
            result = 'Desktop';           
        }        
    }

    // Return result object with optional debug information
    return {
        device: result,
        debugInfo: isDebug ? {
            isItMobile,
            isItTablet,
            isItDesktop,
            isItTouchDevice,
            isItAndroid,
            isItIOS,
            isItTrident,
            screenWidth,
            screenHeight,
            platform: navigator.platform,
            userAgent: getUserAgent(),
            browser: parseUserAgent(getUserAgent()),
        } : {}
    }     
}

