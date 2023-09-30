const searchInput = document.querySelector("#searchInput");
const form = document.querySelector(".form-field");
const profile = document.querySelector(".github-profile");
const errorMsg = document.querySelector(".error");
const profileHolder = profile.querySelector(".github-profile__holder");
const profileInfo = profile.querySelector(".github-profile__info");
const githubStats = profileInfo.querySelector(".github-stats");
const githubExtras = profileInfo.querySelector('.github-extras')

// Event Listening
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = searchInput.value.trim();
   if (username === "") {
     alert("Input Username");
   }
  getUserDetails(username);
});

profile.style["display"] = "none";
// Function to fetch user details
async function getUserDetails(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    // check is response is ok
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    
    const data = await response.json();
    // assign data to respective variables
    const login = data.login;
    const blog = data.blog;
    const followers = data.followers;
    const repo = data.public_repos;
    const following = data.following;
    const twitterHandle = data.twitter_username;
    const location = data.location;
    const avatar = data.avatar_url;
    const bio = data.bio;
    const url = data.html_url;
    const joinedDate = new Date(data.created_at).toDateString();

    // Manipulate HTMl Data with github data
    profileHolder.innerHTML = `
        <img src="${avatar}" alt="github avatar">
        <div class="github-profile__bio">
            <h3>${login}</h3>
            <p><a href="https://x.com/${twitterHandle}" target="_blank">@${twitterHandle}</a></p>
            <h4><small>Joined ${joinedDate}</small></h4>
        </div> 
    `;

    githubStats.innerHTML = `
        <div class="github-stat">
            <h3>Repos</h3>
            <p>${repo}</p>
        </div> 
        <div class="github-stat">
            <h3>Followers</h3>
            <p>${followers}</p>
        </div>
        <div class="github-stat">
            <h3>Following</h3>
            <p>${following}</p>
        </div> 
    `;   
    profileInfo.querySelector('.bio').innerText = `${bio}`

   
    githubExtras.innerHTML = `
        <div class="github-extra">
            <p class='bx bxs-map'></p>
            <p>${location}</p>
        </div>
        <div class="github-extra">
            <p class='bx bx-link-alt'></p>
            <p><a href="${blog}" target="_blank">${url}</a></p>
        </div>
        <div class="github-extra">
            <p class='bx bxl-twitter'></p>
            <p>${twitterHandle}</p>
        </div>
    `;
    profile.style["display"] = "block";
    profile.style["height"] = "350px";
    errorMsg.style["display"] = "none";
    errorMsg.classList.toggle("fadeIn");
    // What to display if any or the data is null
  
  } catch (error) {
    errorMsg.innerHTML = `
        <img src="images/not.svg" alt="404 not found">
        <p>Oops! Could not find user.</p>
    `;
    profile.style["display"] = "block";
    errorMsg.style["display"] = "flex";
    errorMsg.classList.toggle("fadeIn");
    profile.style["height"] = "180px";
    profileHolder.style["display"] = "";
  }
}
