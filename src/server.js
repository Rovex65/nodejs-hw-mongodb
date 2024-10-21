import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).send({
      message: 'Not found',
    });
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Internal Server Error');
  });

  const PORT = process.env.PORT || 3000;

  console.log(PORT);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
