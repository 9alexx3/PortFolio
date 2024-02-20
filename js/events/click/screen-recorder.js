const Recorder = () => {

    if(!navigator.mediaDevices) {
        console.error('getMediaUser')
        return
    }

    const button = document.getElementById('Screen_Recorder');

    button.addEventListener('click', async () => {
        const media = await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: {ideal: 30 }},
            audio: true
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
            link.download = "Open-with-browser---PortFolio-AlejandroC.webp"
            link.click()
        })
    })
}

Recorder()