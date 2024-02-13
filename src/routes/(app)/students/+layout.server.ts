import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, locals: { getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getStudents() {
        const res = await fetch('/students');
        const students = await res.json();

        return students;
    }

    return {
        students: await getStudents(),
    }
};
