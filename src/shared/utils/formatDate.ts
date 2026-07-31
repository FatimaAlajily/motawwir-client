export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleString("ar", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
