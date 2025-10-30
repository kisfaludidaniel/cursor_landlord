import Card from '../../components/Card';
import Icon from '../../components/Icon';
import Badge from '../../components/Badge';

const FEATURES = [
  {
    title: 'Intelligens bérlőkezelés',
    desc: 'Egyszerű kezelés, automatikus figyelmeztetések, minden fontos adat egy helyen.',
    icon: 'UserCheck',
  },
  {
    title: 'Digitális szerződések',
    desc: 'Gyors szerződéskészítés és archiválás. Jogszabálykövető, sablonos megoldások.',
    icon: 'FileText',
  },
  {
    title: 'Automatikus díjbekérő',
    desc: 'Automatikusan generált, időzíthető díjbekérők és emlékeztetők.',
    icon: 'CreditCard',
    badge: true,
  },
  {
    title: 'Naptár-integráció',
    desc: 'Google és Outlook naptár támogatás; fontos események automatikus szinkronizációval.',
    icon: 'Calendar',
  },
  {
    title: 'Dokumentum tárolás',
    desc: 'Bérlői dokumentumok biztonságos, átlátható kezelése és rendszerezése.',
    icon: 'Folder',
  },
  {
    title: 'Kiadási elemzés',
    desc: 'Valós idejű kimutatások, bevétel-kiadás analitika, átlátható grafikonok.',
    icon: 'PieChart',
  },
];

export default function FunkciokPage() {
  return (
    <div className="container section">
      <h1 className="text-3xl sm:text-4xl font-bold text-brand mb-2">Főbb funkciók</h1>
      <div className="text-muted mb-8 text-lg">Minden, amire egy modern bérbeadónak szüksége van.</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(({ title, desc, icon, badge }) => (
          <Card key={title} className="flex flex-col gap-4 items-start h-full">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={icon as any} size={32} />
              {badge && <Badge color="accent">Új</Badge>}
            </div>
            <div className="font-bold text-lg text-brand mb-1">{title}</div>
            <div className="text-text/90 text-base">{desc}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
