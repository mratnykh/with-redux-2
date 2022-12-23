import type { NextPage } from 'next'

import Counter from '../components/Counter'
import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <div>
      <header className={styles.header}>
        <Counter />
      </header>
    </div>
  )
}

export default IndexPage
