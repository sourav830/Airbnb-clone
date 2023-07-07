import React, { useEffect, useState } from "react";
import axios from 'axios';
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const { id } = useParams();
    // console.log({ id });
    const [title, setTitle] = useState();
    const [address, setAddress] = useState('');
    const [addedPhoto, setAddedPhoto] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhoto(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuest(data.maxGuest);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    };
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    };
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    };
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhoto, description, perks, extraInfo, checkIn, checkOut, maxGuest, price,
        }
        if (id) {
            //update
            await axios.put('/places', {
                id,
                ...placeData,
            });
        } else {
            //new Place
            await axios.post('/places', { placeData });
        };
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <div>
                <AccountNav />
                <form onSubmit={savePlace} >
                    {preInput('Title', 'Title for the place, should be short and catchy as in advertisement')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apartment" />
                    {preInput('Address', 'address for the place')}
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                    {preInput('Photos', 'more = better')}
                    <PhotosUploader addedPhoto={addedPhoto} onChange={setAddedPhoto} />
                    {preInput('Description', 'Description of the place')}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                    {preInput('Perks', 'Select all the perks of the your place.')}
                    <Perks selected={perks} onChange={setPerks} />
                    {preInput('Extra Info', 'House rules, etc.')}
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                    {preInput('Check In & Out times', 'Add check in and out times, remember to have some time window for cleaning the room between guest.')}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                        <div>
                            <h3 className="mt-2 -bt-">Check In Time</h3>
                            <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14" />
                        </div>
                        <div>
                            <h3 className="mt-2 -bt-">Check Out Time</h3>
                            <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11" />
                        </div>
                        <div>
                            <h3 className="mt-2 -bt-">Max Guest</h3>
                            <input type="text" value={maxGuest} onChange={ev => setMaxGuest(ev.target.value)} placeholder="2" />
                        </div>
                        <div>
                            <h3 className="mt-2 -bt-">Price per Night</h3>
                            <input type="text" value={price} onChange={ev => setPrice(ev.target.value)} />
                        </div>
                    </div>
                    <button className="primary my-4">Save</button>
                </form>
            </div>
        </>
    )
}