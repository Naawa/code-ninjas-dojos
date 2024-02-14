// Fetch Students

import { json, error } from '@sveltejs/kit'

export const GET = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()
  if (!session) {
    throw error(401, { message: 'Unauthorized' })
  }
  let { data } = await supabase.from("admins").select("*").eq('center_admin', `${session?.user.id}`).maybeSingle();

    if(error) {
        console.log(error);
    }

  return json({ data })
}