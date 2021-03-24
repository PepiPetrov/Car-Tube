import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js'

const template = (onSubmit, errorMsg) => html`
<div id="register">
    <form @submit=${onSubmit}>
        ${errorMsg ? html`
        <div id="errorBox">
            <span>${errorMsg}</span>
        </div>
        `: ''}
        <div class="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <button type="submit" class="registerbtn">Register</button>
        </div>
        <div class="container signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </form>
</div>
`


export function registerPage(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [username, password, repeatPass] = [...new FormData(e.target).entries()].map(x => x[1])
        if(repeatPass!==password){
            return ctx.render(template(onSubmit,'Passwords don\'t match!'))
        }
        await register(username,password)
        
        ctx.setupNav()
        ctx.page.redirect('/all')
    }
}