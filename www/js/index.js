document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    //navbar
    NavigationBar.show()
    //init camera
    document.getElementById('picture').addEventListener('click', takePicture)
}

function takePicture() {
    const opts = {
        destinationType: Camera.DestinationType.DATA_URL,
        cameraDirection: Camera.Direction.FRONT
    }
    navigator.camera.getPicture(
        uri => {
            document.getElementById('output').src =
                'data:image/jpeg;base64,' + uri
        },
        () => alert('something went wrong'),
        opts
    )
}
