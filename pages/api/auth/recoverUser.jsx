
async function recoverUserInformation(req, res) {

    var token = JSON.parse(JSON.parse(req.body))

    var static_payload = {
        user: {
            email: token.email,
            secretaria: token.secretaria,
            name: token.name,
            user_id: token.user_id,
            permissions: token.permissions,
            token_access: token.token_access,
            token_refresh: token.token_refresh
        },
        perms: {}
    }

    const json = await static_payload;

    res.status(200).json({
        data: json
    });

}

export default async function (req, res) {

    if (req.method == 'POST') {
        recoverUserInformation(req, res);

    } else {
        res.status(405).send()

    }

}