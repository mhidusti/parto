'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  avatarUrl?: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserProfileData;
  onSave: (newData: UserProfileData) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserProfileData>(userData);
  const [previewImage, setPreviewImage] = useState<string | undefined>(userData.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, avatarUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1c110c]/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg bg-[#f8efe6] border border-[#d9bfa6]/60 rounded-2xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-right"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-6 border-b border-[#d9bfa6]/60 mb-6">
              <div>
                <span className="font-sans text-[10px] tracking-wider text-[#9a6b47]">
                  تنظیمات پروفایل
                </span>
                <h3 className="font-serif text-2xl font-light text-[#2a1a12] mt-1">
                  ویرایش اطلاعات شخصی
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#d9bfa6]/60 flex items-center justify-center text-[#7a6252] hover:text-[#2a1a12] hover:border-[#c8a07c] transition-all"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* AVATAR UPLOAD SECTION */}
              <div className="flex items-center gap-6 pb-6 border-b border-[#d9bfa6]/60">
                <div className="relative w-20 h-20 rounded-full border border-[#c8a07c]/50 bg-white/40 overflow-hidden flex items-center justify-center font-serif text-3xl text-[#9a6b47] flex-none">
                  {previewImage ? (
                    <img src={previewImage} alt="پیش‌نمایش پروفایل" className="w-full h-full object-cover" />
                  ) : (
                    formData.firstName?.charAt(0) || 'پ'
                  )}
                </div>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-full border border-[#c8a07c]/50 bg-white/40 font-sans text-xs tracking-wider text-[#2a1a12] hover:bg-[#e8c9aa] hover:text-[#2a1a12] hover:border-[#c8a07c] transition-all duration-300"
                  >
                    بارگذاری تصویر جدید
                  </button>
                  <p className="font-sans text-[11px] text-[#8a7261] mt-2">
                    فرمت‌های JPEG، PNG یا WEBP (حداکثر ۵ مگابایت)
                  </p>
                </div>
              </div>

              {/* INPUT FIELDS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-2">
                    نام
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-3 font-sans text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-2">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-3 font-sans text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-2">
                  آدرس ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-3 font-sans text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f] transition-colors"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-2">
                  شماره همراه
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-3 font-mono text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f] transition-colors"
                  dir="ltr"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#d9bfa6]/60 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 font-sans text-xs tracking-wider text-[#7a6252] hover:text-[#2a1a12] transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#e8c9aa] text-[#2a1a12] font-sans text-xs tracking-wider font-medium hover:bg-[#f3dcc4] transition-colors shadow-[0_0_20px_rgba(216,194,168,0.2)]"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;