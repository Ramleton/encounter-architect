import 'rc-slider/assets/index.css'
import useTheme from '../../hooks/useTheme'
import classes from './DualKnobSlider.module.css'

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

	const indexOfValue = (val: T) => steps.findIndex(s => s.value === val)
	const percent = (val: T) => {
		const idx = indexOfValue(val)
		if (idx === -1) return 0
		return (idx / (steps.length - 1)) * 100
	}

	const labelFor = (val: T) => steps.find(s => s.value === val)?.label ?? val

	return (
		<div className={classes.container}>
			<div
				className={classes.track}
				style={{ backgroundColor: theme.colors.gray[3] }}
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
					style={{ left: `${percent(value[0])}%`, borderColor: theme.colors.primary[5] }}
				/>
				{/* Max knob */}
				<div
					className={classes.knob}
					style={{ left: `${percent(value[1])}%`, borderColor: theme.colors.primary[5] }}
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
