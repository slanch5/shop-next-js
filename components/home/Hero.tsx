import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div className="">
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          Меблі, з якими дім стає вашим
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Створюємо меблі, які поєднують сучасний дизайн, надійні матеріали та
          щоденний комфорт. Оберіть те, що пасує саме вашому простору, а ми
          доставимо й зберемо все самі.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Наші товари</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}
