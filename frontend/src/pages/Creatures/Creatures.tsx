import { useState } from 'react'
import DualKnobSlider from '../../components/Creatures/DualKnobSlider'
import useTheme from '../../hooks/useTheme'
import { challengeRatings, creatureTypes, type ChallengeRating, type ChallengeRatingNumeric, type CreatureType } from '../../types/creatures'
import { crToNumber } from '../../utils/creatures'
import styles from './Creatures.module.css'

interface Filters {
	type: CreatureType | 'All'
	challengeRating: {
		min: ChallengeRatingNumeric
		max: ChallengeRatingNumeric
	}
}

export default function Creatures() {
	const { theme } = useTheme()

	const [search, setSearch] = useState('')
	const [filters, setFilters] = useState<Filters>({
		type: 'All',
		challengeRating: {
			min: 0,
			max: 30
		}
	})

	const creatures: {
		id: number
		name: string
		type: CreatureType
		cr: ChallengeRating
	}[] = [
		{ id: 1, name: 'Frostfang Wolf', type: 'Beast', cr: '1/2' },
		{ id: 2, name: 'Ashen Drake', type: 'Dragon', cr: '6' },
		{ id: 3, name: 'Bog Creeper', type: 'Aberration', cr: '2' }
	]

	const filteredCreatures = creatures.filter(c => {
		const matchesSearch
			= c.name.toLowerCase().includes(search.toLowerCase())
				|| c.type.toLowerCase().includes(search.toLowerCase())

		const matchesType = filters.type !== 'All' && c.type === filters.type
		const matchesCR = filters.challengeRating.min <= crToNumber(c.cr) && crToNumber(c.cr) <= filters.challengeRating.max

		return matchesSearch && matchesType && matchesCR
	})

	const creatureTypeOptions = [...creatureTypes, 'All'].map(type => (
		<option key={type} value={type}>
			{type}
		</option>
	))

	const crSteps = challengeRatings.map(cr => ({ value: crToNumber(cr), label: cr }))

	// Create CSS variables dynamically
	const themeVars = {
		'--bg': theme.colors.background,
		'--text': theme.colors.text,
		'--gray-1': theme.colors.gray[1],
		'--gray-2': theme.colors.gray[2],
		'--gray-3': theme.colors.gray[3],
		'--primary': theme.colors.primary[5],
		'--primary-light': theme.colors.primary[3],
		'--card-bg': theme.mode === 'light' ? '#fff' : theme.colors.gray[0]
	} as React.CSSProperties

	return (
		<div className={styles.container} style={themeVars}>
			{/* Sidebar */}
			<aside className={styles.sidebar}>
				<h2 className={styles.filterTitle}>Filters</h2>

				<div className={styles.filterGroup}>
					<label htmlFor='type'>Creature Type</label>
					<select
						id='type'
						className={styles.select}
						value={filters.type}
						onChange={e =>
							setFilters(f => ({ ...f, type: e.target.value as CreatureType | 'All' }))}
					>
						{creatureTypeOptions}
					</select>
				</div>

				<div className={styles.filterGroup}>
					<label
						htmlFor='cr'
						style={{ marginBottom: '0.5rem' }}
					>Challenge Rating
					</label>
					<DualKnobSlider
						steps={crSteps}
						value={[filters.challengeRating.min, filters.challengeRating.max]}
						onChange={vals =>
							setFilters(f => ({
								...f,
								challengeRating: {
									min: vals[0] as ChallengeRatingNumeric,
									max: vals[1] as ChallengeRatingNumeric
								}
							}))}
					/>

				</div>

			</aside>

			{/* Main Content */}
			<main className={styles.main}>
				<div className={styles.header}>
					<h1>Your Creatures</h1>
					<button className={styles.createBtn}>+ Create New Creature</button>
				</div>

				<input
					type='text'
					placeholder='Search creatures...'
					className={styles.searchInput}
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>

				{filteredCreatures.length === 0
					? (
						<p className={styles.noResults}>No creatures match your search.</p>
					)
					: (
						<div className={styles.grid}>
							{filteredCreatures.map(c => (
								<div key={c.id} className={styles.card}>
									<h3>{c.name}</h3>
									<p>Type: {c.type}</p>
									<p>CR: {c.cr}</p>
								</div>
							))}
						</div>
					)}
			</main>
		</div>
	)
}
