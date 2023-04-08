import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context'
import { CustomButton, Loader } from '../components';
import styles from '../styles';

const Validate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { getProductdetail, buyItem, listItem, address } = useStateContext();
    const [msg, setMsg] = useState(undefined);

    const getRes = async () => {
        setIsLoading(true);
        try {
            var res = await getProductdetail(id);
            console.log(res);
            var parsedData = parseData(res);
            console.log(parsedData);
            setMsg(parsedData);
            // title, isbn, owners (0th one is manufacturer), price, description, date
        } catch (error) {
            console.log(error);
            setMsg('Bad URL');
            navigate('/');
        }
        setIsLoading(false);
    }

    const buytheItem = () => {
        setIsLoading(true);
        buyItem(id);
        getRes();
    }

    const listit = () => {
        setIsLoading(true);
        listItem(id);
        getRes();
    }

    const parseData = (res) => {
        var data = {};
        data.title = res.title;
        data.description = res.description;
        data.owners = res.owners;

        var highbyte = parseInt(res.price["_hex"], 16);
        data.price = highbyte;
        highbyte = parseInt(res.isbn["_hex"], 16);
        data.isbn = highbyte;
        var time = parseInt(res.dateCreated["_hex"], 16);
        var timeInMiliseconds = time * 1000;
        highbyte = new Date(timeInMiliseconds).toLocaleDateString()
        data.date = highbyte;
        data.isListed = res.isListed;
        data.productId = res.productId;
        return data;
    }

    if (id === undefined ) {
        navigate('/');
    }

    return (
        <>
            <div className="flex-1">
                {isLoading && <Loader />}
                {isLoading && <Loader />}
                <div>
                    <div className="bg-white py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className={`${styles.headText}text-base font-semibold leading-7 text-indigo-600`}>Validate the QR code?<br /><br /></h2>
                                {
                                    msg !== undefined && (
                                        <>
                                            <div className='flex flex-col'>
                                                <div className="flex flex-col">
                                                    <h1 className='font-bold'>Product Name: </h1> {msg.title}
                                                    <br />
                                                    <h1 className='font-bold'>Product Description: </h1> {msg.description}
                                                    <br />
                                                    <h1 className='font-bold'>Product Price: </h1> {msg.price}
                                                    <br />
                                                    <h1 className='font-bold'>Product Manufactured Date (MM/DD/YYYY): </h1> {msg.date}
                                                    <br />
                                                    <h1 className='font-bold'>Product ISBN: </h1> {msg.isbn} 
                                                    <br />
                                                    <h1 className='font-bold'>Product is available for Sale: </h1> {msg.isListed === true ? "Yes" :"No"}
                                                </div>
                                                <div className='flex'>
                                                    <table class="table-fixed">
                                                        <thead>
                                                            <tr>
                                                                <th>Owner Index</th>
                                                                <th>Onwer's Address</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {msg.owners.map((owner, idx) => { return (<tr><td>{idx}</td><td>{owner}</td></tr>)})}
                                                            
                                                        </tbody>
                                                    </table>
    
                                                </div>
                                                <br />
                                                <div className="flex">
                                                    {msg.isListed === true && msg.owners[msg.owners.length - 1] !== address  && (<CustomButton
                                                        btnType="button"
                                                        title={'Buy the item'}
                                                        styles={'bg-[#8c6dfd]'}
                                                        handleClick={buytheItem}
                                                    />)}
                                                </div>
                                                <br />
                                                <div className="flex">
                                                    {msg.owners[msg.owners.length-1] === address && msg.isListed === false && (<CustomButton
                                                        btnType="button"
                                                        title={'Sell the item?'}
                                                        styles={'bg-[#8c6dfd]'}
                                                        handleClick={listit}
                                                    />)}
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                <p className="text-lg leading-8 text-pink-600">
                                    <div className="mx-auto mt-12 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                        
                                        <div className="sm:flex hidden flex-row justify-center gap-4">
                                            {msg === undefined &&(<CustomButton
                                                btnType="button"
                                                title={'Validate the product'}
                                                styles={'bg-[#8c6dfd]'}
                                                handleClick={getRes}
                                            />)}
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

export default Validate