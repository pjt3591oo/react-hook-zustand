import { useContext } from 'react';
import { langContext } from '../context/lang';

const TitleChange = () => {
  const lang = useContext(langContext);
  return  (
    <div>{lang.title}</div>
  )
}

export default TitleChange;