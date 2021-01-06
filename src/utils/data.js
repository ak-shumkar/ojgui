import axios from 'axios';

export async function getLanguages(){
    let langs;
    let result = [];
    try {
        const r = await axios.get('http://localhost/languages/all/')
        langs = r.data;
        for(let i=0; i<langs.length; i++){
            if(! langs[i]['is_archived']){
                result.push(langs[i])
            }
        }

        return result;
    }catch (e) {
        console.log('e : ', e)
        return [];
    }
}

