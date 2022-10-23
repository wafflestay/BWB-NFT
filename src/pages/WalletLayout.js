import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { pages } from '../../constants';
import PersonIcon from '@mui/icons-material/Person';
import styles from '../AuthLayout/style.module.scss';
import classNames from 'classnames';
import logo from '../../assets/images/logo.svg';
import useWallet from '../hooks/useWallet';
import {truncateAddress} from "../utils/helper/helper";

const BUTTON_LABEL = 'Connect Wallet';

const MergedLayout = ({ children }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { connectWallet } = useWallet();

  const { account } = useSelector((store) => store.wallet);
  const { token } = useSelector((store) => store.auth);
  const { isProfileOpen } = useSelector((store) => store.popup);

  const label = account ? truncateAddress(account) : BUTTON_LABEL;

  const handleClick = () => {
    if (!account) navigate('/login');
    return;
  };

  const handleToggleMenu = () => dispatch(toggleProfilePopup());

  return (
    <>
      <Header
        img={logo}
        sticky={true}
        extra={
          <Box display="flex" alignItems="center" position="relative" ref={ref}>
            <Button variant="outlinedDark" onClick={handleClick}>
              {label}
            </Button>
            <PersonIcon
              className={classNames(styles.profile, {
                [styles.active]: isProfileOpen
              })}
              onClick={handleToggleMenu}
            />
            {!!token && isProfileOpen && <ProfileMenu />}
          </Box>
        }
      >
        <List className={styles.navList}>
          {pages.map((page) => (
            <ListItem
              className={classNames(styles.navItem, {
                [styles.active]: pathname.includes(page.to)
              })}
              key={page.name}
            >
              <NavLink to={page.to}>
                <Typography variant="body2">{page.name}</Typography>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Header>
      {children}
      <Footer />
    </>
  );
};

export default MergedLayout;
