import { useEffect } from 'react';
import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from './styles';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';

const UpdateOwnershipAccept = () => {
    
    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Update Ownership Accept</HeaderTitleTypo>
                    <HeaderDescTypo>Accept the transfer of the NFT contract ownership</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
        </Container>
    );
};

export default UpdateOwnershipAccept;
