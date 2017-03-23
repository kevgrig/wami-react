import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questions: [
        { text: "I have found a meaningful career", answer: 1 },
        { text: "I view my work as contributing to my personal growth.", answer: 1 },
        { text: "My work really makes no difference to the world.", answer: 1 },
        { text: "I understand how my work contributes to my life's meaning.", answer: 1 },
        { text: "I have a good sense of what makes my job meaningful.", answer: 1 },
        { text: "I know my work makes a positive difference in the world.", answer: 1 },
        { text: "My work helps me better understand myself.", answer: 1 },
        { text: "I have discovered work that has a satisfying purpose.", answer: 1 },
        { text: "My work helps me make sense of the world around me.", answer: 1 },
        { text: "The work I do serves a greater purpose.", answer: 1 },
      ],
      results: {
        positiveMeaning: {
          name: "Positive Meaning",
          text: "The Positive Meaning scale reflects the degree to which people find their work to hold personal meaning, significance, or purpose.",
          result: 0,
          max: 20
        },
        meaningMakingThroughWork: {
          name: "Meaning-Making through Work",
          text: "The Meaning-Making through Work score reflects the fact that work is often a source of broader meaning in life for people, helping them to make sense of their live experience.",
          result: 0,
          max: 15
        },
        greaterGoodMotivations: {
          name: "Greater Good Motivations",
          text: "The Greater Good Motivations score reflects the degree to which people see that their effort at work makes a positive contribution and benefits others or society.",
          result: 0,
          max: 15
        },
        meaningfulWork: {
          name: "Meaningful Work",
          text: "The Meaningful Work score reflects the depth to which people experience their work as meaningful, as something they are personally invested in, and which is a source of flourishing in their lives.",
          result: 0,
          max: 50
        }
      },
    };
    
    this.updateAnswer = this.updateAnswer.bind(this);
  }
  
  updateAnswer(event) {
    var newValue = Number.parseInt(event.target.value, 10);
    
    // Extract the question index from the identifier (created in render)
    var answerIndex = event.target.id.slice(6);
    
    var newState = this.state;
    newState.questions[answerIndex].answer = newValue;
    
    // Calculations from http://www.michaelfsteger.com/wp-content/uploads/2012/08/WAMI.pdf
    // Answers array is 0-indexed so "item 1" from the PDF is index 0 in the questions array
    newState.results.positiveMeaning.result = newState.questions[0].answer + newState.questions[3].answer + newState.questions[4].answer + newState.questions[7].answer;
    newState.results.meaningMakingThroughWork.result = newState.questions[1].answer + newState.questions[6].answer + newState.questions[8].answer;
    newState.results.greaterGoodMotivations.result = 6 - newState.questions[2].answer + newState.questions[5].answer + newState.questions[9].answer;
    newState.results.meaningfulWork.result = newState.results.positiveMeaning.result + newState.results.meaningMakingThroughWork.result + newState.results.greaterGoodMotivations.result;
    
    this.setState(newState);
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>The Work and Meaning Inventory</h2>
        </div>
        <p className="App-intro">
          The Work and Meaning Inventory (WAMI) estimates your feelings of meaning in work. It was created by <a href="http://www.michaelfsteger.com/" target="_blank">Dr. Steger</a>. The original PDF may be found <a href="http://www.michaelfsteger.com/wp-content/uploads/2012/08/WAMI.pdf" target="_blank">here</a> and the research summary may be found <a href="http://www.michaelfsteger.com/wp-content/uploads/2012/08/Steger-Dik-Duffy-JCA-in-press.pdf" target="_blank">here</a>.
        </p>
        <hr />
        <h3>Questions</h3>
        {
          this.state.questions.map((question, index) =>
            <p key={question.text}>
              <label htmlFor={"answer" + index}>{question.text}</label>
              <input id={"answer" + index} type="range" min="1" max="5" step="1" defaultValue="1" onChange={this.updateAnswer} />
              <span>{question.answer}</span>
            </p>
          )
        }
        <div>
          <hr />
          <h3>Results</h3>
          <ul>
            {
              [ "positiveMeaning", "meaningMakingThroughWork", "greaterGoodMotivations", "meaningfulWork" ].map((name) =>
                <li key={name}><span title={this.state.results[name].text}>{this.state.results[name].name}</span>: <b>{this.state.results[name].result}</b> out of {this.state.results[name].max} ({((this.state.results[name].result / this.state.results[name].max) * 100).toFixed(2)}%)</li>
              )
            }
          </ul>
        </div>
        <hr />
        <p><small>Source code at <a href="https://github.com/kevgrig/wami-react" target="_blank">https://github.com/kevgrig/wami-react</a></small></p>
      </div>
    );
  }
}

export default App;
