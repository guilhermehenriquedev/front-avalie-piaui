
import headers from '../headers'

async function signInRequest(req, res) {

    // pegar o token do usuario admin
    var raw_token = JSON.stringify({
        "username": process.env.NEXT_USER_ADMIN,
        "password": process.env.NEXT_PASSWORD_ADMIN
    });
    const token_admin = await fetch(`${process.env.NEXT_PUBLIC_API_HOME}/token/`, {
        method: 'POST',
        headers: headers,
        body: raw_token
    })
    const data_token_login = await token_admin.json()

    // faz a autenticação do usuario 
    var credenciais = JSON.parse(req.body)
    var raw = JSON.stringify({
        "email": credenciais.email,
        "password": credenciais.password
    });
    headers["Authorization"] = `Bearer ${data_token_login.access}`
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login/`, {
        method: 'POST',
        headers: headers,
        body: raw
    })

    const data = await result.json()
    if (data['is_authenticate']) {

        if (data['is_active']) {

            //entra no admin se o usuario estiver ativo
            var payload = {
                "user": {
                    "email": credenciais.email,
                    "secretaria": 'SEAD',
                    "name": data.username,
                    "user_id": data.user_id,
                    "permissions": data.permissions,
                    "token_access": data_token_login.access,
                    "token_refresh": data_token_login.refresh
                }
            }

            res.status(200).json({
                data: payload
            })

        } else {

            // bloqueia o acesso do usuario se estiver inativo
            res.statusMessage = JSON.stringify({
                "cod": 2,
                "msg": 'Usuário desativado, contate o administrador! '
            })

            return res.status(401).send();
        }

    } else {

        res.statusMessage = JSON.stringify({
            "cod": 2,
            "msg": 'Usuario ou senha inválidos!!'
        })

        return res.status(401).send();
    }

}

export default async function (req, res) {

    if (req.method == 'POST') {
        signInRequest(req, res);

    } else {
        res.status(405).send()

    }

}