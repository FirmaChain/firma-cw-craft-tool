import { TOOLTIP_ID } from '@/constants/tooltip';
import styled from 'styled-components';

const ItemWrapper = styled.div<{ $isCover?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    height: ${({ $isCover }) => ($isCover ? '28px' : '24px')};
`;

const ItemLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

const ItemText = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    width: 150px;
`;

const ItemValue = styled.div`
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;

    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const ItemEmptyValue = styled.div`
    color: var(--Gray-500, #383838);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ItemValueCover = styled.div<{ $visible: boolean }>`
    display: flex;
    padding: 4px 12px;
    border-radius: 100px;
    border: ${({ $visible }) => ($visible ? '1px solid var(--Gray-500, #383838)' : 'none')};
    background: ${({ $visible }) => ($visible ? 'var(--Gray-400, #2c2c2c)' : 'none')};
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ItemCoverValue = styled.div`
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: #707070;
`;

const ItemEmptyValueCover = styled.div`
    display: flex;
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid var(--Gray-500, #383838);
    background: var(--Gray-400, #1e1e1e);
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ItemEmptyCoverValue = styled.div`
    color: var(--Gray-500, #383838);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const ItemIcon = styled.img`
    width: 24px;
    height: 24px;
`;

interface IProps {
    imagePath: string;
    name: string;
    value: string;
    isCover?: boolean;
    defaultValue?: string;
    tooltip?: string;
}

const ContentItem = ({ imagePath, name, value, isCover = false, defaultValue, tooltip }: IProps) => {
    return (
        <ItemWrapper $isCover={isCover}>
            <ItemLeftWrapper>
                <ItemIcon src={imagePath} />
                {/* {imagePath} */}
                <ItemText>{name}</ItemText>
            </ItemLeftWrapper>
            {!isCover ? (
                value === null || value === '' ? (
                    <ItemEmptyValue>{defaultValue}</ItemEmptyValue>
                ) : (
                    <ItemValue
                        data-tooltip-content={tooltip || ''}
                        data-tooltip-id={TOOLTIP_ID.COMMON}
                        data-tooltip-wrapper="span"
                        data-tooltip-place="bottom"
                    >
                        {value}
                    </ItemValue>
                )
            ) : value === null || value === '' ? (
                <ItemEmptyValueCover>
                    <ItemEmptyCoverValue>{defaultValue}</ItemEmptyCoverValue>
                </ItemEmptyValueCover>
            ) : (
                <ItemValueCover $visible={value.length > 0}>
                    <ItemCoverValue
                        data-tooltip-content={tooltip || ''}
                        data-tooltip-id={TOOLTIP_ID.COMMON}
                        data-tooltip-wrapper="span"
                        data-tooltip-place="bottom"
                    >
                        {value}
                    </ItemCoverValue>
                </ItemValueCover>
            )}
        </ItemWrapper>
    );
};

export default ContentItem;
