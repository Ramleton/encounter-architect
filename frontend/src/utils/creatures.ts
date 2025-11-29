import type { ChallengeRating } from '../types/creatures'

// Map CR strings to numeric values for filtering
export const crToNumber = (cr: ChallengeRating) => {
	switch (cr) {
		case '0': return 0
		case '1/8': return 0.125
		case '1/4': return 0.25
		case '1/2': return 0.5
		default: return parseInt(cr, 10)
	}
}

// Optionally, map numbers back to CR strings
export const numberToCR = (num: number): ChallengeRating => {
	if (num === 0) return '0'
	if (num === 0.125) return '1/8'
	if (num === 0.25) return '1/4'
	if (num === 0.5) return '1/2'
	return String(num) as ChallengeRating
}
