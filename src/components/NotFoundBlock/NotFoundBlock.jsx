import React from 'react'

import styles from './NotFoundBlock.module.scss'
const NotFoundBlock = () => {
  return (
		<div className={styles.root}>
			<h1>Такой страницы не существует</h1>
			<span className={styles.emojy}>😕</span>
		</div>
  );
}

export default NotFoundBlock