import { Button, LinkButton } from 'components/buttons'
import { LabeledInput, LabeledTextArea } from 'components/forms'
import LabelTable from 'components/tables/label-table'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { RoutesMapBase } from 'routes'
import { animationCommon } from './animation-common'

export function CreatePodcastDetail() {
    const formik = useFormik({
        initialValues: {
            episodeTitle: '',
            description: '',
            keywords: '',
            seriesNum: '',
            episodeNum: '',
        },
        onSubmit: (values) => {},
    })

    const footer = useMemo(
        () => (
            <div className="flex flex-col gap-3 lg:flex-row justify-between bg-gray-300 p-5">
                <Button onClick={() => {}}>Create Podcast</Button>
                <LinkButton secondary to={RoutesMapBase.podcasts.path}>
                    Discard
                </LinkButton>
            </div>
        ),
        []
    )
    return (
        <motion.div
            {...animationCommon}
            className="flex flex-col items-center w-full"
            key="create-podcast-detail"
        >
            <LabelTable
                label="New Episode Details"
                className="w-11/12 lg:w-2/4 max-w-2xl"
                footer={footer}
            >
                <form className="px-5 py-10 space-y-4">
                    <LabeledInput
                        id="episodeTitle"
                        label="Episode Title"
                        onChange={formik.handleChange}
                        value={formik.values.episodeTitle}
                        error={formik.errors.episodeTitle}
                        type="text"
                    />
                    <LabeledTextArea
                        id="description"
                        label="Episode Description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={formik.errors.description}
                        type="text"
                    />
                    <LabeledInput
                        id="keywords"
                        label="Keywords"
                        onChange={formik.handleChange}
                        value={formik.values.keywords}
                        error={formik.errors.keywords}
                        type="text"
                    />
                    <LabeledInput
                        id="seriesNum"
                        label="Series #"
                        onChange={formik.handleChange}
                        value={formik.values.seriesNum}
                        error={formik.errors.seriesNum}
                        type="number"
                    />
                    <LabeledInput
                        id="episodeNum"
                        label="Episode #"
                        onChange={formik.handleChange}
                        value={formik.values.episodeNum}
                        error={formik.errors.episodeNum}
                        type="number"
                    />
                </form>
            </LabelTable>
        </motion.div>
    )
}
