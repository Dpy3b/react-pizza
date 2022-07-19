import React, { FC } from 'react'

import styles from './NotFoundBlock.module.scss'
const NotFoundBlock:FC = () => {
  return (
		<div className={styles.root}>
			<h1>Такой страницы не существует</h1>
			<span className={styles.emojy}>😕</span>
		</div>
  );
}

export default NotFoundBlock