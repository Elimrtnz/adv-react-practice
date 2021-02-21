import { checkPropTypes } from "prop-types"

export default function Page({children, cool}) {
    return <div>
        {children}
    </div>
}

// defines prop types
Page.prototypes = {
    cool: checkPropTypes.toString,
    children: checkPropTypes.any,
};