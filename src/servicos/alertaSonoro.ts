let audio: AudioContext | null = null

export function prepararAudio() {
  try {
    audio ??= new AudioContext()
    if (audio.state === 'suspended') void audio.resume()
  } catch {
    // navegador sem suporte a audio
  }
}

export function tocarAlerta() {
  try {
    audio ??= new AudioContext()
    const oscilador = audio.createOscillator()
    const volume = audio.createGain()
    oscilador.frequency.value = 880
    volume.gain.setValueAtTime(0.25, audio.currentTime)
    volume.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.8)
    oscilador.connect(volume).connect(audio.destination)
    oscilador.start()
    oscilador.stop(audio.currentTime + 0.8)
  } catch {
    //sem audio
  }
}
