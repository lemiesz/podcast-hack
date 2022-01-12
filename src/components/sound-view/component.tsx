import { api } from 'api'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { StoreState } from 'store'
import { SoundView } from './sound-view'

export default function SoundViewPage() {
    const [file, setFile] = useState<string>('')
    const { params } = useRouteMatch<{ id: string }>()
    const item = useSelector((state: StoreState) => state.podcasts[params.id])

    useEffect(() => {
        if (!item.fileLocation) {
            return
        }
        api.storageLoactionToUrl(item.fileLocation).then((result) => {
            console.log(result)
            setFile(result)
        })
    }, [item.fileLocation])
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center h-screen"
        >
            <SoundView audioUrl={file} />
        </motion.div>
    )
}
