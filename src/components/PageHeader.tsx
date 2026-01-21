import type React from "react"

interface PageHeaderProp{
    heading?:string
    subHeading?:string
}

const PageHeader:React.FC<PageHeaderProp>=({heading='',subHeading=''})=>{
    return (
        <div className="p-2 text-center font-serif">
            <h1 className="lg:text-2xl text-xl text-white">{heading}</h1>
            <h1 className="text-secondary lg:text-md text-sm" >{subHeading}</h1>
        </div>
    )
}

export default PageHeader