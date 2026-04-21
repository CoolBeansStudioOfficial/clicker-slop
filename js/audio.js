const Audiocontext = window.AudioContext
const audioCtx = new Audiocontext();

const soundbuffers = new Map();
const activeFetches = new Map()

preloadSounds();

function preloadSounds() {
    preloadSound("/audio/button.wav")
    preloadSound("/audio/rebirth.wav")
    preloadSound("/audio/upgrade.wav")
}

async function preloadSound(url) {
    if (soundbuffers.has(url)) return soundbuffers.get(url)
    if (activeFetches.has(url)) return activeFetches.get(url)

    const loadPromise = fetch(url)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            soundbuffers.set(url, audioBuffer)
            return audioBuffer
        })
        .catch(err => console.error(`Audio load failed: ${url}`, err))

    activeFetches.set(url, loadPromise)
    return loadPromise
}

export function playSound(url, randomness = 0) {
    if (audioCtx.state === 'suspended') audioCtx.resume()

    const buffer = soundbuffers.get(url)
    if (!buffer) {
        preloadSound(url)
        return
    }

    const source = audioCtx.createBufferSource()
    source.buffer = buffer

    if (randomness > 0) {
        const rate = 1 + (Math.random() * randomness * 2 - randomness)
        source.playbackRate.value = rate
    }

    const gainNode = audioCtx.createGain()

    source.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    source.start(0)
}
