import { compareNumber, compareEqual } from './compareAttributes.js'

export const HERO_COLUMNS = [
  // Identity
  { key: 'religious', label: 'Religious', group: 'Identity', get: (h) => h.religious,             compare: compareEqual },

  // Stats
  { key: 'hp',        label: 'HP',        group: 'Stats',    get: (h) => h.stats.hp,              compare: compareNumber },
  { key: 'dodge',     label: 'Dodge',     group: 'Stats',    get: (h) => h.stats.dodge,           compare: compareNumber },
  { key: 'speed',     label: 'Speed',     group: 'Stats',    get: (h) => h.stats.speed,           compare: compareNumber },
  { key: 'crit',      label: 'Crit',      group: 'Stats',    get: (h) => h.stats.crit,            compare: compareNumber },
  { key: 'damage',    label: 'Max DMG',   group: 'Stats',    get: (h) => h.stats.damage.max,      compare: compareNumber },

  // Resistances
  { key: 'stun',      label: 'Stun',      group: 'Resist',   get: (h) => h.resistances.stun,      compare: compareNumber },
  { key: 'blight',    label: 'Blight',    group: 'Resist',   get: (h) => h.resistances.blight,    compare: compareNumber },
  { key: 'bleed',     label: 'Bleed',     group: 'Resist',   get: (h) => h.resistances.bleed,     compare: compareNumber },
  { key: 'disease',   label: 'Disease',   group: 'Resist',   get: (h) => h.resistances.disease,   compare: compareNumber },
  { key: 'debuff',    label: 'Debuff',    group: 'Resist',   get: (h) => h.resistances.debuff,    compare: compareNumber },
  { key: 'trap',      label: 'Trap',      group: 'Resist',   get: (h) => h.resistances.trap,      compare: compareNumber },
]