const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3dd6742bf6684e3b954119547f9812a2');

newsRouter.get('', async(req, res) => {

    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=keyword&apiKey=3dd6742bf6684e3b954119547f9812a2`)
        res.render('news', { articles: newsAPI.data.articles })
        //console.log(newsAPI.data)
    } catch (err) {
        if(err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request){
            console.log(err.request)
        } else {
            console.log('Error', err.message)
        }

    }
})

newsRouter.get('/:id', async(req, res) => {
    let articleID = req.params.id

    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=${articleID}&apiKey=3dd6742bf6684e3b954119547f9812a2`)
        res.render('newsSingle', { article : newsAPI.data.articles})
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSingle', { article : null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.post('', async(req, res) => {
    let search = req.body.search

    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=3dd6742bf6684e3b954119547f9812a2`)
        res.render('newsSearch', { articles : newsAPI.data.articles})
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})



module.exports = newsRouter 