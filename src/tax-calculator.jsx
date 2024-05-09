import "./App.css";
import { useState, useEffect } from "react";

function Tax() {
  let [wages, setWages] = useState(40000);
  let [calWages, setCalWages] = useState({});

  useEffect(() => {
    setCalWages({
      Yearly: wages,
      Monthly: (wages / 12).toFixed(2),
      Weekly: (wages / 52).toFixed(2),
      Daily: (wages / 260).toFixed(2),
      TaxableYearly: (wages - (2.88 * wages) / 100).toFixed(2),
      // TaxableMonthly : ,
      // TaxableWeekly : ,
      // TaxableDaily : ,
    });
  }, [wages]);

  return (
    <div className="App">
      <div class="m-3">
        <label>Gross Salary (Wages, Salaries):</label>
        $
        <input
          type="number"
          value={wages}
          onChange={(e) => {
            setWages(e.target.value);
          }}
        />
      </div>
      <div class="m-3">
        <h2>Calculation Results:</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Yearly</th>
              <th scope="col">Monthly</th>
              <th scope="col">Weekly</th>
              <th scope="col">Daily</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Gross Income</th>
              <td>${calWages.Yearly}</td>
              <td>${calWages.Monthly}</td>
              <td>${calWages.Weekly}</td>
              <td>${calWages.Daily}</td>
            </tr>
            <tr>
              <th scope="row">Taxable Income</th>
              <td>{calWages.TaxableYearly}</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">Federal Tax</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tax;
