import headers from '../../headers'
import * as token from "../../../../helpers/authorization"

async function GetUsers(req, res) {

    var access = req.query.access
    var refresh = req.query.refresh
    var token_access = await token.verify(access, refresh)
    headers["Authorization"] = `Bearer ${token_access}`

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Orgao`, {
        method: 'GET',
        headers: headers
    })

    const data = await result.json()

    res.status(200).json({
        data: data
    })

}

export default async function (req, res) {

    if (req.method == 'GET') {
        GetUsers(req, res);

    } else {
        res.status(405).send()

    }

}