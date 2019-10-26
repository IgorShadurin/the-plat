class ApiService {
    constructor() {
        this.actionServer = 'https://testeron.pro/';
        this.userData = window.location.href;
    }

    async vkUploadStory(url, content, type = 'file') {
        let data = new FormData();
        data.append(type, content, type === 'file' ? 'photo.jpg' : 'video.avi');
        return fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            body: data
        })
            .then(data => data.text());

    }

    getInfo() {
        let data = new FormData();
        data.append('url', this.userData);
        return fetch(this.actionServer + 'para/get-info', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })
            .then(data => data.json());
    }

    saveLove(vkId) {
        let data = new FormData();
        data.append('url', this.userData);
        data.append('vk_id', vkId);
        return fetch(this.actionServer + 'para/save-love', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })
            .then(data => data.json());
    }
}

export default new ApiService();
