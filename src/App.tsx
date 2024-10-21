import React from "react";
import ExpensesTable from "./components/ExpensesTable";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Expenses</h1>
      <ExpensesTable />
    </div>
  );
};

export default App;
