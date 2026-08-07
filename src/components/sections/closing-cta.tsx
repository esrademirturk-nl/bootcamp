import { Button } from '@/components/ui/button';

export function ClosingCTA() {
  return (
    <section className="bg-primary py-16 text-center text-white">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="mb-4 text-3xl font-bold">Kariyerine Bugün Yön Ver</h2>
        <p className="mb-6 text-white/90">
          Binlerce mezunun katıldığı yolculuğa sen de katıl, geleceğini şekillendir.
        </p>
        <Button className="bg-white text-primary hover:bg-white/90">Hemen Başvur</Button>
      </div>
    </section>
  );
}
