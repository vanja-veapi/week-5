$(document).ready(function()
{
    // Toggle
    let switchId = document.querySelector("#switch");
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
            switchId.classList.remove("hov-white");
            switchId.classList.add("hov-black");
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
            switchId.classList.remove("hov-black");
            switchId.classList.add("hov-white");
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
    function changeToggleIcon(switcher, path)
    {
        let mode = document.querySelector("#mode");
        mode.textContent = switcher;
        switchIcon.src = `assets/images/${path}`;
        switchIcon.alt = path;
    }
    function getUser(data)
    {
        msg.classList.add("invisible");
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = Number(data.created_at.substr(5, 2)) - 1;

        let dateFormat = `${data.created_at.substr(8, 2)} ${months[month]}  ${data.created_at.substr(0, 4)}`;

        
        let parent;
        let comp; // Company
        if(data.name === null) { data.name = data.login; }

        if(data.bio === null)
        {
            data.bio = "This profile has no bio";
            description.classList.add("opacity-75");
        }
        else { description.classList.remove("opacity-75"); }

        if(data.company === null)
        {
            comp = "Not Available";
            parent = company.parentElement.parentElement;
            parent.classList.add("disabled");
        }
        else if(data.company.substr(0,1) === "@")
        {
            comp = data.company.substr(1);
            // company.href = `www.${comp}.com`;
            parent = company.parentElement.parentElement;
            parent.classList.remove("disabled");
        }
        else
        {
            comp = data.company;
            // company.href = `www.${comp}.com`;
            parent = company.parentElement.parentElement;
            parent.classList.remove("disabled");   
        }
        ifElseStatement(data.twitter_username, null, twitter, true, data.twitter_username);
        ifElseStatement(data.blog, "", site, true);
        ifElseStatement(data.location, null, location, false);
       
        avatar.src = data.avatar_url;
        name.textContent = data.name;
        username.textContent = `@${data.login}`;
        description.textContent = data.bio;
        repos.textContent = data.public_repos;
        followers.textContent = data.followers;
        following.textContent = data.following;
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

    function ifElseStatement(userData, condition, variable, bool = false, twitt)
    {
        let parent;
        parent = variable.parentElement.parentElement;
        if(userData === condition)
        {
            userData = "Not Available";
            parent.classList.add("disabled");
            return variable.textContent = userData;
        }
        else
        {
            variable.textContent = userData;
            parent.classList.remove("disabled");
        }
        bool === true && userData === twitt ? variable.href = `https://twitter.com/${userData}`  : variable.href = userData;
    }
});