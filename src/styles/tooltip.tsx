import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

const DefaultTooltip = styled(Tooltip)`
    //? outside
    border-radius: 5px !important;
    padding: 8px 12px !important;

    //? inside
    background: #d9d9d9;
    text-align: center;

    //? text
    color: var(--Primary-Base-White, #fff) !important;
    /* Body/Body3 */
    font-family: 'General Sans Variable';
    font-size: 13px !important;
    line-height: 20px !important; /* 153.846% */
    white-space: pre;
`;

export default DefaultTooltip;
