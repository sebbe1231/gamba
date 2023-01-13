<div class="container mt-4">
    <h1 class="text-center">Choose what to do</h1>

    <div class="row">
        <!-- Dice -->
        <a class="col-12 col-md-3 img_container" href="/panel/dice">
            <img class="img-fluid rounded" src="/dice.png" alt="dice" />
            <span>Dice!</span>
        </a>
    </div>
</div>

<style>
    .img_container {
        position: relative;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        color: #000;
        font-weight: bold;
        font-size: large;
    }

    .img_container > img {
        transition: all cubic-bezier(0.075, 0.82, 0.165, 1) .5s;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    }
    .img_container:hover > img {
        transform: translate(0, -1rem);
        box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
    }

    .img_container:hover {
        text-decoration: underline;
    }
</style>
