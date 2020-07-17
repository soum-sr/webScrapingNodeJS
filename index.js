const request = require("request-promise")
const cheerio = require("cheerio")

// file system
const fs = require(fs)
const json2csv = require("json2csv").Parser;

const movie = "https://www.imdb.com/title/tt7286456/?ref_=rvi_tt"

(async () => {
    let imdbData = []
    const response = await request({
        uri:movie,
        headers:{
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        },
        gzip:true
    })
})();
