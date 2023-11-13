
const initialCoords = { lat: 40.392521370648154, lng: - 3.6989879718518366 }
let gymMap

function init() {
    renderMap()
    getGymsFromAPI()
}
function renderMap() {
    gymMap = new google.maps.Map(
        document.querySelector("#gymMap"),
        {
            zoom: 15,
            center: initialCoords
        }
    )
}

function getGymsFromAPI() {
    gymService
        .getAllGyms()
        .then(gyms => printGymsMarkers(gyms.data))
        .catch(err => console.log(err))
}

function printGymsMarkers(gyms) {
    gyms.forEach(elm => {

        const position = {
            lat: elm.location.coordinates[1],
            lng: elm.location.coordinates[0]
        }

        new google.maps.Marker({
            map: gymMap,
            position,
            title: elm.name
        })
    })
}