import Header from "@/Components/header";
import HomePage from "@/Components/home";
import { checkIfDbIsEmpty } from "@/Lib/checkDb";
import { getAllUsers } from "@/Lib/allUsers";

export default async function Home() {
  const count = await checkIfDbIsEmpty();
  const users = await getAllUsers();
  console.log(users);
  return (
    <div style={{ width: "100%" }}>
      <Header />
      <HomePage count={count} users={users} />
    </div>
  );
}
