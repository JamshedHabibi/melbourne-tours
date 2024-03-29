import React, { Component } from 'react';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import './NavbarLoginButton.css';
import { Consumer } from '../Context';
import LogInModal from './LogInModal';
import { Link } from 'react-router-dom';

export default class NavbarLoginButton extends Component {
  render() {
    const loginIcon = (
      <div>
        <Icon name="user" style={{ color: this.props.color }} />
        <span className="navbar-login-btn-text" style={{ color: this.props.color }}>
          Log In
        </span>
      </div>
    );

    const accountIcon = (
      <Consumer>
        {value => {
          return (
            <div>
              <img src={value.photoURL} alt="avatar" width="40px" />
              <span className="navbar-login-btn-text-signed-in">{value.name}</span>
            </div>
          );
        }}
      </Consumer>
    );

    const logInOptions = [
      { key: 1, text: <LogInModal />, value: 1 },
      {
        key: 2,
        text: (
          <div>
            <Link to="/wishlist" style={{ color: 'black' }}>
              <Icon name="heart" />
              Wishlist
            </Link>
          </div>
        ),
        value: 2,
      },
    ];

    const accountOptions = [
      {
        key: 1,
        text: (
          <Link to="/account" style={{ color: 'black' }}>
            <Icon name="user" />
            Account Details
          </Link>
        ),
        value: 1,
      },
      {
        key: 2,
        text: (
          <div>
            <Link to="/wishlist" style={{ color: 'black' }}>
              <Icon name="heart" />
              Wishlist
            </Link>
          </div>
        ),
        value: 2,
      },
      {
        key: 3,
        text: (
          <Consumer>
            {context => {
              return <div onClick={context.logOut}>Log Out</div>;
            }}
          </Consumer>
        ),
        value: 3,
      },
    ];

    return (
      <Consumer>
        {value => {
          const { user } = value;
          return user ? (
            <Menu compact className="navbar-login-btn-signed-in">
              <Dropdown style={{ color: this.props.color }} text={accountIcon} options={accountOptions} simple item />
            </Menu>
          ) : (
            <Menu compact className="navbar-login-btn">
              <Dropdown text={loginIcon} simple item style={{ color: this.props.color }}>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <LogInModal />
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <div>
                      <Link to="/wishlist" style={{ color: 'black' }}>
                        <Icon name="heart" />
                        Wishlist
                      </Link>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          );
        }}
      </Consumer>
    );
  }
}
