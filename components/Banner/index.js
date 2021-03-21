import React, { useState } from 'react'
import SimpleBanner from './banner';

const Banner = ({
  slice,
  icon
}) => {

  const [dismissed, setDismissed] = useState(false);

  function dismissNotice(e) {
    setDismissed(true);

    localStorage.setItem('noticeDismissed', JSON.stringify({
      version: process.env.VERCEL_GIT_COMMIT_REF ?? new Date()
    }));
  }

  return (
    <>
      {
        !dismissed
          ? <SimpleBanner
          {...slice}
          icon={icon}
          onDismissed={dismissNotice}
        />
          : null
      }
    </>
  )
}

export default Banner;
