import reactLogo from "./assets/react.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Extend Window type to include dataLayer
 */
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function App() {
  const [depositCount, setDepositCount] = useState<number>(0);

  const [user, setUser] = useState<{ user_id: string | null }>({
    user_id: null,
  });

  const depositFunds = () => {
    setDepositCount((prev) => prev + 1);
  };

  const registerUser = () => {
    setUser({ user_id: uuidv4() });
  };

  useEffect(() => {
    if (depositCount !== 0 && window.dataLayer) {
      window.dataLayer.push({
        event: "purchase",
        transaction_id: uuidv4(),
        value: 5,
        currency: "GBP",
        is_ftd: String(depositCount === 1),
      });
    }
  }, [depositCount]);

  useEffect(() => {
    if (user.user_id && window.dataLayer) {
      window.dataLayer.push({
        event: "signup",
        user_id: user.user_id,
      });
    }
  }, [user.user_id]);

  return (
    <>
      <div>
        <a href="#">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Brand X</h1>

      <div className="card">
        <button onClick={registerUser}>Registration</button>
        <p>User ID: {user.user_id ?? "Not registered"}</p>
      </div>

      <div className="card">
        <button onClick={depositFunds}>Deposit £5</button>
        <p>Deposit Count: {depositCount}</p>
      </div>

      <p className="read-the-docs">Testing</p>
    </>
  );
}

export default App;
