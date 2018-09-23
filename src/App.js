import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const generateNewAnswer = (difficulty) => {
  if (difficulty === 0) {
    const multiple = Math.floor(Math.random() * 2);
    if (multiple === 0) {
      return Math.floor((Math.floor(Math.random() * 9) + 1) * 100);
    } else {
      return Math.floor((Math.floor(Math.random() * 9) + 1) * 1000);
    }
  } else if (difficulty === 1) {
    const multiple = Math.floor(Math.random() * 25);
    if (multiple < 20) {
      return Math.floor((Math.floor(Math.random() * 99) + 1) * 100);
    } else {
      return Math.floor((Math.floor(Math.random() * 15) + 10) * 1000);
    }
  } else {
    return Math.floor((Math.floor(Math.random() * 249) + 1) * 100);
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    const msg = new SpeechSynthesisUtterance();
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.lang = 'ko-KR';
    this.msg = msg;
    const difficulty = 1;
    const answer = generateNewAnswer(difficulty);
    this.state = {
      difficulty,
      answer,
      showAnswer: false,
      value: '',
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
    const answer = generateNewAnswer(this.state.difficulty);
    this.setState({
      answer,
      showAnswer: false,
      result: null,
      value: '',
    }, this.playAudio);
  }
  showAnswer() {
    this.setState({
      showAnswer: !this.state.showAnswer,
    })
  }
  playAudio() {
    this.msg.text = `${this.state.answer}원`;
    speechSynthesis.speak(this.msg);
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.result !== null) {
      this.setNewAnswer();
    } else {
      const correct = Number(this.state.value) === this.state.answer;
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
          <h1 className="App-title">Korean Money</h1>
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
        <button onClick={() => this.setDifficulty(0)}>{this.difficultyText(0)}</button>
        <button onClick={() => this.setDifficulty(1)}>{this.difficultyText(1)}</button>
        <button onClick={() => this.setDifficulty(2)}>{this.difficultyText(2)}</button>
        <br />
        <button onClick={this.playAudio}>Play audio</button>
        <button onClick={this.showAnswer}>Show answer</button>
        {this.state.showAnswer ? <p>{this.state.answer}</p> : null}
        {this.state.result === true ? <p>Correct</p> : this.state.result === false ? <p>Wrong</p> : null}
        <form onSubmit={this.handleSubmit}>
          <label>
            Answer
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            원
          </label>
          <input type="submit" value={this.state.result === null ? "Submit" : "New number"} />
        </form>
      </div>
    );
  }
}

export default App;
