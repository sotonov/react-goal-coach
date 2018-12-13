import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Title from '../../components/atoms/Title/Title';
import Label from '../../components/atoms/Label/Label';
import Message from '../../components/atoms/Message/Message';
import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';
import styles from './Auth.module.css';
import * as cst from '../../constants/constants';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: false
  };

  handleInputChange = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  handleChangeAuthMode = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    })
  }

  render () {
    const formElementsArray = [];
    for(let key in this.state.controls){
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(formElement => {
      const isInvalid = !formElement.config.valid && formElement.config.validation && formElement.config.validation;
      return (
        <Input
          key={formElement.id}
          type={formElement.config.elementConfig.type}
          placeholder={formElement.config.elementConfig.placeholder}
          value={formElement.config.value}
          auth
          invalid={isInvalid}
          handleChange={(event) => this.handleInputChange(event, formElement.id)}
        />
      )
    });

    let redirectToGoals;
    if (this.props.email) {
      // console.log('mail: ', this.props.email);
      redirectToGoals = <Redirect to='/goals' />;
    }

    const messageContent = <strong>{cst.SWITCH_TO + ' ' + (!this.state.isSignup ? cst.SIGN_UP : cst.SIGN_IN)}</strong>;

    return (
      <Aux>
        {redirectToGoals}
        <div className={styles.auth}>
          <Title content={cst.GOAL_COACH_TITLE} auth />
          <div className={styles.auth__title}>
            <Label
              content={this.state.isSignup ? cst.SIGN_UP : cst.SIGN_IN}
              auth />
            <Message
              auth
              content={messageContent}
              handleClick={this.handleChangeAuthMode} />
          </div>
          <form
            className={styles.auth__form}
            onSubmit={this.handleSubmit}>
            {form}
            <Button
              handleClick={this.handleSubmit}
              content={this.state.isSignup ? cst.SIGN_UP : cst.SIGN_IN}
              signin
              />
          </form>
        </div>
      </Aux>
    );
  };
}

const mapStateToProps = state => {
  return {
    email: state.auth.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (em, pw, isSignup) => dispatch(actions.auth(em, pw, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
