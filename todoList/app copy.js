//// Selections

const topDate = document.querySelector('.top-data')
const form = document.querySelector('.todo-create')
const input  = document.querySelector('#input')
const todoUL = document.querySelector('.todo-lists')
const erorMessage = document.querySelector('.error-message')
const erorMessagee = document.querySelector('.error-messag')
const modal = document.querySelector('.modal')
const modalInner = document.querySelector('.modal-inner')
const modalInput = document.querySelector('#modal-input')
const modalExit = document.querySelector('#modal-exit')
const saveModal = document.querySelector('.save-modal')
const searchInput = document.querySelector('#search')
///// DATA


///// Variables

let list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')):[]
const a = list
///// Functions

function erorMessag(id){
    id.textContent = 'Write someone things...'
    setTimeout(() => {
        id.textContent = ''
    },2500)
}

function data(){
    const allMonth = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    const date = new Date
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth() + 1
    let months = allMonth[date.getMonth()]
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return {date, year, month, months, day, hour, minute, seconds, allMonth}
}


function uls(){
    todoUL.innerHTML = ''
    list.forEach((element, i) => {
        todoUL.innerHTML +=
        `<li ondblclick={doubleclicks(${i})}>
            <span class="list-num">${i+1}</span>
            <p class="list-content">${element.content}</p>
            <span class="list-time">${element.time}<i onclick={editList(${i})} class="fa-solid fa-pen-to-square" style="color: #008050;"></i><i  onclick={delet(${i})} style="color: red" class="fa-solid fa-trash"></i></span>
        </li>`
    });
}
uls()

function doubleclicks(i){
    Array.from(todoUL.children)[i].classList.toggle('dblclicks')
}

modalExit.addEventListener('click', () => modal.classList.remove('active'))
modal.addEventListener('click', () => modal.classList.remove('active'))
modalInner.addEventListener("click", (e) => {
    e.stopPropagation()
    e.preventDefault()
})

window.addEventListener('keyup', (e) => {
    if(e.which===27){
        modal.classList.remove('active')
    }
})


function editList(i){
    const newlist = []
    modal.classList.add('active')
    const {date, year, month, months, day, hour, minute, seconds} = data()
    list.forEach((l) => {
        newlist.push(l)
        if(l==list[i]){
            modalInput.value = l.content
                const dsa = {content: `${modalInput.value}`, time: `${hour}:${minute}, ${day}.${month}.${year}`}
                saveModal.addEventListener('click', () => {
                    const content = modalInput.value
                    const regEx = /^[a-zA-Z]+$/
                    if(content&&regEx.test(content)){
                        newlist[i] = ({content: `${modalInput.value}`, time: `${hour}:${minute}, ${day}.${month}.${year}`})
                        modal.classList.remove('active')
                        uls()
                    }else{
                        console.log('sdfsdfsffdsf')
                        erorMessag(erorMessagee)
                    }
                })
        }
        uls()
    })
    list = newlist
    localStorage.setItem('list', JSON.stringify(list))
    uls()
}

setInterval(() => {
    const {date, year, month, months, day, hour, minute, seconds} = data()
    topDate.innerHTML = 
    `<h1>${day} ${months}, ${year}</h1>
    <h2>${hour}:${minute}:${seconds}</h2>`
},1000)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const content = input.value
    const {date, year, month, months, day, hour, minute, seconds} = data()
    if(content){
        const add = {content: content, time: `${hour}:${minute}, ${day}.${month}.${year}`}
        list.push(add)
        localStorage.setItem('list', JSON.stringify(list))
        uls()
        input.value = ''
    }
    else{
        erorMessag(erorMessage)
    }
})

function delet(m){
    list = list.filter((i) => list[m]!=i )
    localStorage.setItem('list', JSON.stringify(list))
    uls()
}

searchInput.addEventListener('keyup', () => {
    let sac = []
    list.forEach((l) => {
        console.log(searchInput.value.trim())
        if(l.content.search(searchInput.value.trim())>-1){
            sac.push(l)
        }
    })
    list = sac
    if(searchInput.value.trim()==''){
        list = a
        console.log('aaaa')
    }
    uls()
    console.log(sac)
    console.log(a)
})