import * as React from 'react';
import { connect } from 'react-redux';

import styles from './Goals.module.css';
import GoalAdder from '../../components/molecules/GoalAdder/GoalAdder';
import GoalList from '../../components/organisms/GoalList/GoalList';
import Title from '../../components/atoms/Title/Title';
import Greeting from '../../components/molecules/Greeting/Greeting';
import * as actions from '../../store/actions/index';
import { GoalType, AddedGoalType } from '../../store/types/goals';
import * as cst from '../../constants/constants';

interface GoalsProps {
  email: string;
  goals: GoalType[];
  onFetchGoals: () => any;
  onSignout: () => any;
  onAddGoal: (goal: AddedGoalType) => any | void;
  onCompleteGoal: (key: string, email: string) => void;
  onDeleteGoal: (key: string) => void;
  onClearCompletedGoals: (keys: string[] | undefined) => void;
}

interface State {
  text: string;
}

class Goals extends React.Component<GoalsProps, State> {
  state: State = {
    text: '',
  };

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
      text: this.state.text,
      createdBy: this.props.email,
      completedBy: ''
    }
    this.props.onAddGoal(goal);
    this.setState({ text: '' });
  }

  handleClearAll = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (this.props.goals.length) {
      const completedGoalsKeys = this.props.goals.filter(el => el.completedBy).map(el => el.key);
      this.props.onClearCompletedGoals(completedGoalsKeys);
    }
  }

  signout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.onSignout();
  }

  deleteGoal = (e: React.MouseEvent<HTMLButtonElement>, key: string): void => {
    e.preventDefault();
    this.props.onDeleteGoal(key);
  }

  completeGoal = (e: React.MouseEvent<HTMLButtonElement>, key: string, email: string): void => {
    e.preventDefault();
    this.props.onCompleteGoal(key, email);
  }

  render () {
    return (
      <div className={styles.goals}>
        <Title
          goals={true}>
          {cst.GOAL_COACH_TITLE}
        </Title>
        <Greeting
          user={this.props.email}
          handleClick={this.signout}/>
        <GoalAdder
          text={this.state.text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
        <GoalList
          goals={this.props.goals}
          email={this.props.email}
          handleCompleteClick={(e, key, email) => this.completeGoal(e, key, email)}
          handleDeleteClick={(e, key) => this.deleteGoal(e, key)}
          handleClearAllClick={this.handleClearAll} />
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
    onClearCompletedGoals: (keys) => dispatch(actions.clearCompletedGoals(keys))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals);
