// all middleware from app.js 😛🐸

const express = require('express')
const cors = require('cors')
const morgan = require('morgan');

module.exports = (app) => { 
    app.use(express.static('public'))
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({extended:true}))
    // ipn &&&&&&&& kore data ase
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
}