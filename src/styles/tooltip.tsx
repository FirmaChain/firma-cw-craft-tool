import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

const DefaultTooltip = styled(Tooltip)`
    //? outside
    border-radius: 5px !important;
    padding: 8px 12px !important;

    max-width: 30vw; /* Set maximum width */
    white-space: normal; /* Allow line break */
    word-wrap: break-word; /* Break long words */
    word-break: break-word; /* Break long words */

    //? inside
    background: #4a4a4a !important;
    text-align: center;
    opacity: 1 !important;

    //? text
    color: var(--Primary-Base-White, #fff) !important;
    /* Body/Body3 */
    font-family: 'General Sans Variable';
    font-size: 13px !important;
    line-height: 20px !important; /* 153.846% */
    white-space: pre-wrap;
`;

export const LightTooltip = styled(Tooltip)`
    //? outside
    border-radius: 5px !important;
    padding: 8px 12px !important;

    max-width: 30vw; /* Set maximum width */
    white-space: normal; /* Allow line break */
    word-wrap: break-word; /* Break long words */
    word-break: break-word; /* Break long words */

    //? inside
    background: #e6e6e6 !important;
    text-align: center;
    opacity: 1 !important;

    //? text
    color: var(--Gray-200, #1a1a1a) !important;

    /* Body/Body2 - Md */
    font-family: 'General Sans Variable';
    font-size: 14px !important;

    font-weight: 500;
    line-height: 20px !important; /* 142.857% */
    white-space: pre-wrap;
`;

export default DefaultTooltip;
