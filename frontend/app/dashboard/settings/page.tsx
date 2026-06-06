'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Alert } from '@/components/ui';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences' | 'privacy'>('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (234) 567-8900',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    address: '123 Main Street',
    city: 'Healthcare City',
    state: 'HC',
    zipCode: '12345',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    prescriptionReminders: true,
    healthTips: true,
    newsletter: false,
  });

  const [privacy, setPrivacy] = useState({
    shareDataWithResearch: false,
    allowLocationTracking: false,
    publicProfile: false,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setSaveSuccess(true);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs: Array<{
    id: 'profile' | 'security' | 'preferences' | 'privacy';
    label: string;
    icon: string;
  }> = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600 mb-6">Manage your account, privacy, and preferences</p>
      </motion.div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert variant="success">Settings saved successfully!</Alert>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-0">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-6 py-3 font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-medical-blue text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />

                  <Input
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleProfileChange}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <Button onClick={handleProfileSave} className="w-full">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Input
                    label="Address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                    />
                    <Input
                      label="State"
                      name="state"
                      value={profileData.state}
                      onChange={handleProfileChange}
                    />
                    <Input
                      label="ZIP Code"
                      name="zipCode"
                      value={profileData.zipCode}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <Button onClick={handleProfileSave} className="w-full">
                    Save Address
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Ensure your account is protected with a strong password
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />

                  <Input
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />

                  <p className="text-sm text-gray-600">
                    Password must contain at least 8 characters, including uppercase,
                    lowercase, numbers, and special characters.
                  </p>

                  <Button onClick={handlePasswordUpdate} className="w-full">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Two-factor authentication is not currently enabled.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Enable 2FA
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">
                        Chrome on macOS
                      </p>
                      <p className="text-sm text-gray-600">
                        Last active: Just now
                      </p>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      Current
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        Safari on iOS
                      </p>
                      <p className="text-sm text-gray-600">
                        Last active: 2 hours ago
                      </p>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-700">
                      Sign out
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {[
                  {
                    key: 'emailNotifications',
                    label: 'Email Notifications',
                    description: 'Receive updates via email',
                  },
                  {
                    key: 'smsNotifications',
                    label: 'SMS Notifications',
                    description: 'Receive updates via SMS',
                  },
                  {
                    key: 'appointmentReminders',
                    label: 'Appointment Reminders',
                    description: 'Get reminders before your appointments',
                  },
                  {
                    key: 'prescriptionReminders',
                    label: 'Prescription Reminders',
                    description: 'Get reminders for prescription refills',
                  },
                  {
                    key: 'healthTips',
                    label: 'Health Tips',
                    description: 'Receive personalized health tips',
                  },
                  {
                    key: 'newsletter',
                    label: 'Newsletter',
                    description: 'Subscribe to our monthly newsletter',
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handlePreferenceChange(
                          item.key as keyof typeof preferences
                        )
                      }
                      className={`w-12 h-6 rounded-full transition-all ${
                        preferences[item.key as keyof typeof preferences]
                          ? 'bg-medical-blue'
                          : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full m-0.5"
                        animate={{
                          x: preferences[item.key as keyof typeof preferences]
                            ? 24
                            : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  </div>
                ))}

                <Button onClick={handleProfileSave} className="w-full">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control how your data is used
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {[
                  {
                    key: 'shareDataWithResearch',
                    label: 'Share Data with Research',
                    description:
                      'Allow your anonymized data to be used for medical research',
                  },
                  {
                    key: 'allowLocationTracking',
                    label: 'Location Services',
                    description:
                      'Allow us to use your location for emergency services',
                  },
                  {
                    key: 'publicProfile',
                    label: 'Public Profile',
                    description:
                      'Make your profile visible to other patients',
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handlePrivacyChange(
                          item.key as keyof typeof privacy
                        )
                      }
                      className={`w-12 h-6 rounded-full transition-all ${
                        privacy[item.key as keyof typeof privacy]
                          ? 'bg-medical-blue'
                          : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full m-0.5"
                        animate={{
                          x: privacy[item.key as keyof typeof privacy]
                            ? 24
                            : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  </div>
                ))}

                <div className="p-4 bg-yellow-50 rounded-lg mt-6">
                  <p className="text-sm text-yellow-800">
                    💡 Your privacy is important to us. For more information, please
                    read our Privacy Policy.
                  </p>
                </div>

                <Button onClick={handleProfileSave} className="w-full">
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Card className="border-error/30 bg-error/5">
          <CardHeader>
            <CardTitle className="text-error">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible account actions
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">
                  Delete Account
                </p>
                <p className="text-sm text-gray-600">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="danger">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
