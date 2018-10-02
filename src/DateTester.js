import React, { Component } from 'react';
import BaseTester from './BaseTester';


const maxDates = [
  31, // jan
  28, // feb
  31, // mar
  30, // apr
  31, // may
  30, // jun
  31, // jul
  31, // aug
  30, // sep
  31, // oct
  30, // nov
  31, // dec
];


const generateNewAnswer = (difficulty) => {
  const month = Math.floor(Math.random() * 12) + 1;
  const date = Math.floor(Math.random() * maxDates[month - 1]) + 1;
  return [
    month,
    date,
  ];
};


const answerToVoiceText = (answer) => {
  return `${answer[0]}월 ${answer[1]}일`;
};


class DateTester extends Component {
  render() {
    return <BaseTester
      title="Dates"
      generateNewAnswer={generateNewAnswer}
      numberOfDifficulties={1}
      answerToVoiceText={answerToVoiceText}
      answerSchema={[{unit: '월'}, {unit: '일'}]}
      rate={0.7}
    />;
  }
}

export default DateTester;
