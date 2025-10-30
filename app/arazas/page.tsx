import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

const PLANS = [
  {
    name: 'Free',
    desc: 'Alap funkciók díjmentesen',
    price: '0 Ft/hó',
    icon: 'User',
    features: [
      'Korlátlan bérlő',
      'Dokumentum feltöltés',
      'Alap figyelmeztetések',
    ],
    primary: true,
    btn: 'Kipróbálom',
  },
  {
    name: 'Pro',
    desc: 'Fejlettebb automatizáció',
    price: '3490 Ft/hó',
    icon: 'TrendingUp',
    features: [
      'Automatikus díjbekérő',
      'Digitális szerződés',
      'Naptár szinkron',
    ],
    badge: 'Legnépszerűbb',
    btn: 'Kipróbálom',
  },
  {
    name: 'Pro+Használat',
    desc: 'Teljes körű menedzsment',
    price: 'Egyedi árazás',
    icon: 'Crown',
    features: [
      'Folyamat-tanácsadás',
      'Személyre szabott onboarding',
      'Egyedi funkciók',
    ],
    badge: 'Kiemelt',
    btn: 'Kapcsolatfelvétel',
  },
];

export default function ArazasPage() {
  return (
    <div className="container section">
      <h1 className="text-3xl sm:text-4xl font-bold text-brand mb-2">Árazás</h1>
      <div className="text-muted mb-8 text-lg">Válassz csomagot igényeid szerint. Bármikor válthatsz.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PLANS.map(({ name, desc, price, icon, features, badge, btn }, i) => (
          <Card key={name} className={
              `flex flex-col gap-5 items-center p-7 ${badge === 'Legnépszerűbb' ? 'border-2 border-accent shadow-xl' : ''}`
            }>
            <div className="flex flex-col items-center gap-2 w-full mb-2">
              <Icon name={icon as any} size={36} />
              <div className="font-bold text-xl text-brand mt-2">{name}</div>
              {badge && <Badge color={badge === 'Legnépszerűbb' ? 'accent' : 'primary'}>{badge}</Badge>}
              <div className="text-base text-muted text-center w-full">{desc}</div>
            </div>
            <div className="text-3xl font-extrabold text-brand mb-1">{price}</div>
            <ul className="flex-1 flex flex-col gap-2 w-full mb-4 mt-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-text">
                  <Icon name="Check" size={18} color="var(--color-accent)" />
                  {f}
                </li>
              ))}
            </ul>
            <Button as="a" href="/regisztracio" variant={badge === 'Legnépszerűbb' ? 'accent' : 'primary'} size="md" className="w-full uppercase tracking-wide">
              {btn}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
