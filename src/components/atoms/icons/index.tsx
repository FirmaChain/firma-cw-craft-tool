import { useId } from 'react';

const Amount = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <g id="wallet-fill">
                <g id="Dollar Coin 1">
                    <path
                        d="M11.4789 2.01338C6.37084 2.2756 2.2756 6.37084 2.01338 11.4789C1.70995 17.3899 6.61011 22.2901 12.5211 21.9866C17.6292 21.7244 21.7244 17.6292 21.9866 12.5211C22.2901 6.61011 17.3899 1.70995 11.4789 2.01338ZM13.097 17.0919V18.6133H11.2885V17.1659C10.2033 17.0551 8.90274 16.7049 8.00306 15.8642L9.21706 14.3743C10.1593 14.9937 10.9844 15.273 11.8601 15.3097C13.121 15.3629 13.6887 14.8605 13.6519 14.1829C13.5633 12.5483 8.47939 12.6049 8.47939 9.73489C8.47939 8.17625 9.54241 7.09571 11.2884 6.79773V5.39228H13.0969V6.76359C14.27 6.91604 15.131 7.41224 15.847 8.06368L14.4835 9.40394C13.8095 8.87817 13.1765 8.56827 12.4026 8.5484C11.2623 8.51912 10.8852 9.05563 10.8936 9.59583C10.9171 11.1124 15.9821 11.0088 15.9821 14.0489C15.9821 15.5736 15 16.7461 13.0969 17.0918L13.097 17.0919Z"
                        fill="#02E191"
                    />
                    <path
                        d="M11.4789 2.01338C6.37084 2.2756 2.2756 6.37084 2.01338 11.4789C1.70995 17.3899 6.61011 22.2901 12.5211 21.9866C17.6292 21.7244 21.7244 17.6292 21.9866 12.5211C22.2901 6.61011 17.3899 1.70995 11.4789 2.01338ZM13.097 17.0919V18.6133H11.2885V17.1659C10.2033 17.0551 8.90274 16.7049 8.00306 15.8642L9.21706 14.3743C10.1593 14.9937 10.9844 15.273 11.8601 15.3097C13.121 15.3629 13.6887 14.8605 13.6519 14.1829C13.5633 12.5483 8.47939 12.6049 8.47939 9.73489C8.47939 8.17625 9.54241 7.09571 11.2884 6.79773V5.39228H13.0969V6.76359C14.27 6.91604 15.131 7.41224 15.847 8.06368L14.4835 9.40394C13.8095 8.87817 13.1765 8.56827 12.4026 8.5484C11.2623 8.51912 10.8852 9.05563 10.8936 9.59583C10.9171 11.1124 15.9821 11.0088 15.9821 14.0489C15.9821 15.5736 15 16.7461 13.0969 17.0918L13.097 17.0919Z"
                        fill="black"
                        fillOpacity="0.3"
                    />
                </g>
            </g>
        </svg>
    );
};

const CoinStack1 = (props: any) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M5 8C5 5.79086 6.79086 4 9 4H15C17.2091 4 19 5.79086 19 8V16.1552C19 18.0007 17.7374 19.6066 15.944 20.0422L12.944 20.7707C12.3237 20.9214 11.6763 20.9214 11.056 20.7707L8.05601 20.0422C6.26262 19.6066 5 18.0007 5 16.1552V8Z"
                fill="#02E191"
            />
            <path
                d="M5 8C5 5.79086 6.79086 4 9 4H15C17.2091 4 19 5.79086 19 8V16.1552C19 18.0007 17.7374 19.6066 15.944 20.0422L12.944 20.7707C12.3237 20.9214 11.6763 20.9214 11.056 20.7707L8.05601 20.0422C6.26262 19.6066 5 18.0007 5 16.1552V8Z"
                fill="black"
                fillOpacity="0.2"
            />
            <path
                d="M12 8.4C15.866 8.4 19 7.19117 19 5.7C19 4.20883 15.866 3 12 3C8.13401 3 5 4.20883 5 5.7C5 7.19117 8.13401 8.4 12 8.4Z"
                fill="#02E191"
            />
            <path
                d="M12 8.4C15.866 8.4 19 7.19117 19 5.7C19 4.20883 15.866 3 12 3C8.13401 3 5 4.20883 5 5.7C5 7.19117 8.13401 8.4 12 8.4Z"
                fill="black"
                fillOpacity="0.2"
            />
            <path
                d="M19 5.7C19 7.19117 15.866 8.4 12 8.4C8.13401 8.4 5 7.19117 5 5.7M19 5.7C19 4.20883 15.866 3 12 3C8.13401 3 5 4.20883 5 5.7M19 5.7V18.3C19 19.7912 15.866 21 12 21C8.13401 21 5 19.7912 5 18.3V5.7M19 9.89994C19 11.3911 15.866 12.5999 12 12.5999C8.13401 12.5999 5 11.3911 5 9.89994M19 14.097C19 15.5882 15.866 16.797 12 16.797C8.13401 16.797 5 15.5882 5 14.097"
                stroke="#1E1E1E"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const CoinStack2 = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 20" fill="none">
            <g id="coins-stacked-02">
                <g id="Icon">
                    <path
                        d="M7.05 6.44444C10.3913 6.44444 13.1 5.44952 13.1 4.22222C13.1 2.99492 10.3913 2 7.05 2C3.70868 2 1 2.99492 1 4.22222C1 5.44952 3.70868 6.44444 7.05 6.44444Z"
                        fill="#807E7E"
                    />
                    <path
                        d="M16.95 13.1111C20.2913 13.1111 23 12.1162 23 10.8889C23 9.66159 20.2913 8.66667 16.95 8.66667C13.6087 8.66667 10.9 9.66159 10.9 10.8889C10.9 12.1162 13.6087 13.1111 16.95 13.1111Z"
                        fill="#807E7E"
                    />
                    <path
                        d="M10.9 10.8889C10.9 9.66159 13.6087 8.66667 16.95 8.66667C20.2913 8.66667 23 9.66159 23 10.8889V19.7778C23 21.0051 20.2913 22 16.95 22C13.6087 22 10.9 21.0051 10.9 19.7778V10.8889Z"
                        fill="#807E7E"
                    />
                    <path
                        d="M7.05 2C3.70868 2 1 2.99492 1 4.22222V17.5556C1 18.7829 3.70868 19.7778 7.05 19.7778C8.51259 19.7778 9.85397 19.5871 10.9 19.2698V10.8889C10.9 10.1988 11.7563 9.5822 13.1 9.17461V4.22222C13.1 2.99492 10.3913 2 7.05 2Z"
                        fill="#807E7E"
                    />
                    <path
                        d="M13.1 4.22222C13.1 5.44952 10.3913 6.44444 7.05 6.44444C3.70868 6.44444 1 5.44952 1 4.22222M13.1 4.22222C13.1 2.99492 10.3913 2 7.05 2C3.70868 2 1 2.99492 1 4.22222M13.1 4.22222V9.17461C11.7563 9.5822 10.9 10.1988 10.9 10.8889M1 4.22222V17.5556C1 18.7829 3.70868 19.7778 7.05 19.7778C8.51259 19.7778 9.85397 19.5871 10.9 19.2698V10.8889M1 8.66667C1 9.89397 3.70868 10.8889 7.05 10.8889C8.51259 10.8889 9.85397 10.6983 10.9 10.3809M1 13.1111C1 14.3384 3.70868 15.3333 7.05 15.3333C8.51259 15.3333 9.85397 15.1427 10.9 14.8254M23 10.8889C23 12.1162 20.2913 13.1111 16.95 13.1111C13.6087 13.1111 10.9 12.1162 10.9 10.8889M23 10.8889C23 9.66159 20.2913 8.66667 16.95 8.66667C13.6087 8.66667 10.9 9.66159 10.9 10.8889M23 10.8889V19.7778C23 21.0051 20.2913 22 16.95 22C13.6087 22 10.9 21.0051 10.9 19.7778V10.8889M23 15.3333C23 16.5606 20.2913 17.5556 16.95 17.5556C13.6087 17.5556 10.9 16.5606 10.9 15.3333"
                        stroke="#1E1E1E"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
};

const Coins = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 16 16" fill="none">
            <g id="coins-01" clipPath="url(#clip0_34_1828)">
                <path
                    id="Icon"
                    d="M10 11C12.7614 11 15 8.76143 15 6C15 3.23858 12.7614 1 10 1C7.23858 1 5 3.23858 5 6C5 8.76143 7.23858 11 10 11Z"
                    fill={props?.fill || '#807E7E'}
                    stroke={props?.stroke || '#313131'}
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    id="Icon_2"
                    d="M6 15C8.76142 15 11 12.7614 11 10C11 7.23858 8.76142 5 6 5C3.23858 5 1 7.23858 1 10C1 12.7614 3.23858 15 6 15Z"
                    fill={props?.fill || '#807E7E'}
                    stroke={props?.stroke || '#313131'}
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_34_1828">
                    <rect width={props.width} height={props.height} fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

const Edit = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 22 22" fill="none">
            <g id="edit-02">
                <path
                    id="Icon"
                    d="M14.862 9.68318L12.317 7.13815M5 17.0002L7.15334 16.7609C7.41642 16.7317 7.54797 16.7171 7.67092 16.6773C7.78 16.6419 7.88381 16.5921 7.97953 16.5289C8.08742 16.4578 8.18101 16.3642 8.36818 16.177L16.7708 7.77441C17.4736 7.07161 17.4736 5.93216 16.7708 5.22937C16.068 4.52657 14.9286 4.52657 14.2258 5.22936L5.82315 13.632C5.63597 13.8192 5.54238 13.9127 5.47124 14.0206C5.40812 14.1164 5.35822 14.2202 5.32291 14.3293C5.28311 14.4522 5.26849 14.5837 5.23926 14.8468L5 17.0002Z"
                    stroke="#999999"
                    strokeWidth="1.27252"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const FirmaCraft = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 132 34" fill="none">
            <g id="Frame 2243">
                <g id="Group 427320625">
                    <g id="Group 427320628">
                        <path
                            id="Path"
                            d="M12.788 21.9235L12.3257 21.6572V16.9979L14.6684 15.6581L12.788 14.582L10.4609 15.914V22.741L12.788 24.0678L18.7845 20.649L16.9615 19.5391L12.788 21.9235Z"
                            fill="white"
                        />
                        <path
                            id="Path_2"
                            d="M12.7887 6L3 11.5864V22.7776L4.86215 23.838V12.6703L12.7887 8.14421L16.3589 10.1892L16.7637 8.26696L12.7887 6Z"
                            fill="white"
                        />
                        <path
                            id="Path_3"
                            d="M20.7149 12.6814V21.6944L12.7883 26.2231L8.58871 23.8203V14.8412L12.7883 12.4411L16.988 14.8334L18.8501 13.7731V13.7574L12.7883 10.2969L6.72656 13.7574V24.9068L12.7883 28.3647L22.577 22.7782V11.6053L20.7149 12.6814Z"
                            fill="white"
                        />
                        <path
                            id="Path_4"
                            d="M30.8574 12.0508H38.6586V13.8555H32.986V16.9086H37.8881V18.7133H32.986V23.0513H30.8574V12.0508Z"
                            fill="white"
                        />
                        <path id="Path_5" d="M39.9922 12.0508H42.139V23.0513H39.9922V12.0508Z" fill="white" />
                        <path
                            id="Shape"
                            d="M52.9052 19.4001V23.0513H50.7688V19.8885L49.8234 18.8386H46.3942V23.0513H44.2578V12.0508H51.2076L52.8634 13.7484V17.06L51.7952 18.1439L52.9052 19.4027V19.4001ZM46.3968 17.0731H50.189L50.7349 16.5273V14.3909L50.189 13.8372H46.3968V17.0731Z"
                            fill="white"
                        />
                        <path
                            id="Path_6"
                            d="M54.877 12.0508H56.8566L60.1265 19.152L63.4407 12.0508H65.4204V23.0513H63.365V16.3549L60.8813 21.5104H59.4892L57.0055 16.3549V23.0513H54.877V12.0508Z"
                            fill="white"
                        />
                        <path
                            id="Shape_2"
                            d="M70.5539 12.0508H72.4997L76.5243 23.0513H74.3958L73.5026 20.6172H69.5928L68.6996 23.0513H66.5293L70.5539 12.0508ZM72.9881 18.8543L71.5229 14.7147L70.1073 18.8543H72.9907H72.9881Z"
                            fill="white"
                        />
                        <path
                            id="Vector"
                            d="M123.751 13.8617H120.453V12.0469H129.196V13.8617H125.898V23.0936H123.751V13.8617Z"
                            fill="white"
                        />
                        <path
                            id="Vector_2"
                            d="M112.15 12.0469H119.978V13.8617H114.297V16.9232H119.22V18.738H114.297V23.0936H112.15V12.0469Z"
                            fill="white"
                        />
                        <path
                            id="Vector_3"
                            d="M105.04 12.0469H106.997L111.037 23.0936H108.859L107.959 20.6475H104.077L103.178 23.0936H101L105.04 12.0469ZM107.486 18.88L106.018 14.6823H105.987L104.567 18.88H107.486Z"
                            fill="white"
                        />
                        <path
                            id="Vector_4"
                            d="M99.9784 19.4324V23.0936H97.8322V19.9216L96.8853 18.8643H93.445V23.0936H91.2988V12.0469H98.2267L99.9153 13.7512V17.0968L98.8421 18.1857L99.9784 19.4324ZM93.445 17.0968H97.2483L97.8006 16.5445V14.3982L97.2483 13.8459H93.445V17.0968Z"
                            fill="white"
                        />
                        <path
                            id="Vector_5"
                            d="M80.8008 21.2788V13.8617L82.6156 12.0469H88.0127L89.7959 13.8301V15.5187H87.6497V14.6192L86.908 13.8775H83.7518L82.947 14.6823V20.4581L83.7518 21.263H86.908L87.6497 20.5213V19.6218H89.7959V21.3103L88.0127 23.0936H82.6156L80.8008 21.2788Z"
                            fill="white"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

const FirmaChain = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <g id="symbol_white 1">
                <g id="&#234;&#183;&#184;&#235;&#163;&#185; 27393">
                    <path
                        id="&#237;&#140;&#168;&#236;&#138;&#164; 2149"
                        d="M12.0199 16.3918L11.5946 16.1489V11.8746L13.7454 10.6449L12.0214 9.65808L9.88721 10.8818V17.1427L12.0199 18.3572L17.5187 15.2222L15.8477 14.2038L12.0199 16.3918Z"
                        fill="#707070"
                    />
                    <path
                        id="&#237;&#140;&#168;&#236;&#138;&#164; 2150"
                        d="M12.021 1.78601L3.0437 6.90952V17.1721L4.75253 18.1437V7.90374L12.021 3.75035L15.2936 5.62679L15.6645 3.86605L12.021 1.78601Z"
                        fill="#707070"
                    />
                    <path
                        id="&#237;&#140;&#168;&#236;&#138;&#164; 2151"
                        d="M19.2911 7.90997V16.176L12.0226 20.3294L8.17183 18.127V9.89136L12.0226 7.69006L15.873 9.88357L17.5819 8.91198V8.89677L12.0226 5.72424L6.46338 8.89677V19.1215L12.023 22.2944L20.9999 17.1706V6.92317L19.2911 7.90997Z"
                        fill="#707070"
                    />
                </g>
            </g>
        </svg>
    );
};
const Picture = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 36 36" fill="none">
            <g id="Image 2">
                <g id="Fill 1">
                    <path
                        d="M34.6669 22.504V24.8099C34.6669 25.1925 34.6502 25.5785 34.6168 25.9611C34.1492 31.2263 30.4918 34.6667 25.2146 34.6667H10.7858C8.11375 34.6667 5.85924 33.7995 4.23934 32.2271C3.60474 31.644 3.07033 30.9589 2.65283 30.1736C3.20393 29.5035 3.82184 28.77 4.42304 28.0348C5.44174 26.815 6.42705 25.6102 7.04495 24.8266C7.96345 23.6903 10.385 20.6994 13.7417 22.1029C14.4264 22.387 15.0276 22.788 15.5787 23.1389C16.9314 24.0412 17.4992 24.3086 18.4511 23.7906C19.5032 23.2225 20.1879 22.1029 20.906 20.9333C21.2901 20.3134 21.6742 19.7135 22.0917 19.1621C23.912 16.7894 26.7176 16.1544 29.0556 17.558C30.2246 18.2598 31.2266 19.1454 32.1618 20.046C32.3622 20.2465 32.5627 20.432 32.7464 20.6158C32.9969 20.8665 33.8319 21.7019 34.6669 22.504Z"
                        fill="#444444"
                    />
                    <path
                        d="M34.6669 22.504V24.8099C34.6669 25.1925 34.6502 25.5785 34.6168 25.9611C34.1492 31.2263 30.4918 34.6667 25.2146 34.6667H10.7858C8.11375 34.6667 5.85924 33.7995 4.23934 32.2271C3.60474 31.644 3.07033 30.9589 2.65283 30.1736C3.20393 29.5035 3.82184 28.77 4.42304 28.0348C5.44174 26.815 6.42705 25.6102 7.04495 24.8266C7.96345 23.6903 10.385 20.6994 13.7417 22.1029C14.4264 22.387 15.0276 22.788 15.5787 23.1389C16.9314 24.0412 17.4992 24.3086 18.4511 23.7906C19.5032 23.2225 20.1879 22.1029 20.906 20.9333C21.2901 20.3134 21.6742 19.7135 22.0917 19.1621C23.912 16.7894 26.7176 16.1544 29.0556 17.558C30.2246 18.2598 31.2266 19.1454 32.1618 20.046C32.3622 20.2465 32.5627 20.432 32.7464 20.6158C32.9969 20.8665 33.8319 21.7019 34.6669 22.504"
                        stroke="#444444"
                    />
                </g>
                <g id="Fill 3">
                    <path
                        d="M25.2313 1.33337H10.7857C5.12441 1.33337 1.3335 5.29349 1.3335 11.1902V24.81C1.3335 26.8636 1.8011 28.6866 2.6528 30.1737C3.2039 29.5037 3.82181 28.7701 4.42301 28.0333C5.44171 26.8151 6.42702 25.6104 7.04492 24.8267C7.96342 23.6905 10.3849 20.6995 13.7416 22.1031C14.4263 22.3872 15.0276 22.7882 15.5787 23.1391C16.9314 24.0414 17.4992 24.3087 18.4511 23.7891C19.5032 23.2226 20.1879 22.1031 20.906 20.9318C21.2901 20.3135 21.6742 19.7137 22.0917 19.1623C23.912 16.7895 26.7176 16.1546 29.0556 17.5582C30.2246 18.26 31.2266 19.1456 32.1618 20.0462C32.3622 20.2467 32.5626 20.4322 32.7463 20.616C32.9968 20.8649 33.8318 21.7004 34.6668 22.5041V11.1902C34.6668 5.29349 30.8759 1.33337 25.2313 1.33337Z"
                        fill="#222222"
                    />
                    <path
                        d="M25.2313 1.33337H10.7857C5.12441 1.33337 1.3335 5.29349 1.3335 11.1902V24.81C1.3335 26.8636 1.8011 28.6866 2.6528 30.1737C3.2039 29.5037 3.82181 28.7701 4.42301 28.0333C5.44171 26.8151 6.42702 25.6104 7.04492 24.8267C7.96342 23.6905 10.3849 20.6995 13.7416 22.1031C14.4263 22.3872 15.0276 22.7882 15.5787 23.1391C16.9314 24.0414 17.4992 24.3087 18.4511 23.7891C19.5032 23.2226 20.1879 22.1031 20.906 20.9318C21.2901 20.3135 21.6742 19.7137 22.0917 19.1623C23.912 16.7895 26.7176 16.1546 29.0556 17.5582C30.2246 18.26 31.2266 19.1456 32.1618 20.0462C32.3622 20.2467 32.5626 20.4322 32.7463 20.616C32.9968 20.8649 33.8318 21.7004 34.6668 22.5041V11.1902C34.6668 5.29349 30.8759 1.33337 25.2313 1.33337"
                        stroke="#444444"
                    />
                </g>
                <g id="Fill 5">
                    <path
                        d="M17.091 12.6612C17.091 15.0088 15.1354 16.9638 12.789 16.9638C10.4443 16.9638 8.48877 15.0088 8.48877 12.6612C8.48877 10.3152 10.4443 8.35852 12.789 8.35852C15.1354 8.35852 17.091 10.3152 17.091 12.6612Z"
                        fill="#444444"
                    />
                    <path
                        d="M17.091 12.6612C17.091 15.0088 15.1354 16.9638 12.789 16.9638C10.4443 16.9638 8.48877 15.0088 8.48877 12.6612C8.48877 10.3152 10.4443 8.35852 12.789 8.35852C15.1354 8.35852 17.091 10.3152 17.091 12.6612"
                        stroke="#444444"
                    />
                </g>
            </g>
        </svg>
    );
};

const Info = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 14 14" fill="none">
            <g>
                <g id="Info Circle">
                    <g id="Info Circle_2">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1 6.99969C1 3.68846 3.68786 1 6.99969 1C10.3175 1 12.9994 3.68846 12.9994 6.99969C12.9994 10.3121 10.3175 12.9994 6.99969 12.9994C3.68786 12.9994 1 10.3121 1 6.99969ZM6.4717 4.72574C6.4717 4.43835 6.71169 4.19777 6.99967 4.19777C7.28766 4.19777 7.52165 4.43835 7.52165 4.72574V7.3776C7.52165 7.66619 7.28766 7.89957 6.99967 7.89957C6.71169 7.89957 6.4717 7.66619 6.4717 7.3776V4.72574ZM7.00571 9.80823C6.71173 9.80823 6.47774 9.56824 6.47774 9.28026C6.47774 8.99227 6.71173 8.75828 6.99971 8.75828C7.2937 8.75828 7.52769 8.99227 7.52769 9.28026C7.52769 9.56824 7.2937 9.80823 7.00571 9.80823Z"
                            fill="#707070"
                        />
                        <path
                            d="M6.99969 0.749991C3.54977 0.749991 0.749991 3.5504 0.749991 6.99969H1.25001C1.25001 3.82652 3.82595 1.25001 6.99969 1.25001V0.749991ZM13.2494 6.99969C13.2494 3.55056 10.4558 0.749991 6.99969 0.749991V1.25001C10.1793 1.25001 12.7494 3.82636 12.7494 6.99969H13.2494ZM6.99969 13.2494C10.4557 13.2494 13.2494 10.45 13.2494 6.99969H12.7494C12.7494 10.1742 10.1793 12.7494 6.99969 12.7494V13.2494ZM0.749991 6.99969C0.749991 10.4502 3.5498 13.2494 6.99969 13.2494V12.7494C3.82592 12.7494 1.25001 10.174 1.25001 6.99969H0.749991ZM6.99967 3.94776C6.57343 3.94776 6.22169 4.30046 6.22169 4.72574H6.72171C6.72171 4.57625 6.84995 4.44778 6.99967 4.44778V3.94776ZM7.77166 4.72574C7.77166 4.30419 7.42962 3.94776 6.99967 3.94776V4.44778C7.1457 4.44778 7.27164 4.57252 7.27164 4.72574H7.77166ZM7.77166 7.3776V4.72574H7.27164V7.3776H7.77166ZM6.99967 8.14958C7.42555 8.14958 7.77166 7.80445 7.77166 7.3776H7.27164C7.27164 7.52792 7.14977 7.64956 6.99967 7.64956V8.14958ZM6.22169 7.3776C6.22169 7.80815 6.57753 8.14958 6.99967 8.14958V7.64956C6.84585 7.64956 6.72171 7.52423 6.72171 7.3776H6.22169ZM6.22169 4.72574V7.3776H6.72171V4.72574H6.22169ZM6.22773 9.28026C6.22773 9.70446 6.57181 10.0582 7.00571 10.0582V9.55822C6.85165 9.55822 6.72775 9.43202 6.72775 9.28026H6.22773ZM6.99971 8.50827C6.57365 8.50827 6.22773 8.85419 6.22773 9.28026H6.72775C6.72775 9.13035 6.84981 9.00829 6.99971 9.00829V8.50827ZM7.7777 9.28026C7.7777 8.85233 7.42991 8.50827 6.99971 8.50827V9.00829C7.15749 9.00829 7.27768 9.13221 7.27768 9.28026H7.7777ZM7.00571 10.0582C7.43547 10.0582 7.7777 9.70259 7.7777 9.28026H7.27768C7.27768 9.43389 7.15193 9.55822 7.00571 9.55822V10.0582Z"
                            fill="#1E1E1E"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

const Link = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <path
                d="M12.7076 18.3644L11.2933 19.7786C9.34072 21.7313 6.1749 21.7313 4.22228 19.7786C2.26966 17.826 2.26966 14.6602 4.22228 12.7076L5.63649 11.2933M18.3644 12.7076L19.7786 11.2933C21.7312 9.34072 21.7312 6.1749 19.7786 4.22228C17.826 2.26966 14.6602 2.26966 12.7076 4.22228L11.2933 5.63649M8.50045 15.5004L15.5005 8.50043"
                stroke="#807E7E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const Medium = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 26" fill="none" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect y="0.285156" width="24" height="24" fill="url(#pattern0_575_26732)" />
            <defs>
                <pattern id="pattern0_575_26732" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_575_26732" transform="scale(0.0104167)" />
                </pattern>
                <image
                    id="image0_575_26732"
                    width="96"
                    height="96"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAABkdJREFUeF7tXD2IZTUUPnmXGbRTcAt/URCLtXMbhRUFS1mdxk50islzsBFR0dJScUVsZHyZYhwECxt3xUoExSls1GpfIYKCDha76EMLZcK8OHnkDnfycm+Sm+SdN8N55UySk3xfvnNO/i4D+qEiwFCtk3EgApAnARFABCAjgGyeFEAEICOAbJ4UQAQgI4BsnhRABCAjgGyeFEAEICOAbJ4UQAQgI4BsnhRABCAjgGyeFEAEICOAbJ4UQAQgI4BsnhRABCAjgGy+qAKGw+FtAHDPdDq9ezAYnFNK3QIA+m/6d4MxNplOp9cHg8Fvg8Hgz62trV+R8Vi4+ewEDIfDh5RSLwHAUwCgAY/5TQDgKmPs/dFo9ENMxdSyerIopR7U7TDG/lmU/WwEbGxsPM0YexUALqaCYervKaUub29vX8nUnrOZxoR5ziowZoy9NxqNtkvaTyJgfX39ptXV1WeVUi8DwPlCHZ0BcXBw8PHOzs5/OW1wzt8CgNc9bY6rqnqylHvsTYCR7LsAYM+cnBg129o9cg2vjEajGzkMcM4/iuj7flVVF2NIMB7hESnlm10TpxcBm5ub9x4eHn5RcNa3YZxlNnLOtat8J5LIsZTyQogKjVv7DgBWAOBtIcQbbbaiCeCcPwYAn/UIsJHjbS2uA/WaEOKbPg1a4MQ2sSuEeN5X6cjGVaXUJVNOMsbuaFNuFAFGVp8aZn39KPp/xhiPDZA6Zq2srHyfolyl1FpXYmC8wy/W4F8TQlx2ARJMgJn5Xy4D+PXMUko9E5Ml9XQ9Nm77Usr721xRi42xEGKW4tq/IAKMbL9CdDttatLyfjg0Z+ec/w4Ad6ZKs0sFlvs5NsUYO+dyQ0EEcM6/zZjfp47frh8UHIfD4YZSSmQyvieEeNTVFuf8L9dEbSPNS0BgrpxpXL2b6cw0dKu5JxFj7IKtPJOaX28ZhTMOdBJgAsqPS+h67DHKqqoeaMvTPcD0ZX2OdOOqdZCf6x8AfOLKoDoJaPNnfXtcuF6rW8jsfuphzAVWjx1n/1oJ6GCzMI5JzT/uWh+UmkhVVd3XVJ3HXe8LIe4KzoJKdToJXn/luVlmcv8/SrhRey3i2d6QQojVIAJMp/9eopzfD70pYad7hZV8YmXsC/RSypvt9YPTBRXymcEgJhY8kW0UHsuJOMA5v9a1yrZdlh6nk4DIncJEvPJWP0oPPz9KD/Vh0OxXOI0+4VZ8C70YArKsGPNCG9zaRAhxa126dCxrgso5P+hy2661w5wCjP//N3i4S1jQAqXTLWTo/izzCsEtiICW3bwM/VxcE81lv88tpPaqthWy2AsioHDWkDreoPrN9JBzroIq9SxU2wohAADm1ilzLugsEAAAx5lQaQJqWyEEBCnA7Pt/3XNCLEu12T5NiF/O0OEZ2YGu268AIiCakrwEkAsiAqIRcFRYWAyICcJBMSDQl+UAqWQbx752mdLQoCxoQYGrJPhwqhdiZv+EtiICp0j2rQhDQMy1vcCuLqyYvUUccv+zb+fKbMaZC1j69tup+9mHJMu0He26mtJ6JFk6eBVidiKlvL156FE4rY46kIkloKR0C+EPzrubbXd1UjtR7EhSd8ykoz+dpmNJV56tx1LqTKDoofxpC8b2SVhzdheKA2WvpTRUQBez3L5q7mKWJ3lxuseQq4l9HjOkutfY+mfzamKNgu+6RSxamcsHXc7NnFp3Xc51LmJ7X85dclc0YYw9ceavp5uArJ8m0QMNgNbHFgYnl8tOe6BRu4zMMk7yRAlPlH5OeaTR84lSa4zyBmEbJXqk53+kZ8dM14WsGtdoAhoxgZ6ptmi46Sm61ie6ei8CdEVzbvBhxGPnJJcDALtSyhdC3umGGIq8fhn9UNtcibzke2Xfm4BGiqqD8wcpTz89gI0B4MW+74K72g68N5rlcXhbP5IJsAI0fawjRH6NMtkIqNs03whaU0rpF+WxX07ZA4ArjLGdXN+ECMXj1H+uxjVQ8zWV874PNukPNzHGri0a9FBySpbLroCSnT2LbRMByKwSAUQAMgLI5kkBRAAyAsjmSQFEADICyOZJAUQAMgLI5kkBRAAyAsjmSQFEADICyOZJAUQAMgLI5kkBRAAyAsjmSQFEADICyOZJAUQAMgLI5kkByAT8D/LN744t/D5CAAAAAElFTkSuQmCC"
                />
            </defs>
        </svg>
    );
};

const MinusCircle = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 32 32" fill="none">
            <g id="minus-circle">
                <g id="Icon">
                    <path
                        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                        fill="#707070"
                    />
                    <path
                        d="M11.2 16H20.8M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
                        stroke="#1E1E1E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
};

const Percent = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <g id="percent-02">
                <path id="Icon" d="M19 5L5 19" stroke="#807E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <g id="Icon_2">
                    <path
                        d="M6 9C7.10457 9 8 8.10457 8 7C8 5.89543 7.10457 5 6 5C4.89543 5 4 5.89543 4 7C4 8.10457 4.89543 9 6 9Z"
                        fill="#807E7E"
                    />
                    <path
                        d="M18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z"
                        fill="#807E7E"
                    />
                    <path
                        d="M6 9C7.10457 9 8 8.10457 8 7C8 5.89543 7.10457 5 6 5C4.89543 5 4 5.89543 4 7C4 8.10457 4.89543 9 6 9Z"
                        stroke="#807E7E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z"
                        stroke="#807E7E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
};

const PlusCircle = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 16 16" fill="none">
            <g id="plus-circle">
                <path
                    id="Icon"
                    d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                    fill={props.fill || '#807E7E'}
                />
                <path
                    id="Icon_2"
                    d="M8 5.5V10.5M5.5 8H10.5"
                    stroke="#121212"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const Preview = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 32 32" fill="none">
            <g id="coins-01">
                <path
                    id="Icon"
                    d="M3.34846 17.0188C3.16862 16.7108 3.0787 16.5567 3.02836 16.3192C2.99055 16.1407 2.99055 15.8593 3.02836 15.6808C3.0787 15.4433 3.16862 15.2892 3.34846 14.9812C4.83466 12.4355 9.25843 6 16 6C22.7416 6 27.1653 12.4355 28.6515 14.9812C28.8314 15.2892 28.9213 15.4433 28.9716 15.6808C29.0095 15.8593 29.0095 16.1407 28.9716 16.3192C28.9213 16.5567 28.8314 16.7108 28.6515 17.0188C27.1653 19.5645 22.7416 26 16 26C9.25843 26 4.83466 19.5645 3.34846 17.0188Z"
                    fill="#807E7E"
                    stroke="#313131"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    id="Icon_2"
                    d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
                    fill="#807E7E"
                    stroke="#313131"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const Search = (props: any) => {
    const gId = useId();
    const pathId1 = useId();
    const pathId2 = useId();

    return (
        <svg width={props.width} height={props.height} viewBox="0 0 16 16" fill="none" {...props}>
            <g id={gId}>
                <path
                    id={pathId1}
                    d="M14.0001 14L11.1001 11.1"
                    stroke={props.stroke || '#807E7E'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    id={pathId2}
                    d="M11.9167 7.33333C11.9167 9.86464 9.86464 11.9167 7.33333 11.9167C4.80203 11.9167 2.75 9.86464 2.75 7.33333C2.75 4.80203 4.80203 2.75 7.33333 2.75C9.86464 2.75 11.9167 4.80203 11.9167 7.33333Z"
                    fill={props.fill || '#807E7E'}
                    stroke={props.stroke || '#807E7E'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const Setting = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 16 16" fill="none">
            <g id="Iconly/Bold/Setting">
                <g id="Setting">
                    <path
                        id="Setting_2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.3068 9.00034C13.5327 9.12036 13.707 9.30986 13.8296 9.49937C14.0685 9.891 14.0491 10.3711 13.8167 10.7943L13.3649 11.5523C13.126 11.9566 12.6806 12.2093 12.2222 12.2093C11.9963 12.2093 11.7445 12.1461 11.538 12.0197C11.3701 11.9124 11.1765 11.8745 10.9699 11.8745C10.3308 11.8745 9.79499 12.3988 9.77562 13.0241C9.77562 13.7505 9.18172 14.319 8.43935 14.319H7.5614C6.81257 14.319 6.21867 13.7505 6.21867 13.0241C6.20576 12.3988 5.66996 11.8745 5.03087 11.8745C4.81784 11.8745 4.62418 11.9124 4.46279 12.0197C4.25622 12.1461 3.998 12.2093 3.77851 12.2093C3.31372 12.2093 2.86829 11.9566 2.62944 11.5523L2.18402 10.7943C1.94516 10.3837 1.93225 9.891 2.17111 9.49937C2.27439 9.30986 2.46806 9.12036 2.68754 9.00034C2.86829 8.91191 2.98449 8.76662 3.09423 8.59607C3.41701 8.05283 3.22334 7.33904 2.67463 7.01688C2.03554 6.65683 1.82897 5.8546 2.19693 5.22924L2.62944 4.48387C3.00386 3.85851 3.80433 3.63742 4.44988 4.00379C5.0115 4.307 5.74097 4.10486 6.0702 3.56794C6.17348 3.39107 6.23158 3.20157 6.21867 3.01206C6.20576 2.76571 6.27677 2.53199 6.39942 2.34249C6.63828 1.95085 7.07079 1.69818 7.54204 1.68555H8.45226C8.92996 1.68555 9.36247 1.95085 9.60133 2.34249C9.71752 2.53199 9.79499 2.76571 9.77562 3.01206C9.76271 3.20157 9.82081 3.39107 9.9241 3.56794C10.2533 4.10486 10.9828 4.307 11.5509 4.00379C12.19 3.63742 12.9969 3.85851 13.3649 4.48387L13.7974 5.22924C14.1718 5.8546 13.9652 6.65683 13.3197 7.01688C12.771 7.33904 12.5773 8.05283 12.9065 8.59607C13.0098 8.76662 13.126 8.91191 13.3068 9.00034ZM6.17385 8.00799C6.17385 8.99972 6.99369 9.78931 8.0072 9.78931C9.0207 9.78931 9.82118 8.99972 9.82118 8.00799C9.82118 7.01626 9.0207 6.22035 8.0072 6.22035C6.99369 6.22035 6.17385 7.01626 6.17385 8.00799Z"
                        fill={props.fill || '#807E7E'}
                    />
                </g>
            </g>
        </svg>
    );
};

const Tag = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <g id="tag-01">
                <path
                    id="Icon"
                    d="M2.93726 11.9373C2.59135 11.5914 2.4184 11.4184 2.29472 11.2166C2.18506 11.0376 2.10425 10.8425 2.05526 10.6385C2 10.4083 2 10.1637 2 9.67451L2 5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.7157 2.7157 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2L9.67452 2C10.1637 2 10.4083 2 10.6385 2.05526C10.8425 2.10425 11.0376 2.18506 11.2166 2.29472C11.4184 2.4184 11.5914 2.59135 11.9373 2.93726L19.6059 10.6059C20.7939 11.7939 21.388 12.388 21.6105 13.0729C21.8063 13.6755 21.8063 14.3245 21.6105 14.927C21.388 15.612 20.7939 16.2061 19.6059 17.3941L17.3941 19.6059C16.2061 20.7939 15.612 21.388 14.927 21.6105C14.3245 21.8063 13.6755 21.8063 13.0729 21.6105C12.388 21.388 11.7939 20.7939 10.6059 19.6059L2.93726 11.9373Z"
                    fill="#707070"
                />
                <path
                    id="Icon_2"
                    d="M8 8H8.01M8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 7.72386 7.72386 7.5 8 7.5C8.27614 7.5 8.5 7.72386 8.5 8Z"
                    stroke="#1E1E1E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const Telegram = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xlinkHref="http://www.w3.org/1999/xlink">
            <rect width="24" height="24" fill="url(#pattern0_575_26740)" />
            <defs>
                <pattern id="pattern0_575_26740" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_575_26740" transform="scale(0.0104167)" />
                </pattern>
                <image
                    id="image0_575_26740"
                    width="96"
                    height="96"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAABWxJREFUeF7tXL1yEzEQls6J24Q3gApKWmjgDQgdpTOTu7gjVISKUDFUQJdYmYlLOoaKljTAGwAdjwBlJonFbEbHnC/nk06rPfnO6xk30f/37a4+reRIwZ+oCMioo/PgggmIbARMABMQGYHIw7MHMAGREYg8PHsAExAZgcjDswcwAZERiDw8ewATEBmByMOzBzABkRGIPDx7ABMQGYHIw7MHMAGREYg8PHsAExAZgcjDswc4EjAej29eXFxsSSkfCiHguyGl/CWE+DCZTA4cu7lWjQmoQS4HPUmSsdb69qKqUspXviQwARWoZlm2pbUeCSEeuVg2eMJkMrnjUrdchwkwiIC1X15e7gkhAPiNpmAqpbyw9GrUdHLLXD9NUwAcvg8w82QCGqAH1j6bzUZaa7D4xtZ+LYxwCHJDv2lsd+v1qtapUgqUUeNP70PQaDTaXFtbG9mUTGPk5ht8Ukpt+fTRWwJ2d3fvzWazzMR3H2yc27AMLUAFm6qUcr9Otzsj61hRa/3s+Pj4nWP1uWq98IDQm2pTIJMkuX90dPStaTuo32kC2gwzdeCuFAGwqa6vr0NOptUwU0eA7xmgUx4QO8wsIgCThugEAVRhxmQy9wEErfVHn/ht2nifAZaaAEo1U5aNWZb9RKim90opOFF7fZZqE24hzJwmSfKiqFjSND3BnBUwZ4Cl8QCqMFMwyb9a64OyVs+y7EBr/dLLdE0jjAKKTgBlmCmAejoYDEaHh4e/i0CbLChYP+rTOQJARg6HQ4iZTxBx1wW0SquHhqHAh74wErRVD2ghzBRJqbR6qBAi7OQDYSVoKwSYFDBYPOrCw8XkhRALrd5YPmrDrZgDSoKSEdBSCriMx0KrJwJfYBVQcALMvSqoischbppCWD0V+GZu20qpqeM8K6sFOQeY+P7c9RUBZsKltrVWTwy+wCogtAcY4F+3FN+L2NfGeqhoknZgnU5PS3yMAquAUASkaQoXEE99Jo5sY7V6I3W/U8tcpdQmci1+9wFG2WASWD7ztlp9bvnD4ZAafBgKrYC8PWBnZ2dPSvnWB0XPNlarbxl8GA6VhMtx8NqEW3Lxqzm6Sj2zH31uS31h7oGLRuhFQN4BZS4HTplSym2Xu9a2wYf1h1BA3iGoHEZcXxG7hh9Xq4f+YoAP456fn9+YTqd/XNe0qB7KA6o6Lb2jbyoBnWJ9Pm4s8CHlEUIBBfOAOiswigme7d2tOS98SpLkjUu4WQLwgymgVggokwNWW/zb2dnZj6auHDKd7BlCgiigKAR4Lvh/MxN2vmL7wbQPpYA6R4BJL8DNFvpJOYaAUAqocwRETH/M8RVKAXWRgC8REn9z4Ie4BQt2EMO4sU/bJfGAIDmgfP3BzwE+wLq2aTMFsvDghPhJalWfnSIAFrAEJKBvwTobgooTjxWOQiqgzm3CVYc6rfUJ8cXL3LAhbsF64QH5IszZAP5XA/ntXGgF1HkPKFoSnJBb8AbvX0Mu3NRdFUgX6lF7Q5M0uStenVNBLguj8obQG3CvQlCZGIpnKYPB4Fb5lbWLQdTV6aUHFBds7iPgfRA2gRfsEqZXKsjFAgN5Q9AURCdTES5g19XBeAPFBtzrPWAREb7eQLEBryQBOTFNvIHiALaSIajsFeY5PWzQth+PBE3ArdwmbNs7LA/MpkqpbVsfvuW9l6FNgIGwBM9ntNbwhAZePgP4qB9g2MZnAmwIEZczAcQA27pnAmwIEZczAcQA27pnAmwIEZczAcQA27pnAmwIEZczAcQA27pnAmwIEZczAcQA27pnAmwIEZczAcQA27pnAmwIEZczAcQA27pnAmwIEZczAcQA27pnAmwIEZczAcQA27r/BxrIcn8/pMNRAAAAAElFTkSuQmCC"
                />
            </defs>
        </svg>
    );
};

const Twitter = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <g id="ic_twitter_gy_32px">
                <path
                    id="path1009"
                    d="M3.04468 4.5L9.99386 13.1889L3.00073 20.2503H4.57462L10.6973 14.0669L15.6457 20.2507H21.0004L13.6597 11.0746L20.1691 4.5H18.5952L12.9566 10.1939L8.4004 4.5H3.04468ZM5.35935 5.58409H7.81989L18.6846 19.1663H16.2248L5.35935 5.58409Z"
                    fill="#707070"
                />
            </g>
        </svg>
    );
};

const Valid = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <g id="Frame 2227">
                <path
                    id="Union"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.071 18.1899C14.1236 18.9019 12.9486 19.6773 11.4922 20.5008V20.501C10.0356 19.6774 8.86079 18.9021 7.91339 18.19C5.43926 16.3307 3.99219 13.4597 3.99219 10.4182V5.31736C7.6006 4.74586 11.4922 2.50098 11.4922 2.50098C11.4922 2.50098 15.3838 4.74586 18.9922 5.31736V10.418C18.9922 13.4595 17.5451 16.3305 15.071 18.1899ZM10.7017 12.4899L14.8886 8.30317L15.8373 9.25166L10.7028 14.3861L10.7017 14.3851L10.7007 14.3861L7.575 11.2605L8.52366 10.312L10.7017 12.4899Z"
                    fill="#01C18E"
                />
            </g>
        </svg>
    );
};

const Wallet = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <g id="wallet-fill">
                <path
                    id="Vector"
                    d="M5 4C3.343 4 2 5.3431 2 7V17C2 19 3 20 5 20H19C21 20 22 19 22 17V9C22 8.4477 21.552 8 21 8H20V5C20 4.4477 19.552 4 19 4H5ZM5 6H18V8H5C4.448 8 4 7.5523 4 7C4 6.4477 4.448 6 5 6ZM17 12C17.552 12 18 12.4477 18 13C18 13.5523 17.552 14 17 14C16.448 14 16 13.5523 16 13C16 12.4477 16.448 12 17 12Z"
                    fill={props.fill || '#807E7E'}
                />
            </g>
        </svg>
    );
};

const RightArrow = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <g id="chevron-down">
                <path
                    id="Icon"
                    d="M9 4L17 12L9 20"
                    // stroke={props.$isCheck ? '#FFFFFF' : '#707070'}
                    stroke={props.stroke || '#707070'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const PrevPage = (props: any) => {
    return (
        <svg width={props.width || '20'} height={props.height || '20'} viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M12.334 6L8.33398 9.99999L12.334 14"
                // stroke={props.$isCheck ? '#FFFFFF' : '#707070'}
                stroke={props.stroke || '#707070'}
                strokeWidth={props.strokeWidth || '1.2'}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const LeftArrow = (props: any) => {
    return (
        <svg width={props.width || '24'} height={props.height || '24'} viewBox="0 0 24 24" fill="none" {...props}>
            <g id="chevron-down">
                <path
                    id="Icon"
                    d="M15 4L7 12L15 20"
                    // stroke={props.stroke || props.$isCheck ? '#FFFFFF' : '#707070'}
                    stroke={props.stroke || '#707070'}
                    strokeWidth={props.strokeWidth || '2'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const Dot = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 4 4" fill="none">
            <circle cx="2" cy="2" r="2" fill="#999999" />
        </svg>
    );
};

const Copy = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 22 22" fill="none">
            <path
                d="M17.4167 4H8.08333C7.92862 4 7.78025 4.06146 7.67085 4.17085C7.56146 4.28025 7.5 4.42862 7.5 4.58333V7.5H4.58333C4.42862 7.5 4.28025 7.56146 4.17085 7.67085C4.06146 7.78025 4 7.92862 4 8.08333V17.4167C4 17.5714 4.06146 17.7197 4.17085 17.8291C4.28025 17.9385 4.42862 18 4.58333 18H13.9167C14.0714 18 14.2197 17.9385 14.3291 17.8291C14.4385 17.7197 14.5 17.5714 14.5 17.4167V14.5H17.4167C17.5714 14.5 17.7197 14.4385 17.8291 14.3291C17.9385 14.2197 18 14.0714 18 13.9167V4.58333C18 4.42862 17.9385 4.28025 17.8291 4.17085C17.7197 4.06146 17.5714 4 17.4167 4ZM13.3333 16.8333H5.16667V8.66667H13.3333V16.8333ZM16.8333 13.3333H14.5V8.08333C14.5 7.92862 14.4385 7.78025 14.3291 7.67085C14.2197 7.56146 14.0714 7.5 13.9167 7.5H8.66667V5.16667H16.8333V13.3333Z"
                fill="#999999"
            />
        </svg>
    );
};

const ExternalLink = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 20 20" fill="none">
            <path
                d="M16.25 7.91667L16.25 3.75M16.25 3.75H12.0833M16.25 3.75L10.6944 9.30556M8.61111 5.13889H7.08333C5.91656 5.13889 5.33317 5.13889 4.88752 5.36596C4.49552 5.56569 4.17681 5.8844 3.97707 6.27641C3.75 6.72206 3.75 7.30545 3.75 8.47222V12.9167C3.75 14.0834 3.75 14.6668 3.97707 15.1125C4.17681 15.5045 4.49552 15.8232 4.88752 16.0229C5.33317 16.25 5.91656 16.25 7.08333 16.25H11.5278C12.6946 16.25 13.2779 16.25 13.7236 16.0229C14.1156 15.8232 14.4343 15.5045 14.634 15.1125C14.8611 14.6668 14.8611 14.0834 14.8611 12.9167V11.3889"
                stroke="#DCDCDC"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const LeftDoubleArrow = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 20 20" fill="none">
            <path
                d="M14.332 14L10.332 10L14.332 6.00002"
                // stroke={props.$isCheck ? '#FFFFFF' : '#707070'}
                stroke={props.stroke || '#707070'}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.3301 14L6.33008 10L10.3301 6.00002"
                // stroke={props.$isCheck ? '#FFFFFF' : '#707070'}
                stroke={props.stroke || '#707070'}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const RightDoubleArrow = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 20 20" fill="none">
            <path
                d="M6.33594 6L10.3359 9.99999L6.33594 14"
                // stroke={props.$isCheck ? '#FFFFFF' : '#707070'}
                stroke={props.stroke || '#707070'}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.3359 6L14.3359 9.99999L10.3359 14"
                // stroke={props.$isCheck ? '#FFFFFF' : '#707070'}
                stroke={props.stroke || '#707070'}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const Success = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 16 16" fill="none">
            <circle opacity="0.7" cx="8" cy="8" r="7" fill="#57D962" />
            <path d="M4 7.5L7 10.5L12 5.5" stroke="#121212" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const Failed = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 16 16" fill="none">
            <circle opacity="0.7" cx="8" cy="8" r="7" fill="#E55250" />
            <path d="M11 5L5 11" stroke="#121212" strokeLinecap="round" />
            <path d="M11 11L5 5" stroke="#121212" strokeLinecap="round" />
        </svg>
    );
};

const Add = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 8L3 8" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const Close = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none">
            <path d="M4 4L20 20" stroke="#807E7E" />
            <path d="M20 4L4 20" stroke="#807E7E" />
        </svg>
    );
};

const XCircle = (props: any) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 32 32" fill="none">
            <path
                d="M16.0013 29.3327C23.3651 29.3327 29.3346 23.3631 29.3346 15.9993C29.3346 8.63555 23.3651 2.66602 16.0013 2.66602C8.63751 2.66602 2.66797 8.63555 2.66797 15.9993C2.66797 23.3631 8.63751 29.3327 16.0013 29.3327Z"
                fill="#707070"
            />
            <path
                d="M20.0013 11.9993L12.0013 19.9993M12.0013 11.9993L20.0013 19.9993M29.3346 15.9993C29.3346 23.3631 23.3651 29.3327 16.0013 29.3327C8.63751 29.3327 2.66797 23.3631 2.66797 15.9993C2.66797 8.63555 8.63751 2.66602 16.0013 2.66602C23.3651 2.66602 29.3346 8.63555 29.3346 15.9993Z"
                stroke="#1A1A1A"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const SnackbarSuccess = (props: any) => {
    return (
        <svg width={props.width || '28'} height={props.height || '28'} viewBox="0 0 28 28" fill="none">
            <path
                d="M14 25.375C20.2822 25.375 25.375 20.2822 25.375 14C25.375 7.71776 20.2822 2.625 14 2.625C7.71776 2.625 2.625 7.71776 2.625 14C2.625 20.2822 7.71776 25.375 14 25.375Z"
                fill={props.fill || '#57D962'}
            />
            <path d="M8.75 14L12.25 17.5L19.25 10.5" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const SnackbarWarn = (props: any) => {
    return (
        <svg width={props.width || '28'} height={props.height || '28'} viewBox="0 0 28 28" fill="none">
            <path
                d="M14 25.375C20.2822 25.375 25.375 20.2822 25.375 14C25.375 7.71776 20.2822 2.625 14 2.625C7.71776 2.625 2.625 7.71776 2.625 14C2.625 20.2822 7.71776 25.375 14 25.375Z"
                fill={props.fill || '#FFD426'}
            />
            <path
                d="M13.1176 15.5926L12.5042 9.72344C12.4131 8.85015 13.0979 8.08984 13.976 8.08984H14.0092C14.8868 8.08984 15.5712 8.84885 15.4809 9.7217L14.8737 15.5913C14.8275 16.0371 14.4519 16.3761 14.0035 16.3761H13.9874C13.5394 16.3761 13.1638 16.0376 13.1171 15.5922L13.1176 15.5926ZM12.6369 18.5593V18.5318C12.6369 17.7863 13.2414 17.1817 13.9869 17.1817H14.0144C14.7599 17.1817 15.3645 17.7863 15.3645 18.5318V18.5593C15.3645 19.3048 14.7599 19.9093 14.0144 19.9093H13.9869C13.2414 19.9093 12.6369 19.3048 12.6369 18.5593Z"
                fill="#313131"
            />
        </svg>
    );
};

const SnackbarError = (props: any) => {
    return (
        <svg width={props.width || '28'} height={props.height || '28'} viewBox="0 0 28 28" fill="none">
            <path
                d="M14 25.375C20.2822 25.375 25.375 20.2822 25.375 14C25.375 7.71776 20.2822 2.625 14 2.625C7.71776 2.625 2.625 7.71776 2.625 14C2.625 20.2822 7.71776 25.375 14 25.375Z"
                fill={props.fill || '#E55250'}
            />
            <path d="M10.5 17.5L17.5 10.5" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5 10.5L17.5 17.5" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const CloseIcon = (props: any) => (
    <svg width={props.width || '28'} height={props.height || '28'} viewBox="0 0 28 28" fill="none">
        <path
            d="M14 25.375C20.2822 25.375 25.375 20.2822 25.375 14C25.375 7.71776 20.2822 2.625 14 2.625C7.71776 2.625 2.625 7.71776 2.625 14C2.625 20.2822 7.71776 25.375 14 25.375Z"
            fill={props.fill || '#474747'}
        />
        <path
            d="M9.625 9.625L18.375 18.375"
            stroke={props.stroke || '#807E7E'}
            strokeWidth={props.strokeWidth || '1.575'}
            strokeLinecap="round"
        />
        <path
            d="M18.375 9.625L9.625 18.375"
            stroke={props.stroke || '#807E7E'}
            strokeWidth={props.strokeWidth || '1.575'}
            strokeLinecap="round"
        />
    </svg>
);

const Calendar = (props: any) => (
    <svg width={props.width || '16'} height={props.height || '16'} viewBox="0 0 16 16" fill="none" {...props}>
        <path
            d="M14 6.66683H2M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M5.2 14.6668H10.8C11.9201 14.6668 12.4802 14.6668 12.908 14.4488C13.2843 14.2571 13.5903 13.9511 13.782 13.5748C14 13.147 14 12.5869 14 11.4668V5.86683C14 4.74672 14 4.18667 13.782 3.75885C13.5903 3.38252 13.2843 3.07656 12.908 2.88482C12.4802 2.66683 11.9201 2.66683 10.8 2.66683H5.2C4.0799 2.66683 3.51984 2.66683 3.09202 2.88482C2.71569 3.07656 2.40973 3.38252 2.21799 3.75885C2 4.18667 2 4.74672 2 5.86683V11.4668C2 12.5869 2 13.147 2.21799 13.5748C2.40973 13.9511 2.71569 14.2571 3.09202 14.4488C3.51984 14.6668 4.0799 14.6668 5.2 14.6668Z"
            stroke={props.stroke || 'white'}
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Tooltip = (props: any) => (
    <svg width={props.width || '16'} height={props.height || '16'} viewBox="0 0 17 16" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.1665 7.99827C16.1665 12.2292 12.7319 15.6645 8.50022 15.6645C4.26079 15.6645 0.833984 12.2294 0.833984 7.99827C0.833985 3.76561 4.26075 0.332031 8.50022 0.332031C12.7319 0.332032 16.1665 3.76582 16.1665 7.99827ZM8.50024 12.267C9.06857 12.267 9.53755 11.7967 9.53755 11.2297V7.69385C9.53755 7.11979 9.06311 6.66454 8.50024 6.66454C7.93241 6.66454 7.47093 7.12471 7.47093 7.69385L7.47093 11.2297C7.47093 11.7917 7.92699 12.267 8.50024 12.267ZM8.50019 5.98683C9.06827 5.98683 9.5295 5.5256 9.5295 4.95751C9.5295 4.3919 9.07073 3.92021 8.49219 3.92021C7.91918 3.92021 7.46288 4.3944 7.46288 4.95751C7.46288 5.52808 7.9266 5.98682 8.50019 5.98683Z"
            fill={props.fill || '#707070'}
        />
    </svg>
);

const CW20 = (props: any) => {
    const id = useId();

    return (
        <svg width={props.width || '30'} height={props.height || '30'} viewBox="0 0 31 30" fill="none" {...props}>
            <g clipPath={id}>
                <path
                    d="M0.986557 14.9927C0.986557 6.94248 7.51279 0.416245 15.563 0.416245C23.6136 0.416245 30.1399 6.94204 30.1399 14.9927C30.1399 23.0433 23.6132 29.5696 15.563 29.5696C7.5128 29.5696 0.986557 23.0429 0.986557 14.9927Z"
                    fill="#222222"
                />
                <path
                    d="M0.986557 14.9927C0.986557 6.94248 7.51279 0.416245 15.563 0.416245C23.6136 0.416245 30.1399 6.94204 30.1399 14.9927C30.1399 23.0433 23.6132 29.5696 15.563 29.5696C7.5128 29.5696 0.986557 23.0429 0.986557 14.9927Z"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="0.30124"
                />
                <path
                    d="M0.986557 14.9927C0.986557 6.94248 7.51279 0.416245 15.563 0.416245C23.6136 0.416245 30.1399 6.94204 30.1399 14.9927C30.1399 23.0433 23.6132 29.5696 15.563 29.5696C7.5128 29.5696 0.986557 23.0429 0.986557 14.9927Z"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="0.30124"
                />
                <path
                    d="M18.2629 11.8846C18.0129 11.4231 17.1129 10.5 15.5129 10.5C13.5129 10.5 11.9629 12.3 11.9629 14.55V15.45C11.9629 17.3538 13.5129 19.5 15.5129 19.5C17.1129 19.5 18.0129 18.5769 18.2629 18.1154"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.62"
                    strokeLinecap="round"
                />
                <path
                    d="M18.2629 11.8846C18.0129 11.4231 17.1129 10.5 15.5129 10.5C13.5129 10.5 11.9629 12.3 11.9629 14.55V15.45C11.9629 17.3538 13.5129 19.5 15.5129 19.5C17.1129 19.5 18.0129 18.5769 18.2629 18.1154"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="1.62"
                    strokeLinecap="round"
                />
                <circle
                    cx="15.5621"
                    cy="14.9957"
                    r="9.94091"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.39091"
                />
                <circle cx="15.5621" cy="14.9957" r="9.94091" stroke="black" strokeOpacity="0.2" strokeWidth="1.39091" />
                <path
                    d="M15.5645 0.273438V2.31889V4.36435"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M15.5645 0.273438V2.31889V4.36435"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M28.4961 8L26.5026 9.15093L24.5092 10.3019"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M28.4961 8L26.5026 9.15093L24.5092 10.3019"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M28.8594 22.9062L26.4857 21.5358L24.1119 20.1653"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M28.8594 22.9062L26.4857 21.5358L24.1119 20.1653"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M15.5664 30.5469V28.0923V25.6378"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path d="M15.5664 30.5469V28.0923V25.6378" stroke="black" strokeOpacity="0.2" strokeWidth="1.39091" strokeLinecap="round" />
                <path
                    d="M2.54492 22.6797L4.5445 21.5252L6.54407 20.3708"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M2.54492 22.6797L4.5445 21.5252L6.54407 20.3708"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M2.67969 7.49219L4.7561 8.691L6.83251 9.88982"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
                <path
                    d="M2.67969 7.49219L4.7561 8.691L6.83251 9.88982"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="1.39091"
                    strokeLinecap="round"
                />
            </g>
            <defs>
                <clipPath id={id}>
                    <rect width="29.4545" height="29.4545" fill="white" transform="translate(0.835938 0.265625)" />
                </clipPath>
            </defs>
        </svg>
    );
};

const CW721 = (props: any) => {
    return (
        <svg width={props.width || '28'} height={props.height || '28'} viewBox="0 0 28 28" fill="none" {...props}>
            <path
                d="M14 0C6.26806 0 0 6.26768 0 14.0002C0 21.7328 6.26806 28 14 28C21.7319 28 28 21.7323 28 14.0002C28 6.26817 21.7319 0 14 0Z"
                fill="#313131"
            />
            <g opacity="0.4">
                <path
                    d="M5.12793 17.641V10.3438L9.48296 17.641V10.3438"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.63636"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19.2842 10.3438H23.6392"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.63636"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21.4629 10.3438V17.641"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.63636"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.6092 10.3438H12.5264V17.641"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.63636"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12.5264 13.9961H16.0648"
                    stroke={props.style?.stroke || props.stroke || '#02E191'}
                    strokeWidth="1.63636"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const Icons = {
    Amount,
    CoinStack1,
    CoinStack2,
    Coins,
    Edit,
    FirmaCraft,
    FirmaChain,
    Picture,
    Info,
    Link,
    MinusCircle,
    Percent,
    PlusCircle,
    Preview,
    Search,
    Setting,
    Twitter,
    Telegram,
    Valid,
    Medium,
    Wallet,
    Tag,
    RightArrow,
    PrevPage,
    LeftArrow,
    Dot,
    Copy,
    ExternalLink,
    LeftDoubleArrow,
    RightDoubleArrow,
    Success,
    Failed,
    Add,
    Close,
    XCircle,
    SnackbarSuccess,
    SnackbarWarn,
    SnackbarError,
    CloseIcon,
    Calendar,
    Tooltip,
    CW20,
    CW721
};

export default Icons;
