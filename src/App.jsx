import { Button, ListGroup} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react';
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
    }
    this.Home = this.Home.bind(this);
}

Tax(){
  if (Number(this.state.salary)!==0){
  //this.setState({tax: Number(this.state.salary)*1.56});
  this.state.tax=Number(this.state.salary)*1.56;
  let credit = 260000;
  let i=0;
  //console.log(this.state.tax, Number(this.state.salary));
  while (credit>0){
    credit-=this.state.tax;
    i++;
    //console.log(credit);
  }
  if (credit < 0)  this.state.rest=credit+this.state.tax;
  this.state.count= i;
  //console.log(this.state.rest, i);
}
  else console.log("error");
}

Calculate(){
  var arr= [];
  console.log(this.state.count);
  for (let i=0; i<this.state.count; i++){
    arr[i]=this.state.tax;
    console.log(arr[i]);
  }
  if (this.state.rest!=0) arr[this.state.count-1]=this.state.rest;
  console.log(arr);
  this.state.payments= arr;
}

Home(){
  return (
    <div className="App">
      <header className="App-header">
        
        <button className="App-Button" onClick={()=>this.setState({modalIsOpen: !this.state.modalIsOpen})}>
        
          Налоговый вычет
        
        </button>
        
        <Modal
        className="App-Modal"
        overlayClassName="Overlay"
        isOpen={this.state.modalIsOpen}
        onRequestClose={()=>this.setState({modalIsOpen: !this.state.modalIsOpen})}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <button onClick={()=>this.setState({modalIsOpen: !this.state.modalIsOpen})} style={{position: "relative", top: "15px", left:"92%", borderColor: "rgba(0, 0, 0, 0)", backgroundColor: 'rgba(0, 0, 0, 0)'}}><img src={close} /></button>
        <h3 className="H3">Налоговый вычет</h3>
        <h5 className="H4"> Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.</h5>
        
        <div style={{position: "relative", left: "32px", right: "0", top: "0px", bottom: "66.67%", fontFamily: "Lab Grotesque",
fontWeight: "500",
fontSize: "14px",
lineHeight: "24px",
color: "#000000",}}>Ваша зарплата в месяц</div>
        
          <input className="App-Input" value={this.state.salary} onChange={(event) => {
        this.setState({salary:event.target.value})
      }}/>
          <button className="App-Calculate" onClick={()=>{this.setState({calculate: true}); console.log(Number(this.state.salary)); this.Tax(); this.Calculate(); this.state.payments.forEach((item)=> console.log(item))}}>Рассчитать</button>
        {
          this.state.calculate ? (

          <div>
          <h3 style={{position: "relative", left: "32px", right: "0", top: "16px", bottom: "66.67%", fontFamily: "Lab Grotesque",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "24px",
          color: "#000000", }}>Итого можете внести в качестве досрочных:</h3>
          
          
          <ListGroup variant="flush" style={{position: "relative", left: "32px", top:"10px", width: "34vmax", fontFamily: "Lab Grotesque",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "24px", padding: "0"}}>
            { this.state.payments.map((item)=>(
              <div>
            <ListGroup.Item style={{padding: "0"}}>
            <Checkbox
  size="small"
  defaultChecked
  sx={{
    color: "red",
    '&.Mui-checked': {
      color: "red",
    },
  }}
/>{item} </ListGroup.Item>
</div>))
          
}
        </ListGroup>
        </div>
          ) : (<div></div>)
        }
        <div style={{position: "relative", width: "112px", height:"24px", left: "32px",  top: "24px", fontFamily: "Lab Grotesque",
fontWeight: "500",
fontSize: "14px",
lineHeight: "24px",
color: "#000000", marginBottom: "2rem"}}>
        <div >Что уменьшаем?</div>
        
          <button className="App-Payment">Платёж</button>
          <button className="App-Term"> Срок</button>
        </div>
        <button className="App-Add">Добавить</button>
      </Modal>
      </header>
    </div>
  );
}
  render(){
    console.log();
  return this.Home();
}
}

