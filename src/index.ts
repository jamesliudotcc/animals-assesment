import * as express from 'express';
import * as bodyParser from 'body-parser';
require('dotenv').config();

import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { Animal } from './entity/Animal';

createConnection({
  type: 'postgres',
  host: 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  database: 'favoriteanimals',
  entities: [Animal],
  synchronize: true,
  logging: false,
})
  .then(async connection => {
    const app = express();
    const animalRepository = getRepository(Animal);
    app.set('view engine', 'pug');

    app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );

    app.get('/', (req, res) => {
      res.render('home');
    });
    app.get('/favorites', async (req, res) => {
      let allAnimals = await animalRepository.find();
      res.render('favorites', { animals: allAnimals });
    });
    app.get('/favorites/new', (req, res) => {
      res.render('new');
    });
    app.post('/favorites', async (req, res) => {
      let animal = new Animal();
      animal.species_name = req.body.species;
      animal.scientific_name = req.body.scientific;
      animal.image_url = req.body.image_url;
      animal.description = req.body.description;
      animal.extinct = req.body.extinct ? true : false;
      animal.createdAt = new Date();
      animal.updatedAt = new Date();

      await animalRepository.save(animal);

      res.redirect('/favorites');
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log('Listening');
    });
  })
  .catch(error => {
    console.log(error);
  });
