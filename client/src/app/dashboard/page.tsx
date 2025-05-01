"use client";


export default function Dashboard() {
  
  return (
    <>
      {/* <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100"> */}

      <h1 className="text-4xl font-bold text-center text-gray-800">
        Dashboard
      </h1>
      <p className="mt-4 text-lg text-center text-gray-600">
        Welcome to your dashboard!
      </p>
      <p className="mt-2 text-lg text-center text-gray-600">
        Here you can manage your account and view your tickets.
      </p>
      {/* {currentUser && (
        <div className="mt-4 p-4 bg-gray-300 rounded shadow-md w-full max-w-md text-center text-gray-600">
          <h2 className="text-2xl font-bold">Current User</h2>
          <p className="mt-2">Email: {currentUser.email}</p>
          <p className="mt-2">ID: {currentUser.id}</p>
        </div>
      )} */}
      {/* </div> */}
    </>
  );
}
