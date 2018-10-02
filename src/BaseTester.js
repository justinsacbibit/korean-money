import React, { Component } from 'react';
import logo from './logo.svg';


class BaseTester extends Component {
  constructor(props) {
    super(props);
    const msg = new SpeechSynthesisUtterance();
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = props.rate || 0.8; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.lang = 'ko-KR';
    this.msg = msg;
    const difficulty = 1;
    const answer = props.generateNewAnswer(difficulty);
    this.state = {
      difficulty,
      answer,
      showAnswer: false,
      values: [...Array(this.props.answerSchema.length)].map((x, i) => ''),
      result: null,
      correctAnswers: 0,
      wrongAnswers: 0,
    };
    this.playAudio = this.playAudio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNewAnswer = this.setNewAnswer.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
    this.playAudio();
  }
  setDifficulty(difficulty) {
    this.setState({
      difficulty,
    }, this.setNewAnswer);
  }
  setNewAnswer() {
    const answer = this.props.generateNewAnswer(this.state.difficulty);
    this.setState({
      answer,
      showAnswer: false,
      result: null,
      values: [...Array(this.props.answerSchema.length)].map((x, i) => ''),
    }, this.playAudio);
  }
  showAnswer() {
    this.setState({
      showAnswer: !this.state.showAnswer,
    })
  }
  playAudio() {
    this.msg.text = this.props.answerToVoiceText(this.state.answer);
    speechSynthesis.speak(this.msg);
  }
  handleChange(i, event) {
    const arr = [...this.state.values];
    arr[i] = event.target.value;
    this.setState({values: arr});
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.result !== null) {
      this.setNewAnswer();
    } else {
      let correct = true;
      for (let i = 0; i < this.state.values.length; i++) {
        if (Number(this.state.values[i]) !== this.state.answer[i]) {
          correct = false;
          break;
        }
      }
      this.setState({
        result: correct,
        showAnswer: true,
        correctAnswers: correct ? this.state.correctAnswers + 1 : this.state.correctAnswers,
        wrongAnswers: !correct ? this.state.wrongAnswers + 1 : this.state.wrongAnswers,
      });
    }
  }
  difficultyText(difficulty) {
    switch (difficulty) {
      case 0:
        return 'Easy';
      case 1:
        return 'Medium';
      default:
        return 'Medium Hard';
    }
  }
  correctPercentage() {
    if (this.state.correctAnswers + this.state.wrongAnswers === 0) {
      return `100%`;
    }
    return `${Math.round(this.state.correctAnswers / (this.state.correctAnswers + this.state.wrongAnswers) * 10000)/ 100}%`;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Korean {this.props.title}</h1>
        </header>
        {/*<p className="App-intro">*/}
        {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<button onClick={this.setNewAnswer}>New number</button>*/}
        <p>
          {this.state.correctAnswers}/{this.state.wrongAnswers + this.state.correctAnswers} ({this.correctPercentage()})
        </p>
        <p>
          Difficulty: {this.difficultyText(this.state.difficulty)}
        </p>
        {[...Array(this.props.numberOfDifficulties)].map((x, i) =>
          <button onClick={() => this.setDifficulty(i)}>{this.difficultyText(i)}</button>
        )}
        <br />
        <button onClick={this.playAudio}>Play audio</button>
        <button onClick={this.showAnswer}>Show answer</button>
        {this.state.showAnswer ? <p>
          {this.props.answerSchema.map((singleAnswerSchema, i) => this.state.answer[i] === 0 ? null : [
            this.state.answer[i],
            singleAnswerSchema.unit,
          ])}
        </p> : null}
        {this.state.result === true ? <p>Correct</p> : this.state.result === false ? <p>Wrong</p> : null}
        <form onSubmit={this.handleSubmit}>
          <label>
            Answer
            {this.props.answerSchema.map((singleAnswerSchema, i) => [
                <input type="text" value={this.state.values[i]} onChange={this.handleChange.bind(this, i)} />,
                singleAnswerSchema.unit,
            ])}
          </label>
          <input type="submit" value={this.state.result === null ? "Submit" : "New number"} />
        </form>
      </div>
    );
  }
}

export default BaseTester;
