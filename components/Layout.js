import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg shadow-md">Login with Google</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-500 text-white min-h-screen ">
      <div className="flex">
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
