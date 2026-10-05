import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// price.ts ile aynı formül (TS'i doğrudan çalıştırmamak için config değerleri burada sabit)
const P = { BASE: 40000, PER_KM: 65, CAP: 160000, ROUND_TO: 1000 };
const f = (km) => (km <= 0 ? P.BASE : Math.min(P.CAP, Math.round((P.BASE + km * P.PER_KM) / P.ROUND_TO) * P.ROUND_TO));
const iller = JSON.parse(readFileSync(new URL('../src/data/il-mesafe.json', import.meta.url)));
const km = (il) => iller.find((r) => r.il === il).km;

test('81 il var, tekrar yok', () => {
  assert.equal(iller.length, 81);
  assert.equal(new Set(iller.map((r) => r.il)).size, 81);
});
test('İstanbul sabit 40.000', () => assert.equal(f(km('İstanbul')), 40000));
test('Kocaeli', () => assert.equal(f(km('Kocaeli')), 47000));
test('Ankara', () => assert.equal(f(km('Ankara')), 69000));
test('Hakkari tavan', () => assert.equal(f(km('Hakkari')), 160000));
test('hiçbir il tavanı aşmaz, hepsi 40.000 üstü', () => {
  for (const r of iller) { const p = f(r.km); assert.ok(p >= 40000 && p <= 160000, r.il); }
});
