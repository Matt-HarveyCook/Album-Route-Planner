import axios from 'axios'
const API_URL = '/api/paths/'

const getToken= async(token) => {

    const qs = require('qs');
    let data = qs.stringify({
        'grant_type': 'client_credentials' 
    });

    const config  = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://accounts.spotify.com/api/token',
        headers: { 
        'Authorization': 'Basic ZWYxNjk4OGUwNWE0NGQ1Yjk0ZDkwZTBmMDc2NmJhMzY6ZmM1NWQ0ODg0YTFiNDc0Y2JlYjk1MGY5YWU2YTFmODE=', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        // 'Cookie': '__Host-device_id=AQAGuAiGzz_UOAAQky5eXgtQy0JXT3GLloYtDJCN6IOYpDF-edDTTiBYMhgWGKxtg1XzU8S4aOHfwO__VCUIQORaMzW1PXMb0HI; sp_tr=false'
        },
        data : data
    }
    const response = await axios.request(config)
    console.log(response.data['access_token'])
    let temp = (response.data['access_token'])
    return temp
}


const albumSearch = async(token, searchTerm) => {

    const qs = require('qs');
    let data = qs.stringify({
        'grant_type': 'client_credentials' 
    });

    let config  = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.spotify.com/v1/search?type=album&q=' + searchTerm,
        headers: { 
            'Authorization': 'Bearer ' + token
        }
    };

    const response = await axios.request(config)
    return response.data['albums']['items'][0]['id']
}

const albumLookup = async(token, albumID) => {

    const qs = require('qs');
    let data = qs.stringify({
        'grant_type': 'client_credentials' 
    });
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        // url: 'https://api.spotify.com/v1/albums/'+ albumID +'/tracks',
        url: 'https://api.spotify.com/v1/albums/'+ albumID,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };


    const response = await axios.request(config)
    // return response.data['items']
    return response.data
}

const createPath= async(pathData, token) => {
    console.log(pathData)
    const config  = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let spotifyToken = await getToken()
    console.log(spotifyToken)
    
    // const searchTerm = "to pimp a butterfly"
    const searchTerm = pathData['albumName']

    let result = await albumSearch(spotifyToken, searchTerm)
    // console.log(result)
    // console.log(result['albums'])
    // console.log(result['albums']['items'])
    // console.log(result['albums']['items'][0])
    // let albumID = (result['albums']['items'][0]['id'])
    let albumID = (result)

    let lookupRes = await albumLookup(spotifyToken, albumID)
    let albumTracks = lookupRes['tracks']['items']
    let albumImage = lookupRes['images'][0]['url']
    let albumName = lookupRes['name']

    console.log(albumTracks)

    let totalAlbumLength = 0
    for (let i = 0; i < albumTracks.length; i++) {
        totalAlbumLength += albumTracks[i]['duration_ms']
        console.log(albumTracks[i]['duration_ms'])
    }

    console.log('this is the total length of album in ms '+ totalAlbumLength)
    console.log('this is the total length of album in seonds '+ totalAlbumLength/1000)
    console.log('this is the total length of album in min '+ totalAlbumLength/60000)
    let adjustedAlbumLength = ((totalAlbumLength/60000)/30)*1000
    let albumMinutes = Math.floor((totalAlbumLength/1000) / 60);
    let albumSeconds = Math.floor((totalAlbumLength/1000) - albumMinutes * 60)
    let albumTimeFormat = albumMinutes + ":" + albumSeconds
    // console.log(albumImage[0]['url'])
    console.log(albumName)


    // const response = await axios.post(API_URL, pathData, config)
    // let xCord = '-2.2184748021853147'
    // let yCord = '53.44295597961583'
    // let pathRoute = '/api/paths/gen/'+pathData['albumLength']+'/'+xCord+'/'+yCord
    const pathURL = await axios.get('/api/paths/gen/'+adjustedAlbumLength+'/-2.2184748021853147/53.44295597961583', config)
    console.log(pathURL.data)

    // let finalData = {'albumName':pathData['albumName'], 'albumLength':pathData['albumLength'], 'pathURL':pathData['pathURL']}
    // let finalData = {'albumName':pathData['albumName'], 'albumLength':pathData['albumLength'], 'pathURL':pathURL.data, 'coverURL': albumImage}
    let finalData = {'albumName':albumName, 'albumLength':albumTimeFormat, 'pathURL':pathURL.data, 'coverURL': albumImage}
    const response = await axios.post(API_URL, finalData, config)
    return response.data
}

const getPaths= async(token) => {
    const config  = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const deletePath= async(pathId, token) => {
    const config  = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+pathId, config)
    return response.data
}

const pathService = {
    createPath,
    getPaths,
    deletePath
}
export default pathService


