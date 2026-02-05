export function truncate(value: string, length: number = 8) {
  if (!value) return "";
  if (value.length <= length) return value;
  return value.slice(0, length) + "...";
}
