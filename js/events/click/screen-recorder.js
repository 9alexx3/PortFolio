const Recorder = () => {

    if(!navigator.mediaDevices) {
        console.error('Screen Recorder not supported in your browser.')
        alert('Screen Recorder not supported in your browser.')
        return
    }

    const button = document.getElementById('Screen_Recorder');

    button.addEventListener('click', async () => {
        const media = await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: {ideal: 50 }},
            audio: { }
        })
    
        const mediarecorder = new MediaRecorder(media, {
            mimeType: 'video/webm;codecs=vp8, opus'
        })
        mediarecorder.start()
    
        const [video] = media.getVideoTracks()
        video.addEventListener("ended", () => {
            mediarecorder.stop()
        })
    
        mediarecorder.addEventListener("dataavailable", (e) => {
            const link = document.createElement("a")
            link.href = URL.createObjectURL(e.data)
            link.download = "Open-with-browser---PortFolio-AlejandroC.webm"
            link.click()
        })
    })
}

Recorder()