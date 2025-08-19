export const createSpinningSound = () => {
  const audioContext = new ((window as any).webkitAudioContext ||
    AudioContext)()

  // Create a ticking sound that plays every 50ms during spinning
  const playTick = () => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Vary the frequency slightly for more interesting sound
    const baseFreq = 600
    const variation = Math.random() * 100 - 50 // ±50 Hz variation
    oscillator.frequency.setValueAtTime(
      baseFreq + variation,
      audioContext.currentTime,
    )
    oscillator.type = 'sine'
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.05,
    )

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.05)
  }

  playTick()

  const tickInterval = setInterval(playTick, 50)

  return () => {
    clearInterval(tickInterval)
    audioContext.close()
  }
}

export const createWinnerSound = (): AudioContext => {
  const audioContext = new ((window as any).webkitAudioContext ||
    AudioContext)()

  // Create multiple oscillators for a rich confetti-like sound
  const createConfettiSound = () => {
    // Create multiple overlapping sounds for confetti effect
    for (let i = 0; i < 8; i++) {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()

      oscillator.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Random frequency for confetti-like effect
      const baseFreq = 200 + Math.random() * 800
      const delay = Math.random() * 0.5 // Random delay up to 0.5s
      const duration = 0.3 + Math.random() * 0.4 // Random duration

      oscillator.frequency.setValueAtTime(
        baseFreq,
        audioContext.currentTime + delay,
      )
      oscillator.type = 'sawtooth' // Rich harmonic content

      // Filter for more natural sound
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(
        2000 + Math.random() * 1000,
        audioContext.currentTime + delay,
      )
      filter.Q.setValueAtTime(0.5, audioContext.currentTime + delay)

      // Envelope for confetti-like attack and decay
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay)
      gainNode.gain.linearRampToValueAtTime(
        0.1,
        audioContext.currentTime + delay + 0.01,
      )
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + delay + duration,
      )

      oscillator.start(audioContext.currentTime + delay)
      oscillator.stop(audioContext.currentTime + delay + duration)
    }

    // Add some high-pitched sparkle sounds
    for (let i = 0; i < 5; i++) {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      const sparkleFreq = 1500 + Math.random() * 1000
      const delay = Math.random() * 0.8
      const duration = 0.1 + Math.random() * 0.2

      oscillator.frequency.setValueAtTime(
        sparkleFreq,
        audioContext.currentTime + delay,
      )
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay)
      gainNode.gain.linearRampToValueAtTime(
        0.05,
        audioContext.currentTime + delay + 0.005,
      )
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + delay + duration,
      )

      oscillator.start(audioContext.currentTime + delay)
      oscillator.stop(audioContext.currentTime + delay + duration)
    }
  }

  createConfettiSound()

  return audioContext
}
