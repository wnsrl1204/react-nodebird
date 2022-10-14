import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }

  ${
    "" /* .ant-card-cover {
    transform: none !important;
  } */
  }
`;

export const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
  }
`;
