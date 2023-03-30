import React from 'react'
import { Navbar } from 'react-bootstrap';
import { useStateContext } from '../context'
import styles from '../styles';


const Qr = () => {
const { qr } = useStateContext();
  return (
      <>
          <div className="flex-1 mt-2 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar display="0" />
          <div className={`flex flex-col ${styles.hocContainer}`}>
              <div className={`flex flex-col ${styles.hocContentBox}`}>
                  <div className={`flex flex-col ${styles.hocBodyWrapper}`}>
                          <div className="flex flex-row w-full mt-16">
                              {
                                  qr.map((q, i) => {
                                      return (<h1 className={`flex ${styles.headText} head-text`}><img src={q} alt="Qr Will appear here" /></h1>
                          )})    
                              }
                          <br />
                          </div>
                          <br />
                          <br />
                          <h1 className={`flex ${styles.headText} head-text`}><img src={qr} alt="Qr Will appear here" /></h1>
                  </div>
                  
                  <p className={`mb-32 mt-20 ${styles.footerText}`}>Made with 💖 by Harsh Kumar Choudhary</p>
              </div>
          </div>
      </div>
      </>
  )
}

export default Qr