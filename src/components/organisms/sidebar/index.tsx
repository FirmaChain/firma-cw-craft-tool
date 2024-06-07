import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { AddressCard, AddressText, CopyrightText, CopyrightWrapper, DrawerStyled, ExternalLinkButton, ExternalLinkWrapper, FeatureWrapper, FooterWrapper, LogoWrapper, MenuItem, MenuListWrapper, SidebarWrapper, SocialIconButton, SocialWrapper, SwitchWrapper } from "./style";
import CwSwitch from "./cwSwitch";
import { CW_TYPE, NETWORK_TYPE } from "../../../constants/common";
import LineDivider from "../../atoms/divider/lineDivider";
import Icons from "../../atoms/icons";
import { MenuItemText } from "./style";
import ColorButton from "../../atoms/buttons/colorButton";
import { rootState } from "../../../redux/reducers";
import { GlobalActions } from "../../../redux/actions";
import NetworkMenu from "./network";
import { CRAFT_CONFIGS } from "../../../config";
import { shortenAddress } from "../../../utils/common";

const SOCIAL_LIST = [
  { Icon: <Icons.medium width={'100%'} height={'100%'} />, socialLink: 'https://medium.com/firmachain' },
  { Icon: <Icons.FirmaChain width={'100%'} height={'100%'} />, socialLink: 'https://firmachain.org' },
  { Icon: <Icons.telegram width={'100%'} height={'100%'} />, socialLink: 'https://t.me/firmachain_announcement' },
  { Icon: <Icons.twitter width={'100%'} height={'100%'} />, socialLink: 'https://twitter.com/firmachain' },
];

const Sidebar = () => {
  const isInit: boolean = false;
  const address: string = '';
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const { network } = useSelector((state: rootState) => state.global);
  
  const [blockExplorerLink, setBlockExplorerLink] = useState<string>();

  useEffect(() => {
    const link = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;
    setBlockExplorerLink(link);
  }, [network]);
  
  const onChangeSwitch = (type: CW_TYPE) => {
    GlobalActions.handleCw(type);
  };

  const onClickMenu = (e: any, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const onClickConnectWallet = () => {
    console.log('click connect waller');
  };

  const onClickNetworkMenu = (type: NETWORK_TYPE) => {
    GlobalActions.handleNetwork(type);
  };

  const onClickExternalLink = (e: any) => {
    e.preventDefault();
    window.open(blockExplorerLink);
  };

  const onClickSocialLink = (e: any, socialLink: string) => {
    if (socialLink !== '') {
      e.preventDefault();
      window.open(socialLink);
    }
  };

  return (
    <DrawerStyled variant='permanent' anchor='left'>
      <SidebarWrapper>
        <FeatureWrapper>
          <LogoWrapper>
            <Link to={{ pathname: '/' }}>
              <Icons.FirmaCraft width={'132px'} height={'34px'} />
            </Link>
          </LogoWrapper>
          {/* SWITCH */}
          <SwitchWrapper>
            <CwSwitch onChange={onChangeSwitch} />
          </SwitchWrapper>
          {/* BUTTONS */}
          <MenuListWrapper>
            <MenuItem onClick={(e) => onClickMenu(e, '/instantiate')}>
              <Icons.plusCircle selected={'/' + location.pathname.split('/')[1] === '/instantiate'} width={'16px'} height={'16px'} />
              <MenuItemText selected={'/' + location.pathname.split('/')[1] === '/instantiate'}>Instantiate</MenuItemText>
            </MenuItem>
            <MenuItem onClick={(e) => onClickMenu(e, '/execute')}>
              <Icons.setting selected={'/' + location.pathname.split('/')[1] === '/execute'} width={'16px'} height={'16px'} />
              <MenuItemText selected={'/' + location.pathname.split('/')[1] === '/execute'}>Execute</MenuItemText>
            </MenuItem>
            <LineDivider />
            <MenuItem onClick={(e) => onClickMenu(e, '/search')}>
              <Icons.search selected={'/' + location.pathname.split('/')[1] === '/search'} width={'16px'} height={'16px'} />
              <MenuItemText selected={'/' + location.pathname.split('/')[1] === '/search'}>Search</MenuItemText>
            </MenuItem>
            <MenuItem onClick={(e) => onClickMenu(e, '/mytoken')}>
              <Icons.Coins selected={'/' + location.pathname.split('/')[1] === '/mytoken'} width={'16px'} height={'16px'} />
              <MenuItemText selected={'/' + location.pathname.split('/')[1] === '/mytoken'}>My Minted Tokens</MenuItemText>
            </MenuItem>
          </MenuListWrapper>
          {isInit ?
            <AddressCard>
              <AddressText>{shortenAddress(address, 10, 6)}</AddressText>
            </AddressCard>
            :
            <ColorButton
              width={'100%'}
              height={'40px'}
              color={'#02E191'}
              text={'Connect Wallet'}
              sx={{
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '20px',
                color: '#121212',
              }}
              onClick={onClickConnectWallet}
            />
          }
        </FeatureWrapper>
        <FooterWrapper>
          <NetworkMenu onChange={onClickNetworkMenu} />
          <ExternalLinkWrapper>
            <ExternalLinkButton onClick={(e) => onClickExternalLink(e)}>Block Explorer</ExternalLinkButton>
            <ExternalLinkButton>Contact Us</ExternalLinkButton>
          </ExternalLinkWrapper>
          <LineDivider />
          <SocialWrapper>
            {SOCIAL_LIST.map((value, index) => (
              <SocialIconButton key={index} onClick={(e) => onClickSocialLink(e, value.socialLink)}>{value.Icon}</SocialIconButton>
            ))}
          </SocialWrapper>
          <CopyrightWrapper>
            <CopyrightText>Powered by FIRMACHAIN</CopyrightText>
          </CopyrightWrapper>
        </FooterWrapper>
      </SidebarWrapper>
    </DrawerStyled>
  );
};

export default React.memo(Sidebar);