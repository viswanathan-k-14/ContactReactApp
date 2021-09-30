import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';
const Navbar = ({ title, icon }) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loading } = authContext;
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;
  const onLogOut = () => {
    logout();
    clearContacts();
    history.push('/login');
  };

  const authLinks = (
    <Fragment>
      <li>
        Hi{'   '}
        {user && user.name}
      </li>
      <li>
        <a onClick={onLogOut} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link className='link' to='/register'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Contact Book',
  icon: 'fas fa-id-card',
};
export default Navbar;
