import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = undefined; // Clear the session
  res.send({}); // Send an empty response
});

export { router as signOutRouter };
