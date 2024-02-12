
export const routes: string[] = ["attendance", "students",  "shop", "account"]

export function getRouteName(route: string): string {
    let name: string = "";

    name += route.charAt(0).toUpperCase();
    for(let i = 1; i < route.length; i++) {
        name += route.charAt(i);
    }

    return name;
}