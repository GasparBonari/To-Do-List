"use strict";

// DATA

let user1 = 
{
    name: "John",
    lastname: "Wick",
    pin: 1111,
    list: ["Check garden", "Pick up post"],
}

let user2 = 
{
    name: "Maria",
    lastname: "Lash",
    pin: 2222,
    list: [],
}

let user3 =
{
    name: "Jack",
    lastname: "Sparrow",
    pin: 3333,
    list: ["Meeting with teacher"],
}

// SELECTORS

let users = [user1, user2, user3];
let currentAcount;

const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const containerLogIn = document.querySelector(".container-log-in");
const containerApp = document.querySelector(".app");
const newLineList = document.querySelector(".new-line");
const inputTask = document.querySelector(".form__field");
const list = document.querySelector(".new-line");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const containerJoinUs = document.querySelector(".join-box");

const btnLogIn = document.querySelector(".log-in-button");
const btnJoinUs = document.querySelector(".btn-join-us");
const btnGo = document.querySelector(".btn-go");
const btnOpenModal = document.querySelector(".btn--open-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");



// CREATE USERNAMES FROM CURRENT USERS

function createUserNames(clients)
{
    for(let i of clients)
    {
        let fullName = [i.name.toLowerCase(), i.lastname.toLowerCase()]
    
        i.username = fullName.map(e => e[0]).join("")
    }
}

createUserNames(users);


// OPEN AND CLOSE MODAL

function openModal()
{
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeModal()
{
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function(e)
{
    if(e.key == "Escape")
    {
        closeModal();
    }
})


// CREATE NEW ACCOUNT

btnJoinUs.addEventListener("click", function(e)
{
    e.preventDefault();

    console.log("hi")

    overlay.classList.remove("hidden");
    containerJoinUs.classList.remove("hidden");

})

// LOG IN

btnLogIn.addEventListener("click", function(e)
{
    e.preventDefault();

    currentAcount = users.find(e => e.username == usernameInput.value);

    if(currentAcount?.username == usernameInput.value && currentAcount?.pin == passwordInput.value)
    {
        containerLogIn.style.opacity = 0;
        containerApp.style.opacity = 100;
        displayList(currentAcount);

        usernameInput.value = "";
        passwordInput.value = "";
        passwordInput.blur();
    }
    else
    {
        usernameInput.value = "";
        passwordInput.value = "";
        passwordInput.blur();
        
        btnLogIn.classList.add("error");
        
        setTimeout(function()
        {
            btnLogIn.classList.add("error");
            btnLogIn.classList.remove("error");
        }, 300)
    }

})


// DISPLAY LIST

function displayList(acc)
{
    newLineList.innerHTML = "";

    for(let i of acc.list)
    {
        let HTML = 
        `
        <tr>
            <td>
                <div class="list">
                    <input type="input" class="text-edit hidden" value="${i}" name="text" required />
                    <p class="list-text">${i}</p>
                    <div class="btns-list hidden">
                        <button class="button-pushable" role="button">
                            <span class="button-shadow"></span>
                            <span class="button-edge"></span>
                            <span class="button-front btn-edit">
                            Edit
                            </span>
                        </button>

                        <button class="button-pushable" role="button">
                            <span class="button-shadow"></span>
                            <span class="button-edge"></span>
                            <span class="button-front btn-delete">
                            Delete
                            </span>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
        `
        newLineList.insertAdjacentHTML("afterbegin", HTML);
    }
}


// ADD NEW TASK TO THE LIST

btnGo.addEventListener("click", function(e)
{
    e.preventDefault();

    if(inputTask.value != "")
    {
        for(let [i, k] of Object.entries(currentAcount))
        {
            if(i == "list")
            {
                k.push(inputTask.value);
                
                displayList(currentAcount);
            }
        }
    }

    if(currentAcount.list.length == 7)
    {
        document.body.style.overflow = "auto";
    }
})


// DELETE TASK FROM LIST

list.addEventListener("click", function(e)
{
    e.preventDefault();

    let btnDelete = e.target.closest(".btn-delete");
    let task = btnDelete.parentElement.parentElement.previousElementSibling.textContent;

    for(let i of currentAcount.list)
    {
        if(task == i)
        {
            let index = currentAcount.list.indexOf(i);
            
            currentAcount.list.splice(index, 1);
        }
    }

    displayList(currentAcount);

})

// EDIT TASK FROM LIST

list.addEventListener("click", function(e)
{
    e.preventDefault();

    let btnEdit = e.target.closest(".btn-edit");
    let inputEdit = btnEdit.parentElement.parentElement.previousElementSibling.previousElementSibling;
    let taskListText = btnEdit.parentElement.parentElement.previousElementSibling;
    let index = currentAcount.list.indexOf(taskListText.textContent);

    inputEdit.classList.toggle("hidden");

    inputEdit.classList.contains("hidden") ? taskListText.style.opacity = 100 : taskListText.style.opacity = 0;

    taskListText.innerHTML = inputEdit.value;

    if(index !== -1)
    {
        currentAcount.list[index] = taskListText.textContent;
    }
})


// HIDDEN BUTTONS

list.addEventListener("click", function(e)
{
    e.preventDefault();

    let btns = e.target.childNodes[5]

    btns.classList.toggle("hidden")
})