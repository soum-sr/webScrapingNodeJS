const request = require("request-promise")
const cheerio = require("cheerio")

// file system
const fs = require("fs")
const json2csv = require("json2csv").Parser;

const movies = [
    "https://www.imdb.com/title/tt7286456/?ref_=rvi_tt",
    "https://www.imdb.com/title/tt0993846/?ref_=tt_sims_tti",
    "https://www.imdb.com/title/tt4154756/?ref_=tt_sims_tti"

];

(async () => {
    let imdbData = []
    
    for (let movie of movies){

    const response = await request({
        uri:movie,
        headers:{
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        },
        gzip:true
    });

    let $ = cheerio.load(response);
    let title = $('div[class="title_wrapper"] > h1').text().trim()
    let summary = $('div[class="summary_text"]').text().trim()
    let rating = $('div[class="ratingValue"] > strong > span').text()
    let releaseDate = $('a[title="See more release dates"]').text().trim()

    imdbData.push({
        title,
        rating,
        summary,
        releaseDate
    });
    }

    const j2csv = new json2csv()
    const csv = j2csv.parse(imdbData)

    fs.writeFileSync("./imdb.csv", csv, "utf-8")
}

)();
