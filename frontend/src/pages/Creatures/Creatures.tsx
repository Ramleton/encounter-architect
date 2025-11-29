import { useState } from 'react'
import useTheme from '../../hooks/useTheme'
import { challengeRatings, creatureTypes, type ChallengeRating, type CreatureType } from '../../types/creatures'
import styles from './Creatures.module.css'

interface Filters {
	type: CreatureType | 'All'
	challengeRating: ChallengeRating | 'All'
}

export default function Creatures() {
	const { theme } = useTheme()

	const [search, setSearch] = useState('')
	const [filters, setFilters] = useState<Filters>({
		type: 'All',
		challengeRating: 'All'
	})

	const creatures = [
		{ id: 1, name: 'Frostfang Wolf', type: 'Beast', cr: '1/2' },
		{ id: 2, name: 'Ashen Drake', type: 'Dragon', cr: '6' },
		{ id: 3, name: 'Bog Creeper', type: 'Aberration', cr: '2' }
	]

	const filteredCreatures = creatures.filter(c => {
		const matchesSearch
			= c.name.toLowerCase().includes(search.toLowerCase())
				|| c.type.toLowerCase().includes(search.toLowerCase())

		const matchesType = filters.type !== 'All' && c.type === filters.type
		const matchesCR = filters.challengeRating !== 'All' && c.cr === filters.challengeRating

		return matchesSearch && matchesType && matchesCR
	})

	const creatureTypeOptions = [...creatureTypes, 'All'].map(type => (
		<option key={type} value={type}>
			{type}
		</option>
	))

	const creatureCROptions = [...challengeRatings, 'All'].map(cr => (
		<option key={cr} value={cr}>
			{cr}
		</option>
	))

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
				<h2>Filters</h2>

				<div className={styles.filterGroup}>
					<label htmlFor='type'>Creature Type</label>
					<select
						id='type'
						value={filters.type}
						onChange={e => setFilters(f => ({ ...f, type: e.target.value as CreatureType | 'All' }))}
					>
						{creatureTypeOptions}
					</select>
				</div>

				<div className={styles.filterGroup}>
					<label htmlFor='cr'>Challenge Rating</label>
					<select
						id='cr'
						value={filters.challengeRating}
						onChange={e =>
							setFilters(f => ({ ...f, challenge: e.target.value }))}
					>
						{creatureCROptions}
					</select>
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
