export const animationCommon = {
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeInOut',
            duration: 0.2,
        },
    },
    initial: {
        opacity: 0,
        x: 100,
    },
    exit: {
        opacity: 0,
        x: -100,
        transition: {
            ease: 'easeOut',
            duration: 0.2,
        },
    },
}
