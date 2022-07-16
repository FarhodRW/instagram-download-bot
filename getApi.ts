import axios from "axios";


export async function getApi(instagramUri) {
    


    const options = {
        method: 'GET',
        url: 'https://instagram-media-downloader.p.rapidapi.com/rapid/post.php',
        params: {url: instagramUri},
        headers: {
          'X-RapidAPI-Key': String(process.env.RAPIDAPIKEY),
          'X-RapidAPI-Host':  String(process.env.RAPIDAPIHOST) 
              }
      };

try {
    const apiRequest = await axios.request(options)
    var response = {caption: apiRequest.data.caption,
    media: null
    }
    if(apiRequest.data.video) {
        response.media= apiRequest.data.video
    }
    else {response.media = apiRequest.data.image}

    return response
    
} catch (error) {
    console.log(error);
    
}

}

