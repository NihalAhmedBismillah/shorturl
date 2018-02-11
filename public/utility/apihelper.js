
//Created by Nihal Ahmed on :11/02/2018

class ApiHelper {

    // get data 
    static get(option) {

        return $.ajax({

            type: 'GET',
            url: option.url,
            data: option.query,
            dataType: 'json',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
            }
        });
    }

    //post data in server
    static post(option) {
  
        return $.ajax({

            type: 'POST',
            url: option.url,
            data: JSON.stringify(option.data),
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
            }
        });
    }

    //put++ data in server
    static put(option) {

        return $.ajax({

            type: 'PUT',
            url: option.url,
            data: option.data.toJSON(),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
            }
        });
    }

    //put++ data in server
    static patch(option) {

        return $.ajax({

            type: 'PATCH',
            url: option.url,
            data: option.data.toJSON(),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
            }
        });
    }
    // detete data 
    static delete(option) {

        return $.ajax({
            type: 'DELETE',
            url: option.url,
            data: option.query,
            dataType: 'json',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
            }
        });
    }
}