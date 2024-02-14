import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getAdmin() {
        const res = await fetch('/account');
        const admin = await res.json();
        return admin;
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
        admin: await getAdmin(),
        students: await getStudents(),
        attendance: await getAttendance(),
    }
};
