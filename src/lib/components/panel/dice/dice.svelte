<script>
    let bet = 0;

    const roll = async () => {
        const resp = await fetch("/api/game/dice", {
            method: "POST",
            body: JSON.stringify({
                guess: document.querySelector('input[name="btnradio"]:checked')?.getAttribute('value'),
                bet: bet
            }),
        },
        )
    }
</script>

<div class="row align-items-end justify-content-center">
    <div class="col-12 col-md-6 mt-4">
        <h5 class="text-center">Choose dice face</h5>
        <div class="btn-group" style="width: 100%;" role="group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value=1 checked>
            <label class="btn btn-outline-primary" for="btnradio1">1</label>
        
            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value=2 autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio2">2</label>
        
            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" value=3 autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio3">3</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" value=4 autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio4">4</label>
        
            <input type="radio" class="btn-check" name="btnradio" id="btnradio5" value=5 autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio5">5</label>
        
            <input type="radio" class="btn-check" name="btnradio" id="btnradio6" value=6 autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio6">6</label>
        </div>
    </div>
    <div class="col-12 col-md-6 mt-4">
        <h5 class="text-center">Bet amount</h5>
        <input type="number" class="form-control" bind:value={bet}>
    </div>
    <div class="col-12 col-md-2 mt-4 ">
        <button type="submit" style="width: 100%;" class="btn btn-success" on:click={roll}>ROLL</button>
    </div>
</div>