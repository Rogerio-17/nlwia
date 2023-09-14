import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, rejects) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log(`realizando download do video de ID: ${videoId}`)

    //Download do video
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("Duração do video é maior do que 60 segundos")
        }
      })
      .on("end", () => {
        console.log("Download do video finalizado")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possivel realizar o downloado do video. Mais detalhes: " +
            error
        )
        rejects(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
