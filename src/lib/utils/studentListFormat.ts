import csv from "csvtojson";

const converter = csv({
    trim: true,
    includeColumns: /(Participant|FirstName|LastName)/,
    checkType: true,
    noheader: false,
    headers: ['FirstName','LastName']
});

export async function studentListFormat(csv: string): Promise<string[]> {
    let students: string[] = []
    const jsonArray = await converter.fromString(csv);
    console.log(jsonArray);
    for(let i = 0; i < jsonArray.length; i++) {
        if(jsonArray.at(i).LastName.split(" ")[1]) {
            let name = formatFirst(jsonArray.at(i).LastName.split(" ")[0]);
            let lastName = jsonArray.at(i).LastName.split(" ")[1]

            if(lastName) {
                name += " " + abvLast(lastName);
            }
            else if(jsonArray.at(i).LastName) {
                lastName =  jsonArray.at(i).LastName
                name += " " + abvLast(lastName);
            }
            students.push(name);
        }
        else if(jsonArray.at(i).FirstName) {
            let name = formatFirst(jsonArray.at(i).FirstName);
            let last = jsonArray.at(i).LastName;
            name += " " + abvLast(last);
            students.push(name);
        }
    }
    return students
}

function formatFirst(first: string) {
    let name: string = "";
    for(let i = 0; i < first.length; i++) {
        if(i == 0) {
            name += first.charAt(i).toUpperCase();
        }
        else {
            name += first.charAt(i).toLowerCase();
        }
    }
    return name;
}

function abvLast(last: string) {
    let name: string = "";
    for(let i = 0; i < 2; i++) {
        if(i == 0) {
            name += last.charAt(i).toUpperCase();
        }
        else {
            name += last.charAt(i).toLowerCase();
        }
    }
    return name;
}