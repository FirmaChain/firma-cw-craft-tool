import { rootState } from '@/redux/reducers';
import { useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 1;
`;

const GlobalLoader = () => {
    const globalLoading = useSelector((v: rootState) => v.global.globalLoading);

    return globalLoading ? (
        <Wrapper>
            <PuffLoader size="100px" color="#FFFFFF" />
        </Wrapper>
    ) : (
        <></>
    );
};

export default GlobalLoader;
