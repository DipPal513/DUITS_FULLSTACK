import { 
  createMemberService,
  getAllMembersService,
  getMemberByTransactionService, // Renamed for better payment tracking
  updateMemberService,
  deleteMemberService
} from './member.model.js';

// 1. Register a new member (Called after aamarPay success)
export const registerMember = async (req, res, next) => {
  try {
    // req.body should contain full_name, email, transaction_id, etc.
    const member = await createMemberService(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Membership application submitted successfully',
      member 
    });
  } catch (err) {
    next(err);
  }
};

// 2. Get all members list (For Admin)
export const getMembers = async (req, res, next) => {
  try {
    const members = await getAllMembersService();
    res.json({ 
      success: true, 
      count: members.length,
      members 
    });
  } catch (err) {
    next(err);
  }
};

// 3. Get a specific member by Transaction ID (Useful for rechecking payments)
export const getMember = async (req, res, next) => {
  try {
    // You can use req.params.id (Primary Key) or req.params.tranId
    const member = await getMemberByTransactionService(req.params.id);
    
    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: 'Member or Transaction not found' 
      });
    }
    
    res.json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

// 4. Update member details (e.g. Admin updating payment_status manually)
export const updateMember = async (req, res, next) => {
  try {
    const member = await updateMemberService(req.params.id, req.body);
    
    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: 'Member not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Member updated successfully',
      member 
    });
  } catch (err) {
    next(err);
  }
};

// 5. Remove a member application
export const deleteMember = async (req, res, next) => {
  try {
    const member = await deleteMemberService(req.params.id);
    
    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: 'Member not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Application deleted successfully' 
    });
  } catch (err) {
    next(err);
  }
};