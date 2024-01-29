import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getNextSession() {
        let { data: sessions, error } = await supabase
        .from('sessions')
        .select('date,students').eq('center_admin', `${session?.user.id}`)

        if(error) {
            console.log(error)
        }
        return sessions
    }

    return {
        nextSession: await getNextSession()
    }
};
