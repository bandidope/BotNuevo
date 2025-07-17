
import hispamemes from 'hispamemes'
import axios from 'axios'
import delay from 'delay'

const canal = '120363418774581077@newsletter'

const query = [
  'videos graciosos', 'jajaja videos de risa', 'video fun', 'Funny videos', 
  'memes', 'videos memes', 
  'memes phonk', 'memes funk', 
  'video viral gracioso',
  'viral meme',
  'graciosos viral',
  'carros edits',
  'edits series phonk'
]

async function obtenerVideo() {
  const keywords = query[Math.floor(Math.random() * query.length)]
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://tikwm.com/api/feed/search',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'current_language=en',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
      },
      data: {
        keywords,
        count: 10,
        cursor: 0,
        HD: 1
      }
    })

const videos = res.data?.data?.videos
if (!videos || videos.length === 0) return null

const random = videos[Math.floor(Math.random() * videos.length)]
    return {
      url: random.play,
      title: random.title || 'Video Tiktok'
    }

} catch (e) {
    console.error('[ERROR]', e)
    return null
  }
}

function obtenerMeme() {
return hispamemes.meme()
}

async function enviarAlCanal(conn, contenido) {
  try {
    await conn.sendMessage(canal, contenido)
  } catch (e) {
    console.error('[ERROR]', e)
  }
}

async function autopost(conn) {
while (true) {
try {
const tipo = Math.random() < 0.5 ? 'meme' : 'video'

if (tipo === 'meme') {
const meme = obtenerMeme()
await enviarAlCanal(conn, {
          image: { url: meme },
          caption: 'ðŸ¤£ Â¡AquÃ­ tienes tu Memecito!'
        })

} else {
const video = await obtenerVideo()
if (video) {
await enviarAlCanal(conn, {
video: { url: video.url },
caption: video.title
})
}}

const espera = Math.floor(Math.random() * (2 * 60 * 60 * 1000 - 60 * 60 * 1000)) + 60 * 60 * 1000
console.log(`ðŸª� Sig PublicaciÃ³n en ${Math.floor(espera / 60000)} minutos`)
await delay(espera)

} catch (err) {
console.error('[Error Delay]', err)
await delay(60 * 1000)
}}}

export default autopost