import { howItWorksSteps } from '@/data/how-it-works';

export function HowItWorks() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Nasıl Çalışır</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                {item.step}
              </div>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
