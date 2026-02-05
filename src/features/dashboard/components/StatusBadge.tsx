type StatusBadgeProps = {
  status: "ACTIF" | "INACTIF" | null | undefined;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) {
    return (
      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
        Non défini
      </span>
    );
  }

  const isActive = status === "ACTIF";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold
        ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
      `}
    >
      {status}
    </span>
  );
}
