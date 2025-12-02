import { useRef } from 'react'
import useTheme from '../../hooks/useTheme'
import classes from './DualKnobSlider.module.css'

function getKnobZIndices<T>(steps: Step<T>[], value: [T, T]) {
	const minIndex = steps.findIndex(s => s.value === value[0])
	const maxIndex = steps.findIndex(s => s.value === value[1])

	if (minIndex !== maxIndex)
		return { minZ: 2, maxZ: 2 }

	const isAtAbsoluteRight = maxIndex === steps.length - 1

	return isAtAbsoluteRight
		? { minZ: 2, maxZ: 1 }
		: { minZ: 1, maxZ: 2 }
}

interface Step<T> {
	value: T
	label?: string
}

interface DualKnobSliderProps<T> {
	steps: Step<T>[]
	value: [T, T]
	onChange: (value: [T, T]) => void
}

export default function DualKnobSliderProps<T extends number | string>({
	steps,
	value,
	onChange
}: DualKnobSliderProps<T>) {
	const { theme } = useTheme()
	const trackRef = useRef<HTMLDivElement>(null)
	const activeKnob = useRef<'min' | 'max' | null>(null)
	const { minZ, maxZ } = getKnobZIndices(steps, value)

	const indexOfValue = (val: T) => steps.findIndex(s => s.value === val)
	const percent = (val: T) => {
		const idx = indexOfValue(val)
		if (idx === -1) return 0
		return (idx / (steps.length - 1)) * 100
	}

	function handleStart(e: React.PointerEvent<HTMLDivElement>, knob: 'min' | 'max') {
		activeKnob.current = knob;
		(e.target as HTMLElement).setPointerCapture(e.pointerId)
	}

	function handleMove(e: React.PointerEvent<HTMLDivElement>) {
		if (!activeKnob.current || !trackRef.current) return

		const rect = trackRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const pct = Math.max(0, Math.min(1, x / rect.width))

		const idx = Math.round(pct * (steps.length - 1))
		const newVal = steps[idx].value

		const next = [...value] as [T, T]

		if (activeKnob.current === 'min') {
			if (idx <= indexOfValue(value[1])) next[0] = newVal
		} else {
			if (idx >= indexOfValue(value[0])) next[1] = newVal
		}

		onChange(next)
	}

	function handleEnd(e: React.PointerEvent<HTMLDivElement>) {
		activeKnob.current = null
	}

	const labelFor = (val: T) => steps.find(s => s.value === val)?.label ?? val

	return (
		<div className={classes.container}>
			<div
				ref={trackRef}
				className={classes.track}
				style={{
					'--track-border': theme.colors.gray[4],
					'--track-bg': theme.colors.gray[3]
				} as React.CSSProperties}
				onPointerMove={handleMove}
				onPointerUp={handleEnd}
				onPointerLeave={handleEnd}
				onPointerDown={e => {
					if (!trackRef.current) return
					const rect = trackRef.current.getBoundingClientRect()
					const x = e.clientX - rect.left
					const pct = Math.max(0, Math.min(1, x / rect.width))
					const idx = Math.round(pct * (steps.length - 1))
					const clickedVal = steps[idx].value

					const distMin = Math.abs(idx - indexOfValue(value[0]))
					const distMax = Math.abs(idx - indexOfValue(value[1]))

					if (distMin < distMax) {
						onChange([clickedVal, value[1]])
						activeKnob.current = 'min'
					} else {
						onChange([value[0], clickedVal])
						activeKnob.current = 'max'
					}

					(e.target as HTMLElement).setPointerCapture(e.pointerId)
				}}
			>
				{/* Highlighted range */}
				<div
					className={classes.range}
					style={{
						left: `${percent(value[0])}%`,
						right: `${100 - percent(value[1])}%`,
						backgroundColor: theme.colors.primary[5]
					}}
				/>
				{/* Min knob */}
				<div
					className={classes.knob}
					style={{
						'left': `${percent(value[0])}%`,
						'borderColor': theme.colors.primary[5],
						'backgroundColor': theme.colors.background,
						'zIndex': minZ,
						'--knob-bg': theme.colors.background,
						'--knob-active-ring': theme.mode === 'dark'
							? theme.colors.gray[6]
							: theme.colors.gray[7],
						'--knob-shadow': theme.mode === 'dark'
							? theme.colors.gray[7]
							: theme.colors.gray[6]
					} as React.CSSProperties}
					onPointerDown={e => handleStart(e, 'min')}
				/>
				{/* Max knob */}
				<div
					className={classes.knob}
					style={{
						'left': `${percent(value[1])}%`,
						'borderColor': theme.colors.primary[5],
						'backgroundColor': theme.colors.background,
						'zIndex': maxZ,
						'--knob-bg': theme.colors.background,
						'--knob-active-ring': theme.mode === 'dark'
							? theme.colors.gray[6]
							: theme.colors.gray[7],
						'--knob-shadow': theme.mode === 'dark'
							? theme.colors.gray[7]
							: theme.colors.gray[6]
					} as React.CSSProperties}
					onPointerDown={e => handleStart(e, 'max')}
				/>
			</div>

			{/* Labels */}
			<div className={classes.labels}>
				<span>{labelFor(value[0])}</span>
				<span>{labelFor(value[1])}</span>
			</div>
		</div>
	)
}
