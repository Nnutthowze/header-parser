const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/api/whoami/', (req, res) => {
    const getIpAddress = () => req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
    const getLanguage = () => {
        let language = req.headers['accept-language'] || '';
        if (language.length) {
            const index = language.indexOf(',');
            language = language.slice(0, index)
        }
        return language;
    };
    const getSoftware = () => {
        let software = req.headers['user-agent'] || '';
        if (software.length) {
            const startIndex = software.indexOf('(') + 1;
            const lastIndex = software.indexOf(')');
            software = software.slice(startIndex, lastIndex);
        }
        return software;
    }

    const ipaddress = getIpAddress();
    const language = getLanguage();
    const software = getSoftware();
    
    return res.json({ ipaddress, language, software });
});

app.get('*', (req, res) => res.send('Page Not Found...'));

app.listen(port, () => console.log('bootstrapped'));
