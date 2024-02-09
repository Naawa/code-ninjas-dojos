import { writable } from "svelte/store"

function createNinjas() {
    let ninjas = writable<any>()

    return {
        ...ninjas
    }
}

export const ninjas = createNinjas()