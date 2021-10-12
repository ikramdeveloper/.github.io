const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.classList.remove("is-covered");
  });
});

const thumbnails = document.querySelector(".thumbnails");

let source = "js/channels.json";
const getData = async () => {
  const res = await fetch(source);
  const data = await res.json();
  const channelData = data.channels;
  displayChannelBox(channelData);
};

getData();

function displayChannelBox(data) {
  let html = "";

  data.forEach((channel) => {
    const box = document.createElement("div");
    box.classList.add("box");
    if (channel.double) {
      box.classList.add("wide-box");
    }
    const { courses } = channel;
    const allCourses = showCourses(courses);
    const { special } = channel;
    const allLinks = showLinks(special);
    html = `
    <a
              target="_blank"
              href="${channel.link}"
              class="image fit"
              ><img
                src="${channel.img}"
                alt="${channel.name}"
            /></a>
            <div class="inner">
              <h3>${channel.name} (${channel.country})</h3>
              <p>
              ${allCourses.outerHTML}
              ${allLinks.outerHTML}
              </p>
              <a
                target="_blank"
                href="${channel.link}"
                class="button open-link fit"
                >Visit</a
              >
            </div>
    `;
    box.innerHTML = html;
    thumbnails.appendChild(box);
  });
}

function showCourses(courses) {
  const span = document.createElement("span");
  let html = "";
  for (const course in courses) {
    if (courses.hasOwnProperty(course)) {
      html = courses[course];
      span.innerHTML += `${html} <br>`;
    }
  }
  return span;
}

function showLinks(links) {
  const span = document.createElement("span");
  let html = "";
  links.forEach((link) => {
    html += `
    <a href="${link.link}" target="_blank">${link.name}</a>
    <br>`;
    span.innerHTML = html;
  });
  return span;
}
