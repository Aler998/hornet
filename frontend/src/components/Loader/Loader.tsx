import './Loader.css';

import { useEffect, useState } from 'react';

type DelayedLoaderProps = {
  isLoading: boolean;
  minDelay?: number;
};

const Loader = ({
  isLoading,
  minDelay = 1000,
}: DelayedLoaderProps) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isLoading) {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, minDelay);
    } else {
      setShowLoader(true);
    }

    return () => clearTimeout(timer);
  }, [isLoading, minDelay]);

  if (showLoader) {
    return <div id="loader-wrapper">
      <div className="loader">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="loader-circle-1"><div className="loader-circle-2"></div></div>
        <div className="needle"></div>
        <div className="loading">Loading</div>
      </div>
    </div>;
  }

};

export default Loader;

