const loading = () => {
    return (
        <div className='grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start'>
            <div></div>
            <div>
                 <div className='h-3 w-full rounded-full mb-2 skeleton'>
                </div>
            </div>
        </div>
    )
}

export default loading