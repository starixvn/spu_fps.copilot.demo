export declare function countTruthy(values: boolean[]): number;
export declare function checking(isDebug?: boolean): {
    device: string;
    debugInfo: {
        isItMobile: boolean;
        isItTablet: boolean;
        isItDesktop: boolean;
        isItTouchDevice: boolean;
        isItAndroid: boolean;
        isItIOS: boolean;
        isItTrident: boolean;
        screenWidth: number;
        screenHeight: number;
        platform: string;
    } | {
        isItMobile?: undefined;
        isItTablet?: undefined;
        isItDesktop?: undefined;
        isItTouchDevice?: undefined;
        isItAndroid?: undefined;
        isItIOS?: undefined;
        isItTrident?: undefined;
        screenWidth?: undefined;
        screenHeight?: undefined;
        platform?: undefined;
    };
};
