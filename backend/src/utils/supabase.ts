import { createClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const supabase = createClient(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_SECRET_KEY as string
)

export default supabase
