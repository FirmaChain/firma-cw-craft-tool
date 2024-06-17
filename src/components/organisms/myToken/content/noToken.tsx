import { Link } from "react-router-dom";

import ColorButton from "../../../atoms/buttons/colorButton";
import { ContentBodyWrapper, NoTokenTypo, NoTokenWrapper } from "./style"

const NoToken = () => {
  const onClickGoToInstantiate = () => {

  };

  return (
    <ContentBodyWrapper>
      <NoTokenWrapper>
        <NoTokenTypo>There is no Token.</NoTokenTypo>
        <Link to={{ pathname: '/' }}>
          <ColorButton
            width={'178px'}
            height={'40px'}
            color={'#262626'}
            text={'Go to instantiate →'}
            border={'1px solid var(--Green-500, #02E191)'}
            sx={{
              color: 'var(--Green-500, #02E191)',
              fontSize: '11px',
              fontWeight: 600,
              fontStyle: 'normal',
              lineHeight: '20px'
            }}
            onClick={onClickGoToInstantiate}
          />
        </Link>
      </NoTokenWrapper>
    </ContentBodyWrapper>
  )
};

export default NoToken;