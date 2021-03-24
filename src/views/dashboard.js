import { html } from '../../node_modules/lit-html/lit-html.js'
import { getArticles, deleteArticle } from '../api/data.js'


const catalog = (items, onRemove) => html`
<div id="car-listings">
    <h1>Car Listings</h1>

    <div id="listings">
        ${items.length == 0 ? html`
        <p class="no-cars">No cars in database.</p>
        `: items.map(x => itemTemplate(x, onRemove))}

    </div>
</div>
`

const itemTemplate = (item, onRemove) => html`
<div class="listing">
    <p>${item.description}</p>
    <img src="${item.imageUrl}">
    <h2>Brand: ${item.brand}</h2>
    <div class="info">
        <div id="data-info">
            <h3>Seller: ${item.seller}</h3>
            <h3>Fuel: ${item.fuel}</h3>
            <h3>Year: ${item.year}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div id="data-buttons">
            <ul>
                <li class="action">
                    <a href="/details/${item._id}" class="button-carDetails">Details</a>
                </li>
            </ul>
        </div>
    </div>

</div>
`

export async function dashboardPage(ctx) {
    ctx.render(
        catalog(await getArticles()),
        onRemove
    )
    async function onRemove(e) {
        if (confirm('Are you sure')) {
            await deleteArticle(e.target.id)
            ctx.render(
                catalog(await getArticles(),
                    onRemove))
        }
    }
}