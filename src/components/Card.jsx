export function Card({ data, clicked }) {
  const regex = /\b(3D|by|Emoji|Sticker)\b/g;
  return (
    <div
      className="card flex flex-col space-y-4 max-w-80  ring-4 ring-green-400 text-center rounded bg-purple-400"
      onClick={clicked}
    >
      <img src={data.url} alt={data.title} />
      <p className="text-xl my-1">{data.title.replace(regex, "")}</p>
    </div>
  );
}
