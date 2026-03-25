const tabActive = (tab) => {
  const allTab = document.getElementById("all-tab");
  const openTab = document.getElementById("open-tab");
  const closedTab = document.getElementById("closed-tab");
  if (tab === "all") {
    allTab.classList.remove("btn-soft");
    openTab.classList.add("btn-soft");
    closedTab.classList.add("btn-soft");
    loadSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
      .then((res) => res.json())
      .then((datas) => loadCards(datas, tab));
  } else if (tab === "open") {
    openTab.classList.remove("btn-soft");
    allTab.classList.add("btn-soft");
    closedTab.classList.add("btn-soft");
    loadSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
      .then((res) => res.json())
      .then((datas) => loadCards(datas, tab));
  } else {
    closedTab.classList.remove("btn-soft");
    allTab.classList.add("btn-soft");
    openTab.classList.add("btn-soft");
    loadSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
      .then((res) => res.json())
      .then((datas) => loadCards(datas, tab));
  }
};

const updateIssueCount = (count) => {
  const issuesCount = document.getElementById("issues-count");
  issuesCount.innerText = `${count} Issues`;
};

const loadSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};


const displayDetails = (data) => {
  const detailsContainer = document.getElementById("details-container");
  const labelHTML = data.labels
    .map((label) => {
      if (label === "bug") {
        return `<div class="badge badge-outline badge-error">BUG</div>`;
      }
      if (label === "help wanted") {
        return `<div class="badge badge-outline badge-warning">HELP WANTED</div>`;
      }
      if (label === "enhancement") {
        return `<div class="badge badge-outline badge-success">ENHANCEMENT</div>`;
      }
      if (label === "good first issue") {
        return `<div class="badge badge-outline badge-info">GOOD FIRST ISSUE</div>`;
      }
      if (label === "documentation") {
        return `<div class="badge badge-outline badge-accent">DOCUMENTATION</div>`;
      }
      return "";
    })
    .join("");

  detailsContainer.innerHTML = `
      <div class="space-y-2">
                <h2 class="text-2xl font-bold">${data.title}</h2>
                <div class="flex gap-2 items-center">
                  <div class="badge ${data.status === "open" ? "badge-success" : "badge-primary"}">${data.status}</div>
                  <span><img src="./assets/Ellipse 5.png" alt="dot" /></span>
                  <p class="text-[12px] text-[#64748B]">
                    Opened by ${data.author}
                  </p>
                  <span><img src="./assets/Ellipse 5.png" alt="dot" /></span>
                  <p class="text-[12px] text-[#64748B]">${new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div class="label-container flex flex-wrap gap-1">${labelHTML}</div>
              <div>
                <p class="text-[#64748B]">
                  ${data.description}
                </p>
              </div>
              <div class="grid grid-cols-2 p-4 gap-2">
                <div>
                  <p class="text-[#64748B]">Assignee:</p>
                  <h3 class="font-semibold">${data.assignee === "" ? "No Assignee" : data.assignee}</h3>
                </div>
                <div>
                  <p class="text-[#64748B]">Priority:</p>
                  <div class="badge badge-soft badge-error">${data.priority}</div>
                </div>
              </div>
      `;


    document.getElementById("my_modal_5").showModal();

};

const loadDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
};

const loadCards = (data, tab) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const filteredData =
    tab === "all" ? data.data : data.data.filter((d) => d.status === tab);

  updateIssueCount(filteredData.length);

  for (let d of filteredData) {
    const card = document.createElement("div");

    const labelsHTML = d.labels
      .map((label) => {
        if (label === "bug") {
          return `<div class="badge badge-outline badge-error">BUG</div>`;
        }
        if (label === "help wanted") {
          return `<div class="badge badge-outline badge-warning">HELP WANTED</div>`;
        }
        if (label === "enhancement") {
          return `<div class="badge badge-outline badge-success">ENHANCEMENT</div>`;
        }
        if (label === "good first issue") {
          return `<div class="badge badge-outline badge-info">GOOD FIRST ISSUE</div>`;
        }
        if (label === "documentation") {
          return `<div class="badge badge-outline badge-accent">DOCUMENTATION</div>`;
        }
        return "";
      })
      .join("");

    card.innerHTML = `
        <div onclick="loadDetails(${d.id})" class="card p-4 shadow-sm bg-base-100 space-y-3 h-full ${d.status === "open" ? "border-t-4 border-green-600" : "border-t-4 border-purple-600"}">
          <div class="flex justify-between">
            <div>
              <img src="./assets/${d.status === "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="status" />
            </div>
            <div class="badge badge-soft badge-error">${d.priority}</div>
          </div>
          <div class="space-y-2">
            <h1 class="text-[14px] font-semibold">${d.title}</h1>
            <p class="text-[12px] text-[#64748B]">${d.description}</p>
            <div class="label-container flex flex-wrap gap-1">
              ${labelsHTML}
            </div>
          </div>
          <hr class="text-zinc-300"/>
          <div class="space-y-2">
            <p class="text-[12px] text-[#64748B]">#${d.id} by ${d.author}</p>
            <p class="text-[12px] text-[#64748B]">${new Date(d.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      `;

    cardContainer.appendChild(card);
  }
  loadSpinner(false);
};

const searchIssues = () => {
  const searchInput = document
    .getElementById("search-issue")
    .value.toLowerCase();
  loadSpinner(true);

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput}`,
  )
    .then((res) => res.json())
    .then((datas) => {
      updateIssueCount(datas.data.length);
      loadCards(datas, "all");
    });
};

tabActive("all");
