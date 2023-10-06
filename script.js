let resultsContainer = document.getElementsByClassName("container")[0];

function debounce(callback, delay) {
  let timerId;

  return function() {
    const context = this;
    const args = arguments;

    clearTimeout(timerId);

    timerId = setTimeout(function() {
      callback.apply(context, args);
    }, delay);
  };
}

const validateInput = el => {
  if (el.value === "") {
    resultsContainer.innerHTML =
      "<p>Type something in the above search input</p>";
  } else {
    console.log(".........");

    generateResults(el.value, el);
  }
};
const input = document.querySelector("input");
input.addEventListener(
  "input",
  debounce(e => validateInput(e), 1000)
);




const generateResults = (searchValue, inputField) => {
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
      searchValue
  )
    .then(response => response.json())
    .then(data => {
      let results = data.query.search;
      let numberOfResults = data.query.search.length;
      resultsContainer.innerHTML = "";
      for (let i = 0; i < numberOfResults; i++) {
        let result = document.createElement("div");
        result.classList.add("results");
        result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `;
        resultsContainer.appendChild(result);
      }
      if (inputField.value === "") {
        resultsContainer.innerHTML =
          "<p>Type something in the above search input</p>";
      }
    });
};
