import { Tooltip, TooltipRefProps } from 'react-tooltip';
import { forwardRef } from 'react';
import { TOOLTIP_ID } from '@/constants/tooltip';

const CustomTooltip = forwardRef<TooltipRefProps>(({}, ref) => {
    return (
        <Tooltip
            ref={ref}
            id={TOOLTIP_ID.MOBILE}
            style={{
                backgroundColor: '#E6E6E6',
                color: '#1A1A1A',
                fontFamily: 'General Sans Variable',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '20px',
                textAlign: 'center',
                whiteSpace: 'pre-line',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
            }}
        />
    );
});

export default CustomTooltip;
