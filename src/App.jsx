import { Button, ListGroup} from 'react-bootstrap';
import {HashRouter} from 'react-router-dom';
import Modal from 'react-modal';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import close from './Vector.png';

export class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      salary: "",
      modalIsOpen: false,
      calculate: false,
      tax: 0,
      rest: 0,
      count: 0,
      payments: [],
      error: false,
    }
    this.Home = this.Home.bind(this);
    this.Tax = this.Tax.bind(this);
    this.Calculate = this.Calculate.bind(this);
}

Tax(){
  if ((Number(this.state.salary)!==0)&&(!isNaN(Number(this.state.salary)))){
    this.state.error=false;
  //this.setState({tax: Number(this.state.salary)*1.56});
  this.state.tax=Number(this.state.salary)*1.56;
  let credit = 260000;
  let i=0;
  console.log(this.state.tax, Number(this.state.salary));
  while (credit>0){
    credit-=this.state.tax;
    i++;
    //console.log(credit);
  }
  if (credit < 0)  this.state.rest=credit+this.state.tax;
  this.state.count= i;
  //console.log(this.state.rest, i);
}
  else {
    this.state.error=true;
    console.log(this.state.error, "error");
}
}

Calculate(){
  var arr= [];
  console.log(this.state.count);
  for (let i=0; i<this.state.count; i++){
    arr[i]=this.state.tax;
  }
  if (this.state.rest!=0) arr[this.state.count-1]=this.state.rest;
  this.state.payments = arr;
}

Home(){
  const tax="Налоговый вычет";
  const useTax="Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.";
  const salary="Ваша зарплата в месяц";
  const sum="Итого можете внести в качестве досрочных";
  const less="Что уменьшаем?";
  const payment="Платёж";
  const term="Срок";
  const add="Добавить"
  return (
    // <HashRouter basename={process.env.PUBLIC_URL}>
    <div className="App">
      <header className="App-header">
        
        <button className="App-Button" onClick={()=>this.setState({modalIsOpen: !this.state.modalIsOpen})}>       
          {tax}
        </button>
        
        <Modal
        className="App-Modal"
        overlayClassName="Overlay"
        isOpen={this.state.modalIsOpen}
        onRequestClose={()=>this.setState({modalIsOpen: !this.state.modalIsOpen})}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <button onClick={()=>this.setState({modalIsOpen: !this.state.modalIsOpen})} className='App-Close'><img src={close} /></button>
        <h3 className="H3">{tax}</h3>
        <h5 className="H4"> {useTax}</h5>
        
        <div className='App-Salary'>
          {salary}
        </div>
        
        <input className="App-Input" placeholder='Введите данные' autoFocus={false} value={this.state.salary} style={!this.state.error ? {paddingLeft: "8px"} : {border: "1px solid #DC3131", paddingLeft: "8px"}} onChange={(event) => {
        this.setState({salary: event.target.value})
      }}/>
          <button className="App-Calculate" onClick={()=>{this.setState({calculate: true}); console.log(Number(this.state.salary)); this.Tax(); this.Calculate(); this.state.payments.forEach((item)=> console.log(item))}}>Рассчитать</button>
        {
          this.state.calculate&&!this.state.error ? (
          <div>
          <h3 className='App-Sum'>{sum}:</h3>         
          <ListGroup variant="flush" className='App-List'>
            { this.state.payments.map((item, i)=>
            (
              <div >
              <ListGroup.Item  style={{ borderTopColor: "rgba(0, 0, 0, 0)", borderLeftColor: "rgba(0, 0, 0, 0)", borderRightColor: "rgba(0, 0, 0, 0)", padding: "0"}}>
              <div style={{display: "inline-block"}}><Checkbox
              size="small"
              defaultChecked={item == this.state.rest ? false : true}
              sx={{
                color: "#DFE3E6",
                '&.Mui-checked': {
                  color: "red",
                },
              }}
                />{item} рублей<p className="App-Num"> {i+1==2 ? `вo ${i+1}-й год` : `в ${i+1}-й год`}</p></div> </ListGroup.Item>
                </div>))         
                }
            </ListGroup>
            </div>
            ) : (<div></div>)
        }
        <div className='App-Less'>
        <div >{less}</div> 
          <button className="App-Payment">{payment}</button>
          <button className="App-Term"> {term}</button>
        </div>
        <button className="App-Add" onClick={()=>this.setState({modalIsOpen: !this.state.modalIsOpen})}>{add}</button>
      </Modal>
      </header>
    </div>
    // </HashRouter>
  );
}
  render(){
  console.log("render");
  return this.Home();
}
}

