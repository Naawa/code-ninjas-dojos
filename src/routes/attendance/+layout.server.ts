import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getStudents() {
        const res = await fetch('/students');
        const students = await res.json();
        return students;
    }

    async function getAttendance() {
        const res = await fetch('/attendance');
        const parsed = await res.json();
        const hourly = parsed.data.at(0);
        return hourly;
    }
    

    return {
        students: await getStudents(),
        attendance: await getAttendance(),
    }
};
