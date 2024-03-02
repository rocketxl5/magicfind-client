import { forwardRef } from 'react'

const Container = forwardRef(function Container({ children, classList }, ref) {
    return (
        <div className={classList} ref={ref}>
            {children}
        </div>
    )
})

export default Container
