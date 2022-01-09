export const animationCommon = {
    animate: {
        opacity: 1,
        transition: {
            ease: 'easeInOut',
            duration: 0.2,
        },
    },
    initial: {
        opacity: 0,
    },
    exit: {
        opacity: 0,
        x: 100,
        transition: {
            ease: 'easeOut',
            duration: 5,
        },
    },
}
