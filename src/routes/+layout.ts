import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      fetch,
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session)
        }

        const cookie = parse(document.cookie)
        return cookie[key]
      },
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  async function getAdmin() {
      const { data } = await supabase.from("admins").select().eq('id', (await supabase.auth.getUser()).data.user?.id);
      return data;
  }

  const admin = await getAdmin()

  async function getStudents() {
    const { data } = await supabase.from("students").select("*").eq('center', (admin?.at(0).center));
    return data;
}

  return { supabase, session, admin, students: await getStudents() }
}