
const ERR_GET = 'Something is wrong in GET ALL data function.';
const ERR_POST = 'Something is wrong in POST data function.';
const ERR_PATCH = 'Something is wrong in PATCH data function.';
const baseUrl = `http://localhost:3300/scores`;

async function getData(){
    const url = baseUrl;
    // console.log('getData url = ', url);

    try{
        const response = await fetch(url);
        console.log(response);
        if(response.status >= 200 && response.status < 300){
            const obj = await response.json();
            console.log(obj);
            return obj;
        } else {
            throw ERR_GET;
        }
    }catch(ex){
        console.log(ex);
    }
}

async function postData(obj) {
    const url = baseUrl+ `?name=${obj.name}`;
    // console.log('postData url :', url);

    const content = {
        name: obj.name,
        score: obj.score,
    };

    const header = {
        "Content-type": "application/json; charset=UTF-8"
    };
    
    const options = {
        method: "POST",
        body: JSON.stringify(content),
        headers: header
    };
    
    try{
        const request = await fetch(url, options);
        console.log(request);
        if(request.status >= 200 && request.status < 300){
            const obj = await request.json();
            console.log(obj);
            // location.reload(); //!!!!!!!!!!!!!!!!
            return obj
        } else {
            throw ERR_POST;
        }
    } catch(ex) {
        console.log(ex);
    }
}

// 更新
async function patchData(obj) {
    const url = baseUrl + `?name=${obj.name}`;
    // console.log('patchData url :', url);

    //传给server的req.body部分
    const content = {
        score: obj.score
    };

    const header = {
        "Content-type": "application/json; charset=UTF-8"
    };
    
    const options = {
        method: "PATCH",
        body: JSON.stringify(content),
        headers: header
    };

    try{
        const request = await fetch(url, options);
        if(request.status >= 200 && request.status < 300) {
            const obj = await request.json();
            console.log(obj);
            // location.reload(); //!!!!!!!!!!
            return obj;
        } else {
            throw ERR_PATCH;
        }
    } catch(ex) {
        console.log(ex);
    }

}

export { getData, postData, patchData };