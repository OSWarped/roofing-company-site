type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}