import axios from 'axios';

const config = {
    headers: {
        'Accept': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
    }
} 

const restClient = {

    async post(url, data) {
		let response = await axios.post(url, data, config);
		return response.data;
    },

}

export default restClient;