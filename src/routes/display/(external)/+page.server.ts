import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, locals: { getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getAttendance() {
        const res = await fetch('/attendance');
        const parsed = await res.json();
        const hourly = parsed.data.at(0);
        return hourly;
    }

    return {
        attendance: await getAttendance(),
    }
};
