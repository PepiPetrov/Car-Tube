import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

const template = (onSubmit, errorMsg) => html`
<div id="login">
    <form action="#" method="post" @submit=${onSubmit}>
        ${errorMsg ? html`
        <div id="errorBox">
            <span>${errorMsg}</span>
        </div>
        `: ''}
        <div class="container">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <button type="submit" class="registerbtn">Login</button>
        </div>

        <div class="container signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </form>
</div>
`

export function loginPage(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {

        e.preventDefault()
        const [username, password] = [...new FormData(e.target).entries()].map(x => x[1])

        if (username == '' || password == '') {
            return ctx.render(template(onSubmit, 'All fields are required!'))
        }
        await login(username, password)
        ctx.setupNav()
        ctx.page.redirect('/all')

    }
}