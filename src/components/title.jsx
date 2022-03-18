import { useContext } from 'react';
import { langContext } from '../context/lang';

const Title = () => {
  const lang = useContext(langContext);
  return  (
    <div>
      <button onClick={lang.onChange}>{lang.mode === 'kr'? '한국어': '영어'}</button>
    </div>
  )
}

export default Title;