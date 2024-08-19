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
    "√":'Math.sqrt',
  };

  function calcResult(){
    if(expression.length !== 0){
      try{
        let compute = eval(expression);
        compute = parseFloat(compute.toFixed(4))
        setResult(compute.toString());
      }catch(error){
        console.log(error);
        setResult('An Error Occurred!');
      }
    }else{
      setResult('An Error Occurred!');
    }
  }
  function extractLastNum(exp){
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length -1] : null;
  }
  function factorial(n){
    let result =1;
    for(let i =1; i <=n; i++){
      console.log(result)
      result *= i;
    }
    return result;
  }

  function handleButton(value) {
    if(value === 'AC'){
      setExpression('');
      setDisplayExp('');
      setResult('0');
    } else if(value ==='DEL'){
      setDisplayExp(displayExp.slice(0,-1));
      setExpression(expression.slice(0,-1));
    }else if(sciFunction.hasOwnProperty(value)){
      if(value !== 'π'&& value !== 'e'){

        setDisplayExp(displayExp+value+'(');
        setExpression(expression + sciFunction[value]+'(');
      }else{
        setDisplayExp(displayExp+value);
        setExpression(expression + sciFunction[value]);
      }
    } else if(value ==='!'){
      const lastNum = extractLastNum(expression);
      if(lastNum != null){
        const num = parseFloat(lastNum);
        setDisplayExp(displayExp + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if(value ==='='){
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
