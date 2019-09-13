import styled, { createGlobalStyle } from 'styled-components';
import * as chroma from 'chroma-js';

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
      margin:0;
      padding:0;
      border:0;
      outline:0;
      font-size:100%;
      vertical-align:baseline;
      background:transparent;
  }
  html, body {
    height: 100%;
    font-family: Open Sans, sans-serif;
    font-weight: 300;
  }
  html {
    color: #333;
    font-size: 16px;
    line-height: 1.45;
  }
  body {
    overflow: hidden;
  }
  button, input, select {
    -webkit-appearance: none;
    font-size: 100%;
  }
  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const App = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
`;

export const Container = styled.div`
  flex-grow: 1;
  flex-direction: column;
  background: ${chroma.lch(100, 5, 180).css()};
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
`;