(async function(){
    const response = await fetch("./recipes.json")
    const recipes = await response.json()
    
    const searchInput = document.getElementById("searchInput")
    const searchBtn = document.getElementById("searchBtn")
    const listElem = document.getElementById("recipe-list")
    detailsElem = document.getElementById("recipeDetailsContainer")

    const  loadRecipeDetails = (recipe) =>{
        detailsElem.innerHTML = `<h2 class="title">${recipe.title}</h2>
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map((ingredient) => {
            return "<li>"+ingredient + "</li>"}).join(" ")}</ul>
            <h3>Instruction</h3>
            <div>${recipe.instructions}</div>`
    }

    const displaySearchResults= (results) =>{
        listElem.innerHTML=""
        results .forEach(recipe => {
            const li = document.createElement("li")
            const listItem = `<h2 class="title">${recipe.title}</h2>
            <div class="description">${recipe.description}</div>
            `
            li.innerHTML = listItem;
            li.addEventListener("click",() =>{
                loadRecipeDetails(recipe)
            })
            listElem.appendChild(li)
        });
    }


    let search = () =>{
        const query = searchInput.value
        const results = recipes.filter((recipe) =>{
            return (recipe.title.toLowerCase().includes(query)||
            recipe.ingredients.join(" ").toLowerCase().includes(query))
        })
        displaySearchResults(results)
    }

    searchBtn.addEventListener("click", search)
})()