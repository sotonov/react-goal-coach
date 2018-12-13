import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Goals.module.css';
import GoalAdder from '../../components/molecules/GoalAdder/GoalAdder';
import GoalList from '../../components/organisms/GoalList/GoalList';
import Title from '../../components/atoms/Title/Title';
import Greeting from '../../components/molecules/Greeting/Greeting';
import * as actions from '../../store/actions/index';
import * as cst from '../../constants/constants';

class Goals extends Component {
  state = {
    text: ''
  }

  componentDidMount () {
    this.props.onFetchGoals();
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({text: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Adding a goal...');
    const goal = {
      goal: this.state.text,
      createdBy: this.props.email,
      completedBy: ''
    }
    this.props.onAddGoal(goal);
    this.setState({ text: '' });
  }

  handleClearAll = (event) => {
    event.preventDefault();
    const completedGoalsKeys = this.props.goals.filter(el => el.completedBy).map(el => el.key);
    this.props.onClearCompletedGoals(completedGoalsKeys);
  }

  signout = (event) => {
    event.preventDefault();
    this.props.onSignout();
  }

  render () {
    return (
      <div className={styles.goals}>
        <Title content={cst.GOAL_COACH_TITLE} goals />
        <Greeting
          user={this.props.email}
          handleClick={this.signout}/>
        <GoalAdder
          text={this.state.text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}  />
        <GoalList
          goals={this.props.goals}
          email={this.props.email}
          handleCompleteClick={(key, email) => this.props.onCompleteGoal(key, email)}
          handleDeleteClick={(key) => this.props.onDeleteGoal(key)}
          handleClearAllClick={this.handleClearAll}/>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    goals: state.goals.goals,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchGoals: () => dispatch(actions.fetchGoals()),
    onSignout: () => dispatch(actions.signout()),
    onAddGoal: (goal) => dispatch(actions.addGoal(goal)),
    onCompleteGoal: (key, email) => dispatch(actions.completeGoal(key, email)),
    onDeleteGoal: (key) => dispatch(actions.deleteGoal(key)),
    onClearCompletedGoals: (key) => dispatch(actions.clearCompletedGoals(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals);
