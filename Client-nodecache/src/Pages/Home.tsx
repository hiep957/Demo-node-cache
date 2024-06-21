import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const Home = () => {
  const { isLoggedIn, user } = useAppContext();
  // const { user, updateUser } = useAppContext();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:7000/api/user/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Include your token in the 'Authorization' header if needed
        // 'Authorization': `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Update was successful
      console.log(data);
      window.location.reload();
    } else {
      // Handle error
      console.error(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[500px] items-center justify-center bg-slate-200"
    >
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <input type="submit" value="Update" />
    </form>
  );
};

export default Home;
