export const formatDate = (value: string) => {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (value: number) => {
  return value != null ? `$${Number(value).toFixed(2)}` : "";
};