const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params.speakersService;

  router.get('/', async (request, response, next) => {
    try {
      const speakers = await params.speakersService.getList();
      const artwork = await speakersService.getAllArtwork();
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const speaker = await params.speakersService.getSpeaker(request.params.shortname);
      const artwork = await params.speakersService.getArtworkForSpeaker(request.params.shortname);
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers-detail',
        speaker,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
