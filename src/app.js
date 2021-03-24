import { logout } from './api/data.js'
import { render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { dashboardPage } from './views/dashboard.js'
import { detailsPage } from './views/details.js'
import { createPage } from './views/create.js'
import { editPage } from './views/edit.js'
import { myPage } from './views/my.js'

page('/', decorate, homePage)
page('/login', decorate, loginPage)
page('/register', decorate, registerPage)
page('/all', decorate, dashboardPage)
page('/details/:id', decorate, detailsPage)
page('/create', decorate, createPage)
page('/edit/:id',decorate,editPage)
page('/my',decorate,myPage)

function decorate(ctx, next) {
    ctx.render = (content) => render(content, document.querySelector('main'))
    ctx.setupNav = setupNav
    next()
}

setupNav()
page.start()

document.getElementById('logout').addEventListener('click', async e => {
    await logout()
    setupNav()
    page.redirect('/')
})

function setupNav() {
    if (sessionStorage.getItem('userId')) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('user').querySelector('#welcome').textContent = `Welcome, ${sessionStorage.getItem('username')}`
    } else {
        document.getElementById('user').style.display = 'none'
    }
}
