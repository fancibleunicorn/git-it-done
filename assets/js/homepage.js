// Dom Elements for repo display
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


// Gets github repos by username
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            // response was not successful (not a valid username)    
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            //if unable to connect to Github
            alert("Unable to connect to GitHub");
         });
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");


//Passes user name field value into getUserRepos()
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        //clear out user name field
        nameInputEl.value = "";
    } else {
        //if name field is blank
        alert("Please enter a GitHub username");
    }
};


//Display Repos
var displayRepos = function(repos, searchTerm) {
    // check if user has any repos to display
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
    }

    //clear repo cotainer element
    repoContainerEl.textContent = "";
    // add searched repo name to "Showing Repositories for"
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" +repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList ="list-item flex-row justify-space-between align-center"

        //create a span element to hold repository name
        var titleEl =document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repot has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // apend to container
        repoEl.appendChild(statusEl);

        //apend container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};


// Event Listener for when "Get User" is clicked
userFormEl.addEventListener("submit", formSubmitHandler);