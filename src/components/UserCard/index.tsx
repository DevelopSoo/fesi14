// src/components/UserCard/index.tsx

async function getUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store",
  });
  return res.json();
}

export default async function UserCard() {
  const data = await getUser();

  return (
    <div className="w-80 rounded-lg bg-white p-6 shadow">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
          {data.name}
        </div>
        <div>
          <h3 className="font-semibold">{data.name}</h3>
          <p className="text-sm text-gray-500">{data.email}</p>
        </div>
      </div>
    </div>
  );
}
