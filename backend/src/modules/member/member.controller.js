import Member from './member.model.js';

// Register new member
export const registerMember = async (req, res, next) => {
  try {
    const { name, email, year,studentId, department, interests } = req.body;

    const existing = await Member.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

    const member = await Member.create({
      name, email, year,studentId, department, interests 
    });

    res.status(201).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

// Get all members
export const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find();
    res.json({ success: true, members });
  } catch (err) {
    next(err);
  }
};

// Get single member
export const getMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    res.json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

// Update member (Admin can approve/reject)
export const updateMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    res.json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

// Delete member
export const deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (err) {
    next(err);
  }
};
