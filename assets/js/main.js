$(document).ready(function()
{
    // Toggle
    let switchId = document.querySelector("#switch");
    let mode = document.querySelector("#mode");
    let switchIcon = document.querySelector("#switch__icon");
    let mutualContainer = document.querySelectorAll(".mutual--container");
    let changeColor = document.querySelectorAll(".change--color");
    let block = document.querySelectorAll(".block");
    let icons = document.querySelectorAll(".ico");
    let isToggled = false;

   
    switchId.addEventListener("click", function(){
        if(!isToggled)
        {
            changeToggleIcon("Light", "icon-sun.svg");
            mutualContainer.forEach(cont => {
                cont.classList.remove("bg--primary");
                cont.classList.add("bg--dm-black");
            })
            changeColor.forEach(el => {
                el.classList.add("text--white");
            })
            block.forEach(el => {
                el.classList.add("bg--secondary");
            });
            icons.forEach(ico => {
                ico.classList.add("change--icon-color");
            })
            isToggled = true;
        }
        else
        {
            changeToggleIcon("Dark", "icon-moon.svg");
            mutualContainer.forEach(cont => {
                cont.classList.remove("bg--dm-black");
                cont.classList.add("bg--primary");
            })
            changeColor.forEach(el => {
                el.classList.remove("text--white");
            })
            block.forEach(el => {
                el.classList.remove("bg--secondary");
            });
            icons.forEach(ico => {
                ico.classList.remove("change--icon-color");
            })
            isToggled = false;
        }
    });

    // User Data
    let avatar = document.querySelector("#avatar"); // Profile picture
    let name = document.querySelector("#gh-name");
    let username = document.querySelector("#gh-username");
    let date = document.querySelector("#date") // Joined date
    let description = document.querySelector("#description");
    let repos = document.querySelector("#repos");
    let followers = document.querySelector("#followers");
    let following = document.querySelector("#following");
    let location = document.querySelector("#location");
    let site = document.querySelector("#site");
    let twitter = document.querySelector("#twitter");
    let company = document.querySelector("#company");
    let msg = document.querySelector("#msg");
    ajaxRequest("octocat");

    //Search
    let search = document.querySelector("#search");
    let btnSearch = document.querySelector("#btn-search");

    btnSearch.addEventListener("click", function(){
        let lowerCase = search.value.toLowerCase();
        ajaxRequest(lowerCase);
    });

    //Functions
    function changeToggleIcon(mode, path)
    {
        mode.textContent = mode;
        switchIcon.src = `assets/images/${path}`;
        switchIcon.alt = path;
    }
    function getUser(data)
    {
        msg.classList.add("invisible");
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = Number(data.created_at.substr(6, 1)) - 1;
        let dateFormat = `${data.created_at.substr(8, 2)} ${months[month]}  ${data.created_at.substr(0, 4)}`;

        
        let parent;
        let comp; // Company
        if(data.name === null)
        {
            data.name = data.login;
        }
        if(data.bio === null)
        {
            data.bio = "This profile has no bio";
            description.classList.add("opacity-75");
        }
        else { description.classList.remove("opacity-75"); }


        if(data.twitter_username === null)
        {
            data.twitter_username = "Not Available";
            parent = twitter.parentElement.parentElement;
            parent.classList.add("disabled");
        }
        else 
        { 
            twitter.href = data.blog;
            parent = twitter.parentElement.parentElement;
            parent.classList.remove("disabled");
        }


        // Company i blog imaju iste zahteve, samo su drugaciji uslovi i data location ima iste uslove samo nema else
        if(data.company === null)
        {
            comp = "Not Available";
            parent = company.parentElement.parentElement;
            parent.classList.add("disabled");
        }
        else if(data.company.substr(0,1) === "@")
        {
            comp = data.company.substr(1);
            company.href = data.blog;
            parent = company.parentElement.parentElement;
            parent.classList.remove("disabled");
        }
        else
        {
            comp = data.company;
            company.href = data.blog;
            parent = company.parentElement.parentElement;
            parent.classList.remove("disabled");   
        }

        if(data.blog === "")
        {
            data.blog = "Not Available";
            parent = site.parentElement.parentElement;
            parent.classList.add("disabled");
        }
        else 
        { 
            site.href = data.blog;
            parent = site.parentElement.parentElement;
            parent.classList.remove("disabled");
        }

        if(data.location === null)
        {
            data.location = "Not Available";
            parent = location.parentElement.parentElement;
            parent.classList.add("disabled");
        }
        else
        {
            parent = location.parentElement.parentElement;
            parent.classList.remove("disabled");
        }
        avatar.src = data.avatar_url;
        name.textContent = data.name;
        username.textContent = `@${data.login}`;
        description.textContent = data.bio;
        repos.textContent = data.public_repos;
        followers.textContent = data.followers;
        following.textContent = data.following;
        location.textContent = data.location;
        twitter.textContent = data.twitter_username;
        site.textContent = data.blog;
        company.textContent = comp;
        date.textContent = `Joined ${dateFormat}`;
    }

    function ajaxRequest(url)
    {
        $.ajax({
            url: `https://api.github.com/users/${url}`,
            method: "GET",
            dataType: "json",
            success: function(data)
            {
                getUser(data);
            },
            error: function(xhr)
            {
                msg.classList.remove("invisible");
            }
        });
    }
});