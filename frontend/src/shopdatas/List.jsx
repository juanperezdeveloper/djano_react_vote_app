import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { shopdataService } from '../_services/shopdata_service';


function List({ match }) {
    const { path } = match;
    const [shopDatas, setShopDatas] = useState(null);

    useEffect(() => {
        shopdataService.getAll()
            .then(x => setShopDatas(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        shopdataService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>ShopData</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add ShopData</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '9%' }}>ID</th>
                        <th style={{ width: '9%' }}>NFC_ID</th>
                        <th style={{ width: '9%' }}>STORE_ID</th>
                        <th style={{ width: '9%' }}>STORE_NAME</th>
                        <th style={{ width: '9%' }}>STORE_ADRESS</th>
                        <th style={{ width: '9%' }}>STORE_POST_CORD</th>
                        <th style={{ width: '9%' }}>STORE_CITY</th>
                        <th style={{ width: '9%' }}>STORE_LONGTITUDE</th>
                        <th style={{ width: '9%' }}>STORE_LATITUDE</th>
                        <th style={{ width: '9%' }}>PICTURE</th>
                        <th style={{ width: '10%' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {shopDatas && shopDatas.map(shopData =>
                        <tr key={shopData.id}>
                            <td>{shopData.id}</td>
                            <td>{shopData.nfc_uid}</td>
                            <td>{shopData.nfc_store_id}</td>
                            <td>{shopData.store_name}</td>
                            <td>{shopData.store_address}</td>
                            <td>{shopData.store_postcode}</td>
                            <td>{shopData.stroe_city}</td>
                            <td>{shopData.longtitude}</td>
                            <td>{shopData.latitude}</td>
                            <td><img src="https://azure-django-service.azurewebsites.net/media/ss1.png" className="shop-image" /></td>
                            {/* <td>{shopData.store_picture}</td> */}
                            {/* <td>{shopData.store_picture}</td> */}
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${shopData.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(shopData.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={shopData.isDeleting}>Delete</button>
                                {/* <button onClick={() => deleteUser(shopData.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={shopData.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button> */}
                            </td>
                        </tr>
                    )}
                    {!shopDatas &&
                        <tr>
                            <td colSpan="12" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {shopDatas && !shopDatas.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };