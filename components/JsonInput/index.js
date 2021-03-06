import React, { useState } from 'react'

const JsonInput = ({ onUpdated, newJson }) => {

  const [json, setJson] = useState(JSON.stringify(newJson, null, 2));

  function parseJson(rawJson) {
    let parsed = {};

    try {
      parsed = JSON.parse(rawJson);
      onUpdated(parsed);
    } catch (error) {
      parsed = error
    }

    setJson(parsed);
  }

  return (
    <textarea
      rows={3}
      defaultValue={json}
      className="mt-1 flex justify-center w-full px-6 pt-5 pb-6 border border-gray-300 focus:ring-teal-500 focus:border-teal-500 rounded-md"
      onBlur={e => setJson(parseJson(e.target.value))}
    >
    </textarea>
  )
}

export default JsonInput;
