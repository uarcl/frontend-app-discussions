import React from 'react';
import PropTypes from 'prop-types';

import MathJax from 'react-mathjax-preview';

const baseConfig = {
  showMathMenu: true,
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\\\(', '\\\\)'],
      ['\\(', '\\)'],
      ['[mathjaxinline]', '[/mathjaxinline]'],
      ['\\begin{math}', '\\end{math}'],
    ],
    displayMath: [
      ['[mathjax]', '[/mathjax]'],
      ['$$', '$$'],
      ['\\\\[', '\\\\]'],
      ['\\[', '\\]'],
      ['\\begin{displaymath}', '\\end{displaymath}'],
    ],
  },

  skipStartupTypeset: true,
};

function HTMLLoader({ htmlNode, componentId, cssClassName }) {
  return (
    <MathJax
      math={htmlNode}
      id={componentId}
      className={cssClassName}
      sanitizeOptions={{ USE_PROFILES: { html: true } }}
      config={baseConfig}
    />
  );
}

HTMLLoader.propTypes = {
  htmlNode: PropTypes.node,
  componentId: PropTypes.string,
  cssClassName: PropTypes.string,
};

HTMLLoader.defaultProps = {
  htmlNode: '',
  componentId: null,
  cssClassName: '',
};

export default HTMLLoader;
