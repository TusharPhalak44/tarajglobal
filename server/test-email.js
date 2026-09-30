import 'dotenv/config';
import emailService from './services/email.service.js';
emailService.sendLeadConfirmation({name: 'Test', email: 'info@tgstechinfo.com', message: 'Test msg', subject: 'Test'}).then(console.log).catch(console.error);
