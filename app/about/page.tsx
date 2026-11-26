export default function AboutPage() {
  return (
    <section>
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        Ми любимо
        <span className="bg-primary py-2 px-4 rounded-lg tracking-widest text-white">
          меблі
        </span>
      </h1>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        Ми почали з невеликої майстерні та простої ідеї: робити меблі, якими
        хочеться користуватися щодня. Сьогодні наша команда допомагає тисячам
        родин облаштовувати дім, а підхід лишився тим самим: якісні матеріали,
        увага до деталей і чесне ставлення до кожного клієнта.
      </p>
    </section>
  );
}
