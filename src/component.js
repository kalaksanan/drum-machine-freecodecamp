import React, { useEffect, useState } from 'react'

function Component({ item, volume, setRecording, onOff }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })
  const handleKeyPress = (e) => {
    if (e.keyCode === item.keyCode) {
      playSound()
    }
  }

  const playSound = () => {
    const audioTag = document.getElementById(item.keyTrigger)
    audioTag.currentTime = 0

    onOff ? audioTag.play() : console.log('off')

    audioTag.volume = volume
    setActive(true)
    setTimeout(() => {
      setActive(false)
    }, 200)

    onOff
      ? setRecording((prev) => prev + item.keyTrigger + '')
      : console.log('off')
  }
  return (
    <div
      onClick={playSound}
      className={`btn btn-secondary p-4 m-3 drum-pad ${active && 'btn-danger'}`}
      id={item.id}
    >
      <audio className='clip' id={item.keyTrigger} src={item.url} />
      {item.keyTrigger}
    </div>
  )
}

export default Component
