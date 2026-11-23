import heroes from './data/heroes.json'
import { HERO_COLUMNS } from './utils/columns.js'

export const MODES = {
  hero: {
    title: 'Know Yourself',
    subtitle: 'Level 1 stats',
    placeholder: 'Name a hero…',
    candidates: heroes,
    columns: HERO_COLUMNS,
  },
}