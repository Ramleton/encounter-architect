import { useRef } from 'react'
import classes from './DualKnobSlider.module.css'

function getKnobZIndices<T>(steps: Step<T>[], value: [T, T]) {
	const minIndex = steps.findIndex(s => s.value === value[0])
	const maxIndex = steps.findIndex(s => s.value === value[1])

	// Both knobs not overlapping
	if (minIndex !== maxIndex) return { minZ: 2, maxZ: 2 }

	// Knobs overlap
	const minCanMove = minIndex > 0
	const maxCanMove = maxIndex < steps.length - 1

	if (minCanMove && !maxCanMove) return { minZ: 2, maxZ: 1 }
	if (!minCanMove && maxCanMove) return { minZ: 1, maxZ: 2 }
	// Both can move or both blocked
	return { minZ: 2, maxZ: 2 }
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
		const rawIdx = Math.round(pct * (steps.length - 1))

		const next = [...value] as [T, T]
		const minIdx = steps.findIndex(s => s.value === value[0])
		const maxIdx = steps.findIndex(s => s.value === value[1])

		if (activeKnob.current === 'min') {
		// Min knob can move from first step to current max index
			const clampedIdx = Math.min(Math.max(0, rawIdx), maxIdx)
			next[0] = steps[clampedIdx].value
		} else {
		// Max knob can move from current min index to last step
			const clampedIdx = Math.max(Math.min(steps.length - 1, rawIdx), minIdx)
			next[1] = steps[clampedIdx].value
		}

		// Only trigger change if it actually changed
		if (next[0] !== value[0] || next[1] !== value[1]) {
			onChange(next)
		}
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
				onPointerMove={handleMove}
				onPointerUp={handleEnd}
				onPointerLeave={handleEnd}
				onPointerDown={e => {
					if (!trackRef.current) return
					const rect = trackRef.current.getBoundingClientRect()
					const x = e.clientX - rect.left
					const pct = Math.max(0, Math.min(1, x / rect.width))
					const idx = Math.round(pct * (steps.length - 1))

					const minIdx = indexOfValue(value[0])
					const maxIdx = indexOfValue(value[1])

					let knobToMove: 'min' | 'max' | null = null

					if (minIdx === maxIdx) {
						// Both knobs overlap
						if (idx < minIdx && minIdx > 0) knobToMove = 'min'
						else if (idx > maxIdx && maxIdx < steps.length - 1) knobToMove = 'max'
						// else neither can move
					} else {
						// pick nearest knob but only if it can move
						const distMin = Math.abs(idx - minIdx)
						const distMax = Math.abs(idx - maxIdx)
						if (distMin <= distMax && minIdx < maxIdx) knobToMove = 'min'
						else knobToMove = 'max'
					}

					if (knobToMove) {
						activeKnob.current = knobToMove

						const next = [...value] as [T, T]
						if (knobToMove === 'min') {
							const clampedIdx = Math.min(idx, maxIdx)
							next[0] = steps[clampedIdx].value
						} else {
							const clampedIdx = Math.max(idx, minIdx)
							next[1] = steps[clampedIdx].value
						}

						if (next[0] !== value[0] || next[1] !== value[1]) onChange(next);
						(e.target as HTMLElement).setPointerCapture(e.pointerId)
					}
				}}
			>
				{/* Highlighted range */}
				<div
					className={classes.range}
					style={{
						left: `${percent(value[0])}%`,
						right: `${100 - percent(value[1])}%`,
						backgroundColor: 'var(--primary-5)'
					}}
				/>
				{/* Min knob */}
				<div
					className={classes.knob}
					style={{
						zIndex: minZ,
						left: `${percent(value[0])}%`
					} as React.CSSProperties}
					onPointerDown={e => handleStart(e, 'min')}
				/>
				{/* Max knob */}
				<div
					className={classes.knob}
					style={{
						zIndex: maxZ,
						left: `${percent(value[1])}%`
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
