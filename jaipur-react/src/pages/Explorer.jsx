import React from 'react';
import InteractiveMap from '../InteractiveMap';
import './Explorer.css';

const Explorer = () => {
  return (
    <div className="explorer-page-dedicated">
      {/* 
        The InteractiveMap already handles its own fullscreen logic. 
        We force it into its immersive mode here.
      */}
      <InteractiveMap forcedFullscreen={true} />
    </div>
  );
};

export default Explorer;
