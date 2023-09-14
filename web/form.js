import { server } from "./server"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Video informado acima não é um short")
  }

  const [_, paramsId] = videoURL.split("/shorts/")
  const [videoId] = paramsId.split("?si")

  content.textContent = "Obtendo o texto do video..."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Realizando o resumo..."

    const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
