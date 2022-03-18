import { render, screen } from '@testing-library/react';

import TitleChange from '../components/titleChange';
import Title from '../components/title';

import LangProvider from '../context/lang';

test('initilize', () => {
  const wrapper = ({children}) => <LangProvider>{children}</LangProvider>;
  render(<Title />, {wrapper});
  expect(
    screen.getByText(/^한국어/).textContent
  ).toBe('한국어');
})

test('click Change button', () => {
  const wrapper = ({children}) => <LangProvider>{children}</LangProvider>;
  render(
    <div>
      <TitleChange />
      <Title />
    </div>
  , {wrapper});

  // 클릭이벤트 발생
  screen.getByText(/^한국어/).click();
  expect(
    screen.getByText(/^language context/).textContent
  ).toBe('language context');

  // 클릭이벤트 발생
  screen.getByText(/^영어/).click();
  expect(
    screen.getByText(/^언어 컨텍스트/).textContent
  ).toBe('언어 컨텍스트');
})