import React from 'react';
import PropTypes from 'prop-types';

export const Loader = <p className="card-text placeholder-glow">
    <span className="placeholder col-7"></span>
    <span className="placeholder col-6"></span>
    <span className="placeholder col-8"></span>
</p>;

export const SingleLineBigLoader = <p className="card-text placeholder-glow">
    <span className="placeholder col-12"></span>
</p>;

export const SingleLineMediumLoader = <p className="card-text placeholder-glow">
    <span className="placeholder col-7"></span>
</p>;

export const SingleLineSmallLoader = <p className="card-text placeholder-glow">
    <span className="placeholder col-5"></span>
</p>;

export const SingleLineLittleLoader = <p className="card-text placeholder-glow">
    <span className="placeholder col-3"></span>
</p>;

const LoadingWrapper = ({ loading, children, loader = Loader }) => {
    return (
      <>
          {loading ? loader : children}
      </>
    );
};

LoadingWrapper.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    loader: PropTypes.node
};

export default LoadingWrapper;
