
const initialCoords = { lat: 40.392521370648154, lng: - 3.6989879718518366 }
let gymMap

function init() {
    renderMap()
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