import React from 'react'


const StatusBadge = ({ props, status }) => {

  const color = status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  return <span className={`px-2 inline-flex text-xs items-center leading-5 tracking-wide font-semibold rounded-full ${color}`}>
    {
      status
        ? <span className="h-1.5 w-1.5 relative inline-flex rounded-full mr-1 bg-green-800"></span>
        : <span className="h-1.5 w-1.5 relative inline-flex rounded-full animate-pulse mr-1 bg-yellow-800"></span>
    }
    {
      status ? (props?.true ?? 'Reviewed') : (props?.false ?? 'Pending')
    }
  </span>
}
/*  */
export default StatusBadge;
