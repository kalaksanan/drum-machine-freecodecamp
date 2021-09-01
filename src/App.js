import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { bankOne } from './bankOne'
import Pad from './component'

function App() {
  const name = 'Drum Machine'
  const [volume, setVolume] = useState(1)
  const [recording, setRecording] = useState('')
  const [speed, setSpeed] = useState(0.5)
  const [onOff, setOnOff] = useState(true)

  const playRecording = () => {
    let index = 0
    let arrayRecord = [...recording]
    const interval = setInterval(() => {
      const audioTag = document.getElementById(arrayRecord[index])
      console.log(audioTag)
      audioTag.currentTime = 0
      audioTag.play()
      audioTag.volume = volume
      index++
    }, speed * 600)
    setTimeout(() => {
      clearInterval(interval)
    }, 600 * speed * arrayRecord.length - 1)
  }

  const handleOnOff = () => {
    setOnOff(!onOff)
  }

  return (
    <div className='App'>
      <div id='drum-machine' className='container bg-info'>
        <h1 className='text-center'>{name}</h1>
        <div id='display' className='row align-items-center'>
          <div className='col'>
            {bankOne.map((item) => (
              <Pad
                className='drum-pad'
                key={item.id}
                item={item}
                volume={volume}
                setRecording={setRecording}
                onOff={onOff}
              />
            ))}
          </div>
          <div className='col'>
            <h4>Power</h4>
            <div
              onClick={handleOnOff}
              className={`btn ${onOff ? 'btn-light' : 'btn-danger'}`}
            >
              {onOff ? 'Turn Off' : 'Turn On'}
            </div>
            <h4 className='text-center'>Volume</h4>
            <input
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              type='range'
              min='0'
              max='1'
              step='0.01'
              className='w-50 form-range'
            />
            <h3>{recording}</h3>
            {recording && (
              <>
                <div onClick={playRecording} className='btn btn-primary'>
                  Play
                </div>
                <div
                  onClick={(e) => setRecording('')}
                  className='btn btn-warning'
                >
                  Remove
                </div>
                <br />
                <input
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  type='range'
                  min='0.1'
                  max='1.2'
                  step='0.01'
                  className='w-50 form-range'
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
