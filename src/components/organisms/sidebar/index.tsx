import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
    AddressCard,
    AddressText,
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
import CwSwitch from './cwSwitch';
import { CW_TYPE, NETWORK_TYPE } from '@/constants/common';
import Icons from '@/components/atoms/icons';
import { MenuItemText } from './style';
import ColorButton from '@/components/atoms/buttons/colorButton';
import { rootState } from '@/redux/reducers';
import { GlobalActions } from '@/redux/actions';
import NetworkMenu from './network';
import { CRAFT_CONFIGS } from '@/config';
import { copyToClipboard, openLink, shortenAddress } from '@/utils/common';
import IconButton from '@/components/atoms/buttons/iconButton';
import { useSnackbar } from 'notistack';
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
    const { network } = useSelector((state: rootState) => state.global);

    const location = useLocation();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const modal = useModalStore();

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
        // ModalActions.handleConnectWallet(true);
        modal.openModal({ modalType: 'connectWallet' });
    };

    const onClickNetworkMenu = (type: NETWORK_TYPE) => {
        GlobalActions.handleNetwork(type);
        enqueueSnackbar({ variant: 'success', message: `${type} change completed` });

        if (location.pathname.includes('mytoken/detail')) {
            navigate('/mytoken');
        }
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

    const onClickAddress = async () => {
        const errorMessage = await copyToClipboard(address);

        if (errorMessage) enqueueSnackbar({ variant: 'error', message: errorMessage });
        else enqueueSnackbar({ variant: 'success', message: 'Copied!' });
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
                            <CwSwitch onChange={onChangeSwitch} />
                        </SwitchWrapper>
                        {/* BUTTONS */}
                        <MenuListWrapper>
                            <MenuItem onClick={(e) => onClickMenu(e, '/instantiate')}>
                                <Icons.PlusCircle
                                    fill={'/' + location.pathname.split('/')[1] === '/instantiate' ? '#e6e6e6' : '#807E7E'}
                                    width={'16px'}
                                    height={'16px'}
                                />
                                <MenuItemText selected={'/' + location.pathname.split('/')[1] === '/instantiate'}>Instantiate</MenuItemText>
                            </MenuItem>
                            <MenuItem onClick={(e) => onClickMenu(e, '/execute')}>
                                <Icons.Setting
                                    fill={'/' + location.pathname.split('/')[1] === '/execute' ? '#e6e6e6' : '#807E7E'}
                                    width={'16px'}
                                    height={'16px'}
                                />
                                <MenuItemText selected={'/' + location.pathname.split('/')[1] === '/execute'}>Execute</MenuItemText>
                            </MenuItem>
                            <Divider $direction="horizontal" $color="var(--Gray-450, #313131)" />
                            <MenuItem onClick={(e) => onClickMenu(e, '/search')}>
                                <Icons.Search
                                    fill={'/' + location.pathname.split('/')[1] === '/search' ? '#e6e6e6' : '#807E7E'}
                                    stroke={'/' + location.pathname.split('/')[1] === '/search' ? '#e6e6e6' : '#807E7E'}
                                    width={'16px'}
                                    height={'16px'}
                                />
                                <MenuItemText selected={'/' + location.pathname.split('/')[1] === '/search'}>Search</MenuItemText>
                            </MenuItem>
                            <MenuItem onClick={(e) => onClickMenu(e, '/mytoken')}>
                                <Icons.Coins
                                    fill={'/' + location.pathname.split('/')[1] === '/mytoken' ? '#e6e6e6' : '#807E7E'}
                                    width={'16px'}
                                    height={'16px'}
                                />
                                <MenuItemText selected={'/' + location.pathname.split('/')[1] === '/mytoken'}>
                                    My Minted Tokens
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
                        <NetworkMenu onChange={onClickNetworkMenu} />
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
