import headers from "../pages/api/headers"


export async function verify(access, refresh) {
    
    var raw_token = JSON.stringify({
        "token_access": access,
        "token_refresh": refresh
    });

    const token_req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Verify/token/`, {
        method: 'POST',
        headers: headers,
        body: raw_token
    })

    const data_token = await token_req.json()

    if (data_token.is_valid) {
        return access
    } else {
        var userProperties = JSON.parse(localStorage.getItem('@avaliepi:user_properties'));
        userProperties.token_access = data_token.new_access;
        userProperties.token_refresh = data_token.new_refresh;
        localStorage.setItem('@avaliepi:user_properties', JSON.stringify(userProperties));
        return data_token.new_access
    }
    
}