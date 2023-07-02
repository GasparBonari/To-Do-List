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

const btnLogIn = document.querySelector(".log-in-button");
const btnGo = document.querySelector(".btn-go");
const btnDelete = document.querySelector(".btn-delete");



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
                    <p class="list-text">${i}</p>
                    <div class="btns-list">
                        <button class="button-pushable" role="button">
                            <span class="button-shadow"></span>
                            <span class="button-edge"></span>
                            <span class="button-front text">
                            Edit
                            </span>
                        </button>

                        <button class="button-pushable" role="button">
                            <span class="button-shadow"></span>
                            <span class="button-edge"></span>
                            <span class="button-front text">
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

let listText = document.querySelector(".list-text");

btnDelete.addEventListener("click", function(e)
{
    e.preventDefault();

    console.log(listText)
})