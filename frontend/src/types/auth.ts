export type User = {
	id: string
	username: string
	email: string
}

type Identity = {
	created_at: string
	email: string
	id: string
	identity_data: {
		display_name: string
		email: string
		email_verified: boolean
		phone_verified: boolean
		sub: string
	}
	identity_id: string
	last_sign_in_at: string
	provider: string
	updated_at: string
	user_id: string
}

export interface LoginResponse {
	session: {
		access_token: string
		refresh_token: string
		expires_at: number
		expires_in: number
		token_type: string
	}
	user: {
		app_metadata: {
			provider: string
			providers: string[]
		}
		aud: 'authenticated' | 'unauthenticated'
		confirmation_sent_at: string
		confirmed_at: string
		created_at: string
		email: string
		email_confirmed_at: string
		id: string
		identities: Identity[]
		is_anonymous: boolean
		last_sign_in_at: string
		phone: string
		role: string
		updated_at: string
		user_metadata: {
			display_name: string
			email: string
			email_verified: boolean
			phone_verified: boolean
			sub: string
		}
	}
}
