import { getProviders, signIn } from "next-auth/react";

export default function signin({ providers }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {Object.values(providers).map((provider) => (
        <div className="">
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
