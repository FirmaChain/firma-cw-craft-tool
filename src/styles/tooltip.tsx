import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

const DefaultTooltip = styled(Tooltip)`
    //? outside
    border-radius: 5px !important;
    padding: 8px 12px !important;

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
    white-space: pre;
`;

export default DefaultTooltip;
