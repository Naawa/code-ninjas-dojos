import { redirect } from "@sveltejs/kit";

export const load = async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getProfile(name: string) {
        let { data: profile, error } = await supabase
        .from('students')
        .select("*").eq('name', name).maybeSingle();

        if(profile) {
            return profile;
        }
        throw error
	}

	return {
		profile: await getProfile(params.name)
	};
};

