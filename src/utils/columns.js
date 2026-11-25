import { compareNumber, compareEqual, compareSets } from './compareAttributes.js'

const LABELS = { 'stress-heal': 'Stress heal', stress: 'Causes stress' }
const label = (value) => LABELS[value] ?? value.charAt(0).toUpperCase() + value.slice(1)
const formatList = (values) => values.map(label)
const formatRanks = (ranks) =>
  ranks.length > 1 ? `${ranks[0]}–${ranks[ranks.length - 1]}` : String(ranks[0])

export const HERO_COLUMNS = [
  // Identity
  { key: 'gender',    label: 'Gender',        group: 'Identity', get: (h) => h.gender,           compare: compareEqual,  format: label },
  { key: 'religious', label: 'Religious',     group: 'Identity', get: (h) => h.religious,        compare: compareEqual,  format: (v) => (v ? 'Yes' : 'No') },

  // Skills
  { key: 'ranks',     label: 'Ranks',         group: 'Skills',   get: (h) => h.ranks,            compare: compareSets,   format: formatRanks },
  
  // Effects
  { key: 'team',      label: 'Team effects',  group: 'Effects',   get: (h) => h.teamEffects,      compare: compareSets,   format: formatList },
  { key: 'enemy',     label: 'Enemy effects', group: 'Effects',   get: (h) => h.enemyEffects,     compare: compareSets,   format: formatList },

  // Stats
  { key: 'hp',        label: 'HP',            group: 'Stats',    get: (h) => h.stats.hp,         compare: compareNumber },
  { key: 'speed',     label: 'Speed',         group: 'Stats',    get: (h) => h.stats.speed,      compare: compareNumber },
  { key: 'damage',    label: 'Damage',        group: 'Stats',    get: (h) => h.stats.damage.max, compare: compareNumber},
]