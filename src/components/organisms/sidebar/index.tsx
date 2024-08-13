import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
    CopyrightText,
    CopyrightWrapper,
    DrawerStyled,
    ExternalLinkButton,
    ExternalLinkWrapper,
    FeatureWrapper,
    FooterWrapper,
    LogoWrapper,
    MenuItem,
    MenuListWrapper,
    SidebarWrapper,
    SocialIcon,
    SocialIconButton,
    SocialWrapper,
    SwitchWrapper
} from './style';
import CwSwitch from '../../atoms/switch/cwSwitch';
import { CW_MODE_TYPE } from '@/constants/common';
import Icons from '@/components/atoms/icons';
import { MenuItemText } from './style';
import ColorButton from '@/components/atoms/buttons/colorButton';
import { rootState } from '@/redux/reducers';
import { GlobalActions } from '@/redux/actions';
import { CRAFT_CONFIGS } from '@/config';
import { openLink } from '@/utils/common';
import { useModalStore } from '@/hooks/useModal';
import Divider from '@/components/atoms/divider';
import { IC_SOCIAL_FIRMACHAIN, IC_SOCIAL_MEDIUM, IC_SOCIAL_TELEGRAM, IC_SOCIAL_TWITTER } from '@/components/atoms/icons/pngIcons';
import AddressBox from './addressBox';

const SOCIAL_LIST = [
    { Icon: <SocialIcon src={IC_SOCIAL_FIRMACHAIN} />, socialLink: 'https://firmachain.org' },
    { Icon: <SocialIcon src={IC_SOCIAL_MEDIUM} />, socialLink: 'https://medium.com/firmachain' },
    { Icon: <SocialIcon src={IC_SOCIAL_TELEGRAM} />, socialLink: 'https://t.me/firmachain_announcement' },
    { Icon: <SocialIcon src={IC_SOCIAL_TWITTER} />, socialLink: 'https://twitter.com/firmachain' }
];

const Sidebar = () => {
    const { isInit, address } = useSelector((state: rootState) => state.wallet);
    const { cwMode } = useSelector((state: rootState) => state.global);

    const location = useLocation();
    const navigate = useNavigate();
    const modal = useModalStore();

    const [blockExplorerLink, setBlockExplorerLink] = useState<string>();

    useEffect(() => {
        setBlockExplorerLink(CRAFT_CONFIGS.BLOCK_EXPLORER);
    }, []);

    useEffect(() => {
        if (location.pathname.includes('cw721')) {
            GlobalActions.handleCw('CW721');
        } else {
            GlobalActions.handleCw('CW20');
        }
    }, [location])

    const onChangeSwitch = (type: CW_MODE_TYPE) => {
        GlobalActions.handleCw(type);
        switch (type) {
            case 'CW20':
                if (location.pathname.includes('instantiate')) {
                    navigate(`/instantiate`);
                } else if (location.pathname.includes('execute')) {
                    navigate(`/execute`);
                } else if (location.pathname.includes('search')) {
                    navigate(`/search`);
                } else if (location.pathname.includes('mynft')) {
                    navigate(`/mytoken`);
                }
                break;

            case 'CW721':
                if (location.pathname.includes('instantiate')) {
                    navigate(`/cw721/instantiate`);
                } else if (location.pathname.includes('execute')) {
                    navigate(`/cw721/execute`);
                } else if (location.pathname.includes('search')) {
                    navigate(`/cw721/search`);
                } else if (location.pathname.includes('mytoken')) {
                    navigate(`/cw721/mynft`);
                }
                break;
        }
    };

    const onClickMenu = (e: any, path: string) => {
        e.preventDefault();

        if (cwMode === 'CW20') {
            navigate(path);
        } else {
            navigate(`/cw721${path}`);
        }
    };

    const onClickConnectWallet = () => {
        // ModalActions.handleConnectWallet(true);
        modal.openModal({ modalType: 'connectWallet' });
    };

    const onClickExternalLink = () => {
        openLink(blockExplorerLink);
    };

    const onClickSocialLink = (e: any, socialLink: string) => {
        if (socialLink !== '') {
            e.preventDefault();
            openLink(socialLink);
        }
    };

    if (location.pathname === '/') return <></>;
    return (
        <div style={{ minWidth: '224px', height: '100vh' }}>
            <DrawerStyled>
                <SidebarWrapper>
                    <FeatureWrapper>
                        <LogoWrapper>
                            <Link to={{ pathname: '/instantiate' }}>
                                <Icons.FirmaCraft width={'132px'} height={'34px'} />
                            </Link>
                        </LogoWrapper>
                        {/* SWITCH */}
                        <SwitchWrapper>
                            <CwSwitch value={cwMode} onChange={onChangeSwitch} />
                        </SwitchWrapper>
                        {/* BUTTONS */}
                        <MenuListWrapper>
                            <MenuItem onClick={(e) => onClickMenu(e, '/instantiate')}>
                                <Icons.PlusCircle
                                    fill={location.pathname.includes('/instantiate') ? '#e6e6e6' : '#807E7E'}
                                    width={'16px'}
                                    height={'16px'}
                                />
                                <MenuItemText selected={location.pathname.includes('/instantiate')}>Instantiate</MenuItemText>
                            </MenuItem>
                            <MenuItem onClick={(e) => onClickMenu(e, '/execute')}>
                                <Icons.Setting
                                    fill={location.pathname.includes('/execute') ? '#e6e6e6' : '#807E7E'}
                                    width={'16px'}
                                    height={'16px'}
                                />
                                <MenuItemText selected={location.pathname.includes('/execute')}>Execute</MenuItemText>
                            </MenuItem>
                            <Divider $direction="horizontal" $color="var(--Gray-450, #313131)" />
                            <MenuItem onClick={(e) => onClickMenu(e, '/search')}>
                                <Icons.Search
                                    fill={location.pathname.includes('/search') ? '#e6e6e6' : '#807E7E'}
                                    stroke={location.pathname.includes('/search') ? '#e6e6e6' : '#807E7E'}
                                    width={'16px'}
                                    height={'16px'}
                                />
                                <MenuItemText selected={location.pathname.includes('/search')}>Search</MenuItemText>
                            </MenuItem>
                            <MenuItem onClick={(e) => onClickMenu(e, cwMode === 'CW20' ? '/mytoken' : '/mynft')}>
                                <Icons.Coins
                                    fill={location.pathname.includes(cwMode === 'CW20' ? '/mytoken' : '/mynft') ? '#e6e6e6' : '#807E7E'}
                                    width={'16px'}
                                    height={'16px'}
                                />
                                <MenuItemText selected={location.pathname.includes(cwMode === 'CW20' ? '/mytoken' : '/mynft')}>
                                    {cwMode === 'CW20' ? 'My Minted Tokens' : 'My NFT Contracts'}
                                </MenuItemText>
                            </MenuItem>
                        </MenuListWrapper>
                        {isInit ? (
                            <AddressBox />
                        ) : (
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
                                    color: '#121212'
                                }}
                                onClick={onClickConnectWallet}
                            />
                        )}
                    </FeatureWrapper>
                    <FooterWrapper>
                        <ExternalLinkWrapper>
                            <ExternalLinkButton onClick={onClickExternalLink}>Block Explorer</ExternalLinkButton>
                            <ExternalLinkButton href={'mailto:info@firmachain.org'}>Contact Us</ExternalLinkButton>
                        </ExternalLinkWrapper>
                        <Divider $direction="horizontal" $color={'#383838'} />
                        <SocialWrapper>
                            {SOCIAL_LIST.map((value, index) => (
                                <SocialIconButton key={index} onClick={(e) => onClickSocialLink(e, value.socialLink)}>
                                    {value.Icon}
                                </SocialIconButton>
                            ))}
                        </SocialWrapper>
                        <CopyrightWrapper>
                            <CopyrightText>Powered by FIRMACHAIN</CopyrightText>
                        </CopyrightWrapper>
                    </FooterWrapper>
                </SidebarWrapper>
            </DrawerStyled>
        </div>
    );
};

export default React.memo(Sidebar);
