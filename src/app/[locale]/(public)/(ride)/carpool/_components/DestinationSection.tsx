import DestinationOption from "./DestinationOption";

type DestinationSectionProps = {};

export default function DestinationSection({}: DestinationSectionProps) {
  return (
    <section className="py-8 bg-primary">
      <div className="page-wrapper flex flex-col gap-5">
        <h2 className="text-xl text-white font-bold">Where are you going?</h2>
        <div className="flex flex-wrap gap-3">
          <DestinationOption from="Tbilisi" to="Gori" href="" />
          <DestinationOption from="Kutaisi" to="Rustavi" href="" />
          <DestinationOption from="Batumi" to="Tbilisi" href="" />
        </div>
      </div>
    </section>
  );
}
