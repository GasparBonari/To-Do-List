"use strict";

// DATA

let user1 = 
{
    name: "John",
    lastname: "Wick",
    pin: 1111,
    important: ["Check garden", "Pick up post"],
    work: ["Meeting with new employees"],
    ideas: ["Buy new shop", "Invest in new keyboards"]
}

let user2 = 
{
    name: "Maria",
    lastname: "Lash",
    pin: 2222,
    important: ["New series on netflix"],
    work: ["Reply new job offer"],
    ideas: ["Landscape painting", "Add new color to last book"]
}

let user3 =
{
    name: "Jack",
    lastname: "Sparrow",
    pin: 3333,
    important: ["Meeting with teacher"],
    work: ["Saturday open at 9AM", "Bring new uniform"],
    ideas: ["Blue shirt for participants"]
}

// SELECTORS

let users = [user1, user2, user3];
let currentAcount;
let category = "important";

const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const containerLogIn = document.querySelector(".container-log-in");
const containerApp = document.querySelector(".app");
const newLineList = document.querySelector(".new-task");
const inputTask = document.querySelector(".form__field");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const containerJoinUs = document.querySelector(".join-box");
const joinName = document.querySelector(".join-name");
const joinLastName = document.querySelector(".join-last-name");
const joinUsername = document.querySelector(".join-username");
const joinPassword = document.querySelector(".join-password");
const categoryContent = document.querySelector(".category-content");
const wrap = document.querySelectorAll(".wrap");

const btnLogIn = document.querySelector(".log-in-button");
const btnJoin = document.querySelector(".btn-join-us");
const btnSubmit = document.querySelector(".btn-submit");
const btnGo = document.querySelector(".btn-go");
const btnOpenModal = document.querySelector(".btn--open-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnCloseJoin = document.querySelector(".btn-close");



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

function closeModals()
{
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    containerJoinUs.classList.add("hidden");
}

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModals);
overlay.addEventListener("click", closeModals);

document.addEventListener("keydown", function(e)
{
    if(e.key == "Escape")
    {
        closeModals();
    }
})


// CREATE NEW ACCOUNT

btnJoin.addEventListener("click", function(e)
{
    e.preventDefault();

    overlay.classList.remove("hidden");
    containerJoinUs.classList.remove("hidden");
});

btnCloseJoin.addEventListener("click", closeModals);

btnSubmit.addEventListener("click", function(e)
{
    e.preventDefault();

    if(joinUsername.value == "" || joinPassword.value == "" || joinName.value == "" || joinLastName.value == "")
    {
        btnSubmit.classList.add("error");

        setTimeout(function()
        {
            btnSubmit.classList.remove("error");
        }, 300)

        joinUsername.value = "";
        joinPassword.value = "";
        joinName.value = "";
        joinLastName.value = "";

    }
    else
    {
        let newName = joinName.value;
        let newLastName = joinLastName.value;
        let newUsername = joinUsername.value;
        let newPassword = joinPassword.value;

        let newAccount = {name: newName, lastname: newLastName, pin: newPassword, important: [], work: [], ideas: [], username: newUsername};

        users.push(newAccount);

        overlay.classList.add("hidden");
        containerJoinUs.classList.add("hidden");
    }
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
        displayList(currentAcount, "important");

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

function displayList(acc, category)
{
    newLineList.innerHTML = "";

    for(let [i, k] of Object.entries(acc))
    {
        if(i == category)
        {
            for(let r of k)
            {
                let HTML = 
                `
                <tr>
                    <td>
                        <div class="list">
                            <input type="input" class="text-edit hidden" value="${r}" name="text" required />
                            <p class="list-text">${r}</p>
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
    }
}


// SELECT BUTTONS FROM CATEGORY LIST

categoryContent.addEventListener("click", function(e)
{
    let btn = e.target.closest(".wrap");

    for(let i of wrap)
    {
        i.classList.remove("wrap-active");
    }

    btn.classList.add("wrap-active");

    for(let i of wrap)
    {
        if(i.classList.value == "wrap wrap-active")
        {
           category = i.id;

           displayList(currentAcount, category);
        }
    }

    inputTask.value = "";
})


// ADD NEW TASK TO THE LIST

btnGo.addEventListener("click", function(e)
{
    e.preventDefault();

    if(inputTask.value != "")
    {
        for(let [i, k] of Object.entries(currentAcount))
        {
            if(i == category)
            {
                k.push(inputTask.value);
                
                displayList(currentAcount, category);

                k.length > 7 ? document.body.style.overflow = "auto" : false;

                inputTask.value = "";
            }
        }
    }
})


// DELETE TASK FROM LIST

newLineList.addEventListener("click", function(e)
{
    e.preventDefault();

    let task = e.target.closest(".btn-delete").parentElement.parentElement.previousElementSibling.textContent;

    for(let [i, k] of Object.entries(currentAcount))
    {
        if(i == category)
        {
            for(let r of k)
            {
                if(task == r)
                {
                    let index = k.indexOf(r);
                    
                    k.splice(index, 1);
                }
            }
        }
    }

    displayList(currentAcount, category);
})


// EDIT TASK FROM LIST

newLineList.addEventListener("click", function(e)
{
    e.preventDefault();

    let btnEdit = e.target.closest(".btn-edit");
    let inputEdit = btnEdit.parentElement.parentElement.previousElementSibling.previousElementSibling;
    let taskListText = btnEdit.parentElement.parentElement.previousElementSibling;
    let index;

    inputEdit.classList.toggle("hidden");

    inputEdit.classList.contains("hidden") ? taskListText.style.opacity = 100 : taskListText.style.opacity = 0;


    for(let [i, k] of Object.entries(currentAcount))
    {
        if(i == category)
        {
            index = k.indexOf(taskListText.textContent);
        }
    }

    taskListText.innerHTML = inputEdit.value;

    for(let [i, k] of Object.entries(currentAcount))
    {
        if(i == category)
        {
            k[index] = taskListText.textContent;
        }
    }
})


// HIDE BUTTONS

newLineList.addEventListener("click", function(e)
{
    e.preventDefault();

    let btns = e.target.childNodes[5];

    let text = e.target.childNodes[1]

    console.log(text.classList.contains("hidden"));

    if(text.classList.contains("hidden"))
    {
        btns.classList.toggle("hidden");
    }
})