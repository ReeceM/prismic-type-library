import React from 'react'

const TableColumn = ({ children, className }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className ?? ''}`}>
    {children}
  </td>
)

export default TableColumn;
