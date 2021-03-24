import { html } from "../../node_modules/lit-html/lit-html.js";
import { getArticle, deleteArticle } from "../api/data.js";

const template = (item, onDel) => html`
<div class="listing-details">
    <div class="my-listing-details">
        <p id="auto-title">${item.name}</p>
        <img src="${item.imageUrl}">
        <div class="listing-props">
            <h2>Brand: ${item.brand}</h2>
            <h3>Model: ${item.model}</h3>
            <h3>Year: ${item.year}</h3>
            <h3>Fuel: ${item.fuel}</h3>
            <h3>Price: ${item.price}$</h3>
        </div>
        ${item._ownerId == sessionStorage.getItem('userId') ? html`
        <div class="listings-buttons">

            <a href="/edit/${item._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" class="button-list" @click=${onDel} id=${item._id}>Delete</a>
        </div>`: ''}
        <p id="description-title">Description:</p>
        <p id="description-para">${item.description}</p>

    </div>
</div>`

export async function detailsPage(ctx) {
    const id = ctx.params.id
    const car = await getArticle(id)

    ctx.render(template(car, onRemove))
    async function onRemove(e) {
        if (confirm('Are you sure')) {
            await deleteArticle(e.target.id)
            ctx.render(
                template(await getArticles(),
                    onRemove))
        }
    }
}