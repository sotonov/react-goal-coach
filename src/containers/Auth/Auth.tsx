import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
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

export interface AuthProps {
  email: string;
  onAuth: (email: string, password: string, isSignup: boolean) => void;
}

export interface State {
  controls: {
    email: {
      elementConfig: {
        type: string,
        placeholder: string,
      },
      value: string,
      validation: {
        required: boolean,
        isEmail: boolean
      },
      valid: boolean,
      touched: boolean,
    },
    password: {
      elementConfig: {
        type: string,
        placeholder: string
      },
      value: string,
      validation: {
        required: boolean,
        minLength: number
      },
      valid: boolean,
      touched: boolean,
    }
  };
  isSignup: boolean;
}

class Auth extends React.Component<AuthProps, State> {
  state: State = {
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

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, controlName: string): void => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: e.target.value,
        valid: checkValidity(e.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  handleChangeAuthMode = (e: React.MouseEvent<HTMLElement>): void => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    })
  }

  render () {
    const formElementsArray: any = [];
    for(const key in this.state.controls){
      if (this.state.controls.hasOwnProperty(key)) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        })
      }
    }

    const form = formElementsArray.map((formElement: any): React.ReactNode => {
      const isInvalid = !formElement.config.valid && formElement.config.validation && formElement.config.validation;
      return (
        <Input
          key={formElement.id}
          type={formElement.config.elementConfig.type}
          placeholder={formElement.config.elementConfig.placeholder}
          value={formElement.config.value}
          auth={true}
          invalid={isInvalid}
          handleChange={(e) => this.handleInputChange(e, formElement.id)}
        />
      )
    });

    let redirectToGoals;
    if (this.props.email) {
      redirectToGoals = <Redirect to='/goals' />;
    }

    const messageContent = <strong>{cst.SWITCH_TO + ' ' + (!this.state.isSignup ? cst.SIGN_UP : cst.SIGN_IN)}</strong>;

    return (
      <Aux>
        {redirectToGoals}
        <div className={styles.auth}>
          <Title
            auth={true}>
            {cst.GOAL_COACH_TITLE}
          </Title>
          <div className={styles.auth__title}>
            <Label
              auth={true}>
              {this.state.isSignup ? cst.SIGN_UP : cst.SIGN_IN}
            </Label>
            <Message
              handleClick={this.handleChangeAuthMode}
              auth={true}>
              {messageContent}
            </Message>
          </div>
          <form
            className={styles.auth__form}
            onSubmit={this.handleSubmit}>
            {form}
            <Button
              signin={true}>
              {this.state.isSignup ? cst.SIGN_UP : cst.SIGN_IN}
            </Button>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAuth: (em, pw, isSignup) => dispatch(actions.auth(em, pw, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
