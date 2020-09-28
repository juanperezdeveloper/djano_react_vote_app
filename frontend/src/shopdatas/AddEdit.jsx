import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { shopdataService } from '../_services/shopdata_service';
import { alertService } from '../_services/alert.service';


function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const initialValues = {
    nfcID: '',
    nfcStoreID: '',
    storeName: '',
    storeAddress: '',
    storePostcode: '',
    storeCity: '',
    longtitude: '',
    latitude: '',
  };

  const validationSchema = Yup.object().shape({
    nfcID: Yup.string()
      .required('NFC_ID  is required'),
    nfcStoreID: Yup.string()
      .required('NFC_STORE_ID is required'),
    storeName: Yup.string()
      .required('Store Name is required'),
    storeAddress: Yup.string()
      .required('Store Address is required'),
    storePostcode: Yup.string()
      .required('Store PostCard is required'),
    storeCity: Yup.string()
      .required('Store City is required'),
    longtitude: Yup.string()
      .required('Longtitude is required'),
    latitude: Yup.string()
      .required('Latitude is required'),
    picture: Yup.string()
      .required('picture is required'),
    // role: Yup.string()
    //   .required('Role is required'),
    // password: Yup.string()
    //   .concat(isAddMode ? Yup.string().required('Password is required') : null)
    //   .min(6, 'Password must be at least 6 characters'),
    // confirmPassword: Yup.string()
    //   .when('password', (password, schema) => {
    //     if (password || isAddMode) return schema.required('Confirm Password is required');
    //   })
    //   .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    // setStatus();
    // if (isAddMode) {
    //   createUser(fields, setSubmitting);
    // } else {
    //   updateUser(id, fields, setSubmitting);
    // }
    console.log(fields);
  }

  function createUser(fields, setSubmitting) {
    shopdataService.create(fields)
      .then(() => {
        alertService.success('User added', { keepAfterRouteChange: true });
        history.push('.');
      })
      .catch(() => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  function updateUser(id, fields, setSubmitting) {
    shopdataService.update(id, fields)
      .then(() => {
        alertService.success('User updated', { keepAfterRouteChange: true });
        history.push('..');
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        const [user, setUser] = useState({});
        const [showPassword, setShowPassword] = useState(false);

        useEffect(() => {
          if (!isAddMode) {
            // get user and set form fields
            shopdataService.getById(id).then(user => {
              const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
              fields.forEach(field => setFieldValue(field, user[field], false));
              setUser(user);
            });
          }
        }, []);

        return (
          <Form className="addedit-form">
            <h1>{isAddMode ? 'Add ShopData' : 'Edit ShopData'}</h1>
            <div className="form-row">
              <div className="form-group col-3">
                <label>NFC_ID</label>
                <Field name="nfcID" type="text" className={'form-control' + (errors.nfcID && touched.nfcID ? ' is-invalid' : '')} />
                <ErrorMessage name="nfcID" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-3">
                <label>NFC_STORE_ID</label>
                <Field name="nfcStoreID" type="text" className={'form-control' + (errors.nfcStoreID && touched.nfcStoreID ? ' is-invalid' : '')} />
                <ErrorMessage name="nfcStoreID" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-3">
                <label>STORE_NAME</label>
                <Field name="storeName" type="text" className={'form-control' + (errors.storeName && touched.storeName ? ' is-invalid' : '')} />
                <ErrorMessage name="storeName" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-3">
                <label>STORE_ADDRESS</label>
                <Field name="storeAddress" type="text" className={'form-control' + (errors.storeAddress && touched.storeAddress ? ' is-invalid' : '')} />
                <ErrorMessage name="storeAddress" component="div" className="invalid-feedback" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-3">
                <label>STORE_POSTCODE</label>
                <Field name="storePostcode" type="text" className={'form-control' + (errors.storePostcode && touched.storePostcode ? ' is-invalid' : '')} />
                <ErrorMessage name="storePostcode" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-3">
                <label>STORE_CITY</label>
                <Field name="storeCity" type="text" className={'form-control' + (errors.storeCity && touched.storeCity ? ' is-invalid' : '')} />
                <ErrorMessage name="storeCity" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-3">
                <label>LONGTITUDE</label>
                <Field name="longtitude" type="text" className={'form-control' + (errors.longtitude && touched.longtitude ? ' is-invalid' : '')} />
                <ErrorMessage name="longtitude" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-3">
                <label>LATITUDE</label>
                <Field name="latitude" type="text" className={'form-control' + (errors.latitude && touched.latitude ? ' is-invalid' : '')} />
                <ErrorMessage name="latitude" component="div" className="invalid-feedback" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-3">
                <label>PICTURE</label>
                <Field name="picture" type="file" className={'form-control' + (errors.picture && touched.picture ? ' is-invalid' : '')} />
                <ErrorMessage name="picture" component="div" className="invalid-feedback" />
              </div>
              <div className="from-group col-3 imgPreview">

              </div>
            </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
              <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export { AddEdit };