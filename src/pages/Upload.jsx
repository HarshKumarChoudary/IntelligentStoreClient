import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context'
import { CustomButton, Loader } from '../components';
import styles from '../styles';
import template from '../assets/files/template.png';
import * as XLSX from 'xlsx';

const Upload = () => {
    const { address } = useStateContext();
    const navigate = useNavigate();
    const [csvfile, setCsvfile] = useState(undefined);

    function importCSV() {

        let reader = new FileReader();
        reader.onload = async function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            let worksheet = workbook.Sheets['Sheet1'];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            return jsonData;
        };
        reader.readAsArrayBuffer(csvfile);
    };


    if (!address) {
        return (
            <>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <div className="sm:flex hidden flex-row justify-center gap-4">
                    <CustomButton
                        btnType="button"
                        title={'Please first connect your wallet'}
                        styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                        handleClick={() => {
                            navigate('/offline-home');
                        }}
                    />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="flex-1">
                <div>
                    <div className="bg-white py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className={`${styles.headText}text-base font-semibold leading-7 text-indigo-600`}>Upload the <br /><br /><p className={`${styles.cardText} text-green-400`}>Product Details</p></h2>
                                <p className="mt-6 text-lg leading-8 text-pink-600">
                                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                        <div className="sm:flex hidden flex-row justify-center gap-4">
                                            <a href={template}>Want a Template?</a>
                                        </div>
                                    </div>
                                </p>
                                <p className="text-lg leading-8 text-pink-600">
                                    <div className="mx-auto mt-12 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                        <div className="sm:flex hidden flex-row justify-center gap-4">
                                            <input
                                                className="border-none justify-center place-content-center ml-52"
                                                type="file"
                                                name="file"
                                                placeholder={null}
                                                onChange={(event) => { setCsvfile(event.target.files[0]); }}
                                            />
                                        </div>
                                        <div className="sm:flex hidden flex-row justify-center gap-4">

                                            <CustomButton
                                                btnType="button"
                                                title={'Uplaod the CSV'}
                                                styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                                                handleClick={importCSV}
                                            />
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Upload