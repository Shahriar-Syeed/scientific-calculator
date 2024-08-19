import { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";


export const Calculator = () => {
  const [expression, setExpression]=useState("");
  const [displayExp, setDisplayExp]= useState("");
  const [result, setResult]= useState("0");

  const sciFunction = {
    sin:'Math.sin',
    cos:'Math.cos',
    tan:'Math.tan',
    ln:'Math.log',
    log:'Math.log10',
    π:'Math.PI',
    e:'Math.E',
    "^":'**',
  };

  function calcResult(){
    if(expression.length !== 0){
      try{
        let compute = eval(expression);
        setResult(compute.toString());
      }catch(error){
        console.log(error);
        setResult('An Error Occurred!');
      }
    }else{
      setResult('An Error Occurred!');

    }

  }

  function handleButton(value) {
    if(value === 'AC'){
      setExpression('');
      setDisplayExp('');
      setResult('0');
    } else if(value ==='DEL'){
      setDisplayExp(displayExp.slice(0,-1));
      setExpression(expression.slice(0,-1));
    }else if(value ==='='){
      calcResult();
    } else{
      setExpression(expression+ value);
      setDisplayExp(displayExp+ value);
    }
  }

  return (
    <div className="calculator">
      <DisplayWindow expression={displayExp} result={result}/>
      <KeysWindow handleButton={handleButton}/>
    </div>
  );
}
