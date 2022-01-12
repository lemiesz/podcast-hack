import React from 'react'
declare module '*.jpg' {
    const value: any
    export = value
}
declare module '*.png' {
    const value: any
    export = value
}

declare module '*.mp3' {
    const src: string
    export default src
}
declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    export default content
}

declare module 'wavesurfer.js' {
    const content: any
    export default content
}
