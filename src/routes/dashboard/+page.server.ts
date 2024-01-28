import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getAdmin() {
        let { data: admin, error } = await supabase.from("admins").select("*").eq('id', `${session?.user.id}`).maybeSingle();

        if(error) {
            console.log(error);
        }

        return admin;
    }

    return {
        admin: await getAdmin()
    }
};
