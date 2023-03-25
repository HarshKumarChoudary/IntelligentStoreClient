import React from 'react';
import styles from '../styles';
import store from '../assets/store.png';
import { useNavigate } from 'react-router-dom';

const First = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.hocContainer}>
            <div className={styles.hocContentBox}>
                <div className={styles.hocBodyWrapper}>
                    <div className="flex flex-row w-full">
                        <h1 className={`flex ${styles.headText} head-text`}>Welcome to Smart <br /> Market-place</h1>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <div className='flex flex-1'>
                                <button className={`${styles.btn} bg-yellow-500`} onClick={() => { navigate('/nft-home')}}>Trade Digital Items</button>
                        </div>
                        <div className='flex flex-1'>
                            <button className={`${styles.btn} bg-green-500`} onClick={() => {navigate('/offline-home')}}>Trade Offline Securely</button>
                        </div>
                    </div>
                </div>
                    <br />
                    <br />
                    <br />
                <p className={styles.footerText}>Made with 💖 by Harsh Kumar Choudhary</p>
            </div>
            <div className="flex flex-1 justify-center p-8">
                <img src={store} alt="Store-image" className='float'/>
            </div>
            </div>
        </>
  )
}

export default First