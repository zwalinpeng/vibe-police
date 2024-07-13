import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  // redirect to login is not logged in
  if (!session) {
    redirect("/login");
  }

  // if logged in
  return (
    <>
      <p>Welcome {session.user?.name}</p>
    </>
  );
}
