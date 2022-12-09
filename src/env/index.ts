import 'dotenv/config'

type envTypes =
    'JWT_SECRET' |
    'JWT_ACCESS_TOKEN_EXPIRES_IN_MS' |
    'JWT_REFRESH_TOKEN_EXPIRES_IN_MS' |
    'JWT_SECRET_REFRESH'

export const env = (variable: envTypes): string => {
    const enviremont = process.env[variable];

    return enviremont || ''
}
