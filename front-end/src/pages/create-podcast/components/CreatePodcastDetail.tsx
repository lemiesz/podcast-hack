import { Button, LinkButton } from 'components/buttons'
import { LabeledInput, LabeledTextArea } from 'components/forms'
import { UploadField } from 'components/forms/upload-field'
import LabelTable from 'components/tables/label-table'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { RoutesMapBase } from 'routes'
import { animationCommon } from './animation-common'
import * as yup from 'yup'
import { podcastSchema } from 'api'
import { useRouteMatch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'store'
import { fetchPodcastById } from 'store/podcast'

export function CreatePodcastDetail() {
    const { params } = useRouteMatch<{ id: string }>()
    const item = useSelector((state: StoreState) => state.podcasts[params.id])
    const formRef = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            episodeTitle: item?.name || '',
            description: '',
            keywords: '',
            seriesNum: '',
            episodeNum: '',
            podcastFile: null,
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            episodeTitle: podcastSchema.fields.name.clone(),
            description: podcastSchema.fields.description.clone(),
            keywords: podcastSchema.fields.keywords.clone(),
            seriesNum: podcastSchema.fields.seriesNum.clone(),
            episodeNum: podcastSchema.fields.episodeNum.clone(),
            podcastFile: yup
                .mixed()
                .test(
                    'fileSize',
                    'file breaches maximum size',
                    (value: File) => value && value.size >= 10000000
                )
                .required('Required'),
        }),
        onSubmit: (values) => {
            // api.updatePodcast({ id: params.id, ...values })
        },
    })

    useEffect(() => {
        dispatch(fetchPodcastById(params.id))
    }, [dispatch, params.id])

    const footer = useMemo(
        () => (
            <div className="flex flex-col gap-3 lg:flex-row justify-between bg-gray-300 p-5">
                <Button form="creation-form" type="submit">
                    Create Podcast
                </Button>
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
                <form
                    id="creation-form"
                    ref={formRef}
                    onSubmit={formik.handleSubmit}
                    className="px-5 py-10 space-y-4"
                >
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
                    <UploadField
                        label="Upload Podcast"
                        error={formik.errors.podcastFile}
                        onChange={(f) => formik.setFieldValue('podcastFile', f)}
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
