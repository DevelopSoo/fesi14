// src/components/SnapshotButton/index.tsx

export default function SnapshotButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return <button className="bg-yellow-500">{children}</button>;
}
