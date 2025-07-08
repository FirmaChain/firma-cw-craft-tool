import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background_black: string;
            background_navbar: string;
            emerald_green: string;
            mint_gree: string;
            black_1: string;
            black_2: string;
            black_3: string;
            black_4: string;
            gray_1: string;
            gray_2: string;
            gray_3: string;
            gray_4: string;
            white_1: string;
            white_2: string;
            white_3: string;
            green_1: string;
            green_2: string;
            mainred?: string;
        };
        sizes: {
            navbar_width: string;
            cw_switch_width: string;
            cw_switch: string;
        };
        images?: {
            ic_refresh?: string;
        };
    }
}
