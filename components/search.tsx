import { SearchOutlined } from '@ant-design/icons';
import styles from '../styles/components/Search.module.css'

type Props = {
  onChange?: (value: string) => void
}

const Search = (props: Props) => {
  return (
    <div className={`${styles['wrapper']}`}>
      <SearchOutlined className={`${styles['anticon-search']}`} />
      <input 
        placeholder="Search todos" 
        className={`${styles['search']}`}
        onChange={(e) => props.onChange && props.onChange(e.target.value)}
      />
    </div>
  )
}

export default Search
