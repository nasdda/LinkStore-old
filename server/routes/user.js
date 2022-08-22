require('dotenv').config()
var express = require('express');
var router = express.Router();

const User = require('../models/userModel')
const UserLinks = require('../models/userLinksModel');
const { response } = require('express');


/* GET current user. */
router.get('/', async function (req, res) {
  return res.json({
    user: req.user,
  })
});

/* GET links of user with given uuid */
router.get('/links/:uuid', async (req, res) => {
  try {
    userLinks = await UserLinks.findOne({ uuid: req.params.uuid })
    if (!userLinks.public && req.params.uuid != req.user.uuid) {
      return res.status(403).json({ message: "Private Links" })
    }
    return res.status(200).json({
      links: userLinks.links,
      tags: userLinks.tags
    })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
})

/* POST new link */
router.post('/link', async (req, res) => {
  try {
    await UserLinks.updateOne(
      { uuid: req.user.uuid },
      { $push: { links: req.body.link } },
    )
    return res.json({ success: true })
  } catch (err) {
    return res.status(400)
  }
})

/* PATCH the visibility of the link to either be public or private */
router.patch('/link/visibility', async (req, res) => {
  try {
    await UserLinks.updateOne(
      { uuid: req.user.uuid },
      { $set: { public: req.body.public } },
    )
    return res.json({ success: true })
  } catch (err) {
    return res.status(400)
  }
})

/* PATCH the contents of the link with given _id of linkID */
router.patch('/link', async (req, res) => {
  try {
    await UserLinks.updateOne(
      { uuid: req.user.uuid, 'links._id': req.body.linkID },
      {
        $set: {
          'links.$.title': req.body.link.title,
          'links.$.url': req.body.link.url,
          'links.$.tags': req.body.link.tags,
          'links.$.description': req.body.link.description
        }
      }
    )
    return res.json({ success: true })
  } catch (err) {
    return res.status(400)
  }
})

/* GET the current visibilty of the user's link collection */
router.get('/link/visibility', async (req, res) => {
  try {
    const userLink = await UserLinks.findOne({ uuid: req.user.uuid })
    return res.json({ public: userLink.public })
  } catch (err) {
    return res.status(400)
  }
})

/* GET links of current user*/
router.get('/links', async (req, res) => {
  try {
    userLinks = await UserLinks.findOne({ uuid: req.user.uuid })
    return res.status(200).json({
      links: userLinks.links,
      tags: userLinks.tags
    })
  } catch (err) {
    return res.status(400)
  }
})

/* DELETE a given link with _id of req.body.deleteUid */
router.delete('/link', async (req, res) => {
  try {
    await UserLinks.updateOne(
      { uuid: req.user.uuid },
      {
        $pull: {
          links: { _id: req.body.deleteUid }
        }
      }
    )
    res.json({ success: true })
  } catch (err) {
    res.json.status(400)
  }
})

/* POST new tag for the current link collection */
router.post('/tag', async (req, res) => {
  try {
    await UserLinks.updateOne(
      { uuid: req.user.uuid },
      { $push: { tags: req.body.tag } },
    )
    return res.json({ success: true })
  } catch (err) {
    return res.status(400)
  }
})

/* POST logout of current user*/
router.post('/logout', (req, res) => {
  res.cookie('jwt', 'none', {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  })
  return res.status(200).json({ message: "User logged out" })
})


module.exports = router;



