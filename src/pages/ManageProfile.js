import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarPicker from '../components/AvatarPicker';
import InputField from '../components/InputField';
import { changeAvatar, changePassword } from '../actions/userActions';
import { ReactComponent as EyeClosed } from '../svg/eye-closed.svg';
import { ReactComponent as EyeOpen } from '../svg/eye-open.svg';

class ManageProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAvatar: '',
      passwordOne: {
        value: '',
        isPwdVisible: false
      },
      passwordTwo: {
        value: '',
        isPwdVisible: false
      }
    };

    this.fields = [
      'avatar',
      'password'
    ];

    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleAvatarSubmit = this.handleAvatarSubmit.bind(this);
    this.togglePwdVisibility = this.togglePwdVisibility.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleAvatarChange(avatar) {
    this.setState((prevState) => ({
      ...prevState,
      selectedAvatar: avatar
    }));
  }

  handleAvatarSubmit() {
    this.props.dispatch(changeAvatar(this.state.selectedAvatar));
  }

  togglePwdVisibility(inputId) {
    this.setState((prevState) => ({
      ...prevState,
      [inputId]: {
        ...prevState[inputId],
        isPwdVisible: !prevState[inputId].isPwdVisible
      }
    }));
  }

  handlePasswordChange(event) {
    const target = event.target;
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: {
        ...prevState[target.name],
        value: target.value
      }
    }));
  }

  handlePasswordSubmit() {
    this.props.dispatch(changePassword(this.state.passwordOne.value));
  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    const { field } = this.props.match.params;
    return (
      <>
        {
          this.fields.includes(field) ? null : <Redirect to="/" />
        }
        <div className="manage-profile">
          {
            field === 'avatar'
              ? (
                <>
                  <div className="manage-header">
                    Change avatar
                  </div>
                  <div className="manage-input">
                    <AvatarPicker
                      onChange={this.handleAvatarChange}
                    />
                  </div>
                </>
              )
              : null
          }
          {
            field === 'password'
              ? (
                <>
                  <div className="manage-header">
                    Change password
                  </div>
                  <div className="manage-input">
                    <InputField
                      name="passwordOne"
                      type={this.state.passwordOne.isPwdVisible ? 'text' : 'password'}
                      value={this.state.passwordOne.value}
                      placeholder={'Enter new password'}
                      onChange={this.handlePasswordChange}
                      trailIconComp={
                        this.state.passwordOne.isPwdVisible
                          ? <EyeOpen onClick={() => this.togglePwdVisibility('passwordOne')} />
                          : <EyeClosed onClick={() => this.togglePwdVisibility('passwordOne')} />
                      }
                    />
                    <InputField
                      name="passwordTwo"
                      type={this.state.passwordTwo.isPwdVisible ? 'text' : 'password'}
                      value={this.state.passwordTwo.value}
                      placeholder={'Repeat new password'}
                      onChange={this.handlePasswordChange}
                      trailIconComp={
                        this.state.passwordTwo.isPwdVisible
                          ? <EyeOpen onClick={() => this.togglePwdVisibility('passwordTwo')} />
                          : <EyeClosed onClick={() => this.togglePwdVisibility('passwordTwo')} />
                      }
                    />
                  </div>
                </>
              )
              : null
          }
          <div className="input-submit">
            {
              field === 'avatar'
                ? (
                  <button
                    disabled={this.state.selectedAvatar === ''}
                    onClick={this.handleAvatarSubmit}
                  >
                    Change avatar
                  </button>
                )
                : null
            }
            {
              field === 'password'
                ? (
                  <button
                    disabled={this.state.passwordOne.value === '' || this.state.passwordOne.value !== this.state.passwordTwo.value}
                    onClick={this.handlePasswordSubmit}
                  >
                    Change password
                  </button>
                )
                : null
            }
            <button
              onClick={this.cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default connect()(ManageProfile);
