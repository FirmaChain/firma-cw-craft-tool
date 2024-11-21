import styled from 'styled-components';
import FirmaLoading from './firmaLoad';
import useGlobalStore from '@/store/globalStore';

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
    const globalLoading = useGlobalStore((v) => v.globalLoading);
    // useSelector((v: rootState) => v.global.globalLoading);

    return globalLoading ? (
        <Wrapper>
            <FirmaLoading />
        </Wrapper>
    ) : (
        <></>
    );
};

export default GlobalLoader;
