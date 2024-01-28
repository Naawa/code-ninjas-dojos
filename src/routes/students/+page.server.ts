import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase,getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getStudents() {
        let { data: students, error } = await supabase.from("students").select("*").eq("center_admin", `${session?.user.id}`);
        if(error) {
            console.log(error)
        }
        return students;
    }

    return {
        students: await getStudents(),
    }
};
