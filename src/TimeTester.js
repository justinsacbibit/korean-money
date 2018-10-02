import React, { Component } from 'react';
import BaseTester from './BaseTester';


const generateNewAnswer = (difficulty) => {
  const hour = Math.floor(Math.random() * 12) + 1;
  const minutes = difficulty === 0 ? 0 : Math.floor(Math.random() * 60);
  return [
    hour,
    minutes,
  ];
};


const answerToVoiceText = (answer) => {
  return answer[1] === 0 ? `${answer[0]}시` : `${answer[0]}시 ${answer[1]}분`;
};


class TimeTester extends Component {
  render() {
    return <BaseTester
      title="Time"
      generateNewAnswer={generateNewAnswer}
      numberOfDifficulties={2}
      answerToVoiceText={answerToVoiceText}
      answerSchema={[{unit: '시'}, {unit: '분'}]}
    />;
  }
}

export default TimeTester;
