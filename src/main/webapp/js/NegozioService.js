import AbstractService from "./AbstractService.js";

export default class NegozioService extends AbstractService {
        
        constructor(){
            super();
            this.url = this.baseUrl + "/negozi"        
        }
        
    async all() {
        const data = await fetch(this.url, {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
                .then(response => response.json())
                .catch(res => console.error(res))
        return data;
    }     
    
    async find(id) {
        const data = await fetch(this.url + "/" + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
                .then(response => response.json())
                .catch(res => console.error(res))
        return data;
    }

    create(json) {
        fetch(this.url,{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)

        }).then(response => console.log(response.status));
    }

    update(id, json) {
        fetch(this.url + "/" + id,{
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)

        }).then(response => console.log(response.status));
    }

    delete(id) {
        fetch(this.url + "/" + id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json'
            }
        })
                .then(response => {
                    console.log(response.status);
                })
                .catch(res => console.error(res))
    }
        
        
}

