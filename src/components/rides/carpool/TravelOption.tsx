type TravelOptionProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function TravelOption({
  description,
  icon,
  title,
}: TravelOptionProps) {
  const Icon = icon;
  return (
    <li className="flex flex-col gap-1">
      <div className="mb-1">
        <Icon className="text-black text-5xl" />
      </div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-gray-600">{description}</p>
    </li>
  );
}
