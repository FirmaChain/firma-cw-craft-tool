import { TOOLTIP_ID } from '@/constants/tooltip';
import IconButton from './iconButton';

const ContractPinButton = ({ isPinned, isBlocked, onClick }: { isPinned: boolean; isBlocked: boolean; onClick: (evt) => void }) => {
    return (
        <IconButton
            disabled={isBlocked && !isPinned}
            style={{
                display: 'flex',
                minWidth: '16px',
                minHeight: '24px',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'unset !important'
            }}
            onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();

                if (isBlocked) {
                    if (isPinned) onClick(evt);
                } else {
                    onClick(evt);
                }
            }}
            data-tooltip-id={TOOLTIP_ID.COMMON}
            data-tooltip-content={isBlocked && !isPinned ? 'You cannot pin more than 10 tokens.' : ''}
        >
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
                <path
                    d="M9.29384 1.17333C9.51611 0.489261 10.4839 0.489262 10.7062 1.17334L12.303 6.08776C12.4024 6.39369 12.6874 6.60081 13.0091 6.60081H18.1764C18.8957 6.60081 19.1948 7.52123 18.6129 7.94401L14.4324 10.9813C14.1722 11.1704 14.0633 11.5055 14.1627 11.8114L15.7595 16.7259C15.9817 17.4099 15.1988 17.9788 14.6169 17.556L10.4364 14.5187C10.1762 14.3296 9.82381 14.3296 9.56357 14.5187L5.38311 17.556C4.8012 17.9788 4.01825 17.4099 4.24052 16.7259L5.83731 11.8114C5.93672 11.5055 5.82782 11.1704 5.56759 10.9813L1.38713 7.94401C0.805219 7.52123 1.10428 6.60081 1.82356 6.60081H6.99089C7.31256 6.60081 7.59765 6.39368 7.69705 6.08776L9.29384 1.17333Z"
                    stroke={isPinned ? '#02E191' : '#999999'}
                    strokeWidth="1.1"
                    fill={isPinned ? '#02E191' : 'unset'}
                />
            </svg>
        </IconButton>
    );
};

export default ContractPinButton;
