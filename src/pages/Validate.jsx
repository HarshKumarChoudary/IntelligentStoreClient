import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../context'
import { CustomButton, Loader } from '../components';
import styles from '../styles';
import { Navbar } from 'react-bootstrap';

const Validate = () => {
    const { code, isbn } = useParams();
    const { getProductdetail } = useStateContext();
    const [msg, setMsg] = useState({ name: '', description: '' });
    const [url, setUrl] = useState('');

    const getRes = async () => {
        try {
            console.log(code);
            var address = atob(code);
            var isb = Number(isbn);
            console.log(address);
            console.log(isb);
            var res = await getProductdetail(address, isb);
            console.log(res);
            setMsg(res);
        } catch (error) {
            console.log(error);
            setMsg('Bad URL');
        }
    }

    if (code === undefined || isbn === undefined) {
        navigate('/');
    }

    return (
        <>
            <div className="flex-1">
                <div>
                    <div className="bg-white py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className={`${styles.headText}text-base font-semibold leading-7 text-indigo-600`}>Validate the QR code?<br /><br /></h2>
                                <p className="text-lg leading-8 text-pink-600">
                                    <div className="mx-auto mt-12 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                        
                                        <div className="sm:flex hidden flex-row justify-center gap-4">

                                            <CustomButton
                                                btnType="button"
                                                title={'Validate the product'}
                                                styles={'bg-[#8c6dfd]'}
                                                handleClick={getRes}
                                            />
                                        </div>
                                    </div>
                                </p>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <p>
                                    Name of Product: {msg.name}
                                    <br />
                                    Description of Product: {msg.description}
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Validate