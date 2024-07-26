import { TOOLTIP_ID } from '@/constants/tooltip';
import Icons from '../icons';

const IconTooltip = ({
    size = '12px',
    tooltip = '',
    TooltipIcon = <Icons.Tooltip width={size} height={size} />
}: {
    size?: string;
    tooltip?: string;
    TooltipIcon?: string | JSX.Element;
}) => {
    return (
        <div
            data-tooltip-content={tooltip}
            data-tooltip-id={TOOLTIP_ID.COMMON}
            data-tooltip-wrapper="span"
            data-tooltip-place="bottom"
            style={{ display: 'flex', cursor: 'help', height: 'fit-content' }}
        >
            {typeof TooltipIcon === 'string' ? (
                <img src={TooltipIcon} alt="tooltip-icon" style={{ width: size, height: size }}></img>
            ) : (
                TooltipIcon
            )}
        </div>
    );
};

export default IconTooltip;
