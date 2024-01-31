import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if(!session) {
        redirect(302, "/")
    }

    async function getStudents() {
        let { data: students, error } = await supabase
        .from('students')
        .select('*').order('nickname', {ascending: true}).eq('center_admin', `${session?.user.id}`)

        if(error) {
            console.log(error)
        }
        return students;
    }

    async function getAttendanceattendanceInfo() {
        let { data: attendanceInfo, error } = await supabase
        .from('sessions')
        .select('first_hour_attendance,second_hour_attendance,third_hour_attendance,fourth_hour_attendance').eq('center_admin', `${session?.user.id}`)

        if(attendanceInfo) {
            if(attendanceInfo.at(0)) {
                return attendanceInfo.at(0);
            }
        }
        return null
    }

    let tHour01 = new Date()
    tHour01.setHours(15);
    tHour01.setMinutes(30);

    let tHour02 = new Date()
    tHour02.setHours(16);
    tHour02.setMinutes(30);

    let tHour03 = new Date()
    tHour03.setHours(17);
    tHour03.setMinutes(30);

    let tHour04 = new Date()
    tHour04.setHours(18);
    tHour04.setMinutes(30);

    return {
        students: await getStudents(),
        attendanceInfo: await getAttendanceattendanceInfo(),
        hours: {
            tHour01,
            tHour02,
            tHour03,
            tHour04
        }
    }
};
