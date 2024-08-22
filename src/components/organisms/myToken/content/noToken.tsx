import { Link } from 'react-router-dom';

import ColorButton from '@/components/atoms/buttons/colorButton';
import { ContentBodyWrapper, NoTokenTypo, NoTokenWrapper } from './style';
import GoToInstantiateButton from '@/components/atoms/buttons/goToInstantiateButton';

const NoToken = () => {
    const onClickGoToInstantiate = () => {};

    return (
        <ContentBodyWrapper>
            <NoTokenWrapper>
                <NoTokenTypo>There is no Token.</NoTokenTypo>
                <Link to={{ pathname: '/instantiate' }}>
                    <GoToInstantiateButton text={'Go to instantiate →'} onClick={onClickGoToInstantiate} />
                </Link>
            </NoTokenWrapper>
        </ContentBodyWrapper>
    );
};

export default NoToken;
