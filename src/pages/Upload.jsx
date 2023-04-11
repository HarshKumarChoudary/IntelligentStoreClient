import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context'
import { Loader, Navbar } from '../components';
import styles from '../styles';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Upload = () => {
    const { address, createProducts, generateUrls, setQr } = useStateContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [csvfile, setCsvfile] = useState(undefined);
    const [urls, setURL] = useState([]);

    function importCSV() {

        let reader = new FileReader();
        reader.onload = async function (e) {
            setIsLoading(true);
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            let worksheet = workbook.Sheets['Sheet1'];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            let names = []
            let description = []
            let isbn = []
            let price = []
            for (var key in jsonData) {
                names.push(jsonData[key].Name);
                description.push(jsonData[key].Description);
                isbn.push(jsonData[key].ISBN);
                price.push(jsonData[key].Price);
            }
            const res = await createProducts(names, description, isbn, price);
            const res2 = await generateUrls(res);
            setURL(res2);
            var collect = []

            
            for (var x in res2) {
                var d = res2[x];
                const options = {
                    method: 'POST',
                    url: 'https://qrcode3.p.rapidapi.com/qrcode/text',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '33efbe6d70msh99b7f2040a4e0a1p14d79ejsn0c39bde04e0d',
                        'X-RapidAPI-Host': 'qrcode3.p.rapidapi.com'
                    },
                    data: d,
                    responseType: "arraybuffer"
                };

                await axios.request(options).then(
                    (response) => {
                        let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
                        collect.push("data:image/png;base64," + base64ImageString)
                    }
                )
                    .catch(function (error) {
                        console.error(error);
                    });
            }
            
            setQr(collect);
            navigate("qr");
            setIsLoading(false);
        };
        reader.readAsArrayBuffer(csvfile);
    };

    return (
        <>
                <div className="flex-1 mt-2 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar display="0" />
                {isLoading && <Loader />}
                <div className={`flex flex-col ${styles.hocContainer}`}>
                        <div className={`flex flex-col ${styles.hocContentBox}`}>
                            <div className={`flex flex-col ${styles.hocBodyWrapper}`}>
                                <div className="flex flex-col w-full mt-16">
                                    <h1 className={`flex ${styles.headText} head-text`}>Upload Products</h1>
                                    <br />
                                </div>
                        </div>
                            <div className='flex flex-row'>
                                <div className='flex flex-row'>
                                <div className='flex flex-1'>
                                    <div className="mx-auto max-w-2xl sm:mt-20 lg:max-w-4xl">
                                        <div className="sm:flex flex-col gap-4">
                                            <input
                                                className="border-none"
                                                type="file"
                                                name="file"
                                                placeholder={null}
                                                onChange={(event) => { setCsvfile(event.target.files[0]); }}
                                            />
                                        </div>
                                    </div>
                                    <button className={`${styles.btn} mt-24 h-16 bg-blue-500`} onClick={importCSV}>Upload the Excel</button>
                                    </div>
                                </div>
                            </div>
                            <p className={`mb-32 mt-20 ${styles.footerText}`}>Made with 💖</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Upload