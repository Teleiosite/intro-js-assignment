interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-primary-700">{title}</h1>
      {description ? <p className="text-slate-600">{description}</p> : null}
    </header>
  );
}
