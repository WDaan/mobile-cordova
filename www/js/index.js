document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    //init camera
    takePicture()
}

function takePicture() {
    const opts = {
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true,
        cameraDirection: Camera.Direction.FRONT
    }
    navigator.camera.getPicture(success, error, opts)

    function success(uri) {
        document.getElementById('output').src = uri
    }

    function error() {
        alert('something went wrong')
    }
}
