import React, { useRef, useState } from "react";
import { User, Shield, Trash2, KeyRound, Camera } from "lucide-react";
import TwoFactorModal from "./TwoFactorModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function UserDetails() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-3xl bg-surface border border-border rounded-2xl shadow-lg p-6 md:p-10 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-8 load-step-1">
          <h2 className="text-3xl font-bold text-text-main mb-2">
            User Details
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            Update your personal information and secure your account.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Profile Info */}
          <section className="flex flex-col gap-5 load-step-1">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <User className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-text-main">
                Profile Information
              </h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-2">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-3 md:pr-6 md:border-r border-border shrink-0">
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden border border-border group cursor-pointer bg-surface-highlight flex items-center justify-center shadow-sm hover:ring-4 ring-primary/20 transition-all"
                  onClick={() => fileInputRef.current?.click()}
                  title="Change Profile Picture"
                >
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-text-secondary group-hover:text-primary transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white mb-1" />
                    <span className="text-[10px] text-white font-medium">
                      Upload
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
                {profilePic && (
                  <button
                    onClick={() => setProfilePic(null)}
                    className="text-xs font-medium text-text-secondary hover:text-error transition-colors"
                  >
                    Remove picture
                  </button>
                )}
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-main">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Full Name"
                    className="input-base input-default"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-main">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Last Name"
                    className="input-base input-default"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-text-main">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="email@example.com"
                    className="input-base input-default"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-end">
              <button className="py-2.5 px-6 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition-all shadow-md flex items-center justify-center">
                Save Changes
              </button>
            </div>
          </section>

          {/* Security & Authentication */}
          <section className="flex flex-col gap-5 load-step-2">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-text-main">Security</h3>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background border border-border p-5 rounded-xl hover:border-text-secondary/30 transition-colors">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-surface-highlight rounded-lg flex items-center justify-center shrink-0">
                  <KeyRound className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-sm">
                    Change Password
                  </h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Ensure your account is using a long, random password to stay
                    secure.
                  </p>
                </div>
              </div>
              <button className="px-5 py-2.5 border border-border bg-surface hover:bg-surface-highlight hover:border-text-secondary text-text-main text-sm font-semibold rounded-lg transition-all whitespace-nowrap shadow-sm">
                Update Password
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background border border-border p-5 rounded-xl hover:border-text-secondary/30 transition-colors">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-surface-highlight rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-main text-sm">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Add additional security to your account using TOTP
                    authenticators.
                  </p>
                </div>
              </div>

              {is2FAEnabled ? (
                <button
                  onClick={() => setIs2FAEnabled(false)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-border text-text-main text-sm font-semibold rounded-lg transition-all whitespace-nowrap hover:bg-error/10 hover:text-error hover:border-error/30 shadow-sm"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => setShow2FAModal(true)}
                  className="px-5 py-2.5 border border-border bg-surface hover:bg-surface-highlight hover:border-text-secondary text-text-main text-sm font-semibold rounded-lg transition-all whitespace-nowrap shadow-sm"
                >
                  Enable 2FA
                </button>
              )}
            </div>
          </section>

          {/* Danger Zone */}
          <section className="flex flex-col gap-5 load-step-3">
            <div className="flex items-center gap-2 border-b border-error/20 pb-3">
              <Trash2 className="w-6 h-6 text-error" />
              <h3 className="text-xl font-semibold text-error">Danger Zone</h3>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-text-secondary bg-error/5 border border-error/10 p-4 rounded-lg">
                Once you delete your account, there is no going back. All your
                data, settings, and generated content will be permanently
                removed. Please be certain.
              </p>
              <div className="mt-1">
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="py-2.5 px-6 border border-error/50 bg-error/10 hover:bg-error hover:text-white text-error text-sm font-semibold rounded-lg transition-all shadow-sm"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {show2FAModal && (
        <TwoFactorModal
          onClose={() => setShow2FAModal(false)}
          onSuccess={() => setIs2FAEnabled(true)}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            console.log("Account has been deleted!");
            // Add backend call or redirection logic here
          }}
        />
      )}
    </div>
  );
}
