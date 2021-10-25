export default async function (email: string) {
  let data = "Anon";

  const res = await fetch("https://api.kottnet.net/kth/" + email.toLowerCase());
  if (res.ok) {
    const _data: Record<string, string> = await res.json();
    data = _data.name;
  }
  return data;
}
