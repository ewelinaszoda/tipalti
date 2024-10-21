import React, { useState, useEffect } from "react";

interface Expense {
  id: number;
  date: string;
  amount: number;
  merchant: string;
  category: string;
}

interface PaginatedExpenses {
  currentPage: number;
  next: { page: number; limit: number };
  totalPages: number;
  transactions: Expense[];
}

const ExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<PaginatedExpenses | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://tip-transactions.vercel.app/api/transactions?page=1"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data: PaginatedExpenses = await response.json();
        console.log(response);
        setExpenses(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  console.log("expenses", expenses?.transactions);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!expenses) return <div>No data available</div>;

  return (
    <table className="expenses-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Merchant</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {expenses.transactions.map((expense: Expense, index: number) => (
          <tr key={expense.id}>
            <td>{index + 1}</td>
            <td>{new Date(expense.date).toLocaleDateString()}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>{expense.merchant}</td>
            <td>{expense.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpensesTable;
