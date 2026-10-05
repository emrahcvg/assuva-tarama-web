import { PRICING } from '../config/site';

/** Mecidiyeköy çıkışlı karayolu km'sine göre tarama ücreti (TL). km=0 → İstanbul içi. */
export function fiyatHesapla(km: number, p = PRICING): number {
  if (km <= 0) return p.BASE;
  const ham = p.BASE + km * p.PER_KM;
  return Math.min(p.CAP, Math.round(ham / p.ROUND_TO) * p.ROUND_TO);
}

export const tl = (n: number) =>
  new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(n) + ' TL';
