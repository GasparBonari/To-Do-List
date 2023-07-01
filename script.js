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

const btnLogIn = document.querySelector(".log-in-button");



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


// Display List

let newLineList = document.querySelector(".new-line");

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
                    <p>${i}</p>
                    <div class="btns-list">
                        <button>Edit</button>
                        <button>Done</button>
                    </div>
                </div>
            </td>
        </tr>
        `
        newLineList.insertAdjacentHTML("afterbegin", HTML);
    }
}