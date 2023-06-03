export default function Description({ description }: { description: string }) {
  return (
    <div className="mt-4">
      <p className="text-reg font-light">{description}</p>
    </div>
  );
}
