import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context'
import { CustomButton, Loader } from '../components';
import styles from '../styles';
import template from '../assets/files/template.png';
import * as XLSX from 'xlsx';

const Validate = () => {
    const { getProductdetail } = useStateContext();
    const [msg, setMsg] = useState({name:'', description:''});
    const [url, setUrl] = useState('');

    async function ValidateURL() {
        var list = url.split('/');
        if (list.length != 2) {
            setMsg('Bad URL');
        } else {
            try {
                var address = atob(list[0]);
                var isbn = Number(list[1]);
                var res = await getProductdetail(address, isbn);
                console.log(res);
                setMsg(res);
            } catch (error) {
                console.log(error);
                setMsg('Bad URL');
            }
        }
    };

    return (
        <>
            <div className="flex-1">
                <div>
                    <div className="bg-white py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className={`${styles.headText}text-base font-semibold leading-7 text-indigo-600`}>Validate the <br /><br /><p className={`${styles.cardText} text-green-400`}>URL</p></h2>
                                <p className="text-lg leading-8 text-pink-600">
                                    <div className="mx-auto mt-12 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                        <div className="sm:flex hidden flex-row justify-center gap-4">
                                            <input
                                                className="justify-center place-content-center ml-16"
                                                type="text"
                                                placeholder="Enter the Unique Code"
                                                name="text"
                                                onChange={(event) => setUrl(event.target.value)}
                                            />
                                        </div>
                                        <div className="sm:flex hidden flex-row justify-center gap-4">

                                            <CustomButton
                                                btnType="button"
                                                title={'Validate the product'}
                                                styles={'bg-[#8c6dfd]'}
                                                handleClick={ValidateURL}
                                            />
                                        </div>
                                    </div>
                                </p>
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