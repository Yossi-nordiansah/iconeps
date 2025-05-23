'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UnauthorizedPage() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg border border-red-300 text-red-600 px-6 py-4 rounded-xl z-50"
          >
            <h1 className="text-xl font-bold">403 - Akses Ditolak</h1>
            <p className="mt-2 text-sm">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
