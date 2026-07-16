import { Separator } from "@/components/ui/separator";
export default function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-8">
        {title}
      </h2>
      <Separator />
    </div>
  );
}
