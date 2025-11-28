import eslintConfig from '@unchainedsky/eslint-config'
export default {
	...eslintConfig,
	overrides: [
		{
			files: ['src/backend/**/*.ts'],
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-call': 'off'
			}
		}
	]
}
