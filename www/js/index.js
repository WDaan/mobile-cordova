document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
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
            let imgContainer = document.getElementById('imgContainer')
            imgContainer.classList.remove('hidden')
            document.getElementById('output').src =
                'data:image/jpeg;base64,' + uri
        },
        () => alert('something went wrong'),
        opts
    )
}
