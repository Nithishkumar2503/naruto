import type React from "react"

interface PageHeaderProp{
    heading?:string
    subHeading?:string
}

const PageHeader:React.FC<PageHeaderProp>=({heading='',subHeading=''})=>{
    return (
        <div className="p-2 text-center py-4">
            <h1 className="text-2xl">{heading}</h1>
            <h1 className="text-secondary" >{subHeading}</h1>
        </div>
    )
}

export default PageHeader