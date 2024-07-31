import { useState } from 'react';
import styled from 'styled-components';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_CLOCK, IC_COINS_HAND, IC_ID_CIRCLE, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { format } from 'date-fns';
import GreenButton from '@/components/atoms/buttons/greenButton';
import commaNumber from 'comma-number';
import { IAllowanceInfo } from '@/components/organisms/execute/hooks/useExecuteStore';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const ItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ItemLabelWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

const ItemLabelIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ItemLabelTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    opacity: 0.8;
`;

const ItemAmountWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const AccordionBox = styled.div`
    height: auto;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AccordionRow = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '16px',

    img: { width: '20px', height: '20px' }
});

const AccordionTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ExpirationBox = ({ allowanceInfo }: { allowanceInfo?: IAllowanceInfo | null }) => {
    if (!allowanceInfo) return <AccordionTypo $disabled>Expiration</AccordionTypo>;

    if (allowanceInfo.type === 'never') return <AccordionTypo $disabled={false}>Forever</AccordionTypo>;
    if (!allowanceInfo.expire) return <AccordionTypo $disabled={true}>Expiration</AccordionTypo>;
    if (allowanceInfo.type === 'at_height')
        return <AccordionTypo $disabled={false}>{commaNumber(allowanceInfo?.expire)} Block</AccordionTypo>;
    if (allowanceInfo.type === 'at_time')
        return (
            <AccordionTypo $disabled={false}>
                {format(new Date(Math.floor(Number(allowanceInfo.expire) / 1000000)), 'yyyy-MM-dd HH:mm:ss')}
            </AccordionTypo>
        );

    return <></>;
};

const ApproveAllPreview = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COINS_HAND} alt={'approve-nft'} />
                        <ItemLabelTypo>Approve All NFTs</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <AccordionBox>
                        <AccordionRow>
                            <img src={IC_WALLET} alt="wallet" />

                            <AccordionTypo $disabled>Wallet Address</AccordionTypo>
                        </AccordionRow>
                        <AccordionRow>
                            <img src={IC_CLOCK} alt="clock" />
                            <ExpirationBox />
                        </AccordionRow>
                    </AccordionBox>
                )}
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled>
                    <div className="button-text">Approve All</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default ApproveAllPreview;
