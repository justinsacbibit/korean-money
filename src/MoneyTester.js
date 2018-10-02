import React, { Component } from 'react';
import BaseTester from './BaseTester';


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


const answerToVoiceText = (answer) => {
  return `${answer}원`;
};


class MoneyTester extends Component {
  render() {
    return <BaseTester
      title="Money"
      generateNewAnswer={(difficulty) => [generateNewAnswer(difficulty)]}
      numberOfDifficulties={3}
      answerToVoiceText={answerToVoiceText}
      answerSchema={[{unit: '원'}]}
    />;
  }
}

export default MoneyTester;
