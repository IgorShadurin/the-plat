class ApiService {
    constructor() {
        this.actionServer = 'https://testeron.pro/theplat/';
        this.userData = window.location.href;
    }

    issueToken(price, count, name) {
        let data = new FormData();
        data.append('url', this.userData);
        data.append('price', price);
        data.append('count', count);
        data.append('name', name);
        return fetch(this.actionServer + 'issue-token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })
            .then(data => data.json());
    }

    createPlayer(firstName, lastName, photo) {
        let data = new FormData();
        data.append('url', this.userData);
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('photo', photo);

        return fetch(this.actionServer + 'create-player', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })
            .then(data => data.json());
    }

    getPlayers() {
        let data = new FormData();
        data.append('url', this.userData);
        return fetch(this.actionServer + 'get-players', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })
            .then(data => data.json());
    }

    getPlayer(id) {
        let data = new FormData();
        data.append('url', this.userData);
        data.append('id', id);
        return fetch(this.actionServer + 'get-player', {
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
