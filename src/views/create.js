import { html } from '../../node_modules/lit-html/lit-html.js'
import { createAritcle } from '../api/data.js'

const template = (onSubmit, errorMsg) => html`
<div class="container">
    <div id="create-listing">
        <form @submit=${onSubmit}>
            ${errorMsg ? html`
            <div id="errorBox">
                <span style="font-size:20px">${errorMsg}</span>
            </div>`: ''}
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Title</p>
            <input type="text" placeholder="Enter Title" name="title">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Fuel Type</p>
            <input type="text" placeholder="Enter Car Fuel Type" name="fuelType">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <button type="submit" class="registerbtn">Create Listing</button>
    </div>
    </form>
</div>
`

export function createPage(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [title, description, brand, model, year, imageUrl, fuel, price] = [...new FormData(e.target).entries()].map(x => x[1])
        const car = { title, description, brand, model, year, imageUrl, fuel, price }
        car.seller = sessionStorage.getItem('username')
        if (Object.values(car).includes('')) {
            return ctx.render(template(onSubmit, 'All fields are required!'))
        }
        const id=await createAritcle(car)
        ctx.page.redirect('/all')
    }
}