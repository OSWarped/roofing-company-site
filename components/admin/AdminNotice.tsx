export function AdminNotice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-amber-400/25 bg-amber-500/10 p-5 text-sm leading-7 text-amber-100">
      <p className="font-semibold text-amber-50">{title}</p>
      <p className="mt-2 text-amber-100/85">{description}</p>
    </div>
  );
}
