import React from 'react'

const page = ({
  params,
  searchParams
}: {params: any, searchParams:any}) => {
  console.log(`params`, params)
  console.log(`searchParams`, searchParams)
  return (
    <div>Lesson of Course</div>
  )
}

export default page