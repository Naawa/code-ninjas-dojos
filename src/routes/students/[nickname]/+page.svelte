<script lang="ts">
    export let data;
    const { supabase, profile } = data;

    let points: number = profile.points;
    let amount: number;

    function addPoints(amount: number) {
        points += amount;
    }
    function removePoints(amount: number) {
        points -= amount;
    }

    async function savePoints(points: number) {
        const { error } = await supabase.from('students').update({ points: `${points}` }).eq('nickname', `${profile.nickname}`).select()

        if(error) {
            console.log(error);
        }
    }
</script>

<section>
    <h3>{profile?.nickname}</h3>
    <span>
        <div>
            <p><strong>{profile?.belt}</strong> Belt</p>
            <p><strong>{points}</strong> Points</p>
        </div>
        <input type="number" placeholder="10 Points" bind:value={amount}>
        <div>
            <button on:click={() => addPoints(amount)}>Add</button>
            <button on:click={() => removePoints(amount)}>Remove</button>
        </div>
        <button on:click={() => savePoints(points)}>Save</button>
    </span>
</section>

<style lang="scss">
    section {
        margin: auto;
        max-width: 70dvw;
        font-size: larger;
        span {
            display: flex;
            flex-direction: column;
            gap: 2em;
            justify-content: center;
            align-items: center;

            div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                gap: 2em;

                button {
                    min-width: 100px;
                    width: 100%;
                }
            }
        }
    }
</style>
