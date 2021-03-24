import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyArticles } from "../api/data.js";

const template = (data = []) => html`
<div class="my-listings">
    <h1>My car listings</h1>
    <div class="car-listings">
        ${data.length == 0 ? html`<p class="no-cars"> You haven't created any cars yet.</p>` : data.map(itemTemplate)}
    </div>
</div>
`

const itemTemplate = (item) => html`
<div class="my-listing">
    <p id="listing-title">${item.title}</p>
    <img src="${item.imageUrl}">

    <div class="listing-props">
        <h2>Brand: ${item.brand}</h2>
        <h3>Model: ${item.model}</h3>
        <h3>Year: ${item.year}</h3>
        <h3>Price: ${item.price}$</h3>
    </div>
    <div class="my-listing-buttons">
        <a href="/details/${item._id}" class="my-button-list">Details</a>
    </div>
</div>
`

export async function myPage(ctx){
    ctx.render(template(await getMyArticles()))
}