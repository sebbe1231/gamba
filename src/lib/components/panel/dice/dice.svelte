<script lang="ts">
    import { api } from "$lib/utils/api";
    import { userTokenDecoded } from "$lib/stores";
    import Swal from "sweetalert2";

    let bet = 0,
        checked = 0,
        isInvalid: boolean,
        btnDisabled: boolean,
        diceImgURL: string = "/dice_1.png";
    
    
    $: isInvalid = bet <= 0;
    $: btnDisabled = bet <= 0;

    const roll = async () => {
        const resp = await api("game/dice", {
            body: {
                guess: checked,
                bet,
            },
        });

        if (resp.success === false){
            return Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                text: `Failed: ${resp.message}`,
                icon: "error"
            });
        }

        btnDisabled = true;

        document.getElementById("diceText")!.textContent = "Rolling..."

        for (let i = 0; i < 20; i++) {
            diceImgURL = `/dice_${Math.floor(Math.random() * 6 + 1)}.png`
            await new Promise(r => setTimeout(r, 10*i+50));
        }
        
        diceImgURL = `/dice_${resp.data.num}.png`
        document.getElementById("diceText")!.textContent = resp.message

        $userTokenDecoded = resp.data.store;

        btnDisabled = bet <= 0;
    };
</script>

<div class="row justify-content-center">
    <div class="text-center" style="display: block;">
        <img id="dice-img" src={diceImgURL} alt="Dice face" />
    </div>
    <div class="row justify-content-center">
        <div class="card col-4">
            <div class="card-body text-center" id="diceText">
                Let the dice decide!
            </div>
        </div>
    </div>
    <div class="col-12 col-md-6 mt-4">
        <h5 class="text-center">Choose dice face</h5>
        <div class="btn-group" style="width: 100%;" role="group">
            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                value="1"
                bind:group={checked}
            />
            <label class="btn btn-outline-primary" for="btnradio1">1</label>

            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                value="2"
                autocomplete="off"
                bind:group={checked}
            />
            <label class="btn btn-outline-primary" for="btnradio2">2</label>

            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio3"
                value="3"
                autocomplete="off"
                bind:group={checked}
            />
            <label class="btn btn-outline-primary" for="btnradio3">3</label>

            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio4"
                value="4"
                autocomplete="off"
                bind:group={checked}
            />
            <label class="btn btn-outline-primary" for="btnradio4">4</label>

            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio5"
                value="5"
                autocomplete="off"
                bind:group={checked}
            />
            <label class="btn btn-outline-primary" for="btnradio5">5</label>

            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio6"
                value="6"
                autocomplete="off"
                bind:group={checked}
            />
            <label class="btn btn-outline-primary" for="btnradio6">6</label>
        </div>
    </div>
    <div class="col-12 col-md-6 mt-4">
        <h5 class="text-center">Bet amount</h5>
        <input type="number" class="form-control" class:is-invalid={isInvalid} bind:value={bet} />
    </div>
    <div class="col-12 col-md-2 mt-4 ">
        <button
            type="submit"
            style="width: 100%;"
            class="btn btn-success"
            class:disabled={btnDisabled}
            on:click={roll}>ROLL</button
        >
    </div>
</div>
