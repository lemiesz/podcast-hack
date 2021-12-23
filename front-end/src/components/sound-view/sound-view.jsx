import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import { PlayIcon } from '@heroicons/react/solid'
import { PauseIcon } from '@heroicons/react/outline'

export function SoundView(props) {
    const waveformRef = useRef(null)
    const trackRef = useRef(null)
    const waveSurferRef = useRef(null)
    const [playingAudio, setPlayingAudio] = useState(false)

    useEffect(() => {
        if (!trackRef.current) {
            return
        }
        console.log('running effect')
        const waveSurfer = waveSurferRef.current
        if (waveSurfer == null) {
            // First render
            const regions = RegionsPlugin.create({})
            console.log(regions)
            const wavesurfer = WaveSurfer.create({
                container: '#waveform',
                responsive: true,
                backend: 'MediaElement',
                waveColor: 'violet',
                progressColor: 'purple',
                plugins: [regions],
            })
            wavesurfer.enableDragSelection({})
            waveSurferRef.current = wavesurfer
            wavesurfer.load(trackRef.current)
        } else {
            waveSurfer.load(trackRef.current)
        }
    }, [props.audioUrl])

    function togglePlay() {
        if (playingAudio) {
            waveSurferRef.current.pause()
            setPlayingAudio(false)
        } else {
            waveSurferRef.current.play()
            setPlayingAudio(true)
        }
    }

    useEffect(() => {
        waveSurferRef.current.on('region-click', (e) => {
            alert('region clicked' + e.start + ' ' + e.end)
        })
    })

    return (
        <div className="w-full h-full p-10">
            {<div ref={waveformRef} id="waveform" />}
            <audio src={props.audioUrl} ref={trackRef} />
            <button onClick={togglePlay}>
                {!playingAudio ? (
                    <PlayIcon className="w-24 h-24" />
                ) : (
                    <PauseIcon className="w-24 h-24" />
                )}
            </button>
        </div>
    )
}
