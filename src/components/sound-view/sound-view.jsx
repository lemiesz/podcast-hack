import { useEffect, useReducer, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import { PlayIcon } from '@heroicons/react/solid'
import { PauseIcon } from '@heroicons/react/outline'
import produce from '@reduxjs/toolkit/node_modules/immer'

const initialState = {
    /**
     * normalized index of regions keyed by region id.
     *
     * Region object shape is described in wavesurfer.js
     */
    regions: {},
}

/**
 *
 * @param {*} state - state as described by intital state above
 * @param {*} action - action object with type and payload. Shapes described below
 *
 * @returns
 */
function reducer(state, action) {
    switch (action.type) {
        case 'updateRegion':
            /**
             * action fired when a region is updated. The action should look as followd.
             * {
             *  type: "updateRegion",
             *  payload: Region (region is exactly region object from wavesurfer.js)
             * }
             */
            return {
                // Todo: this is not the best way to do this. it should be done with immer
                regions: {
                    ...state.regions,
                    [action.payload.id]: action.payload,
                },
            }
        case 'removeRegion':
            return produce(state, (draft) => {
                delete draft.regions[action.payload]
                return draft
            })
        default:
            throw new Error()
    }
}

export function SoundView(props) {
    const waveformRef = useRef(null)
    const trackRef = useRef(null)
    const waveSurferRef = useRef(null)
    const [state, dispatch] = useReducer(reducer, initialState)
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

    // register some listeners when the component mounts
    useEffect(() => {
        waveSurferRef.current.on('region-click', (e) => {
            alert('region clicked' + e.start + ' ' + e.end)
        })
        waveSurferRef.current.on('region-created', (e) => {
            // alert('region created' + e.start + ' ' + e.end)
        })
        waveSurferRef.current.on('region-update-end', (e) => {
            dispatch({ type: 'updateRegion', payload: e })
        })
        waveSurferRef.current.on('region-removed', (e) => {
            dispatch({ type: 'removeRegion', payload: e.id })
        })
        return () => waveSurferRef.current.unAll()
    }, [])

    // effect when a new region is created
    useEffect(() => {})

    // grid of elements using tailwind
    console.log('Rerendering')

    return (
        <div className="w-full h-full p-10">
            <h1 className="font-bold text-lg">{props.audioUrl}</h1>
            {<div ref={waveformRef} id="waveform" />}
            <audio src={props.audioUrl} ref={trackRef} />
            <button onClick={togglePlay}>
                {!playingAudio ? (
                    <PlayIcon className="w-24 h-24" />
                ) : (
                    <PauseIcon className="w-24 h-24" />
                )}
            </button>
            <h2 className="font-bold">Ad Regions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 auto-rows-auto">
                {Object.values(state.regions).map((region) => (
                    <div
                        key={region.id + Date.now()}
                        className="flex-col max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mb-5 gap-5"
                    >
                        <div>{region.id}</div>
                        <div>{region.start}</div>
                        <div>{region.end}</div>
                        <button
                            onClick={() => {
                                region.remove()
                            }}
                            className="rounded-full bg-red-400 hover:bg-red-600 p-2 text-white"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
