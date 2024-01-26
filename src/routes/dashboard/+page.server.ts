import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getData() {
        const { data } = await supabase.from("admins").select().eq('id', (await supabase.auth.getUser()).data.user?.id);
        return data;
    }

    return {
        query: await getData(),
    }
};
