type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{title}</h2>
      {description ? <p className="mt-3 text-base text-zinc-600">{description}</p> : null}
    </div>
  );
}