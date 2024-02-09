import { writable } from "svelte/store"

function createNinjas() {
    const list: string[] = []
    let ninjas = writable<any>(list)

    return {
        ...ninjas
    }
}

export const ninjas = createNinjas()