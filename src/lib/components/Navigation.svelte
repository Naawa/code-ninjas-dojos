<script lang="ts">
	import { fly } from "svelte/transition";

    let showMenu: boolean = false;
    
    function toggleMenu() {
        showMenu = !showMenu;
        document.querySelector("button")?.classList.toggle("inactive");
    }
</script>
<style lang="scss">
    nav {
        padding: 0 4dvw;
        height: 4em;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: clamp(4vw, 4em, 12vw);
        
        a {
            text-decoration: none;
            &:first-of-type {
                margin-right: auto;
            }
            &:last-of-type {
                display: none;
            }
        }

        button {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: none;
            span {
                border: solid 1px;
                position: absolute;
                rotate: 45deg;
                width: 1em;
                &:last-of-type {
                    rotate: -45deg;
                }
            }
        }
    }

    .inactive {
        gap: 0.2em;
        align-items: end;
        span {
            position: relative;
            width: 1em;
            rotate: 0deg;
            &:last-of-type {
                width: 2em;
                rotate: 0deg;
            }
        }

        &:hover {
            span {
                width: 2em;
                &:last-of-type {
                    width: 1em;
                }
            }
        }
    }
    @media (width > 800px) {
        nav {
            button {
                background-color: transparent;
                color: #030303;
                //border: solid 1px red;
                min-width: fit-content;
                width: fit-content;
            }
        }
        div {
            display: none;
        }
    }
    @media (width < 800px) {
        nav {
            justify-content: space-between;
            a {
                display: none;
                &:last-of-type {
                    display: block;
                }
            }
        }
        div {
            position: fixed;
            top: 4em;
            left: 0;
            width: 100%;
            height: calc(100% - 4em);
            display: flex;
            flex-direction: column;
            gap: clamp(1vw, 2em, 6vw);
            align-items: center;
            a {
                text-decoration: none;
                &:first-child {
                    margin-top: 2em;
                }
            }
        }
    }
</style>

<nav>
    <button on:click={toggleMenu} class="inactive">
        <span></span>
        <span></span>
    </button>
</nav>

{#if showMenu}
    <div in:fly={{ duration: 400, opacity: 0.4}} out:fly={{ delay: 400, duration: 400}}>
        <a on:click={toggleMenu} href="/dashboard" in:fly={{ delay: 50, duration: 400}} out:fly={{ delay: 50, duration: 400}}><b>Dashboard</b></a>
        <a on:click={toggleMenu} href="/students" in:fly={{ delay: 150, duration: 400}} out:fly={{ delay: 150, duration: 400}}><b>Students</b></a>
        <a on:click={toggleMenu} href="/attendance" in:fly={{ delay: 250, duration: 400}} out:fly={{ delay: 250, duration: 400}}><b>Attendance</b></a>
        <a on:click={toggleMenu} href="/shop" in:fly={{ delay: 150, duration: 400}} out:fly={{ delay: 150, duration: 400}}><b>Shop</b></a>
    </div>
{/if}