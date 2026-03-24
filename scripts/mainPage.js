const tabActive=(tab)=>{
    const allTab= document.getElementById("all-tab");
    const openTab = document.getElementById("open-tab");
    const closedTab = document.getElementById("closed-tab");
    if(tab === "all"){
        allTab.classList.remove("btn-soft");
        openTab.classList.add("btn-soft");
        closedTab.classList.add("btn-soft");

        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res)=> res.json())
        .then((data)=> loadCards(data));
    }else if(tab === "open"){
        openTab.classList.remove("btn-soft");
        allTab.classList.add("btn-soft");
        closedTab.classList.add("btn-soft");
    }else{
        closedTab.classList.remove("btn-soft");
        allTab.classList.add("btn-soft");
        openTab.classList.add("btn-soft");
    }
}

const loadCards = (data)=>{
    console.log(data);
}