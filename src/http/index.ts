import axios from 'axios';

const SERVER = axios.create({
	baseURL: process.env.VUE_APP_API,
	headers: {}
});

SERVER.interceptors.request.use((request) => {
	const hmToken = localStorage.getItem('hm-token')

	if (request.headers && hmToken) {
		request.headers['Authorization'] = `Token ${hmToken}`;
	}

	return request;
})

export default SERVER;