// Fetch Attendance

import { json, error } from '@sveltejs/kit'

export const GET = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()
  if (!session) {
    // the user is not signed in
    throw error(401, { message: 'Unauthorized' })
  }
  const { data } = await supabase.from('attendance').select('hourly').eq("center_admin", `${session?.user.id}`)

  return json({ data })
}