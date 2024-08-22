import styled from 'styled-components';
import Icons from '../icons';
import { IC_MINUS_CIRCLE_DISABLE } from '../icons/pngIcons';
import IconButton from './iconButton';

const Base = styled(IconButton)<{ $size: string }>`
    width: ${({ $size }) => $size || '32px'};
    height: ${({ $size }) => $size || '32px'};
    padding: 0;
    background: transparent;
    border: unset;
    filter: unset !important;
    position: relative;

    .icon {
        position: absolute;
        opacity: 0;
    }

    &:hover .icon {
        opacity: 1;
    }
`;

const WalletRemoveButton = ({ size, disabled, onClick }: { size: string; disabled?: boolean; onClick: () => void }) => {
    return (
        <Base $size={size} disabled={disabled} onClick={onClick}>
            {!disabled && (
                <div className="icon">
                    <Icons.MinusCircle width={size} height={size} fill="#DCDCDC" />
                </div>
            )}
            {disabled ? (
                <img style={{ width: size, height: size }} alt="disabled" src={IC_MINUS_CIRCLE_DISABLE} />
            ) : (
                <Icons.MinusCircle className="icon" width={size} height={size} />
            )}
        </Base>
    );
};

export default WalletRemoveButton;
