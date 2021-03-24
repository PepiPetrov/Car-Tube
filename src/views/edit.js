import { html } from '../../node_modules/lit-html/lit-html.js'
import { editArticle, getArticle } from '../api/data.js'

const template = (item, onSubmit, errorMsg) => html`
<div id="edit-listing">
    <form @submit=${onSubmit}>
        ${errorMsg ? html`
        <div id="errorBox">
            <span style="font-size:20px">${errorMsg}</span>
        </div>`: ''}
        <div class="container">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>
            <p>Title</p>
            <input type="text" placeholder="Enter Title" name="title" .value=${item.title}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${item.description}>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${item.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${item.model}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${item.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${item.imageUrl}>

            <p>Car Fuel Type</p>
            <input type="text" placeholder="Enter Car Fuel Type" name="fuelType" .value=${item.fuel}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${item.price}>

            <hr>
            <button type="submit" class="registerbtn">Edit Listing</button>
        </div>
    </form>
</div>`


export async function editPage(ctx) {
    const id = ctx.params.id
    const car = await getArticle(id)
    ctx.render(template(car, onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [title, description, brand, model, year, imageUrl, fuel, price] = [...new FormData(e.target).entries()].map(x => x[1])
        const car = { title, description, brand, model, year, imageUrl, fuel, price }
        if (Object.values(car).includes('')) {
            return ctx.render(template(car,onSubmit, 'All fields are required!'))
        }
        await editArticle(id, car)
        ctx.page.redirect('/details/' + id)
    }
}