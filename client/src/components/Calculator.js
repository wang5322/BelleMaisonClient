import React, { useState } from "react";
import FormInputGroup from "./CalculatorInputGroup";
function Calculator() {
 
    const [homeValue, setHomeValue] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanDuration, setLoanDuration] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState(0);
  
    function calculateLoanAmount() {
      setLoanAmount(homeValue - downPayment);
      return loanAmount;
    }
  
    function calculateMonthlyPayment() {
      // Percentage conversion
      function percentageToDecimal(percent) {
        return percent / 12 / 100;
      }
  
      // years to month conversion
      function yearsToMonths(year) {
        return year * 12;
      }
  
      setMonthlyPayment(
        (percentageToDecimal(interestRate) * loanAmount) /
          (1 -
            Math.pow(
              1 + percentageToDecimal(interestRate),
              -yearsToMonths(loanDuration)
            ))
      );
  
      return monthlyPayment;
    }
  
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <FormInputGroup
          text="Price of property  $"
     
          placeholder={"Enter the value of the home"}
          value={homeValue}
          onInput={(e) => setHomeValue(e.target.value)}
          onkeyup={calculateLoanAmount}
        />
        <FormInputGroup
          text="Down payment $"
      
          placeholder={"Enter your funds"}
          value={downPayment}
          onInput={(e) => setDownPayment(e.target.value)}
          onkeyup={calculateLoanAmount}
        />
        <FormInputGroup
          text="Mortgage amount $"

          placeholder={"Enter your funds"}
          readOnly={true}
          value={loanAmount}
        />
        <FormInputGroup
          text="Interest Rate %"
          placeholder={"Enter your interest rate"}
          value={interestRate}
          onInput={(e) => setInterestRate(e.target.value)}
        />
        <FormInputGroup
          text="Amortization years"
          placeholder={"Enter the duration of your loan in years"}
          value={loanDuration}
          onInput={(e) => setLoanDuration(e.target.value)}
        />
        <h4 className="alert alert-info fw-bold">
          Monthly payment $: 
          {parseFloat(monthlyPayment.toFixed(2))}
        </h4>
  
        <button
          type="submit"
          onClick={calculateMonthlyPayment}
          className="btn btn-secondary btn-lg w-100 center "
        >
          Calculate
        </button>
      </form>
    );
  }
  
  export default Calculator;
