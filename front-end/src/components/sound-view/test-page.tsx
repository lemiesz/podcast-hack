import { SoundView } from './sound-view'
const testFile = require('./test.mp3')

export default function TestSurferPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <SoundView audioUrl={testFile} />
        </div>
    )
}
