let store = {
    pickedRover: '',
    data: '',
    rovers: Immutable.List(['Spirit', 'Opportunity', 'Curiosity'])
};


// add our markup to the page
const root = document.getElementById('root');

const updateStore = (newState) => {
    store = Object.assign(store, newState);
    render(root, store);
};

const render = async (root, state) => {
    if(state !== null) {
    root.innerHTML = App(state);
    };
};


// create content
const App = (state) => {

    return `
        <header>
            <h1>Mars Rovers</h1>
        </header>
        <main>
            <section>
                ${RoverData(state)}
            </section>
        </main>
        <footer>
            <h3>Project created by: Andrea Scacchi</h3>
        </footer>
    `
};

window.addEventListener('load', () => {
    render(root, store)
});


/* Components */
const RoverData = (state) => {
    if (!state.pickedRover) {
        return (`
            ${roverContainerFunction(state, 'rover-container', connectDataFunction,
            state.rovers, roverCardFunction)}
        `)
    }

    if (!state.data) {
        getRoverData(state);
        return '';
    };

    let photos;
    if (state.pickedRover === 'Curiosity') {
        photos = state.data.results.latest_photos;
    } else {
        photos = state.data.results.photos;
    };

    const photoURL = photos.map(photo => photo.img_src);

    const photoDate = photos[0].earth_date;

    const { name, launch_date, landing_date, status } = photos[0].rover;

    return (`
        <ul class="information-container">
            <li>Rover name: ${name}</li>
            <li>Launched from Earth on: ${launch_date}</li>
            <li>Landed on Mars on: ${landing_date}</li>
            <li>Mission status: ${status}</li>
            <li>Photos taken on: ${photoDate}</li>
        </ul>
        <button onclick="updateStore({pickedRover: '', data: ''})" class="button">Back</button>
        ${roverContainerFunction(state, 'photo-container', connectDataFunction,
        photoURL, photoFunction)}
        <button onclick="updateStore({pickedRover: '', data: ''})" class="button">Back</button>
    `)
};


/* Higher order functions */
const roverContainerFunction = (state, divClass, dataFunction, marsData, elementFunction) => {
    return (`
    <div class="${divClass}">
        ${dataFunction(state, marsData, elementFunction)}
    </div >
    `);
};

const connectDataFunction = (state, marsData, elementFunction) => {
    return (`
        ${marsData.map(x => elementFunction(state, x)).join('')}
    `);
};

const roverCardFunction = (state, rover) => {
    return (`
    <button class="rover-card"
    onclick="setTimeout(updateStore, 3000, {pickedRover: '${rover}'})">
    <h2 class="card-title">${rover}</h2>
    </button>
    `);
};

const photoFunction = (state, url) => {
    return (`
    <img class="photo" src="${url}" alt="Photos taken on Mars by 
    ${state.pickedRover}"/>
    `);
};


/* Api call */
const getRoverData = (state) => {
    const { pickedRover } = state

    fetch(`/${pickedRover}`)
        .then(res => res.json())
        .then(data => updateStore({ data }))
};


/* Build the navbar */
const navbarFunction = () => {
    let nav = document.getElementById('myLinks');
    if(nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
};


// About me section
const img = document.querySelector('img');
const icons = document.querySelector('.icons');
img.onclick = function () {
    this.classList.toggle('active');
    icons.classList.toggle('active');
}


// Click the buttons
document.querySelector('.btn1').onclick = function() {
    location.href = 'https://www.linkedin.com/in/andrea-scacchi-10/';
};

document.querySelector('.btn2').onclick = function () {
    location.href = 'https://github.com/AndreaScacchi';
};
