import { redirect } from "@sveltejs/kit";

export const load = async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getProfile(nickname: string) {
        let { data: profile, error } = await supabase
        .from('students')
        .select("*").eq('nickname', nickname).maybeSingle();

        if(profile) {
            return profile;
        }
        throw error
	}

	return {
		profile: await getProfile(params.nickname)
	};
};

