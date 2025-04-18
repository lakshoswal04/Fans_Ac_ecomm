const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getRiders,
  getApprovedEmails,
  addApprovedEmail,
  deleteApprovedEmail
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are admin-only
router.use(protect);
router.use(authorize('admin'));

// User routes
router.get('/', getUsers);
router.get('/riders', getRiders);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Approved email routes
router.get('/approved-emails', getApprovedEmails);
router.post('/approved-emails', addApprovedEmail);
router.delete('/approved-emails/:id', deleteApprovedEmail);

module.exports = router; 