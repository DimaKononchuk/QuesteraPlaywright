

const data = require('../Credentials/AdminCredentials.json');

const ENVIRONMENT=process.env.TEST_ENVIRONMENT;


export const adminToken= async(request)=>{
    const response =await request.post(`https://login.microsoftonline.com/${data.uid}/oauth2/v2.0/token`,{
            form:{
                "grant_type": data.grant_type,
                "client_id": data.client_id,
                "client_secret": data.client_secret,
                "scope": data.scope,
                "userName": data.username,
                "password": data.password
            },
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept":"*/*",
            }

    })
    const json = await response.json();
    return {
        token:json.access_token,
        status:response.status()
    }
}


export const updateBoxStateActive= async(request,adminToken)=>{
    const response=await request.put(`https://api.${ENVIRONMENT}.questera.games/utility/mongo`,{
            data:{
                "updateDefinition": "{ $set:{IsEarned:true,IsUsed:false}}",
                "dbName": "Bounty",
                "collectionName": "BaseRandomBoxInstance",
                "query": "{UserId:'7448d758-758b-4f2c-b83e-e59ea7817fda',IsEarned:false,IsUsed:false}"
            },
            headers:{
                "Content-Type": "application/json",
                "Accept":"*/*",
                "Authorization": `Bearer ${adminToken}`

            }
    });
    return response.status();
}

export const updateBoxStateNotEarned= async(request,adminToken)=>{
    const response=await request.put(`https://api.${ENVIRONMENT}.questera.games/utility/mongo`,{
            data:{
                "updateDefinition": "{ $set:{IsEarned:false,IsUsed:false}}",
                "dbName": "Bounty",
                "collectionName": "BaseRandomBoxInstance",
                "query": "{UserId:'7448d758-758b-4f2c-b83e-e59ea7817fda'}"
            },
            headers:{
                "Content-Type": "application/json",
                "Accept":"*/*",
                "Authorization": `Bearer ${adminToken}`

            }
    });
    return response.status();
}