"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { User, GraduationCap, Users, FileText, CreditCard, CheckCircle, AlertCircle, Lock, Unlock, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

function MembershipForm() {
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    hall: '',
    email: '',
    mobile: '',
    bloodGroup: '',
    guardianName: '',
    guardianContact: '',
    guardianAddress: '',
    sscBoard: '',
    sscYear: '',
    hscBoard: '',
    hscYear: '',
    activities: '',
    motivation: ''
  });
  const [errors, setErrors] = useState({});

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('membershipFormData');
    const savedPaymentStatus = localStorage.getItem('membershipPaymentStatus');
    const savedTransactionId = localStorage.getItem('membershipTransactionId');

    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }

    if (savedPaymentStatus === 'true' && savedTransactionId) {
      setPaymentCompleted(true);
      setTransactionId(savedTransactionId);
    }

    // Check URL parameters for payment callback
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const txn = urlParams.get('txn');

    if (status === 'success' && txn) {
      setTransactionId(txn);
      setPaymentCompleted(true);
      localStorage.setItem('membershipPaymentStatus', 'true');
      localStorage.setItem('membershipTransactionId', txn);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (Object.values(formData).some(value => value !== '')) {
      localStorage.setItem('membershipFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (formData.name.length < 2) newErrors.name = 'Name is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.hall) newErrors.hall = 'Hall is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!/^\d{10,}$/.test(formData.mobile)) newErrors.mobile = 'Valid mobile number required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (formData.guardianName.length < 2) newErrors.guardianName = 'Guardian name is required';
    if (!/^\d{10,}$/.test(formData.guardianContact)) newErrors.guardianContact = 'Valid contact required';
    if (formData.guardianAddress.length < 5) newErrors.guardianAddress = 'Address is required';
    if (!formData.sscBoard) newErrors.sscBoard = 'SSC board is required';
    if (!/^\d{4}$/.test(formData.sscYear)) newErrors.sscYear = 'Valid year required';
    if (!formData.hscBoard) newErrors.hscBoard = 'HSC board is required';
    if (!/^\d{4}$/.test(formData.hscYear)) newErrors.hscYear = 'Valid year required';
    if (!formData.activities) newErrors.activities = 'Activities are required';
    const wordCount = formData.motivation.trim().split(/\s+/).filter(w => w).length;
    if (wordCount < 10 || wordCount > 50) newErrors.motivation = 'Must be between 10-50 words';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handlePayment = async () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly before payment.');
      return;
    }

    setPaymentLoading(true);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          amount: 100,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Payment gateway error. Please try again.");
        setPaymentLoading(false);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong connecting to the gateway.");
      setPaymentLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!paymentCompleted) {
      toast.error('Please complete the payment before submitting your application.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/membership/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.name,
          department: formData.department,
          hall: formData.hall,
          email: formData.email,
          mobile: formData.mobile,
          blood_group: formData.bloodGroup,
          guardian_name: formData.guardianName,
          guardian_contact: formData.guardianContact,
          guardian_address: formData.guardianAddress,
          ssc_board: formData.sscBoard,
          ssc_year: parseInt(formData.sscYear),
          hsc_board: formData.hscBoard,
          hsc_year: parseInt(formData.hscYear),
          activities: formData.activities,
          motivation: formData.motivation,
          transaction_id: transactionId,
          payment_amount: 100.00,
          payment_status: 'Successful'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setSubmitted(true);
        // Clear stored data after successful submission
        localStorage.removeItem('membershipFormData');
        localStorage.removeItem('membershipPaymentStatus');
        localStorage.removeItem('membershipTransactionId');
      } else {
        setLoading(false);
        toast.error(data.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const resetForm = () => {
    setSubmitted(false);
    setPaymentCompleted(false);
    setTransactionId('');
    setFormData({
      name: '', department: '', hall: '', email: '', mobile: '', bloodGroup: '',
      guardianName: '', guardianContact: '', guardianAddress: '', sscBoard: '', sscYear: '',
      hscBoard: '', hscYear: '', activities: '', motivation: ''
    });
    setErrors({});
    // Clear localStorage
    localStorage.removeItem('membershipFormData');
    localStorage.removeItem('membershipPaymentStatus');
    localStorage.removeItem('membershipTransactionId');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto mt-32">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-12 text-center border border-slate-200">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Application Submitted!</h2>
            <p className="text-slate-600 mb-6 text-lg">
              Your DUITS membership application has been successfully received.
            </p>
            <div className="bg-slate-50 p-5 rounded-xl mb-8 border border-slate-200">
              <p className="text-sm font-medium text-slate-500 mb-2">Transaction ID</p>
              <p className="text-xl font-mono font-bold text-slate-900">{transactionId}</p>
            </div>
            <Link href={'/'}
              
              className="bg-slate-900 block hover:bg-slate-800 text-white font-semibold py-3.5 px-10 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Go to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mt-32 mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-10 mb-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <Building2 className="w-9 h-9 text-white" strokeWidth={2} />
            </div>
            <h1 className=" text-3xl sm:text-5xl font-bold text-slate-900 mb-3">
              DUITS Membership
            </h1>
            <p className="text-xl text-slate-600">Dhaka University IT Society</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200">
              Academic Year 2024-2025
            </span>
            <span className="px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200">
              Fee: ৳100
            </span>
            {paymentCompleted && (
              <span className="px-5 py-2.5 bg-green-50 text-green-700 rounded-lg text-sm font-semibold border border-green-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Payment Verified
              </span>
            )}
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Personal Information */}
          <Section icon={User} title="Personal Information" iconColor="from-blue-500 to-indigo-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Enter your full name"
                required
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="your.email@example.com"
                required
              />
              <FormField
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                error={errors.mobile}
                placeholder="01XXXXXXXXX"
                required
              />
              <FormField
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                error={errors.bloodGroup}
                placeholder="A+, O-, AB+, etc."
                required
              />
              <FormField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                error={errors.department}
                placeholder="Your department"
                required
              />
              <FormField
                label="Hall/Residence"
                name="hall"
                value={formData.hall}
                onChange={handleChange}
                error={errors.hall}
                placeholder="Your hall name"
                required
              />
            </div>
          </Section>

          {/* Guardian Information */}
          <Section icon={Users} title="Guardian Information" iconColor="from-violet-500 to-purple-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Guardian Name"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                error={errors.guardianName}
                placeholder="Guardian's full name"
                required
              />
              <FormField
                label="Guardian Contact"
                name="guardianContact"
                value={formData.guardianContact}
                onChange={handleChange}
                error={errors.guardianContact}
                placeholder="Guardian's mobile number"
                required
              />
              <div className="md:col-span-2">
                <FormField
                  label="Guardian Address"
                  name="guardianAddress"
                  value={formData.guardianAddress}
                  onChange={handleChange}
                  error={errors.guardianAddress}
                  placeholder="Complete residential address"
                  isTextarea
                  required
                />
              </div>
            </div>
          </Section>

          {/* Education */}
          <Section icon={GraduationCap} title="Educational Background" iconColor="from-amber-500 to-orange-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="SSC Board"
                name="sscBoard"
                value={formData.sscBoard}
                onChange={handleChange}
                error={errors.sscBoard}
                placeholder="e.g., Dhaka, Cumilla"
                required
              />
              <FormField
                label="SSC Passing Year"
                name="sscYear"
                value={formData.sscYear}
                onChange={handleChange}
                error={errors.sscYear}
                placeholder="YYYY"
                required
              />
              <FormField
                label="HSC Board"
                name="hscBoard"
                value={formData.hscBoard}
                onChange={handleChange}
                error={errors.hscBoard}
                placeholder="e.g., Dhaka, Cumilla"
                required
              />
              <FormField
                label="HSC Passing Year"
                name="hscYear"
                value={formData.hscYear}
                onChange={handleChange}
                error={errors.hscYear}
                placeholder="YYYY"
                required
              />
            </div>
          </Section>

          {/* Additional Info */}
          <Section icon={FileText} title="Additional Information" iconColor="from-teal-500 to-cyan-600">
            <div className="space-y-5">
              <FormField
                label="Extra Curricular Activities"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                error={errors.activities}
                placeholder="List your activities, achievements, and hobbies..."
                isTextarea
                required
              />
              <FormField
                label="Why do you want to be a member?"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                error={errors.motivation}
                placeholder="Express your motivation in 10-50 words..."
                isTextarea
                helperText={`${formData.motivation.trim().split(/\s+/).filter(w => w).length}/50 words`}
                required
              />
            </div>
          </Section>

          {/* Payment Section */}
          <Section icon={CreditCard} title="Payment" iconColor="from-green-500 to-emerald-600">
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <AlertCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Payment Required</h3>
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                      Complete the payment to unlock the submission button. Your application will only be processed after successful payment verification.
                    </p>
                    <div className="bg-white p-2 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-slate-600 font-medium">Membership Fee</span>
                        <span className="text-3xl font-bold text-slate-900">৳100</span>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-3 border-t border-slate-200">
                        <span className="text-slate-500">Payment Gateway</span>
                        <span className="font-bold text-slate-900">aamrPay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {paymentCompleted ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Payment Successful</h3>
                      <p className="text-sm text-slate-700 mb-2">
                        Payment verified. You can now submit your application.
                      </p>
                      <p className="text-sm font-mono text-slate-600">
                        TXN: <span className="font-bold text-slate-900">{transactionId}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {paymentLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ৳100 via aamrPay
                    </>
                  )}
                </button>
              )}
            </div>
          </Section>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            {!paymentCompleted && (
              <div className="bg-amber-50 p-4 rounded-xl mb-4 border border-amber-200">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-900 font-medium">
                    Submit button locked. Complete payment above to proceed.
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={!paymentCompleted || loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Application...
                </>
              ) : (
                <>
                  {paymentCompleted ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  {paymentCompleted ? 'Submit Membership Application' : 'Complete Payment to Submit'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, iconColor, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-8 border border-slate-200">
      <div className="flex items-center gap-4 mb-7 pb-5 border-b border-slate-200">
        <div className={`w-12 h-12 bg-gradient-to-br ${iconColor} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

const FormField = React.memo(({ label, name, value, onChange, error, placeholder, isTextarea = false, helperText, type = 'text', required = false }) => {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          rows="4"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-red-600 text-sm mt-2 font-semibold">{error}</p>}
      {helperText && !error && <p className="text-slate-500 text-sm mt-2">{helperText}</p>}
    </div>
  );
});

FormField.displayName = 'FormField';

export default MembershipForm;