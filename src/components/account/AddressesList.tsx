'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AddressItem {
  id: string;
  isDefault: boolean;
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

const mockAddresses: AddressItem[] = [
  {
    id: '1',
    isDefault: true,
    fullName: 'الکس مورگان',
    street: 'خیابان پارک، پلاک ۷۴۰',
    apartment: 'واحد ۱۲A',
    city: 'تهران',
    state: 'تهران',
    postalCode: '۱۹۸۳۹۶۳۵۴۱',
    country: 'ایران',
    phone: '۰۹۱۲۱۲۳۴۵۶۷',
  },
  {
    id: '2',
    isDefault: false,
    fullName: 'الکس مورگان',
    street: 'بلوار دریا، پلاک ۱۵۴۰',
    apartment: 'سوئیت ۴۰۲',
    city: 'اصفهان',
    state: 'اصفهان',
    postalCode: '۸۱۵۴۶۹۸۷۶۵',
    country: 'ایران',
    phone: '۰۹۹۸۷۶۵۴۳۲۱',
  },
];

export const AddressesList: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressItem[]>(mockAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<AddressItem, 'id'>>({
    isDefault: false,
    fullName: 'الکس مورگان',
    street: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'ایران',
    phone: '',
  });

  const handleOpenAddModal = () => {
    setEditingAddress(null);
    setFormData({
      isDefault: addresses.length === 0,
      fullName: 'الکس مورگان',
      street: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'ایران',
      phone: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (addr: AddressItem) => {
    setEditingAddress(addr);
    setFormData({ ...addr });
    setIsModalOpen(true);
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      // Update
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingAddress.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Add
      const newAddr: AddressItem = {
        id: Date.now().toString(),
        ...formData,
      };

      if (formData.isDefault) {
        setAddresses((prev) =>
          prev.map((item) => ({ ...item, isDefault: false })).concat(newAddr)
        );
      } else {
        setAddresses((prev) => [...prev, newAddr]);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-4 border-b border-[#d9bfa6]/60">
        <div>
          <h2 className="font-serif text-xl font-light tracking-wide text-[#2a1a12]">
            آدرس‌های ثبت‌شده
          </h2>
          <p className="font-sans text-xs text-[#7a6252] mt-1">
            مقاصد تحویل و آدرس پیش‌فرض خود را مدیریت کنید.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 rounded-full border border-[#c8a07c]/40 bg-[#e8c9aa]/10 font-sans text-xs tracking-wider text-[#9a6b47] hover:bg-[#e8c9aa] hover:text-[#2a1a12] transition-all duration-300"
        >
          + افزودن آدرس جدید
        </button>
      </div>

      {/* ADDRESSES GRID */}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white/50 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
              addr.isDefault
                ? 'border-[#c8a07c]/60 shadow-[0_0_15px_rgba(216,194,168,0.05)]'
                : 'border-[#d9bfa6]/60 hover:border-[#c8a07c]'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className="font-serif text-base font-light text-[#2a1a12]">
                  {addr.fullName}
                </span>
                {addr.isDefault && (
                  <span className="font-sans text-[10px] tracking-wider px-2 py-0.5 rounded-full border border-[#c8a07c]/40 text-[#9a6b47] bg-[#e8c9aa]/10">
                    پیش‌فرض
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs font-sans tracking-wider text-[#7a6252]">
                <button
                  onClick={() => handleOpenEditModal(addr)}
                  className="hover:text-[#b3865f] transition-colors"
                >
                  ویرایش
                </button>
                <span>•</span>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="hover:text-[#b4472f] transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>

            <div className="font-sans text-xs font-light text-[#6b4f3e] leading-relaxed space-y-0.5">
              <p>{addr.street}{addr.apartment ? `، ${addr.apartment}` : ''}</p>
              <p>{addr.city}، {addr.state}، کدپستی: {addr.postalCode}</p>
              <p>{addr.country}</p>
              <p className="font-mono text-[11px] text-[#8a7261] pt-1" dir="ltr">{addr.phone}</p>
            </div>

            {!addr.isDefault && (
              <div className="pt-4 mt-4 border-t border-[#d9bfa6]/40">
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="font-sans text-[11px] tracking-wider text-[#7a6252] hover:text-[#b3865f] transition-colors"
                >
                  تنظیم به‌عنوان آدرس پیش‌فرض
                </button>
              </div>
            )}
          </div>
        ))}

        {addresses.length === 0 && (
          <div className="text-center py-12 border border-dashed border-[#d9bfa6]/60 rounded-2xl">
            <p className="font-sans text-xs text-[#7a6252]">هیچ آدرسی ثبت نشده است.</p>
            <button
              onClick={handleOpenAddModal}
              className="mt-3 font-sans text-xs tracking-wider text-[#9a6b47] underline"
            >
              اولین آدرس خود را اضافه کنید
            </button>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#1c110c]/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg bg-[#f8efe6] border border-[#d9bfa6]/60 rounded-2xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-right"
            >
              <div className="flex justify-between items-center pb-4 border-b border-[#d9bfa6]/60 mb-6">
                <h3 className="font-serif text-xl font-light text-[#2a1a12]">
                  {editingAddress ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#7a6252] hover:text-[#2a1a12]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-1">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-2.5 font-sans text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-1">
                    نشانی پستی (خیابان / کوچه / پلاک)
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="مثال: خیابان ولیعصر، بالاتر از فرشته، پلاک ۱۲"
                    className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-2.5 font-sans text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-1">
                      واحد / طبقه
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      placeholder="مثال: واحد ۴، طبقه ۲"
                      className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-2.5 font-sans text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f]"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-1">
                      شهر
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-2.5 font-sans text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-1">
                      استان
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-2.5 font-sans text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-1">
                      کد پستی
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-2.5 font-mono text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-wider text-[#7a6252] mb-1">
                    شماره همراه
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/60 border border-[#d9bfa6]/60 rounded-lg px-4 py-2.5 font-mono text-xs text-[#2a1a12] focus:outline-none focus:border-[#b3865f]"
                    dir="ltr"
                    required
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-4 border-t border-[#d9bfa6]/60 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 font-sans text-xs tracking-wider text-[#7a6252]"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#e8c9aa] text-[#2a1a12] font-sans text-xs tracking-wider font-medium"
                  >
                    ذخیره آدرس
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressesList;