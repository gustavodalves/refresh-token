import 'dotenv/config'

export const env = (variable: string = '') => {
    return process.env[variable];
}
