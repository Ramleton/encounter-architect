export const creatureTypes = [
	'Aberration',
	'Beast',
	'Celestial',
	'Construct',
	'Dragon',
	'Elemental',
	'Fey',
	'Fiend',
	'Giant',
	'Humanoid',
	'Monstrosity',
	'Ooze',
	'Plant',
	'Undead'
] as const

export type CreatureType = typeof creatureTypes[number]

export const creatureSizes = [
	'Tiny',
	'Small',
	'Medium',
	'Large',
	'Huge',
	'Gargantuan'
] as const

export type CreatureSize = typeof creatureSizes[number]

export const damageTypes = [
	'Acid',
	'Bludgeoning',
	'Cold',
	'Fire',
	'Force',
	'Lightning',
	'Necrotic',
	'Piercing',
	'Poison',
	'Psychic',
	'Radiant',
	'Slashing',
	'Thunder'
] as const

export type DamageType = typeof damageTypes[number]

export const creatureStats = [
	'Strength',
	'Dexterity',
	'Constitution',
	'Intelligence',
	'Wisdom',
	'Charisma'
] as const

export type CreatureStat = typeof creatureStats[number]

export const creatureSkills = [
	'Acrobatics',
	'Animal Handling',
	'Arcana',
	'Athletics',
	'Deception',
	'History',
	'Insight',
	'Intimidation',
	'Investigation',
	'Medicine',
	'Nature',
	'Perception',
	'Performance',
	'Persuasion',
	'Religion',
	'Sleight of Hand',
	'Stealth',
	'Survival'
] as const

export type CreatureSkill = typeof creatureSkills[number]

export const challengeRatings = [
	'0',
	'1/8',
	'1/4',
	'1/2',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'20',
	'21',
	'22',
	'23',
	'24',
	'25',
	'26',
	'27',
	'28',
	'29',
	'30'
] as const

export type ChallengeRating = typeof challengeRatings[number]
